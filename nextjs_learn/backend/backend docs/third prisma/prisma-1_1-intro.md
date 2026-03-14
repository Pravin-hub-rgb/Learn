# Phase 1.1 — Prisma Kya Hai Aur Kyun?

## Pichle Kaam Se Aage

Drizzle + PostgreSQL ke saath poora Todo App bana liya —

```
db/schema.ts        ← table define ki TypeScript mein
db/index.ts         ← Neon se connect kiya
db.select()         ← queries likhi
.returning()        ← PostgreSQL ka rule yaad hai
```

Sab kaam kiya. App chal raha hai.

Ab ek sawal — **Prisma kyun seekhein jab Drizzle kaam kar raha hai?**

---

## Coder Ki Soch

> *"Drizzle mein toh maine schema TypeScript mein likha tha — `pgTable`, `serial`, `text` — sab JavaScript objects the. Kaam bhi kar raha tha. Toh yeh Prisma kya naya laayega?"*

Valid sawal hai.

Prisma aur Drizzle dono ORM hain — dono ka kaam same hai — database se TypeScript mein baat karo. Par **approach bilkul alag hai.**

---

## Drizzle Ka Approach

Drizzle mein schema **TypeScript** mein likha:

```ts
// db/schema.ts
export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  done: boolean('done').default(false),
})
```

Pure TypeScript — koi alag file nahi — koi alag language nahi.

---

## Prisma Ka Approach

Prisma mein schema **apni alag language** mein likhte hain — `.prisma` file mein:

```prisma
// prisma/schema.prisma
model Todo {
  id    Int     @id @default(autoincrement())
  title String
  done  Boolean @default(false)
}
```

Yeh TypeScript nahi hai — yeh **Prisma Schema Language (PSL)** hai — Prisma ne khud banaayi hai.

> *"Arey — naya syntax? Kyun? TypeScript toh tha na pehle se?"*

Kyunki Prisma ka idea hai — **schema ek jagah, ek baar, seedha** — aur Prisma khud saari TypeScript types generate kar dega — tujhe manually likhni nahi padti.

---

## Dono Ka Fark — Ek Nazar Mein

```
                Drizzle              Prisma
─────────────   ──────────────────   ──────────────────────
Schema file     db/schema.ts         prisma/schema.prisma
Schema lang     TypeScript           Prisma Schema Language
Types           Tu likhta hai        Prisma generate karta hai
Query style     db.select().from()   prisma.todo.findMany()
Migrations      drizzle-kit push     prisma migrate dev
Client file     db/index.ts          lib/prisma.ts
```

---

## Prisma Ki Query Style

Drizzle mein:

```ts
const allTodos = await db
  .select()
  .from(todos)
  .orderBy(desc(todos.id))
```

Prisma mein:

```ts
const allTodos = await prisma.todo.findMany({
  orderBy: { id: 'desc' }
})
```

> *"Yeh toh bahut simple laga — `prisma.todo.findMany()` — seedha model ka naam use kar raha hai."*

Bilkul. Prisma ki queries zyada **readable** hain — zyada English jaisi. Drizzle SQL ke close rehta hai — Prisma apni layer banata hai upar se.

---

## Dono Sahi Hain — Sirf Alag Hain

Koi ek best nahi hai — industry mein dono use hote hain:

```
Prisma  → zyada popular — zyada documentation — beginners ke liye easy
Drizzle → zyada lightweight — SQL ke close — performance ke liye better
```

Tu dono jaanta hai — toh tu kisi bhi project mein fit ho sakta hai.

---

## Aaj Ka Summary

✅ Prisma bhi ek ORM hai — Drizzle jaisa — par approach alag  
✅ Schema `.prisma` file mein — apni language PSL mein  
✅ Prisma queries readable hain — `prisma.todo.findMany()`  
✅ Prisma types khud generate karta hai — tu manually nahi likhta  
✅ Dono industry mein use hote hain — dono seekhna faydemand  

---

## Agla Step

**Phase 1.2** — Project setup karenge — `npx prisma init` chalayenge — kya kya files banti hain dekhenge! 📁
