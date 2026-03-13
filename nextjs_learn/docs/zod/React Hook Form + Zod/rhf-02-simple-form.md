# React Hook Form — Doc 2 — Simple Form 🎯

## Aaj Kya Banayenge?

Sirf ek input field — naam. RHF ki built-in validation ke saath.

Same coder mindset — pehle UI, phir RHF connect, phir validation, phir errors.

---

## Step 1 — Sirf UI Banao

Coder ki soch:
> "Pehle dekh loon — form kaisa dikhega. Logic baad mein."

```tsx
// app/components/NaamForm.tsx
'use client'

export default function NaamForm() {
  return (
    <div className="p-10 max-w-sm">
      <h2 className="text-xl font-bold mb-6">Apna Naam Daalo</h2>

      <form className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Naam</label>
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

Browser mein dekho — UI theek lag raha hai. ✅

---

## Step 2 — Type Banao

Coder ki soch:
> "RHF lagane se pehle — form mein kaunse fields honge yeh TypeScript ko batana padega."

```tsx
type FormData = {
  naam: string
}
```

RHF community mein `type` zyada common hai — isliye yahan yahi use karenge.

**Kyun banana zaroori hai?**

Agar `type` nahi diya — `useForm()` ko pata nahi form mein kya hoga. Phir jab `onSubmit` likhte ho — TypeScript error aata hai "yeh type match nahi karta."

`useForm<FormData>()` likhne se RHF ko pata chalta hai — "is form mein sirf `naam` field hogi."

---

## Step 3 — RHF Connect Karo

Coder ki soch:
> "Type ready. Ab `useForm` lagata hoon."

```tsx
'use client'

import { useForm } from 'react-hook-form'  // ← add

type FormData = {        // ← component ke bahar
  naam: string
}

export default function NaamForm() {
  // ← add
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  return (
    // ... same as before
  )
}
```

**Ruk — `formState: { errors }` seedha use karne se pehle samjho.**

---

### `formState` Kya Hai?

`useForm` ek bada object return karta hai — `formState` us object ka ek hissa hai.

`formState` ke andar bahut saari cheezein hain:

```
formState = {
  errors: { ... },        ← validation errors
  isSubmitting: false,    ← submit ho raha hai abhi?
  isValid: true,          ← sab fields valid hain?
  isDirty: false,         ← kuch type kiya user ne?
  ... aur bhi
}
```

Hume abhi sirf `errors` chahiye — toh directly nikaal lete hain:

```tsx
formState: { errors }
// same as:
const errors = formState.errors
```

Yeh **destructuring** hai — object ke andar se sirf jo chahiye woh nikaal lo.

---

### `errors` Object Mein Kya Hota Hai?

`errors` ek object hai — har field ki error usme hoti hai.

Abhi koi error nahi — toh:

```
errors = {}   // khaali
```

Jab naam khaali submit karein — RHF yeh banata hai:

```
errors = {
  naam: {
    type: 'required',            ← kaunsa rule fail hua
    message: 'Naam zaroori hai!' ← humne jo message diya tha
  }
}
```

Toh:

```tsx
errors.naam          // → { type: 'required', message: 'Naam zaroori hai!' }
errors.naam.message  // → 'Naam zaroori hai!'
errors.naam.type     // → 'required'
```

Agar naam ki koi error nahi — `errors.naam` exist hi nahi karta — `undefined` hota hai.

Isliye pehle check karte hain — hai ya nahi — phir message dikhate hain:

```tsx
{errors.naam && <p>{errors.naam.message}</p>}
// agar errors.naam exist karta hai — tabhi message dikhao
```

---

## Step 4 — Submit Function Banao

Coder ki soch:
> "Ab submit pe data console mein dekh loon — sahi aa raha hai?"

```tsx
function onSubmit(data: FormData) {
  console.log('Data:', data)
}
```

```tsx
<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
```

**`handleSubmit(onSubmit)` kya hai?**

```
handleSubmit       ← RHF ka function — do kaam karta hai:
                      1. e.preventDefault() — page reload rokta hai
                      2. Validation check karta hai
            (onSubmit)  ← tera function — sirf tab call karega jab sab valid ho
```

**Data kahan se aata hai `onSubmit` mein?**

Tu `data` pass nahi karta — `handleSubmit` khud collect karta hai saari fields ki values aur `onSubmit(data)` ko deta hai. Yahi RHF ka kaam hai — tu sirf `onSubmit` define karta hai.

Submit karo — console mein `{ naam: 'jo likha' }` dikh jaayega. ✅

---

## Step 5 — Field Ko Register Karo

Coder ki soch:
> "Submit kaam kar raha hai. Par naam field RHF se connected nahi — `register` lagata hoon."

```tsx
<input
  type="text"
  placeholder="Naam likho..."
  {...register('naam')}   // ← add
  className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
/>
```

**`{...register('naam')}` kya hai?**

`register('naam')` ek object return karta hai:

```
{
  name: 'naam',
  onChange: (e) => { /* RHF khud track karta hai */ },
  onBlur: (e) => { /* RHF khud handle karta hai */ },
  ref: /* RHF ka internal reference */
}
```

`{...}` spread — us object ki saari properties seedha `<input>` pe laga deta hai.

Matlab ek line mein `name`, `onChange`, sab kuch laga diya — tu kuch nahi likhta. ✅

---

## Step 6 — Validation Rules Add Karo

Coder ki soch:
> "Field connected hai. Ab validation rules dalta hoon — `register` ke andar hi daal sakte hain."

```tsx
{...register('naam', {
  required: 'Naam zaroori hai!',
  minLength: {
    value: 2,
    message: 'Naam kam se kam 2 characters ka hona chahiye!'
  }
})}
```

**Rules kaise kaam karte hain:**

```tsx
register('field-naam', {
  required: 'Error message',   // ← khaali nahi chhod sakte
  minLength: {
    value: 2,                  // ← minimum kitne characters
    message: 'Error message'   // ← yeh dikhao
  },
  maxLength: {
    value: 50,
    message: 'Error message'
  }
})
```

Khaali submit karo — console mein kuch nahi aayega. RHF ne rok liya. ✅

---

## Step 7 — Error UI Mein Dikhao

Coder ki soch:
> "Validation kaam kar raha hai. Ab `errors` object use karke user ko message dikhata hoon."

Yaad karo — `errors` mein kya hota hai jab validation fail ho:

```
errors.naam = {
  type: 'required',
  message: 'Naam zaroori hai!'
}
```

Ab input ko update karo — red border aur message:

```tsx
<div>
  <label className="block mb-1 text-sm font-medium">Naam</label>
  <input
    type="text"
    placeholder="Naam likho..."
    {...register('naam', {
      required: 'Naam zaroori hai!',
      minLength: {
        value: 2,
        message: 'Naam kam se kam 2 characters ka hona chahiye!'
      }
    })}
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
```

**`errors.naam.message` pe TypeScript warning kyun aata hai?**

RHF mein `message` ka type `string | undefined` hota hai — "ho bhi sakta hai, na bhi."

Par humne `register` mein message diya hai — toh hoga zaroor. TypeScript ko convince karne ke liye:

```tsx
{errors.naam.message as string}
```

**`as string` kya hai?**

TypeScript ko bolta hai — "trust kar mujhe, yeh `string` hi hai." Isko **type assertion** kehte hain.

```
errors.naam.message          → TypeScript: "string | undefined ho sakta hai"
errors.naam.message as string → TypeScript: "theek hai, string maan leta hoon"
```

---

## Step 8 — Success State Add Karo

```tsx
const [submitted, setSubmitted] = useState<boolean>(false)
```

```tsx
function onSubmit(data: FormData) {
  console.log('Data:', data)
  setSubmitted(true)
}
```

```tsx
if (submitted) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold text-green-600">✅ Ho Gaya!</h2>
      <p className="mt-2">Welcome, <strong>{getValues('naam')}</strong>!</p>
    </div>
  )
}
```

`getValues` bhi `useForm` se nikalte hain:

```tsx
const {
  register,
  handleSubmit,
  getValues,             // ← add
  formState: { errors }
} = useForm<FormData>()
```

**`getValues('naam')` kya hai?**

RHF ke paas form ki saari current values hoti hain. `getValues('naam')` se woh value nikal sakte ho — bina alag state banaye.

---

## Poori Final File

```tsx
// app/components/NaamForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  naam: string
}

export default function NaamForm() {
  const [submitted, setSubmitted] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  function onSubmit(data: FormData) {
    console.log('Data:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-green-600">✅ Ho Gaya!</h2>
        <p className="mt-2">Welcome, <strong>{getValues('naam')}</strong>!</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-4 py-2 bg-gray-100 rounded cursor-pointer"
        >
          Dobara Karo
        </button>
      </div>
    )
  }

  return (
    <div className="p-10 max-w-sm">
      <h2 className="text-xl font-bold mb-6">Apna Naam Daalo</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Naam</label>
          <input
            type="text"
            placeholder="Naam likho..."
            {...register('naam', {
              required: 'Naam zaroori hai!',
              minLength: {
                value: 2,
                message: 'Naam kam se kam 2 characters ka hona chahiye!'
              }
            })}
            className={`w-full px-3 py-2 border rounded outline-none
              ${errors.naam ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.naam && (
            <p className="text-red-500 text-sm mt-1">
              {errors.naam.message as string}
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

---

## Aaj Ka Summary

✅ `type FormData` — form ka shape define karo, `useForm<FormData>()` ko batao  
✅ `formState` — RHF ka status object — `errors` usme se nikaalte hain  
✅ `errors` object — har field ki error hoti hai, `{ type, message }` shape mein  
✅ `errors.naam` — undefined hoga agar koi error nahi  
✅ `errors.naam.message` — woh message jo tune `register` mein diya  
✅ `as string` — TypeScript ko batao "yeh string hai" — type assertion  
✅ `handleSubmit` — validate karo + `e.preventDefault()` — khud karta hai  
✅ `getValues('field')` — RHF se current value nikalo  

---

## Agla Step

**Doc 3** — RHF + Zod — dono saath kyun aur kaise! 🛡️
