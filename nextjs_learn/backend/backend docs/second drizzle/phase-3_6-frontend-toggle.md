# Phase 3.6 — Frontend — Checkbox + Toggle

## Pichle Doc Se Aage

3.5 mein:
- PATCH route bana — `db.update().set().where(eq(...))`
- Postman se test kiya — done toggle ho raha hai

Ab frontend mein **checkbox** add karenge — user click kare — todo done/undone ho jaaye.

---

## toggleTodo Function Likho

Checkbox click hoga — API call karni hai — PATCH request.

```ts
async function toggleTodo(id: number, done: boolean) {

}
```

PATCH request bhejo — current `done` ka ulta bhejo — toggle:

```ts
async function toggleTodo(id: number, done: boolean) {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: !done })    // ← ulta bhejo — toggle
  })
}
```

**`` `/api/todos/${id}` ``** — dynamic URL — is todo ki id se.

**`done: !done`** — agar abhi `false` tha toh `true` bhejo — agar `true` tha toh `false`.

---

Response mein updated todo aayega — list mein replace karo:

```ts
async function toggleTodo(id: number, done: boolean) {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: !done })
  })

  const updated: Todo = await res.json()
  setTodos(todos.map(t => t.id === id ? updated : t))
}
```

**`todos.map(t => t.id === id ? updated : t)`** — poori list loop karo — jiska id match kare uski jagah updated wala daalo — baaki same rahein.

---

try/catch lagao:

```ts
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
```

---

## JSX Mein Checkbox Add Karo

Abhi `<li>` aisa hai:

```tsx
<li
  key={todo.id}
  className="p-3 border border-gray-200 rounded"
>
  {todo.title}
</li>
```

Checkbox aur strikethrough add karo:

```tsx
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
```

**`checked={todo.done}`** — checkbox ka state database se aata hai.

**`onChange={() => toggleTodo(todo.id, todo.done)}`** — click hone pe toggleTodo call karo.

**`todo.done ? 'line-through text-gray-400' : ''`** — done hai toh strikethrough — nahi toh normal.

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

Checkbox click karo — todo strike-through ho jaayega! ✅

---

## Aaj Ka Summary

✅ `toggleTodo(id, done)` — PATCH request — `done: !done` — toggle  
✅ `todos.map(t => t.id === id ? updated : t)` — sirf woh todo replace karo  
✅ `checked={todo.done}` — database se state aati hai  
✅ `line-through text-gray-400` — done todo strikethrough  

---

## Agla Step

**Phase 3.7** — DELETE route banayenge — todo hatao backend se! 🗑️
