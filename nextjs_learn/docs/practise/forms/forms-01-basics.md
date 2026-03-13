# Forms — Level 1 — Bilkul Simple Input 📝

## Aaj Kya Banayenge?

Ek input box — jo likho woh neeche turant dikhe.

Koi submit nahi. Koi validation nahi. Bas seedha simple.

---

## HTML Mein Input Kaise Hota Tha?

```html
<input type="text" placeholder="Naam likho" />
```

Browser khud handle karta tha — user ne likha, box mein dikh gaya. Tu kuch nahi karta tha.

**React mein yeh alag hai.**

React mein input ka data **state mein** rakha jaata hai — tu khud handle karta hai. Isko **Controlled Input** kehte hain.

---

## Controlled Input Kya Hota Hai?

Simple idea:

```
User ne kuch likha
      ↓
onChange event fire hua
      ↓
State update hui
      ↓
Input mein naya value dikha
```

Tu state ka malik hai — input sirf state ko dikhata hai.

---

## Pehla Example — Naam Print Karo

```tsx
// app/components/SimpleInput.tsx
'use client'

import { useState } from 'react'

export default function SimpleInput() {
  const [naam, setNaam] = useState<string>('')

  return (
    <div style={{ padding: '40px' }}>
      <input
        type="text"
        placeholder="Apna naam likho"
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        style={{ padding: '8px', fontSize: '16px' }}
      />
      <p>Tumne likha: {naam}</p>
    </div>
  )
}
```

Ab **har naya cheez** tod ke:

---

**`value={naam}`** kya hai?

```
value=       ← input box mein kya dikhega
      {naam} ← woh jo state mein hai
```

Matlab — input box state ka mirror hai. State mein jo hai wahi dikhega.

---

**`onChange={(e) => setNaam(e.target.value)}`** kya hai?

Yeh sabse important line hai. Tod ke:

```
onChange=          ← jab bhi user kuch type kare — yeh fire hoga
         {         ← JSX mein JS likhna hai
          (e)      ← e = event — "kya hua" ki poori info hai isme
           =>      ← arrow function
            setNaam(        ← state update karo
              e.target      ← e ke andar .target = woh input box
                     .value ← us input box mein abhi kya likha hai
            )
         }
```

Simple flow:

```
User ne "A" likha
  ↓
e.target.value = "A"
  ↓
setNaam("A")
  ↓
naam = "A"
  ↓
input aur paragraph dono mein "A" dikh gaya
```

---

**`{naam}`** paragraph mein kyun?

JSX mein JS value dikhani ho toh `{}` mein daalo — tune pehle padha tha. `naam` state variable hai — toh `{naam}` likhne se woh print ho jaata hai.

---

## Try Karo — `app/page.tsx` Mein Lagao

```tsx
import SimpleInput from './components/SimpleInput'

export default function HomePage() {
  return <SimpleInput />
}
```

Type karo — neeche turant dikh jaayega! ✅

---

## Thoda Aur — Multiple Inputs

Ab do inputs — naam aur city:

```tsx
// app/components/MultiInput.tsx
'use client'

import { useState } from 'react'

export default function MultiInput() {
  const [naam, setNaam] = useState<string>('')
  const [city, setCity] = useState<string>('')

  return (
    <div style={{ padding: '40px' }}>

      <div style={{ marginBottom: '15px' }}>
        <label>Naam: </label>
        <input
          type="text"
          placeholder="Naam likho"
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          style={{ padding: '8px', marginLeft: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>City: </label>
        <input
          type="text"
          placeholder="City likho"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '8px', marginLeft: '8px' }}
        />
      </div>

      {/* Sirf tab dikhao jab kuch likha ho */}
      {naam && city && (
        <p style={{ color: 'green' }}>
          {naam} — {city} se hain! 👋
        </p>
      )}

    </div>
  )
}
```

Har input ki apni state — simple! 

---

## Aaj Ka Summary

✅ React mein input **Controlled** hota hai — state mein data rakho  
✅ `value={state}` — input state ka mirror hai  
✅ `onChange={(e) => setState(e.target.value)}` — user type kare toh state update karo  
✅ `e.target.value` — input mein abhi kya likha hai  
✅ `{variable}` — JSX mein value print karo  

---

## Agla Step

**Level 2** — Submit button, `onSubmit` event, aur basic validation! 🚀
