# 39 — Performance: Umbrella Kya Hai

> Payments complete hua — Razorpay, Webhooks.
> Ab nawa umbrella — **Performance**.
> App fast feel karti hai ya slow — yeh decide karta hai user ruka ya chala gaya.

---

## Performance Kyun Matter Karta Hai

Ek study mein — **1 second delay = 7% conversion drop.**

E-commerce mein:
- ShopKaro slow hai → Priya frustrated → Competitor pe chali gayi → Sale lost

Performance sirf "nice to have" nahi — **business critical** hai.

---

## Performance Umbrella Ke Andar Kya Kya

```
PERFORMANCE
│
├── Images Optimize Karna        → Doc 40
├── Lazy Loading + Skeleton      → Doc 41
└── Pagination vs Infinite Scroll → Doc 42
```

---

## Kya Slow Karta Hai App Ko — Common Culprits

ShopKaro ke liye most relevant:

```
1. Badi images → Sabse common problem
   500KB image vs 50KB WebP — 10x fark

2. Saari products ek saath load → 500 products = slow
   Pagination ya infinite scroll use karo

3. JavaScript bundle bada → Tree shaking, code splitting

4. Database slow query → Indexes add karo

5. Ek baar mein sab load karna → Lazy load karo
```

---

## Perceived Performance vs Actual Performance

Ek interesting concept:

**Actual performance** — kitne milliseconds lagte hain.

**Perceived performance** — user ko kitna fast **lagta** hai.

Skeleton loaders se perceived performance improve hoti hai:
```
Bina skeleton: Blank screen → Suddenly content → Jarring
Skeleton se:   Gray placeholder → Content → Smooth
```

Actual time same ho sakta hai — lekin feel better hota hai.

---

## Agla Doc

`40-performance-images.md` — **Images** — sabse easy win. Next.js Image component se automatic optimization, WebP, lazy loading — sab ek component mein.
