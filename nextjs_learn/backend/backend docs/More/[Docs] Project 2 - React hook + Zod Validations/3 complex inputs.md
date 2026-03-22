# Doc 1.3 — Wahi Form Upgrade — Select, Checkbox, Radio Add Karo

---

## Abhi Tak Kya Hua

Form mein naam aur email hai — React Hook Form se register kiya — submit pe data aa raha hai.

Ab yeh form upgrade karenge — teen aur inputs add karenge:

- **Select** — dropdown — ek option choose karo
- **Checkbox** — ek cheez agree/disagree karo
- **Radio** — multiple options mein se ek choose karo

---

## Pehle Socho — Yeh Teen Inputs Text Se Alag Kyun Hain

Text input mein user kuch type karta hai — `data.naam` mein woh string aati hai.

Par yeh teen alag hain:

**Select** — user dropdown se ek option select karta hai — value woh `option` ki hoti hai jo selected hai

**Checkbox** — checked hai ya nahi — `true` ya `false`

**Radio** — multiple options mein se ek — value woh `value` attribute hoti hai jo selected radio ki hai

React Hook Form mein — teeno ke liye `{...register('fieldName')}` kaam karta hai — par `data` mein alag alag cheezein aayengi.

---

## Step 1 — `FormFields` Type Update Karo

Pehle TypeScript ko batao — teen naye fields aa rahe hain:

```tsx
type FormFields = {
  naam: string
  email: string
  city: string        // select ke liye
  terms: boolean      // checkbox ke liye — true ya false
  gender: string      // radio ke liye — 'male' ya 'female'
}
```

---

## Step 2 — Select Add Karo

Select ek dropdown hai — user ek city choose karega.

Wahi `{...register('city')}` lagana hai — par `<input>` pe nahi — `<select>` pe:

```tsx
<div>
  <label className="block text-sm font-medium mb-1">City</label>
  <select
    {...register('city')}
    className="border border-gray-300 rounded px-3 py-2 w-full"
  >
    <option value="">-- Select karo --</option>
    <option value="mumbai">Mumbai</option>
    <option value="delhi">Delhi</option>
    <option value="bangalore">Bangalore</option>
  </select>
</div>
```

`value=""` wala pehla option — placeholder hai — "kuch select nahi kiya abhi."

Submit karo — `data.city` mein selected city aayegi:

```
{ naam: 'Pravin', email: '...', city: 'mumbai', ... }
```

---

## Step 3 — Checkbox Add Karo

Checkbox ek agree/disagree button hai — terms accept karna hai.

```tsx
<div className="flex items-center gap-2">
  <input
    type="checkbox"
    {...register('terms')}
    className="w-4 h-4"
  />
  <label className="text-sm">Terms aur Conditions accept karta hoon</label>
</div>
```

Submit karo — `data.terms` mein kya aata hai dekho:

- Checked hai — `data.terms` = `true`
- Unchecked hai — `data.terms` = `false`

Text input jaisa hi — bas `{...register('terms')}` — React Hook Form khud samajhta hai yeh checkbox hai.

---

## Step 4 — Radio Add Karo

Radio mein multiple options hain — par **sirf ek choose** ho sakta hai.

Radio ke liye ek alag cheez hai — **sabko same `register` naam dena hai** — `'gender'`. Par har radio ka `value` alag hoga — woh `value` `data` mein aayega jo selected hai.

```tsx
<div>
  <label className="block text-sm font-medium mb-1">Gender</label>
  <div className="flex gap-4">
    <label className="flex items-center gap-1">
      <input
        type="radio"
        value="male"
        {...register('gender')}
      />
      Male
    </label>
    <label className="flex items-center gap-1">
      <input
        type="radio"
        value="female"
        {...register('gender')}
      />
      Female
    </label>
  </div>
</div>
```

Teeno radio pe `{...register('gender')}` — same naam — React Hook Form jaanta hai yeh ek group hai.

`value="male"` aur `value="female"` — jo radio select ki jaayegi — woh value `data.gender` mein aayegi.

Submit karo — `data.gender` mein `'male'` ya `'female'` aayega.

---

## Verify Karo — Console.log Dekho

Sab fill karo aur submit karo — browser console mein:

```
{
  naam: 'Pravin',
  email: 'pravin@gmail.com',
  city: 'mumbai',
  terms: true,
  gender: 'male'
}
```

✅ Saari values aa gayi — React Hook Form ne sab handle kiya.

---

## Poora `ContactForm.tsx` Ab

```tsx
'use client'

import { useForm } from 'react-hook-form'

type FormFields = {
  naam: string
  email: string
  city: string
  terms: boolean
  gender: string
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

      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <select
          {...register('city')}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="">-- Select karo --</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="bangalore">Bangalore</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('terms')}
          className="w-4 h-4"
        />
        <label className="text-sm">Terms aur Conditions accept karta hoon</label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="male"
              {...register('gender')}
            />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="female"
              {...register('gender')}
            />
            Female
          </label>
        </div>
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

## Summary

- **Select** — `{...register('city')}` `<select>` pe lagaya — `data.city` mein selected option ki value
- **Checkbox** — `{...register('terms')}` — `data.terms` mein `true`/`false`
- **Radio** — sabko same naam `{...register('gender')}` — `value` alag alag — `data.gender` mein selected radio ki value
- `FormFields` type update kiya — `city: string`, `terms: boolean`, `gender: string`
- Teeno ke liye wahi `{...register(...)}` — React Hook Form khud handle karta hai

---

## Agla Step

Form complete hai — saari values aa rahi hain.

Par koi validation nahi hai — naam khali chhod ke submit karo — koi error nahi. Email mein kuch bhi likho — koi error nahi.

Ab validation add karni hai — yahi hoga **Doc 1.4 mein.**