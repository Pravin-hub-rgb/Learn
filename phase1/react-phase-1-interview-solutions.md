# ⚛️ React Phase 1 — Interview Solutions

> **Warning:** Pehle khud try karo questions file mein. Yeh file sirf verify karne ke liye hai.
> Har answer mein **"Interview mein kaise bolein"** section bhi hai — concise aur confident answer ke liye.

---

## 🧠 Section 1: React Basics & Concepts

---

**A1. React kya hai? Library kyun, framework kyun nahi?**

React ek open-source JavaScript library hai jo Meta (Facebook) ne banai — specifically UI (User Interface) banane ke liye. 2013 mein release hui.

**Library vs Framework fark:**

- **Library** — Tu call karta hai library ko. Tu control mein hai. React sirf UI layer handle karta hai — routing, state management, data fetching ke liye alag tools chahiye.
- **Framework** — Framework call karta hai tujhe. Woh structure impose karta hai. Angular ek framework hai — routing, HTTP, testing sab built-in deta hai aur ek specific tarike se kaam karta hai.

React deliberately library rahi — flexibility deta hai developers ko apna stack choose karne ki.

**Interview mein kaise bolein:**
> "React ek UI library hai, framework nahi, kyunki yeh sirf view layer handle karta hai. Routing ke liye React Router, state ke liye Redux ya Zustand — yeh choices developer ke haath mein hain. Framework opinionated hota hai, React flexible hai."

---

**A2. Declarative vs Imperative — React kaunsa?**

**Imperative:** Step by step batao "kaise karna hai."
```js
// Imperative — Vanilla JS
const btn = document.getElementById('btn')
const count = document.getElementById('count')
let n = 0
btn.addEventListener('click', () => {
  n++
  count.innerText = n   // manually DOM update
})
```

**Declarative:** Batao "kya chahiye" — implementation chhod do.
```jsx
// Declarative — React
const [n, setN] = useState(0)
return (
  <div>
    <p>{n}</p>
    <button onClick={() => setN(n + 1)}>+</button>
  </div>
)
// React khud DOM update karega — tu sirf state manage kar
```

React **declarative** hai. Tu UI ka desired state describe karta hai — React figure out karta hai DOM ko kaise update karna hai efficiently.

**Interview mein kaise bolein:**
> "Imperative mein hum DOM ko manually step-by-step update karte hain. Declarative mein hum describe karte hain ki UI kaisa dikhna chahiye given a state — React baaki handle karta hai. Isse code predictable aur maintainable hota hai."

---

**A3. Component-Based Architecture kya hai? Fayde?**

Component-Based Architecture mein poori UI ko **chhote, independent, reusable pieces** mein toda jaata hai — inhe components kehte hain. Har component apna structure (JSX), logic (JS), aur styling (CSS) khud manage karta hai.

**Fayde:**

**Reusability:** `Button` component ek baar banao, poori app mein use karo. Design change? Ek jagah update karo.

**Maintainability:** Bug `ProductCard` mein hai? Sirf woh file kholo. 500 line ka monolith nahi dhundna.

**Separation of Concerns:** Har component ek kaam karta hai. `Navbar` navigation handle karta hai, `CartIcon` cart handle karta hai — clear responsibilities.

**Team Collaboration:** Ek developer `Header` pe kaam kare, doosra `Footer` pe — conflict nahi.

**Testing:** Individual components independently test ho sakte hain.

**Interview mein kaise bolein:**
> "Component-based architecture mein UI ko reusable, self-contained pieces mein toda jaata hai. Isse reusability, maintainability, aur team collaboration improve hoti hai. Jaise Amazon pe `ProductCard` ek baar define kiya aur hazaron products ke liye use kiya."

---

**A4. React sirf UI library hai — matlab?**

React khud sirf yeh handle karta hai:
- Components banana
- State manage karna (`useState`, `useReducer`)
- UI render karna

React khud **nahi** deta:
- **Routing** → React Router / TanStack Router
- **Global State Management** → Redux, Zustand, Jotai
- **Data Fetching** → React Query, SWR, ya native fetch
- **Form Handling** → React Hook Form, Formik
- **HTTP Calls** → Axios, native fetch

Yeh "un-opinionated" approach hai — tu apna ecosystem choose karta hai.

**Interview mein kaise bolein:**
> "React sirf view layer hai. Routing ke liye React Router, server state ke liye React Query, global state ke liye Zustand — inhe combine karke full application banti hai. Next.js jaisa framework yeh sab ek saath provide karta hai React ke upar."

---

**A5. React kyun bana? Vanilla JS ki problem?**

Facebook pe jab UI complex hone lagi — bahut saari jagah same data dikhna, ek jagah update toh doosri jagah bhi update — Vanilla JS se manage karna nightmare tha.

**Problems:**
- Manual DOM manipulation — error-prone, tedious
- State consistency — same data multiple elements mein sync rakhna mushkil
- Scale — jaise jaise app bada hua, code unmanageable hua
- Performance — unnecessary DOM updates, no optimization

React ne in problems solve kiye — component model, declarative UI, aur Virtual DOM ke through.

---

**A6. `create-react-app` vs Vite?**

| | create-react-app | Vite |
|---|---|---|
| Build tool | Webpack (slow) | esbuild / Rollup (fast) |
| Dev server start | 30-60 seconds | Under 1 second |
| HMR speed | Slow | Near instant |
| Status | Deprecated (officially) | Actively maintained |
| Config | Hidden, hard to customize | Simple, flexible |

Vite **10-100x faster** hai development mein. `create-react-app` deprecated ho chuka hai — React team officially recommend nahi karti ab.

**Interview mein kaise bolein:**
> "create-react-app Webpack use karta tha jo slow tha. Vite esbuild use karta hai jo Rust/Go mein likha hai — dev server seconds mein start hota hai, HMR instant hai. create-react-app deprecated hai, industry mein Vite standard ban gaya hai."

---

**A7. Unidirectional Data Flow kya hai?**

React mein data **ek direction mein** flow karta hai — **parent se child mein**, props ke through.

```
App (parent)
  ↓ props
  Header (child)
  
App (parent)
  ↓ props
  ProductCard (child)
    ↓ props
    Button (grandchild)
```

Child parent ko directly data nahi bhej sakta — agar parent ko kuch batana ho toh parent ek callback function prop mein bhejta hai.

**Faida:** Data flow predictable hota hai — bug dhundhna aasaan, state changes track karna aasaan.

---

## ⚡ Section 2: Virtual DOM

---

**A8. DOM kya hota hai?**

DOM (Document Object Model) browser ka ek representation hai HTML document ka — ek **tree structure** jisme har HTML element ek node hota hai.

```html
<div>
  <h1>Hello</h1>
  <p>World</p>
</div>
```

Yeh internally ek tree ban jaata hai memory mein. JavaScript se is tree ko manipulate karte hain — nodes add karo, remove karo, update karo. Browser yeh tree render karta hai screen pe.

---

**A9. Real DOM manipulation expensive kyun?**

Jab tu DOM update karta hai, browser ko yeh sab karna padta hai:

1. **DOM tree update** karo
2. **Reflow/Layout** — affected elements ki position/size recalculate karo
3. **Repaint** — screen pe naya pixels draw karo

Yeh especially expensive ho jaata hai jab:
- Baar baar chhoti chhoti updates ho rahi hoon
- Bade DOM trees mein changes ho
- Layout-affecting properties change ho (width, height, position)

---

**A10. Virtual DOM kya hai? Real DOM se fark?**

**Virtual DOM** React ki memory mein rakhi ek **lightweight JavaScript object tree** hai — real DOM ka representation.

| Real DOM | Virtual DOM |
|---|---|
| Browser ka actual tree | JS object in memory |
| Update karna slow | Update karna fast |
| Directly screen affect karta hai | Sirf memory mein hota hai |
| Browser maintain karta hai | React maintain karta hai |

Jab state change hoti hai — React pehle Virtual DOM update karta hai (fast), phir compare karta hai purane se, aur sirf minimum changes real DOM mein apply karta hai.

---

**A11. Diffing Algorithm step by step?**

1. **State change hoti hai** component mein
2. React **naya Virtual DOM tree** generate karta hai updated state ke saath
3. **Diff algorithm** — purana Virtual DOM aur naya Virtual DOM compare karta hai
4. Dhundta hai — exactly kaunse nodes change hue
5. Sirf woh changes **real DOM pe apply** karta hai — minimum operations

React ka diffing O(n) complexity mein kaam karta hai (n = number of elements) — iske liye kuch assumptions leta hai:
- Alag type ke elements alag trees produce karte hain
- `key` prop se list items identify karta hai

---

**A12. Reconciliation kya hai?**

Reconciliation woh **poora process** hai jisme React Virtual DOM changes ko Real DOM mein sync karta hai.

Diffing ek part hai reconciliation ka — compare karna. Reconciliation mein include hai:
- Naya Virtual DOM banana
- Diff karna
- Minimum DOM operations determine karna
- Real DOM update karna

React 16 se iska engine **Fiber** kehlaata hai — yeh updates ko prioritize aur pause/resume kar sakta hai.

---

**A13. Virtual DOM ka actual benefit? Hamesha faster?**

**Benefit:** React automatically optimize karta hai — developer ko manually DOM operations manage nahi karni padti. Batching hoti hai — multiple state changes ek saath ek update mein combine ho jaati hain.

**Hamesha faster nahi:** Ek simple counter ke liye direct DOM manipulation React se faster hoga. Virtual DOM ka overhead hai — tree banana, diff karna.

React ka benefit **complex applications** mein hai jahan:
- Bahut saari cheezein ek saath change hoti hain
- Developer manually optimize nahi kar sakta
- Code maintainability + performance dono chahiye

**Interview mein kaise bolein:**
> "Virtual DOM hamesha fastest nahi hota, but developer ko manual DOM optimization se mukti deta hai. Complex apps mein React khud batching aur minimal updates handle karta hai — overall developer productivity aur app performance ka balance achha hota hai."

---

**A14. Virtual DOM analogy**

Socho ek **notebook wala essay** hai.

Ek word change karna hai:
- **Bina Virtual DOM (Direct DOM):** Poora essay erase karo, dobara likho naye word ke saath
- **Virtual DOM ke saath:** Rough draft banao, compare karo original se, sirf woh ek word erase karo aur naya likho

Virtual DOM woh rough draft hai — cheap to create, cheap to compare, aur sirf minimum real changes apply hote hain.

---

## 📝 Section 3: JSX

---

**A15. JSX kya hai? Valid JavaScript?**

JSX (JavaScript XML) ek **syntax extension** hai JavaScript ka — JavaScript mein HTML-jaisa code likhne deta hai.

```jsx
const element = <h1>Hello</h1>  // JSX
```

**Valid JavaScript nahi** — browser directly nahi samajhta. Babel ya SWC isko valid JavaScript mein transform karta hai before browser tak pohonche.

---

**A16. Browser JSX directly nahi samajhta — kaise chalta hai?**

Build process:
1. Tu JSX likhta hai `.jsx` files mein
2. Vite (with Babel/SWC plugin) JSX ko `React.createElement()` calls mein transform karta hai
3. Transformed JavaScript browser ko serve hoti hai
4. Browser normal JavaScript chalata hai

Yeh transformation **development mein on-the-fly** hoti hai, production mein `npm run build` ke time.

---

**A17. Yeh JSX internally kya banta hai?**

```jsx
const element = <h1 className="title">Hello World</h1>
```

**Transforms to:**
```js
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello World'
)
```

**Jo return hota hai woh ek object hai:**
```js
{
  type: 'h1',
  props: {
    className: 'title',
    children: 'Hello World'
  }
}
```

Yeh object ek **React Element** hai — Virtual DOM ka ek node.

---

**A18. `className` kyun, `class` nahi?**

`class` JavaScript mein **reserved keyword** hai — ES6 classes define karne ke liye (`class Animal {}`).

JSX ultimately JavaScript hai — `class` use karne se naming conflict hota. Isliye React ne `className` choose kiya attributes ke liye.

Similarly `for` reserved hai (for loops) → JSX mein `htmlFor` use karte hain `<label>` ke liye.

---

**A19. Kya problem hai? Fix karo:**

```jsx
// ❌ Problem — do sibling root elements
return (
  <h1>Title</h1>
  <p>Description</p>
)
// Error: Adjacent JSX elements must be wrapped in an enclosing tag
```

**Kyun problem:** `React.createElement` ek value return karta hai — ek element. Do elements directly return nahi ho sakte.

**Fix 1 — div wrapper:**
```jsx
return (
  <div>
    <h1>Title</h1>
    <p>Description</p>
  </div>
)
```

**Fix 2 — Fragment (preferred):**
```jsx
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
)
```

Fragment extra DOM node nahi banata — cleaner solution.

---

**A20. Fragment kya hai? `<div>` se kaise alag?**

**Fragment** (`<>...</>` ya `<React.Fragment>`) ek wrapper hai jo **DOM mein koi actual element nahi banata.**

```jsx
// div wrapper — DOM mein extra <div> aayega
<div>
  <td>Cell 1</td>
  <td>Cell 2</td>
</div>

// Fragment — DOM mein sirf <td> elements, koi wrapper nahi
<>
  <td>Cell 1</td>
  <td>Cell 2</td>
</>
```

**Kab zaroori hai Fragment:**
- `<tr>` ke andar `<td>` — table structure todna nahi
- Flexbox/Grid layout — extra div layout tod sakta hai
- Jab clean DOM chahiye

**Verbose `<Fragment>` kab:** Jab `key` prop dena ho list rendering mein.

---

**A21. `{}` curly braces — kya likh sakte hain, kya nahi?**

`{}` mein **JavaScript expressions** likhte hain.

**✅ Likh sakte hain:**
```jsx
{name}                           // variable
{2 + 2}                          // calculation
{isActive ? 'Yes' : 'No'}        // ternary
{items.map(i => <p>{i}</p>)}     // array method
{Math.max(5, 10)}                // function call
{`Hello ${name}`}                // template literal
{user.name}                      // object property
```

**❌ Nahi likh sakte:**
```jsx
{if (true) { "hello" }}          // statement
{for (let i=0; i<5; i++) {}}    // statement
{let x = 5}                      // declaration
{{name: "Vin"}}                  // object directly (render nahi hoga)
```

**Rule:** Koi bhi cheez jo ek value produce kare — expression. Jo action perform kare value ke bina — statement.

---

**A22. `onClick={handleClick}` vs `onClick={handleClick()}` — fark?**

```jsx
// ✅ Reference — function tab call hoga jab click hoga
<button onClick={handleClick}>Click</button>

// ❌ Immediately Invoked — component render hote hi call ho jaayega!
<button onClick={handleClick()}>Click</button>
```

`handleClick()` — parentheses ke saath — function **immediately execute** ho jaata hai. Return value (jo usually `undefined` hota hai) `onClick` ko assign ho jaata hai.

**Agar argument pass karna ho:**
```jsx
<button onClick={() => handleClick(userId)}>Click</button>
// Arrow function reference diya — click pe arrow function call hogi, jo handleClick(userId) call karegi
```

---

**A23. Inline styles JSX mein — HTML se fark?**

```jsx
// HTML — string
<h1 style="color: red; font-size: 24px">Hello</h1>

// JSX — JavaScript object (double curly braces)
<h1 style={{ color: 'red', fontSize: '24px' }}>Hello</h1>
```

**Fark:**
- JSX mein style ek **JavaScript object** hota hai, string nahi
- Outer `{}` — JSX expression
- Inner `{}` — object literal
- Property names **camelCase** mein: `font-size` → `fontSize`, `background-color` → `backgroundColor`
- Values **strings ya numbers** — `'red'`, `'24px'`, `16` (px default unit numbers ke liye)

---

**A24. Yeh code screen pe kya dikhayega?**

```jsx
const count = 0
return <div>{count && <p>Hello</p>}</div>
```

**Screen pe dikhega: `0`**

Kyun? JavaScript mein `&&` operator:
- `0 && anything` → `0` return karta hai (falsy short-circuit)
- React `0` ko render karta hai — `false`, `null`, `undefined` ko nahi karta

Yeh ek **common bug** hai.

**Fix:**
```jsx
{count > 0 && <p>Hello</p>}   // boolean comparison
{!!count && <p>Hello</p>}      // double negation
{Boolean(count) && <p>Hello</p>}
```

---

**A25. `false`, `null`, `undefined` render hote hain?**

**Nahi** — React inhe silently ignore karta hai. Screen pe kuch nahi dikhega.

```jsx
{false}      // → kuch nahi
{null}       // → kuch nahi
{undefined}  // → kuch nahi
{true}       // → kuch nahi (yeh bhi!)

// Isliye yeh pattern kaam karta hai:
{isLoggedIn && <Dashboard />}
// Agar isLoggedIn false hai → false render nahi hoga
```

**Exception:** `0` aur `""` (empty string) — yeh render hote hain!

---

**A26. JSX mein comments kaise likhte hain?**

```jsx
function App() {
  // Yeh JS comment hai — JSX ke bahar, theek hai

  return (
    <div>
      {/* Yeh JSX comment hai — curly braces zaroori hain */}
      <h1>Hello</h1>
      
      {/*
        Multi-line comment
        aisa karte hain
      */}
    </div>
  )
}
```

JSX ke andar `//` ya `/* */` directly nahi chalte — `{/* */}` use karo.

---

**A27. Self-closing tags kyun zaroori hain?**

HTML mein void elements `<img>`, `<input>`, `<br>` naturally self-closing hain — closing tag optional tha. JSX XML-based syntax follow karta hai — **har tag properly closed hona chahiye.**

```jsx
// ❌ Invalid JSX
<img src="photo.jpg">
<input type="text">

// ✅ Valid JSX
<img src="photo.jpg" />
<input type="text" />
<br />
```

Custom components bhi:
```jsx
<MyComponent />           // no children
<MyComponent></MyComponent>  // same, verbose form
```

---

**A28. `htmlFor` kya hai?**

`for` attribute HTML `<label>` mein use hota hai — input se associate karne ke liye. JSX mein `for` JavaScript **reserved keyword** hai (for loops ke liye). Isliye React mein `htmlFor` use karte hain.

```jsx
// ❌ Warning
<label for="email">Email</label>

// ✅ Correct
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

Accessibility ke liye important hai — screen readers label aur input ko associate karte hain `for`/`id` ke through.

---

**A29. Yeh code valid hai?**

```jsx
const element = <img src="photo.jpg">
```

**Nahi — invalid JSX.**

JSX mein self-closing tags properly close karne zaroori hain:

```jsx
const element = <img src="photo.jpg" />  // ✅
```

---

**A30. Multi-line JSX return mein parentheses kyun?**

JavaScript mein **Automatic Semicolon Insertion (ASI)** hoti hai. Agar `return` ke baad newline ho aur parentheses nahi:

```jsx
function Component() {
  return         // ← JS yahan semicolon insert kar deta hai → return;
    <div>        // yeh line kabhi reach nahi hogi
      <h1>Hi</h1>
    </div>
}
// Component undefined return karega — silent bug!
```

**Fix — `return (` same line pe:**
```jsx
function Component() {
  return (       // ← parenthesis same line — ASI nahi hogi
    <div>
      <h1>Hi</h1>
    </div>
  )
}
```

---

## 🧩 Section 4: Components

---

**A31. Functional Component kya hai? Basic structure?**

Ek **JavaScript function** jo JSX return karta hai — yahi functional component hai.

```jsx
function ComponentName() {        // 1. Capital letter se naam
  const data = "some value"       // 2. Logic yahan

  return (                        // 3. JSX return
    <div>
      <h1>{data}</h1>
    </div>
  )
}

export default ComponentName      // 4. Export
```

**Rules:**
- Naam Capital letter se
- JSX return karna (ya null)
- Ek root element return karna

---

**A32. Capital letter mandatory kyun?**

React JSX mein lowercase aur uppercase alag treat karta hai:

- **Lowercase** (`<div>`, `<p>`, `<span>`) → React inhe **HTML elements** samajhta hai
- **Uppercase** (`<MyComponent>`, `<Header>`) → React inhe **custom React components** samajhta hai aur function call karta hai

```jsx
function myComponent() { return <h1>Hi</h1> }  // ❌ lowercase

<myComponent />  // React ise HTML element dhundega — nahi milega, error/undefined
<MyComponent />  // React MyComponent function call karega ✅
```

---

**A33. Function declaration vs Arrow function — fark?**

```jsx
// Function Declaration
function MyComponent() {
  return <h1>Hello</h1>
}

// Arrow Function
const MyComponent = () => {
  return <h1>Hello</h1>
}
```

**React mein practical fark almost nahi** — dono valid components hain, dono same kaam karte hain.

**Technical differences:**
- Function declarations **hoisted** hoti hain — file ke kisi bhi jagah define karo, pehle bhi use kar sakte ho. Arrow functions nahi.
- `this` binding alag hai — but functional components mein `this` use hi nahi karte.

Industry mein dono common hain. Consistency important hai — project mein ek style choose karo.

---

**A34. Component `null` return kare toh kya hota hai?**

Kuch render nahi hoga — component screen pe invisible hoga. Koi error nahi aayega.

```jsx
function ConditionalComponent({ isVisible }) {
  if (!isVisible) return null   // ← kuch render nahi

  return <div>I am visible!</div>
}
```

Yeh **conditional rendering** ka ek valid pattern hai — kisi condition pe poora component hide karna.

---

**A35. Component ko doosre mein use karna?**

```jsx
// Button.jsx
function Button() {
  return <button>Click me</button>
}
export default Button

// Card.jsx
import Button from './Button'    // ← import

function Card() {
  return (
    <div>
      <h2>Card Title</h2>
      <Button />                 // ← use karo JSX tag ki tarah
    </div>
  )
}
export default Card
```

Component ko JSX tag ki tarah use karte hain — `<Button />`. Naam Capital letter se kyunki React use component samjhe, HTML element nahi.

---

**A36. `React.StrictMode` kya hai?**

`React.StrictMode` ek wrapper component hai jo **development mein extra checks aur warnings** enable karta hai. Production build mein koi effect nahi.

Kya karta hai:
- Deprecated APIs ka use detect karta hai
- Unexpected side effects identify karne ke liye components ko intentionally **double render** karta hai development mein
- Legacy string ref usage warn karta hai

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**Double render karna kyun?** Agar tera component side effects se affected hai (jo nahi hona chahiye render mein), StrictMode se pata chal jaayega.

---

**A37. `return` se pehle component mein kya likh sakte hain?**

Koi bhi valid JavaScript:

```jsx
function MyComponent() {
  // ✅ Variables
  const name = "Vin"
  let count = 0

  // ✅ Calculations
  const doubled = count * 2

  // ✅ Conditionals
  const greeting = count > 0 ? "Positive" : "Zero or negative"

  // ✅ Functions define karna
  const handleClick = () => {
    console.log("clicked")
  }

  // ✅ Array operations
  const items = ['a', 'b', 'c']
  const upperItems = items.map(i => i.toUpperCase())

  // ✅ Hooks (useState, useEffect etc.) — Phase 3 mein detail mein
  // const [state, setState] = useState(0)

  return (
    <div onClick={handleClick}>
      <h1>{name}</h1>
      <p>{greeting}</p>
    </div>
  )
}
```

---

## 📦 Section 5: Export / Import

---

**A38. `export default` vs named export?**

| | export default | Named export |
|---|---|---|
| Syntax | `export default MyComp` | `export const fn = () => {}` |
| Per file limit | Sirf **ek** | **Multiple** |
| Import syntax | `import Anything from './file'` | `import { exactName } from './file'` |
| Naam flexibility | Koi bhi naam de sakte ho | Exact naam chahiye (ya `as` se rename) |

**Use kab:**
- `export default` — Main component ya main export of a file
- Named exports — Utility functions, constants, multiple exports ek file se

---

**A39. Default import mein naam koi bhi rakh sakte hain — sahi ya galat?**

**Technically sahi — practically galat convention.**

```jsx
// MyComponent.jsx
export default function MyComponent() { ... }

// App.jsx
import Anything from './MyComponent'     // technically valid ✅
import XYZ from './MyComponent'          // technically valid ✅
import MyComponent from './MyComponent'  // ✅ preferred — same naam
```

Default import mein naam flexible hai kyunki ek hi default export hai file mein — confusion nahi hogi. **But convention yahi hai ki same naam rakho** — readability ke liye.

---

**A40. Yeh import sahi hai?**

```jsx
import { MyComponent } from './MyComponent'
// jab file mein: export default MyComponent
```

**Galat hai.** ❌

Default export ke liye curly braces nahi lagate:
```jsx
import MyComponent from './MyComponent'   // ✅ correct
```

Curly braces sirf named exports ke liye:
```jsx
// agar file mein: export const MyComponent = () => {}
import { MyComponent } from './MyComponent'  // ✅ named export ke liye
```

---

**A41. Ek file mein kitne `export default`?**

**Sirf ek.** Agar do likhoge — syntax error aayega.

Named exports unlimited ho sakte hain.

---

**A42. Named export import karte waqt naam alag rakhna?**

`as` keyword use karo:

```jsx
// utils.js
export function formatDate(date) { ... }
export function capitalize(str) { ... }

// App.jsx
import { formatDate as fd, capitalize as cap } from './utils'

fd(new Date())   // formatDate call ho raha hai
cap("hello")     // capitalize call ho raha hai
```

Useful jab naming conflict ho ya naam chhota rakhna ho.

---

**A43. `./` aur `../` kya matlab?**

```
src/
├── components/
│   ├── Button.jsx
│   └── Card.jsx
├── App.jsx
└── utils.js
```

```jsx
// App.jsx se:
import Button from './components/Button'   // ./  = current folder (src/) se start
import utils from './utils'               // ./utils = src/utils.js

// Card.jsx se:
import Button from './Button'             // ./  = current folder (components/) se start
import App from '../App'                  // ../ = ek folder upar (src/) phir App
```

`./` — current file ke folder se start
`../` — ek folder upar jaao
`../../` — do folder upar

---

**A44. `useState` — default ya named import?**

**Named import** — curly braces ke saath.

```jsx
import { useState } from 'react'          // ✅ named import
import { useState, useEffect } from 'react'  // ✅ multiple named imports

import useState from 'react'              // ❌ galat — kaam nahi karega
```

React package mein `useState`, `useEffect`, `useRef` — sab named exports hain. `React` khud default export hai:

```jsx
import React, { useState, useEffect } from 'react'
// React = default, useState/useEffect = named
```

---

## 🗂️ Section 6: Project Structure & Setup

---

**A45. `<div id="root">` ka role?**

`index.html` mein yeh ek **empty div** hai — poori React application isi ke andar inject hoti hai JavaScript ke through.

```html
<div id="root"></div>  <!-- Initially empty -->
```

`main.jsx` mein:
```jsx
ReactDOM.createRoot(document.getElementById('root'))
// ↑ Yeh div select kiya

.render(<App />)
// ↑ App component iske andar render kiya
```

React SPA mein sirf yeh ek div hoti hai — React dynamically content change karta rehta hai iske andar.

---

**A46. `main.jsx` ka kaam? `ReactDOM.createRoot()` kya karta hai?**

`main.jsx` — **React application ka entry point.** Yahaan se sab shuru hota hai.

`ReactDOM.createRoot(domNode)` — Ek React "root" create karta hai specified DOM node pe. React 18 ka naya Concurrent Mode API.

```jsx
ReactDOM.createRoot(document.getElementById('root'))  // root create kiya
  .render(                                             // render shuru karo
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
```

Yeh `App` component ko evaluate karta hai, Virtual DOM banata hai, aur real DOM mein inject karta hai `#root` div ke andar.

---

**A47. `node_modules` kya hai? Git mein kyun nahi?**

`node_modules` folder mein saari **installed npm packages** hain — React, ReactDOM, Vite, aur unki saari dependencies. Thousands of files, hundreds of MBs.

**Git mein kyun nahi:**
1. **Bahut bada** — unnecessary storage aur bandwidth
2. **Reproducible** — `package.json` + `package-lock.json` hai, koi bhi `npm install` se same packages install kar sakta hai
3. **OS-specific** — kuch packages platform-specific binary files hain

`.gitignore` mein `node_modules/` listed hota hai. Kisi doosri machine pe clone karo aur `npm install` run karo — sab dobara download ho jaata hai.

---

**A48. `dependencies` vs `devDependencies`?**

```json
{
  "dependencies": {
    "react": "^18.2.0",        // Production mein bhi chahiye
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",          // Sirf development mein chahiye
    "eslint": "^8.55.0"
  }
}
```

**`dependencies`** — Libraries jo teri actual app ko **runtime pe** chahiye. React, React DOM, React Router, Axios — yeh sab yahan.

**`devDependencies`** — Libraries jo sirf **development/build process** mein chahiye. Vite, ESLint, testing frameworks, TypeScript — production bundle mein include nahi hote.

Install commands:
```bash
npm install react          # → dependencies mein jaayega
npm install -D eslint      # → devDependencies mein jaayega (-D flag)
```

---

**A49. `package-lock.json` kyun? Manually edit karna?**

`package-lock.json` **exact versions lock** karta hai.

`package.json` mein `"react": "^18.2.0"` — yeh `18.2.0` se `18.x.x` tak koi bhi version allow karta hai. Agar aaj install karo toh `18.2.0` aaye, 6 mahine baad install karo toh `18.3.1` aaye — inconsistency.

`package-lock.json` exact version record karta hai jo actually install hua — future mein same version install hoga.

**Manually edit karna:** **Kabhi nahi.** Yeh automatically update hota hai `npm install` se.

---

**A50. `npm run dev`, `build`, `preview` mein fark?**

```json
"scripts": {
  "dev": "vite",           // Development server
  "build": "vite build",   // Production build
  "preview": "vite preview" // Production build preview
}
```

**`npm run dev`** — Development server start karo. JSX transform on-the-fly, HMR enabled, source maps included. Slow (unoptimized) but developer-friendly.

**`npm run build`** — Optimized production bundle banao `dist/` folder mein. Code minify hota hai, tree-shaking hoti hai (unused code remove), assets optimize hote hain.

**`npm run preview`** — `dist/` folder ka built version locally serve karo. Production mein kaise dikhega — woh check karne ke liye. `npm run build` ke baad use karo.

---

**A51. HMR kya hai? Kya faida?**

**HMR (Hot Module Replacement)** — Code change karo aur save karo — browser **bina full page reload** ke automatically updated module ko replace kar deta hai.

**Faida:**
- **State preserve** hoti hai — ek form fill kar raha tha, code save kiya, form ka data wahi rahega (full reload mein chala jaata)
- **Faster feedback** — save karo, 0.1 second mein browser update
- **Developer experience** — flow break nahi hota

Vite ka HMR industry mein sabse fast maana jaata hai.

---

**A52. `public/` vs `src/assets/` — kya fark?**

| | `public/` | `src/assets/` |
|---|---|---|
| Access | Direct URL se: `/logo.png` | JS mein import karke |
| Vite processing | **Nahi** — as-is serve | **Haan** — optimize, hash |
| Use case | Favicon, robots.txt, static files | Images, SVGs jo components use karein |

```jsx
// src/assets/ wali file — import karo
import logo from './assets/logo.png'
<img src={logo} />

// public/ wali file — direct URL
<img src="/logo.png" />
```

**Rule of thumb:** Components ke andar use hone wali images → `src/assets/`. Special static files → `public/`.

---

**A53. `vite.config.js` mein `plugins: [react()]` kya karta hai?**

`@vitejs/plugin-react` Vite ko React support deta hai:

- **JSX Transform** — `.jsx` files ko valid JavaScript mein convert karta hai (Babel/SWC use karke)
- **Fast Refresh (HMR)** — React-specific HMR enable karta hai — state preserve karta hai component updates ke during
- **React-specific optimizations** — Development warnings, proper error messages

Iske bina Vite JSX files ko process nahi kar paata.

---

**A54. `"type": "module"` kya indicate karta hai?**

```json
{
  "type": "module"
}
```

Node.js ko batata hai ki yeh project **ES Modules** use karta hai — `import`/`export` syntax.

Default (bina `"type": "module"`) — CommonJS hota hai — `require()`/`module.exports` syntax.

Modern JavaScript aur React projects ES Modules use karte hain. Browser bhi natively ES Modules support karta hai (`<script type="module">`).

---

## 🔥 Section 7: Conceptual / Tricky Questions

---

**A55. React SPA kya hai practically?**

**SPA (Single Page Application)** — Server se sirf **ek baar HTML file** aati hai. Baad mein page navigate karne pe server se naya HTML nahi aata — React JavaScript se DOM dynamically update karta hai.

```
Traditional Multi-Page App:
User clicks "About" → Browser requests /about.html from server → Server sends new HTML → Page reloads

React SPA:
User clicks "About" → React Router URL change karta hai → React new component render karta hai → No page reload
```

**Faida:** Fast navigation, smooth user experience, no full page reloads.

**Nuksaan:** Initial load slow (JS bundle load hona padta hai), SEO challenges (content JS se render hota hai — crawlers se miss ho sakta hai) → Next.js SSR se yeh solve hota hai.

---

**A56. 1000 baar render, 1 cheez change — React kya update karega?**

**Sirf woh changed part** — Virtual DOM diffing ki wajah se.

Process:
1. State change hoti hai
2. React naya Virtual DOM banata hai 1000 components ke saath
3. Diff algorithm compare karta hai — sirf woh ek node different hai
4. Sirf woh **ek DOM operation** real DOM pe apply hota hai

Yahi React ki efficiency hai — developer ko manually track nahi karna ki kya update karna hai.

---

**A57. Yeh valid JSX hai?**

```jsx
const element = (
  <>
    <h1>Title</h1>
    <p>Para</p>
  </>
)
```

**Haan — perfectly valid.** ✅

`<>...</>` Fragment hai — multiple children ko wrap karta hai bina extra DOM node ke. JSX expression ek root element chahiye — Fragment woh root element provide karta hai.

---

**A58. Yeh code mein kya galat hai?**

```jsx
function mycard() {
  return (
    <div>
      <h2>Card</h2>
    </div>
  )
}
```

**Problem:** Function naam `mycard` — lowercase `m` se shuru.

React mein component naam Capital letter se shuru hona **mandatory** hai. Agar `<mycard />` use karoge, React HTML element samjhega — custom component nahi. Error ya unexpected behavior aayega.

**Fix:**
```jsx
function MyCard() {    // ← Capital M
  return (
    <div>
      <h2>Card</h2>
    </div>
  )
}
```

---

**A59. Yeh valid JSX hai?**

```jsx
function App() {
  const user = { name: "Vin", age: 20 }
  return <p>{user}</p>
}
```

**Valid JSX syntax hai — but runtime error dega.**

React **objects directly render nahi kar sakta.** Error aayega:
```
Error: Objects are not valid as React children
```

**Fix:**
```jsx
<p>{user.name}</p>          // ✅ property access
<p>{user.name}, {user.age}</p>  // ✅
<p>{JSON.stringify(user)}</p>   // ✅ debugging ke liye
```

---

**A60. React aur React DOM — alag packages kyun?**

`react` package — **core React logic**: components, hooks, state, Virtual DOM. Yeh platform-agnostic hai.

`react-dom` package — **browser-specific renderer**: Virtual DOM ko browser ke real DOM mein convert karta hai.

**Kyun alag:** React ek hi codebase se multiple platforms support karta hai — sirf renderer alag hota hai:

- `react-dom` → Browser
- `react-native` → iOS + Android
- `react-three-fiber` → 3D (Three.js)
- `react-pdf` → PDF generation

Core React logic (`react` package) reuse hoti hai — sirf renderer change hota hai. Ek hi architecture, multiple targets.

---

**A61. `export default` + named export ek saath — valid?**

**Haan — valid hai.** ✅

```jsx
// Component.jsx
export const VERSION = '1.0'         // named export
export const helper = () => {}       // named export

function Component() {               // default export
  return <div>Component</div>
}

export default Component
```

```jsx
// App.jsx
import Component, { VERSION, helper } from './Component'
// Default pehle, phir named curly braces mein
```

Ek file mein ek default + unlimited named exports — sab valid.

---

**A62. "Explain the flow from index.html to what appears on screen" — Step by step**

Yeh ek common aur important interview question hai. Confidently bolna seekho:

**Step 1 — Browser request:**
User `localhost:5173` open karta hai. Browser Vite dev server se request karta hai.

**Step 2 — `index.html` serve hoti hai:**
Vite `index.html` bhejta hai. Browser parse karta hai.

**Step 3 — Empty root div:**
Browser `<div id="root"></div>` parse karta hai — abhi completely empty.

**Step 4 — Script tag:**
`<script type="module" src="/src/main.jsx">` — browser `main.jsx` load karta hai.

**Step 5 — Vite transformation:**
Vite `main.jsx` (aur sab imported files) ko on-the-fly process karta hai — JSX → JavaScript.

**Step 6 — `main.jsx` execute:**
`ReactDOM.createRoot(document.getElementById('root'))` — `#root` div select hoti hai, React root create hota hai.

**Step 7 — `.render(<App />)` call:**
React `App` component evaluate karta hai. `App` apne child components evaluate karta hai. Sab ka JSX → React Elements (JavaScript objects) — **Virtual DOM** banta hai.

**Step 8 — Real DOM mein inject:**
React Virtual DOM ko Real DOM operations mein convert karta hai aur `#root` div ke andar sab inject karta hai.

**Step 9 — Browser render:**
Browser naya DOM paint karta hai — user screen pe UI dekhta hai.

**Step 10 — HMR (development mein):**
Code change → Vite changed module push karta hai → React sirf woh component re-render karta hai.

---

> **Sab answers padh liye?**
> Ab wapas questions file mein jao — bina dekhke answers likho ya bolke practice karo.
> Jab confident feel karo — Phase 2 ke liye ready ho. 🔥
