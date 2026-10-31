## School website architecture

- Use the root route for the shared school header and footer, and separate content routes for school information so every page has a shareable URL.
- Keep the two campus records in the browser-safe school module so overview and detail pages stay consistent.
- Use generated local photography and original sample content; do not import unlicensed reference-site content.
- Keep public school information crawlable in the initial HTML and keep authenticated portal data behind access checks.
- Run `pnpm run lint`, `pnpm run test`, and `pnpm run build` before publishing changes.
