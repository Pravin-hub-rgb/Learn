# 21 — Prisma: JavaScript Se Database Se Baat Karna

> Pichle doc mein PostgreSQL choose kiya.
> Ab **Prisma** — database se baat karne ka tarika.
> ORM kya hota hai aur Prisma kaise kaam karta hai.

---

## Problem — SQL Seedha Likhna Mushkil Hai

Database se baat karne ke liye SQL likhna padta hai:

```sql
SELECT users.email, orders.id, orders.status
FROM users
JOIN orders ON users.id = orders.userId
WHERE users.id = 1
AND orders.status = 'paid'
ORDER BY orders.createdAt DESC;
```

Yeh kaam karta hai — lekin:
- JavaScript developers ke liye unfamiliar syntax
- Typo karo → Runtime error
- Complex queries → Bahut lamba
- Database change karo (PostgreSQL → MySQL) → Sab SQL rewrite

---

## Solution — ORM (Prisma)

**ORM (Object Relational Mapper)** — JavaScript mein likhne do, SQL mein convert kar deta hai.

```javascript
// Prisma se yahi query — JavaScript mein
const ordersWithUser = await prisma.order.findMany({
  where: {
    userId: 1,
    status: 'paid'
  },
  orderBy: {
    createdAt: 'desc'
  },
  include: {
    user: true
  }
})
```

Same result — lekin JavaScript. Autocomplete milta hai, type errors pakde jaate hain.

---

## Prisma Ka Schema — Database Structure Define Karna

Prisma mein ek `schema.prisma` file hoti hai jisme tables define karte hain:

```prisma
// prisma/schema.prisma

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?  // ? matlab optional
  createdAt DateTime @default(now())

  orders    Order[]  // Ek user ke kai orders
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float
  stock       Int      @default(0)
  imageUrl    String?
  createdAt   DateTime @default(now())

  orderItems  OrderItem[]
}

model Order {
  id        Int         @id @default(autoincrement())
  userId    Int
  status    String      @default("pending")  // pending, paid, shipped, delivered
  address   String
  total     Float
  createdAt DateTime    @default(now())

  user      User        @relation(fields: [userId], references: [id])
  items     OrderItem[]
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  price     Float   // Price at time of purchase — important!

  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}
```

---

## Schema Se Database Banana

```bash
# Schema se database tables banao
npx prisma migrate dev --name init

# Yeh karta hai:
# 1. SQL migration file banata hai
# 2. Database mein tables create karta hai
# 3. Prisma Client generate karta hai
```

---

## Prisma Client — Queries Kaise Karte Hain

```javascript
// /lib/db/prisma.js — Ek baar instance banao, baar baar use karo
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default prisma
```

### Common Queries:

```javascript
import prisma from '@/lib/db/prisma'

// CREATE — Naya user banao
const user = await prisma.user.create({
  data: {
    email: "priya@gmail.com",
    password: hashedPassword,
    name: "Priya Sharma"
  }
})

// READ — User dhundo
const user = await prisma.user.findUnique({
  where: { email: "priya@gmail.com" }
})

// READ — Saare products
const products = await prisma.product.findMany({
  where: { stock: { gt: 0 } },  // gt = greater than
  orderBy: { createdAt: 'desc' },
  take: 10  // Sirf 10
})

// UPDATE — Order status change karo
const order = await prisma.order.update({
  where: { id: 1 },
  data: { status: "paid" }
})

// DELETE
await prisma.user.delete({
  where: { id: 1 }
})
```

---

## Relations Ke Saath Query

```javascript
// Order ke saath user aur items bhi chahiye
const order = await prisma.order.findUnique({
  where: { id: 1 },
  include: {
    user: true,          // User ka data bhi aao
    items: {
      include: {
        product: true    // Har item ka product bhi
      }
    }
  }
})

// Result:
// order.user.email
// order.items[0].product.name
// order.items[0].quantity
```

---

## Summary

| | |
|--|--|
| **ORM kya hai** | JavaScript mein likhne do, SQL mein convert karo |
| **Prisma schema** | Tables aur relations define karna |
| **Migration** | Schema se actual database tables banana |
| **Prisma Client** | JavaScript se queries — type-safe |

---

## Agla Doc

`22-database-models.md` — ShopKaro ka poora data model — User, Product, Order, Cart — sab ek saath. Kaunsa field kyun hai, relations kaise hain — poori picture.
