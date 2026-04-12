# 02 — Styling: Tailwind, CSS Modules, Styled Components aur Baaki

> Umbrella: Frontend → Styling
> Kaam: App kaisi dikhegi — colors, layout, typography, responsive design
> Har tool ka alag approach hai — utility, module, CSS-in-JS

---

## Yeh Category Kya Solve Karti Hai

CSS likhna simple lagta hai — lekin bade apps mein:
- Class names clash karte hain (`.button` globally apply ho jaata hai)
- Dead CSS pile up hoti hai (koi remove nahi karta)
- Responsive design maintain karna mushkil hota hai
- Dark mode, theming — complex ho jaata hai

Yeh tools in problems ko solve karte hain — alag alag tarike se.

---

## Tools

---

### Tailwind CSS
**Tag: 🟢 Most Popular 2024 | Industry Shifting Here | Recommended**

```
Kya hai: Utility-first CSS — pre-defined classes seedha HTML mein use karo
Kab use karo:
  → Naya project — almost always
  → Jaldi prototype banana ho
  → Design system nahi hai, khud banana hai
  → Next.js / React projects

Kab mat use karo:
  → Team ko Tailwind nahi aata aur deadline tight hai
  → Highly custom animations (GSAP + plain CSS better)

Real app example:
  → Vercel ka website: Poora Tailwind
  → Linear (project management): Tailwind
  → Naye Indian startups 2023+: Tailwind everywhere

Code feel:
  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
    Add to Cart
  </button>
  (Koi alag CSS file nahi — sab yahan)

Pros:
  → Class likhte waqt CSS file switch nahi karna
  → Responsive: md:text-lg lg:text-xl — ek line mein
  → Dark mode: dark:bg-gray-800 — built-in
  → Bundle size small — sirf used classes

Cons:
  → HTML mein bahut saari classes — "ugly" lagti hai pehle
  → Learning curve — class names yaad karne padte hain

India mein: 2022 ke baad almost standard ban gaya naye projects mein
```

---

### CSS Modules
**Tag: 🟢 Built-in | Safe | Always Valid**

```
Kya hai: Regular CSS — lekin file ke scope mein (class names globally clash nahi karte)
Kab use karo:
  → Tailwind nahi seekhna
  → Traditional CSS approach prefer karte ho
  → Legacy project

Code feel:
  /* Button.module.css */
  .button { background: blue; color: white; padding: 8px 16px; }

  /* Button.jsx */
  import styles from './Button.module.css'
  <button className={styles.button}>Click</button>

Pros:
  → Regular CSS — koi naya syntax nahi seekhna
  → Scoped — .button sirf is component mein

Cons:
  → Alag file switch karna padta hai
  → Responsive zyada verbose
  → Dark mode manual

Real app example:
  → Next.js ke default examples CSS Modules use karte hain
  → Conservative teams jo plain CSS prefer karte hain
```

---

### Sass / SCSS
**Tag: 🟢 Classic | Variables + Nesting | Still Valid**

```
Kya hai: CSS ka superpower — variables, nesting, mixins, functions
Kab use karo:
  → Bada design system banana hai
  → Variables chahiye (colors, spacing) — CSS variables se zyada powerful
  → Loops, functions, mixins chahiye
  → Large team with dedicated designers

Code feel:
  $primary: #3b82f6;
  $border-radius: 8px;

  .button {
    background: $primary;
    border-radius: $border-radius;

    &:hover { background: darken($primary, 10%); }

    &.large { padding: 16px 32px; }
  }

Real app example:
  → Bootstrap ka source SCSS mein
  → Purani enterprise projects
  → Design agencies jo complex theming karte hain

Tailwind ke saath:
  → Usually ya Tailwind ya SCSS — dono ek saath rarely
```
---
### Styled Components
**Tag: 🟡 Legacy CSS-in-JS | Existing projects mein milega**

```
Kya hai: CSS JavaScript mein — template literals se
Kab use karo:
  → Existing styled-components codebase
  → Highly dynamic styles (props pe depend karte hain)

Kab mat use karo:
  → Naya project — Tailwind lo

Performance note:
  → Runtime CSS generation — thoda slow (SSR pe issues)
  → Next.js ke saath setup complex

Code feel:
  const Button = styled.button`
    background: ${props => props.primary ? 'blue' : 'gray'};
    padding: 8px 16px;
  `
  <Button primary>Click</Button>

Real app example:
  → 2019-2022 era ke React projects
  → Airbnb, Atlassian (purane versions)

India mein: Purane projects mein milega — naye mein avoid
```

---

### Emotion
**Tag: 🟡 CSS-in-JS | MUI uses it**

```
Kya hai: Styled Components jaisa — Material UI internally use karta hai
Kab use karo:
  → MUI use kar rahe ho — already included
  → Otherwise: Avoid in new projects

Styled Components se fark:
  → Thoda better performance
  → MUI ecosystem mein standard
```

---

### Vanilla CSS
**Tag: 🟢 Always Valid | Learning ke liye best**

```
Kya hai: Plain browser CSS — koi tool nahi
Kab use karo:
  → Seekhne ke liye — pehle yeh
  → Bahut simple static page
  → Email templates (email clients mein sirf plain CSS)

Production mein:
  → Akela kaafi nahi usually — koi tool ke saath use karo
```

---

## Quick Decision

```
Naya React/Next.js project?
  → Tailwind CSS (almost always)

Traditional CSS prefer karte ho?
  → CSS Modules

Bada design system with complex theming?
  → SCSS ya Tailwind + CSS variables

MUI use kar rahe ho?
  → Emotion already included — ya Tailwind override

Existing styled-components project?
  → Rehne do — rewrite ki zaroorat nahi
```

---

## India Mein Reality

```
Startup / Agency (2024):     Tailwind — almost standard
Product companies:           Tailwind ya CSS Modules
Enterprise / Purani company: SCSS ya Styled Components
Freelance:                   Tailwind — jaldi kaam
```

---

## Agla Doc

`03-frontend-components.md` — UI Component Libraries — shadcn, MUI, Ant Design, Chakra — Zomato ka UI kaisa banaa, kab ready-made components lo kab khud banao.
