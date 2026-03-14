# Phase 3.5 — Done Toggle Karo — PATCH Route

## Pichle Doc Se Aage

3.4 mein:
- Frontend mein input + Add button aa gaya
- Naya todo add ho raha hai

Ab todo done mark karna hai — **PATCH route** banayenge.

---

## Coder Ki Soch

> *"Drizzle mein `[id]` dynamic route banaya tha — `app/api/todos/[id]/route.ts` — specific todo ke liye. Prisma mein bhi same chahiye. Par Drizzle mein `eq` import karna pada tha WHERE condition ke liye — Prisma mein kya hoga?"*

Same `[id]` folder — par `eq` nahi chahiye — Prisma mein `where` directly object hai.

---

## Naya Route File Banao

```
app/api/todos/
├── route.ts          ← /api/todos — GET, POST ✅
└── [id]/
    └── route.ts      ← yeh banao
```

`app/api/todos/[id]/route.ts` banao.

---

## PATCH Route Shuru Karo

Specific todo update karna hai — `prisma` chahiye:

```ts
import prisma from '@/lib/prisma'
```

Function banao — `params` se `id` lo:

```ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const body = await request.json()
}
```

**`parseInt(params.id)`** — URL se string milti hai — `"1"` — Prisma ko number chahiye — `1`.

`NextRequest` chahiye — body padhni hai — import karo:

```ts
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
```

---

## UPDATE Query Likho

Drizzle mein:

```ts
db.update(todos)
  .set({ done: body.done })
  .where(eq(todos.id, id))
```

`eq` import karna pada — `drizzle-orm` se — WHERE condition ke liye.

Prisma mein:

```ts
const updated = await prisma.todo.update({
  where: { id },
  data: { done: body.done }
})
```

**`where: { id }`** — shorthand — `{ id: id }` ka short form — sirf `{ id }` likhte hain.

> *"`eq` nahi chahiye — `where` seedha object hai — much cleaner."*

Bilkul — Prisma mein WHERE condition object mein hoti hai — alag se import nahi karna.

**`data: { done: body.done }`** — yeh field update karo.

---

Id nahi mili toh Prisma error throw karta hai — `catch` mein handle karo:

```ts
if (!updated) {
  return NextResponse.json(
    { error: 'Todo nahi mila!' },
    { status: 404 }
  )
}
return NextResponse.json(updated)
```

Actually Prisma record na mile toh automatically error throw karta hai — `catch` hi handle kar lega — par explicit 404 ke liye:

```ts
} catch (error: any) {
  if (error.code === 'P2025') {
    return NextResponse.json(
      { error: 'Todo nahi mila!' },
      { status: 404 }
    )
  }
  return NextResponse.json(
    { error: 'Update nahi hua!' },
    { status: 500 }
  )
}
```

**`P2025`** — Prisma ka error code — "record not found."

---

## Abhi Tak Poori `[id]/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()

    const updated = await prisma.todo.update({
      where: { id },
      data: { done: body.done }
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Todo nahi mila!' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Update nahi hua!' },
      { status: 500 }
    )
  }
}
```

---

## Test Karo — Postman Se

```
PATCH http://localhost:3000/api/todos/1
Body: { "done": true }
```

Response:

```json
{ "id": 1, "title": "Pehla Prisma Todo", "done": true }
```

✅

---

## Drizzle vs Prisma — Update Compare

```
Drizzle:                         Prisma:
────────────────────────────     ────────────────────────────
import { eq } from 'drizzle-orm' // koi extra import nahi

db.update(todos)                 prisma.todo.update({
  .set({ done: body.done })        where: { id },
  .where(eq(todos.id, id))         data: { done: body.done }
  .returning()                   })
```

Prisma: kam code — readable — `eq` nahi — `.returning()` nahi.

---

## Aaj Ka Summary

✅ `[id]/route.ts` — same dynamic route  
✅ `prisma.todo.update({ where: { id }, data: {...} })` — UPDATE WHERE  
✅ `eq` nahi chahiye — `where` object mein directly  
✅ `.returning()` nahi chahiye — Prisma updated record automatically deta hai  
✅ `P2025` — Prisma error code — record not found  

---

## Agla Step

**Phase 3.6** — Frontend mein checkbox add karenge — toggleTodo — strikethrough! ☑️
