# 02 — Components 🧩

## Components Kya Hote Hain?

HTML mein tu yeh karta tha:

```html
<!-- index.html -->
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<!-- about.html -->
<nav>
  <!-- phir se wahi copy paste... 😩 -->
</nav>
```

**Problem:** Navbar 10 pages pe hai. Ek jagah change karna hai toh 10 files update karni padegi.

**React ka solution = Components!**

> Component = Ek reusable UI piece jo tum baar baar use kar sako.

Ek baar banao, har jagah use karo. Sirf ek jagah update karo — sab jagah change. 🔥

---

## Pehla Component Banao

### Project mein folder banao

```
app/
└── components/        ← yeh folder banao
    └── Navbar.tsx     ← yeh file banao (.tsx — TypeScript + JSX)
```

### `Navbar.tsx` mein yeh likho:

```tsx
// app/components/Navbar.tsx

export default function Navbar() {
  return (
    <nav style={{ background: '#333', padding: '10px' }}>
      <a href="/" style={{ color: 'white', marginRight: '20px' }}>Home</a>
      <a href="/about" style={{ color: 'white', marginRight: '20px' }}>About</a>
      <a href="/contact" style={{ color: 'white' }}>Contact</a>
    </nav>
  )
}
```

Abhi koi TypeScript nahi dikha — bilkul normal lag raha hai na? Yahi hota hai jab component ka koi **props** na ho. TS sirf tab dikhta hai jab data pass karna ho. Woh `03-props.md` mein aayega.

### `app/page.tsx` mein use karo:

```tsx
// app/page.tsx

import Navbar from './components/Navbar'

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to My Website! 🎉</h1>
      <p>Yeh mera homepage hai.</p>
    </div>
  )
}
```

Save karo — browser mein navbar dikh jaega! ✅

---

## JSX Kya Hai?

Tu soch raha hoga — "yaar, `.tsx` file mein HTML kyun likh rahe hain?"

Yeh **HTML nahi** hai — yeh **JSX** hai!

JSX = JavaScript + XML ka mixture. Next.js automatically ise actual HTML mein convert karta hai.

### JSX ke Rules — HTML se alag:

| HTML | JSX |
|------|-----|
| `class="box"` | `className="box"` |
| `<img src="x">` | `<img src="x" />` (self-closing!) |
| `<input type="text">` | `<input type="text" />` |
| `for="name"` | `htmlFor="name"` |
| `style="color: red"` | `style={{ color: 'red' }}` |

**Yaad rakhne wali baat:** JSX mein sab attributes camelCase mein hote hain.

---

## Component ke Rules

### Rule 1: Capital letter se shuru karo

```tsx
// ✅ Sahi
function Navbar() { ... }
function UserCard() { ... }

// ❌ Galat — lowercase = React samjhega yeh HTML element hai
function navbar() { ... }
```

### Rule 2: Ek cheez return karo

```tsx
// ❌ Galat — do elements directly return nahi kar sakte
function Card() {
  return (
    <h2>Title</h2>
    <p>Description</p>
  )
}

// ✅ Sahi — div mein wrap karo
function Card() {
  return (
    <div>
      <h2>Title</h2>
      <p>Description</p>
    </div>
  )
}

// ✅ Ya Fragment use karo — extra div nahi banta DOM mein
function Card() {
  return (
    <>
      <h2>Title</h2>
      <p>Description</p>
    </>
  )
}
```

---

## TypeScript Wala Angle 🔵

Abhi is file mein koi props nahi hain toh TypeScript zyada nahi dikha. Par ek cheez note kar —

Jab bhi tu component mein `style` likhta hai, TS automatically check karta hai ki valid CSS property hai ya nahi:

```tsx
// ✅ Valid
<div style={{ backgroundColor: 'red', fontSize: '16px' }}>

// ❌ TS Error — "backgroundcolor" nahi hota, "backgroundColor" hota hai
<div style={{ backgroundcolor: 'red' }}>
```

Yeh TS ki strictness hai — typos VS Code mein hi pakad leta hai! 🎯

---

## Mini Project — Component wali Website 🛠️

Chalo teen components banate hain aur unhe jodte hain.

### Step 1: Footer component

```tsx
// app/components/Footer.tsx

export default function Footer() {
  return (
    <footer style={{
      background: '#333',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      marginTop: '40px'
    }}>
      <p>© 2024 Meri Website. Sab rights reserved. 😄</p>
    </footer>
  )
}
```

### Step 2: Hero component

```tsx
// app/components/Hero.tsx

export default function Hero() {
  return (
    <div style={{
      padding: '60px',
      textAlign: 'center',
      background: '#f0f8ff'
    }}>
      <h1>Namaste Duniya! 👋</h1>
      <p>Yeh meri Next.js + TypeScript website hai.</p>
      <button style={{
        padding: '12px 24px',
        background: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        Aur Jaano
      </button>
    </div>
  )
}
```

### Step 3: Sab page.tsx mein jodo

```tsx
// app/page.tsx

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}
```

Ek proper website — sirf components se! 🎉

---

## Aaj Ka Summary

✅ Component = Reusable UI piece  
✅ Capital letter se function naam shuru hota hai  
✅ Files `.tsx` extension mein hoti hain  
✅ JSX mein `className`, `style={{}}` use karte hain  
✅ Multiple elements ko wrap karna padta hai  
✅ TypeScript CSS properties mein bhi typos pakad leta hai  

---

## Agla Step

**03-props.md** — Components ko data kaise bhejen. Aur yahan **TypeScript ka asli kaam** shuru hoga — `interface` se props ka type define karna! 🎯
