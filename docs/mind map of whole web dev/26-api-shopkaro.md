# 26 — ShopKaro: Complete API Reference

> Pichle docs mein REST aur GraphQL concepts samjhe.
> Ab ShopKaro ke **saare endpoints** — ek reference doc.
> Project banate waqt yahan dekho.

---

## Auth Endpoints

### POST `/api/auth/signup`
```
Request:  { email, password, name }
Response: { message: "Account bana", user: { id, email, name } }
Errors:   400 (email already exists), 400 (invalid data)
```

### POST `/api/auth/login`
```
Request:  { email, password }
Response: { message: "Login successful", user: { id, email, name } }
Errors:   401 (wrong credentials), 403 (email not verified)
```

### POST `/api/auth/logout`
```
Request:  (cookie mein session)
Response: { message: "Logged out" }
```

### POST `/api/auth/forgot-password`
```
Request:  { email }
Response: { message: "Reset email bhej diya" }
Note:     Email exist na kare tab bhi same message — security ke liye
```

### POST `/api/auth/reset-password`
```
Request:  { token, newPassword }
Response: { message: "Password update ho gaya" }
Errors:   400 (invalid/expired token)
```

### POST `/api/auth/verify-email`
```
Request:  { token }
Response: { message: "Email verified" }
Errors:   400 (invalid/expired token)
```

---

## Product Endpoints

### GET `/api/products`
```
Query params:
  ?category=shoes
  ?search=nike
  ?minPrice=500&maxPrice=5000
  ?page=1&limit=12
  ?sort=price_asc | price_desc | newest

Response: {
  products: [...],
  total: 100,
  page: 1,
  totalPages: 9
}
```

### GET `/api/products/:id`
```
Response: {
  id, name, description, price, stock,
  imageUrl, slug, featured,
  category: { id, name, slug }
}
Errors: 404 (not found)
```

---

## Cart Endpoints (Auth Required)

### GET `/api/cart`
```
Response: {
  items: [
    {
      id, quantity,
      product: { id, name, price, imageUrl, stock }
    }
  ],
  total: 5998
}
```

### POST `/api/cart`
```
Request:  { productId, quantity }
Response: { message: "Cart mein add ho gaya", item: {...} }
Errors:   400 (insufficient stock), 401 (not logged in)
```

### PATCH `/api/cart/:itemId`
```
Request:  { quantity }
Response: { message: "Updated", item: {...} }
Errors:   400 (quantity > stock)
```

### DELETE `/api/cart/:itemId`
```
Response: { message: "Remove ho gaya" }
```

---

## Order Endpoints (Auth Required)

### GET `/api/orders`
```
Response: {
  orders: [
    {
      id, status, total, createdAt,
      items: [{ product: { name, imageUrl }, quantity, price }]
    }
  ]
}
```

### GET `/api/orders/:id`
```
Response: {
  id, status, total, address, createdAt, paymentId,
  items: [...],
  user: { name, email }
}
Errors: 403 (dusre ka order access karne ki koshish), 404
```

### POST `/api/orders`
```
Request:  { address }
Process:
  1. Cart items lo
  2. Stock check karo
  3. Order banao
  4. Cart clear karo
  5. Payment initiate karo
Response: { orderId, paymentData: { razorpayOrderId, amount, currency } }
Errors:   400 (cart empty), 400 (stock nahi)
```

---

## Payment Endpoints

### POST `/api/payments/verify`
```
Request:  { razorpayOrderId, razorpayPaymentId, razorpaySignature }
Process:
  1. Signature verify karo
  2. Order status → PAID
  3. Stock update karo
Response: { message: "Payment successful", orderId }
Errors:   400 (invalid signature)
```

### POST `/api/webhooks/razorpay`
```
Razorpay se aata hai automatically jab payment hoti hai
Process: Signature verify → Order update
Note: Yeh backup hai — agar user browser band kar de payment ke baad
```

---

## Common Response Patterns

### Success:
```json
{ "message": "...", "data": {...} }
```

### Error:
```json
{ "error": "Kya galat hua", "details": "Optional" }
```

### Pagination:
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 12,
    "totalPages": 9
  }
}
```

---

## API Umbrella — Complete Hua

```
API DESIGN
│
├── REST          → Doc 24 ✓
├── GraphQL       → Doc 25 ✓
└── ShopKaro APIs → Doc 26 ✓ (YEH)
```

---

## Agla Doc

`27-state-what-is-it.md` — Chha umbrella — **State Management**. Yeh ek aisa topic hai jo bahut confuse karta hai beginners ko. Zustand, Context, useState — kab kaunsa, kyun — poori clarity yahan.
