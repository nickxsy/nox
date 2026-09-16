# Repository Guide

- Use `pnpm` (the repository pins `pnpm@10.12.1`); do not introduce npm or yarn lockfiles.
- This is a single ESM TypeScript package, not a workspace. Source is under `src/`; the HTTP implementation is under `src/http/`.
- `src/http/server.ts` defines `Nox`; `src/index.ts` currently only side-effect imports that module, so the runnable example imports `Nox` directly from `src/http/server.js`.
- Run the example with `pnpm dev`; it watches `examples/app/app.ts` and listens on port 8080.
- Run `pnpm build` for the TypeScript check/build; output goes to `dist/`.
- Run all tests with `pnpm test`; run one focused file with `pnpm exec vitest run src/http/server.test.ts`.
- HTTP server tests are colocated in `src/http/*.test.ts` and use Vitest with Supertest; keep tests isolated from fixed ports.
- Run `pnpm lint` and `pnpm fmt:check` before finishing changes; use `pnpm fmt` to apply the repository formatter.
- Formatting is configured in `oxfmt.config.ts`: 80-column width, single quotes, semicolons, sorted imports, and 2-space indentation.
- Lefthook runs formatting and lint in parallel before commits, and the full test suite before pushes.