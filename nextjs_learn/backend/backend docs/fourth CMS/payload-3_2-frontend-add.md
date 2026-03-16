# Phase 3.2 — Frontend — Input + Todo Add Karo

## Pichle Doc Se Aage

3.1 mein:
- Todos list dikh rahi hai frontend mein
- `data.docs` — Payload ka format samjha

Ab **input box aur Add button** add karenge.

---

## Coder Ki Soch

> *"POST route Payload ne already banaayi hai — `/api/todos` pe POST bhejna hai — `{ title: input }` ke saath. Drizzle mein `addTodo` mein response se `newTodo` seedha milta tha. Payload mein POST response mein `doc` key thi — `data.doc` se naya todo milega."*

Yahi ek fark — baaki same.

---

## Step 1 — Input State Add Karo

```tsx
const [todos, setTodos] = useState<Todo[]>([])
const [loading, setLoading] = useState<boolean>(true)
const [input, setInput] = useState<string>('')     // ← add karo
```

---

## Step 2 — addTodo Function Likho

```tsx
async function addTodo() {
  if (!input.trim()) return
}
```

POST request bhejo:

```tsx
async function addTodo() {
  if (!input.trim()) return

  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input, done: false })
  })
}
```

**Headers aur JSON.stringify samajhna:**
Jab hum server ko data bhejte hain todo add karne ke liye, toh POST route pe jata hai. Is process mein hum kuch cheezein define karte hain:

**Complete Flow:**
1. User input box mein todo likhta hai
2. Add button dabata hai
3. `addTodo()` function chalta hai
4. Frontend pe hum JavaScript object banate hain: `{ title: input, done: false }`
5. **`JSON.stringify()`** - Object ko JSON string mein convert karta hai: `'{"title":"Todo Name","done":false}'`
   - Server ko JSON string format mein data chahiye hota hai
   - Agar hum object bhejenge toh server samajh nahi payega
6. `fetch()` se server ko request bheji jati hai
7. **`method: 'POST'`** - Batata hai ki hum data add kar rahe hain (POST = create)
8. **`headers: { 'Content-Type': 'application/json' }`** - Server ko batata hai ki hum JSON format mein data bhej rahe hain
   - **`'Content-Type'`** - Batata hai ki hum kis type ka content bhej rahe hain
   - **`'application/json'`** - Batata hai ki hum JSON format mein data bhej rahe hain
   - Server ko pata chalta hai ki data JSON format mein hai, isliye JSON parse kar sakta hai
9. Server receive karta hai aur JSON string ko parse karke database mein save kar deta hai

**Key Points:**
- Server ko sirf JSON format mein hi data accept karna aata hai
- Isliye `JSON.stringify()` use karte hain object ko JSON string mein convert karne ke liye
- `Content-Type: application/json` se server ko batata hai ki hum JSON format mein data bhej rahe hain

> *"`done: false` bhi bheja — Drizzle mein nahi bheja tha — default tha schema mein. Payload mein?"*

**`done: false` kyu bhej rahe hain jabki default set hai?**
- Collection mein humne `defaultValue: false` set kiya hai
- Lekin frontend se explicitly `done: false` bhejna safe practice hai
- Kabhi-kabhi server-side validation ya client-side logic mein confusion ho sakta hai
- Explicit value bhejne se clear ho jaata hai ki hum kya chahte hain
- Best practice: Agar default value hai, phir bhi explicitly bhejna better hai

Response se naya todo nikalo:

```tsx
const data = await res.json()
const newTodo: Todo = data.doc    // ← .doc — Payload ka format
```

**`data.doc`** — Drizzle mein seedha object tha — Payload mein `doc` key mein:

```
Drizzle:  const newTodo: Todo = await res.json()
Payload:  const newTodo: Todo = data.doc
```

List update karo:

```tsx
setTodos([newTodo, ...todos])
setInput('')
```

try/catch ke saath poora function:

```tsx
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
```

---

## Step 3 — JSX Mein Input + Button

`<h1>` ke neeche:

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

Admin Panel mein bhi dikh jaayega — auto sync! 😄

---

## Aaj Ka Summary

✅ `input` state — user ka text  
✅ `addTodo` — POST — `data.doc` se naya todo — Drizzle se fark  
✅ Admin Panel mein bhi dikh jaata hai — same database  
✅ Baaki sab same — `[newTodo, ...todos]`, `setInput('')`  

---

## Agla Step

**Phase 3.3** — Checkbox + Toggle — PATCH — `done` update karenge — aur delete button — poora app ready! ✅🗑️
