-- Mbale Progressive School Hub
-- Target: PostgreSQL 15+ (also compatible with Supabase/Postgres providers)
-- This is a reviewed integration blueprint, not yet applied to a live database.

create extension if not exists pgcrypto;

create type user_role as enum ('student', 'teacher', 'administrator');
create type user_status as enum ('invited', 'active', 'suspended', 'archived');
create type application_status as enum ('submitted', 'under_review', 'needs_information', 'accepted', 'declined', 'withdrawn');
create type payment_status as enum ('initiated', 'pending', 'confirmed', 'failed', 'cancelled', 'refunded');
create type notification_status as enum ('queued', 'processing', 'sent', 'failed', 'cancelled');

create table app_user (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  normalized_email text generated always as (lower(trim(email))) stored,
  display_name text not null,
  phone text,
  status user_status not null default 'invited',
  external_auth_id text unique,
  last_sign_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);
create unique index app_user_email_uq on app_user (normalized_email);

create table user_role_assignment (
  user_id uuid not null references app_user(id) on delete cascade,
  role user_role not null,
  assigned_by uuid references app_user(id),
  assigned_at timestamptz not null default now(),
  revoked_at timestamptz,
  primary key (user_id, role)
);
create index user_role_active_idx on user_role_assignment (user_id) where revoked_at is null;

create table student_profile (
  user_id uuid primary key references app_user(id) on delete cascade,
  student_number text not null unique,
  level text not null,
  campus text not null,
  date_of_birth date,
  previous_school text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table guardian (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table student_guardian (
  student_user_id uuid not null references student_profile(user_id) on delete cascade,
  guardian_id uuid not null references guardian(id) on delete cascade,
  relationship text,
  is_primary boolean not null default false,
  primary key (student_user_id, guardian_id)
);

create table admissions_application (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  student_user_id uuid references student_profile(user_id),
  learner_name text not null,
  date_of_birth date,
  entry_level text not null,
  preferred_campus text not null,
  guardian_id uuid references guardian(id),
  previous_school text,
  notes text,
  status application_status not null default 'submitted',
  submitted_by_user_id uuid references app_user(id),
  submitted_at timestamptz not null default now(),
  reviewed_by_user_id uuid references app_user(id),
  reviewed_at timestamptz,
  updated_at timestamptz not null default now()
);
create index admissions_status_idx on admissions_application (status, submitted_at desc);

create table fee_account (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references student_profile(user_id) on delete restrict,
  academic_year text not null,
  term text not null,
  total_charges numeric(14,2) not null default 0 check (total_charges >= 0),
  paid_to_date numeric(14,2) not null default 0 check (paid_to_date >= 0),
  currency char(3) not null default 'UGX',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_user_id, academic_year, term)
);

create table fee_line_item (
  id uuid primary key default gen_random_uuid(),
  fee_account_id uuid not null references fee_account(id) on delete cascade,
  label text not null,
  amount numeric(14,2) not null check (amount >= 0),
  created_at timestamptz not null default now()
);

create table payment (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  fee_account_id uuid not null references fee_account(id) on delete restrict,
  payer_user_id uuid references app_user(id),
  amount numeric(14,2) not null check (amount > 0),
  currency char(3) not null default 'UGX',
  method text not null check (method in ('mobile_money', 'card', 'bank_transfer', 'cash')),
  status payment_status not null default 'initiated',
  provider text,
  provider_reference text,
  idempotency_key text not null unique,
  initiated_at timestamptz not null default now(),
  confirmed_at timestamptz,
  failure_reason text,
  updated_at timestamptz not null default now()
);
create index payment_account_idx on payment (fee_account_id, initiated_at desc);

create table notification (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('admissions.application_submitted', 'finance.payment_submitted')),
  recipient_email text not null,
  subject text not null,
  body text not null,
  application_id uuid references admissions_application(id) on delete set null,
  payment_id uuid references payment(id) on delete set null,
  status notification_status not null default 'queued',
  provider text,
  provider_message_id text,
  attempts integer not null default 0,
  available_at timestamptz not null default now(),
  sent_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index notification_delivery_idx on notification (status, available_at);

create table auth_session (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_user(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  ip_hash text,
  user_agent text
);
create index auth_session_active_idx on auth_session (user_id, expires_at) where revoked_at is null;

create table audit_log (
  id bigint generated always as identity primary key,
  actor_user_id uuid references app_user(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_log_entity_idx on audit_log (entity_type, entity_id, created_at desc);

-- Least-privilege application role. Exact grants depend on the chosen provider.
-- Do not expose app_user, auth_session, payment, or audit_log directly to the browser.
-- Public requests should use server functions/API handlers with transaction boundaries.
