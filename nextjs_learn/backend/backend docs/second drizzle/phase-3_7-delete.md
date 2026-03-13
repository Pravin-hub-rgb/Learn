# Phase 3.7 — Todo Hatao — DELETE Route

## Pichle Doc Se Aage

3.6 mein:
- Frontend mein checkbox aa gaya — toggle ho raha hai

Ab todo delete karna hai — **DELETE route** banayenge.

---

## Same `[id]/route.ts` File Mein

PATCH pehle se `app/api/todos/[id]/route.ts` mein hai — DELETE bhi usi file mein add karenge — same pattern.

```ts
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

}
```

---

`id` lo — number mein convert karo:

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

Specific row delete karni hai — `eq` pehle se import hai — use karo:

```ts
const deleted = await db
  .delete(drizzle_todo)
  .where(eq(drizzle_todo.id, id))
  .returning()
```

**Tod ke:**

```
db.delete(drizzle_todo)             ← "drizzle_todo table se delete karo"
  .where(eq(drizzle_todo.id, id))   ← "sirf jiska id match kare"
  .returning()                      ← "deleted row wapas do — confirm ke liye"
```

Phase 1 wali SQL:

```sql
DELETE FROM drizzle_todo WHERE id = 1;
```

---

Id nahi mili toh 404 — warna success:

```ts
if (!deleted.length) {
  return NextResponse.json(
    { error: 'Todo nahi mila!' },
    { status: 404 }
  )
}

return NextResponse.json({ message: 'Todo delete ho gaya!' })
```

---

## Abhi Tak Poori `[id]/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { db } from '@/db'
import { drizzle_todo } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()

    const updated = await db
      .update(drizzle_todo)
      .set({ done: body.done })
      .where(eq(drizzle_todo.id, id))
      .returning()

    if (!updated.length) {
      return NextResponse.json(
        { error: 'Todo nahi mila!' },
        { status: 404 }
      )
    }

    return NextResponse.json(updated[0])
  } catch (error) {
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

    const deleted = await db
      .delete(drizzle_todo)
      .where(eq(drizzle_todo.id, id))
      .returning()

    if (!deleted.length) {
      return NextResponse.json(
        { error: 'Todo nahi mila!' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Todo delete ho gaya!' })
  } catch (error) {
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

Neon SQL Editor mein verify karo:

```sql
SELECT * FROM drizzle_todo;
```

Todo hat gaya! ✅

---

## Aaj Ka Summary

✅ DELETE route — same `[id]/route.ts` — alag function  
✅ `db.delete(drizzle_todo).where(eq(...))` — DELETE FROM WHERE  
✅ `.returning()` — confirm karne ke liye row wapas lo  
✅ `!deleted.length` — 0 rows = id nahi mili = 404  

---

## Agla Step

**Phase 3.8** — Frontend mein delete button add karenge — poora app ready ho jaayega! 🎉
