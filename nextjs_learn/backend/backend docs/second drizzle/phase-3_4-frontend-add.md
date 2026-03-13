# Phase 3.4 — Frontend — Input Box + Todo Add Karo

## Pichle Doc Se Aage

3.3 mein:
- POST route bana — `db.insert().values().returning()`
- Postman se test kiya — naya todo ban raha hai

Ab frontend mein **input box aur Add button** add karenge — user directly app se todo add kar sake.

---

## Pehle Socho — Kya Chahiye?

User text likhega — Add button dabayega — todo list mein aa jaayega.

Iske liye:
1. Input ki value store karne ke liye **state** chahiye
2. API call karne ke liye **function** chahiye
3. JSX mein **input box aur button** chahiye

Ek ek karte hain.

---

## Step 1 — Input State Add Karo

Abhi `page.tsx` mein yeh states hain:

```ts
const [todos, setTodos] = useState<Todo[]>([])
const [loading, setLoading] = useState<boolean>(true)
```

User jo type kare woh store karna hai — naya state add karo:

```ts
const [todos, setTodos] = useState<Todo[]>([])
const [loading, setLoading] = useState<boolean>(true)
const [input, setInput] = useState<string>('')     // ← add karo
```

`input` — user ne kya likha — `''` se start — khaali.

---

## Step 2 — addTodo Function Likho

Data POST karna hai `/api/todos` pe — function banao:

```ts
async function addTodo() {

}
```

Pehle check karo — input khaali toh kuch mat karo:

```ts
async function addTodo() {
  if (!input.trim()) return
}
```

Ab API call karo — POST request:

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

**`headers: { 'Content-Type': 'application/json' }`** — server ko batao "main JSON bhej raha hun."

**`body: JSON.stringify({ title: input })`** — `input` state ki value JSON mein convert karke bhejo.

---

Response mein naya todo aayega — `newTodo[0]` wala — list mein add karo aur input clear karo:

```ts
async function addTodo() {
  if (!input.trim()) return

  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input })
  })

  const newTodo: Todo = await res.json()
  setTodos([newTodo, ...todos])    // ← naaya todo array ke shuru mein
  setInput('')                     // ← input clear karo
}
```

**`[newTodo, ...todos]`** — naaya todo pehle — baaki purane saath.

---

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

## Step 3 — JSX Mein Input + Button Add Karo

List ke upar — `<h1>` ke neeche — input aur button add karo:

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

**`value={input}`** — input ki value state se aayegi.

**`onChange={(e) => setInput(e.target.value)}`** — user type kare — state update ho.

**`onKeyDown={(e) => e.key === 'Enter' && addTodo()}`** — Enter dabane se bhi add ho.

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

Kuch likho — Add dabao — todo list mein aa jaayega! ✅

---

## Aaj Ka Summary

✅ `input` state — user ka text store karo  
✅ `addTodo` — POST request — pehle kaam kiya tab import/use kiya  
✅ `JSON.stringify` — object ko JSON string mein convert karo  
✅ `Content-Type: application/json` — server ko batao JSON aa raha hai  
✅ `[newTodo, ...todos]` — naaya todo upar  
✅ JSX — input box + button — `value`, `onChange`, `onKeyDown`  

---

## Agla Step

**Phase 3.5** — Todo done mark karna hai — PATCH route banayenge — dynamic route `[id]` introduce karenge! ✅
