# Phase 2.2 — Pehle Schema Banao

## Pichle Doc Se Aage

2.1 mein:
- PostgreSQL aur Neon samjha
- Packages install kiye
- Connection string `.env.local` mein rakhi

Ab aage badhne se pehle ek cheez socho —

---

## Pehle Schema Kyun?

Next.js mein database use karne ke liye ek **connection file** banani hai — `db/index.ts` — jo Neon se connect karegi aur `db` variable export karegi.

Par woh connection file mein schema import karni padegi — taaki Drizzle ko pata ho table ka structure kya hai.

```
db/index.ts → schema import karega → db/schema.ts
```

Toh pehle schema banate hain — phir connection file mein seedha import kar lenge — ek baar mein complete.

---

## `db/` Folder Kyun?

`db/` folder banao — project root mein — jahan `app/` hai:

```
todo-drizzle/
├── app/
├── db/            ← naya folder
├── .env.local
└── package.json
```

**`db/` kyun — `lib/` kyun nahi?**

MongoDB mein `lib/mongodb.ts` banaya tha — `lib/` general helpers ke liye hota hai.

`db/` specifically database ke liye — schema, connection — dono yahan rahenge. Drizzle community mein yahi convention hai.

---

## `db/schema.ts` Banao

`db/` ke andar — `schema.ts` file banao:

```
db/
└── schema.ts     ← banao
```

---

## Table Define Karna — Kaise?

Phase 1 mein SQL Editor mein yeh likha tha:

```sql
CREATE TABLE todos (
  id    SERIAL   PRIMARY KEY,
  title TEXT     NOT NULL,
  done  BOOLEAN  DEFAULT false
);
```

Ab yahi cheez TypeScript mein likhni hai — Drizzle ke syntax mein.

**Ek Cheez Dhyan Mein Rakho — Naam Conflict**

Phase 1 mein `todos` naam ki table SQL Editor se manually banayi thi — woh `neondb` mein pehle se hai.

Ab agar hum bhi `todos` naam rakhen — `drizzle-kit push` chalayenge toh confusing ho jaayega — "yeh table Drizzle ne banayi ya maine manually banayi thi?" — track nahi rahega.

Isliye Drizzle wali table ka naam alag rakhte hain — **`drizzle_todos`** — sensible bhi hai — clearly pata hai yeh Drizzle se bani hai.

Iske liye column types chahiye — `SERIAL`, `TEXT`, `BOOLEAN` — yeh SQL types hain. Drizzle mein inke TypeScript versions `drizzle-orm/pg-core` se aate hain.

**`pg-core` kya hai?**

`pg` = PostgreSQL. Drizzle ka PostgreSQL wala part — column types yahan se milte hain.

Import karo:

```ts
import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core'
```

Yeh sab kya hain:

```
pgTable   ← "ek PostgreSQL table define karo"
serial    ← SERIAL — auto 1, 2, 3... — id ke liye
text      ← TEXT — string data
boolean   ← BOOLEAN — true ya false
```

---

## Table Banao — Ek Ek Column

`pgTable` call karo — table ka naam do — andar columns aayenge:

```ts
import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core'

export const drizzle_todos = pgTable('drizzle_todos', {

})
```

**`'drizzle_todos'`** — database mein table ka naam yahi hoga.

**`export` kyun?** — Baad mein `db/index.ts` mein import karni padegi — isliye export.

---

Pehla column — `id`:

```ts
export const todos = pgTable('drizzle_todos', {
  id: serial('id').primaryKey(),
})
```

**`serial('id')`** — `id` naam ka SERIAL column — auto 1, 2, 3...

**`.primaryKey()`** — PRIMARY KEY — unique identifier

Phase 1 SQL se compare: `id SERIAL PRIMARY KEY` — same cheez.

---

`title` add karo:

```ts
export const todos = pgTable('drizzle_todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
})
```

**`text('title')`** — `title` naam ka TEXT column

**`.notNull()`** — NOT NULL — khaali nahi chhod sakte

Phase 1 SQL: `title TEXT NOT NULL`

---

`done` add karo:

```ts
export const todos = pgTable('drizzle_todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  done: boolean('done').default(false).notNull(),
})
```

**`boolean('done')`** — BOOLEAN column

**`.default(false)`** — agar value nahi di toh automatically `false`

**`.notNull()`** — value zaroori

Phase 1 SQL: `done BOOLEAN DEFAULT false`

---

Side by side dekho — bilkul same cheez — sirf TypeScript mein:

```sql
-- Phase 1 SQL
CREATE TABLE drizzle_todos (
  id    SERIAL   PRIMARY KEY,
  title TEXT     NOT NULL,
  done  BOOLEAN  DEFAULT false
);
```

```ts
// TypeScript mein
export const todos = pgTable('drizzle_todos', {
  id:    serial('id').primaryKey(),
  title: text('title').notNull(),
  done:  boolean('done').default(false).notNull(),
})
```

---

## TypeScript Type Bhi Chahiye

Jab database se todos fetch karenge — TypeScript ko batana padega "ek todo mein kya kya fields hain."

MongoDB mein manually interface likhte the:

```ts
interface ITodo {
  _id: string
  title: string
  done: boolean
}
```

Yeh manually likhne mein problem hai — agar schema badla — type manually update karna padega — bhool gaye toh bug.

Drizzle mein `InferSelectModel` hai — schema dekh ke khud type nikaal leta hai:

```ts
import { InferSelectModel } from 'drizzle-orm'

export type Todo = InferSelectModel<typeof todos>
```

Internally yeh ban jaata hai:

```ts
type Todo = {
  id: number      // serial → number
  title: string   // text → string
  done: boolean   // boolean → boolean
}
```

Schema badla — type automatically update. Tu manually nahi sambhalta.

---

## Poori `db/schema.ts`:

```ts
import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core'
import { InferSelectModel } from 'drizzle-orm'

export const todos = pgTable('drizzle_todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  done: boolean('done').default(false).notNull(),
})

export type Todo = InferSelectModel<typeof todos>
```

---

## Abhi Tak Project Structure

```
todo-drizzle/
├── app/
│   └── page.tsx
├── db/
│   └── schema.ts       ← drizzle_todos table define ki ✅
├── .env.local
└── package.json
```

---

## Aaj Ka Summary

✅ Schema pehle banaya — connection file ko chahiye hogi  
✅ `db/` folder — database files yahan — convention  
✅ `drizzle-orm/pg-core` — PostgreSQL column types  
✅ `pgTable`, `serial`, `text`, `boolean` — SQL types ka TypeScript version  
✅ `.primaryKey()`, `.notNull()`, `.default()` — same SQL rules  
✅ `InferSelectModel` — schema se automatically TypeScript type  

---

## Agla Step

**Phase 2.3** — Ab connection file banayenge — `db/index.ts` — schema pehle se taiyaar hai — seedha import karke ek baar mein complete file! 🔌
