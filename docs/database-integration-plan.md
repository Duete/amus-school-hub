# Database integration plan

## Decision summary

The repository currently has no database, migration runner, identity provider, or server-side email adapter. The recommended target is PostgreSQL 15+ behind server-side APIs or TanStack Start server functions. Supabase is a suitable hosted option because it provides PostgreSQL, migrations, managed authentication, and row-level security, but the schema is intentionally provider-neutral.

The reviewed schema is in [`database/schema.sql`](../database/schema.sql). It is a blueprint only and must not be applied to production until the school approves the provider, retention policy, administrators, and payment integration.

## What changes from the preview implementation

| Current preview | Persistent replacement |
| --- | --- |
| Hard-coded accounts in `src/lib/auth.tsx` | Managed identity provider plus `app_user` and `user_role_assignment` records |
| `localStorage` session | HttpOnly, Secure, SameSite session cookie backed by `auth_session` or provider session |
| Client-side role permissions | Server-side authorization middleware and database role checks |
| Demo learner statement | `student_profile`, `fee_account`, and `fee_line_item` queries |
| Local application confirmation | `admissions_application` transaction with audit record |
| Local payment request | `payment` transaction with idempotency key and gateway webhook confirmation |
| Local notification log | `notification` outbox queue processed by a trusted email worker |
| Browser `VITE_EMAIL_NOTIFICATION_ENDPOINT` | Server-only email adapter; provider credentials never reach the browser |

## Core entities and relationships

- `app_user` is the identity record for every person who can sign in.
- `user_role_assignment` allows a person to hold one or more roles without encoding authorization into a single mutable string.
- `student_profile` extends a user with student number, level, campus, and learner details.
- `guardian` and `student_guardian` support one or more guardians per learner.
- `admissions_application` stores the submitted enquiry, review status, and responsible staff member.
- `fee_account` and `fee_line_item` model the learner’s term statement.
- `payment` records an attempted payment separately from the provider’s eventual confirmation.
- `notification` is an outbox record, not proof that an email was delivered.
- `auth_session` stores revocable server-side sessions when the chosen identity provider does not manage them.
- `audit_log` records sensitive actions such as role changes, application review, payment state changes, and notification retries.

## Server boundaries

All database access should occur in server-only functions or API handlers. The browser may call these operations, but it must never receive database credentials or provider secrets.

Recommended operations:

```text
POST /api/auth/sign-in
POST /api/auth/sign-out
GET  /api/auth/session
POST /api/admissions/applications
GET  /api/admissions/applications/:id       administrator only
POST /api/finance/accounts/:id/payments
POST /api/finance/webhooks/:provider        provider signature required
GET  /api/notifications                     administrator only
POST /api/notifications/:id/retry           administrator only
```

Each operation should validate input with Zod, identify the authenticated user from the server session, authorize the role and resource ownership, execute a database transaction, and append an `audit_log` row for sensitive actions.

## Authentication and authorization rollout

### Phase 1 — provider and migration foundation

1. Select the identity provider and PostgreSQL host.
2. Create separate development, staging, and production databases.
3. Apply the schema through a versioned migration tool; do not run `schema.sql` manually against production.
4. Configure secrets outside `VITE_*` variables: database URL, auth issuer/client credentials, session signing key, and email provider key.
5. Seed only non-sensitive development accounts.

### Phase 2 — replace preview sign-in

1. Add server-side sign-in and sign-out functions.
2. Resolve the provider identity to `app_user.external_auth_id`.
3. Load active roles from `user_role_assignment`.
4. Replace `localStorage` reads in `AuthProvider` with `/api/auth/session` or a server loader.
5. Keep the current `UserRole` type as the UI contract, but make the server the authority.
6. Deny access by default when a user has no active role or a revoked session.

### Phase 3 — migrate admissions

1. Change the admissions form handler from `setSubmitted(true)` to a server mutation.
2. Insert `guardian`, `admissions_application`, and `audit_log` records in one transaction.
3. Generate the application reference server-side.
4. Create a `notification` outbox record in the same transaction.
5. Return only a safe confirmation reference to the browser.
6. Add administrator review actions with status transitions and audit history.

### Phase 4 — migrate finance

1. Replace the illustrative account with a server query filtered by the authenticated student or assigned finance role.
2. Create a `payment` row with a unique `idempotency_key` before redirecting to the payment provider.
3. Never mark a payment `confirmed` from a browser click; only a verified provider webhook can do that.
4. Update `fee_account.paid_to_date` inside a transaction after webhook verification.
5. Create the payment notification outbox row only after the payment request is accepted; send a separate confirmation after provider settlement if required.

### Phase 5 — notification worker

1. Poll or subscribe to `notification` records with `status = 'queued'` and `available_at <= now()`.
2. Claim rows atomically so two workers cannot send the same message.
3. Use exponential backoff for transient failures and cap attempts.
4. Save provider message IDs, timestamps, and sanitized failure reasons.
5. Provide administrators with delivery status and a controlled retry action.
6. Do not place the email API key in `VITE_EMAIL_NOTIFICATION_ENDPOINT`; the current client endpoint is preview-only and should be removed when the server adapter is live.

## Security requirements

- Passwords, if managed locally, must use Argon2id or the identity provider’s password handling; never store plaintext passwords.
- Use HttpOnly, Secure, SameSite cookies and CSRF protection for cookie-authenticated mutations.
- Apply least privilege: students can access only their own profile, account, applications, and payments; teachers receive only explicitly assigned academic records; administrators receive operational permissions without unrestricted database credentials.
- Enforce ownership in server queries, not only in UI conditionals.
- Verify payment webhook signatures and reject replayed provider references.
- Encrypt backups, restrict production database access, and define retention/deletion rules for guardian contact data and payment records.
- Redact tokens, passwords, payment details, and full notification bodies from application logs.
- Add rate limiting and lockout or step-up verification to authentication and payment endpoints.

## Data migration from preview mode

Preview data is illustrative and must not be promoted automatically. If the school wants to preserve a real application collected during testing, export it through an approved process, verify consent and accuracy, then import it using a one-time migration script that:

1. creates or matches the guardian;
2. creates or matches the learner profile only after identity verification;
3. inserts the application with an explicit `submitted_at` and migration audit record;
4. does not import demo passwords or local storage sessions;
5. does not mark demo payment data as confirmed.

The three preview accounts should be recreated as invited development users only. Production administrators should receive invitation links and set credentials through the chosen identity provider.

## Environment contract

Use server-only variables for production:

```text
DATABASE_URL=
AUTH_ISSUER_URL=
AUTH_CLIENT_ID=
AUTH_CLIENT_SECRET=
SESSION_SECRET=
EMAIL_PROVIDER_API_KEY=
EMAIL_FROM_ADDRESS=
PAYMENT_PROVIDER_SECRET=
PAYMENT_WEBHOOK_SECRET=
```

Do not use `VITE_DATABASE_URL`, `VITE_AUTH_CLIENT_SECRET`, or `VITE_EMAIL_PROVIDER_API_KEY`. Variables prefixed with `VITE_` are eligible to be bundled into browser code.

## Acceptance checklist

- [ ] Provider and data residency approved by the school.
- [ ] Schema applied through a reviewed migration in development and staging.
- [ ] Sign-in, sign-out, session expiry, and revoked-role cases tested.
- [ ] Student, teacher, and administrator authorization tests cover both allowed and denied resource access.
- [ ] Admissions submission is transactional and creates exactly one application reference.
- [ ] Payment initiation is idempotent and only verified webhooks confirm settlement.
- [ ] Notification delivery is observable, retryable, and does not expose secrets.
- [ ] Audit records exist for role changes, application review, payment state changes, and notification retries.
- [ ] Backups, restore testing, retention, and incident response are documented.
- [ ] Preview localStorage code and hard-coded passwords are removed before production launch.
