# Forms — Level 4 — User Registration Form 👤

## Aaj Kya Banayenge?

- Naam, email, password fields
- Proper validation — email format, password length
- Submit pe data console mein log karo
- Success message dikhao

---

## Naya Concept — Ek Object Mein Saari State

Level 2 aur 3 mein har field ki alag state thi:

```tsx
const [num1, setNum1] = useState('')
const [num2, setNum2] = useState('')
const [operator, setOperator] = useState('+')
// teen alag states...
```

Jab fields zyada ho jaayein — yeh messy ho jaata hai.

**Better tarika — ek object mein sab:**

```tsx
const [form, setForm] = useState({
  naam: '',
  email: '',
  password: ''
})
```

Ek hi state — sab kuch usme.

---

## Par Update Kaise Karein? — Spread Operator

Problem — agar seedha karo:

```tsx
setForm({ naam: 'Ali' })
// ❌ Galat! email aur password gayab ho jaayenge!
```

**Solution — spread operator `...`:**

```tsx
setForm({ ...form, naam: 'Ali' })
//        ^^^^^^^
//        pehle wali saari values copy karo
//        phir sirf naam badlo
```

`...form` matlab — "jo bhi `form` mein hai woh sab yahan copy karo." Phir uske baad jo likha woh override ho jaata hai.

Example:

```tsx
const form = { naam: '', email: '', password: '' }

{ ...form, naam: 'Ali' }
// result: { naam: 'Ali', email: '', password: '' }
// sirf naam badla, baaki same
```

---

## Email Validation — Regex

Email valid hai ya nahi — yeh check karne ke liye **Regex** use karte hain.

**Regex kya hai?**

Regex = pattern. Ek string ko ek pattern se match karo.

Email ka basic pattern:

```
kuch@kuch.kuch
```

Regex mein:

```tsx
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

Yeh scary lagta hai — par seedha use karo, samajhne ki zarurat nahi abhi. Bas itna jaano:

```tsx
emailRegex.test('ali@gmail.com')   // → true  ✅
emailRegex.test('alibilkulgalat')  // → false ❌
emailRegex.test('ali@')            // → false ❌
```

`.test()` function — pattern se match karo, true ya false milega.

---

## Poora Registration Form

```tsx
// app/components/RegistrationForm.tsx
'use client'

import { useState } from 'react'

interface FormData {
  naam: string
  email: string
  password: string
}

interface FormErrors {
  naam?: string      // ? = optional — ho bhi sakta hai, na bhi
  email?: string
  password?: string
}

export default function RegistrationForm() {
  const [form, setForm] = useState<FormData>({
    naam: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState<boolean>(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate(): FormErrors {
    const newErrors: FormErrors = {}

    if (form.naam.trim() === '') {
      newErrors.naam = 'Naam zaroori hai!'
    }

    if (form.email.trim() === '') {
      newErrors.email = 'Email zaroori hai!'
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Email valid nahi hai!'
    }

    if (form.password.trim() === '') {
      newErrors.password = 'Password zaroori hai!'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password kam se kam 6 characters ka hona chahiye!'
    }

    return newErrors
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newErrors = validate()

    // Agar koi bhi error hai
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Sab theek — log karo
    setErrors({})
    console.log('Form Data:', form)
    setSubmitted(true)
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm({ ...form, [field]: value })
    // Error bhi hata do jab user type kare
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: 'green' }}>✅ Registration Ho Gaya!</h2>
        <p>Welcome, <strong>{form.naam}</strong>!</p>
        <p style={{ color: '#666' }}>{form.email}</p>
        <button
          onClick={() => {
            setSubmitted(false)
            setForm({ naam: '', email: '', password: '' })
          }}
          style={{ marginTop: '15px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Dobara Karo
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', maxWidth: '400px' }}>
      <h2>📝 Register Karo</h2>

      <form onSubmit={handleSubmit}>

        {/* Naam */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Naam:</label>
          <input
            type="text"
            value={form.naam}
            onChange={(e) => handleChange('naam', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.naam ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {errors.naam && (
            <p style={{ color: 'red', fontSize: '13px', margin: '4px 0 0' }}>
              {errors.naam}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Email:</label>
          <input
            type="text"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.email ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {errors.email && (
            <p style={{ color: 'red', fontSize: '13px', margin: '4px 0 0' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Password:</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.password ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {errors.password && (
            <p style={{ color: 'red', fontSize: '13px', margin: '4px 0 0' }}>
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Register Karo 🚀
        </button>

      </form>
    </div>
  )
}
```

Ab **naye concepts** tod ke:

---

### `interface FormErrors` mein `?` kyun?

```tsx
interface FormErrors {
  naam?: string
  email?: string
  password?: string
}
```

`?` matlab optional — error ho bhi sakta hai, na bhi.

Shuru mein `errors = {}` — khaali object, koi error nahi.

Validation ke baad:

```tsx
{ naam: 'Naam zaroori hai!' }
// email aur password ke errors nahi hain — toh woh undefined hain
```

---

### `validate(): FormErrors` kya hai?

```tsx
function validate(): FormErrors {
```

Function ka return type `FormErrors` hai — matlab yeh function `FormErrors` shape ka object return karega. TypeScript ko pata hai kya aayega.

---

### `Object.keys(newErrors).length > 0` kya hai?

`Object.keys()` — object ki saari keys ka array deta hai:

```tsx
Object.keys({ naam: 'error!' })        // → ['naam']
Object.keys({ naam: 'e', email: 'e' }) // → ['naam', 'email']
Object.keys({})                         // → []  (khaali)
```

`.length > 0` — agar koi bhi key hai — matlab koi error hai.

---

### `handleChange(field: keyof FormData, value: string)` kya hai?

**`keyof FormData`** — yeh TypeScript ka ek trick hai:

```tsx
interface FormData {
  naam: string
  email: string
  password: string
}

keyof FormData   // → 'naam' | 'email' | 'password'
```

Matlab — `field` mein sirf `'naam'`, `'email'`, ya `'password'` aa sakta hai — koi aur string nahi. TypeScript check karega!

**`[field]: value`** — dynamic key:

```tsx
const field = 'naam'
{ [field]: 'Ali' }
// same as: { naam: 'Ali' }
```

Square brackets mein variable rakho — us variable ki value key ban jaati hai.

---

### Error Border — Red vs Normal

```tsx
border: errors.naam ? '2px solid red' : '1px solid #ddd'
```

Ternary operator — agar `errors.naam` hai (truthy) toh red border, warna normal.

---

## Aaj Ka Summary

✅ Multiple fields — ek object mein saari state  
✅ `...spread` — object update karo bina baaki khoye  
✅ Validation alag function mein — clean code  
✅ `keyof Interface` — valid keys TypeScript se check karao  
✅ `Object.keys(...).length` — object mein kuch hai ya nahi  
✅ Regex se email validate karo — `.test()` use karo  
✅ Error wali field pe red border — UX better hota hai  

---

## Agla Step

**Level 5** — Zod! Ab manually validation likhna band — library se karo. Ek line mein poora validation! 🛡️
