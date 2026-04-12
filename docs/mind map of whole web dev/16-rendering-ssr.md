# 16 — SSR: Server Side Rendering

> Pichle doc mein CSR dekha — browser mein render hota hai.
> Ab **SSR** — Server Side Rendering. Yeh Next.js ka default hai.

---

## SSR Kya Hai

**Server Side Rendering** — Har request pe server HTML banata hai aur complete page bhejta hai.

```
1. Priya /products/123 kholti hai
2. Server → Database se product data nikalta hai
3. Server → HTML banata hai — data pehle se andar hota hai
4. Complete HTML → Browser ko bhejta hai
5. Priya ko page dikhta hai — data pehle se wahan hai
```

Browser ko JavaScript run karne ka wait nahi karna.

---

## Next.js Mein SSR — Default Behavior

Next.js App Router mein **sab kuch by default SSR** hai — `'use client'` likho tabhi CSR hoga.

```jsx
// /app/products/[id]/page.jsx
// Koi 'use client' nahi → Yeh SSR hai automatically

// async function → Server pe run hoti hai
export default async function ProductPage({ params }) {
  // Yeh server pe chalega — seedha database se
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  })

  // Complete HTML return hoga — data already inside
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  )
}
```

Database call **server pe** hoti hai — browser tak kabhi nahi pohnchaती.

---

## SSR Ke Fayde

**SEO** — Google crawler ko complete HTML milta hai — sab index ho jaata hai

**Fast first paint** — Data pehle se HTML mein hai — loading state nahi

**Secure** — Database credentials server pe hain — browser mein nahi aate

**Real-time data** — Har request pe fresh data — stock kabhi outdated nahi

---

## SSR Ki Problems

**Har request pe server load** — 1000 log ek saath product dekh rahe hain → 1000 database calls

**Slow TTFB** (Time To First Byte) — Server process karta hai pehle — phir bhejta hai

**Server chahiye** — Static hosting pe deploy nahi kar sakte SSR pages (Vercel pe ho jaata hai)

---

## ShopKaro Mein SSR Kahan Use Karein

```
/products → SSR ✓
  Kyun: Google pe "shoes online" search hoga — SEO zaroori
        Products real-time dikhne chahiye

/products/[id] → SSR ✓
  Kyun: SEO important (product name Google pe index ho)
        Stock real-time — "Only 2 left" accurate ho

/orders → SSR ✓ (with auth check)
  Kyun: Fresh order data chahiye
        Auth check server pe karo — secure
```

---

## Auth Check SSR Mein

Protected pages mein session check server pe hoti hai:

```jsx
// /app/orders/page.jsx

import { getSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'

export default async function OrdersPage() {
  const session = await getSession()

  // Server pe check → Redirect → No flash of content
  if (!session) {
    redirect('/login')
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.userId }
  })

  return <div>{/* orders list */}</div>
}
```

CSR mein auth check karo toh — pehle page dikhta hai phir redirect hota hai (ugly). SSR mein server pe hi redirect — smooth.

---

## SSR vs CSR — Quick Decision

```
Kya yeh page Google pe search hoga?
  → Haan → SSR

Kya data har user ke liye alag hai? (private page)
  → Haan → CSR ya SSR with auth

Kya bahut fast interactions chahiye (buttons, real-time)?
  → Haan → CSR

Kya data real-time update chahiye (stock, prices)?
  → Haan → SSR
```

---

## Summary

| | |
|--|--|
| **SSR kya hai** | Har request pe server HTML banata hai |
| **Next.js mein** | Default behavior — `'use client'` nahi likhna |
| **Kab use karein** | Public pages, SEO important, real-time data |
| **Kab mat karo** | Heavy user interactions (cart operations) |

---

## Agla Doc

`17-rendering-ssg.md` — Teesri strategy — **SSG**. Yeh sabse fast hoti hai — HTML pehle se bana hua hota hai. ShopKaro ka homepage aur "About" page yahi use karenge.
