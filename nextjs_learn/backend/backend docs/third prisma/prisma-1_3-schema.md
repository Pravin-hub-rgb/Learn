# Phase 1.3 — `schema.prisma` — Todo Model Likho

## Pichle Doc Se Aage

1.2 mein:
- `npx prisma init` chalaya
- `schema.prisma` bani — boilerplate samjha
- `.env` mein connection string daali

Ab `schema.prisma` mein **Todo model** likhenge.

---

## Coder Ki Soch

> *"Drizzle mein `db/schema.ts` mein `pgTable` se table define ki thi — TypeScript tha. Yahan `.prisma` file hai — alag syntax hoga. Dekho kya likhna padega."*

`prisma/schema.prisma` mein neeche — `datasource db` ke baad — model add karo.

Pehle sirf model ka dhaacha banao:

```prisma
model Todo {

}
```

**`model`** — Prisma ka keyword — ek database table define karta hai.

**`Todo`** — model ka naam — **capital letter** se shuru hota hai — Prisma ka convention hai.

> *"Drizzle mein `drizzle_todos` lowercase tha — yahan `Todo` capital kyun?"*

Prisma convention hai — model naam PascalCase — `Todo`, `User`, `Product`. Table naam lowercase automatically banega — `todo` — ya tu customize kar sakta hai.

---

## Fields Add Karo — Ek Ek Karke

Pehla field — `id`:

```prisma
model Todo {
  id Int @id @default(autoincrement())
}
```

**`id`** — field ka naam.

**`Int`** — data type — integer — number.

**`@id`** — yeh primary key hai — har row unique hogi.

**`@default(autoincrement())`** — automatically badhta rahega — 1, 2, 3... — khud nahi dena.

Drizzle mein yeh tha:
```ts
id: serial('id').primaryKey()
```

Same kaam — alag syntax.

---

Ab `title` add karo:

```prisma
model Todo {
  id    Int    @id @default(autoincrement())
  title String
}
```

**`String`** — text field — Drizzle mein `text('title').notNull()` tha.

Prisma mein by default fields **required** hote hain — `notNull()` alag se nahi likhna.

---

Ab `done` add karo:

```prisma
model Todo {
  id    Int     @id @default(autoincrement())
  title String
  done  Boolean @default(false)
}
```

**`Boolean`** — true/false — Drizzle mein `boolean('done')` tha.

**`@default(false)`** — naaya todo by default done nahi hoga.

---

## Poori `schema.prisma` Ab:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Todo {
  id    Int     @id @default(autoincrement())
  title String
  done  Boolean @default(false)
}
```

---

## Drizzle vs Prisma — Schema Comparison

```
Drizzle (schema.ts)              Prisma (schema.prisma)
──────────────────────────────   ──────────────────────────────
pgTable('todos', {               model Todo {
  id: serial('id')                 id    Int     @id
    .primaryKey(),                          @default(autoincrement())
  title: text('title')             title String
    .notNull(),
  done: boolean('done')            done  Boolean @default(false)
    .default(false),             }
})
```

Same result — alag tarika.

---

## Ek Important Cheez — Types Capital Hain

Prisma mein data types capital letter se likhte hain:

```
Int      ← integer — number
String   ← text
Boolean  ← true/false
Float    ← decimal number
DateTime ← date aur time
```

JavaScript mein `string`, `boolean` lowercase hote hain — Prisma mein capital — confuse mat hona.

---

## Aaj Ka Summary

✅ `model Todo {}` — Prisma mein table define kaise karein  
✅ `@id @default(autoincrement())` — primary key + auto increment  
✅ `String` — required by default — `notNull()` nahi likhna  
✅ `Boolean @default(false)` — done field  
✅ Types capital — `Int`, `String`, `Boolean`  
✅ Drizzle vs Prisma schema compare kiya  

---

## Agla Step

**Phase 2.1** — Database mein table banana — `prisma migrate dev` — migrations kya hoti hain aur `drizzle-kit push` se kaise alag hai! 🗄️
