# 41 — Lazy Loading & Skeleton Screens

> Pichle doc mein image optimization — Next.js Image component.
> Ab **Lazy Loading aur Skeleton Screens** — perceived performance tricks.

---

## Lazy Loading Kya Hai

**Lazy Loading** = sirf woh load karo jo user abhi dekh raha hai.

```
Product listing page — 50 products hain

Bina lazy load:
Page open → 50 products ke saare images load → Slow

Lazy load ke saath:
Page open → Sirf screen pe dikhne wale 8 images load
Priya scroll karti hai → Agli 8 load
Aur scroll → Aur load
```

Network bandwidth save hoti hai — fast feel aata hai.

---

## Next.js Mein Lazy Loading — Automatic

```jsx
// Next.js Image → By default lazy load
<Image src="..." alt="..." width={300} height={300} />
// Jab viewport mein aaye tab hi load hoga

// Regular components ke liye — dynamic import
import dynamic from 'next/dynamic'

// Yeh component sirf tab load hoga jab zaroorat ho
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>Chart load ho raha hai...</div>
})
```

---

## Skeleton Screens — Loading Ka Better UI

Jab data load ho raha ho — **blank screen ya spinning loader mat dikhao.**

Skeleton screen dikhao — gray placeholder jo actual content ki shape mein hota hai.

```jsx
// /components/ProductCardSkeleton.jsx
export default function ProductCardSkeleton() {
  return (
    <div className="product-card skeleton">
      {/* Gray animated placeholders */}
      <div style={{
        width: '100%',
        height: '250px',
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        animation: 'pulse 1.5s infinite'
      }} />
      <div style={{
        width: '70%',
        height: '20px',
        backgroundColor: '#e0e0e0',
        margin: '12px 0 8px',
        borderRadius: '4px'
      }} />
      <div style={{
        width: '40%',
        height: '16px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px'
      }} />
    </div>
  )
}
```

```jsx
// Products listing mein use karo
function ProductsPage() {
  const { data: products, isLoading } = useQuery(...)

  if (isLoading) {
    // Real product cards ki jagah skeleton dikhao
    return (
      <div className="products-grid">
        {Array(8).fill(0).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="products-grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
```

---

## Next.js Loading.jsx — Built-in Skeleton Support

Next.js App Router mein — `loading.jsx` file banao, automatically use hoga:

```jsx
// /app/products/loading.jsx
// Yeh automatically tab dikhega jab products page load ho raha ho

export default function ProductsLoading() {
  return (
    <div className="products-grid">
      {Array(8).fill(0).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
```

---

## Suspense — Component Level Loading

```jsx
import { Suspense } from 'react'

function ProductPage() {
  return (
    <div>
      <h1>Product</h1>
      <Suspense fallback={<div>Reviews load ho rahe hain...</div>}>
        <ReviewsSection />  {/* Yeh slow hai → Separate load hoga */}
      </Suspense>
    </div>
  )
}
```

Page ready hai — reviews alag load ho rahe hain. User page use kar sakta hai.

---

## Agla Doc

`42-performance-lists.md` — **Pagination vs Infinite Scroll** — 500 products ek saath mat dikhao. Kaunsa tarika kab sahi hai.
