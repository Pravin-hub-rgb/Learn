# 20 — Meta Tools: TypeScript, tRPC, Zod, Monorepos, Package Managers

> Umbrella: Meta Tools
> Kaam: Type safety, full-stack APIs, code organization, package management
> Yeh tools "ek category" mein fit nahi hote — poori stack pe kaam karte hain

---

## TypeScript
**Tag: 🟢 Industry Standard | Learn ASAP**

```
Kya hai: JavaScript + Types — variables ka type pehle se define karo
Kab use karo: Almost every production project — 2024 mein default

Why important:
  → Typos → Compile time error (runtime nahi)
  → Autocomplete better
  → Refactoring safe
  → Team mein code samajhna easy

Code feel:
  // JavaScript — koi type safety nahi
  function addToCart(item) { ... }
  addToCart(123)  // Mistake — number pass kiya, koi error nahi

  // TypeScript — type safe
  interface CartItem { id: number; name: string; price: number }
  function addToCart(item: CartItem) { ... }
  addToCart(123)  // ❌ Error at compile time — "number is not CartItem"

Real app:
  → Almost every serious Indian startup TypeScript use karta hai
  → Next.js mein .tsx files — TypeScript by default

Zod ke saath:
  → Zod schema → TypeScript type automatically
  → Frontend + backend same types

India mein: 2022 ke baad almost mandatory for new projects
Beginners: JavaScript pehle seekho → Phir TypeScript (1-2 mahine baad)
```

---

## tRPC
**Tag: 🟢 End-to-end Type Safety | Next.js + TypeScript**

```
Kya hai: API layer — frontend aur backend ke beech type-safe RPC calls
Kab use karo:
  → TypeScript project
  → Frontend aur backend same codebase mein (monorepo ya Next.js)
  → REST endpoints manually likhna nahi chahte

Kya solve karta hai:
  REST API problem:
    Backend: POST /api/orders return karta hai Order type
    Frontend: Guess karna padta hai kya aayega — types manually maintain

  tRPC:
    Backend mein procedure define karo → Frontend automatically types jaanta hai
    Koi API contract manually nahi — type system handle karta hai

Code feel:
  // Server
  const appRouter = router({
    createOrder: procedure
      .input(z.object({ address: z.string() }))
      .mutation(async ({ input, ctx }) => {
        return await createOrder(ctx.userId, input.address)
      })
  })

  // Client — fully typed, no API docs needed
  const order = await trpc.createOrder.mutate({ address: '123 MG Road' })
  // TypeScript jaanta hai order ka type kya hai — automatically

Real app example:
  → T3 Stack: Next.js + tRPC + Prisma + Tailwind + NextAuth — popular combo
  → Internal tools, SaaS dashboards

Kab mat use karo:
  → Public API banana hai (third-party use karegi) → REST ya GraphQL
  → Mobile app separately → REST better
  → tRPC sirf same-codebase frontend-backend ke liye

India mein: T3 Stack users mein popular — growing
```

---

## OpenAPI / Swagger
**Tag: 🟢 API Documentation | REST standard**

```
Kya hai: REST API documentation format — automatically generate docs
Kab use karo:
  → Public API hai
  → Multiple teams same API use karti hain
  → API contract document karna hai

Code feel:
  // Zod-to-OpenAPI ya manual
  /**
   * @openapi
   * /api/products:
   *   get:
   *     summary: Get all products
   *     responses:
   *       200:
   *         description: Product list
   */

Swagger UI:
  → /api-docs pe interactive documentation
  → Teams API test kar sakti hain bina Postman ke

tRPC se fark:
  → OpenAPI: Public REST APIs, multiple clients
  → tRPC: Internal, TypeScript-only, same codebase
```

---

## Monorepos

```
Kya hai: Multiple projects ek repository mein
Kab chahiye:
  → Web app + Mobile app + Shared components
  → Multiple microservices
  → Shared types/utilities across projects
```

### Turborepo
**Tag: 🟢 Most Popular | Vercel**

```
Kya hai: Monorepo build system — fast builds, caching
Kab use karo: Multiple Next.js apps, shared packages

Structure:
  /apps
    /web          → shopkaro.com
    /admin        → admin.shopkaro.com
    /mobile       → React Native
  /packages
    /ui           → Shared components
    /types        → Shared TypeScript types
    /config       → Shared configs
```

### Nx
**Tag: 🟢 Enterprise Monorepo | More features**

```
Kya hai: Enterprise monorepo tool — code generation, dependency graph
Kab use karo: Large teams, complex monorepo

Turborepo se fark: More features, more complex
```

---

## Package Managers

---

### npm
**Tag: 🟢 Default | Always available**

```
Kya hai: Node.js ka default package manager
Kab use karo: Simple projects, default theek hai

Cons: Slower than alternatives, larger node_modules
```

---

### pnpm
**Tag: 🟢 Recommended | Fast | Disk efficient**

```
Kya hai: Fast, disk-efficient package manager
Kab use karo: Almost always — npm se better

Pros:
  → 2x faster than npm
  → Disk space: Packages share karta hai — total less space
  → Monorepos: pnpm workspaces built-in

India mein: Growing — especially monorepo users
```

---

### Yarn
**Tag: 🟡 Older npm alternative | Declining**

```
Status: pnpm ne le li popularity — naye projects mein avoid
Existing: Yarn codebase hai → Rehne do
```

---

### Bun
**Tag: 🟢 All-in-one | Fastest | New**

```
Kya hai: JavaScript runtime + package manager + bundler — sab ek mein
Runtime: Node.js alternative — 3x faster
Package manager: pnpm se bhi fast

Kab use karo:
  → Speed critical hai
  → Elysia framework use kar rahe ho
  → Experiment karna hai

Status: 1.0 release ho gaya — production mein use ho raha hai
Cons: Ecosystem chhota — kuch packages Node.js specific hain → Bun pe kaam nahi karte

India mein: Experimental projects — watch karo
```

---

## Complete Series Summary — Ek Baar Dekho

```
FRONTEND:
  State:       Zustand (new) | Redux Toolkit (enterprise) | Context (stable)
  Styling:     Tailwind (new) | CSS Modules (safe) | SCSS (design system)
  Components:  shadcn/ui (new) | MUI (enterprise) | Ant Design (B2B)
  Forms:       React Hook Form + Zod
  HTTP:        React Query + Axios (or fetch)
  Animation:   Framer Motion (UI) | GSAP (marketing)
  Framework:   Next.js (almost always)

BACKEND:
  Framework:   Next.js API routes (simple) | Hono/Fastify (dedicated) | NestJS (enterprise)
  ORM:         Prisma (default) | Drizzle (edge) | Mongoose (MongoDB)
  Real-time:   Socket.io (two-way) | SSE (one-way) | Pusher (serverless)
  Email:       Resend (new) | SendGrid (enterprise)
  Queue:       Inngest (serverless) | BullMQ (self-hosted)
  Storage:     Cloudinary (images) | S3 (enterprise) | Uploadthing (Next.js)

DATABASE:
  SQL:         PostgreSQL (default) | MySQL (legacy/WordPress)
  Hosted:      Neon (serverless) | Supabase (all-in-one)
  NoSQL:       MongoDB (flexible) | Redis (cache/queue)
  Search:      Algolia (managed) | Typesense (self-host) | Postgres FTS (simple)

AUTH:          NextAuth (Next.js) | Clerk (fast) | Better Auth (new)

TESTING:       Vitest + RTL (unit) | Playwright (E2E) | MSW (mocking)

DEVOPS:
  Hosting:     Vercel (Next.js) | Railway (full backend) | AWS (enterprise)
  CI/CD:       GitHub Actions
  Monitoring:  Sentry (errors) | PostHog (analytics)

META:          TypeScript (always) | tRPC (internal APIs) | pnpm (package manager)
```

---

Yeh hai poori web dev duniya — har tool ka naam, umbrella, aur kab use karna hai. 🎯
