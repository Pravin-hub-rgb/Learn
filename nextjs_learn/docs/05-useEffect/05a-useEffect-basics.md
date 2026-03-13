# 05a — useEffect Kya Hai? ⚡

## Pehle Problem Dekho

Tu jaanta hai — component render hota hai, UI dikh jaata hai.

Par kabhi kabhi render ke **baad** bhi kuch kaam karna hota hai:

- Browser tab ka title change karna
- API se data laana
- Timer start karna

Yeh sab rendering se **alag** kaam hain — inhe **side effects** kehte hain.

Problem — yeh kaam **kahan** likhein?

```tsx
export default function MyComponent() {
  // Yahan? — nahi, yeh toh har render pe chalega
  document.title = 'Naya Title'  // ❌

  return <div>Hello</div>
}
```

Agar seedha component mein likha — har render pe chalega. Kabhi kabhi yeh nahi chahiye.

**Solution — `useEffect`.**

---

## useEffect Ka Simple Idea

> "Pehle render ho jaao — UI dikh jaaye — **phir** yeh kaam karo."

```tsx
useEffect(() => {
  // render ke baad yeh chalega
}, [])
```

Bas itna. Render hoga — UI dikhega — phir andar wala code chalega.

---

## Step 1 — Sirf Console.log Se Samjho

Coder ki soch:
> "Pehle dekh toh loon — kab chal raha hai yeh."

```tsx
// app/components/TestEffect.tsx
'use client'

import { useEffect } from 'react'

export default function TestEffect() {
  useEffect(() => {
    console.log('useEffect chala!')
  }, [])

  console.log('Component render hua!')

  return <div>Hello!</div>
}
```

Console mein dekho — **order** dhyan se padho:

```
Component render hua!   ← pehle render
useEffect chala!        ← baad mein effect
```

**Yahi fark hai.** useEffect hamesha render ke baad chalta hai. ✅

---

## Step 2 — Page Title Change Karo

Coder ki soch:
> "Theek hai — samajh aa gaya kab chalta hai. Ab kuch useful kaam karta hoon."

```tsx
'use client'

import { useEffect } from 'react'

export default function TestEffect() {
  useEffect(() => {
    document.title = 'Mera Naya Title! 🎉'
  }, [])

  return <div>Browser tab dekho!</div>
}
```

Browser ka tab dekho — title change ho gaya. ✅

---

## Woh `[]` Kya Hai — Dependency Array

```tsx
useEffect(() => {
  // kaam
}, [])   // ← yeh
```

Yeh **dependency array** hai — batata hai "yeh effect **kab** chale."

Teen cases hain:

---

**Case 1 — Khaali array `[]`**

```tsx
useEffect(() => {
  console.log('Sirf ek baar!')
}, [])
```

Sirf ek baar — jab component pehli baar screen pe aata hai. Dobara nahi.

---

**Case 2 — Koi value `[count]`**

```tsx
useEffect(() => {
  console.log('Count badla:', count)
}, [count])
```

Jab bhi `count` change ho — tab chale.

---

**Case 3 — Kuch nahi (no array)**

```tsx
useEffect(() => {
  console.log('Har baar!')
})
```

Har render pe chale — **avoid karo** — usually infinite loop ka khatra. Baad mein dekhenge.

---

## Step 3 — Counter Ke Saath Title Change

Coder ki soch:
> "Ab dependency array try karta hoon — count badle toh title bhi badle."

Pehle sirf counter banao:

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold">{count}</h2>
      <button
        onClick={() => setCount(count + 1)}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
      >
        +1
      </button>
    </div>
  )
}
```

Browser mein dekho — counter kaam kar raha hai. ✅

Ab useEffect add karo — count badle toh title bhi badle:

```tsx
'use client'

import { useState, useEffect } from 'react'  // ← useEffect add

export default function Counter() {
  const [count, setCount] = useState<number>(0)

  // ← yeh add kiya
  useEffect(() => {
    document.title = `Count hai: ${count}`
  }, [count])  // ← count badle toh chale

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold">{count}</h2>
      <button
        onClick={() => setCount(count + 1)}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
      >
        +1
      </button>
    </div>
  )
}
```

Button dabao — browser tab ka title bhi saath saath badle. 🔥

---

## useEffect Ka Flow

```
Button dabaya → count badla
      ↓
Component re-render hua
      ↓
UI update hua
      ↓
useEffect chala — kyunki count badla tha
      ↓
document.title update hua
```

---

## Aaj Ka Summary

✅ `useEffect` — render ke baad side effects karne ke liye  
✅ Hamesha render ke **baad** chalta hai — pehle nahi  
✅ `[]` — sirf ek baar, component aane pe  
✅ `[value]` — jab bhi value change ho  
✅ No array — har render pe, avoid karo  

---

## Agla Step

**05b** — useEffect se API call karna — loading, error, data — step by step! 🌐
