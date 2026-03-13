# Forms — Level 5c — Zod + Full Registration Form 🚀

## Aaj Kya Banayenge?

Teen fields — naam, email, password.

Same approach — **ek coder ki tarah:**
> "Pehle UI. Phir ek ek cheez add karo."

---

## Pehle Ek Samasya Dekho

Level 5b mein sirf ek field tha — ek state, ek error:

```tsx
const [naam, setNaam] = useState('')
const [error, setError] = useState('')
```

Ab teen fields hain. Aise karein toh:

```tsx
const [naam, setNaam] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [naamError, setNaamError] = useState('')
const [emailError, setEmailError] = useState('')
const [passwordError, setPasswordError] = useState('')
```

6 states sirf teen fields ke liye — aur agar 10 fields ho jaayein? 😩

**Better tarika — ek object mein sab.**

---

## Naya Concept — Object State

```tsx
const [form, setForm] = useState({
  naam: '',
  email: '',
  password: ''
})
```

Ek hi state — teen fields. Access karo aise:

```tsx
form.naam      // naam ki value
form.email     // email ki value
form.password  // password ki value
```

**Update kaise karein?**

Problem yeh hai — agar seedha karo:

```tsx
setForm({ naam: 'Ali' })
// ❌ email aur password gayab ho jaayenge!
```

Solution — **spread operator `...`:**

```tsx
setForm({ ...form, naam: 'Ali' })
```

`...form` matlab — "jo bhi `form` mein abhi hai woh sab pehle copy karo — phir sirf naam badlo."

```
form abhi:  { naam: '',    email: 'ali@g.com', password: '123' }
            { ...form,     naam: 'NewAli'                       }
result:     { naam: 'NewAli', email: 'ali@g.com', password: '123' }
```

Sirf naam badla — baaki same raha. ✅

---

## Step 1 — Sirf UI Banao

Coder ki soch:
> "Pehle UI dikhe. Teen fields, ek button. Logic baad mein."

```tsx
// app/components/RegistrationForm.tsx
'use client'

export default function RegistrationForm() {
  return (
    <div className="p-10 max-w-sm">
      <h2 className="text-xl font-bold mb-6">📝 Register Karo</h2>

      <form className="flex flex-col gap-5">

        <div>
          <label className="block mb-1 text-sm font-medium">Naam</label>
          <input
            type="text"
            placeholder="Apna naam"
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="text"
            placeholder="ali@gmail.com"
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Kam se kam 6 characters"
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 font-medium"
        >
          Register Karo 🚀
        </button>

      </form>
    </div>
  )
}
```

Browser mein dekho — UI theek lag raha hai. Abhi koi kaam nahi karta — bas dikhta hai. ✅

---

## Step 2 — Form State Add Karo

Coder ki soch:
> "UI ready. Ab teen fields ka data capture karna hai. Ek object mein rakhta hoon."

```tsx
'use client'

import { useState } from 'react'   // ← add

export default function RegistrationForm() {

  // ← ek object mein teen fields
  const [form, setForm] = useState({
    naam: '',
    email: '',
    password: ''
  })

  return (
    <div className="p-10 max-w-sm">
      <h2 className="text-xl font-bold mb-6">📝 Register Karo</h2>

      <form className="flex flex-col gap-5">

        <div>
          <label className="block mb-1 text-sm font-medium">Naam</label>
          <input
            type="text"
            placeholder="Apna naam"
            value={form.naam}                                              // ← add
            onChange={(e) => setForm({ ...form, naam: e.target.value })}  // ← add
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="text"
            placeholder="ali@gmail.com"
            value={form.email}                                              // ← add
            onChange={(e) => setForm({ ...form, email: e.target.value })}  // ← add
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Kam se kam 6 characters"
            value={form.password}                                              // ← add
            onChange={(e) => setForm({ ...form, password: e.target.value })}  // ← add
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 font-medium"
        >
          Register Karo 🚀
        </button>

      </form>

      {/* Test ke liye — baad mein hatayenge */}
      <p className="mt-4 text-sm text-gray-400">
        naam: {form.naam} | email: {form.email}
      </p>

    </div>
  )     
}
```

Teen fields type karo — neeche sab dikh raha hai. State kaam kar rahi hai. ✅

---

## Step 3 — Submit Function Banao

Coder ki soch:
> "State kaam kar rahi hai. Ab submit pe data console mein dekh lete hain."

```tsx
// ← naya function
function handleSubmit(e: React.SyntheticEvent) {
  e.preventDefault()
  console.log('Form data:', form)
}
```

```tsx
<form onSubmit={handleSubmit} className="flex flex-col gap-5">  {/* ← onSubmit add */}
```

Submit karo — console mein teen fields ka data dikh jaayega. ✅

---

## Step 4 — Zod Schema Banao

Coder ki soch:
> "Data aa raha hai. Ab validation rules define karta hoon — schema banata hoon."

```tsx
import { z } from 'zod'  // ← add

// ← component ke bahar — ek baar bana, hamesha use karo
const schema = z.object({
  naam: z.string()
    .min(1, 'Naam zaroori hai!')
    .min(2, 'Naam kam se kam 2 characters ka hona chahiye!'),

  email: z.email('Valid email likho — jaise ali@gmail.com'),

  password: z.string()
    .min(1, 'Password zaroori hai!')
    .min(6, 'Password kam se kam 6 characters ka hona chahiye!')
})
```

Schema ready — abhi use nahi kiya. Agla step. ✅

---

## Step 5 — Validation Connect Karo

Coder ki soch:
> "Schema ready hai. handleSubmit mein Zod se check karaata hoon. Console mein errors dekhunga pehle."

```tsx
function handleSubmit(e: React.SyntheticEvent) {
  e.preventDefault()

  const result = schema.safeParse(form)  // ← form ko schema se check karo

  if (!result.success) {
    console.log('Errors:', result.error.issues)
    // issues ek array hai — har error ek object:
    // { path: ['naam'], message: 'Naam zaroori hai!' }
    // { path: ['email'], message: 'Valid email likho' }
    return
  }

  console.log('Valid data:', result.data)
}
```

Khaali form submit karo — console mein saari fields ke errors dikh jaayenge. ✅

---

## Step 6 — Errors State Mein Rakho

Coder ki soch:
> "Errors aa rahe hain. Ab inhe state mein rakhunga — phir UI mein dikha dunga."

**Errors ke liye bhi object state:**

```tsx
const [errors, setErrors] = useState({
  naam: '',
  email: '',
  password: ''
})
```

**handleSubmit mein errors set karo:**

```tsx
function handleSubmit(e: React.SyntheticEvent) {
  e.preventDefault()

  const result = schema.safeParse(form)

  if (!result.success) {
    // Nayi errors object banao — khaali se shuru
    const newErrors = { naam: '', email: '', password: '' }

    // Har error ke liye — sahi field mein message daalo
    result.error.issues.forEach((issue) => {
      const field = issue.path[0]  // 'naam' ya 'email' ya 'password'

      if (field === 'naam')     newErrors.naam = issue.message
      if (field === 'email')    newErrors.email = issue.message
      if (field === 'password') newErrors.password = issue.message
    })

    setErrors(newErrors)
    return
  }

  // Sab theek
  setErrors({ naam: '', email: '', password: '' })
  console.log('Valid data:', result.data)
}
```

**`result.error.issues.forEach(...)` kya hai?**

```
result.error.issues   ← errors ki list
                      [
                        { path: ['naam'], message: 'Naam zaroori hai!' },
                        { path: ['email'], message: 'Valid email chahiye' }
                      ]

.forEach((issue) => {  ← har error ke liye yeh karo
  issue.path[0]        ← kaunsi field — 'naam', 'email', 'password'
  issue.message        ← kya error — 'Naam zaroori hai!'
})
```

Basically — Zod ne sab errors ek list mein diye. Tu ek ek karke dekh raha hai — kaunsi field ka hai — aur us field ki error state mein daal raha hai. ✅

---

## Step 7 — Errors UI Mein Dikhao

Coder ki soch:
> "Errors state mein aa gaye. Ab inputs ke neeche dikhata hoon — aur error hone pe border bhi red kar dunga."

Naam field update karo:

```tsx
<div>
  <label className="block mb-1 text-sm font-medium">Naam</label>
  <input
    type="text"
    placeholder="Apna naam"
    value={form.naam}
    onChange={(e) => {
      setForm({ ...form, naam: e.target.value })
      setErrors({ ...errors, naam: '' })  // ← type karo toh error hatao
    }}
    className={`w-full px-3 py-2 border rounded outline-none
      ${errors.naam ? 'border-red-500' : 'border-gray-300'}
    `}
  />
  {errors.naam && (
    <p className="text-red-500 text-sm mt-1">{errors.naam}</p>
  )}
</div>
```

Same email aur password ke liye bhi karo.

Submit karo khaali form — har field ke neeche error aayega. ✅

---

## Step 8 — Success Screen Add Karo

Coder ki soch:
> "Validation kaam kar raha hai. Ab ek success screen dikhata hoon — submit hone ke baad."

```tsx
const [submitted, setSubmitted] = useState<boolean>(false)  // ← add
```

```tsx
// handleSubmit mein
setErrors({ naam: '', email: '', password: '' })
setSubmitted(true)   // ← add
console.log('Valid data:', result.data)
```

```tsx
// return se pehle — success screen
if (submitted) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold text-green-600">✅ Registration Ho Gaya!</h2>
      <p className="mt-2 text-gray-600">
        Welcome, <strong>{form.naam}</strong>!
      </p>
      <p className="text-sm text-gray-400">{form.email}</p>
      <button
        onClick={() => {
          setSubmitted(false)
          setForm({ naam: '', email: '', password: '' })
          setErrors({ naam: '', email: '', password: '' })
        }}
        className="mt-6 px-4 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
      >
        Dobara Karo
      </button>
    </div>
  )
}
```

---

## Poori Final File

```tsx
// app/components/RegistrationForm.tsx
'use client'

import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
  naam: z.string()
    .min(1, 'Naam zaroori hai!')
    .min(2, 'Naam kam se kam 2 characters ka hona chahiye!'),
  email: z.email('Valid email likho — jaise ali@gmail.com'),
  password: z.string()
    .min(1, 'Password zaroori hai!')
    .min(6, 'Password kam se kam 6 characters ka hona chahiye!')
})

export default function RegistrationForm() {
  const [form, setForm] = useState({ naam: '', email: '', password: '' })
  const [errors, setErrors] = useState({ naam: '', email: '', password: '' })
  const [submitted, setSubmitted] = useState<boolean>(false)

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    const result = schema.safeParse(form)

    if (!result.success) {
      const newErrors = { naam: '', email: '', password: '' }
      result.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'naam')     newErrors.naam = issue.message
        if (field === 'email')    newErrors.email = issue.message
        if (field === 'password') newErrors.password = issue.message
      })
      setErrors(newErrors)
      return
    }

    setErrors({ naam: '', email: '', password: '' })
    setSubmitted(true)
    console.log('Valid data:', result.data)
  }

  if (submitted) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-green-600">✅ Registration Ho Gaya!</h2>
        <p className="mt-2 text-gray-600">Welcome, <strong>{form.naam}</strong>!</p>
        <p className="text-sm text-gray-400">{form.email}</p>
        <button
          onClick={() => {
            setSubmitted(false)
            setForm({ naam: '', email: '', password: '' })
            setErrors({ naam: '', email: '', password: '' })
          }}
          className="mt-6 px-4 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
        >
          Dobara Karo
        </button>
      </div>
    )
  }

  return (
    <div className="p-10 max-w-sm">
      <h2 className="text-xl font-bold mb-6">📝 Register Karo</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div>
          <label className="block mb-1 text-sm font-medium">Naam</label>
          <input
            type="text"
            placeholder="Apna naam"
            value={form.naam}
            onChange={(e) => {
              setForm({ ...form, naam: e.target.value })
              setErrors({ ...errors, naam: '' })
            }}
            className={`w-full px-3 py-2 border rounded outline-none
              ${errors.naam ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.naam && <p className="text-red-500 text-sm mt-1">{errors.naam}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="text"
            placeholder="ali@gmail.com"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value })
              setErrors({ ...errors, email: '' })
            }}
            className={`w-full px-3 py-2 border rounded outline-none
              ${errors.email ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Kam se kam 6 characters"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value })
              setErrors({ ...errors, password: '' })
            }}
            className={`w-full px-3 py-2 border rounded outline-none
              ${errors.password ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 font-medium"
        >
          Register Karo 🚀
        </button>

      </form>
    </div>
  )
}
```

---

## Poora Flow Ek Baar

```
Step 1 → UI banao — sirf dikhna chahiye
Step 2 → State connect karo — data capture karo
Step 3 → Submit function — console mein dekho
Step 4 → Zod schema banao — rules define karo
Step 5 → Validation connect karo — console mein errors dekho
Step 6 → Errors state mein rakho
Step 7 → Errors UI mein dikhao — red borders
Step 8 → Success screen add karo
```

Yahi coder ka tarika hai — ek ek cheez. Kaam karta dikh raha hai — aage badho. 😊

---

## Aaj Ka Summary

✅ Object state — teen fields ek jagah  
✅ `...spread` — object update, baaki same  
✅ `result.error.issues` — Zod ka error list, deprecated nahi  
✅ `forEach` — har error ke liye kaam karo  
✅ `issue.path[0]` — kaunsi field, `issue.message` — kya error  
✅ Coder mindset — pehle UI, phir state, phir logic, phir validation  

---

## Poora Forms Journey 🏆

```
Level 1  → Simple input, onChange, state
Level 2  → onSubmit, preventDefault, basic validation
Level 3  → Dropdown select, calculation
Level 4  → Multiple fields, Object.keys, regex
Level 5a → Zod kya hai, schema, safeParse
Level 5b → Zod + ek field, step by step
Level 5c → Zod + teen fields, object state, forEach
```

**Tu ab forms ka master hai!** 🎉
