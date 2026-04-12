# 24 — REST: API Design Ka Sabse Common Tarika

> Pichle doc mein API umbrella ka overview hua.
> Ab **REST** — ShopKaro mein yahi use karenge.

---

## REST Kya Hai

**REST (Representational State Transfer)** — ek set of conventions jo batata hai API endpoints kaise name karo aur kaise structure karo.

REST mein har cheez ek **resource** hai — aur resource ke upar actions karte hain HTTP methods se.

```
Resource: products
Actions:  GET (list), GET (single), POST (create), PUT (update), DELETE
```

---

## REST URL Conventions

### Pattern: `/api/resource` aur `/api/resource/:id`

```
GET    /api/products          → Saare products ki list
GET    /api/products/123      → Product ID 123 ka detail
POST   /api/products          → Naya product banao
PUT    /api/products/123      → Product 123 update karo
DELETE /api/products/123      → Product 123 delete karo
```

### Nested Resources:

```
GET    /api/orders/5/items    → Order 5 ke saare items
POST   /api/orders/5/items    → Order 5 mein item add karo
```

---

## ShopKaro Ke REST Endpoints

### Auth:
```
POST   /api/auth/signup            → Register
POST   /api/auth/login             → Login
POST   /api/auth/logout            → Logout
POST   /api/auth/forgot-password   → Reset email bhejo
POST   /api/auth/reset-password    → Naya password set karo
POST   /api/auth/verify-email      → Email verify karo
```

### Products:
```
GET    /api/products               → List (with filters)
GET    /api/products/:id           → Single product
```

### Cart:
```
GET    /api/cart                   → Logged-in user ka cart
POST   /api/cart                   → Item add karo
PATCH  /api/cart/:itemId           → Quantity update karo
DELETE /api/cart/:itemId           → Item remove karo
```

### Orders:
```
GET    /api/orders                 → User ki orders list
GET    /api/orders/:id             → Single order detail
POST   /api/orders                 → Naya order banao
```

### Payments:
```
POST   /api/payments/create        → Payment initiate karo
POST   /api/payments/verify        → Payment verify karo (Razorpay callback)
POST   /api/webhooks/razorpay      → Razorpay webhook
```

---

## Request aur Response — Kaisa Dikhta Hai

### POST /api/auth/login — Request:
```json
{
  "email": "priya@gmail.com",
  "password": "mypassword123"
}
```

### Success Response (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "priya@gmail.com",
    "name": "Priya Sharma"
  }
}
```

### Error Response (401):
```json
{
  "error": "Invalid email or password"
}
```

---

## Next.js Mein REST — Route Handler

```javascript
// /app/api/products/route.js

// GET /api/products
export async function GET(request) {
  // URL se query params nikalo
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')  // /api/products?category=shoes

  const products = await prisma.product.findMany({
    where: category ? { category: { slug: category } } : {},
    include: { category: true }
  })

  return Response.json(products)
}
```

```javascript
// /app/api/products/[id]/route.js

// GET /api/products/123
export async function GET(request, { params }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  return Response.json(product)
}
```

---

## REST Ki Ek Limitation

Ek problem hai REST mein — **over-fetching aur under-fetching**:

```
Frontend ko chahiye: Product ka sirf naam aur price
REST deta hai: Poora product — naam, price, description, stock, imageUrl, etc.
→ Over-fetching

Frontend ko chahiye: Product + seller info ek baar mein
REST mein: 2 alag requests karne padenge
→ Under-fetching
```

Yeh GraphQL solve karta hai — agla doc.

---

## Summary

| | |
|--|--|
| **REST kya hai** | URL + HTTP Method se resources manage karna |
| **Naming convention** | `/api/resource`, `/api/resource/:id` |
| **ShopKaro mein** | Sab endpoints REST style mein |

---

## Agla Doc

`25-api-graphql.md` — REST ka alternative — **GraphQL**. Kya hai, REST se kab better hai, aur ShopKaro mein use karein ya nahi.
