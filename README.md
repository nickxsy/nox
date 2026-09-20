# Nox

Small ESM HTTP server for Node.js written in TypeScript.

## Development

```sh
pnpm install
pnpm dev
```

The example server listens on port `8080`. Run `pnpm test` for tests,
`pnpm build` for the TypeScript build, and `pnpm lint` for static checks.

## API

```ts
import { Nox } from 'nox';

const app = new Nox();

app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id });
});

app.listen(8080);
```

Handlers can call `await next()` to continue through the route middleware
chain. Request bodies are cached after the first call and limited to 1 MiB by
default; configure the limit with `new Nox({ bodyLimit })`.