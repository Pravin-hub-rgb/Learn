# Phase 3.1 — Pehla Data + GET Route — `prisma.todo.findMany()`

## Pichle Doc Se Aage

2.2 mein:
- `lib/prisma.ts` bana — PrismaClient ready
- Global instance — hot reload safe

Ab Todo App banana shuru karte hain — pehle GET route.

---

## Coder Ki Soch

> *"Drizzle mein pehle SQL Editor se dummy data daala tha — `INSERT INTO drizzle_todos...` — kyunki table khaali thi. Prisma mein bhi table khaali hai. Par is baar Prisma se hi data daalte hain — SQL Editor nahi — Prisma ki power use karein."*

Bilkul sahi soch — Prisma se seedha insert kar sakte hain.

---

## API Route Folder Banao

Drizzle wala structure same — `app/api/todos/route.ts`:

```
app/
├── api/
│   └── todos/
│       └── route.ts    ← yeh banao
└── page.tsx
```

---

## GET Route Shuru Karo

`app/api/todos/route.ts` banao — pehle socho kya chahiye:

Saare todos fetch karne hain — `prisma` chahiye — `lib/prisma.ts` se aayega — import karo:

```ts
import prisma from '@/lib/prisma'
```

**`@/lib/prisma`** — `lib/prisma.ts` ka shortcut — `export default prisma` tha wahan — toh seedha `prisma` milega.

---

GET function banao:

```ts
import prisma from '@/lib/prisma'

export async function GET() {

}
```

Ab query likho — saare todos chahiye:

```ts
export async function GET() {
  const allTodos = await prisma.todo.findMany()
}
```

**`prisma.todo.findMany()`** tod ke:

```
prisma          ← PrismaClient instance — lib/prisma.ts se
  .todo         ← Todo model — schema.prisma mein define kiya
  .findMany()   ← saare records fetch karo — SQL: SELECT * FROM "Todo"
```

> *"Drizzle mein `db.select().from(todos)` tha — yeh toh bahut simple hai — `prisma.todo.findMany()` — seedha model ka naam."*

Yahi Prisma ki simplicity hai.

---

Ab `allTodos` mein data aa gaya — browser ko bhejna hai — `NextResponse` chahiye — tab import karo:

```ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const allTodos = await prisma.todo.findMany()
  return NextResponse.json(allTodos)
}
```

---

try/catch add karo:

```ts
export async function GET() {
  try {
    const allTodos = await prisma.todo.findMany()
    return NextResponse.json(allTodos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todos nahi aaye!' },
      { status: 500 }
    )
  }
}
```

---

## Test Karo — Par Pehle Data Chahiye

`npm run dev` chalao — browser mein:

```
http://localhost:3000/api/todos
```

```json
[]
```

Khaali — table mein kuch nahi.

> *"Drizzle mein SQL Editor se daala tha — Prisma mein kaise daalein?"*

Prisma se seedha daal sakte hain — ek temporary route nahi chahiye — **Prisma Studio** use karo.

---

## Prisma Studio — Built-in UI

```bash
npx prisma studio
```

Browser mein khulega:

```
http://localhost:5555
```

GUI milega — `Todo` table dikhegi — **Add record** button — click karo:

```
title: "Pehla Prisma Todo"
done:  false
```

Save karo — record ban gaya! ✅

> *"Yaar yeh toh SQL Editor se bhi easy hai — koi SQL nahi likhni padi."*

Bilkul — Prisma Studio Prisma ka bonus feature hai — development mein kaam aata hai.

---

Ab browser mein dobara:

```
http://localhost:3000/api/todos
```

```json
[
  { "id": 1, "title": "Pehla Prisma Todo", "done": false }
]
```

Data aa raha hai! ✅

---

## Order Fix Karo — Naaya Todo Upar Aaye

Abhi order guaranteed nahi — `orderBy` chahiye:

```ts
const allTodos = await prisma.todo.findMany({
  orderBy: { id: 'desc' }
})
```

**`orderBy: { id: 'desc' }`** — id ke hisaab se descending — bada id pehle — naaya todo upar.

Drizzle mein:
```ts
.orderBy(desc(todos.id))
```

Prisma mein:
```ts
{ orderBy: { id: 'desc' } }
```

Prisma mein object pass karte hain — Drizzle mein chain karte hain.

---

## Abhi Tak Poori `route.ts`:

```ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const allTodos = await prisma.todo.findMany({
      orderBy: { id: 'desc' }
    })
    return NextResponse.json(allTodos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todos nahi aaye!' },
      { status: 500 }
    )
  }
}
```

---

## Aaj Ka Summary

✅ `prisma.todo.findMany()` — SELECT * FROM "Todo"  
✅ `prisma` import — `@/lib/prisma` se — `export default` tha  
✅ Prisma Studio — `npx prisma studio` — GUI se data daala  
✅ `orderBy: { id: 'desc' }` — naaya todo upar  
✅ Drizzle vs Prisma query compare kiya  

---

## Agla Step

**Phase 3.2** — Frontend list banayenge — interface, states, fetchTodos, `finally` — Drizzle wala pattern same rahega! 📋
