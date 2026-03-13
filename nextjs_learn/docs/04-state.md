# 04 — useState 🔄

## State Kya Hoti Hai?

Props bahar se aata hai. Par agar component ka **khud ka data** ho — jo user ke action pe change ho?

Jaise:
- Counter jo button click pe badhta hai
- Form mein jo user type kare
- Light/Dark mode toggle

Yeh sab **State** hai — component ka apna internal data.

### HTML wala comparison

HTML/JS mein tu yeh karta tha:

```html
<h2 id="count">0</h2>
<button onclick="badhaao()">+1</button>

<script>
  let count = 0
  function badhaao() {
    count++
    document.getElementById('count').innerText = count  // manually DOM update
  }
</script>
```

React mein manually DOM update **nahi karna padta** — State change karo, React khud page update karta hai! ✨

---

## useState — Basic Syntax

```tsx
import { useState } from 'react'

const [value, setValue] = useState(initialValue)
```

- `value` — current value
- `setValue` — value change karne ka function
- `initialValue` — starting value

---

## TypeScript Mein useState — Generics! 🔵

Yahan ek naya TypeScript concept aata hai — **Generics**.

Pehle dekh bina generic ke:

```tsx
const [count, setCount] = useState(0)
```

Yeh kaam karta hai — TypeScript **khud samajh jaata hai** ki `0` number hai, toh `count` number hoga. Isko **type inference** kehte hain.

Par kabhi kabhi TypeScript ko **manually batana** padta hai. Jaise jab initial value `null` ho ya empty string ho:

```tsx
// TypeScript confuse ho jaata hai — yeh string hai ya null?
const [naam, setNaam] = useState(null)

// Clearly batao — angle brackets mein type likho
const [naam, setNaam] = useState<string | null>(null)
```

Woh `<string | null>` kya hai?

- `<>` → **Generic** — "is cheez ka type yeh hoga"
- `string | null` → "ya toh string hoga, ya null hoga" (`|` matlab "ya")

### Generics — Real Life Analogy

Ek dabba soch. Dabba khali hai. Tu use keh sakta hai:

- "Is dabbe mein sirf **apples** aayenge" → `useState<string>`
- "Is dabbe mein sirf **numbers** aayenge" → `useState<number>`
- "Is dabbe mein **apple ya null** aayega" → `useState<string | null>`

Dabba (useState) same hai — bas andar kya aayega woh tune define kiya.

---

## `'use client'` Kyun Likhte Hain?

Next.js mein **do tarah ke components** hote hain:

| Server Components | Client Components |
|------------------|-------------------|
| Default — server pe run hote hain | `'use client'` likhna padta hai file ke top pe |
| State use nahi kar sakte | State use kar sakte hain |
| Fast, SEO friendly | Interactive, user events handle karte hain |

**Rule:** Jab bhi `useState`, `onClick`, `onChange` use karo — file ke top pe `'use client'` likho.

---

## Example 1 — Counter (Simple)

```tsx
// app/components/Counter.tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2 style={{ fontSize: '48px' }}>{count}</h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => setCount(count + 1)}>+1 Badhaao</button>
        <button onClick={() => setCount(count - 1)}>-1 Ghatao</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  )
}
```

---

## Example 2 — String State (Form Input)

```tsx
'use client'
import { useState } from 'react'

export default function NameInput() {
  const [naam, setNaam] = useState<string>('')  // empty string se shuru

  return (
    <div>
      <input
        type="text"
        placeholder="Apna naam likho"
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
      />
      <p>Tumhara naam: {naam || 'Kuch nahi likha abhi'}</p>
    </div>
  )
}
```

**`e.target.value` kya hai?** — `e` event hai (keypress), `.target` woh input box hai, `.value` usme likha hua text.

---

## Example 3 — Object State

Kabhi kabhi state mein ek poora object rakhna hota hai. Jaise user ki info:

```tsx
'use client'
import { useState } from 'react'

// Pehle type banao
interface User {
  naam: string
  age: number
}

export default function UserForm() {
  // useState ko batao ki andar User type ka object aayega
  const [user, setUser] = useState<User>({ naam: '', age: 0 })

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Naam"
        value={user.naam}
        onChange={(e) => setUser({ ...user, naam: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={user.age}
        onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
      />
      <p>Naam: {user.naam}, Age: {user.age}</p>
    </div>
  )
}
```

**`...user` kya hai?** — Spread operator. Matlab "pehle wala sab copy karo, phir sirf `naam` change karo." Aise poora object dobara likhna nahi padta.

---

## Mini Project — Feedback Form 🛠️

```tsx
// app/components/FeedbackForm.tsx
'use client'

import { useState } from 'react'

interface FeedbackData {
  naam: string
  message: string
}

export default function FeedbackForm() {
  const [form, setForm] = useState<FeedbackData>({ naam: '', message: '' })
  const [submitted, setSubmitted] = useState<boolean>(false)

  function handleSubmit() {
    if (form.naam && form.message) {
      setSubmitted(true)
    } else {
      alert('Naam aur message dono likho! 😤')
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'green' }}>
        <h2>✅ Shukriya, {form.naam}!</h2>
        <p>Tumhara feedback: "{form.message}"</p>
        <button onClick={() => {
          setSubmitted(false)
          setForm({ naam: '', message: '' })
        }}>
          Aur Feedback Do
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Feedback Do 💬</h2>

      <input
        type="text"
        placeholder="Tumhara naam"
        value={form.naam}
        onChange={(e) => setForm({ ...form, naam: e.target.value })}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' }}
      />

      <textarea
        placeholder="Tumhara feedback..."
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        rows={4}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' }}
      />

      <button
        onClick={handleSubmit}
        style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Submit Karo
      </button>
    </div>
  )
}
```

---

## Important Rules

### ❌ State directly change mat karo!

```tsx
// ❌ BILKUL GALAT — React ko pata nahi chalega, page update nahi hoga!
count = count + 1

// ✅ HAMESHA setter function use karo
setCount(count + 1)
```

### TypeScript ka faida state mein

```tsx
const [count, setCount] = useState<number>(0)

setCount("hello")   // ❌ TS Error! String nahi, number chahiye
setCount(5)         // ✅
```

Galat type set karne se pehle hi rok deta hai! 🔥

---

## Aaj Ka Summary

✅ State = component ka apna internal data  
✅ `useState<Type>(initialValue)` — TypeScript mein type batao  
✅ `|` se multiple types — `useState<string | null>(null)`  
✅ Object state mein `...spread` se update karo  
✅ Setter function se hi change karo — kabhi directly nahi  
✅ `'use client'` likhna zaroori hai interactive components mein  

---

## Agla Step

**05-useEffect.md** — Component screen pe aane ke baad kuch karna ho — jaise API se data lana — woh `useEffect` se hota hai! ⚡
