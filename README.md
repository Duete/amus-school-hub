# Amus School Hub

Mbale Progressive Secondary School’s public information and portal website. The site presents the school’s history, campuses, UCE/UACE learning pathways, leadership, campus life, news, sports, admissions, scholarships, and role-based portals.

## Development

The project uses Node.js, Vite, TanStack Start, React, and PostgreSQL-backed Express services.

```sh
pnpm install
pnpm run dev
```

Run the quality checks before publishing:

```sh
pnpm run lint
pnpm run test
pnpm run build
```

## SEO and answer-engine readiness

Public routes provide server-rendered page content, route-specific titles and descriptions, Open Graph and Twitter metadata, canonical URLs when `VITE_PUBLIC_SITE_URL` is configured, school structured data, and a crawlable sitemap and robots policy. Set the public origin explicitly in production rather than deriving it from an internal request URL.

## Portal and notification integrations

The `/login` and `/portal` routes provide preview role-based access for students, teachers, and administrators. Replace the preview identities with a server-side identity provider, hashed credentials, secure sessions, and database-backed role assignments before production use.

Successful admissions submissions and fee payment requests create notification records through `src/lib/notifications.ts`. Set `VITE_EMAIL_NOTIFICATION_ENDPOINT` to a trusted server-side email adapter to dispatch those events through the school’s email provider. The browser must not hold provider API keys.

## Database integration

The persistent-storage blueprint is documented in [`docs/database-integration-plan.md`](docs/database-integration-plan.md), with a PostgreSQL-compatible schema in [`database/schema.sql`](database/schema.sql). The Express/PostgreSQL API integration lives in [`backend/`](backend/). See [`backend/README.md`](backend/README.md) for migration, seed, dashboard, and local development commands. A visual architecture preview is available at `/database` while the frontend is running.
