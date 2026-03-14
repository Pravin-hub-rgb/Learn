# Phase 1.3 — Todos Collection Banao

## Pichle Doc Se Aage

1.2 mein:
- Project ban gaya — `todo-payload`
- Admin Panel chal raha hai `localhost:3000/admin` pe
- `collections/` folder abhi khaali hai

Ab **Todos Collection** banayenge — yahi Payload ka core hai.

---

## Coder Ki Soch

> *"Drizzle mein `db/schema.ts` mein `pgTable` se table define ki thi — fields likhe — `title`, `done`. Payload mein kya hoga? Koi `pgTable` nahi hoga — Payload ka apna tarika hoga."*

Bilkul — Payload mein **Collection** hota hai — table ki jagah.

---

## Collection Kya Hota Hai?

Drizzle mein:
```ts
// db/schema.ts
export const todos = pgTable('todos', {
  id:    serial('id').primaryKey(),
  title: text('title').notNull(),
  done:  boolean('done').default(false),
})
```

Payload mein:
```ts
// src/collections/Todos.ts
import { CollectionConfig } from 'payload'

export const Todos: CollectionConfig = {
  slug: 'todos',
  fields: [
    { name: 'title', type: 'text',    required: true  },
    { name: 'done',  type: 'checkbox', defaultValue: false },
  ],
}
```

Same kaam — alag syntax — aur **bahut zyada power** — sirf yeh likhne se:
- Database table ban jaayegi
- Admin Panel mein form ban jaayega
- REST API ban jaayegi

---

## File Banao

`src/collections/Todos.ts` banao:

```ts
import { CollectionConfig } from 'payload'
```

**`CollectionConfig`** — Payload ka type — TypeScript ko batao "yeh ek collection config hai."

---

Ab collection object banao:

```ts
import { CollectionConfig } from 'payload'

export const Todos: CollectionConfig = {
  slug: 'todos',
}
```

**`slug`** — collection ka URL identifier:

```
slug: 'todos'  →  /api/todos  — yeh URL ban jaayega automatically
```

> *"Drizzle mein table naam `drizzle_todos` tha — yahan `slug` hai — same idea alag naam."*

Bilkul.

---

Ab fields add karo — pehle `title`:

```ts
export const Todos: CollectionConfig = {
  slug: 'todos',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
```

**`name`** — field ka naam — database column bhi yahi hoga.

**`type: 'text'`** — text field — Drizzle mein `text('title')` tha.

**`required: true`** — khaali nahi ho sakta — Drizzle mein `.notNull()` tha.

---

Ab `done` field add karo:

```ts
export const Todos: CollectionConfig = {
  slug: 'todos',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'done',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
```

**`type: 'checkbox'`** — true/false field — Drizzle mein `boolean('done')` tha.

**`defaultValue: false`** — naaya todo by default done nahi hoga.

---

## Payload.config.ts Mein Register Karo

Collection banai — par Payload ko batana bhi padega "yeh collection use karni hai."

`src/payload.config.ts` mein:

```ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { Todos } from './collections/Todos'    // ← import karo

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  collections: [Todos],    // ← yahan add karo
  secret: process.env.PAYLOAD_SECRET,
})
```

> *"Drizzle mein schema `db/index.ts` mein import kiya tha — yahan `payload.config.ts` mein — same pattern."*

Bilkul.

---

## Server Restart Karo

```bash
bun dev
```

Payload ne automatically:
- Database mein `todos` table banayi
- `/api/todos` route banayi
- Admin Panel mein "Todos" section add kiya

`localhost:3000/admin` kholo — left sidebar mein **Todos** dikh raha hai! ✅

---

## Drizzle vs Payload — Schema Compare

```
Drizzle (schema.ts)           Payload (Todos.ts)
─────────────────────────     ─────────────────────────
pgTable('todos', {            { slug: 'todos',
  id: serial().primaryKey(),    // id auto — Payload karta hai
  title: text().notNull(),      fields: [
  done: boolean()                 { name: 'title',
    .default(false),                type: 'text',
})                                  required: true },
                                  { name: 'done',
                                    type: 'checkbox',
                                    defaultValue: false }
                                ]
                              }
```

`id` Payload khud handle karta hai — tu nahi likhta.

---

## Aaj Ka Summary

✅ `CollectionConfig` — Payload ka collection type  
✅ `slug: 'todos'` — URL ban jaata hai `/api/todos`  
✅ `type: 'text'` — text field — Drizzle ka `text()`  
✅ `type: 'checkbox'` — boolean — Drizzle ka `boolean()`  
✅ `payload.config.ts` mein register kiya — `collections: [Todos]`  
✅ Server restart — table bani — Admin Panel mein Todos dikh raha hai  

---

## Agla Step

**Phase 2.1** — Admin Panel se data daalo — GUI se — koi SQL nahi! 🖥️
