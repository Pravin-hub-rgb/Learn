# 05 — useEffect ⚡

## useEffect Kya Hai?

Tera component screen pe aa gaya. Ab kuch kaam karna hai — jaise:

- API se data fetch karna
- Timer start karna
- Page title change karna

Yeh sab "side effects" hain — rendering ke **baad** hone wale kaam.

**`useEffect` = "Component render ho jaaye, phir yeh kaam karo."**

---

## Basic Syntax

```tsx
import { useEffect } from 'react'

useEffect(() => {
  // yahan woh kaam karo jo render ke baad karna hai
}, [dependencies])
```

**Woh `[]` kya hai?** — Dependency array. Yeh batata hai ki useEffect **kab** chale.

| Dependency Array | Kab chalta hai |
|-----------------|----------------|
| `[]` — empty | Sirf ek baar — jab component pehli baar screen pe aata hai |
| `[value]` — koi value | Jab bhi `value` change ho |
| Kuch nahi (no array) | Har render ke baad — avoid karo! |

---

## Example 1 — Page Title Change

```tsx
// app/components/Counter.tsx
'use client'

import { useState, useEffect } from 'react'

export default function Counter() {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    document.title = `Count: ${count}`  // browser tab ka title change hoga!
  }, [count])  // jab bhi count change ho

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

Browser ka tab dekho — count badhne pe title change hoga! 👀

---

## Example 2 — Timer

```tsx
'use client'
import { useState, useEffect } from 'react'

export default function Timer() {
  const [seconds, setSeconds] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // Cleanup function — component hatne pe timer band karo
    return () => clearInterval(interval)
  }, [])  // empty = sirf ek baar shuru

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2>⏱️ {seconds} seconds</h2>
    </div>
  )
}
```

**Cleanup function kyun?** — Jab component screen se hata, timer band karna zaroori hai. Warna memory waste hoti hai.

---

## TypeScript + API Data — Interface Banao! 🔵

Yeh sabse important use case hai useEffect ka. Aur TypeScript mein API se jo data aaye — uska **pehle se type define** karna padta hai.

### Bina TypeScript ke — risky

```tsx
const [user, setUser] = useState(null)
// user mein kya aayega? koi idea nahi 🤷
```

### TypeScript ke saath — safe ✅

```tsx
// Pehle API response ka type define karo
interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

const [user, setUser] = useState<User | null>(null)
// Ab pata hai — ya toh User aayega, ya null
```

**`User | null` kyun?** — Shuru mein koi data nahi hota (null), phir API se User aata hai. Dono possibilities batani padti hain.

---

## Example 3 — API Se Data Fetch Karna

```tsx
// app/components/UserProfile.tsx
'use client'

import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((data: User) => {       // ← data ka type bata rahe hain
        setUser(data)
        setLoading(false)
      })
      .catch(() => {
        setError('User nahi mila!')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>⏳ Load ho raha hai...</p>
  if (error) return <p style={{ color: 'red' }}>❌ {error}</p>
  if (!user) return null

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '300px' }}>
      <h2>👤 {user.name}</h2>
      <p>📧 {user.email}</p>
      <p>📞 {user.phone}</p>
      <p>🌐 {user.website}</p>
    </div>
  )
}
```

Notice kar — `data: User` likhne ke baad VS Code mein `data.` type karo — **auto-complete aa jaayegi!** TypeScript ko pata hai `User` mein `name`, `email`, `phone` hain. 🔥

---

## Mini Project — Quote Generator 🛠️

```tsx
// app/components/QuoteGenerator.tsx
'use client'

import { useState, useEffect } from 'react'

// API response ka type
interface Quote {
  content: string
  author: string
}

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchCount, setFetchCount] = useState<number>(0)

  function fetchQuote() {
    setLoading(true)
    fetch('https://api.quotable.io/random')
      .then((r) => r.json())
      .then((data: Quote) => {
        setQuote(data)
        setLoading(false)
        setFetchCount((prev) => prev + 1)
      })
      .catch(() => {
        setQuote({ content: 'API kaam nahi kar raha 😅', author: 'Error' })
        setLoading(false)
      })
  }

  // Pehli baar automatically fetch karo
  useEffect(() => {
    fetchQuote()
  }, [])

  // Quote aane pe page title update karo
  useEffect(() => {
    if (quote) {
      document.title = `"${quote.content.slice(0, 30)}..."`
    }
  }, [quote])

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2>💡 Random Quote</h2>
      <p style={{ color: '#888', fontSize: '14px' }}>Fetched: {fetchCount} baar</p>

      {loading ? (
        <p>Quote aa raha hai... ⏳</p>
      ) : quote ? (
        <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '10px', margin: '20px 0' }}>
          <p style={{ fontSize: '20px', fontStyle: 'italic' }}>"{quote.content}"</p>
          <p style={{ color: '#666' }}>— {quote.author}</p>
        </div>
      ) : null}

      <button
        onClick={fetchQuote}
        disabled={loading}
        style={{
          padding: '10px 24px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? 'Loading...' : 'Naya Quote Lao 🔄'}
      </button>
    </div>
  )
}
```

---

## useEffect Ka Flow

```
Component screen pe aaya
        ↓
Render hua (UI dikh raha hai)
        ↓
useEffect chala
        ↓
API call hui → data aaya → setUser() call hua
        ↓
Re-render hua (naya data screen pe)
        ↓
useEffect phir chala? → depends on dependency array!
```

---

## Common Mistake — Infinite Loop ❌

```tsx
// ❌ Infinite loop! — koi dependency array nahi
useEffect(() => {
  setCount(count + 1)  // state change → re-render → useEffect → state change → ...
})

// ✅ Sahi — sirf ek baar
useEffect(() => {
  fetchData()
}, [])
```

---

## Aaj Ka Summary

✅ `useEffect` = render ke baad side effects karne ke liye  
✅ `[]` = sirf ek baar (component aane pe)  
✅ `[value]` = value change hone pe  
✅ API response ka **interface pehle banao** — TypeScript ke saath zaroori hai  
✅ `useState<User | null>(null)` — start mein null, phir data aayega  
✅ Cleanup function return karo jab zaroorat ho  

---

## Agla Step

**06-lists-and-keys.md** — Array of data ko screen pe kaise dikhate hain? `.map()` se! Aur TypeScript mein typed arrays use honge. 🗂️
