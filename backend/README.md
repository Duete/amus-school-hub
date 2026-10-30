# Mbale Progressive School API

Express + PostgreSQL backend for the admissions and payment forms.

## Setup

```sh
cd backend
pnpm install
cp .env.example .env
# edit DATABASE_URL
pnpm migrate
pnpm seed
pnpm dev
```

The API listens on `http://localhost:8787` by default.

## Endpoints

- `GET /health` — database health check
- `POST /api/admissions/applications` — validates and stores an application, guardian, audit row, and queued email notification in one transaction
- `POST /api/payments` — validates the learner account, creates an idempotent pending payment, audit row, and queued notification

Set the frontend variable below to connect the forms:

```sh
VITE_API_BASE_URL=http://localhost:8787
```

When this variable is absent, the frontend retains its explicit preview fallback. The API does not mark payments as settled; a provider-specific, signature-verified webhook must be added before treating a payment as confirmed.

## Seed data

`pnpm seed` creates development records for the administrator, finance administrator, teacher, and sample student roles, plus the sample student profile, guardian, fee account, and fee line items. The seed is designed to be safe to rerun for the user/profile/account records. Seed credentials are not created in PostgreSQL; connect the identities to the selected auth provider and invite users there.
