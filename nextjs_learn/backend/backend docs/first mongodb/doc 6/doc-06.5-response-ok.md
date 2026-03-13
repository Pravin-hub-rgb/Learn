# Doc 06.5 — `response.ok` aur `fetchTodos` Function 🔍
### (Server errors pakadna + cleaner approach)

---

## Pehle Yaad Karte Hain

Doc 06.4 mein `useEffect` se page load pe todos fetch ho rahe hain — `.then()` se.

**Abhi code kaisa hai:**

```typescript
useEffect(() => {
  fetch("/api/todos")
    .then(response => response.json())
    .then(data => {
      setTodos(data)
      setLoading(false)
    })
    .catch(err => {
      setError("Todos load nahi ho sake।")
      console.error(err)
      setLoading(false)
    })
}, [])
```

**Ab ek naya problem dikhta hai.**

---

## Problem — Server Error Pe Kuch Nahi Hota

Socho yeh scenario:

```
1. fetch("/api/todos") call hota hai
2. Server 500 error deta hai — database down hai
3. fetch() → koi error throw nahi karta!
4. .then(response => response.json()) → chal jaata hai
5. setTodos(galat data) → UI toot jaati hai
```

**Kyun aisa hota hai?**

`fetch()` sirf tab `.catch()` mein jaata hai jab **network hi nahi hai** — internet completely down ho. Lekin agar server ne respond kiya — chahe 500 error ke saath bhi — `.then()` chain chalti rehti hai.

Toh `response.ok` check karna padega. Lekin `.then()` chain mein yeh karna thoda messy ho jaata hai:

```typescript
fetch("/api/todos")
  .then(response => {
    if (!response.ok) {
      throw new Error("Server error")  // ← Manually throw karna padega
    }
    return response.json()
  })
  .then(data => { ... })
  .catch(err => { ... })
```

Yeh readable nahi lag raha. Isse better ek **alag async function** banana hai.

---

## Solution — `fetchTodos` Alag Function Banao

Yaad hai 6.4 mein bataya tha ki `useEffect` ke andar seedha `async` nahi likh sakte? Lekin **bahar** ek alag async function bana sakte hain aur `useEffect` se call kar sakte hain:

```typescript
useEffect(() => {
  fetchTodos()   // ← Seedha call — koi Promise nahi milega useEffect ko
}, [])

async function fetchTodos() {
  // Yahan async/await cleanly likh sakte hain
}
```

Ab `fetchTodos` ke andar `async/await` se cleanly likhte hain:

---

## Step 1 — `response.ok` Check Karo

```typescript
async function fetchTodos() {
  try {
    const response = await fetch("/api/todos")

    if (!response.ok) {
      throw new Error("Server se data nahi aaya")
    }

    const data: Todo[] = await response.json()
    setTodos(data)
  } catch (err) {
    setError("Todos load nahi ho sake।")
    console.error(err)
  } finally {
    setLoading(false)
  }
}
```

**`response.ok` kya hai?**

```
response.ok = true  → Status 200-299 ke beech (success)
response.ok = false → Status 400, 500 ya koi bhi error
```

**`if (!response.ok) throw new Error(...)`** — manually error throw karo. Woh seedha `catch` block mein jaayegi aur `setError()` chalega.

**`finally` kyun?**

`setLoading(false)` dono cases mein chahiye — success pe bhi, error pe bhi. `finally` hamesha chalta hai — ek hi jagah likhna pada.

---

## Step 2 — Retry Button Add Karo

Abhi error aane pe user ke paas koi option nahi — sirf error message dikhta hai. Page manually refresh karna padta hai.

```typescript
if (error) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 gap-4">
      <p className="text-red-500">{error}</p>
      <button
        onClick={() => {
          setError(null)    // Pehle error clear karo
          fetchTodos()      // Phir dobara fetch karo
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Dobara Try Karo
      </button>
    </div>
  )
}
```

**`onClick` mein do kaam:**
1. `setError(null)` — error state saaf karo, warna error dikhta rahega
2. `fetchTodos()` — dobara API call karo

**Yeh `fetchTodos` alag function hone ka faida bhi hai** — `useEffect` se bhi call ho raha hai, retry button se bhi. Agar `.then()` chain `useEffect` ke andar hoti toh retry possible nahi hota.

---

## Step 3 — Loading Spinner Add Karo

Loading text ki jagah CSS spinner:

```typescript
if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
    </div>
  )
}
```

**Spinner kaise kaam karta hai:**
- `animate-spin` → Continuously rotate karo
- `rounded-full` → Circle shape
- `border-b-2 border-blue-500` → Sirf bottom border blue, baaki transparent → spinner effect

---

## Abhi Poori File Kaisi Dikhti Hai?

```typescript
// app/page.tsx
"use client"

import { useState, useEffect } from "react"

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

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      const response = await fetch("/api/todos")

      if (!response.ok) {
        throw new Error("Server se data nahi aaya")
      }

      const data: Todo[] = await response.json()
      setTodos(data)
    } catch (err) {
      setError("Todos load nahi ho sake।")
      console.error(err)
    } finally {
      setLoading(false)
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
          onClick={() => {
            setError(null)
            fetchTodos()
          }}
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

      {todos.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          Koi todo nahi। Naya banao!
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

## Summary — Doc 06.5 Mein Kya Kiya

✅ **Problem samjha** — `.then()` chain mein `response.ok` check karna messy hai

✅ **`fetchTodos` alag function banaya** — `useEffect` ke bahar, cleanly async/await se

✅ **`response.ok` check add kiya** — manually error throw karna

✅ **`finally`** — hamesha loading band karna — success ya error dono pe

✅ **Retry button add kiya** — `fetchTodos` alag function hone ka faida

✅ **Loading spinner add kiya** — `animate-spin` CSS trick

---

## Agla Step — Doc 07

**Doc 07: CREATE — Naya Todo Add Karna (POST)**

Ab todos dikhte hain — lekin database abhi bhi empty hai. Koi todo add karne ka tarika nahi.

Agle doc mein POST API route banayenge aur frontend mein form add karenge. 🚀
