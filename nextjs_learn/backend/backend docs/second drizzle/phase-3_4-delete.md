# Phase 3.4 — Todo Hatao — DELETE + Frontend Delete Button

## Pichle Doc Se Aage

3.3 mein:
- PATCH route bana — todo done toggle ho raha hai
- Frontend mein checkbox aa gaya

Ab last kaam — todo delete karna — **DELETE route** + **frontend mein delete button**.

---

## DELETE Route — Same `[id]/route.ts` File Mein

`app/api/todos/[id]/route.ts` mein PATCH function pehle se hai — usi file mein DELETE function add karo.

```ts
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

}
```

Same pattern — `params.id` se id milega — `parseInt` se number banao.

---

Ab DELETE query:

```ts
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    const deleted = await db
      .delete(drizzle_todos)
      .where(eq(drizzle_todos.id, id))
      .returning()

    if (!deleted.length) {
      return NextResponse.json({ error: 'Todo nahi mila!' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Todo delete ho gaya!' })
  } catch (error) {
    return NextResponse.json({ error: 'Delete nahi hua!' }, { status: 500 })
  }
}
```

**`db.delete(drizzle_todos).where(eq(drizzle_todos.id, id))` tod ke:**

```
db.delete(drizzle_todos)             ← "drizzle_todos table se delete karo"
  .where(eq(drizzle_todos.id, id))   ← "sirf jiska id match kare"
  .returning()                       ← "deleted row wapas do — confirm ke liye"
```

Phase 1 wali SQL:

```sql
DELETE FROM drizzle_todos WHERE id = 1;
```

---

## Poori `[id]/route.ts` File — Final:

```ts
// app/api/todos/[id]/route.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()

    const updated = await db
      .update(drizzle_todos)
      .set({ done: body.done })
      .where(eq(drizzle_todos.id, id))
      .returning()

    if (!updated.length) {
      return NextResponse.json({ error: 'Todo nahi mila!' }, { status: 404 })
    }

    return NextResponse.json(updated[0])
  } catch (error) {
    return NextResponse.json({ error: 'Update nahi hua!' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    const deleted = await db
      .delete(drizzle_todos)
      .where(eq(drizzle_todos.id, id))
      .returning()

    if (!deleted.length) {
      return NextResponse.json({ error: 'Todo nahi mila!' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Todo delete ho gaya!' })
  } catch (error) {
    return NextResponse.json({ error: 'Delete nahi hua!' }, { status: 500 })
  }
}
```

---

## Frontend — Delete Button Add Karo

Pehle **`deleteTodo` function** add karo:

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

**`todos.filter(t => t.id !== id)`** — deleted todo ko array se hata do — baaki sab rakho.

---

Ab **JSX mein `<li>` update karo** — delete button add karo:

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

  {/* Delete button — yeh add karo */}
  <button
    onClick={() => deleteTodo(todo.id)}
    className="text-red-400 hover:text-red-600 cursor-pointer"
  >
    🗑️
  </button>
</li>
```

`<li>` mein `justify-between` add kiya — checkbox+title left mein — delete button right mein.

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
│   ├── schema.ts                   ← drizzle_todos table ✅
│   └── index.ts                    ← Drizzle connection ✅
├── drizzle/                        ← migration files
├── drizzle.config.ts               ← drizzle-kit config ✅
├── .env.local                      ← DATABASE_URL ✅
└── package.json
```

---

## MongoDB vs Drizzle — Final Comparison

```
                  MongoDB                Drizzle + PostgreSQL
────────────────  ─────────────────────  ────────────────────────────────
Database type     NoSQL — documents      SQL — tables, rows, columns
Schema file       models/Todo.ts         db/schema.ts
Connection file   lib/mongodb.ts         db/index.ts
ID type           _id — string           id — number
parseInt needed?  Nahi                   Haan — URL string → number
Find all          Todo.find()            db.select().from(drizzle_todos)
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
Phase 2.2 → db/schema.ts — drizzle_todos table define ki
Phase 2.3 → db/index.ts — Neon connection banaya
Phase 2.4 → drizzle.config.ts — npx drizzle-kit push — table ban gayi

Phase 3.1 → SELECT — GET route + frontend list
Phase 3.2 → INSERT — POST route + frontend input + Add button
Phase 3.3 → UPDATE — PATCH route + frontend checkbox toggle
Phase 3.4 → DELETE — DELETE route + frontend delete button
```

**Poora full stack Todo app ready — PostgreSQL + Drizzle + Next.js!** 🎉
