# Forms — Level 3 — Calculator 🧮

## Aaj Kya Banayenge?

- Do number inputs
- Dropdown — operator select karo (`+`, `-`, `*`, `/`)
- Submit pe result **screen pe** dikhao

---

## Naya Concept — `<select>` Dropdown

HTML mein dropdown aisa tha:

```html
<select>
  <option value="+">Plus</option>
  <option value="-">Minus</option>
</select>
```

React mein bhi same — bas controlled banana padta hai (jaise input tha):

```tsx
const [operator, setOperator] = useState<string>('+')

<select
  value={operator}
  onChange={(e) => setOperator(e.target.value)}
>
  <option value="+">+ (Plus)</option>
  <option value="-">- (Minus)</option>
</select>
```

**`value` aur `onChange`** — bilkul wahi pattern jo input mein tha. Same cheez, alag element.

---

## Calculator — Poora Code

```tsx
// app/components/Calculator.tsx
'use client'

import { useState } from 'react'

export default function Calculator() {
  const [num1, setNum1] = useState<string>('')
  const [num2, setNum2] = useState<string>('')
  const [operator, setOperator] = useState<string>('+')
  const [result, setResult] = useState<number | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  function calculate(n1: number, n2: number, op: string): number | null {
    if (op === '+') return n1 + n2
    if (op === '-') return n1 - n2
    if (op === '*') return n1 * n2
    if (op === '/') {
      if (n2 === 0) return null   // zero se divide nahi kar sakte
      return n1 / n2
    }
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newErrors: string[] = []

    if (num1 === '') newErrors.push('Pehla number khaali hai!')
    if (num2 === '') newErrors.push('Doosra number khaali hai!')
    if (num1 !== '' && isNaN(Number(num1))) newErrors.push('Pehla number valid nahi!')
    if (num2 !== '' && isNaN(Number(num2))) newErrors.push('Doosra number valid nahi!')
    if (operator === '/' && Number(num2) === 0) newErrors.push('Zero se divide nahi kar sakte!')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      setResult(null)
      return
    }

    setErrors([])
    const answer = calculate(Number(num1), Number(num2), operator)
    setResult(answer)
  }

  return (
    <div style={{ padding: '40px', maxWidth: '400px' }}>
      <h2>🧮 Calculator</h2>

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

        {/* Dropdown — Operator Select */}
        <div style={{ marginBottom: '15px' }}>
          <label>Operator:</label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            style={{ display: 'block', padding: '8px', marginTop: '4px', width: '100%' }}
          >
            <option value="+">+ (Jodo)</option>
            <option value="-">- (Ghataao)</option>
            <option value="*">× (Guna karo)</option>
            <option value="/">÷ (Bhago)</option>
          </select>
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

        {/* Errors */}
        {errors.length > 0 && (
          <div style={{ color: 'red', marginBottom: '15px' }}>
            {errors.map((error, index) => (
              <p key={index} style={{ margin: '4px 0' }}>❌ {error}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}
        >
          Calculate! 🚀
        </button>

      </form>

      {/* Result */}
      {result !== null && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#f0fff0', borderRadius: '10px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            {num1} {operator} {num2} =
          </p>
          <h2 style={{ color: 'green', margin: '8px 0' }}>
            {result}
          </h2>
        </div>
      )}

    </div>
  )
}
```

Ab **naye concepts** tod ke:

---

### `calculate` Function — Alag Kyun Nikala?

```tsx
function calculate(n1: number, n2: number, op: string): number | null {
```

**Parameters ke types:**
```
n1: number   ← pehla number
n2: number   ← doosra number
op: string   ← operator ("+", "-", etc.)
```

**Return type — `number | null`:**
```
: number | null   ← ya toh number return hoga, ya null
```

Kyun `null`? — Agar zero se divide karein toh valid answer nahi — `null` return karo.

Function ko **alag** isliye nikala — `handleSubmit` simple rahe. Ek function ek kaam kare — yeh good practice hai.

---

### `result !== null` kyun check kiya?

```tsx
{result !== null && (
  <div>...</div>
)}
```

`result` ki state `number | null` hai.

```
Shuru mein     → null    ← result wala div nahi dikha
Calculate kiya → 42      ← ab dikha
0 + 0 = 0      → 0       ← 0 bhi valid answer hai!
```

Isliye `result !== null` — `result` ka `0` hona bhi valid hai, toh `{result && ...}` nahi likh sakte — `0` falsy hota hai JS mein!

**Yeh important hai yaad rakhna** — `0` check karna ho toh hamesha `!== null` use karo, `&&` nahi.

---

### `<option value="+">` kya hai?

```tsx
<option value="+">+ (Jodo)</option>
```

```
value="+"      ← yeh woh value hai jo state mein aayegi
+ (Jodo)       ← yeh screen pe dikhega user ko
```

User `"+ (Jodo)"` dekhega — par state mein sirf `"+"` aayega. Clean!

---

## Aaj Ka Summary

✅ `<select>` bhi controlled hota hai — `value` + `onChange` same pattern  
✅ `<option value="...">` — value alag, display alag  
✅ Calculation logic alag function mein — clean code  
✅ `result !== null` — `0` bhi valid answer hai, `&&` se galti hogi  
✅ Function return type `number | null` — kabhi kabhi answer nahi hota  

---

## Agla Step

**Level 4** — User Registration Form! Naam, email, password — aur proper validation! 👤
