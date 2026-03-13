# Doc 09.4 — `map()` Se UI Update Karo 🔄
### (State update karna — ek item replace karna)

---

## Pehle Yaad Karte Hain

Doc 09.3 mein:
- PUT request backend pe ja rahi hai
- Database mein update ho raha hai — 200 aa raha hai
- **Lekin UI update nahi ho raha** — checkbox bounce karta hai, refresh pe sahi dikhta hai

**Problem:** Database sahi hai — state galat hai. `setTodos` call nahi kiya abhi.

---

## Problem — State Update Kyun Nahi Hui?

`toggleDone` mein abhi sirf yeh hai:

```typescript
console.log("Server ne 200 diya!")
```

Database mein `done: true` ho gaya — lekin React ko pata hi nahi. React sirf state dekhta hai — state same hai, toh UI same dikhega.

**State update karni padegi.**

---

## Delete Mein Kaise Kiya Tha?

Delete mein `filter()` use kiya tha — ek item **hataya** tha array se:

```typescript
setTodos(todos.filter((todo) => todo._id !== id))
// Deleted item nikal gaya
```

Ab ek item **replace** karna hai — hatana nahi. Uske liye `map()` use karenge.

---

## `map()` Kya Karta Hai?

`map()` har item pe ek function chalata hai aur result se **naya array** banata hai:

```javascript
[1, 2, 3].map((n) => n * 2)
// → [2, 4, 6]   (har number double hua)
```

Humara case — har todo ke liye sochte hain:
- Agar yeh wahi todo hai jो update hua → replace karo updated version se
- Agar koi aur todo hai → same rakho

```javascript
todos = [
  { _id: "abc1", title: "Milk", done: false },
  { _id: "abc2", title: "Assignment", done: false },  ← Yeh update hua
  { _id: "abc3", title: "Exercise", done: false },
]

// Server ne return kiya:
updatedTodo = { _id: "abc2", title: "Assignment", done: true }

todos.map((todo) => todo._id === "abc2" ? updatedTodo : todo)

// Result:
[
  { _id: "abc1", title: "Milk", done: false },       // Same — touch nahi kiya
  { _id: "abc2", title: "Assignment", done: true },  // Replace! updated version
  { _id: "abc3", title: "Exercise", done: false },   // Same — touch nahi kiya
]
```

Poori list same rahi — sirf ek todo update hua. Dobara fetch nahi karna pada.

---

## Ternary Operator — `condition ? a : b`

`map()` ke andar yeh pattern use kiya:

```typescript
todo._id === id ? updatedTodo : todo
```

Yeh ek shorthand if-else hai:

```typescript
// Yeh dono same hain:

// Lamba tarika:
if (todo._id === id) {
  return updatedTodo
} else {
  return todo
}

// Ternary — short tarika:
todo._id === id ? updatedTodo : todo
```

---

## Step 1 — `toggleDone` Mein State Update Add Karo

```typescript
async function toggleDone(id: string, currentDone: boolean) {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !currentDone }),
    })

    if (!response.ok) throw new Error("Update failed")

    const updatedTodo: Todo = await response.json()   // ← Server se updated todo lo

    setTodos(todos.map((todo) =>                      // ← State update karo
      todo._id === id ? updatedTodo : todo
    ))

  } catch (err) {
    alert("Update nahi ho saka।")
    console.error(err)
  }
}
```

**`await response.json()`** — Server ne updated todo return kiya (`new: true` ki wajah se). Woh lo — phir `map()` se state mein replace karo.

---

## ✅ Pehla Test

Checkbox click karo:
- Checkbox turant check/uncheck hota hai ✅
- Dobara click karo — wapas ✅
- Page refresh karo — state same rehti hai ✅

**Toggle kaam kar raha hai!** 🎉

---

## Step 2 — Line-Through Add Karo

Done todo pe visual feedback — title pe line aa jaaye:

```typescript
<span
  className={`flex-1 text-base cursor-pointer ${
    todo.done ? "line-through text-gray-400" : "text-gray-700"
  }`}
  onClick={() => toggleDone(todo._id, todo.done)}
>
  {todo.title}
</span>
```

**`todo.done ? "line-through text-gray-400" : "text-gray-700"`** — Ternary phir se — done hai toh line aur grey, nahi hai toh normal dark text.

**Title pe `onClick`** — Checkbox ke saath title click karne pe bhi toggle ho — better UX, bada click area.

---

## ✅ Final Test

Checkbox click karo:
- Title pe line aa jaati hai, color grey ho jaata hai ✅
- Dobara click karo — line hatt jaati hai ✅
- Page refresh karo — state database se aati hai — sahi dikhta hai ✅

**CRUD poora complete ho gaya!** 🎉

Create ✅ Read ✅ Update ✅ Delete ✅

---

## Abhi Poori `page.tsx` Kaisi Dikhti Hai?

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
      alert("Todo add nahi ho saka।")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function deleteTodo(id: string) {
    if (!confirm("Pakka delete karna hai?")) return
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Delete failed")
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (err) {
      alert("Delete nahi ho saka।")
      console.error(err)
    }
  }

  async function toggleDone(id: string, currentDone: boolean) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !currentDone }),
      })
      if (!response.ok) throw new Error("Update failed")
      const updatedTodo: Todo = await response.json()
      setTodos(todos.map((todo) =>
        todo._id === id ? updatedTodo : todo
      ))
    } catch (err) {
      alert("Update nahi ho saka।")
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

  const doneTodos = todos.filter((t) => t.done).length

  return (
    <main className="max-w-xl mx-auto p-6 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📝 Meri Todo List</h1>
        {todos.length > 0 && (
          <p className="text-sm text-gray-400 mt-1">
            {doneTodos}/{todos.length} complete
          </p>
        )}
      </div>

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
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(todo._id, todo.done)}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <span
                className={`flex-1 text-base cursor-pointer ${
                  todo.done ? "line-through text-gray-400" : "text-gray-700"
                }`}
                onClick={() => toggleDone(todo._id, todo.done)}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-400 hover:text-red-600 transition-colors
                           text-sm px-2 py-1 rounded hover:bg-red-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
```

---

## Summary — Doc 09.4 Mein Kya Kiya

✅ **Problem samjha** — database update hua, state nahi

✅ **`map()` pattern** — array mein ek item replace karna

✅ **Ternary operator** — `condition ? a : b`

✅ **`response.json()`** — server se updated todo liya

✅ **`setTodos(todos.map(...))` ** — state update ki, UI turant badla

✅ **`line-through`** — done todo pe visual feedback

✅ **Title pe bhi `onClick`** — better UX

---

## Agla Step — Doc 10

**Doc 10: Sab Jodo — Final Reference**

Poora CRUD complete ho gaya! Last doc mein:
- Final folder structure
- Common errors aur solutions
- Quick reference — Mongoose methods, status codes, fetch patterns
- Aage kahan jaao 🗺️
