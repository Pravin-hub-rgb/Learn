# Phase 3.2 — Order Fix Karo + Frontend List Banao

## Pichle Doc Se Aage

3.1 mein:
- SQL Editor se dummy data daala
- GET route bana — `db.select().from(drizzle_todo)` — data aa raha hai

Ab ek problem hai — phir frontend mein list dikhayenge.

---

## Problem — Order Sahi Nahi

Abhi GET route se jo data aa raha hai — database ka default order hai — koi guarantee nahi ki naaya todo upar aayega.

Kal 10 todos honge — naaya add kiya — woh neeche dikh raha hai — confusing lagega user ko.

**Chahiye yeh** — naaya todo hamesha upar dikhe.

Kaise? — `id` bada hoga naaye todo ka — toh `id` descending order mein sort karo — bada pehle.

Phase 1 mein yeh SQL likhi thi:

```sql
SELECT * FROM drizzle_todo ORDER BY id DESC;
```

Drizzle mein `.orderBy()` se yeh hoga — par `DESC` ke liye ek helper chahiye.

---

## `desc` Kya Hai?

`drizzle-orm` package mein sorting ke liye do helpers hain:

```
asc  ← ascending  — chhota pehle — 1, 2, 3
desc ← descending — bada pehle   — 3, 2, 1
```

Humein `desc` chahiye — `drizzle-orm` se aata hai — import karo:

```ts
import { desc } from 'drizzle-orm'
```

Ab query mein `.orderBy()` add karo:

```ts
const allTodos = await db
  .select()
  .from(drizzle_todo)
  .orderBy(desc(drizzle_todo.id))    // ← add karo
```

**`.orderBy(desc(drizzle_todo.id))` tod ke:**

```
.orderBy(                    ← "is order mein sort karo"
  desc(drizzle_todo.id)      ← "drizzle_todo ka id column — descending"
)
```

---

## Updated `route.ts`:

```ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { drizzle_todo } from '@/db/schema'
import { desc } from 'drizzle-orm'          // ← add kiya

export async function GET() {
  try {
    const allTodos = await db
      .select()
      .from(drizzle_todo)
      .orderBy(desc(drizzle_todo.id))        // ← add kiya

    return NextResponse.json(allTodos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todos nahi aaye!' },
      { status: 500 }
    )
  }
}
```

Browser mein `/api/todos` dobara dekho — ab order sahi aayega. ✅

---

## Ab Frontend Banao

Backend se data sahi aa raha hai — ab `app/page.tsx` mein dikhate hain.

**Pehle sirf UI** — koi logic nahi abhi — fake data se shuru:

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

`npm run dev` chalao — browser mein dekho — UI theek lag rahi hai. ✅

---

Ab socho — real todos dikhane hain — TypeScript ko batana padega "ek todo mein kya kya hota hai."

**Interface** banao:

```tsx
'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: number        // PostgreSQL — number hai — MongoDB mein _id string tha
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

Ab todos store karne ke liye **state** chahiye — aur loading ke liye bhi:

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

`loading` — `true` hai jab data aa raha ho — tab loader dikhao.

---

Ab **fetchTodos** function likho — API se data lao — `useEffect` se call karo:

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

✅ Problem — default order sahi nahi — naaya todo upar nahi aata  
✅ `desc` — drizzle-orm se — descending — bada id pehle  
✅ `.orderBy(desc(drizzle_todo.id))` — ORDER BY id DESC  
✅ Frontend — pehle fake UI — phir interface — phir states — phir fetch — phir real list  

---

## Agla Step

**Phase 3.3** — Naya todo add karenge — POST route banayenge — `db.insert()` seekhenge! 📝
