# 23 — API: Umbrella Kya Hai

> Database umbrella complete hua — PostgreSQL, Prisma, Models.
> Ab paanchwa bada umbrella — **API Design**.
> Frontend aur backend kaise baat karte hain?

---

## API Kya Hota Hai

**API (Application Programming Interface)** — ek set of rules jo batata hai ki frontend server se kaise maange data.

Priya products dekh rahi hai:

```
Browser → "Mujhe products chahiye" → Server
Server → Database se nikala → "Lo yeh products" → Browser
Browser → Screen pe dikhaya
```

Yeh conversation API ke through hoti hai. API ek **contract** hai — frontend jaanta hai kahan request bhejni hai, server jaanta hai kya dena hai.

---

## API Umbrella Ke Andar Kya Kya

```
API DESIGN
│
├── REST → Sabse common tarika — Doc 24
├── GraphQL → REST ka alternative — Doc 25
└── ShopKaro ke endpoints → Doc 26
```

---

## HTTP Methods — Request Types

API requests alag types ki hoti hain:

| Method | Matlab | Example |
|--------|--------|---------|
| `GET` | Data maango | Products ki list do |
| `POST` | Naya data banao | Naya order banao |
| `PUT` | Poora data replace karo | Profile update karo |
| `PATCH` | Kuch fields update karo | Order status change karo |
| `DELETE` | Delete karo | Cart item remove karo |

---

## HTTP Status Codes — Response Types

Server response ke saath ek number bhejta hai:

| Code | Matlab | Kab |
|------|--------|-----|
| `200` | OK | Request successful |
| `201` | Created | Naya resource bana |
| `400` | Bad Request | Request mein kuch galat hai |
| `401` | Unauthorized | Login nahi hai |
| `403` | Forbidden | Permission nahi |
| `404` | Not Found | Resource nahi mila |
| `500` | Server Error | Server side kuch toot gaya |

---

## Ek Simple API Call — ShopKaro Mein

```javascript
// Frontend — Priya products maang rahi hai
const response = await fetch('/api/products')
const products = await response.json()

// Backend — Server respond karta hai
// /app/api/products/route.js
export async function GET() {
  const products = await prisma.product.findMany()
  return Response.json(products, { status: 200 })
}
```

---

## Agla Doc

`24-api-rest.md` — **REST** kya hai — sabse common API style. ShopKaro ke REST endpoints kaise design karein — naming conventions, structure — sab samjhenge.
