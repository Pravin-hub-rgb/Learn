# 12 — Folder Structure: ShopKaro Ki File Tree

> Pichle doc mein MVC pattern samjha — View, Controller, Model.
> Ab woh theory practice mein — **ShopKaro ka actual folder structure.**

---

## ShopKaro Ki Complete Folder Structure

```
shopkaro/
│
├── /app                          → Next.js App Router — sab kuch yahan
│   │
│   ├── layout.jsx                → Root layout — har page ke around wrapper
│   ├── page.jsx                  → Homepage (/)
│   │
│   ├── /(auth)                   → Auth pages — grouped, alag layout
│   │   ├── layout.jsx            → Auth pages ka layout (simple, no navbar)
│   │   ├── /login/page.jsx       → Login page (/login)
│   │   ├── /signup/page.jsx      → Signup page (/signup)
│   │   └── /forgot-password/page.jsx
│   │
│   ├── /products                 → Products section
│   │   ├── page.jsx              → Product listing (/products)
│   │   └── /[id]/page.jsx        → Product detail (/products/123)
│   │
│   ├── /cart                     → Cart page (/cart)
│   │   └── page.jsx
│   │
│   ├── /checkout                 → Checkout (/checkout)
│   │   └── page.jsx
│   │
│   ├── /orders                   → Order history (/orders)
│   │   ├── page.jsx              → All orders
│   │   └── /[id]/page.jsx        → Single order detail
│   │
│   ├── /profile                  → User profile (/profile)
│   │   └── page.jsx
│   │
│   └── /api                      → Backend API routes
│       ├── /auth
│       │   ├── /login/route.js   → POST /api/auth/login
│       │   ├── /signup/route.js  → POST /api/auth/signup
│       │   ├── /logout/route.js  → POST /api/auth/logout
│       │   └── /reset-password/route.js
│       │
│       ├── /products
│       │   ├── route.js          → GET /api/products (list)
│       │   └── /[id]/route.js    → GET /api/products/123 (single)
│       │
│       ├── /cart
│       │   └── route.js          → GET, POST, DELETE /api/cart
│       │
│       └── /orders
│           ├── route.js          → GET, POST /api/orders
│           └── /[id]/route.js    → GET /api/orders/123
│
├── /components                   → Reusable UI pieces
│   ├── /ui                       → Generic components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── /layout                   → Layout components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── ProductCard.jsx           → Ek product ka card
│   ├── CartItem.jsx              → Cart mein ek item
│   └── OrderSummary.jsx          → Order summary UI
│
├── /lib                          → Business logic + utilities
│   ├── /db                       → Database related
│   │   ├── prisma.js             → Prisma client instance
│   │   ├── products.js           → Product DB queries
│   │   ├── orders.js             → Order DB queries
│   │   └── users.js              → User DB queries
│   ├── /auth                     → Auth utilities
│   │   ├── session.js            → Session config
│   │   ├── hash.js               → bcrypt functions
│   │   └── email.js              → Email sending
│   └── utils.js                  → Generic helper functions
│
├── /prisma                       → Database schema
│   ├── schema.prisma             → Data models define karna
│   └── /migrations               → DB changes history (auto-generated)
│
├── /public                       → Static files
│   ├── /images                   → Static images
│   └── favicon.ico
│
├── /types                        → TypeScript types (agar use karo)
│   └── index.ts
│
├── .env                          → Secret keys — KABHI git mein mat daalo
├── .env.example                  → Example env file — yeh git mein daalo
├── .gitignore                    → .env yahan add karo
├── next.config.js
└── package.json
```

---

## Kuch Important Cheezein Explain Karein

### (auth) — Parentheses Kyun?

```
/(auth)/login/page.jsx    → URL: /login (parentheses URL mein nahi aate)
```

Parentheses wale folders **Route Groups** hain Next.js mein — sirf grouping ke liye, URL mein nahi aate. Fayda: Alag layout de sakte ho.

---

### /lib Folder — Kya Jaata Hai Yahan?

```
/lib mein woh cheezein jaati hain jo:
✓ Koi bhi part use kar sake (API aur page dono)
✓ Framework se independent ho (no req, no res)
✓ Test karna aasan ho
```

```javascript
// /lib/db/products.js — THEEK HAI yahan
export async function getProductById(id) {
  return prisma.product.findUnique({ where: { id } })
}

// /app/api/products/[id]/route.js — THEEK HAI yahan
import { getProductById } from '@/lib/db/products'
export async function GET(req, { params }) {
  const product = await getProductById(params.id)
  return Response.json(product)
}
```

---

### .env File — Kya Hota Hai Ismein?

```bash
# .env — yeh git mein KABHI mat daalo

DATABASE_URL="postgresql://..."
SESSION_SECRET="ek-bahut-lamba-random-string"
RESEND_API_KEY="re_..."
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."
```

Yeh **secrets** hain — API keys, database passwords. Agar GitHub pe gaye toh koi bhi misuse kar sakta hai.

`.env.example` file banao jisme sirf keys hoon, values nahi:
```bash
# .env.example — yeh git mein daalo
DATABASE_URL=
SESSION_SECRET=
RESEND_API_KEY=
```

---

## Summary

| Folder | Kya Jaata Hai |
|--------|--------------|
| `/app/(pages)` | UI — React pages |
| `/app/api` | Backend — API routes |
| `/components` | Reusable UI pieces |
| `/lib` | Business logic, DB queries |
| `/prisma` | Database schema |
| `.env` | Secret keys — git mein nahi |

---

## Agla Doc

`13-architecture-bff.md` — Ek last architecture concept — **BFF (Backend For Frontend)**. ShopKaro Next.js API routes use kar raha hai — kab alag backend banana padta hai? Kab Next.js kaafi hai? Yeh decision samjhenge.
