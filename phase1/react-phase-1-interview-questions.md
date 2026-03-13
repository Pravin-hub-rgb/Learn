# ⚛️ React Phase 1 — Interview Questions

> **Coverage:** React fundamentals, Virtual DOM, JSX, Components, Export/Import, Setup concepts
> **Level:** Fresher / Junior Frontend Developer
> **Tip:** Pehle khud socho — phir solutions file dekho. Agar answer nahi aata toh phase docs dobara padho, phir wapis aao.

---

## 🧠 Section 1: React Basics & Concepts

**Q1.**
React kya hai? Isko library kyun kehte hain, framework kyun nahi?

---

**Q2.**
Declarative aur Imperative programming mein kya fark hai? React kaunsa approach follow karta hai aur kyun?

---

**Q3.**
Component-Based Architecture kya hota hai? Iske kya fayde hain ek large application mein?

---

**Q4.**
React sirf ek UI library hai — iska kya matlab hai? Routing aur state management ke liye React khud kya deta hai?

---

**Q5.**
React ko Facebook ne kyun banaya? Vanilla JavaScript se kya problem thi badi applications mein?

---

**Q6.**
`create-react-app` aur Vite mein kya fark hai? Aajkal Vite kyun prefer kiya jaata hai?

---

**Q7.**
React mein "Unidirectional Data Flow" ka kya matlab hai?

---

## ⚡ Section 2: Virtual DOM

**Q8.**
DOM kya hota hai? Browser isko kaise use karta hai?

---

**Q9.**
Real DOM ko directly manipulate karna expensive kyun hota hai?

---

**Q10.**
Virtual DOM kya hota hai? Yeh Real DOM se kaise alag hai?

---

**Q11.**
React ka "Diffing Algorithm" kya karta hai? Step by step explain karo.

---

**Q12.**
"Reconciliation" kya hota hai React mein?

---

**Q13.**
Virtual DOM use karne ka actual performance benefit kya hai? Kya Virtual DOM hamesha faster hota hai?

---

**Q14.**
Ek analogy deke Virtual DOM explain karo apne words mein.

---

## 📝 Section 3: JSX

**Q15.**
JSX kya hai? Yeh valid JavaScript hai ya nahi?

---

**Q16.**
Browser JSX directly samajhta hai? Agar nahi, toh kaise chalti hai React app?

---

**Q17.**
Yeh JSX internally kya ban jaata hai?
```jsx
const element = <h1 className="title">Hello World</h1>
```

---

**Q18.**
JSX mein `class` ki jagah `className` kyun use karte hain?

---

**Q19.**
Yeh code kya problem hai aur kaise fix karoge?
```jsx
return (
  <h1>Title</h1>
  <p>Description</p>
)
```

---

**Q20.**
Fragment kya hota hai? `<div>` wrapper se kaise alag hai? Kab use karte hain?

---

**Q21.**
JSX mein `{}` curly braces ka kya kaam hai? Iske andar kya likh sakte hain aur kya nahi?

---

**Q22.**
Yeh dono mein kya fark hai?
```jsx
<button onClick={handleClick}>Click</button>
<button onClick={handleClick()}>Click</button>
```

---

**Q23.**
JSX mein inline styles kaise likhte hain? HTML wali style se kaise alag hai?

---

**Q24.**
Yeh code screen pe kya dikhayega aur kyun?
```jsx
const count = 0
return <div>{count && <p>Hello</p>}</div>
```

---

**Q25.**
`false`, `null`, `undefined` JSX mein render hote hain ya nahi?

---

**Q26.**
JSX mein comments kaise likhte hain?

---

**Q27.**
Self-closing tags JSX mein kyun zaroori hain? Example do.

---

**Q28.**
`htmlFor` kya hai? Kyun use karte hain `for` ki jagah?

---

**Q29.**
Yeh code valid hai?
```jsx
const element = <img src="photo.jpg">
```

---

**Q30.**
Multi-line JSX return mein parentheses `()` kyun zaroori hain?

---

## 🧩 Section 4: Components

**Q31.**
Functional component kya hota hai? Iska basic structure kya hota hai?

---

**Q32.**
React component ka naam Capital letter se start karna kyun mandatory hai?

---

**Q33.**
Yeh dono mein kya fark hai? Dono valid hain?
```jsx
function MyComponent() {
  return <h1>Hello</h1>
}

const MyComponent = () => {
  return <h1>Hello</h1>
}
```

---

**Q34.**
Component `null` return kare toh kya hota hai?

---

**Q35.**
Ek component ko doosre component ke andar use karna kaise karte hain? Example do.

---

**Q36.**
`React.StrictMode` kya hai? `main.jsx` mein kyun use karte hain?

---

**Q37.**
Component ke andar kya likh sakte hain `return` se pehle?

---

## 📦 Section 5: Export / Import

**Q38.**
`export default` aur named export (`export const`) mein kya fark hai?

---

**Q39.**
Default import mein naam koi bhi rakh sakte hain — yeh statement sahi hai ya galat? Explain karo.

---

**Q40.**
Yeh import sahi hai?
```jsx
import { MyComponent } from './MyComponent'
// jab file mein hai: export default MyComponent
```

---

**Q41.**
Ek file mein kitne `export default` ho sakte hain?

---

**Q42.**
Named export import karte waqt naam alag rakhna ho toh kaise karoge?

---

**Q43.**
`./` aur `../` import path mein kya matlab hota hai?

---

**Q44.**
React library se `useState` import karna — default import hai ya named import?

---

## 🗂️ Section 6: Project Structure & Setup

**Q45.**
`index.html` mein `<div id="root">` ka kya role hai?

---

**Q46.**
`main.jsx` ka kaam kya hai? Isme `ReactDOM.createRoot()` kya karta hai?

---

**Q47.**
`node_modules` folder kya hota hai? Isko Git mein push kyun nahi karte?

---

**Q48.**
`package.json` mein `dependencies` aur `devDependencies` mein kya fark hai? Example do.

---

**Q49.**
`package-lock.json` kyun exist karta hai? Manually edit karna chahiye?

---

**Q50.**
`npm run dev`, `npm run build`, aur `npm run preview` mein kya fark hai?

---

**Q51.**
HMR (Hot Module Replacement) kya hota hai? Development mein iska kya faida hai?

---

**Q52.**
`public/` folder aur `src/assets/` folder mein kya fark hai? Kaun si cheez kahan rakhte hain?

---

**Q53.**
`vite.config.js` mein `plugins: [react()]` ka kya kaam hai?

---

**Q54.**
`"type": "module"` `package.json` mein kya indicate karta hai?

---

## 🔥 Section 7: Conceptual / Tricky Questions

**Q55.**
React ek SPA (Single Page Application) banata hai — iska kya matlab hai practically?

---

**Q56.**
Agar ek React component 1000 baar render ho aur sirf 1 cheez change hui ho — React poora DOM update karega ya sirf changed part? Kaise?

---

**Q57.**
JSX mein yeh valid hai?
```jsx
const element = (
  <>
    <h1>Title</h1>
    <p>Para</p>
  </>
)
```

---

**Q58.**
Neeche wale code mein kya galat hai?
```jsx
function mycard() {
  return (
    <div>
      <h2>Card</h2>
    </div>
  )
}
```

---

**Q59.**
Yeh code valid JSX hai?
```jsx
function App() {
  const user = { name: "Vin", age: 20 }
  return <p>{user}</p>
}
```

---

**Q60.**
React aur React DOM — dono alag packages kyun hain? Ek hi package mein kyun nahi?

---

**Q61.**
Ek component file mein `export default` bhi hai aur ek named export bhi — dono ek saath use karna valid hai?

---

**Q62.**
Interview mein pucha: "Explain the flow from index.html to what appears on screen in a React app." — Step by step batao.

---

> **Solutions chahiye?** → `react-phase-1-solutions.md` file dekho.
> **Koi concept clear nahi?** → Wapas Phase 1.1 – 1.5 docs padho, phir wapis aao.
