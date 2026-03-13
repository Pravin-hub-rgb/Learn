# Doc 06.3 — Frontend Ko Client Component Banana 🖥️
### ("use client" kyun zaroori hai)

---

## Pehle Yaad Karte Hain

Doc 06.2 mein backend ka GET route complete hua — `/api/todos` pe request aaye toh database se todos fetch karke bhej dega.

**Ab frontend ki baari.**

`app/page.tsx` mein todos dikhane hain. Lekin pehle ek cheez samjhni hai.

---

## Problem — `useState` Use Karne Ki Koshish Karo

`page.tsx` kholo aur `useState` use karne ki koshish karo:

```typescript
// app/page.tsx
import { useState } from "react"

export default function Home() {
  const [todos, setTodos] = useState([])
  //                        ^^^^^^^^
  // ERROR: useState is not allowed in Server Components
}
```

**Error kyun aaya?**

---

## Next.js Mein Do Types Ke Components Hote Hain

**Server Component (default):**

```
Server pe chalta hai → HTML banata hai → Browser ko bhejta hai
useState ❌ | useEffect ❌ | onClick ❌
```

**Client Component (`"use client"` ke saath):**

```
Browser mein chalta hai
useState ✅ | useEffect ✅ | onClick ✅
```

Next.js App Router mein **default Server Component** hota hai — toh `useState` nahi chalta.

Humein `useState`, `useEffect`, aur button clicks chahiye — toh **Client Component** banana padega.

---

## Solution — `"use client"` Add Karo

File ke bilkul top pe — imports se bhi pehle:

```typescript
// app/page.tsx
"use client"

export default function Home() {
  return (
    <main>
      <h1>Meri Todo List</h1>
    </main>
  )
}
```

Bas itna — yeh ek line likhne se poora component browser mein chalega.

---

## Ab `useState` Import Karo

Ab `useState` use kar sakte hain. Zaroorat aayi — import karo:

```typescript
"use client"

import { useState } from "react"

export default function Home() {
  const [todos, setTodos] = useState([])

  return (
    <main>
      <h1>Meri Todo List</h1>
    </main>
  )
}
```

**`useState([])` mein `[]` kyun?**

`todos` mein ek array of todos hogi. Shuru mein koi todo nahi — toh empty array `[]` initial value hai.

---

## Abhi File Kaisi Dikhti Hai?

```typescript
// app/page.tsx
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

---

## Summary — Doc 06.3 Mein Kya Kiya

✅ **Problem samjha** — Server Component mein `useState` nahi chalta

✅ **`"use client"` add kiya** — Component browser mein chalega

✅ **`useState` import kiya** — zaroorat aayi tab

✅ **`todos` state define ki** — empty array se shuru

---

## Agla Step — Doc 06.4

**Doc 06.4: `useEffect` — Page Load Pe Todos Fetch Karna**

State ban gayi. Ab API se todos fetch karne hain — page load hone pe automatically. Iske liye `useEffect` chahiye. 🚀
