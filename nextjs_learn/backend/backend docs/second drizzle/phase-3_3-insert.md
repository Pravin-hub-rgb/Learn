# Phase 3.3 — Naya Todo Add Karo — POST Route

## Pichle Doc Se Aage

3.2 mein:
- `.orderBy(desc(...))` add kiya — naaya todo upar aata hai
- Frontend mein list dikh rahi hai

Ab naya todo add karna hai — **POST route** banayenge.

---

## Kahan Likhenge?

POST route bhi `/api/todos` pe hi hoga — toh same file mein likhenge:

```
app/api/todos/route.ts   ← GET pehle se hai — POST yahan add karenge
```

Same file mein alag function — `export async function POST()`.

---

## POST Mein Request Body Chahiye

GET mein koi data nahi aata — sirf fetch karna tha.

POST mein user data bhejta hai — `{ title: 'Naya Todo' }` — yeh **request body** mein aata hai.

Request body padhne ke liye `NextRequest` chahiye — Next.js ka built-in type.

Pehle query likhte hain — tab import karenge jab zaroorat padegi.

---

## POST Function Shuru Karo

```ts
export async function POST(request) {

}
```

Pehle body padho — user ne kya bheja:

```ts
export async function POST(request) {
  const body = await request.json()
}
```

**`request.json()`** — request ki body JSON mein parse karta hai — `{ title: 'Naya Todo' }` milega.

Ab `body.title` mein title hai.

---

TypeScript bolega — "`request` ka type kya hai?" — `NextRequest` type dena padega. Woh `next/server` se aata hai:

```ts
import { NextRequest } from 'next/server'
```

Function update karo:

```ts
import { NextRequest } from 'next/server'

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

**`status: 400`** — "teri galti — galat data bheja."

---

## INSERT Query Likho

Ab `body.title` mil gaya — database mein daalna hai.

```ts
const newTodo = await db
  .insert(drizzle_todo)
  .values({ title: body.title })
```

**`db.insert(drizzle_todo).values({...})` tod ke:**

```
db                       ← Drizzle instance
  .insert(drizzle_todo)  ← "drizzle_todo table mein insert karo"
  .values({              ← "yeh values daalo"
    title: body.title
  })
```

Phase 1 wali SQL:

```sql
INSERT INTO drizzle_todo (title) VALUES ('Naya Todo');
```

`done` nahi diya — schema mein `default(false)` tha — automatically `false` set hoga.

---

## Ek Problem — PostgreSQL Row Wapas Nahi Deta

`newTodo` mein kya aayega?

MongoDB mein `Todo.create()` seedha naya object return karta tha:

```ts
const newTodo = await Todo.create({ title })
// newTodo = { _id: '...', title: 'Naya Todo', done: false }
```

PostgreSQL mein INSERT ke baad row **automatically wapas nahi aati.**

Toh `newTodo` mein kya hoga? Khaali result — naya todo nahi milega.

**Fix** — `.returning()` lagao — "insert ke baad naya row wapas do":

```ts
const newTodo = await db
  .insert(drizzle_todo)
  .values({ title: body.title })
  .returning()
```

Ab `newTodo` mein inserted row aa jaayegi.

**Par ek aur baat** — `.returning()` array deta hai — kyunki ek baar mein multiple rows bhi insert ho sakti hain. Hum ek hi insert kar rahe hain — `[0]` se pehla element nikalo:

```ts
return NextResponse.json(newTodo[0], { status: 201 })
```

**`status: 201`** — "naya resource ban gaya."

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

    const newTodo = await db
      .insert(drizzle_todo)
      .values({ title: body.title })
      .returning()

    return NextResponse.json(newTodo[0], { status: 201 })
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
import { db } from '@/db'
import { drizzle_todo } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allTodos = await db
      .select()
      .from(drizzle_todo)
      .orderBy(desc(drizzle_todo.id))

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

    const newTodo = await db
      .insert(drizzle_todo)
      .values({ title: body.title })
      .returning()

    return NextResponse.json(newTodo[0], { status: 201 })
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
Body: { "title": "Drizzle se banaya" }
```

Response:

```json
{
  "id": 2,
  "title": "Drizzle se banaya",
  "done": false
}
```

Neon SQL Editor mein verify karo:

```sql
SELECT * FROM drizzle_todo;
```

Naya todo dikh jaayega! ✅

---

## Aaj Ka Summary

✅ POST route — same `route.ts` file mein — alag function  
✅ `NextRequest` — request body padhne ke liye — tab import kiya jab chahiye tha  
✅ `request.json()` — body parse karo  
✅ `db.insert(drizzle_todo).values({...})` — INSERT INTO drizzle_todo  
✅ `.returning()` — PostgreSQL INSERT ke baad row wapas nahi deta — yeh lagao  
✅ `newTodo[0]` — `.returning()` array deta hai — pehla element nikalo  
✅ `status: 201` — naya resource bana  

---

## Agla Step

**Phase 3.4** — Frontend mein input box aur Add button add karenge — user naya todo type kare aur add kare! ✏️
