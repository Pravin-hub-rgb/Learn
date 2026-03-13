# 05c — Cleanup + Common Mistakes + Mini Project ⏱️

## Aaj Kya Seekhenge?

- Cleanup function kya hota hai aur kyun zaroori hai
- Infinite loop — kab hota hai, kaise bachein
- Mini project — Quote Generator

---

## Pehle Problem — Timer Ka

Maan le tune ek timer banaya:

```tsx
useEffect(() => {
  setInterval(() => {
    console.log('tick!')
  }, 1000)
}, [])
```

Timer shuru ho gaya — har second `tick!` print ho raha hai.

Ab user doosre page pe chala gaya — component screen se hata gaya.

**Par timer abhi bhi chal raha hai!** 😱

Kyunki tune timer band karna nahi bataya. Memory waste ho rahi hai — aur kabhi kabhi bugs bhi aate hain.

**Solution — Cleanup Function.**

---

## Cleanup Function Kya Hai?

`useEffect` mein ek function **return** kar sakte ho — jab component screen se hata — woh function chale:

```tsx
useEffect(() => {
  // kaam shuru karo
  const timer = setInterval(() => {
    console.log('tick!')
  }, 1000)

  // ← yeh cleanup hai — component hatne pe chale
  return () => {
    clearInterval(timer)   // timer band karo
    console.log('Timer band ho gaya!')
  }
}, [])
```

```
Component aaya  → timer shuru
Component gaya  → cleanup chali → timer band
```

---

## Step by Step — Timer Component

**Step 1 — Sirf UI:**

```tsx
// app/components/Timer.tsx
'use client'

export default function Timer() {
  return (
    <div className="p-10 text-center">
      <h2 className="text-4xl font-bold">⏱️ 0</h2>
      <p className="text-gray-500 mt-2">seconds</p>
    </div>
  )
}
```

**Step 2 — State add karo:**

```tsx
'use client'

import { useState } from 'react'

export default function Timer() {
  const [seconds, setSeconds] = useState<number>(0)  // ← add

  return (
    <div className="p-10 text-center">
      <h2 className="text-4xl font-bold">⏱️ {seconds}</h2>  {/* ← add */}
      <p className="text-gray-500 mt-2">seconds</p>
    </div>
  )
}
```

**Step 3 — Timer add karo + cleanup:**

```tsx
'use client'

import { useState, useEffect } from 'react'

export default function Timer() {
  const [seconds, setSeconds] = useState<number>(0)

  // ← add
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)  // ← cleanup
  }, [])

  return (
    <div className="p-10 text-center">
      <h2 className="text-4xl font-bold">⏱️ {seconds}</h2>
      <p className="text-gray-500 mt-2">seconds</p>
    </div>
  )
}
```

**`setSeconds((prev) => prev + 1)` kya hai?**

Tune pehle `setCount(count + 1)` likha tha — woh bhi kaam karta hai.

Par timer ke andar `count` ki value "purani" ho sakti hai — React batches updates karta hai.

`prev` matlab — "jo abhi state mein hai woh le, aur uspe +1 kar." Hamesha sahi value milti hai.

```
prev = 5   →   return 5 + 1   →   seconds = 6  ✅
```

Timer chal raha hai — band nahi hoga jab tak component screen pe hai. Aur component hatega toh cleanup function band kar dega. ✅

---

## Common Mistake — Infinite Loop ❌

Yeh sabse common galti hai:

```tsx
// ❌ Yeh mat karo
useEffect(() => {
  setCount(count + 1)
})  // ← koi dependency array nahi!
```

Kya hoga:

```
Component render hua
      ↓
useEffect chala (no array = har baar)
      ↓
setCount() → state change
      ↓
Re-render hua
      ↓
useEffect phir chala
      ↓
setCount() → state change
      ↓
... forever 💀
```

**Fix — hamesha dependency array do:**

```tsx
// ✅ Sahi
useEffect(() => {
  fetchData()
}, [])  // ← sirf ek baar
```

---

## Mini Project — Quote Generator 🛠️

Coder ki soch:
> "Ek button dabao — naya quote aaye API se. Page load pe bhi ek quote aaye automatically."

**Step 1 — UI banao:**

```tsx
// app/components/QuoteGenerator.tsx
'use client'

export default function QuoteGenerator() {
  return (
    <div className="p-10 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">💡 Quote of the Day</h2>

      <div className="bg-gray-50 p-6 rounded-xl mb-6">
        <p className="text-lg italic text-gray-700">"Quote yahan aayega..."</p>
        <p className="text-gray-400 mt-2">— Author</p>
      </div>

      <button className="px-6 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
        Naya Quote 🔄
      </button>
    </div>
  )
}
```

**Step 2 — Interface aur States add karo:**

API yeh data degi:
```json
{ "content": "Quote text...", "author": "Koi Author" }
```

```tsx
'use client'

import { useState } from 'react'

interface Quote {
  content: string
  author: string
}

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // ... return same
}
```

**Step 3 — Fetch function banao, console mein dekho:**

```tsx
function fetchQuote() {
  setLoading(true)
  fetch('https://api.quotable.io/random')
    .then((res) => res.json())
    .then((data: Quote) => {
      console.log('Quote aaya:', data)
      setQuote(data)
      setLoading(false)
    })
    .catch(() => {
      setLoading(false)
    })
}
```

**Step 4 — Page load pe automatically fetch karo:**

```tsx
// ← add karo
useEffect(() => {
  fetchQuote()
}, [])   // sirf ek baar — page load pe
```

**Step 5 — UI mein dikhao:**

```tsx
<div className="bg-gray-50 p-6 rounded-xl mb-6 min-h-24">
  {loading ? (
    <p className="text-gray-400">⏳ Quote aa raha hai...</p>
  ) : quote ? (
    <>
      <p className="text-lg italic text-gray-700">"{quote.content}"</p>
      <p className="text-gray-400 mt-2">— {quote.author}</p>
    </>
  ) : (
    <p className="text-gray-400">Button dabao!</p>
  )}
</div>
```

**Step 6 — Button se fetch karo:**

```tsx
<button
  onClick={fetchQuote}
  disabled={loading}
  className={`px-6 py-2 rounded text-white font-medium
    ${loading
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-blue-600 cursor-pointer hover:bg-blue-700'
    }
  `}
>
  {loading ? 'Loading...' : 'Naya Quote 🔄'}
</button>
```

**`disabled={loading}` kya hai?**

Jab loading chal raha ho — button disable ho jaaye — user dobara click na kar sake. Browser khud handle karta hai — click nahi hota disabled button pe.

---

## Poori Final File

```tsx
// app/components/QuoteGenerator.tsx
'use client'

import { useState, useEffect } from 'react'

interface Quote {
  content: string
  author: string
}

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  function fetchQuote() {
    setLoading(true)
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data: Quote) => {
        setQuote(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="p-10 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">💡 Quote of the Day</h2>

      <div className="bg-gray-50 p-6 rounded-xl mb-6 min-h-24">
        {loading ? (
          <p className="text-gray-400">⏳ Quote aa raha hai...</p>
        ) : quote ? (
          <>
            <p className="text-lg italic text-gray-700">"{quote.content}"</p>
            <p className="text-gray-400 mt-2">— {quote.author}</p>
          </>
        ) : (
          <p className="text-gray-400">Button dabao!</p>
        )}
      </div>

      <button
        onClick={fetchQuote}
        disabled={loading}
        className={`px-6 py-2 rounded text-white font-medium
          ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 cursor-pointer hover:bg-blue-700'
          }
        `}
      >
        {loading ? 'Loading...' : 'Naya Quote 🔄'}
      </button>
    </div>
  )
}
```

---

## Aaj Ka Summary

✅ Cleanup function — `return () => {}` — component hatne pe chale  
✅ Timer ke saath hamesha `clearInterval` — cleanup mein  
✅ `prev => prev + 1` — state update ka safe tarika  
✅ Infinite loop — no dependency array + setState = danger  
✅ `disabled={loading}` — loading mein button disable  
✅ Fetch function alag banao — useEffect aur button dono use kar sakein  

---

## Poora useEffect Journey

```
05a → useEffect kya hai, dependency array, page title
05b → API fetch, loading/error/data states
05c → Cleanup, infinite loop, mini project
```

**useEffect ab solid hai!** 🎉

## Agla Step

**06-lists-and-keys.md** — Array of data ko screen pe dikhana — `.map()` ke saath! 🗂️
