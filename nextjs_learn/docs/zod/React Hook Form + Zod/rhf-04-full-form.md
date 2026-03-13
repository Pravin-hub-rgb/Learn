# React Hook Form — Doc 4 — Full Registration Form 🚀

## Aaj Kya Banayenge?

Teen fields — naam, email, password.

RHF + Zod + Tailwind — sab saath. Step by step.

---

## Step 1 — Sirf UI Banao

Coder ki soch:
> "Pehle teen fields ka UI bana leta hoon. Koi logic nahi abhi."

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

Browser mein dekho — UI theek lag raha hai. ✅

---

## Step 2 — Zod Schema Banao

Coder ki soch:
> "UI ready. Ab validation rules define karta hoon — schema pehle, baaki baad mein."

```tsx
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

type FormData = z.infer<typeof schema>
```

Schema ready — abhi use nahi kiya. ✅

---

## Step 3 — RHF Connect Karo

Coder ki soch:
> "Schema ready. Ab useForm lagata hoon — zodResolver se schema connect karunga."

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// component ke andar
const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm<FormData>({
  resolver: zodResolver(schema)
})
```

---

## Step 4 — Fields Ko Register Karo

Coder ki soch:
> "useForm ready. Ab har input ko register karta hoon."

```tsx
<input
  type="text"
  placeholder="Apna naam"
  {...register('naam')}   // ← add
  className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
/>
```

Same email aur password ke liye:

```tsx
{...register('email')}
{...register('password')}
```

---

## Step 5 — Submit Function Banao

Coder ki soch:
> "Fields registered. Ab submit pe data console mein dekh loon."

```tsx
function onSubmit(data: FormData) {
  console.log('Valid data:', data)
}
```

```tsx
<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
```

Khaali submit karo — console mein kuch nahi aayega. RHF ne rok liya. ✅
Sab bhar ke submit karo — data console mein. ✅

---

## Step 6 — Errors Dikhao

Coder ki soch:
> "Validation kaam kar raha hai. Ab errors user ko dikhata hoon — red border aur message."

Naam field update karo:

```tsx
<div>
  <label className="block mb-1 text-sm font-medium">Naam</label>
  <input
    type="text"
    placeholder="Apna naam"
    {...register('naam')}
    className={`w-full px-3 py-2 border rounded outline-none
      ${errors.naam ? 'border-red-500' : 'border-gray-300'}
    `}
  />
  {errors.naam && (
    <p className="text-red-500 text-sm mt-1">{errors.naam.message}</p>
  )}
</div>
```

Same email aur password ke liye bhi karo:

```tsx
{errors.email && (
  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
)}

{errors.password && (
  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
)}
```

Khaali submit karo — teeno fields pe error aa jaayega. ✅

---

## Step 7 — Success Screen Add Karo

Coder ki soch:
> "Sab kaam kar raha hai. Ab success screen add karta hoon."

```tsx
const [submitted, setSubmitted] = useState<boolean>(false)
```

```tsx
function onSubmit(data: FormData) {
  console.log('Valid data:', data)
  setSubmitted(true)
}
```

```tsx
if (submitted) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold text-green-600">✅ Registration Ho Gaya!</h2>
      <p className="mt-2 text-gray-600">
        Welcome, <strong>{getValues('naam')}</strong>!
      </p>
      <p className="text-sm text-gray-400">{getValues('email')}</p>
    </div>
  )
}
```

`getValues` bhi `useForm` se nikalte hain:

```tsx
const {
  register,
  handleSubmit,
  getValues,           // ← add
  formState: { errors }
} = useForm<FormData>({
  resolver: zodResolver(schema)
})
```

---

## Poori Final File

```tsx
// app/components/RegistrationForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

type FormData = z.infer<typeof schema>

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  function onSubmit(data: FormData) {
    console.log('Valid data:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-green-600">✅ Registration Ho Gaya!</h2>
        <p className="mt-2 text-gray-600">
          Welcome, <strong>{getValues('naam')}</strong>!
        </p>
        <p className="text-sm text-gray-400">{getValues('email')}</p>
        <button
          onClick={() => setSubmitted(false)}
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

        {/* Naam */}
        <div>
          <label className="block mb-1 text-sm font-medium">Naam</label>
          <input
            type="text"
            placeholder="Apna naam"
            {...register('naam')}
            className={`w-full px-3 py-2 border rounded outline-none
              ${errors.naam ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.naam && (
            <p className="text-red-500 text-sm mt-1">{errors.naam.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="text"
            placeholder="ali@gmail.com"
            {...register('email')}
            className={`w-full px-3 py-2 border rounded outline-none
              ${errors.email ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Kam se kam 6 characters"
            {...register('password')}
            className={`w-full px-3 py-2 border rounded outline-none
              ${errors.password ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
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

## Purana vs Naya — Final Comparison

```tsx
// ❌ Purana tarika — bahut kuch likhna pada
const [form, setForm] = useState({ naam: '', email: '', password: '' })
const [errors, setErrors] = useState({ naam: '', email: '', password: '' })

onChange={(e) => {
  setForm({ ...form, naam: e.target.value })
  setErrors({ ...errors, naam: '' })
}}

result.error.issues.forEach((issue) => { ... })

// ✅ Naya tarika — RHF + Zod
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})

{...register('naam')}  // bas itna!
```

---

## Poora Flow

```
useForm + zodResolver  → connected
      ↓
register('naam')       → field RHF se judi
      ↓
Submit dabaya
      ↓
handleSubmit → zodResolver → Zod schema validate kare
      ↓
Fail?  → errors state mein → red border + message
Pass?  → onSubmit(data) call → success screen
```

---

## Aaj Ka Summary

✅ Schema pehle — phir useForm — phir register — yahi order  
✅ `useForm<FormData>` — type do, TypeScript khush  
✅ `resolver: zodResolver(schema)` — ek line, sab connected  
✅ `{...register('field')}` — state, onChange, validation — sab ek line  
✅ `errors.field.message` — seedha message, `as string` nahi chahiye  
✅ `getValues('field')` — form ki current value nikalo  

---

## Poora RHF Journey 🏆

```
Doc 1 → RHF kya hai, kyun chahiye
Doc 2 → RHF se simple form — built-in validation
Doc 3 → RHF + Zod — dono saath kyun aur kaise
Doc 4 → Full registration form — step by step
```

**Tu ab RHF + Zod ka master hai!** 🎉
