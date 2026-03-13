# Phase 3.1 — Todos Dikhao — GET Route + Frontend List

## Pichle Phase Se Aage

Phase 2 mein poora setup ho gaya:

```
db/schema.ts        ← table define ki
db/index.ts         ← Neon connection — db export kiya
drizzle.config.ts   ← drizzle-kit config
npx drizzle-kit push ← table Neon mein ban gayi
```

Ab Phase 3 — **Todo App banayenge** — backend aur frontend ek saath — dheere dheere.

---

## Pehle Ek Problem Hai

`drizzle_todos` table abhi bilkul **empty** hai — koi data nahi.

Agar seedha GET route banayein aur fetch karein — toh kya dikhega?

```json
[]
```

Khaali array — pata nahi chalega — kaam sahi ho raha hai ya nahi.

**Toh pehle ek dummy todo daalo** — SQL Editor se — jaise Phase 1 mein kiya tha.

---

## SQL Editor Se Dummy Data Daalo

Neon Dashboard pe jao — **SQL Editor** kholo.

```sql
INSERT INTO drizzle_todos (title, done) VALUES ('Pehla Drizzle Todo', false);
```

Run karo — "Statement executed successfully" aayega.

Verify karo:

```sql
SELECT * FROM drizzle_todos;
```

```
id | title               | done
---+---------------------+------
1  | Pehla Drizzle Todo  | false
```

Ab data hai — aage badhte hain. ✅

---

## API Route Folder Banao

Next.js ko yeh data fetch karna hai — iske liye API route chahiye.

`app/` ke andar `api/` folder banao — phir `todos/` folder — phir `route.ts`:

```
app/
├── api/                ← naya folder
│   └── todos/          ← naya folder
│       └── route.ts    ← yeh banao
└── page.tsx
```

**`api/` folder kyun?**

Next.js mein `app/api/` ke andar jo files hain — woh API routes ban jaati hain. `app/api/todos/route.ts` → `/api/todos` URL ban jaata hai — browser ya frontend se fetch kar sakte hain.

---

## Route File Shuru Karo

`app/api/todos/route.ts` banao — pehle sirf imports:

```ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
```

**`NextResponse` kya hai?**

Next.js ka built-in tool hai — API route se response bhejne ke liye.

Browser request karta hai — hum response bhejte hain — `NextResponse.json(data)` se JSON response banta hai.

Normal JavaScript mein `Response` object hota hai — Next.js ne usse wrap karke `NextResponse` banaya — thoda aur easy.

**`@/db` kya hai?**

```
@/    ← project root ka shortcut — Next.js ne setup kiya hai
@/db  ← matlab todo-drizzle/db/index.ts
```

`db/index.ts` mein `export const db` tha — wahi import ho raha hai.

**`drizzle_todos` kyun import kiya?**

`db/schema.ts` mein `export const drizzle_todos = pgTable(...)` tha — wahi table variable.

Drizzle ko batana padta hai "kaunsi table pe kaam karna hai" — `drizzle_todos` pass karte hain.

---

## GET Function Banao

```ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'

export async function GET() {

}
```

**`export async function GET()`** — Next.js automatically samjhta hai — jab `/api/todos` pe GET request aayegi — yeh function chalega.

`async` kyun? — Database se data fetch karna hai — time lagta hai — `await` use karna padega — isliye `async`.

---

Ab andar query likho — saare todos chahiye:

```ts
export async function GET() {
  try {
    const allTodos = await db
      .select()
      .from(drizzle_todos)

    return NextResponse.json(allTodos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todos nahi aaye!' },
      { status: 500 }
    )
  }
}
```

**`db.select().from(drizzle_todos)` tod ke:**

```
db                      ← Drizzle instance — db/index.ts se aaya
  .select()             ← "SELECT karo" — saare columns chahiye
  .from(drizzle_todos)   ← "drizzle_todos table se"
```

Phase 1 wali SQL:

```sql
SELECT * FROM drizzle_todos;
```

**`try/catch` kyun?**

Database call fail ho sakti hai — network issue, Neon down — `try` mein kaam karo — `catch` mein error response bhejo.

**`{ status: 500 }` kya hai?**

HTTP status code — response ke saath jaata hai — browser ko batata hai request kaisi rahi:

```
200 → sab theek
201 → naya resource bana
400 → teri galti — galat data bheja
404 → cheez mili nahi
500 → server ki galti
```

`500` matlab — "hamare server mein kuch gadbad ho gayi."

---

## Test Karo — Browser Se

`npm run dev` chalao — browser mein jao:

```
http://localhost:3000/api/todos
```

Response:

```json
[
  { "id": 1, "title": "Pehla Drizzle Todo", "done": false }
]
```

Data aa raha hai! ✅

---

## Ek Problem — Order Sahi Nahi

Abhi jo response aaya — database ka default order hai — koi guarantee nahi ki naaya todo upar aayega.

Kal 10 todos honge — naaya add kiya — woh neeche dikh raha hai — confusing.

**Chahiye yeh** — naaya todo hamesha upar dikhe — `id` bada hoga naaye ka — toh descending order mein sort karo.

Phase 1 mein yeh SQL likhi thi:

```sql
SELECT * FROM drizzle_todos ORDER BY id DESC;
```

Drizzle mein `.orderBy()` hai — par `DESC` ke liye ek helper function chahiye — `desc` — jo `drizzle-orm` se aata hai.

---

## `desc` Kya Hai?

`drizzle-orm` package mein sorting ke liye do helpers hain:

```
asc  ← ascending  — chhota pehle — 1, 2, 3
desc ← descending — bada pehle   — 3, 2, 1
```

Import karo:

```ts
import { desc } from 'drizzle-orm'
```

Use karo `.orderBy()` mein — column batao kaunsa descending hoga:

```ts
.orderBy(desc(drizzle_todos.id))
```

---

Ab query mein add karo:

```ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
import { desc } from 'drizzle-orm'         // ← add karo

export async function GET() {
  try {
    const allTodos = await db
      .select()
      .from(drizzle_todos)
      .orderBy(desc(drizzle_todos.id))       // ← add karo

    return NextResponse.json(allTodos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todos nahi aaye!' },
      { status: 500 }
    )
  }
}
```

Ab naaya todo hamesha upar aayega. ✅

---

## Frontend — Todos List Dikhao

Backend se data aa raha hai — ab `app/page.tsx` mein dikhate hain.

**Pehle sirf UI** — koi logic nahi — fake data:

```tsx
'use client'

export default function HomePage() {
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">📝 Todo List</h1>

      <ul className="flex flex-col gap-2">
        <li className="p-3 border border-gray-200 rounded">
          Fake Todo
        </li>
      </ul>
    </div>
  )
}
```

Browser mein dekho — UI theek lag rahi hai. ✅

---

Ab **interface** add karo — TypeScript ko batao ek todo mein kya hota hai:

```tsx
'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: number        // PostgreSQL id — number hai — MongoDB _id string tha
  title: string
  done: boolean
}

export default function HomePage() {
  return (
    // same UI abhi
  )
}
```

---

Ab **states** add karo:

```tsx
export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  return (
    // same UI abhi
  )
}
```

`todos` — array mein saare todos rahenge.

`loading` — data load ho raha hai tab loader dikhao.

---

Ab **fetchTodos function** add karo — `useEffect` se call karo:

```tsx
useEffect(() => {
  fetchTodos()
}, [])

async function fetchTodos() {
  try {
    const res = await fetch('/api/todos')
    const data: Todo[] = await res.json()
    setTodos(data)
    setLoading(false)
  } catch (error) {
    console.error('Fetch error:', error)
    setLoading(false)
  }
}
```

---

Ab **JSX update karo** — fake todo hatao — real todos dikhao:

```tsx
return (
  <div className="max-w-md mx-auto p-8">
    <h1 className="text-2xl font-bold mb-6">📝 Todo List</h1>

    {loading ? (
      <p className="text-gray-400">⏳ Load ho raha hai...</p>
    ) : todos.length === 0 ? (
      <p className="text-gray-400">Koi todo nahi abhi!</p>
    ) : (
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="p-3 border border-gray-200 rounded"
          >
            {todo.title}
          </li>
        ))}
      </ul>
    )}
  </div>
)
```

Browser mein dekho — "Pehla Drizzle Todo" list mein dikh raha hai! ✅

---

## Abhi Tak `app/page.tsx`:

```tsx
'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: number
  title: string
  done: boolean
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      const res = await fetch('/api/todos')
      const data: Todo[] = await res.json()
      setTodos(data)
      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">📝 Todo List</h1>

      {loading ? (
        <p className="text-gray-400">⏳ Load ho raha hai...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-400">Koi todo nahi abhi!</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-3 border border-gray-200 rounded"
            >
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

## Aaj Ka Summary

✅ `drizzle_todos` empty thi — SQL Editor se dummy data daala  
✅ `NextResponse` — Next.js ka response tool — JSON bhejne ke liye  
✅ HTTP status codes — 200, 201, 400, 404, 500  
✅ `db.select().from(drizzle_todos)` — SELECT * FROM drizzle_todos  
✅ Pehle simple query — test kiya — phir problem aayi — orderBy add kiya  
✅ `desc` — drizzle-orm se — descending sort — naaya todo pehle  
✅ Frontend — interface, states, fetchTodos, list UI — step by step  

---

## Agla Step

**Phase 3.2** — Naya todo add karenge — POST route + frontend mein input box aur Add button! 📝
