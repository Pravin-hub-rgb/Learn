# ⚛️ React Seekhna — Phase 1.5: Pehla Component + Practice

> **Is doc mein kya milega:** Functional components ka complete breakdown — anatomy, naming rules, return patterns, export/import system poori detail mein, components ko nest karna, aur ek comprehensive practice snippet jisme Phase 1 ki sab cheezein use hongi.

---

## Component — Revisit with full depth

Phase 1.1 mein define kiya tha — component ek reusable piece of UI hai. Ab poora anatomy samajhte hain.

**React mein ek component essentially ek JavaScript function hai** jo:
1. Kuch bhi accept kar sakta hai as input (props — Phase 2 mein detail mein)
2. JSX return karta hai (ya `null` agar kuch render nahi karna)

---

## Functional Component ki Anatomy

```jsx
// 1. Imports (agar koi chahiye)
import { useState } from 'react'
import './MyComponent.css'

// 2. Component function — Capital letter se shuru!
function MyComponent() {
  
  // 3. Variables, logic, state — component ke andar, return ke pehle
  const title = "Hello React"
  const currentYear = new Date().getFullYear()
  
  // 4. JSX return karna
  return (
    <div className="my-component">
      <h1>{title}</h1>
      <p>Year: {currentYear}</p>
    </div>
  )
}

// 5. Export — doosri files use kar sakein
export default MyComponent
```

Yeh 5 parts hain har functional component ke — yaad rakh.

---

## Naming Rules — Kyun Capital Letter Zaroori Hai

React mein component ka naam **hamesha Capital Letter se start hona chahiye.** Yeh optional nahi — mandatory rule hai.

**Kyun?**

React JSX mein lowercase aur uppercase elements alag treat karta hai:

```jsx
// Lowercase → React samajhta hai HTML element hai
<div>       → real HTML <div> element
<p>         → real HTML <p> element
<span>      → real HTML <span> element

// Uppercase → React samajhta hai Custom Component hai
<MyComponent />   → MyComponent function call karo
<Header />        → Header function call karo
<ProductCard />   → ProductCard function call karo
```

Agar tu lowercase mein component banaye:

```jsx
function myComponent() {  // ❌
  return <h1>Hello</h1>
}

// Use karne ki koshish karoge toh:
<myComponent />  // React ise HTML element samjhega, error aayega ya unexpected behavior
```

**Naming Conventions:**

```jsx
// ✅ PascalCase — React component ke liye standard
function UserProfile() {}
function ProductCard() {}
function NavigationBar() {}

// ✅ Single word bhi Capital se
function Header() {}
function Footer() {}
function Button() {}

// ❌ Kabhi mat karo
function userProfile() {}    // lowercase start
function user_profile() {}   // underscore (snake_case)
function user-profile() {}   // hyphen (valid JS nahi bhi)
```

---

## Component Define Karne ke Tarike

React mein components 2 tarike se define karte hain — dono valid hain, dono industry mein use hote hain.

### Way 1 — Function Declaration

```jsx
function Greeting() {
  return <h1>Namaste!</h1>
}

export default Greeting
```

### Way 2 — Arrow Function (const)

```jsx
const Greeting = () => {
  return <h1>Namaste!</h1>
}

export default Greeting
```

**Short form (agar sirf ek expression return karna ho):**

```jsx
const Greeting = () => <h1>Namaste!</h1>
// Parentheses aur return dono optional hain single expression ke liye
```

**Kaun sa use karo?**

Dono theek hain. Industry mein dono common hain. Beginners ke liye `function` declaration zyada readable hai. Arrow function syntax thoda concise hota hai.

**Important difference:** Function declarations **hoisted** hoti hain (file ke upar move ho jaati hain mentally), arrow functions nahi. Practical fark React mein mostly nahi padta — par jaanna achha hai.

---

## Export aur Import — Complete Picture

React mein ek file se cheezein dono taraf bheji jaati hain — export karo, import karo. Do types hain.

### Type 1 — Default Export/Import

```jsx
// MyComponent.jsx — export karna
function MyComponent() {
  return <h1>Hello</h1>
}

export default MyComponent   // ← file ke end mein

// Ya directly:
export default function MyComponent() {
  return <h1>Hello</h1>
}
```

```jsx
// App.jsx — import karna
import MyComponent from './MyComponent'    // ✅

// Default import mein naam koi bhi de sakte ho (but convention — same naam rakhte hain)
import Anything from './MyComponent'       // ✅ technically valid
import MyComponent from './MyComponent'    // ✅ preferred — same naam
```

**Rules:**
- Ek file mein **sirf ek** `export default` ho sakta hai
- Import karte waqt curly braces `{}` nahi lagate
- Import mein naam koi bhi rakh sakte ho (but same rakhna convention hai)

---

### Type 2 — Named Export/Import

```jsx
// utils.js — multiple cheezein export karna
export function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const PI = 3.14159

// Ya sab ek saath end mein:
function formatDate(date) { ... }
function capitalize(str) { ... }
const PI = 3.14159

export { formatDate, capitalize, PI }
```

```jsx
// App.jsx — import karna
import { formatDate, capitalize } from './utils'   // ✅ curly braces zaroori

// Sirf kuch import karo
import { formatDate } from './utils'   // ✅ sirf yahi chahiye

// Rename karte hue import
import { formatDate as fd } from './utils'   // ✅ fd naam se use kar sakte ho

// Sab kuch import karo (avoid karo — code heavy hota hai)
import * as Utils from './utils'   // Utils.formatDate(), Utils.capitalize()
```

**Rules:**
- Ek file mein **multiple** named exports ho sakte hain
- Import mein **exact same naam** use karna padega curly braces ke andar
- Rename karna ho toh `as` keyword use karo

---

### Default + Named — Dono ek saath

```jsx
// Component.jsx
export const COMPONENT_VERSION = '1.0'   // named export

function Component() {                    // default export
  return <div>Component</div>
}

export default Component
```

```jsx
// App.jsx
import Component, { COMPONENT_VERSION } from './Component'
// Default import pehle, phir named imports curly braces mein
```

---

### `./` vs `/` vs library name — Import paths samjho

```jsx
// Relative path — teri apni files
import Header from './Header'           // same folder mein
import Button from './components/Button' // components subfolder mein
import utils from '../utils'            // ek folder upar phir utils

// Absolute path (Vite config se setup ho) — advanced
import Header from '@/components/Header'  // '@' configure karna padta hai

// npm library — node_modules se
import { useState } from 'react'         // react package se
import { Link } from 'react-router-dom'  // react-router-dom package se
```

`./` — current directory se start
`../` — ek directory upar
`../../` — do directories upar

Extension (`.jsx`, `.js`) likhna optional hai mostly — Vite resolve kar leta hai. But likho toh clearly samajh mein aata hai.

---

## Components ko Nest karna

Real apps mein components ek doosre ke andar hote hain — tree structure banate hain.

```jsx
// Button.jsx
function Button({ label }) {
  return <button className="btn">{label}</button>
}
export default Button

// Card.jsx
import Button from './Button'

function Card() {
  return (
    <div className="card">
      <h2>Card Title</h2>
      <p>Card description text yahan hoga.</p>
      <Button label="Read More" />   {/* Button component use kiya andar */}
    </div>
  )
}
export default Card

// App.jsx
import Card from './Card'

function App() {
  return (
    <div className="app">
      <Card />
      <Card />   {/* Same card dobara — reusability! */}
      <Card />
    </div>
  )
}
export default App
```

Component tree:
```
App
├── Card
│   └── Button
├── Card
│   └── Button
└── Card
    └── Button
```

---

## Component File Organization — Best Practice

Jaise jaise components badhenge, organization zaroori hai. Standard structure:

```
src/
├── components/          ← Reusable components yahan
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.css
│   ├── Card/
│   │   ├── Card.jsx
│   │   └── Card.css
│   └── Navbar/
│       ├── Navbar.jsx
│       └── Navbar.css
│
├── pages/               ← Page-level components (React Router ke saath)
│   ├── Home.jsx
│   └── About.jsx
│
├── App.jsx
└── main.jsx
```

Shuruat mein sab `src/` mein flat rakh sakte ho — jab components 5-6 se zyada ho jaayein tab folders mein organize karo.

---

## ✅ Practice Snippet — Phase 1 ka Complete Project

Yeh practice snippet Phase 1 ki sab cheezein use karti hai ek saath. Koi props ya state nahi — sirf static JSX aur components. Khud banana hai bina tutorial ke sirf is description se.

### Kya banana hai?

Ek **Personal Portfolio Preview** page — ek simple webpage jo contain kare:

1. **`Header` component** — Tera naam aur ek tagline
2. **`SkillBadge` component** — Ek single skill dikhane ka component (text inside a styled span)
3. **`SkillsSection` component** — Multiple `SkillBadge` components
4. **`ProjectCard` component** — Project ka naam, description
5. **`App`** — Sab ek saath jodna

---

### Step-by-Step Guide

**Step 1:** `src/` ke andar `components/` folder bana.

**Step 2:** `src/components/Header.jsx` bana:

```jsx
function Header() {
  const name = "Vin"             // ← apna naam daal
  const tagline = "Frontend Developer in Making 🚀"

  return (
    <header>
      <h1>{name}</h1>
      <p>{tagline}</p>
    </header>
  )
}

export default Header
```

**Step 3:** `src/components/SkillBadge.jsx` bana:

```jsx
function SkillBadge() {
  const skill = "React"   // abhi hardcoded — Phase 2 mein props se aayega

  return (
    <span style={{
      backgroundColor: '#61dafb',
      color: '#000',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      margin: '4px',
      display: 'inline-block'
    }}>
      {skill}
    </span>
  )
}

export default SkillBadge
```

**Step 4:** `src/components/SkillsSection.jsx` bana:

```jsx
import SkillBadge from './SkillBadge'

function SkillsSection() {
  return (
    <section>
      <h2>Skills</h2>
      <div>
        <SkillBadge />
        <SkillBadge />
        <SkillBadge />
      </div>
    </section>
  )
}

export default SkillsSection
```

> **Note:** Abhi teeno badge same skill dikhayenge ("React"). Phase 2 mein props seekhoge aur alag alag skills pass kar sakoge.

**Step 5:** `src/components/ProjectCard.jsx` bana:

```jsx
function ProjectCard() {
  const projectName = "My First React App"
  const description = "Ek simple React app jisme maine components, JSX aur folder structure seekha."
  const techUsed = "React + Vite"

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '12px 0',
      maxWidth: '400px'
    }}>
      <h3>{projectName}</h3>
      <p>{description}</p>
      <small>Tech: {techUsed}</small>
    </div>
  )
}

export default ProjectCard
```

**Step 6:** `src/App.jsx` update karo:

```jsx
import Header from './components/Header'
import SkillsSection from './components/SkillsSection'
import ProjectCard from './components/ProjectCard'

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Header />
      <hr />
      <SkillsSection />
      <hr />
      <h2>Projects</h2>
      <ProjectCard />
    </div>
  )
}

export default App
```

**Step 7:** `npm run dev` run karo aur browser mein dekho.

---

### Expected Output

```
Vin
Frontend Developer in Making 🚀

─────────────────────────────

Skills
[React] [React] [React]

─────────────────────────────

Projects

┌─────────────────────────────────┐
│ My First React App               │
│ Ek simple React app jisme...    │
│ Tech: React + Vite              │
└─────────────────────────────────┘
```

---

### 🧠 Kya ho raha hai — Trace karo khud

Ek baar code likh le phir khud trace kar:

1. Browser ne `index.html` load ki → `<div id="root">` mila
2. `main.jsx` run hua → `ReactDOM.createRoot` → `App` render
3. `App` mein `Header`, `SkillsSection`, `ProjectCard` — teeno import hain
4. `SkillsSection` mein `SkillBadge` teen baar use hua
5. React ne Virtual DOM banaya — sab components ka JSX evaluate kiya
6. Real DOM mein inject kiya `<div id="root">` ke andar
7. Browser ne UI render ki

---

### Challenge — Khud try karo (Optional)

Yeh karo bina solution dekhe:

1. Ek aur `ProjectCard` add karo `App.jsx` mein (copy-paste karke different content ke saath)
2. `Header` mein apna city bhi add karo (`const city = "Delhi"`)
3. `SkillsSection` mein 2 aur `SkillBadge` add karo
4. `App.jsx` mein ek `<footer>` tag add karo bottom pe — copyright text ke saath (`© 2024 Vin`)

Yeh sab Phase 1 ke concepts se ho jaayega — props ki zaroorat nahi abhi.

---

## Phase 1 — Poora Complete ✅

Yeh rahi poori Phase 1 ki checklist — khud verify karo:

| Topic | Doc | Clear? |
|---|---|---|
| React kya hai, Virtual DOM, Declarative | Phase 1.1 | |
| Node.js, VS Code setup, Vite project | Phase 1.2 | |
| Folder structure, file ka role, flow | Phase 1.3 | |
| JSX rules, expressions, common mistakes | Phase 1.4 | |
| Components, export/import, nesting | Phase 1.5 | |
| Practice snippet complete | Phase 1.5 | |

---

## 🚀 Phase 2 Preview — Props

Abhi `SkillBadge` mein skill hardcoded thi (`"React"`). `ProjectCard` mein project name hardcoded tha. Har baar alag data ke liye alag component banana padega — yeh scalable nahi hai.

**Phase 2 mein seekhenge Props** — data ko parent se child component mein pass karna. Tab aisa hoga:

```jsx
// App.jsx mein
<SkillBadge skill="React" />
<SkillBadge skill="JavaScript" />
<SkillBadge skill="CSS" />

<ProjectCard 
  name="Portfolio Site" 
  description="Mera personal portfolio" 
/>
```

Ek component, alag alag data — yahi reusability ka real power hai.

Jab Phase 1 poora comfortable lage — bata, Phase 2 ready karta hoon. 🔥
