# 11 — MVC: Code Ko Teen Parts Mein Todna

> Pichle doc mein Architecture umbrella ka overview hua.
> Ab pehla pattern — **MVC**.
> Yeh naam kaafi sunoge — ek baar seedha samajh lo.

---

## MVC Kya Hai

MVC matlab **Model-View-Controller** — code ko teen responsibilities mein divide karna.

| Part | Kaam | ShopKaro Mein |
|------|------|---------------|
| **Model** | Data — kya store hoga, kaise fetch hoga | Product, User, Order (Prisma) |
| **View** | UI — user ko kya dikhega | React components, pages |
| **Controller** | Logic — request aai, kya karna hai | API routes |

---

## Ek Order Place Hone Ki Example

Priya "Place Order" button dabati hai. Kya hota hai?

### View — Button Click
```jsx
// /app/checkout/page.jsx
// Sirf UI — koi logic nahi

function CheckoutPage() {
  async function handleOrder() {
    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ cartItems, address })
    })
  }

  return <button onClick={handleOrder}>Place Order</button>
}
```

View ka kaam sirf yeh hai — user ne kya kiya, woh API ko bata do.

---

### Controller — Request Handle Karo
```javascript
// /app/api/orders/route.js
// Request aai — kya karna hai decide karo

export async function POST(req) {
  // 1. User logged in hai?
  const session = await getSession()
  if (!session) return Response.json({ error: "Login karo" }, { status: 401 })

  // 2. Data lo
  const { cartItems, address } = await req.json()

  // 3. Model ko bulao — actual kaam karao
  const order = await createOrder(session.userId, cartItems, address)

  // 4. Response bhejo
  return Response.json({ orderId: order.id })
}
```

Controller ka kaam — **traffic police** — request aai, kahan jaayegi decide karo. Khud data ka kaam mat karo.

---

### Model — Actual Data Ka Kaam
```javascript
// /lib/orders.js
// Sirf data logic — koi HTTP, koi request, koi response nahi

export async function createOrder(userId, cartItems, address) {
  // Database se baat karo
  const order = await prisma.order.create({
    data: {
      userId,
      address,
      status: 'pending',
      items: {
        create: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      }
    }
  })

  return order
}
```

Model ka kaam — **sirf data.** Koi UI nahi, koi request handling nahi.

---

## Kyun Yeh Separation Zaroori Hai

**Scenario:** Kal tumhe mobile app bhi banana hai ShopKaro ka.

```
Bina MVC:
Mobile ke liye → Poora logic dobara likho :(

MVC ke saath:
Mobile ke liye → Wohi /api/orders use karo, sirf View alag hoga :)
```

**Scenario:** Order creation mein bug hai.

```
Bina MVC:
Bug kahan hai? → Poori app mein dhundho :(

MVC ke saath:
Data bug → /lib/orders.js
UI bug → /app/checkout/page.jsx
Request bug → /app/api/orders/route.js
:)
```

---

## Next.js Mein MVC Exactly Kahan Hai

```
VIEW       → /app/(pages)/         React pages aur components
CONTROLLER → /app/api/             API route handlers
MODEL      → /lib/                 Business logic + DB queries
             /prisma/schema.prisma Data structure define karna
```

---

## Important Note

MVC ek **concept** hai — strict rule nahi. Next.js khud MVC framework nahi hai. Lekin tum yeh pattern apply kar sakte ho — aur karni chahiye.

Real projects mein yeh perfectly clean nahi hota — thoda overlap hota hai. Toh worried mat ho agar sab perfectly fit nahi hota.

---

## Summary

| | |
|--|--|
| **Model** | Data ka kaam — database queries, business logic |
| **View** | UI ka kaam — React components |
| **Controller** | Request handling — API routes |
| **Fayda** | Bug dhundhna aasan, code reuse hota hai |

---

## Agla Doc

`12-architecture-folder.md` — Ab theory se practice. ShopKaro ki **actual folder structure** kaisi hogi — har folder ka naam, kyun woh wahan hai, kya jaata hai usмें. Yeh ek reference doc bhi hai — project banate waqt kaam aayega.
