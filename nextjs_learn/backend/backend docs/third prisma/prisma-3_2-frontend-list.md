# Phase 3.2 — Frontend — Todo List Dikhao

## Pichle Doc Se Aage

3.1 mein:
- GET route bana — `prisma.todo.findMany()` — data aa raha hai
- Prisma Studio se dummy data daala

Ab `app/page.tsx` mein list dikhate hain.

---

## Coder Ki Soch

> *"Frontend ka kaam backend se independent hai — Drizzle wale project mein bhi yahi kiya tha — interface, states, fetchTodos, JSX. Prisma ne kuch nahi badla frontend mein — API route ka URL same hai `/api/todos` — frontend ko pata bhi nahi ki backend mein Drizzle hai ya Prisma."*

Bilkul sahi — yahi separation of concerns ka fayda hai.

Drizzle project mein jo `finally` wala pattern seekha tha — wahi yahan bhi use hoga.

---

## Pehle Sirf UI — Fake Data

`app/page.tsx` — fake todo se shuru:

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

Ab real todos dikhane hain — TypeScript ko batao Todo ka structure:

```tsx
'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: number
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

States add karo:

```tsx
export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  return (
    // same UI abhi
  )
}
```

---

`fetchTodos` function pehle define karo — phir `useEffect` mein call karo:

```tsx
async function fetchTodos() {
  try {
    const res = await fetch('/api/todos')
    const data: Todo[] = await res.json()
    setTodos(data)
  } catch (error) {
    console.error('Fetch error:', error)
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  fetchTodos()
}, [])
```

**`finally`** — yaad hai? Chahe data aaye ya error — `setLoading(false)` hamesha chalega — ek jagah — clean.

**Function pehle — `useEffect` baad mein** — order matter karta hai.

---

JSX update karo — real todos dikhao:

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

Browser mein dekho — "Pehla Prisma Todo" dikh raha hai! ✅

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

  async function fetchTodos() {
    try {
      const res = await fetch('/api/todos')
      const data: Todo[] = await res.json()
      setTodos(data)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

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

✅ Frontend Prisma se independent hai — API URL same — `/api/todos`  
✅ Interface `Todo` — id number, title string, done boolean  
✅ `fetchTodos` pehle define — `useEffect` baad mein — order sahi  
✅ `finally` — `setLoading(false)` ek jagah — chahe try ya catch  
✅ Drizzle wala pattern same — frontend nahi badla  

---

## Agla Step

**Phase 3.3** — Naya todo add karenge — POST route — `prisma.todo.create()` — `.returning()` kyun nahi chahiye ab! 📝
