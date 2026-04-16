# Advanced — Full-Stack Next.js Roadmap
> Senior-level. You build production apps. Now focus on quality, scale, architecture, and the stuff that separates good devs from great ones.

---

## TypeScript — Senior Level

- [ ] Conditional types — `T extends U ? X : Y`
- [ ] Mapped types — `{ [K in keyof T]: ... }`
- [ ] Template literal types — `` `on${Capitalize<string>}` ``
- [ ] `infer` keyword in conditional types
- [ ] Recursive types — types that reference themselves
- [ ] Variance — covariance and contravariance in generics
- [ ] Declaration merging — extending interfaces from third-party libs
- [ ] Module augmentation — adding types to existing modules
- [ ] `satisfies` operator — validate without widening type
- [ ] `const` assertions — `as const`
- [ ] Branded / nominal types — preventing mixing of same-shaped types
- [ ] Strict function types — `strictFunctionTypes` implications
- [ ] TypeScript project references — for monorepos
- [ ] Writing custom `.d.ts` declaration files
- [ ] Type-level programming — advanced generic manipulation

---

## React — Advanced Patterns & Architecture

- [ ] Compound components pattern — full implementation
- [ ] Controlled / headless component pattern
- [ ] Provider pattern — nested providers, composition
- [ ] Observer pattern in React
- [ ] Factory pattern for dynamic component rendering
- [ ] Virtualization — `react-window`, `react-virtual` for long lists
- [ ] `startTransition` and `useTransition` — concurrent features
- [ ] `useDeferredValue` — when and why
- [ ] `useOptimistic` — built-in optimistic UI hook (React 19)
- [ ] `use()` hook — React 19 promise unwrapping
- [ ] React Server Components internals — how RSC serialization works
- [ ] Streaming and Suspense — deep understanding of boundaries
- [ ] `React.cache()` — memoizing per-request in server components
- [ ] React compiler (React Forget) — awareness and impact

---

## Next.js — Advanced Patterns

- [ ] Parallel routes — dashboard with multiple `@slot` segments
- [ ] Intercepting routes — modal patterns, photo feeds
- [ ] PPR (Partial Pre-rendering) — static shell with dynamic Suspense holes
- [ ] Edge runtime — limitations, use cases, `export const runtime = 'edge'`
- [ ] Custom server with Next.js — when and why (websockets use case)
- [ ] Multi-zone architecture — multiple Next.js apps under one domain
- [ ] Output modes — `standalone` output for Docker deployment
- [ ] `unstable_cache` — fine-grained server-side caching
- [ ] `cacheTag` and `cacheLife` — Next.js 15 caching APIs
- [ ] Middleware chaining — composing multiple middleware functions
- [ ] Middleware with edge config — feature flags, A/B testing
- [ ] `next/headers` advanced usage — reading and setting headers server-side
- [ ] Internationalization (i18n) — `next-intl`, locale detection, locale routing
- [ ] Subdomain routing — routing based on hostname in middleware
- [ ] Multi-tenancy — per-tenant data isolation strategies

---

## Advanced Data Fetching & Caching

- [ ] Next.js caching layers — Request Memoization, Data Cache, Full Route Cache, Router Cache
- [ ] Cache invalidation strategies — `revalidatePath`, `revalidateTag`, on-demand ISR
- [ ] `fetch` options deep dive — `next: { revalidate, tags }`
- [ ] Stale-while-revalidate pattern
- [ ] TanStack Query advanced — `prefetchQuery`, `dehydrate`, `HydrationBoundary` for SSR
- [ ] Optimistic updates with TanStack Query — `onMutate`, `onError` rollback
- [ ] Infinite scroll — `useInfiniteQuery`, cursor-based pagination
- [ ] Server Actions advanced — revalidation, redirects, error handling
- [ ] Server Actions with optimistic UI — `useOptimistic` + server action
- [ ] Streaming responses — `ReadableStream`, chunked responses in route handlers
- [ ] Server-Sent Events (SSE) — implementing in Route Handlers
- [ ] Streaming AI responses — Vercel AI SDK, `useChat`, `useCompletion`

---

## Backend & Database — Advanced

- [ ] Database query optimization — `EXPLAIN ANALYZE`, reading query plans
- [ ] N+1 problem — what it is, how to fix with `include` / DataLoader
- [ ] Database indexes — composite indexes, partial indexes, when to index
- [ ] Database transactions — ACID properties, isolation levels
- [ ] Prisma advanced — `$queryRaw`, `$executeRaw` for complex queries
- [ ] Prisma advanced — middleware, soft deletes, audit logging
- [ ] Drizzle ORM — full implementation, migrations, relations
- [ ] Connection pooling with PgBouncer — why needed in serverless
- [ ] Read replicas — offloading reads, connection routing
- [ ] Full-text search — Postgres `pg_trgm`, `to_tsvector` / `to_tsquery`
- [ ] Full-text search with Algolia or Typesense — external search services
- [ ] Database migrations in production — zero-downtime migration strategies
- [ ] Soft deletes — `deletedAt` pattern vs hard deletes
- [ ] Pagination patterns — offset vs cursor-based, pros and cons
- [ ] Upstash Redis — caching, rate limiting, sessions, pub/sub
- [ ] Background jobs — QStash, Trigger.dev, or cron-based API routes
- [ ] File uploads — Vercel Blob, AWS S3, Cloudflare R2 — presigned URLs

---

## Real-time & WebSockets

- [ ] WebSockets — protocol, use cases, vs HTTP
- [ ] WebSockets with Next.js — limitations with serverless, custom server approach
- [ ] Pusher / Ably — managed WebSocket services, integration with Next.js
- [ ] Server-Sent Events (SSE) — one-way streaming from server to client
- [ ] Polling vs SSE vs WebSockets — choosing the right approach
- [ ] Real-time database sync — Supabase Realtime, PlanetScale awareness

---

## Testing

- [ ] Testing philosophy — what to test, what NOT to test
- [ ] Testing pyramid — unit, integration, E2E ratio and why
- [ ] Unit testing with Vitest or Jest — setup, `describe`, `it`, `expect`
- [ ] Testing pure functions — simple, no mocking needed
- [ ] React Testing Library (RTL) — `render`, `screen`, `userEvent`
- [ ] RTL queries — `getByRole`, `getByText`, `getByLabelText`, `findBy*`, `queryBy*`
- [ ] `userEvent` vs `fireEvent` — prefer `userEvent` for realistic simulation
- [ ] Mocking modules — `vi.mock()` / `jest.mock()`
- [ ] Mocking `fetch` — `msw` (Mock Service Worker) for API mocking
- [ ] Testing async components — `waitFor`, `findBy*`
- [ ] Integration testing — testing multiple components working together
- [ ] Testing server actions and route handlers
- [ ] Testing auth flows — mocking sessions, protected routes
- [ ] E2E testing with Playwright — `page`, `locator`, `expect`
- [ ] Playwright — navigation, form interaction, network interception
- [ ] Playwright — fixtures, page object model pattern
- [ ] CI integration — running tests on push with GitHub Actions
- [ ] Code coverage — what it measures, realistic coverage targets
- [ ] Snapshot testing — when useful, when it becomes noise
- [ ] Storybook — component documentation, visual testing, interaction tests

---

## Performance

- [ ] Core Web Vitals — LCP, INP, CLS — what they mean and how to fix each
- [ ] Lighthouse auditing — running, interpreting, acting on results
- [ ] `@next/bundle-analyzer` — visualizing bundle size
- [ ] Code splitting — how Next.js does it automatically
- [ ] `next/dynamic` — dynamic imports for heavy client components
- [ ] Tree shaking — how it works, what prevents it
- [ ] Image optimization — WebP, AVIF, responsive `srcset`, `sizes` attribute
- [ ] Font optimization — `font-display: swap`, preloading, variable fonts
- [ ] Third-party script loading — `next/script`, `strategy` prop
- [ ] HTTP cache headers — `Cache-Control`, `s-maxage`, `stale-while-revalidate`
- [ ] CDN caching — what gets cached, how to bust cache
- [ ] Database query optimization — indexes, query plan analysis
- [ ] React performance — unnecessary re-renders, profiler usage
- [ ] Virtualization for long lists — `react-window`, `@tanstack/react-virtual`
- [ ] Prefetching — `<Link prefetch>`, `router.prefetch()`
- [ ] Edge caching strategies — caching at CDN vs origin

---

## Security

- [ ] OWASP Top 10 — understanding and mitigating each
- [ ] XSS (Cross-Site Scripting) — how it works, sanitizing input, `dangerouslySetInnerHTML` risks
- [ ] CSP (Content Security Policy) headers — setup in `next.config.js`
- [ ] CSRF (Cross-Site Request Forgery) — SameSite cookies, double submit pattern
- [ ] SQL injection — why parameterized queries / ORMs protect you
- [ ] Server-side input validation with Zod — always validate on the server
- [ ] Environment variable security — never expose secrets with `NEXT_PUBLIC_`
- [ ] Rate limiting — Upstash Redis rate limiter, middleware-based
- [ ] HTTPS, HSTS, security headers — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`
- [ ] Authentication security — secure cookie flags, `httpOnly`, `secure`, `sameSite`
- [ ] Authorization — always check permissions server-side, never trust client
- [ ] Dependency auditing — `npm audit`, keeping packages updated
- [ ] Secrets scanning — preventing accidental commits of API keys

---

## Infrastructure & Deployment

- [ ] Vercel deployment — project setup, env variables, preview deployments
- [ ] Vercel Edge Network — CDN, edge functions, what gets cached
- [ ] Preview deployments — per-PR environments, sharing with stakeholders
- [ ] Production vs staging environments
- [ ] CI/CD with GitHub Actions — running tests, linting, deploying on push
- [ ] Docker basics — `Dockerfile`, `docker build`, `docker run`
- [ ] Dockerizing a Next.js app — `standalone` output mode
- [ ] Docker Compose — running app + database locally
- [ ] Deploying to custom server — VPS, Railway, Render, Fly.io
- [ ] DNS, domains, SSL certificates — basics of pointing a domain
- [ ] Vercel Blob / AWS S3 / Cloudflare R2 — file storage, CDN delivery
- [ ] Serverless function limits — cold starts, execution time, memory
- [ ] Edge functions — limitations, use cases, vs serverless

---

## Monitoring & Observability

- [ ] Vercel Analytics — page views, performance metrics
- [ ] Vercel Speed Insights — real-user Core Web Vitals data
- [ ] Sentry — error tracking setup in Next.js, source maps upload
- [ ] Sentry — performance tracing, session replay
- [ ] Structured logging — why `console.log` isn't enough in production
- [ ] Axiom / Datadog / Logtail — log aggregation and querying
- [ ] Health check endpoints — `app/api/health/route.ts`
- [ ] Alerting — being notified before users are
- [ ] Core Web Vitals monitoring — tracking regressions over time

---

## Developer Experience & Architecture

- [ ] ESLint config for Next.js — custom rules, import ordering with `eslint-plugin-import`
- [ ] Prettier — setup, `.prettierrc`, format-on-save in VS Code
- [ ] Husky + lint-staged — pre-commit hooks, only lint changed files
- [ ] Absolute imports — `tsconfig.json` `paths`, `@/components/...`
- [ ] Monorepo with Turborepo — workspace setup, multiple Next.js apps
- [ ] Shared packages — UI library, utils, types shared across monorepo apps
- [ ] `turbo.json` — pipeline config, caching tasks
- [ ] Feature flags — LaunchDarkly, Statsig, or custom middleware-based implementation
- [ ] A/B testing via middleware — edge config, splitting traffic
- [ ] OpenAPI / Swagger documentation for Route Handlers
- [ ] API documentation — keeping it in sync with implementation
- [ ] Architecture decision records (ADRs) — documenting why decisions were made
- [ ] Dependency injection patterns — testability, modularity
- [ ] Domain-driven design basics — organizing code by domain not by type
