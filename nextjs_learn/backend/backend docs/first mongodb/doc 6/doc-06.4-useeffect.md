# Doc 06.4 — `useEffect` — Page Load Pe Todos Fetch Karna ⚡
### (Automatically data fetch karna)

---

## Pehle Yaad Karte Hain

Doc 06.3 mein:
- `"use client"` add kiya
- `useState` se `todos` state banayi

**Abhi file kaisi hai:**

```typescript
"use client"

import { useState } from "react"

export default function Home() {
  const [todos, setTodos] = useState([])

  return (
    <main className="max-w-xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        📝 Meri Todo List
      </h1>
    </main>
  )
}
```

**Ab problem kya hai?**

`todos` state abhi empty array hai — koi data nahi. API se fetch karna hai.

---

## Problem — Fetch Kab Karo?

Ek function bana sakte hain jo API se todos fetch kare. Lekin woh function **kab** call hoga?

Button click pe? Nahi — user ko khud click nahi karna chahiye. **Page load hote hi automatically** todos dikhne chahiye.

**"Page load pe automatically kuch karo" — yeh `useEffect` ka kaam hai.**

---

## `useEffect` Kya Hota Hai?

`useEffect` ek React hook hai jo **side effects** handle karta hai.

Side effect matlab — woh kaam jo component render hone ke baad karna ho. Jaise:
- API se data fetch karna
- Timer set karna
- Event listener add karna

**Humara case:** "Jab page screen pe aaye — todos fetch karo."

---

## `useEffect` Ka Structure

```typescript
useEffect(() => {
  // Yahan woh code jo chalana hai
}, [])
```

Do parts hain:

**Pehla — function:** Jo kaam karna hai woh yahan likhte hain.

**Doosra — dependency array `[]`:** Yeh decide karta hai kab chalega.

```typescript
// Koi array nahi → Har render pe chalega (usually nahi chahiye)
useEffect(() => { ... })

// Empty array [] → Sirf ek baar — jab component pehli baar screen pe aaye
useEffect(() => { ... }, [])

// Koi value → Pehli baar + jab bhi woh value change ho
useEffect(() => { ... }, [value])
```

**Humara case:** "Sirf ek baar — page load pe" = `[]` wala.

---

## Step 1 — `useEffect` Import Karo aur Add Karo

Zaroorat aayi — import karo:

```typescript
"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    // Yahan fetch karenge
  }, [])

  return (...)
}
```

---

## Step 2 — `fetchTodos` Function Banao

`useEffect` ke andar seedha async code nahi likh sakte — isliye alag function banate hain:

**Kyun nahi likh sakte?**

Socho `useEffect` ek **room cleaner** ki tarah hai:

1. **Room clean karo** (fetch karo, data le aao)
2. **Clean karne ke baad dustbin khali karo** (cleanup)

Agar tum `async` likhoge toh kya hoga?

`useEffect` ko kehte hain: "Room clean karo aur dustbin khali karo"

Lekin tum kehte ho: "Wait karo, main abhi busy hoon, baad mein karunga" (Promise return karo)

Toh `useEffect` confuse ho jata hai:

- Usko expect tha: "Clean karo aur dustbin khali karo"
- Lekin tum dete ho: "Wait karo"

**Solution kya hai?**

**Humara todo app simple hai, isliye hum `.then()` method use karenge:**

```typescript
useEffect(() => {
  fetch("/api/todos")
    .then(response => response.json())
    .then(data => setTodos(data))
}, [])
```

**Kaise kaam karta hai?**
- `fetch()` Promise return karta hai
- `.then()` se Promise handle karo
- `useEffect` ko koi Promise nahi milega

**`fetch("/api/todos")` kya hai?**

Browser ka built-in function hai — HTTP request bhejta hai।

`"/api/todos"` → Humara wahi route jo Doc 06.2 mein banaya — same Next.js app ke andar hai toh seedha path likh sakte hain।

**`response.json()`:** Server ne JSON string bheja — yeh use JavaScript object mein convert karta hai।

**`setTodos(data)`:** State update — React automatically UI re-render karega।

**`.then()` aur `.catch()` kya hain?**

`.then()` aur `.catch()` **Promise handling** ke methods hain:

```typescript
fetch("/api/todos")
  .then(response => response.json())  // ✅ Agar fetch success hua toh yeh chalega
  .then(data => setTodos(data))       // ✅ Agar JSON parse hua toh yeh chalega
  .catch(err => {                     // ❌ Agar koi error aaye toh yeh chalega
    console.error(err)
  })
```

**Kaise kaam karte hain?**

1. **`.then()`** → Success pe chalega
   - Pehla `.then()` → Response ko JSON mein convert karega
   - Dusra `.then()` → Data ko state mein set karega

2. **`.catch()`** → Error pe chalega
   - Agar fetch fail ho ya JSON parse nahi ho paya
   - Console pe print karega

---

## Step 3 — Loading State Add Karo

Fetch hone mein time lagta hai. Tab tak user ko kya dikhega? Blank screen?

Loading state chahiye. Lekin dhyan rakho — `useEffect` ke andar `setLoading(true)` nahi likhna chahiye, kyunki yeh extra re-render create karta hai.

**Sahi tarika:** Initial value hi `true` rakho — page load hote hi loading dikhega:

```typescript
const [todos, setTodos] = useState([])
const [loading, setLoading] = useState(true)   // Shuru mein true
```

`.then()` mein `setLoading(false)` karo jab data aa jaaye:

```typescript
useEffect(() => {
  fetch("/api/todos")
    .then(response => response.json())
    .then(data => {
      setTodos(data)
      setLoading(false)   // Fetch complete hone pe loading false karo
    })
    .catch(err => {
      console.error(err)
      setLoading(false)   // Error hone pe bhi loading false karo
    })
}, [])
```

**Kaise kaam karta hai?**

1. **Component load hote hi** `loading: true` → Loading screen dikhti hai
2. **Fetch complete hota hai** → `setLoading(false)` → Loading screen band
3. **Error aata hai** → `setLoading(false)` → Loading screen band

---

## Step 4 — Error State Add Karo

Ab error state add karni hai. Pehle sochte hain — is state mein kya store hoga?

Ya toh koi error nahi — `null`. Ya ek error message — `string`.

Toh type pehle se hi `<string | null>` daalo:

```typescript
const [todos, setTodos] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

Ab `.catch()` mein `setError` use karo:

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

---

## Step 5 — TypeScript Types Add Karo

TypeScript ko batana hai ki `todos` array mein kya hoga. Interface banao:

```typescript
interface Todo {
  _id: string
  title: string
  done: boolean
  createdAt: string
}
```

**`_id` kyun?** MongoDB automatically `_id` field banata hai har document mein — string type ka.

Ab baaki states pe bhi types lagao:

```typescript
const [todos, setTodos] = useState<Todo[]>([])
const [loading, setLoading] = useState<boolean>(true)
const [error, setError] = useState<string | null>(null)
```

---

## Step 6 — UI Mein States Render Karo

Teen states ke liye teen alag UI:

```typescript
// Loading state
if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <p className="text-gray-400 animate-pulse">Loading...</p>
    </div>
  )
}

// Error state
if (error) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <p className="text-red-500">{error}</p>
    </div>
  )
}

// Success state
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
```

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-400 animate-pulse">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-500">{error}</p>
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

## Summary — Doc 06.4 Mein Kya Kiya

✅ **`useEffect` kya hai** — side effects handle karna

✅ **Dependency array `[]`** — sirf ek baar page load pe

✅ **`async` useEffect mein kyun nahi** — Promise conflict, room cleaner analogy

✅ **`.then()` se fetch kiya** — Promise handling

✅ **`loading` state** — initial `true`, fetch ke baad `false`

✅ **`error` state** — `<string | null>` pehle se socha, `.catch()` mein use kiya

✅ **TypeScript interface** — `Todo` type define kiya

✅ **UI render** — teen states ke liye teen alag views

---

## Agla Step — Doc 06.5

**Doc 06.5: `response.ok` — Fetch Errors Sahi Se Handle Karna**

Ek problem abhi bhi hai — agar server 500 error de toh `fetch()` khud error throw nahi karta. Isko fix karna hai — aur retry button bhi add karenge. 🚀`
