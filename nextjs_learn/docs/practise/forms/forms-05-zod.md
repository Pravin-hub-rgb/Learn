# Forms — Level 5 — Zod 🛡️

## Pehle Ek Problem Dekho

Level 4 mein tune manually validation likhi:

```tsx
if (form.naam.trim() === '') {
  newErrors.naam = 'Naam zaroori hai!'
}
if (form.email.trim() === '') {
  newErrors.email = 'Email zaroori hai!'
} else if (!emailRegex.test(form.email)) {
  newErrors.email = 'Email valid nahi hai!'
}
if (form.password.length < 6) {
  newErrors.password = 'Password chota hai!'
}
// ... aur bhi rules hote toh aur zyada lines
```

Kaam karta hai — par soch agar 10 fields hों? 20 rules hों?

**Bohot lamba, boring, aur error prone ho jaata hai.**

---

## Zod Kya Hai?

Zod ek **validation library** hai.

Tu batata hai — "mujhe is tarah ka data chahiye." Zod check karta hai — valid hai ya nahi, aur errors bhi khud generate karta hai.

```tsx
// Manually
if (naam === '') errors.naam = 'Required!'
if (naam.length < 2) errors.naam = 'Chota hai!'

// Zod se
naam: z.string().min(2, 'Naam kam se kam 2 characters ka hona chahiye!')
```

Ek line — same kaam. 🔥

---

## Install Karo

Terminal mein:

```bash
npm install zod
```

Bas. Ek baar. Phir kabhi install nahi karna.

---

## Zod Ka Basic Idea — Schema

Zod mein pehle **schema** banate hain — matlab "mera data kaisa hoga."

```tsx
import { z } from 'zod'

const schema = z.object({
  naam: z.string(),
  age: z.number(),
  email: z.string().email()
})
```

**`z` kya hai?**

Zod ka main object — isme sab functions hain. `import { z } from 'zod'` se milta hai.

**`.object({...})`** — ek object ka schema banao.
	
**`z.string()`** — yeh field string hogi.

**`z.number()`** — yeh field number hogi.

**`z.string().email()`** — string hogi AND valid email hogi. Rules chain kar sakte hain!

---

## Rules Chain Karna — Simple Examples

```tsx
z.string()                        // sirf string
z.string().min(2)                 // string, kam se kam 2 characters
z.string().max(50)                // string, zyada se zyada 50 characters
z.string().min(2).max(50)         // dono saath
z.string().email()                // valid email
z.string().min(6, 'Custom error message!')  // custom error message
z.number().min(0)                 // number, 0 se zyada
z.number().int()                  // sirf integer (decimal nahi)
z.boolean()                       // boolean
```

---

## `.parse()` vs `.safeParse()`

Zod mein data validate karne ke do tarike:

**`.parse()`** — valid hai toh data de, nahi toh **exception throw karo**

```tsx
schema.parse({ naam: 'Ali' })  // error aayegi — email missing
```

**`.safeParse()`** — hamesha result do — valid hai ya nahi, dono case mein:

```tsx
const result = schema.safeParse({ naam: 'Ali' })

if (result.success) {
  console.log(result.data)    // valid data
} else {
  console.log(result.error)   // errors
}
```

**Forms mein hamesha `.safeParse()` use karo** — crash nahi hoga, errors properly milenge.

---

## Errors Nikalna — `flatten()`

Zod ka error object thoda complex hota hai. Isko simple banana ke liye `.flatten()` use karte hain:

```tsx
const result = schema.safeParse(formData)

if (!result.success) {
  const fieldErrors = result.error.flatten().fieldErrors
  // fieldErrors kuch aisa hoga:
  // {
  //   naam: ['Naam zaroori hai!'],
  //   email: ['Valid email chahiye!']
  // }
}
```

`fieldErrors` mein har field ke errors ka **array** hota hai — isliye `[0]` se pehla error lete hain:

```tsx
fieldErrors.naam?.[0]    // 'Naam zaroori hai!'
```

**`?.` kya hai?**

Optional chaining — agar `fieldErrors.naam` exist nahi karta toh crash mat karo, `undefined` return karo.

```tsx
fieldErrors.naam?.[0]
// agar naam ki koi error nahi → undefined
// agar hai → pehla error message
```

---

## Registration Form — Zod Se

```tsx
// app/components/ZodForm.tsx
'use client'

import { useState } from 'react'
import { z } from 'zod'

// Schema define karo — ek baar
const registrationSchema = z.object({
  naam: z.string()
    .min(1, 'Naam zaroori hai!')
    .min(2, 'Naam kam se kam 2 characters ka hona chahiye!'),

  email: z.string()
    .min(1, 'Email zaroori hai!')
    .email('Valid email likho — jaise ali@gmail.com'),

  password: z.string()
    .min(1, 'Password zaroori hai!')
    .min(6, 'Password kam se kam 6 characters ka hona chahiye!')
})

// TypeScript type automatically schema se bana lo!
type RegistrationData = z.infer<typeof registrationSchema>
```

Ruk — **`z.infer<typeof registrationSchema>`** kya hai?

```
z.infer          ← Zod ka utility — schema se TypeScript type nikalo
       <          ← generic (tune padha tha)
        typeof registrationSchema  ← us schema ka type
                 >
```

Matlab — alag se interface likhne ki zarurat nahi! Zod khud bana deta hai:

```tsx
// Yeh banana nahi padega — Zod ne khud bana diya
interface RegistrationData {
  naam: string
  email: string
  password: string
}
```

**Ek jagah schema likho — type bhi wahan se milega!** 🔥

---

```tsx
// Errors ka type
type FormErrors = {
  naam?: string
  email?: string
  password?: string
}

export default function ZodForm() {
  const [form, setForm] = useState<RegistrationData>({
    naam: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState<boolean>(false)

  function handleChange(field: keyof RegistrationData, value: string) {
    setForm({ ...form, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Zod se validate karo
    const result = registrationSchema.safeParse(form)

    if (!result.success) {
      // Errors nikalo
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        naam: fieldErrors.naam?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      })
      return
    }

    // Sab theek — log karo
    setErrors({})
    console.log('Valid Data:', result.data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: 'green' }}>✅ Registration Ho Gaya!</h2>
        <p>Welcome, <strong>{form.naam}</strong>!</p>
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
      <h2>📝 Register Karo (Zod Version)</h2>

      <form onSubmit={handleSubmit}>

        {/* Naam */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Naam:</label>
          <input
            type="text"
            value={form.naam}
            onChange={(e) => handleChange('naam', e.target.value)}
            style={{
              width: '100%', padding: '8px',
              border: errors.naam ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px', boxSizing: 'border-box'
            }}
          />
          {errors.naam && <p style={{ color: 'red', fontSize: '13px', margin: '4px 0 0' }}>{errors.naam}</p>}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Email:</label>
          <input
            type="text"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            style={{
              width: '100%', padding: '8px',
              border: errors.email ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px', boxSizing: 'border-box'
            }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '13px', margin: '4px 0 0' }}>{errors.email}</p>}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Password:</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            style={{
              width: '100%', padding: '8px',
              border: errors.password ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px', boxSizing: 'border-box'
            }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '13px', margin: '4px 0 0' }}>{errors.password}</p>}
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}
        >
          Register Karo 🚀
        </button>

      </form>
    </div>
  )
}
```

---

## Manual vs Zod — Side by Side

```tsx
// ❌ Manual — lamba aur boring
if (form.email === '') {
  errors.email = 'Email zaroori hai!'
} else if (!emailRegex.test(form.email)) {
  errors.email = 'Valid email chahiye!'
}

// ✅ Zod — clean aur powerful
email: z.string()
  .min(1, 'Email zaroori hai!')
  .email('Valid email chahiye!')
```

---

## Aaj Ka Summary

✅ Zod = validation library — manually likhne ki zarurat nahi  
✅ `z.object({...})` — schema banao  
✅ `.string()`, `.number()`, `.email()`, `.min()`, `.max()` — rules chain karo  
✅ `.safeParse()` — safe validation, crash nahi hota  
✅ `result.error.flatten().fieldErrors` — errors nikalo  
✅ `z.infer<typeof schema>` — schema se TypeScript type khud bana lo  
✅ `?.` optional chaining — crash se bachao  

---

## Poora Forms Journey 🏆

```
Level 1 → Simple input, onChange, state
Level 2 → onSubmit, e.preventDefault(), basic validation
Level 3 → Dropdown select, calculation logic
Level 4 → Multiple fields object mein, keyof, Object.keys
Level 5 → Zod — library se clean validation
```

**Tu ab forms ka master hai!** 🎉
