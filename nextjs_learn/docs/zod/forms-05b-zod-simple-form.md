# Forms — Level 5b — Zod + Simple Form 🎯

## Aaj Kya Banayenge?

Ek naam wala form — Zod se validate karenge.

Par seedha poora code nahi likhenge — **ek coder ki tarah sochenge:**

> "Pehle UI bana lete hain. Kaam karta dikhe. Phir logic add karenge."

Yahi real development hai. Ek ek cheez. 😊

---

## Step 1 — Pehle Sirf UI Banao

Coder ki soch:
> "Pehle dekh toh loon — form kaisa dikhega. Logic baad mein."

```tsx
// app/components/NaamForm.tsx
'use client'

export default function NaamForm() {
  return (
    <div className="p-10 max-w-sm">
      <h2 className="text-xl font-bold mb-6">Apna Naam Daalo</h2>

      <form>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Naam:</label>
          <input
            type="text"
            placeholder="Naam likho..."
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Submit Karo
        </button>
      </form>

    </div>
  )
}
```

`app/page.tsx` mein lagao aur browser mein dekho:

```tsx
import NaamForm from './components/NaamForm'

export default function HomePage() {
  return <NaamForm />
}
```

**Bas. UI dikh raha hai. Abhi koi logic nahi — sirf structure.** ✅

---

## Step 2 — Input Ko State Se Connect Karo

Coder ki soch:
> "Theek hai UI ban gaya. Ab input ka data toh capture karna hoga. useState lagata hoon."

```tsx
'use client'

import { useState } from 'react'  // ← add kiya

export default function NaamForm() {
  const [naam, setNaam] = useState<string>('')  // ← add kiya

  return (
    <div className="p-10 max-w-sm">
      <h2 className="text-xl font-bold mb-6">Apna Naam Daalo</h2>

      <form>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Naam:</label>
          <input
            type="text"
            placeholder="Naam likho..."
            value={naam}                                    // ← add kiya
            onChange={(e) => setNaam(e.target.value)}      // ← add kiya
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Submit Karo
        </button>
      </form>

      {/* Test ke liye — baad mein hatayenge */}
      <p className="mt-4 text-gray-500">Abhi likha: {naam}</p>

    </div>
  )
}
```

Type karo input mein — neeche turant dikh jaayega. State connected hai. ✅

---

## Step 3 — Submit Function Banao

Coder ki soch:
> "Input ka data aa raha hai. Ab submit pe kya hoga? Pehle sirf console mein dekh lete hain — sahi data aa raha hai ya nahi."

```tsx
'use client'

import { useState } from 'react'

export default function NaamForm() {
  const [naam, setNaam] = useState<string>('')

  // ← naya function add kiya
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()  // page reload rokta hai
    console.log('Submit hua! Naam:', naam)
  }

  return (
    <div className="p-10 max-w-sm">
      <h2 className="text-xl font-bold mb-6">Apna Naam Daalo</h2>

      <form onSubmit={handleSubmit}>  {/* ← onSubmit add kiya */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Naam:</label>
          <input
            type="text"
            placeholder="Naam likho..."
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Submit Karo
        </button>
      </form>

    </div>
  )
}
```

Submit karo — browser Console mein naam dikh jaayega. ✅

---

## Step 4 — Zod Schema Banao

Coder ki soch:
> "Submit kaam kar raha hai. Ab validation lagaata hoon. Pehle Zod ka schema banata hoon — rules define karunga."

Schema component ke **bahar** banao — component ke andar nahi. Kyun? Kyunki har render pe dobara nahi banana chahiye — ek baar bana, hamesha use karo.

```tsx
'use client'

import { useState } from 'react'
import { z } from 'zod'   // ← Zod import kiya

// ← Schema — component ke bahar
const schema = z.object({
  naam: z.string()
    .min(1, 'Naam likho — khaala nahi chhod sakte!')
    .min(2, 'Naam kam se kam 2 characters ka hona chahiye!')
})

export default function NaamForm() {
  // ... baaki same
```

Abhi schema banaya — use nahi kiya. Next step mein use karenge. ✅

---

## Step 4.5 — Schema Se Type Bana Lo

Coder ki soch:
> "Schema ban gaya. Abhi tak manually type banata tha — ab Zod se khud banwa leta hoon."

Pehle tune aise type banata tha:

```tsx
type FormData = {
  naam: string
}
```

**Problem kya hai isme?**

Schema alag jagah hai, type alag jagah. Dono mein same cheez likhi hai. Agar kal schema mein ek field add kiya — type mein bhi yaad se add karna padega. Bhool gaye — bug aa gaya. 😩

**Zod ka shortcut — schema se type khud bana lo:**

```tsx
type FormData = z.infer<typeof schema>
```

Ab tod ke samjho — har part:

---

**`typeof schema`** kya hai?

`schema` ek variable hai — usme Zod ka object hai.

`typeof` TypeScript ka keyword hai — "is variable ka **type** kya hai" — woh nikaal lo.

```tsx
const schema = z.object({ naam: z.string() })

typeof schema   // → Zod ka internal type — schema ka blueprint
```

---

**`z.infer<...>` kya hai?**

`z.infer` Zod ka ek tool hai — schema ka type dekh ke batata hai "is schema se kaisa data aayega."

```tsx
z.infer<typeof schema>
// schema mein naam: z.string() hai
// toh result: { naam: string }
```

`<>` generic hai — tune generics mein padha tha — "tool ko type batao."

---

**Combined:**

```tsx
type FormData = z.infer<typeof schema>
// same as manually likhna:
// type FormData = { naam: string }
```

Par ab agar schema mein field badli — **type automatically update ho jaayegi.** Tu kuch nahi karta. 🔥

```tsx
// Schema update kiya
const schema = z.object({
  naam: z.string(),
  age: z.number()    // ← add kiya
})

type FormData = z.infer<typeof schema>
// automatically: { naam: string, age: number }
// alag se type update nahi karna pada! ✅
```

---

File mein add karo schema ke neeche:

```tsx
const schema = z.object({
  naam: z.string()
    .min(1, 'Naam likho — khaali nahi chhod sakte!')
    .min(2, 'Naam kam se kam 2 characters ka hona chahiye!')
})

type FormData = z.infer<typeof schema>  // ← add kiya
```

Abhi use nahi hogi yeh type — agli files mein kaam aayegi jab teen fields honge. Par concept yahan se shuru hota hai. ✅

---

## Step 5 — Validation Connect Karo

Coder ki soch:
> "Schema ready hai. Ab handleSubmit mein Zod se check karaata hoon."

```tsx
function handleSubmit(e: React.SyntheticEvent) {
  e.preventDefault()

  // Zod se data check karo
  const result = schema.safeParse({ naam })

  if (!result.success) {
    // Validation fail — errors hain
    console.log('Errors hain:', result.error.issues)
    return  // yahan ruk jao — aage mat badho
  }

  // Validation pass — sab theek hai
  console.log('Valid data:', result.data)
}
```

**`result.error.issues` kya hai?**

Jab validation fail ho — Zod ek array deta hai — har problem ek object:

```
issues: [
  {
    path: ['naam'],              ← kaunsi field mein problem hai
    message: 'Naam chota hai!'  ← kya problem hai
  }
]
```

Console mein dekho — naam khaala chhod ke submit karo. Errors dikh jaayenge. ✅

---

## Step 6 — Error State Banao Aur UI Mein Dikhao

Coder ki soch:
> "Console mein error aa raha hai. Ab user ko bhi dikhana chahiye — state mein rakhunga, phir UI mein dikha dunga."

**Pehle error ki state add karo:**

```tsx
const [naam, setNaam] = useState<string>('')
const [error, setError] = useState<string>('')  // ← naya
```

**Phir handleSubmit mein error set karo:**

```tsx
function handleSubmit(e: React.SyntheticEvent) {
  e.preventDefault()

  const result = schema.safeParse({ naam })

  if (!result.success) {
    // Pehla error message nikalo
    setError(result.error.issues[0].message)
    return
  }

  // Sab theek
  setError('')
  console.log('Valid data:', result.data)
}
```

**`result.error.issues[0].message` kya hai?**

```
result.error         ← Zod ka error object
            .issues  ← errors ki list (array)
                   [0]       ← pehla error (index 0)
                      .message  ← us error ka message
```

Sirf pehla error dikhate hain — ek baar mein ek cheez fix karo, sab ek saath nahi.

**Phir UI mein error dikhao:**

```tsx
<input
  type="text"
  placeholder="Naam likho..."
  value={naam}
  onChange={(e) => {
    setNaam(e.target.value)
    setError('')   // ← type karo toh error hatao
  }}
  className={`w-full px-3 py-2 border rounded outline-none
    ${error ? 'border-red-500' : 'border-gray-300'}
  `}
/>

{/* ← Error message */}
{error && (
  <p className="text-red-500 text-sm mt-1">{error}</p>
)}
```

**`` ` `` backtick wala string kya hai?**

```tsx
className={`w-full px-3 py-2 border rounded
  ${error ? 'border-red-500' : 'border-gray-300'}
`}
```

Backtick se string mein JS expression daal sakte ho `${}` mein:

```
error hai    → 'border-red-500'   ← red border
error nahi   → 'border-gray-300'  ← normal border
```

Wahi ternary operator — tune pehle padha tha — bas class names ke saath. ✅

---

## Step 7 — Success State Add Karo

Coder ki soch:
> "Validation kaam kar raha hai. Ab submit hone ke baad kuch dikhana chahiye — success message."

```tsx
const [naam, setNaam] = useState<string>('')
const [error, setError] = useState<string>('')
const [submitted, setSubmitted] = useState<boolean>(false)  // ← naya
```

```tsx
// handleSubmit mein
setError('')
setSubmitted(true)   // ← add kiya
console.log('Valid data:', result.data)
```

```tsx
// return ke pehle — agar submitted hai toh alag screen
if (submitted) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold text-green-600">✅ Ho Gaya!</h2>
      <p className="mt-2">Welcome, <strong>{naam}</strong>!</p>
      <button
        onClick={() => {
          setSubmitted(false)
          setNaam('')
          setError('')
        }}
        className="mt-4 px-4 py-2 bg-gray-200 rounded cursor-pointer"
      >
        Dobara Karo
      </button>
    </div>
  )
}
```

---

## Poori Final File — Sab Steps Ke Baad

```tsx
// app/components/NaamForm.tsx
'use client'

import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
  naam: z.string()
    .min(1, 'Naam likho — khaali nahi chhod sakte!')
    .min(2, 'Naam kam se kam 2 characters ka hona chahiye!')
})

export default function NaamForm() {
  const [naam, setNaam] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    const result = schema.safeParse({ naam })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setError('')
    setSubmitted(true)
    console.log('Valid data:', result.data)
  }

  if (submitted) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-green-600">✅ Ho Gaya!</h2>
        <p className="mt-2">Welcome, <strong>{naam}</strong>!</p>
        <button
          onClick={() => {
            setSubmitted(false)
            setNaam('')
            setError('')
          }}
          className="mt-4 px-4 py-2 bg-gray-200 rounded cursor-pointer"
        >
          Dobara Karo
        </button>
      </div>
    )
  }

  return (
    <div className="p-10 max-w-sm">
      <h2 className="text-xl font-bold mb-6">Apna Naam Daalo</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Naam:</label>
          <input
            type="text"
            placeholder="Naam likho..."
            value={naam}
            onChange={(e) => {
              setNaam(e.target.value)
              setError('')
            }}
            className={`w-full px-3 py-2 border rounded outline-none
              ${error ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Submit Karo
        </button>
      </form>
    </div>
  )
}
```

---

## Aaj Ka Summary

✅ Pehle UI — phir state — phir logic — yahi coder ka tarika  
✅ Schema component ke bahar banao — ek baar bana, hamesha use karo
✅ `z.infer<typeof schema>` — schema se type khud banta hai, manually nahi likhni  
✅ `result.error.issues[0].message` — pehla error message — deprecated nahi  
✅ Backtick string mein `${}` — conditional Tailwind class  
✅ Har step pe console mein check karo — aage badho  

---

## Agla Step

**Level 5c** — Teen fields wala poora Registration Form — same step by step! 🚀
