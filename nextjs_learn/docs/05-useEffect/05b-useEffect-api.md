# 05b — useEffect + API Fetch 🌐

## Aaj Kya Banayenge?

Ek component jo API se user ka data laaye aur screen pe dikhaye.

Same approach — **ek coder ki tarah:**
> "Pehle UI. Phir data. Phir loading. Phir error."

---

## Pehle Concept — API Fetch Kya Hai?

Real apps mein data **server** pe hota hai — humara browser use maangta hai.

Yeh maangne ka process hai **fetch.**

```tsx
fetch('https://koi-api.com/data')
```

Par yeh instant nahi hota — thoda time lagta hai. Tab tak kya dikhayein user ko?

Isliye **teen states** rakhte hain:

```
loading = true    ← Data aa raha hai, ruko
data = null       ← Abhi kuch nahi
error = null      ← Koi problem nahi abhi
```

Data aa gaya:
```
loading = false   ← Aa gaya
data = {...}      ← Yeh raha
error = null      ← Sab theek
```

Kuch gadbad:
```
loading = false   ← Ruk gaya
data = null       ← Nahi aaya
error = 'Error!'  ← Yeh problem aayi
```

---

## Step 1 — Sirf UI Banao

Coder ki soch:
> "Pehle dekh loon — UI kaisa dikhega. Data baad mein laaunga."

```tsx
// app/components/UserProfile.tsx
'use client'

export default function UserProfile() {
  return (
    <div className="p-6 border border-gray-200 rounded-lg max-w-sm">
      <h2 className="text-xl font-bold">👤 Naam yahan</h2>
      <p className="text-gray-600 mt-1">📧 Email yahan</p>
      <p className="text-gray-600 mt-1">📞 Phone yahan</p>
    </div>
  )
}
```

Browser mein dekho — structure theek lag raha hai. ✅

---

## Step 2 — States Add Karo

Coder ki soch:
> "UI ready. Ab teen states chahiye — loading, data, error."

Par rukoo — data ki state ke liye **pehle type define karna hoga.**

TypeScript mein API se jo aaye — uska shape pehle se batana padta hai. Warna TypeScript confuse ho jaata hai.

Hum yeh API use karenge — free test API hai:
```
https://jsonplaceholder.typicode.com/users/1
```

Yeh kuch aisa data deti hai:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-0988",
  "website": "hildegard.org"
}
```

Toh pehle interface banao:

```tsx
interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}
```

Ab states add karo:

```tsx
'use client'

import { useState } from 'react'   // ← add

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)      // ← data state
  const [loading, setLoading] = useState<boolean>(true)    // ← loading state
  const [error, setError] = useState<string | null>(null)  // ← error state

  return (
    <div className="p-6 border border-gray-200 rounded-lg max-w-sm">
      <h2 className="text-xl font-bold">👤 Naam yahan</h2>
      <p className="text-gray-600 mt-1">📧 Email yahan</p>
      <p className="text-gray-600 mt-1">📞 Phone yahan</p>
    </div>
  )
}
```

**`User | null` kyun?**

Shuru mein koi user nahi — null. API se aane ke baad User aayega. Dono possibilities batani padti hain TypeScript ko.

**`string | null` error ke liye kyun?**

Shuru mein koi error nahi — null. Error aaye toh string message hoga.

---

## Step 3 — Fetch Karo, Console Mein Dekho

Coder ki soch:
> "States ready hain. Ab fetch karta hoon — pehle sirf console mein dekhunga aaya kya."

```tsx
'use client'

import { useState, useEffect } from 'react'   // ← useEffect add

// ... interface same

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // ← yeh add kiya
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((data) => {
        console.log('Data aaya:', data)   // pehle sirf dekho
      })
  }, [])   // ← sirf ek baar fetch karo

  return (
    <div className="p-6 border border-gray-200 rounded-lg max-w-sm">
      <h2 className="text-xl font-bold">👤 Naam yahan</h2>
      <p className="text-gray-600 mt-1">📧 Email yahan</p>
      <p className="text-gray-600 mt-1">📞 Phone yahan</p>
    </div>
  )
}
```

**`.then()` kya hai?**

`fetch` time leta hai — instant nahi hota. `.then()` matlab:

```
fetch(url)              ← request bhejo
  .then((res) => ...)   ← response aaya — ab yeh karo
  .then((data) => ...)  ← data ready — ab yeh karo
```

Pehla `.then` — raw response aata hai — `.json()` se data nikaalte hain.
Doosra `.then` — actual data aata hai — yahan kaam karo.

Console mein dekho — user ka data dikh jaayega. ✅

---

## Step 4 — State Mein Rakho

Coder ki soch:
> "Data aa raha hai console mein. Ab state mein set karta hoon — UI mein dikhega."

```tsx
useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((res) => res.json())
    .then((data: User) => {     // ← type batao
      setUser(data)             // ← state mein rakho
      setLoading(false)         // ← loading khatam
    })
}, [])
```

**`data: User` kyun likha?**

TypeScript ko bataya — "yeh data `User` interface jaisa hoga." Ab `data.name`, `data.email` — sab auto-complete hoga! 🔥

---

## Step 5 — UI Mein Dikhao

Coder ki soch:
> "Data state mein aa gaya. Ab UI update karta hoon — real data dikhaunga."

```tsx
return (
  <div className="p-6 border border-gray-200 rounded-lg max-w-sm">
    <h2 className="text-xl font-bold">👤 {user?.name}</h2>
    <p className="text-gray-600 mt-1">📧 {user?.email}</p>
    <p className="text-gray-600 mt-1">📞 {user?.phone}</p>
  </div>
)
```

**`user?.name` kya hai — `?.` kyun?**

`user` null bhi ho sakta hai — shuru mein null hi hota hai.

Agar `user` null hai aur tune `user.name` likha — crash! ❌

`user?.name` matlab:
```
user null hai    → undefined return karo, crash mat karo
user null nahi   → .name nikaal lo
```

Safe tarika. ✅

---

## Step 6 — Loading Aur Error Handle Karo

Coder ki soch:
> "Data dikh raha hai. Par jab load ho raha hota hai — khaali dikhta hai. Loading state use karta hoon. Error bhi handle karta hoon."

**Pehle error handle karo fetch mein:**

```tsx
useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((res) => res.json())
    .then((data: User) => {
      setUser(data)
      setLoading(false)
    })
    .catch(() => {              // ← add: agar kuch gadbad ho
      setError('User nahi mila!')
      setLoading(false)
    })
}, [])
```

**`.catch()` kya hai?**

```
fetch(url)
  .then(...)   ← sab theek gaya
  .catch(...)  ← kuch gadbad — yahan aao
```

Network band ho, server down ho — `.catch()` mein aayega.

**Phir UI mein teen conditions handle karo:**

```tsx
if (loading) return (
  <p className="p-6 text-gray-500">⏳ Load ho raha hai...</p>
)

if (error) return (
  <p className="p-6 text-red-500">❌ {error}</p>
)

if (!user) return null

return (
  <div className="p-6 border border-gray-200 rounded-lg max-w-sm">
    <h2 className="text-xl font-bold">👤 {user.name}</h2>
    <p className="text-gray-600 mt-1">📧 {user.email}</p>
    <p className="text-gray-600 mt-1">📞 {user.phone}</p>
    <p className="text-gray-600 mt-1">🌐 {user.website}</p>
  </div>
)
```

**`if (!user) return null` kyun?**

Teen conditions ke baad — `user` toh hoga hi. Par TypeScript ko satisfy karna padta hai — "haan bhai, null case handle kar liya."

---

## Poori Final File

```tsx
// app/components/UserProfile.tsx
'use client'

import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((data: User) => {
        setUser(data)
        setLoading(false)
      })
      .catch(() => {
        setError('User nahi mila!')
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <p className="p-6 text-gray-500">⏳ Load ho raha hai...</p>
  )

  if (error) return (
    <p className="p-6 text-red-500">❌ {error}</p>
  )

  if (!user) return null

  return (
    <div className="p-6 border border-gray-200 rounded-lg max-w-sm">
      <h2 className="text-xl font-bold">👤 {user.name}</h2>
      <p className="text-gray-600 mt-1">📧 {user.email}</p>
      <p className="text-gray-600 mt-1">📞 {user.phone}</p>
      <p className="text-gray-600 mt-1">🌐 {user.website}</p>
    </div>
  )
}
```

---

## Poora Flow

```
Component aaya
      ↓
Render hua — loading screen dikh raha hai
      ↓
useEffect chala — fetch shuru
      ↓
Data aaya → setUser(data) → setLoading(false)
      ↓
Re-render hua — ab user ka data dikh raha hai
```

---

## Aaj Ka Summary

✅ API se data laane ke liye `useEffect` + `fetch`  
✅ Teen states zaroori — `loading`, `data`, `error`  
✅ Interface pehle banao — TypeScript ko type pata hoga  
✅ `.then()` — async kaam ka result handle karo  
✅ `.catch()` — error handle karo  
✅ `?.` optional chaining — null pe crash nahi  
✅ Loading aur error — hamesha handle karo  

---

## Agla Step

**05c** — Cleanup function aur common mistakes — timer example ke saath! ⏱️
