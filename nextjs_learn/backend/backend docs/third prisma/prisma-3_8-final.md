# Phase 3.8 — Delete Button + Poora App Ready!

## Pichle Doc Se Aage

3.7 mein:
- DELETE route bana — `prisma.todo.delete()`
- Backend poora ready

Ab sirf ek kaam — frontend mein **delete button** — phir poora app done!

---

## Coder Ki Soch

> *"DELETE route ready hai — `/api/todos/${id}` pe DELETE method bhejna hai — response ka zyada wait nahi — seedha list se hata do. Drizzle mein bhi yahi kiya tha — `deleteTodo` function same rahega."*

---

## deleteTodo Function Likho

```ts
async function deleteTodo(id: number) {

}
```

Request bhejo — list update karo:

```ts
async function deleteTodo(id: number) {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' })
  setTodos(todos.filter(t => t.id !== id))
}
```

**`todos.filter(t => t.id !== id)`** — deleted todo ko array se nikalo — baaki rakho.

try/catch:

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

---

## JSX Mein Delete Button

Abhi `<li>` mein checkbox + title hai:

```tsx
<li className="... flex items-center gap-3">
  <input type="checkbox" ... />
  <span ...>{todo.title}</span>
</li>
```

Delete button add karo — `justify-between` lagao:

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
todo-prisma/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          ← GET, POST ✅
│   │       └── [id]/
│   │           └── route.ts      ← PATCH, DELETE ✅
│   └── page.tsx                  ← Frontend ✅
├── lib/
│   └── prisma.ts                 ← PrismaClient ✅
├── prisma/
│   ├── schema.prisma             ← Todo model ✅
│   └── migrations/               ← migration history ✅
├── .env                          ← DATABASE_URL ✅
├── .env.local                    ← DATABASE_URL ✅
└── package.json
```

---

## Prisma vs Drizzle — Final Comparison

```
                  Drizzle                    Prisma
────────────────  ──────────────────────     ──────────────────────────
Schema file       db/schema.ts               prisma/schema.prisma
Schema language   TypeScript                 Prisma Schema Language
DB push           drizzle-kit push           prisma migrate dev
Migration history Nahi — seedha push         Haan — SQL files saved
Connection file   db/index.ts                lib/prisma.ts
Types             Manual / InferSelect       Auto-generated
Dummy data        SQL Editor / Neon          Prisma Studio (GUI)

SELECT all        db.select().from(todos)    prisma.todo.findMany()
ORDER BY          .orderBy(desc(todos.id))   { orderBy: { id: 'desc' } }

INSERT            db.insert().values()       prisma.todo.create({
                    .returning()               data: { title }
                                             })
.returning()      Zaroori                    Nahi chahiye — auto

UPDATE            db.update().set()          prisma.todo.update({
                    .where(eq(todos.id,id))    where: { id },
                    .returning()               data: { done }
                                             })
eq import         Haan — drizzle-orm se      Nahi — where object mein

DELETE            db.delete()                prisma.todo.delete({
                    .where(eq(todos.id,id))    where: { id }
                    .returning()             })

404 handling      !updated.length            error.code === 'P2025'
```

---

## Poora Prisma Journey 🏆

```
Phase 1.1 → Prisma kya hai — Drizzle se fark
Phase 1.2 → npx prisma init — files samjhi
Phase 1.3 → schema.prisma — Todo model likha

Phase 2.1 → prisma migrate dev — table bani — migrations samjhi
Phase 2.2 → lib/prisma.ts — PrismaClient — global instance kyun

Phase 3.1 → Prisma Studio se data — GET route — findMany
Phase 3.2 → Frontend list — finally pattern same
Phase 3.3 → POST route — create — returning nahi chahiye
Phase 3.4 → Frontend input + addTodo
Phase 3.5 → PATCH route — update — eq nahi chahiye
Phase 3.6 → Frontend checkbox + toggleTodo
Phase 3.7 → DELETE route — delete — P2025
Phase 3.8 → Frontend delete button — poora app ready!
```

**Tu ab MongoDB, Drizzle, aur Prisma — teeno jaanta hai. Kisi bhi project mein fit ho sakta hai!** 🎉
