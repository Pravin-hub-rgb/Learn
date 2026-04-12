# 17 — SSG: Static Site Generation

> Pichle doc mein SSR dekha — har request pe server render karta hai.
> Ab **SSG** — sabse fast strategy. HTML pehle se bana hua.

---

## SSG Kya Hai

**Static Site Generation** — HTML **build time pe** ban jaata hai — deploy karne se pehle.

```
BUILD TIME (ek baar, jab deploy karte ho):
Next.js → Database/data se HTML banao → Files save karo

JAB PRIYA AATI HAI:
Priya → Server → "homepage.html" file seedha do → Done
```

Server kuch process nahi karta — file seedha deta hai. Isliye **bahut fast** hota hai.

---

## SSG Kab Sahi Hai

Sirf tab jab content **sab ke liye same ho** aur **baar baar change na ho.**

```
Homepage → SSG ✓
  "ShopKaro — Best Deals Online" — sab ke liye same

About page → SSG ✓
  Company info — baar baar nahi badle

Blog post → SSG ✓
  Ek baar likha — sab padhte hain

Product listing → SSG? ← Sochna padega
  Har ghante naya product aa sakta hai — toh stale ho jaayega
```

---

## ShopKaro Mein SSG Kahan Use Karein

```
Homepage → SSG ✓
  Featured products show karo — daily ek baar rebuild karo

/about → SSG ✓
  Static content

/contact → SSG ✓
  Static content

Category pages (/products/shoes) → Debatable
  Agar products zyada nahi badle → SSG + Revalidation
  Agar real-time chahiye → SSR
```

---

## Next.js Mein SSG

Next.js App Router mein — agar component async nahi hai aur dynamic data nahi hai → automatically SSG:

```jsx
// /app/about/page.jsx — SSG automatically
export default function AboutPage() {
  return (
    <div>
      <h1>ShopKaro ke baare mein</h1>
      <p>Hum best deals provide karte hain...</p>
    </div>
  )
}
```

---

## ISR — SSG Ka Smart Version

**ISR (Incremental Static Regeneration)** — SSG + automatic refresh.

```jsx
// Yeh page SSG ki tarah fast hoga
// lekin har 60 seconds mein dobara generate hoga
export const revalidate = 60  // seconds

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true }
  })
  return <div>{/* products */}</div>
}
```

Fayda:
- Users ko fast load milta hai (cached HTML)
- Data 60 seconds mein fresh ho jaata hai

ShopKaro homepage ke liye → **ISR with revalidate = 3600** (1 ghanta) perfect hai.

---

## Teen Strategies Summary

| | SSG | ISR | SSR | CSR |
|--|-----|-----|-----|-----|
| Speed | Fastest | Fast | Medium | Medium |
| Data freshness | Build time | Configurable | Real-time | Real-time |
| SEO | Best | Best | Good | Poor |
| Server load | None | Low | High | Low |
| Best for | Static content | Semi-dynamic | Dynamic + SEO | Interactive |

---

## Agla Doc

`18-rendering-shopkaro.md` — Ab ShopKaro ka har page decide karte hain — kaunsi strategy, kyun. Yeh ek reference doc hai — project banate waqt kaam aayega.
