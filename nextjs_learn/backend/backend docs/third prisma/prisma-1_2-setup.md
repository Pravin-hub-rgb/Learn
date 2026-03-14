# Phase 1.2 — Project Setup — `npx prisma init`

## Pichle Doc Se Aage

1.1 mein:
- Prisma kya hai samajh aaya
- Drizzle se kaise alag hai — approach aur query style

Ab project banate hain — Prisma install karte hain.

---

## Naya Next.js Project

Pehle fresh project banao — Drizzle wala alag tha — yeh naya hoga:

```bash
npx create-next-app@latest todo-prisma
```

Options same rakhna:
```
TypeScript → Yes
Tailwind   → Yes
App Router → Yes
src/       → No
```

Project folder mein jao:

```bash
cd todo-prisma
```

---

## Prisma Install Karo

Do packages chahiye:

```bash
npm install prisma @prisma/client
```

**`prisma`** — development tool — schema likhne ke liye, migrations ke liye, types generate karne ke liye.

**`@prisma/client`** — runtime package — queries chalane ke liye — `prisma.todo.findMany()` yahi se aata hai.

> *"Drizzle mein sirf `drizzle-orm` tha — yahan do kyun?"*

Kyunki Prisma ka kaam do hissa hai:
```
prisma         → developer tool — "schema se code banao"
@prisma/client → app mein use hone wala — "database se baat karo"
```

Drizzle mein yeh dono ek hi package mein the — Prisma ne alag rakha.

---

## `npx prisma init` Chalao

```bash
npx prisma init
```

Yeh command do kaam karta hai — dekhte hain kya kya bana:

```
todo-prisma/
├── prisma/
│   └── schema.prisma    ← naya folder + file bani
└── .env                 ← naya file bana
```

---

## `schema.prisma` — Pehli Nazar

Abhi `prisma/schema.prisma` mein yeh default content hai:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**`generator client`** — Prisma ko batao "kaunsa client generate karna hai" — `prisma-client-js` matlab TypeScript/JavaScript ke liye.

**`datasource db`** — database ki details:
```
provider = "postgresql"   ← hum PostgreSQL use kar rahe hain
url = env("DATABASE_URL") ← connection string .env file se aayegi
```

> *"Drizzle mein connection string seedha `db/index.ts` mein `.env.local` se le rahe the — yahan `.env` kyun?"*

Prisma `.env` file dhundta hai — `.env.local` nahi — Next.js `.env.local` use karta hai par Prisma ka apna tool directly `.env` padta hai. Dono files rakh sakte hain — Next.js `.env.local` padhega, Prisma `.env` padhega.

---

## `.env` File — DATABASE_URL Daalo

`.env` file mein abhi yeh hoga:

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

Yeh placeholder hai — apni Neon connection string daalni hai.

Neon Dashboard pe jao — apna project kholo — **Connection Details** mein jao — connection string copy karo.

`.env` file update karo:

```
DATABASE_URL="postgresql://username:password@ep-something.neon.tech/neondb?sslmode=require"
```

Aur `.env.local` mein bhi same daalo — Next.js ke liye:

```
DATABASE_URL="postgresql://username:password@ep-something.neon.tech/neondb?sslmode=require"
```

> *"Do jagah same cheez — redundant nahi lagta?"*

Lagta hai — par reason yeh hai: Prisma CLI `.env` padhta hai, Next.js app `.env.local` padhta hai. Dono ko chahiye.

---

## `.gitignore` Check Karo

`.env` file mein secrets hain — git mein nahi jaana chahiye. `.gitignore` mein check karo:

```
.env
.env.local
```

Dono hone chahiye. Next.js project mein yeh default hote hain. ✅

---

## Abhi Tak Project Structure:

```
todo-prisma/
├── prisma/
│   └── schema.prisma    ← Prisma schema — abhi sirf boilerplate
├── app/
│   └── page.tsx
├── .env                 ← DATABASE_URL — Prisma ke liye
├── .env.local           ← DATABASE_URL — Next.js ke liye
└── package.json
```

---

## Aaj Ka Summary

✅ `prisma` + `@prisma/client` — do packages — alag roles  
✅ `npx prisma init` — `prisma/` folder + `.env` bana  
✅ `schema.prisma` — `generator` + `datasource` — boilerplate samjha  
✅ `.env` mein Neon connection string daali  
✅ `.env.local` bhi — Next.js ke liye  

---

## Agla Step

**Phase 1.3** — `schema.prisma` mein Todo model likhenge — Drizzle ke `pgTable` se compare karenge! 📝
