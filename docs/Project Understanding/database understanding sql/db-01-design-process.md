# 🗄️ DB Doc 1 — SQL Database Design Process
### Har Project Ke Liye — Code Likhne Se Pehle Ye Karo

---

## 🎯 The Core Idea

> **Database design galat ho gayi toh baad mein fix karna BAHUT painful hai.**
> Migration likhna padega, data transform karna padega, existing code tootega.
> Isliye — pehle sochho, phir banao.

Ye 7-step process hai. Har project mein isko follow karo — chota ho ya bada.

---

## Step 1 — Entity Identification (Kya store karna hai?)

**Entity = Real-world cheez jo database mein store karni hai.**

PRD padhke entities nikaalte hain. Ek simple rule hai:

```
✅ Entity hai agar:
→ Uske multiple attributes hain (name, email, price...)
→ Uske baare mein queries karni hongi
→ Dusri cheezein usse refer karengi

❌ Entity NAHI hai agar:
→ Wo sirf ek action hai (login, logout, click)
→ Wo ek attribute hai kisi aur ka (user ka email → User entity ka column)
→ Wo derived hai (age = today - birthdate → store mat karo, calculate karo)
```

**Example — StaffSync (Task Manager) ke liye entities dhundhna:**

```
Client requirement padhte hain:
"Business owner employees manage kare, tasks assign kare, deadlines track kare"

Nouns nikaalte hain brief se:
→ Business Owner    → User entity (role = admin)
→ Employee          → User entity (role = employee) [SAME TABLE!]
→ Task              → Task entity
→ Deadline          → Task ka attribute hai, alag entity nahi
→ Status            → Task ka attribute hai

Final entities:
→ User
→ Task

Itna simple? Haan! Pehle minimal rakhho.
```

**Ye Galti Mat Karo:**

```
❌ WRONG — Over-engineering:
"Login history track karni chahiye" → LoginHistory entity banao
"Task comments chahiye" → Comment entity (ye V2 mein add karna theek hai)

✅ RIGHT — MVP ke liye:
Sirf wo entities jo core features ke liye ZAROORI hain.
Baaki baad mein add karo — adding is easy, removing is hard.
```

---

## Step 2 — Attributes Define Karo (Columns Socho)

Har entity ke liye columns socho. **DO CATEGORIES** hain:

### Category A — Mandatory Columns (HAMESHA RAKHNA HAI)

```
Ye columns har table mein hone chahiye — no exceptions:

id          → Primary key. UUID ya SERIAL/INT.
created_at  → Kab create hua. TIMESTAMP DEFAULT NOW()
updated_at  → Kab last update hua. AUTO-UPDATE karna hai.

Kyun zaroori hain?
→ id: Har row uniquely identify hoti hai
→ created_at: Audit trail, sorting by creation, analytics
→ updated_at: "Recently updated" queries, cache invalidation

Prisma mein:
model User {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Category B — Domain Columns (Project-specific)

```
Har attribute ke liye ye questions poochho:

1. REQUIRED hai ya OPTIONAL?
   → Required = NOT NULL
   → Optional = nullable (?)

2. UNIQUE hona chahiye?
   → Email → unique (do users same email nahi rakh sakte)
   → Name → usually not unique

3. DEFAULT value hai?
   → status → default 'active'
   → role   → default 'user'

4. KAUNSA TYPE?
   → Short text (name, email)     → String / VARCHAR
   → Long text (description, bio) → String (TEXT in DB)
   → Number (price, quantity)     → Int ya Float ya Decimal
   → True/False                   → Boolean
   → Date only                    → DateTime (just date part use karo)
   → Date + Time                  → DateTime
   → Fixed options (status, role) → Enum
   → JSON/Array                   → Json type (use sparingly)

5. SENSITIVE hai?
   → Password → kabhi plain text nahi, hashed store karo
   → Aisa koi field jo log mat karna chahte → careful
```

**Example — Task entity ke attributes:**

```
Requirement: "Task ka title, description, deadline, status, priority hoga.
              Kisi employee ko assign hoga. Admin ne create kiya hoga."

Attributes list karo:
→ title       : String, REQUIRED (task ka naam)
→ description : String, OPTIONAL (extra details)
→ status      : Enum ('todo', 'in_progress', 'done'), DEFAULT 'todo'
→ priority    : Enum ('low', 'medium', 'high'), DEFAULT 'medium'
→ dueDate     : DateTime, OPTIONAL (deadline)
→ assignedTo  : FK → User (kaun karega)
→ createdBy   : FK → User (kisne banaya)
+ mandatory: id, createdAt, updatedAt

❌ Jo include NAHI kiya aur kyun:
→ assigneeName  : User table se JOIN se milega — duplicate mat rakho
→ completedAt   : V1 mein nahi chahiye, V2 mein add karenge
→ taskNumber    : Auto-increment ID enough hai
```

---

## Step 3 — Relationships Map Karo

Teen types hain. Ek ek clearly samjho:

---

### Type 1 — One-to-One (1:1)

```
Definition: Ek row A ki exactly ek row B se match hoti hai.

Real Example:
→ User aur UserProfile
   Ek user ka exactly ek profile hota hai.
   Ek profile exactly ek user ka hota hai.

Kab use karo?
→ Jab koi cheez optional hai ya rarely accessed hai
   (profile data sirf profile page pe chahiye, har query mein nahi)
→ Jab table bahut wide ho jaaye — split karo

DATABASE MEIN KAISE:
User table mein kuch nahi badalta.
UserProfile table mein → userId FK with UNIQUE constraint.
UNIQUE kyun? Agar unique nahi hai toh one-to-MANY ban jaayega!

Prisma mein:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
model User {
  id      String       @id @default(cuid())
  email   String       @unique
  profile UserProfile?  // ← Optional kyunki profile baad mein banta hai
}

model UserProfile {
  id        String   @id @default(cuid())
  bio       String?
  avatarUrl String?
  userId    String   @unique  // ← UNIQUE = one-to-one enforce hota hai
  user      User     @relation(fields: [userId], references: [id])
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sample Data:
User table:
┌──────────────┬─────────────────────┐
│ id           │ email               │
├──────────────┼─────────────────────┤
│ user_abc123  │ rahul@example.com   │
│ user_def456  │ priya@example.com   │
└──────────────┴─────────────────────┘

UserProfile table:
┌──────────────┬──────────────────────┬──────────────┐
│ id           │ bio                  │ userId       │
├──────────────┼──────────────────────┼──────────────┤
│ prof_111     │ "Senior Designer"    │ user_abc123  │
│ prof_222     │ "Product Manager"    │ user_def456  │
└──────────────┴──────────────────────┴──────────────┘

Notice: userId column mein user_abc123 sirf ek baar appear hota hai.
UNIQUE constraint ensure karta hai ki ek user ka sirf ek profile ho.
```

---

### Type 2 — One-to-Many (1:N) ← Sabse Common!

```
Definition: Ek row A ki MANY rows B se match hoti hain.
            Ek row B ki exactly EK row A se match hoti hai.

Real Examples:
→ User → Tasks    (ek user ke many tasks)
→ Post → Comments (ek post ke many comments)
→ Order → OrderItems (ek order ke many items)
→ Category → Products (ek category ke many products)

DATABASE MEIN KAISE:
"Many" wali table mein FK column add karo.
Tasks mein assignedToId → User ka id.

Rule: FK hamesha "MANY" side pe hota hai.

Prisma mein:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
model User {
  id             String   @id @default(cuid())
  email          String   @unique
  assignedTasks  Task[]   @relation("AssignedTasks")
  createdTasks   Task[]   @relation("CreatedTasks")
  // ↑ Ek user ke many tasks — dono relations!
}

model Task {
  id           String   @id @default(cuid())
  title        String
  assignedToId String
  createdById  String
  assignedTo   User     @relation("AssignedTasks", fields: [assignedToId], references: [id])
  createdBy    User     @relation("CreatedTasks", fields: [createdById], references: [id])
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sample Data:
User table:
┌──────────────┬───────────────────────┬─────────┐
│ id           │ email                 │ role    │
├──────────────┼───────────────────────┼─────────┤
│ user_abc123  │ boss@company.com      │ admin   │
│ user_def456  │ rahul@company.com     │ employee│
│ user_ghi789  │ priya@company.com     │ employee│
└──────────────┴───────────────────────┴─────────┘

Task table:
┌──────────────┬──────────────────────┬──────────────┬──────────────┐
│ id           │ title                │ assignedToId │ createdById  │
├──────────────┼──────────────────────┼──────────────┼──────────────┤
│ task_001     │ Design homepage      │ user_def456  │ user_abc123  │
│ task_002     │ Write API docs       │ user_def456  │ user_abc123  │
│ task_003     │ Review designs       │ user_ghi789  │ user_abc123  │
│ task_004     │ Fix login bug        │ user_ghi789  │ user_abc123  │
└──────────────┴──────────────────────┴──────────────┴──────────────┘

Notice:
→ user_def456 ke 2 tasks hain (task_001, task_002) — "many" side
→ user_abc123 ne saare tasks create kiye — FK points back to "one" side
→ user_abc123 ka id Task table mein REPEAT hota hai — ye normal hai!
```

---

### Type 3 — Many-to-Many (M:N)

```
Definition: Ek row A ki MANY rows B se match hoti hain.
            Ek row B ki bhi MANY rows A se match hoti hain.

Real Examples:
→ Student ↔ Course    (ek student many courses, ek course mein many students)
→ Product ↔ Tag       (ek product ke many tags, ek tag many products pe)
→ User ↔ Room (Chat)  (ek user many rooms mein, ek room mein many users)
→ Order ↔ Product     (ek order mein many products, ek product many orders mein)

DATABASE MEIN KAISE:
Direct possible NAHI hai. Ek "Junction Table" (Bridge Table) banani padti hai.
Junction table dono tables ko connect karti hai.

Junction table mein hamesha:
→ Table A ka FK
→ Table B ka FK
→ Dono ka combination UNIQUE hona chahiye (ek student ek course mein sirf ek baar)
→ Optional: Extra columns (jaise enrollment date, grade)

Prisma mein (implicit — Prisma auto junction table banata hai):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
model Student {
  id      String   @id @default(cuid())
  name    String
  courses Course[] // ← Prisma automatically junction table banata hai
}

model Course {
  id       String    @id @default(cuid())
  title    String
  students Student[] // ← Dono side pe array
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Prisma mein (explicit — jab extra columns chahiye):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
model Student {
  id          String       @id @default(cuid())
  name        String
  enrollments Enrollment[] // ← Junction table se connect
}

model Course {
  id          String       @id @default(cuid())
  title       String
  enrollments Enrollment[]
}

model Enrollment {  // ← JUNCTION TABLE (explicit)
  id           String   @id @default(cuid())
  studentId    String
  courseId     String
  enrolledAt   DateTime @default(now())  // ← Extra column!
  grade        String?                   // ← Extra column!

  student      Student  @relation(fields: [studentId], references: [id])
  course       Course   @relation(fields: [courseId], references: [id])

  @@unique([studentId, courseId])  // ← Ek student ek course mein sirf ek baar
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sample Data:
Student table:
┌──────────┬───────────┐
│ id       │ name      │
├──────────┼───────────┤
│ s_001    │ Rahul     │
│ s_002    │ Priya     │
│ s_003    │ Arjun     │
└──────────┴───────────┘

Course table:
┌──────────┬───────────────────┐
│ id       │ title             │
├──────────┼───────────────────┤
│ c_001    │ React Basics      │
│ c_002    │ Next.js Advanced  │
│ c_003    │ Database Design   │
└──────────┴───────────────────┘

Enrollment table (Junction):
┌──────────┬──────────┬──────────┬─────────────┬───────┐
│ id       │ studentId│ courseId │ enrolledAt  │ grade │
├──────────┼──────────┼──────────┼─────────────┼───────┤
│ e_001    │ s_001    │ c_001    │ 2024-01-15  │ A     │
│ e_002    │ s_001    │ c_002    │ 2024-01-15  │ B+    │  ← Rahul 2 courses mein
│ e_003    │ s_002    │ c_001    │ 2024-01-20  │ A+    │  ← Priya React mein
│ e_004    │ s_002    │ c_003    │ 2024-01-20  │ B     │  ← Priya DB mein bhi
│ e_005    │ s_003    │ c_002    │ 2024-02-01  │ null  │  ← Arjun Next.js mein
└──────────┴──────────┴──────────┴─────────────┴───────┘

Notice:
→ s_001 (Rahul) → c_001 aur c_002 dono mein enrolled
→ c_001 (React) mein s_001 aur s_002 dono enrolled
→ Combination (s_001, c_001) sirf ek baar — UNIQUE constraint
```

---

## Step 4 — Normalization Check

> Simple rule: **Har fact ek jagah store hona chahiye.**

```
NORMALIZATION KE 3 COMMON RULES (simplified):

RULE 1 — Ek column mein ek hi value:
❌ WRONG:
User table mein → phoneNumbers: "9876543210, 8765432109"
Multiple values ek column mein = BAD

✅ RIGHT:
PhoneNumber table banao → userId FK + phoneNumber column

RULE 2 — Non-key columns sirf primary key pe depend karein:
❌ WRONG:
Order table mein → customerName, customerEmail (User table se bhi mil sakta hai!)
Duplicate data = agar user name change kare → 2 jagah update karna padega

✅ RIGHT:
Order table mein sirf userId rakho → JOIN se customerName milega

RULE 3 — Columns ek dusre pe depend nahi karein:
❌ WRONG:
Product table mein → category: "Electronics", categoryDescription: "Gadgets & Devices"
categoryDescription category pe depend karta hai, product pe nahi

✅ RIGHT:
Category alag table mein → Product mein sirf categoryId FK

INTENTIONAL DENORMALIZATION (ye okay hai):
→ OrderItem mein unitPrice snapshot — product price change hone se order affect na ho
→ Analytics table mein precomputed totals — frequent heavy queries avoid karne ke liye
→ Ye decisions CONSCIOUS hone chahiye, accidental nahi
```

---

## Step 5 — Indexes Decide Karo

```
INDEX KYA HAI?
→ Table ka ek "index" — jaise book ka index
→ Database quickly find kar sakta hai bina poori table scan kiye
→ Read queries fast, par write queries thodi slow (index bhi update hota hai)

AUTOMATIC INDEXES:
→ Primary key (@id) — always indexed automatically
→ @unique fields — always indexed automatically

MANUALLY ADD KARO (@@index) JAB:
→ Column pe frequently WHERE clause use hota hai
→ Column pe frequently ORDER BY hota hai
→ FK columns (Prisma automatically index nahi karta FK ko!)
→ JOIN mein frequently use hota hai

EXAMPLE — Task table:
model Task {
  id           String   @id // ← auto indexed
  status       TaskStatus
  assignedToId String   // ← FK — manually index karo!
  createdById  String   // ← FK — manually index karo!
  dueDate      DateTime?
  createdAt    DateTime @default(now())

  @@index([assignedToId])  // ← "Mere saare tasks" query ke liye
  @@index([status])        // ← "Saare pending tasks" filter ke liye
  @@index([dueDate])       // ← "Aaj due tasks" query ke liye
  @@index([assignedToId, status])  // ← Composite: "Rahul ke pending tasks"
}

KAB INDEX MAT LAGAO:
→ Har column pe index lagana WRONG hai
→ Small tables pe (< 1000 rows) — full scan fast enough hai
→ Columns jo rarely queried hain
→ Boolean columns (low cardinality — sirf 2 values = index useless)
```

---

## Step 6 — Constraints & Validations

```
DATABASE LEVEL VALIDATION — Application se zyada reliable hai!
(Application bypass ho sakti hai — database nahi)

PRISMA MEIN CONSTRAINTS:

1. NOT NULL (default in Prisma — ? lagane se nullable hota hai):
   title  String    // ← NOT NULL — required
   bio    String?   // ← NULLABLE — optional

2. UNIQUE:
   email  String  @unique
   slug   String  @unique
   @@unique([firstName, lastName])  // ← Composite unique

3. DEFAULT VALUES:
   role      Role     @default(USER)
   status    Status   @default(ACTIVE)
   createdAt DateTime @default(now())

4. ENUM (Fixed values only):
   enum TaskStatus {
     TODO
     IN_PROGRESS
     DONE
   }
   status TaskStatus @default(TODO)

5. FOREIGN KEY BEHAVIOR (ON DELETE):
   // Agar User delete ho toh uske Tasks ka kya?
   
   Cascade  → Tasks bhi delete ho jaayenge (risky!)
   SetNull  → assignedToId null ho jaayega (user gone, task remains)
   Restrict → User delete nahi hoga jab tak tasks hain (safe!)
   
   assignedTo User @relation(fields: [assignedToId], references: [id], onDelete: SetNull)
   createdBy  User @relation(fields: [createdById], references: [id], onDelete: Restrict)
```

---

## Step 7 — Final Schema Write Karo

Ye sab steps ke baad Prisma schema likhte hain. Format:

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUMS ────────────────────────────────────────
enum Role {
  ADMIN
  EMPLOYEE
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}

// ─── MODELS ───────────────────────────────────────
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String   // hashed — never plain text!
  role      Role     @default(EMPLOYEE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  assignedTasks Task[] @relation("AssignedTasks")
  createdTasks  Task[] @relation("CreatedTasks")

  @@map("users")  // ← actual table name in DB
}

model Task {
  id           String     @id @default(cuid())
  title        String
  description  String?
  status       TaskStatus @default(TODO)
  priority     Priority   @default(MEDIUM)
  dueDate      DateTime?
  assignedToId String
  createdById  String
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  // Relations
  assignedTo User @relation("AssignedTasks", fields: [assignedToId], references: [id], onDelete: Restrict)
  createdBy  User @relation("CreatedTasks",  fields: [createdById],  references: [id], onDelete: Restrict)

  // Indexes
  @@index([assignedToId])
  @@index([status])
  @@index([dueDate])
  @@index([assignedToId, status])

  @@map("tasks")
}
```

---

## ✅ The Complete Pre-Code DB Checklist

```
[ ] Step 1: Entities identify ki? (nouns from PRD)
[ ] Step 2: Har entity ke columns list kiye?
    [ ] Mandatory columns (id, createdAt, updatedAt)?
    [ ] Required vs nullable decide kiya?
    [ ] Data types decide kiye?
    [ ] Enums identify kiye?
[ ] Step 3: Relationships map kiye?
    [ ] One-to-One?
    [ ] One-to-Many? (FK "many" side pe hai?)
    [ ] Many-to-Many? (Junction table banai?)
[ ] Step 4: Normalization check?
    [ ] Duplicate data toh nahi?
    [ ] Snapshot fields intentional hain?
[ ] Step 5: Indexes decide kiye?
    [ ] FK columns indexed?
    [ ] Frequently filtered columns indexed?
[ ] Step 6: Constraints set kiye?
    [ ] Enums use kiye fixed values ke liye?
    [ ] onDelete behavior decide kiya?
[ ] Step 7: Final Prisma schema likha?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AB CODE LIKHNA SHURU KAR SAKTE HO! 🚀
```

---

**Next →** `db-02-relationships-deep.md` — Relationships ka full deep dive with tricky cases
