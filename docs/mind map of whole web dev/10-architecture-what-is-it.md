# 10 — Architecture: Umbrella Kya Hai

> Authentication poora hua — bcrypt se Clerk tak.
> Ab dusra bada umbrella — **Architecture**.
> Yeh decide karta hai ki tumhara project internally kaise organized hai.

---

## Architecture Kya Hota Hai

Jab tum ek project banate ho — files aur folders hote hain. Sawaal yeh hai:

- Kaunsi file kahan hogi?
- Login logic kahan likhenge — same file mein jo UI hai ya alag?
- Database se baat kaunsi file karegi?
- Agar kal naya developer aaye toh kya woh bina poochhe samajh payega?

**Architecture** inhi sawaalon ka jawab hai — ek **structure** ya **pattern** jo batata hai ki code kahan jaata hai.

---

## Architecture Umbrella Ke Andar Kya Kya Aata Hai

```
ARCHITECTURE
│
├── MVC Pattern
│   → Code ko 3 parts mein divide karna: Model, View, Controller
│
├── Folder Structure
│   → Next.js mein files kahan rakhein
│
└── BFF Layer (Backend For Frontend)
    → Kya alag backend chahiye ya Next.js API routes kaafi hain?
```

---

## Kyun Zaroori Hai?

Todo app mein sab ek file mein likh sakte ho — 50 lines ka app hai.

ShopKaro mein:
- 10+ pages
- 20+ API endpoints
- Database models
- Authentication logic
- Payment logic
- Email logic

Agar sab ek jagah rakh do — 3 mahine baad tum khud nahi samjhoge ki kya likha hai.

---

## Ek Simple Example — Bina Architecture Ke Problem

```javascript
// /app/products/page.jsx — GALAT TARIKA
// Ek file mein sab kuch

export default async function ProductsPage() {
  // Database se seedha yahan
  const db = new PrismaClient()
  const products = await db.product.findMany()

  // Auth check bhi yahan
  const session = await getSession()
  if (!session) redirect('/login')

  // Business logic bhi yahan
  const discountedProducts = products.map(p => ({
    ...p,
    price: p.price * 0.9  // 10% discount
  }))

  return <div>{/* UI */}</div>
}
```

Problem: Database logic, auth logic, business logic, UI — sab ek jagah. Ek cheez change karo — poora file padho.

---

## Architecture Se Kya Fark Padta Hai

```
/app/products/page.jsx      → Sirf UI
/app/api/products/route.js  → Sirf API
/lib/products.js            → Business logic
/lib/db/products.js         → Database queries
```

Har file ka ek kaam. Dhundhna aasan, change karna aasan.

---

## ShopKaro Ka Architecture — Overview

```
FRONTEND (Jo user dekhta hai):
/app/(pages)          → React pages — sirf UI

BACKEND (API):
/app/api/             → API routes — request handle karna

BUSINESS LOGIC:
/lib/                 → Pure functions — koi framework dependency nahi

DATABASE:
/prisma/              → Schema aur queries

SHARED:
/components/          → Reusable UI pieces
/types/               → TypeScript types (agar use karo)
```

---

## Aage Kya Hai

Teeno parts alag alag cover karenge:

- **Doc 11** → MVC pattern kya hai aur Next.js mein kaise apply hota hai
- **Doc 12** → Folder structure — ShopKaro ki actual file tree
- **Doc 13** → BFF layer — kab alag backend chahiye, kab nahi

---

## Agla Doc

`11-architecture-mvc.md` — MVC kya hota hai? Model, View, Controller — yeh teeno kya hain? Next.js mein yeh exactly kaise dikhta hai? Ek concrete ShopKaro example ke saath samjhenge.
