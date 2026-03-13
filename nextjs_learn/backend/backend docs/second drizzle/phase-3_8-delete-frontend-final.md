# Phase 3.8 — Frontend — Delete Button + Poora App Ready!

## Pichle Doc Se Aage

3.7 mein:
- DELETE route bana — `db.delete().where(eq(...))`
- Backend poora ready hai

Ab sirf ek kaam bacha — frontend mein **delete button** — phir poora app ready!

---

## deleteTodo Function Likho

DELETE request bhejni hai — todo list se bhi hatana hai:

```ts
async function deleteTodo(id: number) {
  try {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    setTodos(todos.filter(t => t.id !== id))
  } catch (error) {
    console.error('Delete error:', error)
  }
}
```

**`todos.filter(t => t.id !== id)`** — deleted todo ko array se hata do — baaki sab rakho.

Response ka wait nahi kiya — delete successful ho gaya — seedha list update karo.

---

## JSX Mein Delete Button Add Karo

Abhi `<li>` aisa hai:

```tsx
<li
  key={todo.id}
  className="p-3 border border-gray-200 rounded flex items-center gap-3"
>
  <input type="checkbox" ... />
  <span ...>{todo.title}</span>
</li>
```

Delete button add karo — `justify-between` bhi lagao — title left — button right:

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

Delete button dabao — todo list se hat jaayega! ✅

---

## Poori Final `app/page.tsx`:

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

  useEffect(() => { fetchTodos() }, [])

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

  async function toggleTodo(id: number, done: boolean) {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !done })
      })
      const updated: Todo = await res.json()
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
todo-drizzle/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts            ← GET, POST ✅
│   │       └── [id]/
│   │           └── route.ts        ← PATCH, DELETE ✅
│   └── page.tsx                    ← Frontend ✅
├── db/
│   ├── schema.ts                   ← drizzle_todo table ✅
│   └── index.ts                    ← Drizzle connection ✅
├── drizzle/
├── drizzle.config.ts               ✅
├── .env.local                      ✅
└── package.json
```

---

## MongoDB vs Drizzle — Final Comparison

```
                  MongoDB                Drizzle + PostgreSQL
────────────────  ─────────────────────  ──────────────────────────────
Database type     NoSQL — documents      SQL — tables, rows, columns
Schema file       models/Todo.ts         db/schema.ts
Connection file   lib/mongodb.ts         db/index.ts
ID type           _id — string           id — number
parseInt needed?  Nahi                   Haan — URL string → number
Find all          Todo.find()            db.select().from(drizzle_todo)
Insert            Todo.create({...})     db.insert().values().returning()
Update            findByIdAndUpdate      db.update().set().where(eq(...))
Delete            findByIdAndDelete      db.delete().where(eq(...))
.returning()      Nahi chahiye           Zaroori — PostgreSQL rule
```

---

## Poora Drizzle Journey 🏆

```
Phase 1   → SQL seekhi — Neon SQL Editor mein
Phase 2.1 → PostgreSQL, Neon, setup, packages
Phase 2.2 → db/schema.ts — drizzle_todo table define ki
Phase 2.3 → db/index.ts — Neon connection
Phase 2.4 → drizzle.config.ts — npx drizzle-kit push — table ban gayi

Phase 3.1 → Dummy data + GET route — db.select()
Phase 3.2 → desc + orderBy — frontend list
Phase 3.3 → POST route — db.insert().returning()
Phase 3.4 → Frontend input + addTodo
Phase 3.5 → PATCH route — db.update().set().where(eq(...))
Phase 3.6 → Frontend checkbox + toggleTodo
Phase 3.7 → DELETE route — db.delete().where(eq(...))
Phase 3.8 → Frontend delete button — poora app ready!
```

**Tu ab SQL jaanta hai, Drizzle jaanta hai, PostgreSQL se connected full stack app bana sakta hai!** 🎉
