# Phase 2.2 — `lib/prisma.ts` — PrismaClient Connect Karo

## Pichle Doc Se Aage

2.1 mein:
- `prisma migrate dev` chalaya — table ban gayi Neon mein
- Migration kya hoti hai samjha — push se fark

Ab queries chalani hain — `prisma.todo.findMany()` — iske liye pehle **PrismaClient** banana padega.

---

## Coder Ki Soch

> *"Drizzle mein `db/index.ts` banaya tha — `neon()` se connection liya — `drizzle()` mein wrap kiya — `db` export kiya. Prisma mein kuch aisa hi hoga — dekhte hain."*

Haan — similar idea — par ek important fark hai jo samajhna padega.

---

## `lib/` Folder Kyun?

`app/` ke bahar — `lib/` folder banao:

```
todo-prisma/
├── app/
├── lib/              ← naya folder
│   └── prisma.ts     ← yeh banao
├── prisma/
└── ...
```

**`lib/` folder kyun?**

`lib/` = library helpers — jo cheezein poori app mein use hoti hain — database connection, utility functions — inhe `app/` ke bahar rakho. Next.js ka convention hai.

---

## Seedha Banao — Pehli Koshish

`lib/prisma.ts` banao:

```ts
import { PrismaClient } from '@prisma/client'
```

**`@prisma/client`** — woh package jo `npm install` pe aaya tha — aur `prisma migrate dev` pe generate hua tha — isme se `PrismaClient` aata hai.

Ab client banao:

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
```

> *"Bas itna? `new PrismaClient()` — aur kaam ho gaya? Drizzle mein toh connection string bhi deni padi thi."*

Prisma khud `.env` file padhta hai — `DATABASE_URL` wahan se le leta hai — tu alag se nahi deta. Simple lagta hai — par ek problem hai Next.js mein.

---

## Problem — Development Mein Bahut Saare Connections

Next.js development mein **Hot Reload** hota hai — code save karo — server restart — dobara restart — dobara.

Har restart pe agar `new PrismaClient()` chalega — ek naya connection banega — purana band nahi hua — Neon pe connections ka limit hai — jaldi exhaust ho jaayega.

> *"Toh kya karein?"*

**Global variable** mein store karo — ek baar bana — baar baar use karo — naya mat banao.

---

## Sahi Tarika — Global Instance

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
```

Tod ke samjhte hain — ek ek line:

---

**Line 1:**
```ts
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}
```

`globalThis` — JavaScript ka global object — browser mein `window`, Node mein `global` — yeh dono mein kaam karta hai.

Hum isme `prisma` naam ka slot banana chahte hain — TypeScript ko batao "is object mein `prisma` property ho sakti hai."

---

**Line 2:**
```ts
const prisma = globalForPrisma.prisma ?? new PrismaClient()
```

**`??`** — nullish coalescing — "agar left side `null` ya `undefined` hai toh right side use karo."

Matlab:
```
pehli baar  → globalForPrisma.prisma = undefined → new PrismaClient() banega
dobara      → globalForPrisma.prisma = client    → wahi purana use hoga
```

---

**Line 3:**
```ts
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

Production mein server restart nahi hota — toh wahan problem nahi — sirf development mein global mein store karo.

---

## Export — Seedha Default

```ts
export default prisma
```

`export default` — ek hi cheez export ho rahi hai — import karte waqt naam khud rakh sakte hain — par convention se `prisma` hi rakhenge.

---

## Poori `lib/prisma.ts`:

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
```

---

## Drizzle vs Prisma — Connection File Compare

```
Drizzle (db/index.ts)            Prisma (lib/prisma.ts)
──────────────────────────────   ──────────────────────────────
import { neon } from             import { PrismaClient }
  '@neondatabase/serverless'       from '@prisma/client'

import { drizzle } from
  'drizzle-orm/neon-http'

const sql = neon(                const prisma =
  process.env.DATABASE_URL         globalForPrisma.prisma ??
)                                  new PrismaClient()

export const db =                export default prisma
  drizzle(sql, { schema })
```

Drizzle mein connection string manually pass ki — Prisma khud `.env` se le leta hai.

---

## Aaj Ka Summary

✅ `lib/prisma.ts` — Prisma ka connection file  
✅ `PrismaClient` — `@prisma/client` se aata hai  
✅ Global instance — hot reload pe naye connections nahi banenge  
✅ `??` — purana client hai toh wahi use karo — nahi hai toh naya banao  
✅ `export default prisma` — poori app mein yahi import hoga  

---

## Agla Step

**Phase 3.1** — Pehla data daalo — GET route banayenge — `prisma.todo.findMany()` — Drizzle ke `db.select()` se compare! 📋
