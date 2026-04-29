# 🗄️ DB Doc 3 — Indexes & Performance
### Kab Lagao, Kab Nahi, Composite Indexes, Real Query Patterns

---

## Index Kya Hai — Simple Explanation

```
Book analogy:
→ Ek 500 page book hai — "database design ke baare mein"
→ Tum "normalization" dhundhna chahte ho
→ Option A: Har page padho — page 1, 2, 3... 500 tak
            → Slow! O(n) — poori table scan
→ Option B: Book ke end mein index dekho — "Normalization: Page 234"
            → Fast! O(log n) — direct jump

Database index bilkul yahi karta hai.
```

```
Technical reality:
→ Index ek separate B-Tree data structure hai
→ Column values sorted order mein store hoti hain
→ Database quickly "jump" kar sakta hai relevant rows pe
→ Bina index ke → Sequential Scan (har row check hoti hai)
→ Index ke saath → Index Scan (sirf relevant rows)

COST:
→ Read queries FAST hoti hain index ke saath ✅
→ Write queries (INSERT/UPDATE/DELETE) SLOW hoti hain ❌
   (kyunki index bhi update karna padta hai)
→ Storage space extra lagti hai ❌

YE TRADEOFF HAI — blindly sab pe index mat lagao!
```

---

## Automatic Indexes (Prisma mein)

```
Ye automatically indexed hote hain — tumhe kuch nahi karna:

1. @id → Primary key — always indexed
2. @unique → Unique constraint — automatically indexed

model User {
  id    String @id @default(cuid())  // ← AUTO indexed
  email String @unique               // ← AUTO indexed
  name  String                       // ← NOT indexed
}
```

---

## Manually Index Kab Lagao

### Rule 1 — FK Columns (Almost Always!)

```
Prisma automatically FK columns index NAHI karta.
Par FK pe queries bahut frequent hoti hain.

model Task {
  assignedToId String  // ← FK — Prisma index nahi lagata!

  @@index([assignedToId])  // ← Manually lagao!
}

Kyun zaroori hai?
Query: "Rahul ke saare tasks do"
→ WHERE assignedToId = 'u_rahul'
→ Bina index: Full table scan — 10,000 tasks sab check hote hain
→ Index ke saath: Direct jump — sirf Rahul ke tasks
```

### Rule 2 — Frequently WHERE Clause Mein Use Hone Wale Columns

```
Apni app ki common queries socho:

"Active tasks dikhao"        → WHERE status = 'TODO'        → index on status
"Aaj due tasks"              → WHERE dueDate = today        → index on dueDate
"North region sales"         → WHERE region = 'north'       → index on region
"Published posts"            → WHERE published = true       → index on published
"Last 30 days orders"        → WHERE createdAt >= 30dAgo    → index on createdAt

model Task {
  status   TaskStatus
  dueDate  DateTime?

  @@index([status])
  @@index([dueDate])
}
```

### Rule 3 — ORDER BY Columns

```
"Latest orders pehle dikhao"    → ORDER BY createdAt DESC
"Cheapest products pehle"       → ORDER BY price ASC

Agar frequently sort karte ho ek column pe → index lagao.

model Order {
  createdAt DateTime @default(now())

  @@index([createdAt])  // ← Sorting fast ho jaayegi
}
```

---

## Composite Index — Multiple Columns Together

```
Kab use karo?
Jab ek query mein do ya zyada columns SAATH mein filter hote hain.

Common Example:
"Rahul ke saare TODO tasks do"
→ WHERE assignedToId = 'u_rahul' AND status = 'TODO'

Two separate indexes:
→ @@index([assignedToId])  → Rahul ke tasks milte hain (bahut)
→ @@index([status])        → TODO tasks milte hain (bahut)
Database dono results ko intersect karta hai — still work

ONE composite index:
→ @@index([assignedToId, status])
→ Direct: Rahul ke TODO tasks → instant!
```

```
COLUMN ORDER MATTERS IN COMPOSITE INDEX!

@@index([assignedToId, status])

Ye index kaam karega:
✅ WHERE assignedToId = X                      (first column)
✅ WHERE assignedToId = X AND status = Y       (both columns)
❌ WHERE status = Y                            (only second column — WON'T use this index)

Rule: Left-most prefix rule
→ Query mein leftmost column zaroor honi chahiye index use ke liye
→ Most selective column pehle rakho (jis column ki values zyada unique hain)
```

```prisma
model Task {
  id           String     @id @default(cuid())
  title        String
  status       TaskStatus @default(TODO)
  priority     Priority   @default(MEDIUM)
  dueDate      DateTime?
  assignedToId String
  createdById  String
  createdAt    DateTime   @default(now())

  // Single column indexes:
  @@index([assignedToId])        // "Mere tasks"
  @@index([status])              // "All TODO tasks"
  @@index([dueDate])             // "Aaj due tasks"
  @@index([createdAt])           // "Latest tasks" sorting

  // Composite indexes (specific query patterns ke liye):
  @@index([assignedToId, status])   // "Mere TODO tasks"
  @@index([assignedToId, dueDate])  // "Mere tasks sorted by deadline"
}
```

---

## Real Query Patterns — 5 Projects Ke Examples

### StaffSync (Task Manager)

```
Frequent queries:
1. "Employee apne tasks dekhta hai" → assignedToId
2. "Admin status se filter karta hai" → status
3. "Overdue tasks" → dueDate < today
4. "Rahul ke pending tasks" → assignedToId + status (composite!)

model Task {
  @@index([assignedToId])
  @@index([status])
  @@index([dueDate])
  @@index([assignedToId, status])  // Most important composite
}
```

### HireHop (Job Board)

```
Frequent queries:
1. "Active jobs dikhao" → status = ACTIVE
2. "Remote jobs" → jobType = REMOTE
3. "Search by title" → Full-text search (special index)
4. "Employer ki jobs" → employerId
5. "Seeker ki applications" → seekerId

model Job {
  @@index([employerId])
  @@index([status])
  @@index([jobType])
  @@index([status, jobType])  // "Active remote jobs"
  // Full-text search ke liye special setup (PostgreSQL tsvector)
}

model Application {
  @@index([jobId])      // "Is job ke saare applications"
  @@index([seekerId])   // "Mere saare applications"
  @@index([jobId, seekerId])  // Duplicate check ke liye (+ @@unique)
}
```

### ShopKaro (E-Commerce)

```
Frequent queries:
1. "Category ke products" → categoryId
2. "Active products" → status = ACTIVE
3. "Cheap to expensive sort" → price (ORDER BY)
4. "Customer ke orders" → customerId (if user accounts)
5. "Order items" → orderId

model Product {
  @@index([categoryId])
  @@index([status])
  @@index([price])               // Sorting
  @@index([status, categoryId])  // "Active jewellery"
}

model Order {
  @@index([customerEmail])  // Customer orders history
  @@index([status])         // "Pending orders" admin view
  @@index([createdAt])      // Latest orders first
}

model OrderItem {
  @@index([orderId])    // Order ke items fetch karo
  @@index([productId])  // Product kitni baar order hua (analytics)
}
```

### DataLens (Analytics Dashboard)

```
Analytics queries MOST heavy hoti hain — indexes yahan CRITICAL hain.

Frequent queries:
1. "Last 30 days sales" → saleDate range
2. "Region wise sales" → region
3. "Salesperson performance" → salespersonId
4. "Product wise revenue" → productId

model Sale {
  @@index([saleDate])                    // Date range queries
  @@index([region])                      // Region filter
  @@index([salespersonId])               // Per-person
  @@index([productId])                   // Per-product
  @@index([saleDate, region])            // "North region last month"
  @@index([saleDate, salespersonId])     // "Rahul last quarter"
}

IMPORTANT NOTE FOR ANALYTICS:
Agar table bahut badi ho (millions of rows):
→ Regular indexes enough nahi honge
→ Materialized Views consider karo (precomputed aggregations)
→ Partitioning consider karo (data by year/month)
→ Ya dedicated analytics DB (ClickHouse, BigQuery)
```

---

## Kab Index MAT Lagao

```
❌ AVOID INDEX JAB:

1. Table chhoti ho (< 1000 rows):
   → Full scan itna fast hai ki index overhead zyada hai
   → Users table of a small app — index overkill

2. Column mein bahut kam unique values hon (Low Cardinality):
   → Boolean column (true/false) — index useless
   → Gender column (3-4 values) — poor selectivity
   → Exception: Agar ek value bahut rare ho ("isAdmin = true" — sirf 2 admins hain)

3. Column rarely queried ho:
   → Internal notes field jo sirf admin dekhta hai kabhi kabhi
   → Index maintain karna write performance hurt karega

4. Sab columns pe index lagana:
   → ❌ WRONG approach
   → Every write (INSERT/UPDATE/DELETE) SLOW ho jaayega
   → Storage bahut badhegi
   → Database optimizer confuse ho sakta hai

SIMPLE RULE:
"Pehle bina index ke start karo. Slow queries pe index add karo."
Premature optimization avoid karo.
```

---

## Index Check Kaise Karo (EXPLAIN)

```sql
-- PostgreSQL mein query plan dekho:
EXPLAIN ANALYZE
SELECT * FROM tasks
WHERE "assignedToId" = 'u_rahul'
AND status = 'TODO';

-- Output mein dekho:
-- "Seq Scan" → Full table scan — index nahi use ho raha ❌
-- "Index Scan" → Index use ho raha hai ✅
-- "Bitmap Heap Scan" → Index use ho raha, multiple rows ✅

-- Prisma se raw SQL run karne ke liye:
const result = await prisma.$queryRaw`
  EXPLAIN ANALYZE
  SELECT * FROM tasks
  WHERE "assignedToId" = ${userId}
  AND status = 'TODO'
`
```

---

## Summary — Index Checklist

```
HAR TABLE KE LIYE YE SOCHO:

[ ] FK columns indexed hain? (Prisma auto nahi karta)
[ ] Frequently WHERE mein use hone wale columns indexed hain?
[ ] ORDER BY mein use hone wale columns indexed hain?
[ ] Common query patterns ke liye composite indexes hain?
[ ] Boolean / low cardinality columns pe unnecessary index toh nahi lagaya?
[ ] Very small tables pe unnecessary index toh nahi?

REMEMBER:
→ Read fast = write slow (tradeoff)
→ Pehle bina index ke shuru karo
→ Slow query mile → tab index add karo
→ EXPLAIN ANALYZE se verify karo
```

---

**Next →** `db-04-common-patterns.md` — Naming conventions, migrations, seeding, common mistakes
