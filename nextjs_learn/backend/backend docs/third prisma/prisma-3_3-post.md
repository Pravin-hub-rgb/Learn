# Phase 3.3 — Naya Todo Add Karo — POST Route

## Pichle Doc Se Aage

3.2 mein:
- Frontend list ban gayi — todos dikh rahe hain
- `finally` pattern carry forward kiya

Ab naya todo add karna hai — **POST route** banayenge.

---

## Coder Ki Soch

> *"Drizzle mein POST route mein `db.insert().values().returning()` tha — `.returning()` isliye lagaya tha kyunki PostgreSQL INSERT ke baad row wapas nahi deta. Prisma mein kya hoga?"*

Yahi interesting part hai — Prisma mein `.returning()` nahi chahiye — seedha naya todo milta hai.

Pehle route banate hain — phir yeh fark dekhenge.

---

## POST Route — Same File Mein

`app/api/todos/route.ts` mein GET pehle se hai — POST neeche add karo.

POST mein user data aayega — `NextRequest` chahiye — par pehle function banate hain:

```ts
export async function POST(request) {

}
```

Body padho — user ne kya bheja:

```ts
export async function POST(request) {
  const body = await request.json()
}
```

TypeScript bolega "`request` ka type kya hai?" — `NextRequest` chahiye — tab import karo:

```ts
import { NextRequest } from 'next/server'
```

Function update karo:

```ts
export async function POST(request: NextRequest) {
  const body = await request.json()
}
```

---

Validation — title khaali nahi hona chahiye:

```ts
export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.title || !body.title.trim()) {
    return NextResponse.json(
      { error: 'Title zaroori hai!' },
      { status: 400 }
    )
  }
}
```

---

## INSERT Query Likho

Ab `body.title` ready hai — database mein daalna hai:

```ts
const newTodo = await prisma.todo.create({
  data: { title: body.title }
})
```

**`prisma.todo.create({ data: {...} })`** tod ke:

```
prisma           ← PrismaClient
  .todo          ← Todo model
  .create({      ← naya record banao
    data: {      ← yeh data daalo
      title: body.title
    }
  })
```

`done` nahi diya — schema mein `@default(false)` tha — automatically `false` set hoga.

---

## `.returning()` Kyun Nahi Chahiye?

> *"Drizzle mein `.returning()` lagana pada tha — PostgreSQL INSERT ke baad row wapas nahi deta tha — toh force karna pada. Prisma mein nahi lagaya — kyun?"*

Kyunki Prisma internally handle karta hai — `create()` hamesha naya created record return karta hai — automatically.

```
Drizzle:
  db.insert().values()           → khaali result
  db.insert().values().returning() → naya row ✅

Prisma:
  prisma.todo.create()           → naya row ✅ — automatically
```

Prisma ne yeh complexity chhupa li — tujhe sochna nahi padta.

---

Response bhejo:

```ts
return NextResponse.json(newTodo, { status: 201 })
```

`newTodo[0]` nahi — seedha `newTodo` — `.returning()` array deta tha — Prisma seedha object deta hai.

---

## try/catch Lagao

```ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { error: 'Title zaroori hai!' },
        { status: 400 }
      )
    }

    const newTodo = await prisma.todo.create({
      data: { title: body.title }
    })

    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Todo nahi bana!' },
      { status: 500 }
    )
  }
}
```

---

## Abhi Tak Poori `route.ts`:

```ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { error: 'Title zaroori hai!' },
        { status: 400 }
      )
    }

    const newTodo = await prisma.todo.create({
      data: { title: body.title }
    })

    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Todo nahi bana!' },
      { status: 500 }
    )
  }
}
```

---

## Test Karo — Postman Se

```
POST http://localhost:3000/api/todos
Body: { "title": "Prisma se banaya" }
```

Response:

```json
{
  "id": 2,
  "title": "Prisma se banaya",
  "done": false
}
```

Prisma Studio mein bhi dikh jaayega! ✅

---

## Aaj Ka Summary

✅ `prisma.todo.create({ data: {...} })` — INSERT INTO "Todo"  
✅ `.returning()` nahi chahiye — Prisma automatically naya record deta hai  
✅ `newTodo` seedha object — `newTodo[0]` nahi — Drizzle se fark  
✅ `status: 201` — naya resource bana  

---

## Agla Step

**Phase 3.4** — Frontend mein input box aur Add button add karenge! ✏️
