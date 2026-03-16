# Phase 3.3 — Checkbox + Delete + Poora App Ready!

## Pichle Doc Se Aage

3.2 mein:
- Input box + Add button — todo add ho raha hai
- `data.doc` — Payload ka POST format

Ab **toggle** aur **delete** add karenge — phir poora app done!

---

## Coder Ki Soch

> *"PATCH aur DELETE routes Payload ne already banaayi hain — `/api/todos/:id` pe. Drizzle mein `[id]/route.ts` khud banaya tha — yahan kuch nahi banana. Bas frontend mein functions likhne hain — aur response format dhyan se dekhna hai."*

---

## toggleTodo Function Likho

Payload ka PATCH URL:

```
PATCH /api/todos/1
Body: { "done": true }
```

```tsx
async function toggleTodo(id: number, done: boolean) {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done })
    })
    const data = await res.json()
    const updated: Todo = data.doc    // ← PATCH bhi .doc deta hai
    setTodos(todos.map(t => t.id === id ? updated : t))
  } catch (error) {
    console.error('Toggle error:', error)
  }
}
```

**`data.doc`** — PATCH response mein bhi Payload `doc` key mein updated object deta hai — POST jaisa hi.

---

## deleteTodo Function Likho

Payload ka DELETE URL:

```
DELETE /api/todos/1
```

```tsx
async function deleteTodo(id: number) {
  try {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    setTodos(todos.filter(t => t.id !== id))
  } catch (error) {
    console.error('Delete error:', error)
  }
}
```

Delete ke baad response ka wait nahi — seedha list se hata do — same Drizzle jaisa.

---

## JSX Update Karo — Checkbox + Delete Button

Abhi `<li>` mein sirf title hai:

```tsx
<li key={todo.id} className="p-3 border border-gray-200 rounded">
  {todo.title}
</li>
```

Checkbox aur delete button add karo:

```tsx
<li
  key={todo.id}
  className="p-3 border border-gray-200 rounded flex items-center justify-between"
>
  <div className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={todo.done}
      onChange={() => toggleTodo(todo.id, todo.done)}
      className="w-4 h-4 cursor-pointer"
    />
    <span className={todo.done ? 'line-through text-gray-400' : ''}>
      {todo.title}
    </span>
  </div>

  <button
    onClick={() => deleteTodo(todo.id)}
    className="text-red-400 hover:text-red-600 cursor-pointer"
  >
    🗑️
  </button>
</li>
```

---

## Poori Final `page.tsx`:

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

  async function addTodo() {
    if (!input.trim()) return
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input, done: false })
      })
      const data = await res.json()
      const newTodo: Todo = data.doc
      setTodos([newTodo, ...todos])
      setInput('')
    } catch (error) {
      console.error('Add error:', error)
    }
  }

  async function toggleTodo(id: number, done: boolean) {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !done })
      })
      const data = await res.json()
      const updated: Todo = data.doc
      setTodos(todos.map(t => t.id === id ? updated : t))
    } catch (error) {
      console.error('Toggle error:', error)
    }
  }

  async function deleteTodo(id: number) {
    try {
      await fetch(`/api/todos/${id}`, { method: 'DELETE' })
      setTodos(todos.filter(t => t.id !== id))
    } catch (error) {
      console.error('Delete error:', error)
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
              className="p-3 border border-gray-200 rounded flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id, todo.done)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className={todo.done ? 'line-through text-gray-400' : ''}>
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-400 hover:text-red-600 cursor-pointer"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

## Poora Project Structure — Final

```
todo-payload/
├── src/
│   ├── app/
│   │   ├── (frontend)/
│   │   │   └── page.tsx         ← Frontend ✅
│   │   └── (payload)/
│   │       └── admin/           ← Admin Panel ✅
│   ├── collections/
│   │   └── Todos.ts             ← Collection config ✅
│   └── payload.config.ts        ← Main config ✅
├── .env                         ← DATABASE_URI + PAYLOAD_SECRET ✅
└── package.json
```

---

## Drizzle vs Payload — Final Comparison

```
                  Drizzle                    Payload CMS
────────────────  ──────────────────────     ────────────────────────────
Schema            db/schema.ts               src/collections/Todos.ts
Routes banaye?    Haan — khud likhe          Nahi — auto
Admin Panel       Nahi — SQL Editor          Haan — /admin built-in
GET response      [ {...}, {...} ]            { docs: [{...}] }
POST response     { id, title, done }         { doc: {...}, message }
PATCH response    updated object             { doc: {...} }
data nikalna      data                       data.docs / data.doc
[id] route file   Khud banaya               Payload ne banaayi
Extra fields      Nahi                      createdAt, updatedAt auto
```

---

## Poora Payload Journey 🏆

```
Phase 1.1 → Payload kya hai — Drizzle se fark
Phase 1.2 → create-payload-app — structure samjha
Phase 1.3 → Todos collection — fields define ki

Phase 2.1 → Admin Panel — GUI se data daala
            API already ready — Payload ne banaayi

Phase 3.1 → Frontend list — data.docs
Phase 3.2 → Frontend add — data.doc
Phase 3.3 → Frontend toggle + delete — poora app ready!
```

**Tu ab MongoDB, Drizzle, Prisma, aur Payload CMS — chaaon jaanta hai. Full Stack developer ban gaya yaar!** 🎉
