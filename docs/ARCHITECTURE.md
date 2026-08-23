# Next Minds — Monorepo Architecture

## Why this exists

`next-mind` put everything inside one Next.js app: 63 Server Actions, 48 async
Server Components querying Postgres directly, and the Sequelize models sitting
in `src/db`. That works, and it is fast — a page render is `Postgres → HTML`
with no network hop. It also means there is no reusable API, no way to scale
reads independently of rendering, and no boundary stopping a view from
serialising a whole ORM model into the page.

This repo separates the two without pretending the split is free.

> **Latency, stated plainly.** A request that was `Postgres → HTML` becomes
> `Next → HTTP → Nest → Postgres → HTTP → Next → HTML`. Against a database in
> `ap-southeast-1` that already shows ~2s cold TTFB, the split makes raw page
> latency *worse*, not better. What it buys is an API that mobile and partners
> can call, independent deploy and scale, and enforced boundaries. Optimise the
> added hop with caching at the edge, not by hoping it disappears.

## Layout

```
nextminds/
├── apps/
│   ├── web/          @nextminds/web    Next.js 16 — rendering, routing, SEO
│   └── api/          @nextminds/api    NestJS 11 — domain logic, data access
├── packages/
│   ├── contracts/    @nextminds/contracts   Zod schemas + enums + policy model
│   ├── db/           @nextminds/db          Sequelize models, migrations, schema
│   └── tsconfig/     @nextminds/tsconfig    shared compiler settings
├── docs/
├── scripts/
├── turbo.json        task graph + caching
└── pnpm-workspace.yaml
```

## The dependency rule

```
        ┌─────────────┐         ┌─────────────┐
        │  apps/web   │  HTTP   │  apps/api   │
        │  (Next.js)  │ ──────► │  (NestJS)   │
        └──────┬──────┘         └──────┬──────┘
               │                       │
               │   ┌───────────────┐   │
               └──►│   contracts   │◄──┘
                   │ Zod + enums   │
                   └───────────────┘
                                       │
                                ┌──────▼──────┐
                                │     db      │
                                │  Sequelize  │
                                └─────────────┘
```

Rules, in priority order:

1. **`contracts` depends on nothing.** No Next, no Nest, no Sequelize. Both
   sides import it, so a changed request shape breaks *both* compilations in the
   same commit instead of failing at runtime in production.
2. **Only `apps/api` should own `db`.** `apps/web` still imports it today —
   that is the migration debt, not the target. Every domain moved to the API
   removes web call sites, and the split is finished when `apps/web` drops the
   `@nextminds/db` dependency entirely.
3. **No ORM type crosses a package boundary.** Repositories map to plain DTOs.
   This is enforced by the compiler, not by convention: TypeScript rejects the
   leak with TS2742 under `declaration: true`, which is exactly how the
   `CoursesRepository` DTOs came to be written by hand.

## The reference domain

`apps/api/src/modules/courses` is the template. Copy its shape:

| file | responsibility | may import |
|---|---|---|
| `*.controller.ts` | HTTP only — routes, status codes, Swagger | service, dto |
| `*.service.ts` | business rules, authorisation decisions | repository, dto |
| `*.repository.ts` | the only file that knows Sequelize exists | `@nextminds/db` |
| `*.dto.ts` | the wire format, written by hand | nothing |

The repository already encodes a lesson from the old app: `CARD_ATTRIBUTES`
selects card columns explicitly, because handing a full model to the view is
what put 190KB of course markdown into every page payload.

## Migration path

The site keeps working at every step. Nothing below is a big-bang cut-over.

| phase | scope | risk |
|---|---|---|
| **0 — done** | Monorepo, shared packages, API scaffold, Courses read path | none, additive |
| **1** | Public reads: courses, posts, categories. Web fetches over HTTP. | low — read-only, cacheable |
| **2** | Write endpoints already shaped as APIs: enroll, contact, enterprise | low — 3 existing route handlers |
| **3** | **Auth.** better-auth moves to the API; cookies must work cross-origin; `src/proxy.ts` becomes a token check | **highest** — do it alone, nothing else in the same release |
| **4** | Admin CRUD — the bulk of the 63 Server Actions | medium, repetitive |
| **5** | LMS: batches, lessons, submissions, grading | medium |
| **6** | Delete Server Actions; drop `@nextminds/db` from `apps/web` | — |

### The two hard parts, named up front

**Auth (phase 3).** better-auth is wired to `next/headers` and the
`nextCookies()` plugin across 12 files plus the proxy. Split across origins, the
session cookie needs `SameSite=None; Secure` and an explicit CORS allowlist —
a wildcard origin with `credentials: true` is rejected by every browser, which
is why `CORS_ORIGINS` is a list and validated at boot.

**Revalidation (80 call sites).** `revalidatePath` only exists inside Next. Once
a mutation lives in Nest, it cannot call it. The API must POST to a revalidation
webhook on the web app (shared secret, `/api/revalidate`), and `src/lib/revalidate.ts`
becomes the handler for it rather than a direct call.

## Conventions

- **Package manager**: pnpm workspaces. One lockfile at the root; never run
  `install` inside an app.
- **Task running**: `turbo run <task>`. `dependsOn: ["^build"]` means packages
  build before the apps that consume them. Cold build ~35s, warm ~50ms.
- **Env**: validated at boot with Zod (`apps/api/src/config/env.ts`). The API
  refuses to start on a bad environment rather than failing on first request.
  The web app keeps its build-time placeholder fallback, because `next build`
  must evaluate modules without a database.
- **Errors**: one JSON shape from `HttpExceptionFilter`. Unexpected errors log
  their stack but answer generically — ORM error strings name tables and columns.
- **Validation**: Zod from `contracts`, via `ZodValidationPipe`. There is
  deliberately no global `ValidationPipe`; class-validator would be a second,
  unshared validation system.

## Known debt

- `apps/web` still talks to `@nextminds/db` directly. Expected during migration;
  see phase 6.
- **Resolved:** `schema.sql` and `migrations/` used to overlap, so a clean
  database could not be built from the repo - migration 1 failed on a column the
  old snapshot already had, later migrations never ran, and the web build then
  died on `Course.shortDesc`. `schema.sql` is now a dump of the fully-migrated
  schema and `sync` records all 19 migrations as applied, so
  `sync && migrate` on an empty database reports nothing pending. CI replays
  this on every run.
- `noUncheckedIndexedAccess` is **off for `apps/web` only**
  (`packages/tsconfig/nextjs.json`). The app moved from a config that never had
  it; enabling it as a side effect of the move would have meant fixing unrelated
  code. It is on everywhere else. Turn it on once the violations are cleared.
- `apps/web/src/db/{queries,student-queries,instructor-queries}.ts` use React
  `cache()`, so they are Next-side read paths, not shared data access. They are
  deleted as their domains move to the API.
- `seed.ts` lives in `apps/web` because it needs better-auth to hash the admin
  password. It follows auth to the API in phase 3.
