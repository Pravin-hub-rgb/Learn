# Phase 3.6 — Frontend — Checkbox + Toggle

## Pichle Doc Se Aage

3.5 mein:
- PATCH route bana — `db.update().set().where(eq(...))`
- Postman se test kiya — done toggle ho raha hai

Ab frontend mein **checkbox** add karenge — user click kare — todo done/undone ho jaaye.

---

## toggleTodo Function Likho

**Coder ka soch:** "Acha backend ready hai, ab frontend se data kaise bhejna hai?"

**Step 1:** Todo identify karna hai → unique cheez chahiye → ID use karunga  
**Step 2:** Data update karna hai → done toggle karna hai → !done  
**Step 3:** Backend update function yeh accept karta hai → PATCH request bhejna hai

```ts
async function toggleTodo(id: number, done: boolean) {
  // Coder ka soch: Checkbox click hoga → API call karni hai → PATCH request
  // Step 1: Todo identify karna hai → unique cheez chahiye → ID use karunga
  // Step 2: Data update karna hai → done toggle karna hai → !done
  // Step 3: Backend update function yeh accept karta hai → PATCH request bhejna hai
  
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

### Samjhein Array Map Logic:

**`todos.map(t => t.id === id ? updated : t)`** - Yeh ek naya array banata hai:
- Har todo ko check karta hai
- Agar todo ka `id` match karta hai (jise toggle kiya gaya hai), toh uski jagah `updated` todo daalta hai
- Agar match nahi karta, toh wohi purana todo rehne deta hai

**Aapka sawal bilkul sahi hai!** 

**Confusion:** "agar `t.id === id` hai toh hum `updated` set kare ya wahi `t`?"

**Jawab:** Hum `updated` set karenge! Kyunki:

1. **`updated` aur `t` dono Todo type ke hain** - Dono mein same properties hain (id, title, done)
2. **`updated` updated values ke saath aata hai** - Backend se jo updated todo mila hai
3. **`t` purana todo hai** - Database mein abhi jo nahi hai

**Example:**
```javascript
// Pehle todos array:
todos = [
  { id: 1, title: "Todo 1", done: false },
  { id: 2, title: "Todo 2", done: false },    // ← User ne isko toggle kiya
  { id: 3, title: "Todo 3", done: false }
]

// User ne Todo 2 ko toggle kiya:
id = 2
done = false
updated = { id: 2, title: "Todo 2", done: true }  // ← Backend se mila updated todo

// Map operation:
todos.map(t => t.id === 2 ? updated : t) = [
  { id: 1, title: "Todo 1", done: false },    // id 1 !== 2, so original (t)
  { id: 2, title: "Todo 2", done: true },     // id 2 === 2, so updated (updated) ← Yeh wala change hua
  { id: 3, title: "Todo 3", done: false }     // id 3 !== 2, so original (t)
]

// Dekho: 
// - id 1 aur 3 wale todos mein koi change nahi hua (wahi purana `t`)
// - id 2 wala todo updated hua (naya `updated`)
```

**Type kaafi hai:** Dono `Todo` type ke hain, isliye TypeScript ko koi problem nahi aati!

**Kyun yeh approach use karte hain?**
- Immutable update - Hum original array ko modify nahi karte
- Performance - Sirf ek todo update hota hai, baaki same rehte hain
- React optimization - Reference change hota hai, isliye component re-render hota hai

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

  async function fetchTodos() {
    try {
      const res = await fetch('/api/todos')
      const data: Todo[] = await res.json()
      setTodos(data)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)    // ← chahe try chale ya catch — hamesha
    }
  }

  useEffect(() => { fetchTodos() }, [])

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
✅ `fetchTodos` mein `finally` — 3.2 se carry forward — saari files mein consistent  

---

## Agla Step

**Phase 3.7** — DELETE route banayenge — todo hatao backend se! 🗑️
