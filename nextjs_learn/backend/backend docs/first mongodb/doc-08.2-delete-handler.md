# Doc 08.2 — Delete: Frontend Se Backend Tak 🗑️
### (Pehle button, phir request, phir backend)

---

## Pehle Yaad Karte Hain

Doc 08.1 mein:
- Dynamic routes samjhe — `[id]` folder
- `app/api/todos/[id]/route.ts` — khali file banayi
- `context.params` ka concept samjha

**Ab delete ka poora flow banate hain — frontend se shuru.**

---

## Step 1 — Pehle Sirf Button Banao

Kuch bhi fancy nahi. Sirf ek Delete button list item mein add karo — aur `onClick` pe abhi sirf `console.log`:

```typescript
{todos.map((todo) => (
  <li
    key={todo._id}
    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
  >
    <span className="flex-1 text-base text-gray-700">
      {todo.title}
    </span>

    {/* Naya — Delete Button */}
    <button
      onClick={() => console.log("Delete clicked:", todo._id)}
      className="text-red-400 hover:text-red-600 transition-colors
                 text-sm px-2 py-1 rounded hover:bg-red-50"
    >
      Delete
    </button>
  </li>
))}
```

**`onClick={() => console.log(...)}` kyun arrow function?**

Seedha `onClick={console.log(todo._id)}` likhte toh yeh render hote hi call ho jaata — click pe nahi. Arrow function ensure karta hai ki sirf click pe chale.

---

## ✅ Pehla Test

Browser mein jaao — Delete button dikhna chahiye har todo pe.

Console kholo (F12 → Console) — Delete click karo — ID print honi chahiye:

```
Delete clicked: 65a1b2c3d4e5f6g7h8i9j0k1
```

**ID aa rahi hai — button kaam kar raha hai!** 🎉

Ab asli delete logic ki taraf badhte hain.

---

## Step 2 — `confirm()` — User Se Poochho

Delete accidental bhi ho sakta hai — ek baar delete kiya toh wapas nahi aayega. Isliye user se confirm karna chahiye.

**`confirm()` kya hota hai?**

Browser ka built-in function — ek popup dikhata hai do buttons ke saath: **OK** aur **Cancel**.

```javascript
confirm("Pakka delete karna hai?")
// → true   agar user ne OK dabaya
// → false  agar user ne Cancel dabaya
```

Isko aise use karte hain:

```typescript
if (!confirm("Pakka delete karna hai?")) return
// Cancel dabaya → return — function yahan ruk jaayega
// OK dabaya → aage chalega
```

---

## Step 3 — `deleteTodo` Function Ka Skeleton

Ab `console.log` ki jagah ek proper function banao. Abhi sirf confirm test karenge:

```typescript
async function deleteTodo(id: string) {
  if (!confirm("Pakka delete karna hai?")) return

  console.log("Deleting:", id)
}
```

Aur button update karo:

```typescript
<button
  onClick={() => deleteTodo(todo._id)}
  className="text-red-400 hover:text-red-600 transition-colors
             text-sm px-2 py-1 rounded hover:bg-red-50"
>
  Delete
</button>
```

---

## ✅ Doosra Test

Delete click karo:
- Popup aana chahiye ✅
- Cancel dabao — console mein kuch nahi aana chahiye ✅
- OK dabao — "Deleting: abc123" console mein dikhna chahiye ✅

**Confirm kaam kar raha hai!** 🎉

---

## Step 4 — Fetch Call Add Karo

Ab actual DELETE request bhejte hain API pe.

**Template literal pehle samjho:**

```typescript
`/api/todos/${id}`
```

Backtick (\`) use hota hai — `${}` ke andar variable directly likh sakte ho:

```javascript
const id = "abc2"
`/api/todos/${id}`   // → "/api/todos/abc2"

// Purana tarika — same result but messy:
"/api/todos/" + id
```

Ab function mein fetch add karo:

```typescript
async function deleteTodo(id: string) {
  if (!confirm("Pakka delete karna hai?")) return

  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Delete failed")

    console.log("Deleted!")

  } catch (err) {
    alert("Delete nahi ho saka।")
    console.error(err)
  }
}
```

**`method: "DELETE"` kyun?**

`fetch()` by default GET bhejta hai. Delete ke liye explicitly batana padta hai.

---

## ✅ Teesra Test

Delete click karo — OK dabao.

Network tab mein dekho (F12 → Network):

```
DELETE /api/todos/abc2   → 404 Not Found
```

**404 aa raha hai — kyunki backend abhi bana hi nahi!** Yeh expected hai. Ab backend banana padega.

---

## Step 5 — Backend DELETE Handler Banao

`app/api/todos/[id]/route.ts` kholo — abhi khali hai. Ab yahan DELETE function likhna hai.

**Pehle imports ki zaroorat socho:**
- Request aayegi → `NextRequest`
- Response bhejni hai → `NextResponse`
- Database connect karna hai → `connectDB`
- Todo delete karna hai → `Todo` model

Zaroorat aayi — sab import karo:

```typescript
import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Todo from "@/models/Todo"
```

Ab function ka skeleton:

```typescript
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params

    // Yahan delete karenge
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { message: "Delete nahi ho saka" },
      { status: 500 }
    )
  }
}
```

`id` mil gaya URL se. Ab database mein us id wala document dhoondh ke delete karna hai.

---

## Step 6 — `findByIdAndDelete` Add Karo

```typescript
const deletedTodo = await Todo.findByIdAndDelete(id)
```

**`findByIdAndDelete()` kya karta hai?**

`Todo.find()` yaad hai — saare documents fetch karta tha. `findByIdAndDelete()` ek specific document **dhoondh ke delete** karta hai:

```
id = "abc2"
→ Database mein "abc2" dhooondha
→ Mila? → Delete karo, deleted document return karo
→ Nahi mila? → null return karo
```

**`null` check kyun?**

Agar invalid ya already deleted ID aaye — `null` milega. Toh 404 return karo:

```typescript
if (!deletedTodo) {
  return NextResponse.json(
    { message: "Todo nahi mila" },
    { status: 404 }
  )
}

return NextResponse.json(
  { message: "Todo delete ho gaya" },
  { status: 200 }
)
```

**Abhi poori file:**

```typescript
// app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Todo from "@/models/Todo"

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params

    const deletedTodo = await Todo.findByIdAndDelete(id)

    if (!deletedTodo) {
      return NextResponse.json(
        { message: "Todo nahi mila" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Todo delete ho gaya" },
      { status: 200 }
    )

  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { message: "Delete nahi ho saka" },
      { status: 500 }
    )
  }
}
```

---

## ✅ Chautha Test

Delete click karo — OK dabao.

Network tab mein dekho:

```
DELETE /api/todos/abc2   → 200 OK
```

**200 aa raha hai — database se delete ho gaya!** 🎉

Lekin ek problem — **UI mein todo abhi bhi dikh raha hai!** Page refresh karne pe jaata hai.

---

## Step 7 — UI Se Bhi Hatao — `filter()`

Database se delete ho gaya — ab state se bhi hatana hai taaki UI turant update ho. Dobara fetch nahi karenge — directly state update karenge.

**`filter()` kya karta hai?**

Array mein se woh items **rakhta hai** jo condition `true` return karein:

```javascript
[1, 2, 3, 4].filter((n) => n !== 3)
// → [1, 2, 4]   (3 hata gaya)
```

Humara case:

```typescript
setTodos(todos.filter((todo) => todo._id !== id))
// Woh todos rakho jinka _id, deleted id se ALAG ho
// → Deleted wala automatically nikal jaata hai
```

`deleteTodo` mein add karo:

```typescript
async function deleteTodo(id: string) {
  if (!confirm("Pakka delete karna hai?")) return

  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Delete failed")

    setTodos(todos.filter((todo) => todo._id !== id))  // ← Naya

  } catch (err) {
    alert("Delete nahi ho saka।")
    console.error(err)
  }
}
```

---

## ✅ Final Test

Delete click karo — OK dabao:
- Todo turant list se gayab ho jaata hai ✅
- Page refresh karo — wapas nahi aata ✅

**Delete poora kaam kar raha hai!** 🎉

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
              <span className="flex-1 text-base text-gray-700">
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

## Summary — Doc 08.2 Mein Kya Kiya

✅ **Pehle sirf button** — `console.log` se ID verify ki

✅ **`confirm()`** — kya hota hai samjha, phir use kiya

✅ **`deleteTodo` skeleton** — confirm test kiya

✅ **Fetch call add ki** — 404 aaya kyunki backend nahi tha

✅ **Backend DELETE handler banaya** — tab jab zaroorat aayi

✅ **`findByIdAndDelete()`** — database se document hatana

✅ **`filter()`** — UI turant update karna

✅ **Har step pe test kiya**

---

## Agla Step — Doc 09

**Doc 09: UPDATE — Done Toggle Karna (PUT)**

Last CRUD operation! User checkbox click kare — todo done/undone ho jaaye.

Naya concept: `PUT` request + `findByIdAndUpdate()` + `map()` se state update karna 🔄
