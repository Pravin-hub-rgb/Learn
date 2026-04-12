# 19 — Database: Umbrella Kya Hai

> Rendering poora hua — SSG, SSR, CSR, ShopKaro decisions.
> Ab chautha bada umbrella — **Database**.
> Data permanently kahan aur kaise store hoga?

---

## Database Kyun Chahiye

Jab Priya ShopKaro close karti hai aur wapas aati hai — uska account, orders, sab kuch wahan hona chahiye.

Yeh possible hai kyunki sab kuch **database mein permanently store** hota hai.

Server ki memory (RAM) mein store karo → Server restart → Sab gone.
Database mein store karo → Hamesha wahan.

---

## Database Umbrella Ke Andar Kya Kya

```
DATABASE
│
├── SQL vs NoSQL (PostgreSQL vs MongoDB)
│   → Kaunsa type choose karein
│
├── Prisma (ORM)
│   → JavaScript mein database se kaise baat karein
│
└── Data Models
    → ShopKaro ka data kaise structure hoga
    → User, Product, Order, Cart tables
```

---

## Do Types Hote Hain — SQL aur NoSQL

### SQL Database (PostgreSQL, MySQL)
Data **tables** mein hota hai — rows aur columns.

```
Users Table:
id | email              | password      | createdAt
---|--------------------|-----------    |----------
1  | priya@gmail.com    | $2b$10$...   | 2024-01-01
2  | rahul@gmail.com    | $2b$10$...   | 2024-01-02

Products Table:
id | name          | price  | stock
---|---------------|--------|------
1  | Nike Shoes    | 2999   | 50
2  | Adidas Cap    | 999    | 100
```

Tables ek dusre se **related** ho sakti hain — isliye "Relational Database."

---

### NoSQL Database (MongoDB)
Data **documents** mein hota hai — JSON jaisa.

```javascript
// MongoDB document
{
  _id: "64a1b2c3",
  email: "priya@gmail.com",
  password: "$2b$10$...",
  orders: [
    { productId: "64a1b2c4", quantity: 1 }
  ]
}
```

Flexible — har document alag structure ka ho sakta hai.

---

## ShopKaro Ke Liye — PostgreSQL Kyun?

ShopKaro ka data **structured aur related** hai:

```
User → Order (ek user ke kai orders)
Order → Product (ek order mein kai products)
Product → Category (ek product ek category mein)
```

Yeh relationships SQL mein bahut cleanly handle hoti hain.

**PostgreSQL choose karo jab:**
- Data ka structure pehle se pata ho (User, Product, Order)
- Data ke beech relationships hoon
- Data consistent rehna chahiye (payment data inconsistent nahi hona chahiye)

**MongoDB choose karo jab:**
- Data schema baar baar badle
- Bohot flexible structure chahiye
- Document-style data ho (blog posts, user profiles with varying fields)

ShopKaro → **PostgreSQL.**

---

## Agla Doc

`20-database-sql-vs-nosql.md` — SQL aur NoSQL ki thodi aur detail — kab kya, aur ShopKaro mein specifically PostgreSQL kaise setup hoga.
