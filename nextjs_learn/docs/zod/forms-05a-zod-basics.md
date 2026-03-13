# Forms — Level 5a — Zod Kya Hai? 🛡️

## Pehle Problem Dekho

Level 4 mein tune manually validation likhi thi:

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
  newErrors.password = 'Chota hai!'
}
```

Kaam karta hai — par soch agar 10 fields hon? 20 rules hon?

Lamba, boring, aur galti hone ka chance zyada.

**Iska solution hai — Zod.**

---

## Zod Kya Hai?

Zod ek **library** hai — matlab kisi aur ne code likha, tune install kiya, use kar liya.

Zod ka kaam ek hi hai — **data check karna.**

Tu batata hai "mujhe aisa data chahiye" — Zod check karta hai valid hai ya nahi, aur error messages bhi khud deta hai.

---

## Install Karo

Terminal mein project folder mein yeh likho:

```bash
npm install zod
```

Ek baar install — project mein hamesha available.

---

## Zod Ka Core Idea — Schema

Zod mein pehle ek **schema** banate hain.

Schema matlab — "mera data kaisa hona chahiye" — ek rulebook.

```tsx
import { z } from 'zod'

const schema = z.object({
  naam: z.string(),
})
```

Ab tod ke samjho:

---

**`import { z } from 'zod'`**

```
import    ← Zod library se kuch lao
{ z }     ← sirf 'z' chahiye — yeh Zod ka main object hai
from 'zod' ← library ka naam
```

`z` ek object hai jisme Zod ke saare tools hain — `z.string()`, `z.number()`, `z.object()` etc.

---

**`z.object({...})`**

```
z          ← Zod ka main object
 .object() ← "ek object ka schema banao"
         { ← andar fields define karo
```

---

**`naam: z.string()`**

```
naam      ← field ka naam
:         ← type batao
z.string() ← "yeh field string honi chahiye"
```

---

## Rules Chain Karna

Ek field pe multiple rules laga sakte ho — chain karke:

```tsx
z.string()                              // sirf string
z.string().min(2)                       // string, kam se kam 2 characters
z.string().min(2).max(50)              // 2 se 50 characters ke beech
z.string().min(2, 'Custom message!')   // apna error message bhi de sakte ho
z.number()                             // number
z.number().min(0)                      // 0 ya usse zyada
z.boolean()                            // true ya false
z.email('Valid email chahiye!')        // valid email — Zod v4 mein seedha
```

---

## `.safeParse()` — Data Check Karo

Schema banane ke baad — data check karne ke liye `.safeParse()` use karte hain:

```tsx
const schema = z.object({
  naam: z.string().min(2, 'Naam chota hai!'),
})

const result = schema.safeParse({ naam: 'Ali' })
```

**`result` mein kya aata hai?**

Do cases hain:

**Case 1 — Valid data:**
```tsx
result.success   // → true
result.data      // → { naam: 'Ali' } — valid data
```

**Case 2 — Invalid data:**
```tsx
result.success   // → false
result.error     // → error ki info
```

---

## Seedha Try Karo — Koi Form Nahi

Pehle sirf console mein dekho kaise kaam karta hai:

```tsx
// app/components/ZodTest.tsx
'use client'

import { z } from 'zod'

const schema = z.object({
  naam: z.string().min(2, 'Naam kam se kam 2 characters ka hona chahiye!'),
})

export default function ZodTest() {

  // Valid data test
  const result1 = schema.safeParse({ naam: 'Ali' })
  console.log('Valid test:', result1.success)  // true

  // Invalid data test
  const result2 = schema.safeParse({ naam: 'A' })
  console.log('Invalid test:', result2.success)  // false

  if (!result2.success) {
    console.log('Errors:', result2.error.flatten().fieldErrors)
    // { naam: ['Naam kam se kam 2 characters ka hona chahiye!'] }
  }

  return <p>Console dekho! 👀</p>
}
```

**`result.error.flatten().fieldErrors`** kya hai?

Zod ka error object andar se complex hota hai. `.flatten()` use karo — simple object mil jaata hai:

```tsx
{
  naam: ['Naam chota hai!'],   // array mein errors
  email: ['Valid email chahiye!']
}
```

Har field ke errors ek **array** mein aate hain — kyunki ek field pe multiple errors ho sakte hain.

---

## Aaj Ka Summary

✅ Zod = validation library — manually check karne ki zarurat nahi  
✅ `z.object({...})` — schema banao — rulebook  
✅ `z.string()`, `z.number()`, `z.email()` — field types  
✅ `.min()`, `.max()` — rules chain karo  
✅ `.safeParse()` — data check karo — crash nahi hota  
✅ `result.success` — true ya false  
✅ `result.error.flatten().fieldErrors` — errors simple form mein  

---

## Agla Step

**Level 5b** — Ab Zod ko ek real form ke saath use karenge — sirf ek field, Tailwind ke saath! 🎯
