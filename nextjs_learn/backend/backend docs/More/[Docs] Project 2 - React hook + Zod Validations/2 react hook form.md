# Doc 1.2 — React Hook Form Se Wahi Form Banao

---

## Abhi Tak Kya Hua

1.1 mein manually form banaya — `useState`, `handleChange`, `onSubmit` — sab khud likha.

Kaam karta tha — par bahut boilerplate tha. Har field ke liye `value`, `onChange`, `name` — sab alag alag.

Ab wahi form **React Hook Form** se banayenge — fark dekhna.

---

## Install Karo

```bash
npm install react-hook-form
```

---

## Pehle Demolish Karo — Clean Slate

`ContactForm.tsx` se yeh sab hatao — `useState`, `handleChange`, inputs pe se `value`, `onChange`, `name`. Sirf itna rakho:

```tsx
'use client'

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Naam</label>
        <input
          type="text"
          placeholder="Apna naam likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Apni email likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}
```

---

## Step 1 — `useForm` Import Karo Aur Call Karo

`react-hook-form` se `useForm` import karo — component ke andar call karo:

```tsx
'use client'

import { useForm } from 'react-hook-form'

export default function ContactForm() {
  const result = useForm()
  console.log(result)

  return (...)
}
```

Browser console mein dekho kya aaya — ek bada object dikhega jisme bahut saari cheezein hain. Abhi sirf do kaam aayengi — `register` aur `handleSubmit`. Baaki baad mein.

Console.log hata do — ab directly nikaalo:

```tsx
const { register, handleSubmit } = useForm()
```

---

## Step 2 — `register` Kya Hai

`register` ek **function** hai.

Pehle dekho — isko call karo aur log karo:

```tsx
const { register, handleSubmit } = useForm()
console.log(register('naam'))
```

Browser console mein kuch aisa dikhega:

```js
{
  name: 'naam',
  onChange: [Function],
  onBlur: [Function],
  ref: [Function]
}
```

Ek object mila — jisme:

**`name: 'naam'`** — woh string jo tumne pass ki

**`onChange`** — function jo value track karta hai — wahi jo pehle manually likhte the `onChange={(e) => setName(e.target.value)}`

**`onBlur`** — jab input se focus hata tab — validation ke liye React Hook Form use karta hai

**`ref`** — React Hook Form input ka direct reference rakhta hai — isse woh directly DOM se value padhta hai — `useState` ki zaroorat nahi

---

## `register` Mein String Kya Hoti Hai

`register('naam')` mein `'naam'` — yeh **field ka naam** hai — **tumhi decide karte ho.**

Yeh wahi naam hoga jo baad mein `data` object mein key banega jab form submit hoga:

```
register('naam')   →   submit pe data.naam milega
register('email')  →   submit pe data.email milega
```

Console.log hata do — ab input pe lagayenge.

---

## Step 3 — Yeh Object Input Pe Kaise Lagayein

`register('naam')` ek object return karta hai — `name`, `onChange`, `onBlur`, `ref`.

Yeh saari properties input pe manually aise laga sakte hain:

```tsx
const fieldProps = register('naam')

<input
  name={fieldProps.name}
  onChange={fieldProps.onChange}
  onBlur={fieldProps.onBlur}
  ref={fieldProps.ref}
/>
```

Par yeh toh aur lamba ho gaya. Iske liye **spread operator** hai — `...` — matlab "is object ki saari properties yahan laga do":

```tsx
<input {...register('naam')} />
```

Yeh internally wahi banta hai — par ek line mein.

---

## Step 4 — Inputs Pe `register` Lagao

```tsx
'use client'

import { useForm } from 'react-hook-form'

export default function ContactForm() {
  const { register, handleSubmit } = useForm()

  return (
    <form className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Naam</label>
        <input
          type="text"
          placeholder="Apna naam likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          {...register('naam')}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Apni email likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          {...register('email')}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}
```

---

## Step 5 — Submit Pe Data Kaise Mile

"Inputs register ho gayi — ab submit pe data chahiye."

`handleSubmit` use karte hain — yeh ek function leta hai — tumhara function — aur jab form submit hoga tab woh tumhara function call karega.

Aur `data` dega — jisme React Hook Form ne jo track kiya tha `register` ke through — woh saari values hongi:

```tsx
<form
  onSubmit={handleSubmit((data) => {
    console.log(data)
  })}
  className="flex flex-col gap-4"
>
```

`e.preventDefault()` — `handleSubmit` khud handle karta hai — tumhe likhna nahi.

---

## Try Karo

"Pravin" aur "pravin@gmail.com" likho — submit karo — browser console mein:

```
{ naam: 'Pravin', email: 'pravin@gmail.com' }
```

✅ Wahi jo `register` mein naam diya — wahi key `data` mein aaya.

---

## TypeScript Ke Liye — Type Banao

Abhi TypeScript ko pata nahi ki form mein kya kya fields hain — `register('kuch_bhi')` likho — error nahi aayegi.

Ek type banao:

```tsx
type FormFields = {
  naam: string
  email: string
}
```

`useForm` ko yeh type do — angled brackets mein:

```tsx
const { register, handleSubmit } = useForm<FormFields>()
```

Ab `register('phone')` likho — TypeScript error dega — `phone` `FormFields` mein nahi hai. Type safe ho gaya.

---

## Poora `ContactForm.tsx` Ab

```tsx
'use client'

import { useForm } from 'react-hook-form'

type FormFields = {
  naam: string
  email: string
}

export default function ContactForm() {
  const { register, handleSubmit } = useForm<FormFields>()

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data)
      })}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Naam</label>
        <input
          type="text"
          placeholder="Apna naam likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          {...register('naam')}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Apni email likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          {...register('email')}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}
```

---

## Fark Dekho — Side By Side

**Pehle — Manual:**
```tsx
const [formData, setFormData] = useState({ naam: '', email: '' })
function handleChange(e) {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}
<form onSubmit={(e) => { e.preventDefault(); console.log(formData) }}>
  <input name="naam" value={formData.naam} onChange={handleChange} />
  <input name="email" value={formData.email} onChange={handleChange} />
</form>
```

**Ab — React Hook Form:**
```tsx
const { register, handleSubmit } = useForm<FormFields>()
<form onSubmit={handleSubmit((data) => console.log(data))}>
  <input {...register('naam')} />
  <input {...register('email')} />
</form>
```

Koi `useState` nahi. Koi `handleChange` nahi. Koi `e.preventDefault()` nahi.

---

## Summary

- `useForm()` — hook — andar bahut kuch hai — abhi sirf `register` aur `handleSubmit` nikale
- `register` ek function hai — `console.log` se dekha — object return karta hai
- `register('naam')` mein `'naam'` — tumhi decide karte ho — `data` mein yahi key banega
- Spread operator `{...register('naam')}` — object ki saari properties input pe laga do
- `handleSubmit((data) => {...})` — tumhara function andar — `data` mein saari values
- `useForm<FormFields>()` — TypeScript ko batao kya kya fields hain

---

## Agla Step

Form kaam kar raha hai. Ab complex inputs add karenge — checkbox, select, radio — wahi form upgrade hoga.

Yahi hoga **Doc 1.3 mein.**