# 03 - Props (Next.js + TypeScript)

Bhai aaj hum Props ko waise samjhenge jaise naturally samajh aana chahiye.
Koi jaldi nahi. Koi jump nahi. Step by step build karenge.

---

# 🟢 Step 1 — Props Kya Hote Hain?

Simple definition:

Props ka matlab hota hai **Parent component se Child component ko data bhejna**.

Bas.

Lekin ruk.
Definition yaad kar lena samajhna nahi hota.
Samajhte hain properly.

---

# 🧠 React Ka Golden Rule — One Way Data Flow

React me data hamesha upar se neeche flow karta hai.

Diagram dekho:

Parent
↓
Child
↓
GrandChild

Matlab:

Parent decide karega data kya hai.
Child bas receive karega.
Child directly parent ka data change nahi karega.

Ye rule dimag me chipka le.
Aage sab isi pe khada hai.

---

# 🟢 Step 2 — Basic Example

## App.tsx

```tsx
function App() {
  return <Hero title="Welcome" />;
}
```

## Hero.tsx

```tsx
interface HeroProps {
  title: string;
}

function Hero({ title }: HeroProps) {
  return <h1>{title}</h1>;
}

export default Hero;
```

Yaha kya ho raha hai?

App → Hero ko "Welcome" bhej raha hai.
Hero usko receive kar raha hai.

Bas itna hi props hai.

---

# 🧠 Props = Contract

Ye important hai.

Interface kya hai?

Ye ek agreement hai.
Parent aur Child ke beech contract.

HeroProps me likha hai:

```
title: string
```

Toh parent ko string hi bhejna padega.

Agar number bheja?
TypeScript chillayega.

Iska fayda?
Future bugs kam.
Code predictable.

---

# 🟢 Optional Props

```tsx
interface HeroProps {
  title: string;
  subtitle?: string;
}
```

Question mark ka matlab?

Optional.
Matlab parent bheje ya na bheje.

Ye flexibility deta hai.

---

# 🟢 children — Ye Magic Nahi Hai

Log confuse ho jaate hain.

Sach kya hai?

children bhi ek prop hi hai.
Bas React automatically pass karta hai.

Example:

```tsx
<Card>
  <h1>Hello</h1>
</Card>
```

Actually ho kya raha hai?

Card({ children })

React ye kar raha hai internally.

## Card.tsx

```tsx
interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}
```

children koi alag system nahi hai.
Ye bhi prop hi hai.

---

# 🟢 Mini Project — Theme Example

Ab thoda real karte hain.

## page.tsx

```tsx
function HomePage() {
  return <ThemeWrapper theme="dark" />;
}
```

## ThemeWrapper.tsx

```tsx
interface ThemeWrapperProps {
  theme: string;
}

function ThemeWrapper({ theme }: ThemeWrapperProps) {
  return <Button theme={theme} />;
}
```

## Button.tsx

```tsx
interface ButtonProps {
  theme: string;
}

function Button({ theme }: ButtonProps) {
  return <button className={theme}>Click Me</button>;
}
```

Flow kya hua?

page.tsx → ThemeWrapper → Button

Simple.
Sab control me.

---

# 🤔 Ab Ek Sawal...

Ab tak sab smooth tha.

Lekin soch.

Agar structure bada ho jaye toh?

Diagram dekho:

page.tsx
↓
layout.tsx
↓
Dashboard
↓
ProfileCard
↓
Button

Ab maan le theme Button ko chahiye.

Toh kya karna padega?

page.tsx → layout.tsx ko pass karega.
layout.tsx → Dashboard ko pass karega.
Dashboard → ProfileCard ko pass karega.
ProfileCard → Button ko pass karega.

Even agar layout.tsx ko theme ki zarurat hi nahi.

---

# 😵 Props Drilling Start

Yahi hai props drilling.

Jab ek prop ko deeply nested component tak pahunchane ke liye
beech ke components ko sirf forwarding ka kaam karna padta hai.

Diagram with forwarding:

page.tsx
↓ theme
layout.tsx
↓ theme
Dashboard
↓ theme
ProfileCard
↓ theme
Button (finally uses it)

Ab honestly bata.

layout.tsx ko theme ki zarurat thi?
Nahi.

Phir bhi receive kar raha hai.
Phir pass kar raha hai.

Clean lag raha hai?
Nahi.

---

# 😓 Real Pain

Ab imagine kar:

* Theme ka type change hua
* Prop ka naam change hua
* Ek level add hua

Multiple files edit.

Code tightly coupled ho gaya.

---

# 🧠 Important Note

Props galat nahi hain.

Props perfect hain:

* Direct parent → child communication ke liye
* Small trees ke liye
* Clear structure ke liye

Lekin jab data "global type" ho jaye
jaise theme, user, language

Tab drilling problem ban jaati hai.

---

# 🚀 Next Step

Isi problem ko solve karta hai — Context API.

Aur woh hum next file (3.1-context.md) me properly samjhenge.

Yaha tak agar clear hai
Toh props ka foundation strong hai.
