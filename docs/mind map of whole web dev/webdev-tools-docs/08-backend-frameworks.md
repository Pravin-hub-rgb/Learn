# 08 — Backend Frameworks: Express, Fastify, Hono, NestJS

> Umbrella: Backend → Frameworks
> Kaam: HTTP server — requests receive karo, process karo, respond karo
> Note: Next.js use kar rahe ho → API routes use karo, alag backend optional hai

---

## Kab Alag Backend Framework Chahiye

```
Next.js API routes kaafi hain jab:
  → Ek team, ek codebase
  → Simple to medium complexity
  → ShopKaro jaisa app

Alag backend framework kab:
  → Multiple frontends (web + mobile) same API use karein
  → Microservices architecture
  → Backend team alag hai
  → Next.js se zyada control chahiye
```

---

## Tools

---

### Express.js
**Tag: 🟡 Legacy | Most Known | Huge ecosystem**

```
Kya hai: Minimal, unopinionated Node.js framework — most popular tha 2015-2022
Kab use karo:
  → Existing Express codebase
  → Sikhne ke liye — concepts clear hote hain
  → Bahut saari Express-specific libraries chahiye

Kab mat use karo:
  → Naya project — Fastify ya Hono better performance
  → TypeScript-first project — NestJS ya Hono better

Real app example:
  → Purani Zomato backend (hypothetically)
  → Majority of Indian startups 2015-2022
  → npm ki aadhi packages Express examples mein hain

Code feel:
  const express = require('express')
  const app = express()

  app.get('/products', async (req, res) => {
    const products = await db.find()
    res.json(products)
  })

  app.listen(3000)

Cons:
  → Slow compared to Fastify/Hono
  → TypeScript setup manual
  → No structure — tum decide karo sab

India mein: Bahut purane projects mein milega — aaj bhi taught in bootcamps
```

---

### Fastify
**Tag: 🟢 Express Alternative | Fast | TypeScript-friendly**

```
Kya hai: Express jaisa lekin 2x fast, TypeScript support better
Kab use karo:
  → New Node.js backend chahiye, Express nahi banana
  → Performance matter karta hai
  → TypeScript project

Express se fark:
  → 2x faster than Express (benchmarks)
  → Schema-based validation built-in (Zod/JSON Schema)
  → Plugin system better
  → TypeScript support cleaner

Real app example:
  → Medium-large Indian startups jo Express se migrate kare
  → Mercurius (GraphQL on Fastify) — Nearform use karta hai

Code feel:
  const fastify = require('fastify')()

  fastify.get('/products', async (request, reply) => {
    return await getProducts()  // Automatically JSON serialize
  })

India mein: Growing — purane projects mein Express, naye mein Fastify ya Hono
```

---

### Hono
**Tag: 🟢 Modern | Edge-ready | TypeScript-first | Growing Fast**

```
Kya hai: Ultra-fast, lightweight web framework — multiple runtimes (Node, Deno, Bun, Edge)
Kab use karo:
  → Naya backend, TypeScript project
  → Edge functions (Cloudflare Workers)
  → Modern stack chahiye
  → Bun runtime use kar rahe ho

Special: Cloudflare Workers pe bhi chalta hai — edge deployment
TypeScript se: First-class support — types everywhere

Real app example:
  → Cloudflare Workers pe API
  → Modern startups ki new services
  → Bun + Hono → Very fast backend

Code feel:
  import { Hono } from 'hono'
  const app = new Hono()

  app.get('/products', async (c) => {
    const products = await getProducts()
    return c.json(products)
  })

  export default app

Express se fark:
  → Hono: Multi-runtime, TypeScript-first, smaller
  → Express: Node.js only, CommonJS, older

India mein: Naye projects mein adopt ho raha hai — especially Cloudflare/edge users
```

---

### NestJS
**Tag: 🟢 Enterprise | TypeScript | Angular-like structure**

```
Kya hai: Opinionated TypeScript framework — Angular jaise decorators, modules, DI
Kab use karo:
  → Large enterprise backend
  → Badi team — structure enforce karna ho
  → Angular background hai
  → Microservices

Express/Fastify se fark:
  → NestJS: Opinionated — structure pehle se decide
  → Express: Unopinionated — tum structure decide karo
  → NestJS: Zyada boilerplate lekin consistent
  → NestJS internally Express ya Fastify use karta hai

Real app example:
  → Large Indian product companies
  → Fintech backends
  → Companies jahan multiple backend developers hain

Code feel:
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll() {
      return this.productsService.findAll()
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
      return this.productsService.create(createProductDto)
    }
  }

Kab mat use karo:
  → Chhota team, chhota project — overkill
  → Angular background nahi hai — steep learning curve

India mein: Enterprise mein growing — Infosys, TCS type companies + funded startups
```

---

### Elysia
**Tag: 🔵 Bun runtime | Ultra fast | New**

```
Kya hai: Bun ke liye optimized framework — extreme performance
Kab use karo:
  → Bun runtime use kar rahe ho
  → Maximum performance chahiye

Status: New — ecosystem chhota hai, production mein carefully use karo
Bun kya hai: Node.js alternative — JavaScript runtime, package manager, bundler sab ek
```

---

### Koa
**Tag: 🟡 Express successor (same team) | Older**

```
Kya hai: Express ke creators ne banaya — modern async support
Status: Express se better tha 2018 mein — ab Fastify/Hono ne replace kar diya
Kab use karo: Existing Koa codebase
```

---

## Quick Decision

```
Next.js se alag backend chahiye?
  ↓
TypeScript project?
  → Haan → Hono ya Fastify ya NestJS
  → Nahi → Express (lekin TypeScript seekho)

Team size?
  → Chhoti team, startup → Hono ya Fastify
  → Badi team, enterprise → NestJS

Edge/Cloudflare deployment?
  → Hono (only choice practically)

Existing codebase?
  → Jo hai wahi use karo — rewrite ki zaroorat nahi
```

---

## India Mein Reality

```
Bootcamp / Learning:           Express (most tutorials)
Startup (new 2024):            Hono ya Fastify ya Next.js API routes
Mid-size company:              Express ya Fastify
Enterprise:                    NestJS
Microservices:                 NestJS ya Hono per service
```

---

## Agla Doc

`09-backend-orm.md` — ORMs — Prisma, Drizzle, Sequelize, TypeORM — database se baat karne ke sab tarike, kab raw SQL, kab ORM, kab kaunsa ORM.
