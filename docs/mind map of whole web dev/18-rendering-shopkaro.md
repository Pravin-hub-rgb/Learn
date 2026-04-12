# 18 — ShopKaro: Har Page Ki Rendering Strategy

> Pichle teen docs mein CSR, SSR, SSG samjhe.
> Ab ShopKaro ka har page decide karte hain — kaunsi strategy, kyun.
> Yeh ek **reference doc** hai — project banate waqt yaad aayega.

---

## ShopKaro Pages — Complete Decision Table

| Page | URL | Strategy | Kyun |
|------|-----|----------|------|
| Homepage | `/` | SSG + ISR | Sab ke liye same, fast load chahiye |
| Products listing | `/products` | SSR | SEO zaroori, filters real-time |
| Product detail | `/products/[id]` | SSR | Stock real-time, SEO important |
| Cart | `/cart` | CSR | Private, fast interactions |
| Checkout | `/checkout` | CSR | Heavy user interactions |
| Orders list | `/orders` | SSR | Auth required, fresh data |
| Order detail | `/orders/[id]` | SSR | Fresh status chahiye |
| Profile | `/profile` | CSR | Private, user edits |
| Login / Signup | `/login`, `/signup` | SSG | Static forms, fast load |
| About / Contact | `/about` | SSG | Static content |

---

## Har Page Ko Detail Mein Samjho

### Homepage `/` — SSG + ISR

```jsx
// /app/page.jsx

export const revalidate = 3600  // Har 1 ghante mein rebuild

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 8
  })

  return (
    <div>
      <HeroBanner />
      <FeaturedProducts products={featuredProducts} />
    </div>
  )
}
```

**Kyun SSG+ISR:** Homepage sabse zyada visit hoti hai — speed critical hai. Featured products daily badte nahi — 1 ghante ka cache theek hai.

---

### Product Detail `/products/[id]` — SSR

```jsx
// /app/products/[id]/page.jsx

export default async function ProductPage({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!product) notFound()  // 404 page

  return (
    <div>
      <h1>{product.name}</h1>
      <p>₹{product.price}</p>
      <p>{product.stock > 0 ? `${product.stock} bacha hai` : 'Out of stock'}</p>
      <AddToCartButton productId={product.id} />  {/* CSR component */}
    </div>
  )
}
```

**Kyun SSR:** Stock real-time dikhna chahiye. SEO ke liye product name, description Google index kare. "Add to Cart" button CSR component hoga — page mein mix ho sakta hai.

---

### Cart `/cart` — CSR

```jsx
// /app/cart/page.jsx
'use client'

import { useCartStore } from '@/store/cartStore'  // Zustand — aage samjhenge

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}
```

**Kyun CSR:** Cart mein +/- buttons, remove — yeh sab instant hone chahiye. Private page — SEO ki zaroorat nahi. State Zustand mein hogi (aage samjhenge).

---

### Login Page `/login` — SSG

```jsx
// /app/(auth)/login/page.jsx
// Koi async nahi, koi data fetch nahi → Automatic SSG

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />  {/* Yeh 'use client' component hoga — form handling ke liye */}
    </div>
  )
}
```

**Kyun SSG:** Form static hai — sab ke liye same. Fast load chahiye — user pehle yahan aata hai.

---

## Mix Karna — SSR Page + CSR Component

Ek page mein dono ho sakte hain:

```
Product Page (SSR):
  - Product info, stock → Server se fetch (SSR)
  - "Add to Cart" button → Client mein kaam karta hai (CSR component)
  - Reviews section → Server se fetch (SSR)
  - "Write Review" form → Client (CSR component)
```

```jsx
// /app/products/[id]/page.jsx — SSR page
export default async function ProductPage({ params }) {
  const product = await getProductById(params.id)  // Server pe

  return (
    <div>
      <h1>{product.name}</h1>
      {/* Yeh CSR component hai — 'use client' inside */}
      <AddToCartButton productId={product.id} stock={product.stock} />
    </div>
  )
}
```

```jsx
// /components/AddToCartButton.jsx — CSR component
'use client'

export default function AddToCartButton({ productId, stock }) {
  function handleAdd() {
    // Cart mein add karo — Zustand se
  }

  return (
    <button onClick={handleAdd} disabled={stock === 0}>
      {stock > 0 ? 'Cart Mein Daalo' : 'Out of Stock'}
    </button>
  )
}
```

Yeh mix karna **normal** hai — almost har Next.js app mein hota hai.

---

## Rendering Umbrella — Complete Hua

```
RENDERING
│
├── CSR  → Doc 15 ✓
├── SSR  → Doc 16 ✓
├── SSG  → Doc 17 ✓
└── ShopKaro decisions → Doc 18 ✓ (YEH)
```

---

## Agla Doc

`19-database-what-is-it.md` — Chautha bada umbrella — **Database**. Data permanently kahan store hoga? PostgreSQL kya hai, MongoDB se kya fark hai, Prisma kya karta hai — yeh sab samjhenge.
