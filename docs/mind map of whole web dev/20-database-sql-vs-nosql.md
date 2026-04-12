# 20 — SQL vs NoSQL: Fark Aur Kab Kya

> Pichle doc mein database umbrella ka overview hua.
> Ab thodi aur depth — **SQL vs NoSQL**, aur ShopKaro mein PostgreSQL setup.

---

## SQL Ka Core Concept — Relations

SQL databases mein data tables mein hota hai, aur tables ek dusre se **connected** hoti hain.

ShopKaro mein:

```
USERS table          ORDERS table              PRODUCTS table
id | email           id | userId | status      id | name  | price
---|-------          ---|--------|--------     ---|-------|------
1  | priya           1  | 1      | paid        1  | Shoes | 2999
2  | rahul           2  | 1      | pending     2  | Cap   | 999
                     3  | 2      | paid
```

Order 1 → userId: 1 → Yeh Priya ka order hai.

Yeh **foreign key** hai — ek table dusri table ko point karti hai. Isliye "Relational."

---

## NoSQL Ka Core Concept — Documents

MongoDB mein sab ek jagah hota hai:

```javascript
// Priya ka poora data ek document mein
{
  id: "1",
  email: "priya@gmail.com",
  orders: [
    {
      id: "order1",
      status: "paid",
      items: [
        { productName: "Nike Shoes", price: 2999, quantity: 1 }
      ]
    }
  ]
}
```

Fayda — ek query mein sab mil jaata hai.
Problem — agar product ki price change ho toh har jagah update karna padega.

---

## Practical Comparison — ShopKaro Scenario

**Scenario: Product ki price change ki ₹2999 se ₹3499**

**SQL mein:**
```sql
UPDATE products SET price = 3499 WHERE id = 1;
-- Ek jagah update → Sab jagah reflect hoga
```

**MongoDB mein:**
```javascript
// Har order document mein price stored hai
// Sab update karne padenge — ya inconsistency rahegi
db.users.updateMany(
  { "orders.items.productName": "Nike Shoes" },
  { $set: { "orders.$[].items.$[item].price": 3499 } }
)
// Complex aur risky
```

SQL yahan winner hai — data ek jagah, consistency automatic.

---

## Kab Kya Choose Karein

| Situation | SQL (PostgreSQL) | NoSQL (MongoDB) |
|-----------|-----------------|-----------------|
| E-commerce, banking, orders | ✓ Best | ✗ |
| Social media posts, comments | Okay | ✓ Better |
| User profiles with fixed fields | ✓ | Okay |
| Real-time chat messages | Okay | ✓ Better |
| Product catalog with varying attributes | Okay | ✓ Better |
| Analytics, logs | Okay | ✓ Better |

ShopKaro → SQL / PostgreSQL.

---

## PostgreSQL Setup — ShopKaro Mein

### 1. Local Development

```bash
# Mac
brew install postgresql
brew services start postgresql

# Windows
# PostgreSQL website se installer download karo
```

Ya **Neon** ya **Supabase** use karo — free cloud PostgreSQL, setup instant.

### 2. Connection String

```bash
# .env mein
DATABASE_URL="postgresql://username:password@localhost:5432/shopkaro"

# Neon/Supabase use kar rahe ho toh woh dete hain URL
DATABASE_URL="postgresql://user:pass@ep-xyz.neon.tech/shopkaro"
```

### 3. Prisma Connect Karo

```bash
npx prisma init
# Yeh /prisma/schema.prisma file banata hai
```

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## Summary

| | SQL (PostgreSQL) | NoSQL (MongoDB) |
|--|-----------------|-----------------|
| Data structure | Tables + Relations | Documents (JSON) |
| Schema | Fixed — pehle define karo | Flexible |
| Consistency | Strong | Eventual |
| ShopKaro | ✓ Use karenge | — |

---

## Agla Doc

`21-database-prisma.md` — Database choose kar liya. Ab **Prisma** — database se JavaScript mein baat karne ka tarika. ORM kya hota hai, schema kaise likhte hain, queries kaise karte hain — yeh sab.
