# Phase 3.1 — Frontend — Todos Fetch Karo

## Pichle Doc Se Aage

2.1 mein:
- Admin Panel se data daala
- API already ready hai — Payload ne banaayi
- GET response mein `docs` key hai — seedha array nahi

Ab `src/app/(frontend)/page.tsx` mein todos dikhate hain.

---

## Coder Ki Soch

> *"Drizzle mein `app/page.tsx` tha — yahan `src/app/(frontend)/page.tsx` hai — `(frontend)` folder ke andar. Par kaam same hai — interface, states, fetchTodos, JSX. Bas ek fark — Drizzle mein `data` seedha array tha, Payload mein `data.docs` array hai."*

Yahi ek fark hai — baaki sab same.

---

## Pehle Sirf UI — Fake Data

`src/app/(frontend)/page.tsx` kholo — jo pehle se hoga woh hata do — apna banao:

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

Browser mein dekho — UI theek hai. ✅

---

Ab interface banao — Payload ke response mein kya kya aata hai:

```tsx
'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: number
  title: string
  done: boolean
}
```

> *"Drizzle mein bhi yahi interface tha — same — `createdAt`, `updatedAt` nahi likhe — unki zaroorat nahi frontend mein."*

Bilkul — sirf jo chahiye woh lo.

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

Ab `fetchTodos` likho — yahan ek important fark hai:

```tsx
async function fetchTodos() {
  try {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data.docs)    // ← .docs — Payload ka format
  } catch (error) {
    console.error('Fetch error:', error)
  } finally {
    setLoading(false)
  }
}
```

**`data.docs`** — yahi Drizzle se fark hai:

```
Drizzle:  const data: Todo[] = await res.json()
          setTodos(data)          ← seedha array

Payload:  const data = await res.json()
          setTodos(data.docs)     ← .docs ke andar array
```

`useEffect` mein call karo — function pehle define karo:

```tsx
async function fetchTodos() {
  try {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data.docs)
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

Browser mein dekho — "Pehla Payload Todo" dikh raha hai! ✅

---

## Abhi Tak `page.tsx`:

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
      const data = await res.json()
      setTodos(data.docs)    // ← Payload ka format
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

✅ `src/app/(frontend)/page.tsx` — yahan frontend hai  
✅ `data.docs` — Payload ka format — seedha array nahi  
✅ `finally` — `setLoading(false)` — same pattern carry forward  
✅ Function pehle — `useEffect` baad mein — order sahi  
✅ Baaki sab Drizzle jaisa — interface, states, JSX  

---

## Agla Step

**Phase 3.2** — Input box + Add button — `addTodo` — POST response mein `doc` key! ✏️
