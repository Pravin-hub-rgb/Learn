# Phase 3.4 — Frontend — Input Box + Todo Add Karo

## Pichle Doc Se Aage

3.3 mein:
- POST route bana — `prisma.todo.create()`
- `.returning()` nahi chahiye — Prisma automatically deta hai

Ab frontend mein input box aur Add button add karenge.

---

## Coder Ki Soch

> *"Backend POST route ready hai — `/api/todos` pe POST bhejni hai — `{ title: input }` ke saath. Frontend ko pata nahi Prisma hai ya Drizzle — woh toh API se baat karta hai. Drizzle mein jo `addTodo` function banaya tha — same hi hoga yahan."*

Bilkul same — sirf backend badla — frontend ka logic nahi.

---

## Step 1 — Input State Add Karo

Abhi states:

```ts
const [todos, setTodos] = useState<Todo[]>([])
const [loading, setLoading] = useState<boolean>(true)
```

Input ke liye naya state:

```ts
const [todos, setTodos] = useState<Todo[]>([])
const [loading, setLoading] = useState<boolean>(true)
const [input, setInput] = useState<string>('')     // ← add karo
```

---

## Step 2 — addTodo Function Likho

```ts
async function addTodo() {
  if (!input.trim()) return
}
```

Input khaali — kuch mat karo — warna POST bhejo:

```ts
async function addTodo() {
  if (!input.trim()) return

  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input })
  })
}
```

Response mein naya todo aayega — list mein add karo:

```ts
async function addTodo() {
  if (!input.trim()) return

  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input })
  })

  const newTodo: Todo = await res.json()
  setTodos([newTodo, ...todos])
  setInput('')
}
```

**`[newTodo, ...todos]`** — naaya todo pehle — baaki purane saath.

try/catch lagao:

```ts
async function addTodo() {
  if (!input.trim()) return
  try {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    })
    const newTodo: Todo = await res.json()
    setTodos([newTodo, ...todos])
    setInput('')
  } catch (error) {
    console.error('Add error:', error)
  }
}
```

---

## Step 3 — JSX Mein Input + Button

`<h1>` ke neeche add karo:

```tsx
<div className="flex gap-2 mb-6">
  <input
    type="text"
    placeholder="Naya todo likho..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
    className="flex-1 px-3 py-2 border border-gray-300 rounded outline-none"
  />
  <button
    onClick={addTodo}
    className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
  >
    Add
  </button>
</div>
```

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
  const [input, setInput] = useState<string>('')

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

  async function addTodo() {
    if (!input.trim()) return
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input })
      })
      const newTodo: Todo = await res.json()
      setTodos([newTodo, ...todos])
      setInput('')
    } catch (error) {
      console.error('Add error:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">📝 Todo List</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Naya todo likho..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded outline-none"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Add
        </button>
      </div>

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

Kuch likho — Add dabao — todo list mein aa jaayega! ✅

---

## Aaj Ka Summary

✅ `input` state — user ka text  
✅ `addTodo` — POST request — `JSON.stringify` — response se naya todo  
✅ `[newTodo, ...todos]` — naaya upar  
✅ Frontend bilkul same Drizzle jaisa — backend ka farak frontend ko pata nahi  

---

## Agla Step

**Phase 3.5** — Todo done/undone karna hai — PATCH route — `prisma.todo.update()` — `eq` ki zaroorat kyun nahi! ✅
