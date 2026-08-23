# Next Minds — monorepo

Next.js frontend and NestJS backend for nextmindsinfosys.com.

See **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** for the dependency rules,
the migration path, and the trade-offs behind the split.

## Getting started

```bash
pnpm install
docker compose up -d postgres          # Postgres on :5434

cp apps/api/.env.example apps/api/.env # fill in DATABASE_URL
cp apps/web/.env.example apps/web/.env

pnpm --filter @nextminds/db sync       # apply schema.sql to a fresh database
pnpm db:migrate                        # then the migrations

pnpm dev                               # web :3000, api :4000
```

| command | what it does |
|---|---|
| `pnpm dev` | every app in watch mode |
| `pnpm build` | build the whole graph, packages first |
| `pnpm lint` / `pnpm typecheck` | across all workspaces |
| `pnpm db:migrate` | run migrations |
| `pnpm --filter @nextminds/api dev` | one workspace only |

API docs are served at `http://localhost:4000/api/docs` outside production.
# next-mind-site
