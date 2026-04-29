# 🗄️ DB Projects 3, 4, 5 — TalkSpace, ShopKaro, DataLens
### Complete Schemas with Sample Data

---

# Project 3 — TalkSpace: Chat App (SQL Version)

> Note: Actual TalkSpace mein MongoDB use kiya tha (flexible message schema).
> Par ye doc SQL (PostgreSQL) mein same project design karna dikhata hai.
> Interview mein ye comparison bahut kaam aata hai — "SQL mein karte toh..."

---

## Brief se Entities

```
Brief: "Rooms/channels, real-time messaging, online status, DMs."

ENTITIES: User, Room, Message, RoomMember (junction)

USER     (M) ──── (M) ROOM    via RoomMember junction
ROOM     (1) ──── (N) MESSAGE
USER     (1) ──── (N) MESSAGE  [sender]
```

---

## Prisma Schema — TalkSpace

```prisma
enum MessageType {
  TEXT
  SYSTEM  // "Rahul joined the room"
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  avatarUrl String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  roomMemberships RoomMember[]
  sentMessages    Message[]

  @@map("users")
}

model Room {
  id          String   @id @default(cuid())
  name        String
  description String?
  isPrivate   Boolean  @default(false)
  createdAt   DateTime @default(now())

  // Relations
  members  RoomMember[]
  messages Message[]

  @@map("rooms")
}

model RoomMember {
  id       String   @id @default(cuid())
  roomId   String
  userId   String
  joinedAt DateTime @default(now())

  room Room @relation(fields: [roomId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([roomId, userId])    // Ek user ek room mein sirf ek baar
  @@index([roomId])
  @@index([userId])

  @@map("room_members")
}

model Message {
  id        String      @id @default(cuid())
  text      String      @db.Text
  type      MessageType @default(TEXT)
  roomId    String
  senderId  String
  createdAt DateTime    @default(now())

  room   Room @relation(fields: [roomId],   references: [id], onDelete: Cascade)
  sender User @relation(fields: [senderId], references: [id], onDelete: Restrict)

  @@index([roomId, createdAt])   // "Room ke latest messages" — MOST CRITICAL INDEX
  @@index([senderId])

  @@map("messages")
}
```

---

## Sample Data

```
users:
┌───────────┬──────────────┬──────────────────────────┐
│ id        │ name         │ email                    │
├───────────┼──────────────┼──────────────────────────┤
│ u_001     │ Rahul        │ rahul@company.com        │
│ u_002     │ Priya        │ priya@company.com        │
│ u_003     │ Amit         │ amit@company.com         │
└───────────┴──────────────┴──────────────────────────┘

rooms:
┌───────────┬──────────────────┬───────────┐
│ id        │ name             │ isPrivate │
├───────────┼──────────────────┼───────────┤
│ r_001     │ general          │ false     │
│ r_002     │ design-team      │ false     │
│ r_003     │ rahul-priya-dm   │ true      │  ← Direct Message room
└───────────┴──────────────────┴───────────┘

room_members (Junction):
┌───────────┬──────────┬──────────┐
│ id        │ roomId   │ userId   │
├───────────┼──────────┼──────────┤
│ rm_001    │ r_001    │ u_001    │  ← Rahul in general
│ rm_002    │ r_001    │ u_002    │  ← Priya in general
│ rm_003    │ r_001    │ u_003    │  ← Amit in general
│ rm_004    │ r_002    │ u_001    │  ← Rahul in design-team
│ rm_005    │ r_002    │ u_002    │  ← Priya in design-team
│ rm_006    │ r_003    │ u_001    │  ← Rahul in DM
│ rm_007    │ r_003    │ u_002    │  ← Priya in DM
└───────────┴──────────┴──────────┘

messages:
┌───────────┬──────────┬──────────┬─────────────────────────────┬─────────────────────┐
│ id        │ roomId   │ senderId │ text                        │ createdAt           │
├───────────┼──────────┼──────────┼─────────────────────────────┼─────────────────────┤
│ msg_001   │ r_001    │ u_001    │ "Good morning team!"        │ 2024-03-15 09:00:00 │
│ msg_002   │ r_001    │ u_002    │ "Morning! Coffee ready? ☕"  │ 2024-03-15 09:01:00 │
│ msg_003   │ r_001    │ u_003    │ "On my way!"                │ 2024-03-15 09:02:00 │
│ msg_004   │ r_002    │ u_001    │ "New designs uploaded"      │ 2024-03-15 10:00:00 │
│ msg_005   │ r_003    │ u_001    │ "Hey, call at 3?"           │ 2024-03-15 11:00:00 │
└───────────┴──────────┴──────────┴─────────────────────────────┴─────────────────────┘

KEY QUERY — Room ke last 50 messages (@@index([roomId, createdAt]) use hoga):
const messages = await prisma.message.findMany({
  where: { roomId: 'r_001' },
  orderBy: { createdAt: 'desc' },
  take: 50,
  include: { sender: { select: { name: true, avatarUrl: true } } }
})

Online status: Redis mein store karo (not SQL) — TTL feature chahiye
HSET online_status:u_001 status "online"
EXPIRE online_status:u_001 300  // 5 minute TTL — heartbeat refresh karta hai
```

---
---

# Project 4 — ShopKaro: E-Commerce

## Brief se Entities

```
Brief: "Products browse karo, cart mein add karo, checkout karo, payment karo.
        Admin products manage kare, orders track kare."

ENTITIES: User, Product, Category, Order, OrderItem

Category (1) ─── (N) Product
Product  (M) ─── (M) Order  via OrderItem (explicit junction with extra columns)
User     (1) ─── (N) Order
```

---

## Prisma Schema — ShopKaro

```prisma
enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum ProductStatus {
  ACTIVE
  DRAFT
  ARCHIVED
}

enum UserRole {
  CUSTOMER
  ADMIN
}

model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String?
  role      UserRole @default(CUSTOMER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  orders Order[]

  @@map("users")
}

model Category {
  id       String     @id @default(cuid())
  name     String     @unique
  slug     String     @unique
  parentId String?    // Self-reference for subcategories

  parent   Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children Category[] @relation("CategoryHierarchy")
  products Product[]

  @@map("categories")
}

model Product {
  id           String        @id @default(cuid())
  slug         String        @unique
  name         String
  description  String        @db.Text
  price        Decimal       @db.Decimal(10, 2)
  comparePrice Decimal?      @db.Decimal(10, 2)  // "Was ₹999"
  stock        Int           @default(0)
  images       String[]      // Array of Cloudinary URLs
  categoryId   String
  status       ProductStatus @default(ACTIVE)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  category   Category    @relation(fields: [categoryId], references: [id])
  orderItems OrderItem[]

  @@index([categoryId])
  @@index([status])
  @@index([price])              // Price sorting
  @@index([status, categoryId]) // "Active jewellery" filter

  @@map("products")
}

model Order {
  id                String      @id @default(cuid())
  userId            String?     // Nullable — guest checkout possible
  customerName      String
  customerEmail     String
  status            OrderStatus @default(PENDING)
  totalAmount       Decimal     @db.Decimal(10, 2)
  shippingAddress   Json        // { line1, city, state, pincode, phone }
  razorpayOrderId   String?     @unique
  razorpayPaymentId String?
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  user       User?       @relation(fields: [userId], references: [id], onDelete: SetNull)
  orderItems OrderItem[]
  statusHistory OrderStatusHistory[]

  @@index([userId])
  @@index([status])
  @@index([customerEmail])  // Customer apne orders dhundhe
  @@index([createdAt])      // Latest orders first

  @@map("orders")
}

model OrderItem {
  id          String  @id @default(cuid())
  orderId     String
  productId   String
  quantity    Int
  unitPrice   Decimal @db.Decimal(10, 2)  // SNAPSHOT — price at time of purchase
  productName String                        // SNAPSHOT — name at time of purchase

  order   Order   @relation(fields: [orderId],   references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Restrict)

  @@unique([orderId, productId])
  @@index([orderId])
  @@index([productId])

  @@map("order_items")
}

model OrderStatusHistory {
  id         String       @id @default(cuid())
  orderId    String
  fromStatus OrderStatus?
  toStatus   OrderStatus
  changedBy  String?
  note       String?
  createdAt  DateTime     @default(now())

  order Order @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@index([orderId])
  @@map("order_status_history")
}
```

---

## Sample Data

```
categories:
┌──────────┬────────────────┬────────────────┬──────────┐
│ id       │ name           │ slug           │ parentId │
├──────────┼────────────────┼────────────────┼──────────┤
│ cat_001  │ Jewellery      │ jewellery      │ NULL     │
│ cat_002  │ Necklaces      │ necklaces      │ cat_001  │
│ cat_003  │ Earrings       │ earrings       │ cat_001  │
│ cat_004  │ Rings          │ rings          │ cat_001  │
└──────────┴────────────────┴────────────────┴──────────┘

products:
┌──────────┬───────────────────────┬─────────┬──────────────┬──────────┬──────────┐
│ id       │ name                  │ price   │ comparePrice │ stock    │ category │
├──────────┼───────────────────────┼─────────┼──────────────┼──────────┼──────────┤
│ p_001    │ Silver Ring           │ 499.00  │ 699.00       │ 50       │ cat_004  │
│ p_002    │ Gold Necklace         │ 2999.00 │ NULL         │ 10       │ cat_002  │
│ p_003    │ Pearl Earrings        │ 799.00  │ 999.00       │ 25       │ cat_003  │
└──────────┴───────────────────────┴─────────┴──────────────┴──────────┴──────────┘

orders:
┌──────────┬──────────────────────┬─────────────┬──────────┬──────────────────────────┐
│ id       │ customerEmail        │ totalAmount │ status   │ razorpayOrderId          │
├──────────┼──────────────────────┼─────────────┼──────────┼──────────────────────────┤
│ ord_001  │ buyer@example.com    │ 4297.00     │ PAID     │ order_K3m9pXYZ123        │
│ ord_002  │ another@example.com  │ 499.00      │ SHIPPED  │ order_L4n0qABC456        │
└──────────┴──────────────────────┴─────────────┴──────────┴──────────────────────────┘

order_items (Junction with snapshot):
┌──────────┬──────────┬──────────┬──────────┬───────────┬─────────────────┐
│ id       │ orderId  │ productId│ quantity │ unitPrice │ productName     │
├──────────┼──────────┼──────────┼──────────┼───────────┼─────────────────┤
│ oi_001   │ ord_001  │ p_001    │ 1        │ 499.00    │ Silver Ring     │ ← SNAPSHOT
│ oi_002   │ ord_001  │ p_002    │ 1        │ 2999.00   │ Gold Necklace   │ ← SNAPSHOT
│ oi_003   │ ord_001  │ p_003    │ 1        │ 799.00    │ Pearl Earrings  │ ← SNAPSHOT
│ oi_004   │ ord_002  │ p_001    │ 1        │ 499.00    │ Silver Ring     │ ← SNAPSHOT
└──────────┴──────────┴──────────┴──────────┴───────────┴─────────────────┘

ORDER TOTAL: 499 + 2999 + 799 = 4297 ✓ (ord_001)

Kal Silver Ring ka price 599 ho jaaye — ord_002 mein ABHI BHI 499 dikhega.
Ye snapshot pattern ka fayda hai!
```

---
---

# Project 5 — DataLens: Analytics Dashboard

## Brief se Entities

```
Brief: "Sales team apna performance dekhe — daily/weekly/monthly sales,
        top products, region breakdown, salesperson performance."

ENTITIES: User, Sale, Product

User   (1) ─── (N) Sale    [salesperson ne sale ki]
Product(1) ─── (N) Sale    [kaunsa product bika]
```

---

## Prisma Schema — DataLens

```prisma
enum UserRole {
  MANAGER
  SALESPERSON
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      UserRole @default(SALESPERSON)
  region    String   // "North", "South", "East", "West"
  clerkId   String?  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  sales Sale[]

  @@index([region])

  @@map("users")
}

model Product {
  id        String   @id @default(cuid())
  name      String
  category  String
  unitPrice Decimal  @db.Decimal(10, 2)
  createdAt DateTime @default(now())

  sales Sale[]

  @@index([category])

  @@map("products")
}

model Sale {
  id             String   @id @default(cuid())
  salespersonId  String
  productId      String
  region         String
  amount         Decimal  @db.Decimal(10, 2)
  quantity       Int
  saleDate       DateTime @db.Date  // Date only — no time needed for analytics

  salesperson    User    @relation(fields: [salespersonId], references: [id])
  product        Product @relation(fields: [productId],    references: [id])

  // Analytics indexes — CRITICAL for performance
  @@index([saleDate])                      // Date range queries
  @@index([region])                        // Region filter
  @@index([salespersonId])                 // Per-person reports
  @@index([productId])                     // Per-product revenue
  @@index([saleDate, region])              // "North region last month"
  @@index([saleDate, salespersonId])       // "Rahul last quarter"
  @@index([saleDate, region, salespersonId]) // Combined — admin view

  @@map("sales")
}
```

---

## Sample Data

```
users:
┌──────────┬──────────────┬────────────────────────┬─────────────┬────────┐
│ id       │ name         │ email                  │ role        │ region │
├──────────┼──────────────┼────────────────────────┼─────────────┼────────┤
│ u_mgr001 │ Sunita Rao   │ sunita@company.com     │ MANAGER     │ HQ     │
│ u_sp_001 │ Rahul Verma  │ rahul@company.com      │ SALESPERSON │ North  │
│ u_sp_002 │ Priya Singh  │ priya@company.com      │ SALESPERSON │ South  │
│ u_sp_003 │ Amit Shah    │ amit@company.com       │ SALESPERSON │ North  │
└──────────┴──────────────┴────────────────────────┴─────────────┴────────┘

products:
┌──────────┬──────────────────────┬────────────┬───────────┐
│ id       │ name                 │ category   │ unitPrice │
├──────────┼──────────────────────┼────────────┼───────────┤
│ prod_001 │ Premium Plan         │ SaaS       │ 4999.00   │
│ prod_002 │ Basic Plan           │ SaaS       │ 999.00    │
│ prod_003 │ Enterprise Plan      │ SaaS       │ 19999.00  │
└──────────┴──────────────────────┴────────────┴───────────┘

sales:
┌──────────┬──────────────┬──────────┬────────┬─────────┬──────────┬────────────┐
│ id       │ salespersonId│ productId│ region │ amount  │ quantity │ saleDate   │
├──────────┼──────────────┼──────────┼────────┼─────────┼──────────┼────────────┤
│ s_001    │ u_sp_001     │ prod_001 │ North  │ 4999.00 │ 1        │ 2024-03-01 │
│ s_002    │ u_sp_001     │ prod_002 │ North  │ 1998.00 │ 2        │ 2024-03-01 │
│ s_003    │ u_sp_002     │ prod_003 │ South  │ 19999.00│ 1        │ 2024-03-02 │
│ s_004    │ u_sp_003     │ prod_001 │ North  │ 9998.00 │ 2        │ 2024-03-02 │
│ s_005    │ u_sp_002     │ prod_002 │ South  │ 999.00  │ 1        │ 2024-03-03 │
└──────────┴──────────────┴──────────┴────────┴─────────┼──────────┴────────────┘

ANALYTICS QUERIES:

1. Region-wise total (last 30 days):
const regionTotals = await prisma.sale.groupBy({
  by: ['region'],
  where: {
    saleDate: { gte: thirtyDaysAgo }
  },
  _sum: { amount: true },
  orderBy: { _sum: { amount: 'desc' } }
})
// Result: [{ region: 'South', _sum: { amount: 20998 } }, { region: 'North', _sum: { amount: 16995 } }]

2. Top products by revenue:
const topProducts = await prisma.sale.groupBy({
  by: ['productId'],
  where: { saleDate: { gte: thirtyDaysAgo } },
  _sum: { amount: true },
  orderBy: { _sum: { amount: 'desc' } },
  take: 10
})
// Then join with product names separately

3. Daily trend:
const dailyTrend = await prisma.$queryRaw`
  SELECT
    DATE_TRUNC('day', "saleDate") as day,
    SUM(amount) as total,
    COUNT(*) as count
  FROM sales
  WHERE "saleDate" >= ${thirtyDaysAgo}
  GROUP BY DATE_TRUNC('day', "saleDate")
  ORDER BY day ASC
`
```

---

## 📊 Final Comparison — Sab 5 Projects ke Tables

```
┌─────────────────┬───────────────────────────────────────────────────────────────────────┐
│ Project         │ Tables                                                                 │
├─────────────────┼───────────────────────────────────────────────────────────────────────┤
│ StaffSync       │ User, Task                                                             │
│ (Task Manager)  │ (2 tables — simple, one-to-many)                                      │
├─────────────────┼───────────────────────────────────────────────────────────────────────┤
│ HireHop         │ User, Job, Application (explicit junction)                             │
│ (Job Board)     │ (3 tables — many-to-many with extra columns)                          │
├─────────────────┼───────────────────────────────────────────────────────────────────────┤
│ TalkSpace       │ User, Room, RoomMember (junction), Message                             │
│ (Chat App)      │ (4 tables — many-to-many + one-to-many for messages)                  │
├─────────────────┼───────────────────────────────────────────────────────────────────────┤
│ ShopKaro        │ User, Category (self-ref), Product, Order,                             │
│ (E-Commerce)    │ OrderItem (junction + snapshot), OrderStatusHistory                   │
│                 │ (6 tables — most complex, snapshot pattern, status history)            │
├─────────────────┼───────────────────────────────────────────────────────────────────────┤
│ DataLens        │ User, Product, Sale                                                    │
│ (Analytics)     │ (3 tables — simple but analytics-optimized indexes)                   │
└─────────────────┴───────────────────────────────────────────────────────────────────────┘

KEY PATTERNS USED:
→ Snapshot pattern      : ShopKaro OrderItem (price/name at time of purchase)
→ Self-referential      : ShopKaro Category (parent-child hierarchy)
→ Status history        : ShopKaro OrderStatusHistory (audit trail)
→ Soft delete           : Add deletedAt? to any model when needed
→ Junction with extras  : HireHop Application, ShopKaro OrderItem
→ Multiple FK same table: StaffSync Task (assignedTo + createdBy → both User)
→ Analytics indexes     : DataLens Sale (multiple composite indexes)
```
