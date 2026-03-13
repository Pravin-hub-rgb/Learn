# React Hook Form — Doc 3 — RHF + Zod 🛡️

## Pehle Problem Dekho

Doc 2 mein RHF ki built-in validation use ki:

```tsx
{...register('naam', {
  required: 'Naam zaroori hai!',
  minLength: {
    value: 2,
    message: 'Kam se kam 2 characters!'
  }
})}
```

Kaam karta hai — par soch agar complex rules chahiye:

- Email valid format mein ho
- Password mein ek number zaroori ho
- Do fields match karein — jaise password confirm

Built-in validation se yeh sab **mushkil** ho jaata hai — bahut code likhna padta hai.

**Zod pehle se jaanta hai** — woh yeh sab ek line mein karta hai.

**Toh dono saath use karo — RHF + Zod.**

```
RHF  → form state, onChange, submit handle karo
Zod  → validation rules define karo
```

---

## `zodResolver` Kya Hai?

RHF aur Zod ko connect karne ke liye ek **resolver** chahiye — `zodResolver`.

Yeh ek middleman hai:

```
RHF ←→ zodResolver ←→ Zod Schema
```

RHF submit pe `zodResolver` ko deta hai — woh Zod schema se validate karta hai — errors wapas deta hai RHF ko.

---

## Install Karo

```bash
npm install @hookform/resolvers
```

Zod pehle se installed hai — yeh sirf resolver ka package hai.

---

## Import Karo

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
```

---

## Step 1 — Schema Banao

Pehle Zod schema — tune yeh pehle seekha tha:

```tsx
const schema = z.object({
  naam: z.string()
    .min(1, 'Naam zaroori hai!')
    .min(2, 'Naam kam se kam 2 characters ka hona chahiye!')
})

type FormData = z.infer<typeof schema>
```

---

## Step 2 — `useForm` Mein Schema Do

```tsx
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema)
})
```

**`useForm<FormData>` kya hai?**

Generic — TypeScript ko batao "is form mein `FormData` type ka data hoga." Ab `errors.naam`, `errors.email` — sab TypeScript ko pata hoga. Auto-complete milegi! 🔥

**`resolver: zodResolver(schema)` kya hai?**

```
resolver          ← RHF ko batao — validation kaun karega
zodResolver       ← yeh middleman function hai
           (schema)  ← use yeh Zod schema do
```

Bas. Ab RHF khud Zod se validate karaayega. Tu kuch nahi karta. ✅

---

## Step 3 — Baaki Sab Same

```tsx
function onSubmit(data: FormData) {
  console.log('Valid data:', data)
}
```

```tsx
<input
  {...register('naam')}  // ← sirf naam — rules Zod mein hain
  className="..."
/>
```

Register mein ab rules nahi daalte — woh Zod schema mein hain already.

---

## Poori File — RHF + Zod

```tsx
// app/components/NaamFormZod.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Zod schema — validation rules
const schema = z.object({
  naam: z.string()
    .min(1, 'Naam zaroori hai!')
    .min(2, 'Naam kam se kam 2 characters ka hona chahiye!')
})

// Schema se type bana lo
type FormData = z.infer<typeof schema>

export default function NaamFormZod() {
  const [submitted, setSubmitted] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)   // ← Zod connect karo
  })

  function onSubmit(data: FormData) {
    console.log('Valid data:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-green-600">✅ Ho Gaya!</h2>
        <p className="mt-2">Welcome, <strong>{getValues('naam')}</strong>!</p>
      </div>
    )
  }

  return (
    <div className="p-10 max-w-sm">
      <h2 className="text-xl font-bold mb-6">Apna Naam Daalo (Zod Version)</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Naam</label>
          <input
            type="text"
            placeholder="Naam likho..."
            {...register('naam')}
            className={`w-full px-3 py-2 border rounded outline-none
              ${errors.naam ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.naam && (
            <p className="text-red-500 text-sm mt-1">
              {errors.naam.message}
            </p>
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

**Notice kar — `as string` ki zarurat nahi ab!**

Kyunki `useForm<FormData>` mein type diya — TypeScript ko pata hai `errors.naam.message` string hi hoga. ✅

---

## RHF Only vs RHF + Zod — Fark

```tsx
// RHF Only — rules register mein
{...register('email', {
  required: 'Email zaroori hai!',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // ← regex likhna pada
    message: 'Valid email chahiye!'
  }
})}

// RHF + Zod — rules schema mein, clean
email: z.email('Valid email chahiye!')
```

Jitne complex rules — utna zyada Zod ka fayda. 😊

---

## Aaj Ka Summary

✅ RHF + Zod — RHF form handle kare, Zod validate kare  
✅ `zodResolver` — dono ko connect karta hai  
✅ `useForm<FormData>` — TypeScript type do, auto-complete milegi  
✅ `resolver: zodResolver(schema)` — ek line, sab connected  
✅ `register` mein ab rules nahi — woh Zod mein hain  
✅ `errors.naam.message` — `as string` ki zarurat nahi ab  

---

## Agla Step

**Doc 4** — Teen fields wala poora Registration Form — RHF + Zod + Tailwind — step by step! 🚀
