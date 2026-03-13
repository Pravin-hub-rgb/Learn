# 03 — Props 📦

## Pehle Ek Problem Dekho

Tune `Hero` component banaya. Mast hai. Par ek problem hai —

```tsx
<Hero />
<Hero />
<Hero />
```

Teeno same dikhenge. Hamesha same heading, same text.

Agar tu teen alag hero sections banana chahaye — teen alag components banayega? 😩
Copy paste karke `Hero2.tsx`, `Hero3.tsx`?

**Nahi. Iska solution hai — Props.**

---

## Props Kya Hote Hain?

> Props = Parent component se Child component ko data bhejne ka tarika.

Bas itna hi hai.

Lekin ruk — definition yaad karna samajhna nahi hota. Seedha example dekh.

HTML mein tune yeh dekha hoga:

```html
<img src="photo.jpg" alt="meri photo" width="200">
<input type="text" placeholder="Naam likho">
```

`src`, `alt`, `placeholder` — yeh sab **attributes** hain jo tu HTML elements ko de raha hai.

React mein components ke saath bhi yahi hota hai — unhe data dene ke liye **props** use karte hain:

```tsx
<Hero title="Namaste!" subtitle="Meri website pe aao" />
<Hero title="About Me" subtitle="Main ek developer hun" />
<Hero title="Contact" subtitle="Baat karte hain" />
```

Ab teeno alag! Ek hi component — teen different versions. 🔥

---

## React Ka Golden Rule — One Way Data Flow 🧠

Yeh dimag mein chipka le. Aage sab isi pe khada hai.

```
Parent
  ↓
 Child
  ↓
GrandChild
```

Data hamesha **upar se neeche** jaata hai.

- Parent decide karta hai data kya hai
- Child sirf receive karta hai
- Child directly Parent ka data change **nahi** kar sakta

Ek aur tarike se soch — Maa ghar ka menu decide karti hai. Baccha sirf khata hai. Baccha kitchen mein jaake khud menu change nahi karta. 😄

---

## TypeScript Mein Props — Interface! 🔵

Yahan se TypeScript ka asli kaam shuru hota hai.

JS mein props bina kisi check ke aate the — kuch bhi de do, component le leta tha. TypeScript mein **pehle batana padta hai ki kaunse props aayenge aur unka type kya hoga.**

Iske liye **`interface`** use karte hain — `00-typescript-basics.md` mein padha tha!

### Bina TypeScript ke (risky 😬)

```jsx
function Hero({ title, subtitle }) {
  return <h1>{title}</h1>
  // title kuch bhi ho sakta hai — number, boolean, kuch bhi
  // runtime pe pata chalega galti
}
```

### TypeScript ke saath (safe ✅)

```tsx
// Pehle interface banao — props ka "blueprint" / "contract"
interface HeroProps {
  title: string
  subtitle: string
}

// Phir component mein use karo
export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}
```

Woh `{ title, subtitle }: HeroProps` kya hai?

- `{ title, subtitle }` → props ko destructure kar raha hai (seedha naam se access)
- `: HeroProps` → TypeScript ko bata raha hai ki "yeh props `HeroProps` interface ke hisaab se honge"

### Interface = Contract hai Parent aur Child ke beech

`HeroProps` mein likha hai `title: string` — toh parent ko **string hi bhejna padega.** Koi compromise nahi.

```tsx
// ❌ TS Error! title number nahi ho sakta
<Hero title={42} subtitle="Hello" />

// ❌ TS Error! subtitle missing hai — contract toot raha hai
<Hero title="Namaste" />

// ✅ Contract pura hua
<Hero title="Namaste" subtitle="Meri website pe aao" />
```

VS Code mein **red underline** aa jaayega — production tak jaane se pehle hi pata chal jaata hai! 🎯

---

## Curly Braces `{}` JSX Mein

```tsx
<h1>{title}</h1>
```

Woh `{}` kyun? — JSX mein agar **JavaScript ki koi value** dikhani ho toh `{}` mein daalo.

```tsx
<h1>Hello</h1>       // hamesha "Hello" dikhega — static
<h1>{title}</h1>     // jo bhi title prop aaye woh dikhega — dynamic
<p>{2 + 2}</p>       // 4 dikhega — JS expression bhi chal sakta hai
```

---

## Optional Props — `?`

Kabhi kabhi koi prop zaroor nahi hota. Jaise `emoji` — ho bhi sakta hai, na bhi.

```tsx
interface CardProps {
  title: string
  description: string
  emoji?: string       // ← ? matlab optional hai
}

export default function Card({ title, description, emoji }: CardProps) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
      {emoji && <div style={{ fontSize: '40px' }}>{emoji}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
```

```tsx
// Dono valid hain ✅
<Card title="Coding" description="JS seekh raha hun" emoji="💻" />
<Card title="Design" description="UI banata hun" />  // emoji nahi diya — chalega
```

---

## `children` Prop — Yeh Magic Nahi Hai 🌟

Log isko dekh ke confuse ho jaate hain. Sach yeh hai —

**`children` bhi ek prop hi hai.** Bas React automatically pass karta hai.

HTML mein tu likhta tha:

```html
<div class="box">
  <p>Andar ka content</p>
  <button>Click</button>
</div>
```

`div` ke andar kuch bhi daal sakte ho. Same React components ke saath bhi — `children` se:

```tsx
<Card>
  <p>Andar ka content</p>
  <button>Click</button>
</Card>
```

Jo bhi `<Card>` ke opening aur closing tag ke beech mein ho — woh `children` ban jaata hai.

Actually React internally yeh kar raha hai:

```tsx
Card({ children: <p>Andar ka content</p> })
```

Samjha? Children alag system nahi — **prop hi hai.**

### TypeScript mein `children` ka type — `React.ReactNode`

```tsx
import React from 'react'

interface CardProps {
  children: React.ReactNode    // ← "andar kuch bhi aa sakta hai"
}

export default function Card({ children }: CardProps) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px' }}>
      {children}
    </div>
  )
}
```

`React.ReactNode` ka matlab — text, HTML elements, doosre components, numbers — **kuch bhi** andar aa sakta hai.

```tsx
// Teeno valid hain ✅
<Card><p>Simple paragraph</p></Card>

<Card>
  <h2>Heading</h2>
  <p>Paragraph</p>
  <button>Button</button>
</Card>

<Card>Sirf text bhi chal jaata hai</Card>
```

### Real Use — Layout Component

`children` ka sabse common use layout banane mein hota hai:

```tsx
// app/components/PageLayout.tsx
import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
      {children}
    </div>
  )
}
```

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <PageLayout>
      <Navbar />
      <h1>Mera Page</h1>
      <p>Yeh content center mein aayega!</p>
    </PageLayout>
  )
}
```

---

## Mini Project — Reusable Card Component 🛠️

```tsx
// app/components/Card.tsx

interface CardProps {
  title: string
  description: string
  emoji: string
  color?: string       // optional — default blue rahega
}

export default function Card({ title, description, emoji, color = '#0070f3' }: CardProps) {
  return (
    <div style={{
      border: `2px solid ${color}`,
      borderRadius: '12px',
      padding: '24px',
      margin: '10px',
      width: '220px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <div style={{ fontSize: '44px', marginBottom: '10px' }}>{emoji}</div>
      <h3 style={{ color, margin: '0 0 8px' }}>{title}</h3>
      <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{description}</p>
    </div>
  )
}
```

```tsx
// app/page.tsx
import Card from './components/Card'

export default function HomePage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Meri Skills 💪</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Card emoji="💻" title="Coding" description="Next.js + TypeScript seekh raha hun" />
        <Card emoji="🎨" title="Design" description="UI basics jaanta hun" color="#e94560" />
        <Card emoji="🚀" title="Learning" description="Roz kuch naya seekhta hun" color="#2ecc71" />
      </div>
    </div>
  )
}
```

Teen alag cards — ek hi component se! 🎉

---

## Ab Ek Problem Dekhte Hain 😵 — Props Drilling

Abhi tak sab smooth tha. Par soch —

Agar tera app bada ho jaaye toh?

Maan le tu ek `theme` prop pass karna chahta hai — `"dark"` ya `"light"`. Aur yeh theme sabse neeche wale `Button` component ko chahiye.

Structure kuch aisa hai:

```
App
 ↓
Page
 ↓
Layout
 ↓
Dashboard
 ↓
ProfileCard
 ↓
Button  ← isko theme chahiye
```

Toh kya karna padega?

```tsx
// App se shuru
function App() {
  return <Page theme="dark" />
}

// Page ko sirf forward karna hai
function Page({ theme }: { theme: string }) {
  return <Layout theme={theme} />
}

// Layout ko bhi sirf forward karna hai
function Layout({ theme }: { theme: string }) {
  return <Dashboard theme={theme} />
}

// Dashboard ko bhi...
function Dashboard({ theme }: { theme: string }) {
  return <ProfileCard theme={theme} />
}

// ProfileCard ko bhi...
function ProfileCard({ theme }: { theme: string }) {
  return <Button theme={theme} />
}

// Finally Button actually use karta hai
function Button({ theme }: { theme: string }) {
  return <button className={theme}>Click Me</button>
}
```

**Yahi hai Props Drilling.**

Ek prop ko deeply nested component tak pahunchane ke liye beech ke **saare components sirf forwarding** ka kaam kar rahe hain — chahe unhe zarurat ho ya na ho.

### Real Pain Kya Hai?

Ab imagine kar — `theme` ka naam change karna hai `colorMode` mein.

**6 files edit karni padegi.** 😩

Ya ek naya level add kiya tree mein — phir se sab files touch.

Code tightly coupled ho gaya. Ek jagah change — sab jagah asar.

---

## Props Galat Nahi Hain! 🙏

Yeh zaroori hai samajhna.

Props **perfect hain** — jab:
- Direct Parent → Child communication ho
- Tree chhota ho
- Data clearly ek hi component ke liye ho

Props **problem** bante hain — jab data "global type" ka ho, jaise theme, logged-in user, language setting. Tab har jagah drilling karna painful ho jaata hai.

---

## Toh Solution Kya Hai?

Isi problem ko solve karta hai — **Context API.**

Ek jagah data rakho — koi bhi component seedha wahan se le le. Beech mein drilling nahi.

Woh hum **agle module (3.1-context.md)** mein properly seekhenge.

---

## Aaj Ka Summary

✅ Props = parent se child ko data dene ka tarika — one way flow  
✅ `interface` se props ka contract define karte hain TypeScript mein  
✅ `{ props }: InterfaceName` — yeh syntax yaad rakhna  
✅ `?` se optional props  
✅ `children: React.ReactNode` — component ke andar kuch bhi pass karo  
✅ Props Drilling = deep nesting mein prop forward karte rehna — painful hota hai  
✅ Solution = Context API — agla module!  

---

## Agla Step

**04-state.md** — `useState` hook aur TypeScript ke saath `useState<string>()` wala **generic type**! 🔄