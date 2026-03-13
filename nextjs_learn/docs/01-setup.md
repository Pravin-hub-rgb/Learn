# 01 — Setup & Project Structure 🚀

## Pehle Ek Cheez Samjho — Internet Kaise Kaam Karta Hai?

Tu jab koi website kholta hai — jaise YouTube — toh kya hota hai?

```
Tu (Browser) → Request bhejta hai → YouTube ka Server → Response aata hai → Page dikh jaata hai
```

**Server** ek computer hai jo 24/7 chalta rehta hai aur requests ka jawab deta hai.

Abhi tak tune jo HTML/CSS/JS banaya — woh **sirf teri machine pe** chalti thi, browser mein file open karke. Koi server nahi tha.

Next.js ke saath tu ek **proper web server** banaega. Aur iske liye zaroori hai — **Node.js**.

---

## Node.js Kya Hai? 🤔

Tu jaanta hai JavaScript browser mein chalta hai, sahi?
Chrome, Firefox — yeh sab JS ko samajhte hain aur chalate hain.

**Problem:** Browser ke bahar — jaise terminal mein — JavaScript nahi chalta tha.

**Node.js ne yeh problem solve ki.**

> Node.js = JavaScript ko browser ke bahar chalane wala program.

Toh Next.js (jo JavaScript/TypeScript mein bana hai) — tera computer pe chalega Node.js ki wajah se. Simple!

---

## Node.js Install Karo

### Step 1: Website pe jao

👉 [nodejs.org](https://nodejs.org) pe jao

Do buttons dikhenge — **LTS** aur **Current**.

**LTS wala download karo** — yeh stable version hai. (LTS = Long Term Support)

### Step 2: Install karo

Normal software ki tarah install karo — Next, Next, Finish. Bas.

### Step 3: Check karo ki install hua ya nahi

**VS Code kholao** → **Terminal** → **New Terminal** (ya `Ctrl + ~`)

Yeh type karo:

```bash
node -v
```

Agar kuch aisa dikhe:

```
v20.11.0
```

**Toh Node.js install ho gaya!** 🎉

Abhi yeh bhi check karo:

```bash
npm -v
```

Kuch aisa aana chahiye:

```
10.2.4
```

---

## npm Kya Hai? 📦

Node ke saath automatically **npm** bhi install hota hai.

npm = **Node Package Manager**

Ek grocery store ki tarah soch:

- Duniya mein lakho developers ne ready-made code likha hai (packages)
- npm woh store hai jahan se tu woh code download kar sakta hai
- `npm install xyz` = "xyz wala package mujhe chahiye, download kar do"

Jab tu Next.js project banata hai — npm automatically sab zaroori cheezein download karta hai.

---

## Next.js Kya Hai?

Ab jo Node.js samajh aa gaya —

> **Next.js ek framework hai** jo React ke upar bana hai, jo Node.js pe chalta hai.

Simple chain:

```
Node.js → JavaScript/TypeScript bahar chal sakti hai
    ↓
React → UI banane ka tarika (components, state, etc.)
    ↓
Next.js → React + Routing + Server = Poori website
```

---

## Pehla Next.js Project Banao 🛠️

VS Code mein terminal kholo aur yeh likho:

```bash
npx create-next-app@latest mera-pehla-project
```

**`npx` kya hai?** — npm ka bhai. Package install kiye bina directly chalata hai.

Yeh kuch sawaal puchega — **exactly yahi jawab do:**

```
Would you like to use TypeScript? → Yes  ✅  (pehle No tha, ab Yes!)
Would you like to use ESLint? → Yes
Would you like to use Tailwind CSS? → No
Would you like to use `src/` directory? → No
Would you like to use App Router? → Yes  ✅
Would you like to customize the import alias? → No
```

### Project chalao

```bash
cd mera-pehla-project
npm run dev
```

Ab browser mein jao: **http://localhost:3000**

Agar Next.js ka default page dikh raha hai — **congratulations!** 🎉

---

## `.tsx` Kya Hota Hai? — Important!

Tune `00-typescript-basics.md` mein padha tha na ki TypeScript wali files `.tsx` hoti hain?

Ab dekh — JS project mein files hoti thi:
```
page.js
layout.js
```

TypeScript project mein hongi:
```
page.tsx
layout.tsx
```

**Bas yeh ek fark hai.** Sab kuch same hai — sirf extension badla.

> `.tsx` = TypeScript + JSX (React wala HTML jaisa syntax)

---

## Project Structure — Kya Kahan Hai?

```
mera-pehla-project/
│
├── app/                  ← SABSE IMPORTANT FOLDER
│   ├── page.tsx          ← Homepage (localhost:3000)
│   ├── layout.tsx        ← Har page ka wrapper
│   └── globals.css       ← Global styles
│
├── public/               ← Images wahan rakhna
├── package.json          ← Project ki info + dependencies
├── tsconfig.json         ← TypeScript ki settings (chhuna mat! 😄)
└── next.config.ts        ← Next.js settings
```

**`tsconfig.json` kya hai?** — TypeScript ko batata hai ki project mein kaise kaam karna hai. Next.js ne khud bana diya, tujhe kuch karna nahi.

### Routing — Folder = URL

| File Location | URL |
|--------------|-----|
| `app/page.tsx` | `localhost:3000/` |
| `app/about/page.tsx` | `localhost:3000/about` |
| `app/contact/page.tsx` | `localhost:3000/contact` |

---

## Tera Pehla Change

`app/page.tsx` kholega — default mein bohot saara code hoga. **Sab delete kar** aur yeh likh:

```tsx
export default function HomePage() {
  return (
    <div>
      <h1>Mera Pehla Next.js + TypeScript Page! 🎉</h1>
      <p>Yaar, kaam kar gaya!</p>
    </div>
  )
}
```

Save kar — browser **automatically update** ho jaega bina refresh kiye!

Abhi koi TypeScript nahi likha — bilkul normal lag raha hai na? Yahi toh baat hai, TS sirf tab dikhta hai jab types likhne hote hain. Baaki sab same hi rehta hai. 😊

---

## Aaj Ka Summary

✅ Node.js = JavaScript ko computer pe chalane wala program
✅ npm = packages download karne ka tool
✅ Next.js project banate waqt **TypeScript → Yes** karna hai
✅ Files `.tsx` extension mein hongi
✅ `tsconfig.json` khud banta hai, chhona nahi
✅ Folder = URL (Next.js mein)

---

## Agla Step

**02-components.md** — Components banayenge, aur TypeScript mein **interface** se unke props define karenge! 🧠
