# Phase 3.7 — Todo Hatao — DELETE Route

## Pichle Doc Se Aage

3.6 mein:
- Frontend mein checkbox aa gaya — toggle ho raha hai

Ab todo delete karna hai — **DELETE route** banayenge.

---

## Coder Ki Soch

> *"PATCH pehle se `[id]/route.ts` mein hai — DELETE bhi same file mein add karna hai — same `params` se `id` milega — sirf query alag hogi."*

Bilkul — same file — alag function.

---

## DELETE Function Add Karo

`app/api/todos/[id]/route.ts` mein PATCH ke neeche:

```ts
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
}
```

---

## DELETE Query Likho

Drizzle mein:

```ts
db.delete(todos)
  .where(eq(todos.id, id))
  .returning()
```

Prisma mein:

```ts
await prisma.todo.delete({
  where: { id }
})
```

**`prisma.todo.delete({ where: { id } })`** — seedha — koi `eq` nahi — koi `.returning()` nahi.

Success response bhejo:

```ts
return NextResponse.json({ message: 'Todo delete ho gaya!' })
```

---

Prisma record na mile toh `P2025` error aayega — same catch karo:

```ts
} catch (error: any) {
  if (error.code === 'P2025') {
    return NextResponse.json(
      { error: 'Todo nahi mila!' },
      { status: 404 }
    )
  }
  return NextResponse.json(
    { error: 'Delete nahi hua!' },
    { status: 500 }
  )
}
```

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    await prisma.todo.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Todo delete ho gaya!' })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Todo nahi mila!' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Delete nahi hua!' },
      { status: 500 }
    )
  }
}
```

---

## Test Karo — Postman Se

```
DELETE http://localhost:3000/api/todos/1
```

Response:

```json
{ "message": "Todo delete ho gaya!" }
```

Prisma Studio mein verify karo — todo hat gaya! ✅

---

## Drizzle vs Prisma — Delete Compare

```
Drizzle:                         Prisma:
────────────────────────────     ────────────────────────────
db.delete(todos)                 prisma.todo.delete({
  .where(eq(todos.id, id))         where: { id }
  .returning()                   })
```

Prisma: 3 lines → 3 lines — par `eq` nahi, `.returning()` nahi, import nahi.

---

## Aaj Ka Summary

✅ `prisma.todo.delete({ where: { id } })` — DELETE WHERE  
✅ Same `[id]/route.ts` — alag function  
✅ `P2025` — record not found — catch mein handle kiya  
✅ `.returning()` nahi — `eq` nahi — clean  

---

## Agla Step

**Phase 3.8** — Frontend mein delete button — poora app ready — Prisma vs Drizzle final comparison! 🎉
