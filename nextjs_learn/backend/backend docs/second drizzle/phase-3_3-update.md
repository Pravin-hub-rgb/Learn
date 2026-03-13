# Phase 3.3 — Todo Done Karo — UPDATE + Frontend Checkbox

## Pichle Doc Se Aage

3.2 mein:
- POST route bana — naya todo add ho raha hai
- Frontend mein input box + Add button aa gaya

Ab todo done mark karna hai — **PATCH route** + **frontend mein checkbox**.

---

## Naya Route File Kyun?

Abhi `app/api/todos/route.ts` hai — yeh `/api/todos` handle karta hai — saare todos ke liye.

Par update karne ke liye **specific todo** chahiye:

```
PATCH /api/todos/1   ← id = 1 wala update karo
PATCH /api/todos/3   ← id = 3 wala update karo
```

URL mein `id` alag alag hoga — **dynamic route** chahiye.

```
app/api/todos/
├── route.ts          ← /api/todos — GET, POST
└── [id]/
    └── route.ts      ← /api/todos/1, /api/todos/2 — PATCH, DELETE
```

**`[id]` folder kyun brackets ke saath?**

Next.js mein brackets wala folder naam — dynamic segment hota hai — URL mein jo bhi value aaye woh `params.id` mein milti hai:

```
/api/todos/5   →   params.id = '5'
/api/todos/12  →   params.id = '12'
```

---

## `[id]` Folder Banao

`app/api/todos/` ke andar — naya folder: `[id]` — exactly yahi naam — brackets ke saath.

Phir andar `route.ts` banao:

```
app/
└── api/
    └── todos/
        ├── route.ts          ✅ pehle se hai
        └── [id]/
            └── route.ts      ← yeh banao
```

---

## Ek Zaroori Cheez — `id` Number Hai

MongoDB mein `_id` string tha — seedha use ho jaata tha.

PostgreSQL mein `id` **number** hai — par URL se jo milta hai woh hamesha **string** hota hai:

```
/api/todos/1   ←   URL mein "1" — yeh string hai — number nahi
```

Database mein compare karne ke liye number chahiye — convert karna padega:

```ts
const id = parseInt(params.id)
//          ↑
//   "1" (string) → 1 (number)
```

---

## Imports

```ts
// app/api/todos/[id]/route.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
import { eq } from 'drizzle-orm'
```

**`eq` kyun?**

Update mein specific row dhundni hai — `WHERE id = 1`.

Drizzle mein WHERE condition ke liye `eq` use karte hain:

```ts
eq(drizzle_todos.id, 1)   ←   drizzle_todos.id = 1
```

`eq` = equal — `drizzle-orm` se import hota hai.

---

## PATCH Function Likhte Hain

```ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

}
```

**`{ params }: { params: { id: string } }` kya hai?**

Next.js dynamic route mein URL ki value `params` se milti hai — second argument mein aati hai.

TypeScript type — `params` ek object hai — `id` string hai.

---

Andar `id` convert karo aur body padho:

```ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)    // string → number
  const body = await request.json() // { done: true }
}
```

---

Ab UPDATE query:

```ts
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
```

**`db.update(drizzle_todos).set({...}).where(eq(...))` tod ke:**

```
db.update(drizzle_todos)            ← "drizzle_todos table update karo"
  .set({ done: body.done })         ← "done column yeh value set karo"
  .where(eq(drizzle_todos.id, id))  ← "sirf jiska id match kare"
  .returning()                      ← "updated row wapas do"
```

Phase 1 wali SQL:

```sql
UPDATE drizzle_todos SET done = true WHERE id = 1;
```

**`.returning()` yahan bhi kyun?**

PostgreSQL mein UPDATE ke baad bhi row automatically wapas nahi aati — INSERT wali same baat — `.returning()` lagao.

**`!updated.length` kya hai?**

```
updated          ← array of updated rows
       .length   ← kitne rows update hue
!updated.length  ← agar 0 hai — koi row nahi mili — wrong id
```

Us `id` ka todo nahi mila — 404 return karo.

---

## Abhi Tak `[id]/route.ts`:

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
```

---

## Frontend — Checkbox Add Karo

Backend ready hai — ab `page.tsx` mein checkbox add karte hain.

Pehle **`toggleTodo` function** add karo:

```tsx
async function toggleTodo(id: number, done: boolean) {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done })   // ← current done ka ulta bhejo
    })

    const updated: Todo = await res.json()
    setTodos(todos.map(t => t.id === id ? updated : t))
  } catch (error) {
    console.error('Toggle error:', error)
  }
}
```

**`done: !done`** — agar abhi `false` tha toh `true` bhejo — toggle.

**`todos.map(t => t.id === id ? updated : t)`** — updated todo ko array mein replace karo — baaki same rahein.

---

Ab **JSX mein `<li>` update karo** — checkbox aur strikethrough add karo:

```tsx
<ul className="flex flex-col gap-2">
  {todos.map((todo) => (
    <li
      key={todo.id}
      className="p-3 border border-gray-200 rounded flex items-center gap-3"
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(todo.id, todo.done)}
        className="w-4 h-4 cursor-pointer"
      />
      <span className={todo.done ? 'line-through text-gray-400' : ''}>
        {todo.title}
      </span>
    </li>
  ))}
</ul>
```

Checkbox click karo — todo strike-through ho jaayega! ✅

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
              className="p-3 border border-gray-200 rounded flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id, todo.done)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className={todo.done ? 'line-through text-gray-400' : ''}>
                {todo.title}
              </span>
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

✅ Dynamic route `[id]` — specific todo ke liye  
✅ `parseInt(params.id)` — URL string → number  
✅ `eq(drizzle_todos.id, id)` — WHERE condition  
✅ `db.update().set({...}).where(eq(...))` — UPDATE  
✅ `.returning()` — UPDATE ke baad bhi zaroori  
✅ `!updated.length` — 0 rows = id nahi mili = 404  
✅ Frontend — `toggleTodo` function, checkbox, strikethrough add kiya  

---

## Agla Step

**Phase 3.4** — Todo delete karenge — DELETE route banayenge — frontend mein delete button aayega! 🗑️
