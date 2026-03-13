# Doc 07.3 — `isSubmitting` — Double Submit Problem 🔒
### (Button disable karna jab request chal rahi ho)

---

## Pehle Yaad Karte Hain

Doc 07.2 mein form ban gaya — user type kare, Add click kare, todo save ho jaaye.

**Lekin ek problem hai — try karo:**

1. Kuch likho input mein
2. Add button pe **tezi se do baar click karo**

Kya hoga?

```
Pehla click → POST /api/todos → "Milk lana" save ho raha hai...
Doosra click → POST /api/todos → "Milk lana" dobara save ho raha hai...

Result: Database mein do same todos!
```

**Yeh "double submit" problem hai.**

---

## Solution — Submitting Ke Dauran Button Disable Karo

Jab request chal rahi ho — button ko disable kar do. Click hi nahi hoga dobara.

Iske liye ek naya state chahiye:

```typescript
const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
```

**Kaam kaise karega:**

```
User "Add" click karta hai
→ setIsSubmitting(true)   ← Button disable ho gaya
→ POST request chal rahi hai...
→ Request complete (success ya error)
→ setIsSubmitting(false)  ← Button wapas enable
```

---

## Step 1 — `isSubmitting` State Add Karo

```typescript
const [inputValue, setInputValue] = useState<string>("")
const [isSubmitting, setIsSubmitting] = useState<boolean>(false)  // Naya
```

---

## Step 2 — `addTodo()` Mein `isSubmitting` Use Karo

```typescript
async function addTodo() {
  if (inputValue.trim() === "") return

  try {
    setIsSubmitting(true)   // ← Request shuru — button band karo

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
  } finally {
    setIsSubmitting(false)  // ← Hamesha — success ho ya error, button wapas kholo
  }
}
```

**`finally` mein kyun rakha?**

`try` mein rakha hota toh error aane pe button hamesha disabled rehta. `finally` hamesha chalta hai — success ho ya error — isliye yahan rakha.

---

## Step 3 — Button aur Input Pe `disabled` Add Karo

```typescript
<input
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder="Kya karna hai?"
  disabled={isSubmitting}   // ← Submitting ke waqt input bhi band
  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
             focus:outline-none focus:ring-2 focus:ring-blue-500
             disabled:bg-gray-100"
/>
<button
  onClick={addTodo}
  disabled={isSubmitting || inputValue.trim() === ""}
  className="px-5 py-2 bg-blue-500 text-white rounded-lg font-medium
             hover:bg-blue-600 transition-colors
             disabled:bg-gray-300 disabled:cursor-not-allowed"
>
  {isSubmitting ? "Adding..." : "Add"}
</button>
```

**Do conditions button pe:**

`disabled={isSubmitting || inputValue.trim() === ""}`

- `isSubmitting` → Request chal rahi hai toh disable
- `inputValue.trim() === ""` → Khaali input pe bhi disable — khaali todo kyon add karein?

**Button ka text change hota hai:**

`{isSubmitting ? "Adding..." : "Add"}`

Submitting ke waqt "Adding..." dikhta hai — user ko pata chalta hai kuch ho raha hai.

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

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
      setIsSubmitting(true)

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
    } finally {
      setIsSubmitting(false)
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
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:bg-gray-100"
        />
        <button
          onClick={addTodo}
          disabled={isSubmitting || inputValue.trim() === ""}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg font-medium
                     hover:bg-blue-600 transition-colors
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "Add"}
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

---

## Summary — Doc 07.3 Mein Kya Kiya

✅ **Double submit problem samjha** — tezi se do baar click = duplicate todos

✅ **`isSubmitting` state add ki** — request ke dauran track karna

✅ **`finally` mein reset kiya** — success ya error dono pe button wapas enable

✅ **Button + input disabled** — submitting ke waqt

✅ **Dynamic button text** — "Add" vs "Adding..."

---

## Agla Step — Doc 08

**Doc 08: DELETE — Todo Hatana**

Ab todos add ho sakte hain. Ab **delete** karna sikhenge.

Naya concept aayega — **Dynamic Routes** `[id]` — kyunki specific todo delete karne ke liye uski ID URL mein bhejni padti hai. 🗑️
