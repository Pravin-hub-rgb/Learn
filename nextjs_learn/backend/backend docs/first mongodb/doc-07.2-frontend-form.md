# Doc 07.2 — Frontend Form Banana ✏️
### (Input field, state, aur POST request)

---

## Pehle Yaad Karte Hain

Doc 07.1 mein backend ready ho gaya — `POST /api/todos` ab naya todo save kar sakta hai.

Abhi `page.tsx` mein sirf list hai — koi input nahi, koi form nahi.

**Ab kya chahiye?**

User kuch type kare — "Milk lana" — button click kare — todo database mein save ho jaaye — list mein dikh jaaye.

Toh teen cheezein banani hain:
1. Input field — user yahan type karega
2. Add button — click karne pe submit hoga
3. `addTodo()` function — POST request bhejega

---

## Step 1 — Input Ki State Chahiye

User kuch bhi type kare — woh value kahin store honi chahiye. Warna submit pe kaise pata chalega kya type kiya?

Yeh `useState` ka kaam hai:

```typescript
const [inputValue, setInputValue] = useState<string>("")
```

**Kaise kaam karega?**

```
User "M" type karta hai → onChange chalti hai → setInputValue("M")
User "Mi" type karta hai → onChange chalti hai → setInputValue("Mi")
User "Milk" type karta hai → onChange chalti hai → setInputValue("Milk")

Submit pe: inputValue = "Milk" ← Yeh POST mein bhejenge
```

---

## Step 2 — Input Field UI Mein Add Karo

```typescript
return (
  <main className="max-w-xl mx-auto p-6 min-h-screen bg-gray-50">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">
      📝 Meri Todo List
    </h1>

    {/* Naya — Input + Button */}
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Kya karna hai?"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={addTodo}
        className="px-5 py-2 bg-blue-500 text-white rounded-lg font-medium
                   hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </div>

    {/* Purani list — same as pehle */}
    ...
  </main>
)
```

**`value={inputValue}` aur `onChange` kyun dono chahiye?**

React mein input "controlled" hota hai — React state hi source of truth hai.

```
value={inputValue}          → Input mein wahi dikhega jo state mein hai
onChange={setInputValue}    → User type kare toh state update ho
```

Dono milke kaam karte hain — input aur state hamesha sync mein rahte hain.

---

## Step 3 — `addTodo()` Function Banao

Ab woh function banao jo POST request bhejega:

```typescript
async function addTodo() {
  // Pehle check — khaali submit na ho
  if (inputValue.trim() === "") return

  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: inputValue.trim() }),
  })
}
```

**GET se POST request alag kaise hai?**

GET request mein sirf URL hota tha:
```typescript
fetch("/api/todos")
```

POST mein teen cheezein extra hain:

**`method: "POST"`** — default GET hota hai, isliye explicitly batana padta hai.

**`headers: { "Content-Type": "application/json" }`** — Server ko bata rahe hain ki body mein JSON hai. Bina is header ke server samjhega nahi data kaisa hai.

**`body: JSON.stringify({ title: inputValue })`** — Actual data. Network pe sirf text ja sakta hai, object nahi. `JSON.stringify()` object ko string mein convert karta hai:
```javascript
JSON.stringify({ title: "Milk lana" })
// → '{"title":"Milk lana"}'
```

---

## Step 4 — Response Handle Karo

```typescript
async function addTodo() {
  if (inputValue.trim() === "") return

  const response = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: inputValue.trim() }),
  })

  if (!response.ok) {
    throw new Error("Todo add nahi ho saka")
  }

  const newTodo: Todo = await response.json()
}
```

**`const newTodo: Todo = await response.json()` kya mila?**

Server ne naya banaya hua todo return kiya — `201` status ke saath. Woh aisa dikhta hai:

```json
{
  "_id": "65a1b2c3...",
  "title": "Milk lana",
  "done": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

Yeh object ab `newTodo` mein hai.

---

## Step 5 — State Update Karo

Server se naya todo mil gaya. Ab do cheezein karo:

```typescript
// 1. List mein add karo — naye todo ko pehle
setTodos([newTodo, ...todos])

// 2. Input clear karo
setInputValue("")
```

**`[newTodo, ...todos]` kya hai?**

`...todos` **spread operator** hai — existing array ke saare items copy karta hai.

```javascript
const purane = ["todo2", "todo3"]
const naye = ["todo1", ...purane]
// naye = ["todo1", "todo2", "todo3"]
```

Toh `[newTodo, ...todos]` matlab:
- Naya todo **pehle**
- Phir saare purane todos

**Dobara `fetchTodos()` kyun nahi kiya?**

Kar sakte the — lekin extra network request hoti. Server ne already naya todo return kiya tha — woh directly state mein daal diya. Yeh **optimistic update** pattern hai — user ko instant feedback milta hai.

---

## Step 6 — try/catch Add Karo

```typescript
async function addTodo() {
  if (inputValue.trim() === "") return

  try {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: inputValue.trim() }),
    })

    if (!response.ok) throw new Error("Add failed")

    const newTodo: Todo = await response.json()
    setTodos([newTodo, ...todos])
    setInputValue("")

  } catch (err) {
    alert("Todo add nahi ho saka। Dobara try karo।")
    console.error(err)
  }
}
```

---

## Abhi File Kaisi Dikhti Hai?

```typescript
// app/page.tsx
"use client"

import { useEffect, useState } from "react"

interface Todo {
  _id: string
  title: string
  done: boolean
  createdAt: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string>("")

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      setLoading(true)
      const response = await fetch("/api/todos")
      if (!response.ok) throw new Error("Fetch failed")
      const data: Todo[] = await response.json()
      setTodos(data)
    } catch (err) {
      setError("Todos load nahi ho sake।")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function addTodo() {
    if (inputValue.trim() === "") return

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: inputValue.trim() }),
      })

      if (!response.ok) throw new Error("Add failed")

      const newTodo: Todo = await response.json()
      setTodos([newTodo, ...todos])
      setInputValue("")

    } catch (err) {
      alert("Todo add nahi ho saka। Dobara try karo।")
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => { setError(null); fetchTodos() }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Dobara Try Karo
        </button>
      </div>
    )
  }

  return (
    <main className="max-w-xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        📝 Meri Todo List
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Kya karna hai?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg font-medium
                     hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          Koi todo nahi। Upar se add karo! ☝️
        </p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <span className="text-base text-gray-700">
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
```

**Ab test karo!** Kuch likho, Add click karo — todo list mein aana chahiye. Page refresh karo — **todo abhi bhi wahan hoga** kyunki database mein save hai. 🎉

---

## Summary — Doc 07.2 Mein Kya Kiya

✅ **`inputValue` state add ki** — user ka typed text store karna

✅ **Controlled input banaya** — `value` + `onChange` dono

✅ **`addTodo()` function banaya** — POST request bhejne ke liye

✅ **POST request ka structure samjha** — method, headers, body

✅ **`JSON.stringify()`** — object ko string mein convert karna

✅ **Optimistic update** — `[newTodo, ...todos]` se instant UI update

---

## Agla Step — Doc 07.3

**Doc 07.3: `isSubmitting` — Double Submit Problem**

Ek problem abhi bhi hai — user tezi se do baar "Add" click kare toh do duplicate todos ban sakte hain. Yeh fix karna hai. 🚀
