# Phase 3.2 — Naya Todo Add Karo — INSERT + Frontend Input

## Pichle Doc Se Aage

3.1 mein:
- GET route bana — `db.select().from(drizzle_todos)`
- Frontend mein todos list dikh rahi hai

Ab naya todo add karna hai — **POST route** + **frontend mein input box aur Add button**.

---

## Backend — POST Route

Abhi `app/api/todos/route.ts` mein sirf `GET` function hai.

Usi file mein `POST` function add karenge — same file — alag function.

---

## `NextRequest` Chahiye Hoga

GET mein koi request body nahi hoti — sirf data fetch karna tha.

POST mein user data bhejta hai — `{ title: 'Naya Todo' }` — yeh **request body** se milti hai.

Request body padhne ke liye `NextRequest` import karna padega:

```ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'    // ← add karo
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
import { desc } from 'drizzle-orm'
```

---

## POST Function Likhte Hain

```ts
export async function POST(request: NextRequest) {

}
```

Pehle request body padho:

```ts
export async function POST(request: NextRequest) {
  const body = await request.json()
}
```

**`request.json()`** — request ki body JSON mein parse karta hai — `{ title: 'Naya Todo' }` milega.

---

Validation add karo — title khaali nahi hona chahiye:

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

---

Ab INSERT query:

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
      .insert(drizzle_todos)
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

**`db.insert(drizzle_todos).values({...})` tod ke:**

```
db                        ← Drizzle instance
  .insert(drizzle_todos)  ← "drizzle_todos table mein insert karo"
  .values({               ← "yeh values daalo"
    title: body.title
  })
```

Phase 1 wali SQL:

```sql
INSERT INTO drizzle_todos (title) VALUES ('Naya Todo');
```

`done` nahi diya — schema mein `default(false)` tha — automatically `false` set hoga.

---

**`.returning()` kya hai — kyun chahiye?**

MongoDB mein `Todo.create()` seedha naya object return karta tha:

```ts
const newTodo = await Todo.create({ title })
// newTodo = { _id: '...', title: 'Homework', done: false }
```

PostgreSQL mein INSERT ke baad row automatically wapas nahi aati — `.returning()` lagao:

```ts
const result = await db.insert(drizzle_todos).values({ title }).returning()
// result = [{ id: 2, title: 'Naya Todo', done: false }]
//           ↑ array aata hai
```

**Array kyun?** `.returning()` multiple rows bhi de sakta hai — isliye array. Ek hi insert kar rahe hain — `[0]` se pehla element nikalo:

```ts
return NextResponse.json(newTodo[0], { status: 201 })
```

---

## Abhi Tak Poori `route.ts` File:

```ts
// app/api/todos/route.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allTodos = await db
      .select()
      .from(drizzle_todos)
      .orderBy(desc(drizzle_todos.id))
    return NextResponse.json(allTodos)
  } catch (error) {
    return NextResponse.json({ error: 'Todos nahi aaye!' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ error: 'Title zaroori hai!' }, { status: 400 })
    }

    const newTodo = await db
      .insert(drizzle_todos)
      .values({ title: body.title })
      .returning()

    return NextResponse.json(newTodo[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Todo nahi bana!' }, { status: 500 })
  }
}
```

---

## Frontend — Input Box + Add Button

Backend ready hai — ab frontend mein input aur button add karte hain.

Pehle **`input` state** chahiye — user jo type kare woh store ho:

```tsx
const [todos, setTodos] = useState<Todo[]>([])
const [loading, setLoading] = useState<boolean>(true)
const [input, setInput] = useState<string>('')    // ← add karo
```

---

Ab **`addTodo` function** likho:

```tsx
async function addTodo() {
  if (!input.trim()) return

  try {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    })

    const newTodo: Todo = await res.json()
    setTodos([newTodo, ...todos])    // ← naaya todo upar add karo
    setInput('')                     // ← input clear karo
  } catch (error) {
    console.error('Add error:', error)
  }
}
```

**`setTodos([newTodo, ...todos])`** — naaya todo array ke shuru mein daalo — pehle dikhega.

---

Ab **JSX mein input box + button** add karo — list ke upar:

```tsx
return (
  <div className="max-w-md mx-auto p-8">
    <h1 className="text-2xl font-bold mb-6">📝 Todo List</h1>

    {/* Input + Button — yeh add karo */}
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

    {/* List — pehle se tha */}
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

Browser mein kuch likho — Add dabao — todo list mein aa jaayega! ✅

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

---

## Aaj Ka Summary

✅ `NextRequest` — POST mein request body padhne ke liye  
✅ `request.json()` — body parse karo  
✅ `db.insert(drizzle_todos).values({...})` — INSERT INTO drizzle_todos  
✅ `.returning()` — PostgreSQL mein zaroori — inserted row wapas lo  
✅ `newTodo[0]` — array se pehla element  
✅ Frontend — `input` state, `addTodo` function, input box + button add kiya  

---

## Agla Step

**Phase 3.3** — Done toggle karenge — PATCH route banayenge — frontend mein checkbox aayega! ✅
