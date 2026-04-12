# 03 — Component Libraries: shadcn, MUI, Ant Design aur Baaki

> Umbrella: Frontend → Component Libraries (UI Kits)
> Kaam: Ready-made buttons, modals, tables, forms — khud banana nahi
> Fark: Styling tools (02) CSS likhte hain — Component libraries complete components deti hain

---

## Yeh Category Kya Solve Karti Hai

Har project mein yeh banana padta hai:
- Button (primary, secondary, disabled states)
- Modal / Dialog
- Dropdown
- Date picker
- Table with sorting
- Toast notifications

Har baar scratch se banana slow hai. Component libraries yeh sab ready deti hain.

---

## Do Types Hoti Hain — Headless vs Styled

```
STYLED (opinionated):
  → Design pehle se fixed — Google Material, Ant Design system
  → Pros: Jaldi ready, consistent
  → Cons: Customize karna mushkil, apna look banana hard

HEADLESS (unstyled):
  → Sirf behavior + accessibility — koi CSS nahi
  → Pros: Full design control, apna style daalo
  → Cons: Khud style karna padta hai

2024 trend: Headless + Tailwind → shadcn/ui
```

---

## Tools

---

### shadcn/ui
**Tag: 🟢 Most Popular 2024 | Recommended | Tailwind-based**

```
Kya hai: "Copy-paste" component library — code tumhare project mein aata hai, install nahi hota
Kab use karo:
  → Tailwind use kar rahe ho
  → Full design control chahiye
  → Naya project 2024

Unique concept:
  → npm install nahi hota shadcn
  → npx shadcn-ui add button → Button.tsx tumhare /components/ui/ mein aa jaata hai
  → Phir tum directly edit kar sakte ho
  → Dependency nahi — code tumhara hai

Real app example:
  → Vercel ke naye tools
  → Linear ka settings UI
  → Naye Indian SaaS startups

Code feel:
  import { Button } from "@/components/ui/button"
  import { Dialog, DialogContent } from "@/components/ui/dialog"
  <Button variant="outline">Cancel</Button>

Pros:
  → Full customization — code tumhara hai
  → Accessible by default (Radix UI pe based)
  → Tailwind ke saath perfect
  → Copy karo sirf jo chahiye — bundle bloat nahi

Cons:
  → Tailwind required
  → Har project mein manually add karna

India mein: 2023 ke baad rapidly growing
```

---

### Radix UI
**Tag: 🟢 Headless | Accessible | shadcn ka base**

```
Kya hai: Fully accessible headless components — shadcn/ui internally yahi use karta hai
Kab use karo:
  → Custom design system banana hai
  → shadcn nahi chahiye lekin Radix ki accessibility chahiye
  → Khud styling karna hai (CSS Modules ya anything)

Code feel:
  import * as Dialog from '@radix-ui/react-dialog'
  <Dialog.Root>
    <Dialog.Trigger>Open</Dialog.Trigger>
    <Dialog.Content>...</Dialog.Content>  {/* Khud style karo */}
  </Dialog.Root>

shadcn se fark:
  → shadcn = Radix + Tailwind styles already applied
  → Radix = sirf behavior, no styles
```

---

### Material UI (MUI)
**Tag: 🟡 Enterprise | Google Material Design | Large ecosystem**

```
Kya hai: Google Material Design implement karta hai — complete component library
Kab use karo:
  → Google-style UI chahiye (Android app feel)
  → Admin panels, internal tools
  → Existing MUI codebase
  → Rapid prototyping jahan design matter nahi karta

Kab mat use karo:
  → Custom unique design chahiye — MUI look override karna bahut mushkil
  → Bundle size concern hai — MUI heavy hai

Real app example:
  → Google ke naye tools (Google Analytics redesign)
  → Indian government portals (DigiLocker type apps)
  → Corporate internal dashboards

Code feel:
  import Button from '@mui/material/Button'
  import TextField from '@mui/material/TextField'
  <Button variant="contained" color="primary">Submit</Button>

Cons:
  → Heavy bundle size
  → Google look se bahar jaana mushkil
  → Tailwind ke saath conflict hota hai

India mein:
  → Enterprise, government, corporate sector mein popular
  → Startups mein avoid — shadcn ya Tailwind prefer
```

---

### Ant Design
**Tag: 🟡 Enterprise | Admin Panels | Chinese origin**

```
Kya hai: Comprehensive enterprise component library — Alibaba ne banaya
Kab use karo:
  → Admin dashboards, CRM, ERP type apps
  → Bahut saare complex components chahiye (Tables, Forms, Charts sab included)
  → B2B SaaS

Kab mat use karo:
  → Consumer-facing apps — "corporate" feel aata hai
  → Custom branding wali apps

Real app example:
  → Razorpay ka merchant dashboard (Ant Design heavy)
  → Paytm for Business type tools
  → Alibaba, DingTalk

Pros:
  → Bahut complete — DatePicker, Table with sorting/filtering, Tree, everything
  → Good documentation

India mein: Fintech aur B2B dashboards mein zyada milta hai
```

---

### Chakra UI
**Tag: 🟡 Developer Friendly | Declining | Was popular 2021-22**

```
Kya hai: Simple, accessible component library with theming
Kab use karo:
  → Existing Chakra codebase
  → Otherwise: shadcn/Tailwind prefer karo

Status: 2024 mein declining — Chakra UI v3 aaya lekin momentum slow
Alternatives: shadcn/ui ne zyada market le li

Real app example:
  → 2021-2022 era ke projects
```

---

### Mantine
**Tag: 🟢 Growing | Feature-rich | Good alternative**

```
Kya hai: Complete component library — 100+ components, hooks included
Kab use karo:
  → MUI jaisi completeness chahiye but lighter
  → Hooks bhi chahiye (useDebouncedValue, useLocalStorage etc)
  → shadcn se zyada "complete" feel chahiye

Real app example:
  → Growing startups jo quick ship karna chahte hain
  → Internal tools

Pros:
  → Bahut saare hooks built-in
  → Theming easy
  → Active development

India mein: Growing — abhi mostly international projects mein
```

---

### DaisyUI
**Tag: 🟢 Tailwind-based | Simple | Good for beginners**

```
Kya hai: Tailwind ke upar component classes — btn, card, modal, etc.
Kab use karo:
  → Tailwind use kar rahe ho
  → Jaldi UI chahiye
  → Beginners ke liye — Tailwind seekhte waqt

Code feel:
  <button className="btn btn-primary">Click me</button>
  <div className="card bg-base-100 shadow-xl">...</div>

shadcn se fark:
  → DaisyUI: CSS classes only — React components nahi
  → shadcn: Actual React components with full TypeScript support

Kab prefer: Quick projects, static sites, non-React
```

---

### Headless UI
**Tag: 🟢 Tailwind team | Simple | Limited components**

```
Kya hai: Tailwind team ka headless component library — sirf kuch components
Kab use karo:
  → Tailwind use kar rahe ho
  → Sirf dropdown, listbox, combobox chahiye
  → shadcn se halka

Limited components hain — shadcn zyada complete hai
```

---

## Quick Decision

```
Naya project, Tailwind use kar rahe ho?
  → shadcn/ui (almost always)

Admin panel / internal tool, Google style okay hai?
  → MUI ya Ant Design

Complex enterprise dashboard, bahut saare components?
  → Ant Design (most complete)

Custom design system banana hai, full control chahiye?
  → Radix UI (headless) + apni styling

Beginner, jaldi UI chahiye?
  → DaisyUI (Tailwind ke saath)

Existing codebase?
  → Jo already hai wahi use karo — rewrite mat karo
```

---

## India Mein Reality

```
Consumer startups (2024):        shadcn/ui + Tailwind
Fintech / B2B dashboards:        Ant Design ya MUI
Enterprise / Corporate:          MUI
Government projects:             MUI (familiarity)
Freelance / Quick projects:      DaisyUI ya shadcn
```

---

## Agla Doc

`04-frontend-forms.md` — Forms + Validation — React Hook Form, Zod, Yup, Formik — Ola ka booking form, Swiggy ka address form kaise bana hoga.
