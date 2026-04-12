# 42 — Pagination vs Infinite Scroll: Kab Kaunsa?

> Pichle doc mein lazy loading aur skeletons samjhe.
> Ab **Pagination vs Infinite Scroll** — 500 products efficiently kaise dikhao.

---

## Problem — Sab Ek Saath Nahi Dikha Sakte

ShopKaro mein 500 products hain. Sab ek saath load karo toh:
- 500 database rows ek saath fetch
- 500 image requests
- Page bajenge → Slow → User bounce karega

Solution: **Thoda thoda load karo.**

---

## Option 1 — Pagination

Pages mein divide karo — Page 1, Page 2, Page 3...

```
[Page 1] 1-12 products    → [Next →]
[Page 2] 13-24 products   → [← Prev] [Next →]
[Page 3] 25-36 products   → [← Prev]
```

**Backend:**
```javascript
// /app/api/products/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 12

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip: (page - 1) * limit,  // Page 2 → skip 12, Page 3 → skip 24
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.product.count()
  ])

  return Response.json({
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
}
```

**Frontend:**
```jsx
function ProductsPage() {
  const [page, setPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['products', page],
    queryFn: () => fetch(`/api/products?page=${page}`).then(r => r.json())
  })

  return (
    <div>
      <div className="products-grid">
        {data?.products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* Pagination Controls */}
      <div>
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          ← Prev
        </button>
        <span>Page {page} of {data?.pagination.totalPages}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page === data?.pagination.totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
```

---

## Option 2 — Infinite Scroll

Scroll karo → Automatically aur load ho jaao.

```
[12 products]
↓ scroll
[12 aur load]
↓ scroll
[12 aur load]
```

**Kab use karein:**
- Social media feed (Instagram, Twitter)
- Discovery browsing — user specific cheez nahi dhundh raha

**Limitation:** User kisi cheez pe wapas nahi ja sakta easily. "Product 47 pe wapas jaana hai" — scroll karte raho.

---

## ShopKaro Ke Liye — Kaunsa?

**Products listing → Pagination** ✓

Kyun:
- User specific product dhundh raha hai (Nike Shoes, size 10)
- Filter/search use karta hai
- "Page 3 mein tha woh product" — bookmark kar sakta hai URL se
- SEO ke liye alag pages better

**Infinite scroll kab:** Agar "Browse karo, dekhte hain kya milta hai" type experience chahiye — fashion apps mein common.

---

## Performance Umbrella — Complete Hua

```
PERFORMANCE
│
├── Images          → Doc 40 ✓
├── Lazy Loading    → Doc 41 ✓
└── Pagination      → Doc 42 ✓ (YEH)
```

---

## Agla Doc

`43-accessibility-what-is-it.md` — Daswa umbrella — **Accessibility**. ShopKaro sirf "normal" users ke liye nahi — keyboard users, screen reader users, color blind users — sab ke liye kaam karna chahiye.
