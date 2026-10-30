# Amus School Hub

Imported website: https://amuscollegeschool.com

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a9fb9691-5718-4376-a705-ec8298312a91).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Portal and notification integrations

The `/login` and `/portal` routes provide preview role-based access for students, teachers, and administrators. The preview accounts are shown in the sign-in interface and are intentionally stored only in the client demo; replace them with a server-side identity provider, hashed credentials, secure sessions, and database-backed role assignments before production use.

Successful admissions submissions and fee payment requests create notification records through `src/lib/notifications.ts`. Set `VITE_EMAIL_NOTIFICATION_ENDPOINT` to a trusted server-side email adapter to dispatch those events through the school’s email provider. The browser must not hold provider API keys, and the current default is an explicit local preview queue.
