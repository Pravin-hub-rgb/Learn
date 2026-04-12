# 35 — Server-Side Caching: Database Ko Bar Bar Hit Mat Karo

> Pichle doc mein CDN — static files ka global distribution.
> Ab **Server-Side Caching** — database results save karna.

---

## Problem — Har Request Pe Database Hit

ShopKaro pe 1000 users hain. Sab homepage kholte hain.

Bina cache:
```
User 1 → Homepage → Database: "Featured products do" → Result
User 2 → Homepage → Database: "Featured products do" → Same result
User 3 → Homepage → Database: "Featured products do" → Same result
... 1000 baar same query
```

1000 database queries — sab same result ke liye. Slow aur resource waste.

---

## Solution — Cache Karo

Pehli baar database se nikalo — save karo. Agli baar saved result do.

```
User 1 → Homepage → Database → Result → Cache mein save karo
User 2 → Homepage → Cache se do (database mat kholo)
User 3 → Homepage → Cache se do
```

---

## Next.js Mein Built-in Caching

Next.js App Router mein `fetch` automatically cache karta hai:

```javascript
// Yeh result cache ho jaata hai automatically
const products = await fetch('/api/products', {
  next: { revalidate: 3600 }  // 1 ghante mein refresh karo
})

// Kabhi cache mat karo — hamesha fresh
const orders = await fetch('/api/orders', {
  cache: 'no-store'
})
```

Server components mein Prisma use karte ho toh — React memoization se thoda caching hoti hai, lekin explicit nahi.

---

## Redis — Production Mein Cache

**Redis** ek in-memory database hai — super fast, cache ke liye perfect.

```javascript
// Concept — actual setup thoda complex hai
import redis from '@/lib/redis'

async function getFeaturedProducts() {
  // Pehle cache check karo
  const cached = await redis.get('featured-products')
  if (cached) return JSON.parse(cached)

  // Cache miss → Database se nikalo
  const products = await prisma.product.findMany({
    where: { featured: true }
  })

  // Cache mein save karo — 1 ghante ke liye
  await redis.setex('featured-products', 3600, JSON.stringify(products))

  return products
}
```

---

## ShopKaro V1 Mein Caching Strategy

```
Homepage featured products → Next.js revalidate: 3600 (1 ghanta)
Product listing → Next.js revalidate: 300 (5 minute)
Product detail → Next.js revalidate: 60 (1 minute — stock fresh chahiye)
Cart / Orders → cache: 'no-store' (hamesha fresh)
User data → cache: 'no-store'
```

Redis — **baad mein** add karo jab traffic badhe. V1 mein Next.js built-in caching kaafi hai.

---

## Caching Umbrella — Complete Hua

```
CACHING
│
├── Browser Storage   → Doc 33 ✓
├── CDN               → Doc 34 ✓
└── Server Cache      → Doc 35 ✓ (YEH)
```

---

## Agla Doc

`36-payments-what-is-it.md` — Aathwa umbrella — **Payments**. Priya pay karti hai — yeh flow exactly kaise kaam karta hai? Razorpay, Stripe, Webhooks — sab samjhenge. E-commerce ka sabse important part.
