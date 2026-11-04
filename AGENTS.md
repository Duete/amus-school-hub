## School website architecture

- Use the root route for the shared school header and footer, and separate content routes for school information so every page has a shareable URL.
- Keep the two campus records in the browser-safe school module so overview and detail pages stay consistent.
- Use generated local photography and original sample content; do not import unlicensed reference-site content.
- Keep public school information crawlable in the initial HTML and keep authenticated portal data behind access checks.
- Run `pnpm run lint`, `pnpm run test`, and `pnpm run build` before publishing changes.
- Keep `use-sync-external-store/shim/with-selector` in Vite `optimizeDeps.include`; it is CJS imported with a named ESM import by @tanstack/react-store, and without pre-bundling the browser gets raw CJS and the client bundle never hydrates, so no click works.
