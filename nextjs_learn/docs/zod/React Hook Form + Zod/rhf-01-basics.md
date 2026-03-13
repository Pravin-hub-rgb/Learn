# React Hook Form — Doc 1 — RHF Kya Hai? 📋

## Pehle Problem Dekho

Tune Level 5 mein manually form banaya tha. Yaad karo kitna kuch likhna pada:

```tsx
// State har field ke liye
const [form, setForm] = useState({ naam: '', email: '', password: '' })
const [errors, setErrors] = useState({ naam: '', email: '', password: '' })

// Har field ke liye onChange
onChange={(e) => {
  setForm({ ...form, naam: e.target.value })
  setErrors({ ...errors, naam: '' })
}}

// Submit mein manually validate karo
result.error.issues.forEach((issue) => {
  const field = issue.path[0]
  if (field === 'naam') newErrors.naam = issue.message
  if (field === 'email') newErrors.email = issue.message
  // ...
})
```

**Teen fields ke liye itna kuch.** Agar 10 fields ho jaayein? 😩

---

## React Hook Form Kya Hai?

React Hook Form — **RHF** — ek library hai jo yeh sab kaam khud karta hai:

- Har field ki state khud track karta hai — tu nahi karta
- `onChange` khud handle karta hai — tu nahi likhta
- Errors khud manage karta hai
- Submit khud handle karta hai

Tu bas batata hai — "yeh field hai, yeh rules hain" — baaki RHF karta hai.

---

## Install Karo

```bash
npm install react-hook-form
```

---

## RHF Ke Teen Main Tools

RHF mein ek hook hai — `useForm`. Isse teen cheezein nikalte hain:

```tsx
const { register, handleSubmit, formState } = useForm()
```

Ek ek samjho:

---

### `register` — Field Ko RHF Se Jodo

```tsx
<input {...register('naam')} />
```

**`{...register('naam')}` kya hai?**

`register('naam')` ek object return karta hai — kuch aisa:

```tsx
{
  name: 'naam',
  onChange: (e) => { /* RHF khud handle karta hai */ },
  onBlur: (e) => { /* RHF khud handle karta hai */ },
  ref: /* RHF ka internal ref */
}
```

`{...}` spread operator — us object ki saari properties seedha `<input>` pe laga deta hai.

Matlab — **ek line mein** `onChange`, `name`, sab kuch laga diya. Tu kuch nahi likhta! 🔥

---

### `handleSubmit` — Submit Handle Karo

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

```tsx
function onSubmit(data) {
  console.log(data)  // saari fields ka data yahan aayega
}
```

`handleSubmit` pehle validation check karta hai — sab theek ho toh `onSubmit` function call karta hai. `e.preventDefault()` bhi khud karta hai — tu nahi likhta!

---

### `formState.errors` — Errors Nikalo

```tsx
const { formState: { errors } } = useForm()

// Use karo
{errors.naam && <p>{errors.naam.message}</p>}
```

RHF khud errors track karta hai — tu sirf dikhata hai.

---

## Manually vs RHF — Side by Side

```tsx
// ❌ Manually — bahut kuch likhna pada
const [naam, setNaam] = useState('')
const [naamError, setNaamError] = useState('')

<input
  value={naam}
  onChange={(e) => {
    setNaam(e.target.value)
    setNaamError('')
  }}
/>

// ✅ RHF — ek line
<input {...register('naam', { required: 'Naam zaroori hai!' })} />
```

---

## Aaj Ka Summary

✅ RHF — state, onChange, errors — sab khud handle karta hai  
✅ `register` — field ko RHF se jodo  
✅ `handleSubmit` — validation + submit handle karta hai  
✅ `formState.errors` — errors track karta hai  

---

## Agla Step

**Doc 2** — RHF se ek simple form banayenge — step by step! 🎯
