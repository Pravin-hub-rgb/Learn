# Forms — Level 2 — Submit + Basic Validation ✅

## Aaj Kya Banayenge?

Do number inputs + submit button.

Submit pe:
- Check karo — khaali toh nahi?
- Check karo — number hai ya nahi?
- Sab theek hai toh console mein log karo

---

## Naya Concept — `onSubmit` Event

Level 1 mein `onChange` seekha tha — "jab kuch type ho."

Ab `onSubmit` — **"jab form submit ho."**

HTML mein form aisa hota tha:

```html
<form onsubmit="kaamKaro()">
  <input type="text" />
  <button type="submit">Submit</button>
</form>
```

React mein bhi same — bas syntax thoda alag:

```tsx
<form onSubmit={handleSubmit}>
  <input type="text" />
  <button type="submit">Submit</button>
</form>
```

---

## Ek Zaruri Cheez — `e.preventDefault()`

Jab form submit hota hai — browser **by default** page reload karta hai.

React mein yeh nahi chahiye — hum khud handle karenge.

```tsx
function handleSubmit(e: React.SyntheticEvent) {
  e.preventDefault()   // ← page reload rokta hai
  // ab apna kaam karo
}
```

**`React.SyntheticEvent`** kya hai?

Tod ke:

```
React           ← React library se aa raha hai
     .          ← andar se nikaal raha hai
      SyntheticEvent  ← "koi bhi event" — generic type
```

React mein events directly browser ke events nahi hote — React unhe wrap karta hai apne andar. Isko **SyntheticEvent** kehte hain.

`FormEvent` pehle use hota tha — par ab deprecated hai. `SyntheticEvent` use karo form submit ke liye.

---

## Do Numbers Ka Sum — Step by Step

```tsx
// app/components/SumForm.tsx
'use client'

import { useState } from 'react'

export default function SumForm() {
  const [num1, setNum1] = useState<string>('')
  const [num2, setNum2] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    // Validation
    const newErrors: string[] = []

    if (num1 === '') newErrors.push('Pehla number khaali hai!')
    if (num2 === '') newErrors.push('Doosra number khaali hai!')
    if (num1 !== '' && isNaN(Number(num1))) newErrors.push('Pehla number valid nahi!')
    if (num2 !== '' && isNaN(Number(num2))) newErrors.push('Doosra number valid nahi!')

    // Errors hain toh rok lo
    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    // Sab theek hai — log karo
    setErrors([])
    console.log('Number 1:', Number(num1))
    console.log('Number 2:', Number(num2))
    console.log('Sum:', Number(num1) + Number(num2))
  }

  return (
    <div style={{ padding: '40px', maxWidth: '400px' }}>
      <h2>Do Numbers Ka Sum</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '15px' }}>
          <label>Number 1:</label>
          <input
            type="text"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            style={{ display: 'block', padding: '8px', marginTop: '4px', width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Number 2:</label>
          <input
            type="text"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            style={{ display: 'block', padding: '8px', marginTop: '4px', width: '100%' }}
          />
        </div>

        {/* Errors dikhao */}
        {errors.length > 0 && (
          <div style={{ color: 'red', marginBottom: '15px' }}>
            {errors.map((error, index) => (
              <p key={index} style={{ margin: '4px 0' }}>❌ {error}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Submit Karo
        </button>

      </form>
    </div>
  )
}
```

Ab **har naya cheez** tod ke:

---

### `useState<string[]>([])`  kya hai?

```
useState          ← React ka function
        <string[]>  ← generic: andar strings ka array aayega
                  ([]) ← default: khaali array
```

`string[]` — tune generics mein padha tha — strings ki list.

---

### `isNaN(Number(num1))` kya hai?

Do cheezein hain yahan:

**`Number(num1)`** — string ko number mein convert karta hai:
```
Number("42")   → 42      ✅
Number("abc")  → NaN     ← "Not a Number"
Number("")     → 0
```

**`isNaN(...)`** — check karta hai "kya yeh NaN hai?":
```
isNaN(42)    → false  ← valid number hai
isNaN(NaN)   → true   ← number nahi hai
```

Toh combined:
```
isNaN(Number("abc"))  → true   ← valid number nahi
isNaN(Number("42"))   → false  ← valid number hai
```

---

### `newErrors.push(...)` kya hai?

`push` array mein naya item add karta hai:

```ts
const arr = ['a', 'b']
arr.push('c')
// arr ab ['a', 'b', 'c'] hai
```

Toh errors array mein naye errors add kar rahe hain ek ek karke.

---

### `if (newErrors.length > 0)` kya hai?

```
newErrors.length   ← array mein kitne items hain
> 0                ← agar ek bhi error hai
```

Agar koi bhi error hai — `return` kar do — matlab function wahan ruk jaata hai, aage nahi badhta.

---

### `errors.map(...)` mein `index` kyun?

```tsx
errors.map((error, index) => (
  <p key={index}>{error}</p>
))
```

`.map()` mein second parameter `index` hota hai — 0, 1, 2... automatically aata hai. Key ke liye use kar rahe hain kyunki errors ke paas koi unique id nahi hai.

---

## Console Kahan Dekhen?

Browser mein **Right Click → Inspect → Console** tab.

Submit karo — wahan numbers aur sum dikh jaayega!

---

## Aaj Ka Summary

✅ `onSubmit` — form submit hone pe kaam karo  
✅ `e.preventDefault()` — page reload rokta hai  
✅ `React.SyntheticEvent` — form submit event ka sahi type  
✅ `isNaN(Number(...))` — valid number check karna  
✅ Errors array mein collect karo — phir dikhao  
✅ `return` — function beech mein rok do  

---

## Agla Step

**Level 3** — Calculator! Dropdown se operator select karo, submit pe result screen pe dikhao! 🧮
