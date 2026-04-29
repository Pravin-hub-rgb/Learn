# 🗄️ DB Doc 2 — Relationships Deep Dive
### Tricky Cases, Self-Reference, Polymorphic, Soft Delete

---

## Recap — Teen Types

```
One-to-One   (1:1)  → User ↔ UserProfile
One-to-Many  (1:N)  → User → Tasks        ← Sabse common
Many-to-Many (M:N)  → Student ↔ Course    ← Junction table zaroori
```

Ye teen toh Doc 1 mein cover kiya. Ab tricky cases cover karte hain.

---

## Case 1 — Self-Referential Relationship

```
Kya hota hai?
Ek table apne aap ko reference karti hai.

Real Examples:
→ Manager → Employee   (Employee table mein managerId → same Employee table)
→ Category → Subcategory (Electronics → Phones, Laptops)
→ Comment → Reply       (Comment ka parentId → same Comment table)
→ Org Chart             (HR system mein hierarchy)
```

### Example — Manager-Employee (StaffSync V2)

```
Problem: Kuch employees manager bhi hain apni team ke.
Manager bhi User table mein hai. Employee bhi User table mein hai.

Ek User ka ek manager hoga (another User).
Ek User ke many reportees honge (other Users).

Prisma mein:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
model User {
  id         String  @id @default(cuid())
  name       String
  email      String  @unique
  managerId  String?  // ← Nullable! CEO ka koi manager nahi hota

  // Self relation — apne aap ko reference
  manager    User?   @relation("ManagerEmployee", fields: [managerId], references: [id])
  reportees  User[]  @relation("ManagerEmployee")

  @@index([managerId])
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sample Data:
┌──────────┬──────────────┬───────────┐
│ id       │ name         │ managerId │
├──────────┼──────────────┼───────────┤
│ u_001    │ Rohan (CEO)  │ NULL      │  ← Koi manager nahi
│ u_002    │ Amit (VP)    │ u_001     │  ← Rohan ka reportee
│ u_003    │ Priya (Lead) │ u_002     │  ← Amit ka reportee
│ u_004    │ Rahul (Dev)  │ u_003     │  ← Priya ka reportee
│ u_005    │ Sara (Dev)   │ u_003     │  ← Priya ka reportee
└──────────┴──────────────┴───────────┘

Query — Priya ke saare reportees:
const reportees = await prisma.user.findMany({
  where: { managerId: 'u_003' }
})
// Returns: Rahul, Sara

Query — Rahul ka manager kaun hai:
const rahul = await prisma.user.findUnique({
  where: { id: 'u_004' },
  include: { manager: true }  // ← Priya
})
```

### Example — Category → Subcategory (ShopKaro)

```
model Category {
  id       String     @id @default(cuid())
  name     String
  parentId String?    // ← Null means top-level category

  parent   Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children Category[] @relation("CategoryHierarchy")
  products Product[]
}

Sample Data:
┌──────────┬──────────────┬──────────┐
│ id       │ name         │ parentId │
├──────────┼──────────────┼──────────┤
│ cat_001  │ Jewellery    │ NULL     │  ← Top level
│ cat_002  │ Necklaces    │ cat_001  │  ← Under Jewellery
│ cat_003  │ Earrings     │ cat_001  │  ← Under Jewellery
│ cat_004  │ Gold Necklace│ cat_002  │  ← Under Necklaces
│ cat_005  │ Silver Necklace│cat_002 │  ← Under Necklaces
└──────────┴──────────────┴──────────┘

Query — Jewellery ke direct children:
const subcategories = await prisma.category.findMany({
  where: { parentId: 'cat_001' }
})
// Returns: Necklaces, Earrings
```

---

## Case 2 — Multiple Relations Between Same Two Tables

```
Kab hota hai?
Jab do tables ke beech mein 2 ya zyada alag alag reasons se relation ho.

Real Example — StaffSync:
Task mein DO relations hain User ke saath:
1. assignedTo → kaun karega kaam
2. createdBy  → kisne banaya task

Dono User table ko refer karte hain — par alag alag reasons se!
```

```prisma
model User {
  id            String @id @default(cuid())
  name          String

  // DO ALAG relations — named hone chahiye!
  assignedTasks Task[] @relation("AssignedTasks")
  createdTasks  Task[] @relation("CreatedTasks")
}

model Task {
  id           String @id @default(cuid())
  title        String
  assignedToId String
  createdById  String

  // Named relations — same name dono jagah
  assignedTo   User   @relation("AssignedTasks", fields: [assignedToId], references: [id])
  createdBy    User   @relation("CreatedTasks",  fields: [createdById],  references: [id])
}
```

```
Sample Data:
User table:
┌──────────┬────────────┬─────────┐
│ id       │ name       │ role    │
├──────────┼────────────┼─────────┤
│ u_001    │ Boss Rohan │ ADMIN   │
│ u_002    │ Dev Rahul  │ EMPLOYEE│
│ u_003    │ Dev Priya  │ EMPLOYEE│
└──────────┴────────────┴─────────┘

Task table:
┌──────────┬───────────────────┬──────────────┬─────────────┐
│ id       │ title             │ assignedToId │ createdById │
├──────────┼───────────────────┼──────────────┼─────────────┤
│ t_001    │ Fix login bug     │ u_002        │ u_001       │
│ t_002    │ Design dashboard  │ u_003        │ u_001       │
│ t_003    │ Write tests       │ u_002        │ u_003       │ ← Priya ne Rahul ko assign kiya
└──────────┴───────────────────┴──────────────┴─────────────┘

Notice:
→ t_003 mein createdById = u_003 (Priya ne task create kiya)
  aur assignedToId = u_002 (Rahul ko assign kiya)
→ Dono alag columns, alag purposes, same User table reference
```

---

## Case 3 — Junction Table With Extra Columns

```
Kab zaroori hai?
Jab Many-to-Many relationship mein extra information store karni ho
about the relationship itself — not about either entity.

Real Examples:
→ User ↔ Project: role in project (owner, member, viewer)
→ Student ↔ Course: enrollment date, grade, completion status
→ Product ↔ Order: quantity, unit price (snapshot!)
```

### Example — Order ↔ Product (ShopKaro)

```prisma
model Product {
  id         String      @id @default(cuid())
  name       String
  price      Decimal     @db.Decimal(10, 2)
  stock      Int         @default(0)
  orderItems OrderItem[]
}

model Order {
  id          String      @id @default(cuid())
  totalAmount Decimal     @db.Decimal(10, 2)
  status      OrderStatus @default(PENDING)
  createdAt   DateTime    @default(now())
  orderItems  OrderItem[]
}

// Junction Table — explicit with extra columns
model OrderItem {
  id          String  @id @default(cuid())
  orderId     String
  productId   String
  quantity    Int             // ← Extra: kitne kharide
  unitPrice   Decimal @db.Decimal(10, 2)  // ← Extra: price at time of purchase (SNAPSHOT!)

  order       Order   @relation(fields: [orderId],   references: [id])
  product     Product @relation(fields: [productId], references: [id])

  @@unique([orderId, productId])  // ← Ek order mein ek product sirf ek row
  @@index([orderId])
  @@index([productId])
}
```

```
Sample Data:
Product table:
┌──────────┬──────────────────┬────────┬───────┐
│ id       │ name             │ price  │ stock │
├──────────┼──────────────────┼────────┼───────┤
│ p_001    │ Silver Ring      │ 499.00 │ 50    │
│ p_002    │ Gold Necklace    │ 2999.00│ 10    │
│ p_003    │ Pearl Earrings   │ 799.00 │ 25    │
└──────────┴──────────────────┴────────┴───────┘

Order table:
┌──────────┬─────────────┬──────────┐
│ id       │ totalAmount │ status   │
├──────────┼─────────────┼──────────┤
│ ord_001  │ 5297.00     │ PAID     │
│ ord_002  │ 499.00      │ SHIPPED  │
└──────────┴─────────────┴──────────┘

OrderItem table (Junction):
┌──────────┬──────────┬──────────┬──────────┬───────────┐
│ id       │ orderId  │ productId│ quantity │ unitPrice │
├──────────┼──────────┼──────────┼──────────┼───────────┤
│ oi_001   │ ord_001  │ p_001    │ 1        │ 499.00    │  ← Silver Ring x1
│ oi_002   │ ord_001  │ p_002    │ 1        │ 2999.00   │  ← Gold Necklace x1
│ oi_003   │ ord_001  │ p_003    │ 2        │ 799.00    │  ← Pearl Earrings x2
│ oi_004   │ ord_002  │ p_001    │ 1        │ 499.00    │  ← Silver Ring x1
└──────────┴──────────┴──────────┴──────────┴───────────┘

ORDER TOTAL VERIFY KARO:
ord_001: 499 + 2999 + (799 × 2) = 499 + 2999 + 1598 = 5096 ✓
(Slight diff — shipping etc. ho sakta hai)

IMPORTANT — unitPrice snapshot kyun?
→ Aaj Silver Ring 499 hai
→ Kal price 599 ho gayi
→ ord_002 ka orderItem abhi bhi 499 dikhata hai ← CORRECT!
→ Agar productId se current price lete → 599 dikhata → WRONG!
```

---

## Case 4 — Soft Delete Pattern

```
Kya hai?
Data actually delete nahi karte — ek flag set karte hain.
"Deleted" rows query se hide ho jaati hain, par database mein rehti hain.

Kyun use karo?
→ Audit trail — pata chale ki kya delete hua tha
→ Recovery — "Undo delete" feature possible
→ Analytics — deleted data bhi count mein aata hai historical reports mein
→ Legal compliance — kuch industries mein data delete karna allowed nahi

Kyun use MAT karo?
→ Table size badhti rehti hai — kabhi clean nahi hoti
→ Queries mein HAMESHA deletedAt IS NULL lagana padta hai — forget karna easy
→ Unique constraints tricky ho jaate hain (deleted email reuse karna chahein)
```

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String
  deletedAt DateTime? // ← NULL = active, NOT NULL = deleted
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

```
Sample Data:
┌──────────┬─────────────────────┬─────────────┬──────────────────────┐
│ id       │ email               │ name        │ deletedAt            │
├──────────┼─────────────────────┼─────────────┼──────────────────────┤
│ u_001    │ rahul@example.com   │ Rahul       │ NULL                 │ ← Active
│ u_002    │ priya@example.com   │ Priya       │ NULL                 │ ← Active
│ u_003    │ amit@example.com    │ Amit        │ 2024-03-15 10:30:00  │ ← Deleted!
└──────────┴─────────────────────┴─────────────┴──────────────────────┘

Prisma queries:
// Active users sirf:
const activeUsers = await prisma.user.findMany({
  where: { deletedAt: null }  // ← HAMESHA YE LAGANA HAI
})

// "Delete" karna (actually sirf flag set karo):
await prisma.user.update({
  where: { id: userId },
  data: { deletedAt: new Date() }
})

// Restore karna:
await prisma.user.update({
  where: { id: userId },
  data: { deletedAt: null }
})

PRO TIP: Prisma middleware se automatically filter karo:
prisma.$use(async (params, next) => {
  if (params.model === 'User' && params.action === 'findMany') {
    params.args.where = { ...params.args.where, deletedAt: null }
  }
  return next(params)
})
// Ab hamesha sirf active users milenge automatically!
```

---

## Case 5 — Status Machine Pattern

```
Kab use karo?
Jab koi entity different states mein hoti hai aur transitions defined hain.

Real Examples:
→ Order: PENDING → PAID → PROCESSING → SHIPPED → DELIVERED
                                               ↘ CANCELLED
→ Task: TODO → IN_PROGRESS → DONE
→ Application: APPLIED → REVIEWED → SHORTLISTED → REJECTED/HIRED
→ Post: DRAFT → REVIEW → PUBLISHED → ARCHIVED
```

```prisma
enum OrderStatus {
  PENDING     // Order create hua, payment nahi
  PAID        // Payment successful
  PROCESSING  // Warehouse mein pack ho raha hai
  SHIPPED     // Courier ko diya
  DELIVERED   // Customer ke paas pahuncha
  CANCELLED   // Cancel ho gaya
  REFUNDED    // Refund processed
}

model Order {
  id        String      @id @default(cuid())
  status    OrderStatus @default(PENDING)
  // ...
  
  // Status history track karne ke liye (optional but powerful):
  statusHistory OrderStatusHistory[]
}

// Audit trail — kab kya status tha
model OrderStatusHistory {
  id        String      @id @default(cuid())
  orderId   String
  fromStatus OrderStatus?  // Pehla status (null for initial)
  toStatus  OrderStatus   // Naya status
  changedBy String?       // Kaun ne change kiya (userId)
  note      String?       // Optional reason
  createdAt DateTime      @default(now())

  order     Order @relation(fields: [orderId], references: [id])

  @@index([orderId])
}
```

```
Sample Data — OrderStatusHistory:
┌────────┬──────────┬────────────┬──────────────┬──────────┬─────────────────────┐
│ id     │ orderId  │ fromStatus │ toStatus     │changedBy │ createdAt           │
├────────┼──────────┼────────────┼──────────────┼──────────┼─────────────────────┤
│ h_001  │ ord_001  │ NULL       │ PENDING      │ system   │ 2024-03-01 10:00    │
│ h_002  │ ord_001  │ PENDING    │ PAID         │ system   │ 2024-03-01 10:05    │
│ h_003  │ ord_001  │ PAID       │ PROCESSING   │ u_admin  │ 2024-03-01 11:00    │
│ h_004  │ ord_001  │ PROCESSING │ SHIPPED      │ u_admin  │ 2024-03-02 09:00    │
│ h_005  │ ord_001  │ SHIPPED    │ DELIVERED    │ system   │ 2024-03-04 14:30    │
└────────┴──────────┴────────────┴──────────────┴──────────┴─────────────────────┘

Is se pata chalta hai:
→ Order kitne time mein process hua
→ Kaun ne kya change kiya
→ Customer ke saath dispute ho toh proof hai
```

---

## Case 6 — Polymorphic Relationship (Advanced)

```
Kya hai?
Ek table multiple different tables ko refer kar sakti hai.

Real Example:
→ Comment Post pe bhi ho sakti hai, Video pe bhi, Product pe bhi.
→ Like User ne kisi bhi cheez pe laga sakta hai.
→ Notification kisi bhi event ke baare mein ho sakti hai.
```

```
APPROACH A — Multiple FK columns (Simple, Recommended for small cases):

model Comment {
  id        String  @id @default(cuid())
  text      String
  authorId  String

  // Sirf ek populated hoga, baaki null
  postId    String?
  videoId   String?
  productId String?

  post      Post?    @relation(fields: [postId],    references: [id])
  video     Video?   @relation(fields: [videoId],   references: [id])
  product   Product? @relation(fields: [productId], references: [id])
}

Problem: Har nayi entity pe naya column add karna padega.
```

```prisma
// APPROACH B — Type + targetId (Flexible, but no FK constraint):
model Comment {
  id           String      @id @default(cuid())
  text         String
  authorId     String
  targetType   String      // "POST" | "VIDEO" | "PRODUCT"
  targetId     String      // Jo bhi entity ka id hai

  author       User        @relation(fields: [authorId], references: [id])

  // NOTE: targetId pe foreign key constraint NAHI hoga
  // Application level pe ensure karna padega integrity
  @@index([targetType, targetId])  // ← Yahan comments fetch karne ke liye
}
```

```
Sample Data (Approach B):
┌──────────┬──────────────────┬────────────┬──────────┐
│ id       │ text             │ targetType │ targetId │
├──────────┼──────────────────┼────────────┼──────────┤
│ c_001    │ "Great post!"    │ POST       │ post_123 │
│ c_002    │ "Amazing video"  │ VIDEO      │ vid_456  │
│ c_003    │ "Love this ring" │ PRODUCT    │ prod_789 │
│ c_004    │ "Helpful post"   │ POST       │ post_123 │
└──────────┴──────────────────┴────────────┴──────────┘

Query — Post ke saare comments:
const comments = await prisma.comment.findMany({
  where: {
    targetType: "POST",
    targetId: "post_123"
  }
})
// Returns: c_001, c_004
```

---

## 🎯 Relationship Decision Guide

```
QUESTION: Kaunsa relationship type use karun?

1. "Kya A ka sirf ek B hoga, aur B ka sirf ek A?"
   → One-to-One
   → FK "optional" side pe rakho with @unique

2. "Kya A ke many B honge, par B ka sirf ek A hoga?"
   → One-to-Many (sabse common!)
   → FK "many" (B) side pe rakho

3. "Kya A ke many B honge AUR B ke many A honge?"
   → Many-to-Many
   → Junction table banao

4. "Kya relationship ke baare mein extra data store karna hai?"
   → Explicit junction table (extra columns ke saath)
   → Implicit Prisma junction avoid karo is case mein

5. "Kya ek table apne aap ko refer karti hai?"
   → Self-referential
   → managerId? (nullable FK → same table)

6. "Kya ek cheez multiple different tables ko refer kar sakti hai?"
   → Polymorphic
   → Multiple nullable FKs (simple) ya targetType + targetId (flexible)
```

---

**Next →** `db-03-indexes-performance.md` — Indexes ka full deep dive, composite indexes, EXPLAIN ANALYZE
