<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## School website architecture
- Use the root route for the shared school header and footer, and separate content routes for school information so every page has a shareable URL.
- Keep the two campus records in the browser-safe school module so overview and detail pages stay consistent.
- Use generated local photography and original sample content; do not import the unlicensed reference website.
