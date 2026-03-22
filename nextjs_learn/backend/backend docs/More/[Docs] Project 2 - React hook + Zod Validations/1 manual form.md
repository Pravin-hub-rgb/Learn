# Doc 1.1 — Pehle Manually Karo — `useState` Se Form Banao

---

## Yeh Project Kya Hai

Ek simple form banana hai — naam aur email. Submit pe sirf `console.log` — koi backend nahi.

Seedha React Hook Form se shuru nahi karenge — **pehle manually banayenge** — taaki samjho dikkat kya hai — phir library ka fayda dikhega.

---

## Next.js Project Banao

```bash
npx create-next-app@latest form-project
```

Wahi options — TypeScript, Tailwind, App Router — haan.

`app/page.tsx` kholo — clean karo — bas itna rakho:

```tsx
export default function Home() {
  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Contact Form</h1>
    </main>
  )
}
```

---

## `ContactForm.tsx` Banao

`app/components/ContactForm.tsx` banao — pehle sirf UI — koi logic nahi:

```tsx
'use client'

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Naam</label>
        <input
          type="text"
          placeholder="Apna naam likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Apni email likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}
```

`page.tsx` mein import karo:

```tsx
import ContactForm from './components/ContactForm'

export default function Home() {
  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Contact Form</h1>
      <ContactForm />
    </main>
  )
}
```

Save karo — form dikh raha hai ✅

---

## Submit Karo — Kya Hua?

Button click karo — **page reload ho gaya.**

Kyun? Browser ka default behaviour hai — form submit hone pe page reload karta hai.

React mein hum yeh nahi chahte — hum khud handle karna chahte hain.

---

## `onSubmit` — Form Submit Intercept Karo

`onSubmit` form ka ek event hai — jab bhi form submit ho — yeh fire hota hai.

`onSubmit` mein ek function dete hain — woh function chalega jab form submit hoga. Aur us function ko browser automatically ek **event object** deta hai — `e`.

---

## `e` Kya Hota Hai?

Jab bhi browser mein koi event hota hai — click, submit, type — browser ek **event object** banata hai. Usme information hoti hai — "kaunsa element tha, kab hua, default kya hoga."

Yeh object tumhare function ko automatically milta hai — tumhe mangna nahi padta.

Aur us object mein ek method hoti hai — `preventDefault()` — "browser, apna default kaam mat kar."

Form ke case mein default kaam hai page reload — `e.preventDefault()` se rok sakte hain.

---

## `onSubmit` Lagao

```tsx
'use client'

export default function ContactForm() {

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Form submitted!')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Naam</label>
        <input
          type="text"
          placeholder="Apna naam likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Apni email likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}
```

Button click karo — page reload nahi hua — browser console mein:

```
Form submitted!
```

✅ Form submit intercept ho gaya.

---

## TypeScript Warning Aayegi — `e` Pe

`handleSubmit(e)` pe TypeScript warning aayegi — `e` ka type define nahi kiya.

Sabse clean fix — function inline likho `onSubmit` mein — TypeScript khud samajh jaata hai `e` kya hai:

```tsx
<form
  onSubmit={(e) => {
    e.preventDefault()
    console.log('Form submitted!')
  }}
  className="flex flex-col gap-4"
>
```

Jab inline likhte hain — TypeScript context se samajh jaata hai ki yeh form ka submit event hai — tumhe manually type nahi daalni.

---

## Values Kaise Milegi?

"Form submit ho raha hai — par naam aur email ki values kahan hain?"

`useState` lagao — har input ke liye ek state:

```tsx
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log({ name, email })
      }}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Naam</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Apna naam likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Apni email likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}
```

`value={name}` — input ki value state se aa rahi hai.

`onChange={(e) => setName(e.target.value)}` — jab bhi user kuch type kare — state update ho. Yahan bhi `e` inline hai — TypeScript khud jaanta hai yeh input ka change event hai — `e.target.value` se typed value milti hai.

"Pravin" likho naam mein, "pravin@gmail.com" email mein — submit karo — browser console:

```
{ name: 'Pravin', email: 'pravin@gmail.com' }
```

✅ Values mil gayi.

---

## Problem — Fields Badho Toh?

Abhi do fields hain — do `useState`. Theek hai.

Par socho — real form mein:

```
naam, email, phone, address, city, pincode, message...
```

7 fields — 7 `useState` — 7 `onChange`. Yeh kuch aisa dikhega:

```tsx
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')
const [address, setAddress] = useState('')
const [city, setCity] = useState('')
const [pincode, setPincode] = useState('')
const [message, setMessage] = useState('')
```

Har ek ke liye `value` aur `onChange` alag alag. Bahut repetitive — bahut messy.

---

## Ek `useState` Se Manage Karo — Object Wala Tarika

Saari values ek object mein rakho:

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: ''
})
```

Phir ek hi `handleChange` function — sabke liye. Par pehle input pe `name` attribute zaroori hai — taaki pata chale kaun sa field change hua:

```tsx
<input
  type="text"
  name="name"       // ← yeh add karo
  value={formData.name}
  onChange={handleChange}
/>
```

Ab `handleChange`:

```tsx
function handleChange(e) {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}
```

Yeh tod ke samjho —

`...formData` — spread operator — pehle wali saari values copy karo — `{ name: 'Pravin', email: '' }`

`[e.target.name]: e.target.value` — computed property — `e.target.name` woh input ka `name` attribute hai — jaise `"name"` ya `"email"`. Sirf woh field update hogi — baaki same rahegi.

Poora update:

```tsx
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(formData)
      }}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Naam</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Apna naam likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Apni email likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}
```

Submit karo — same result — par ab ek hi `useState` aur ek hi `handleChange` ✅

---

## Par Abhi Bhi Bahut Kaam Hai

Theek hai — ek `useState` ho gaya. Par abhi bhi:

- Validation khud likhni padegi — `if` conditions
- Error messages ke liye alag `useState`
- Submit ke baad form reset karna — manually
- Har input pe `name`, `value`, `onChange` — har baar

**React Hook Form** yeh sab simplify karta hai.

Yahi hoga **Doc 1.2 mein.**

---

## Summary

- `onSubmit` — form submit pe fire hota hai
- `e` — browser ka event object — automatically milta hai
- `e.preventDefault()` — page reload rokta hai
- Inline functions mein TypeScript khud `e` ka type samajhta hai — deprecated types nahi likhne
- `useState` se values track ki
- Object wala `useState` — ek `handleChange` — `[e.target.name]` se sahi field update
- Par abhi bhi boilerplate hai — React Hook Form aayega