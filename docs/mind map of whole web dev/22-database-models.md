# 22 — Data Models: ShopKaro Ka Poora Schema

> Pichle doc mein Prisma aur ORM samjha.
> Ab ShopKaro ka **complete data model** — har table, har field, kyun.
> Yeh ek reference doc hai.

---

## ShopKaro Ka Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── USER ───────────────────────────────────────────

model User {
  id               Int       @id @default(autoincrement())
  email            String    @unique
  password         String
  name             String?
  emailVerified    Boolean   @default(false)
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  // Relations
  orders           Order[]
  cart             CartItem[]
  verifyTokens     EmailVerificationToken[]
  resetTokens      PasswordResetToken[]
}

// ─── AUTH TOKENS ────────────────────────────────────

model EmailVerificationToken {
  id        Int      @id @default(autoincrement())
  userId    Int
  token     String   @unique
  expiresAt DateTime
  user      User     @relation(fields: [userId], references: [id])
}

model PasswordResetToken {
  id        Int      @id @default(autoincrement())
  userId    Int
  token     String   @unique
  expiresAt DateTime
  used      Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id])
}

// ─── PRODUCT ────────────────────────────────────────

model Category {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  slug     String    @unique  // "mens-shoes" — URL mein use hoga
  products Product[]
}

model Product {
  id          Int       @id @default(autoincrement())
  name        String
  description String?
  price       Float
  stock       Int       @default(0)
  imageUrl    String?
  slug        String    @unique  // "nike-air-max-2024" — URL mein
  featured    Boolean   @default(false)
  categoryId  Int
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  category    Category   @relation(fields: [categoryId], references: [id])
  orderItems  OrderItem[]
  cartItems   CartItem[]
}

// ─── CART ───────────────────────────────────────────

model CartItem {
  id        Int     @id @default(autoincrement())
  userId    Int
  productId Int
  quantity  Int     @default(1)

  user      User    @relation(fields: [userId], references: [id])
  product   Product @relation(fields: [productId], references: [id])

  @@unique([userId, productId])  // Ek user ek product ek baar cart mein
}

// ─── ORDER ──────────────────────────────────────────

model Order {
  id              Int         @id @default(autoincrement())
  userId          Int
  status          OrderStatus @default(PENDING)
  address         String
  total           Float
  paymentId       String?     // Razorpay payment ID
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  user            User        @relation(fields: [userId], references: [id])
  items           OrderItem[]
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  price     Float   // Price at time of purchase — product price baad mein badal sakta hai

  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

// ─── ENUMS ──────────────────────────────────────────

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

---

## Kuch Important Design Decisions

### OrderItem mein `price` kyun?
```
Product ki price kal ₹2999 thi → Priya ne kharida
Aaj price ₹3499 ho gayi

Agar OrderItem mein price store nahi kiya → Order history mein galat price dikhegi
Isliye purchase time ki price OrderItem mein store karo
```

### Cart alag table kyun, session mein nahi?
```
Option 1: Cart localStorage mein → Browser clear = cart gone
Option 2: Cart database mein → Priya laptop pe add kare, phone pe dekhe → Sab wahan

ShopKaro → Database mein cart (better experience)
```

### Slug kya hai?
```
Product name: "Nike Air Max 2024"
Slug: "nike-air-max-2024"

URL: /products/nike-air-max-2024  (readable)
vs
URL: /products/123  (not readable, bad SEO)
```

---

## Tables Ka Relationship Map

```
User
 ├── CartItem (userId)
 ├── Order (userId)
 ├── EmailVerificationToken (userId)
 └── PasswordResetToken (userId)

Product
 ├── CartItem (productId)
 ├── OrderItem (productId)
 └── Category (categoryId)

Order
 └── OrderItem (orderId)
```

---

## Database Umbrella — Complete Hua

```
DATABASE
│
├── SQL vs NoSQL        → Doc 20 ✓
├── Prisma (ORM)        → Doc 21 ✓
└── Data Models         → Doc 22 ✓ (YEH)
```

---

## Agla Doc

`23-api-what-is-it.md` — Paanchwa bada umbrella — **API Design**. Frontend aur backend kaise baat karte hain? REST kya hai, endpoints kaise banate hain, request/response kaisa hota hai — yeh samjhenge.
