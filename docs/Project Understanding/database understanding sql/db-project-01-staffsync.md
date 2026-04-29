# 🗄️ DB Project 1 — StaffSync: Task Manager
### Complete Database Design — PRD se Final Schema Tak

---

## Brief se Entities Nikaalte Hain

```
Brief: "Business owner employees manage kare, tasks assign kare,
        deadlines track kare, status dekhe."

NOUNS extract karo:
→ Business Owner → User (role = ADMIN)
→ Employee       → User (role = EMPLOYEE) — SAME TABLE, alag role
→ Task           → Task entity
→ Deadline       → Task ka dueDate column
→ Status         → Task ka status column (enum)

ENTITIES: User, Task
(Simple! 2 tables. Beginners often over-engineer yahan.)
```

---

## Entity-Relationship Map

```
USER (1) ──────────────── (N) TASK   [createdBy — Admin ne task create kiya]
USER (1) ──────────────── (N) TASK   [assignedTo — Employee ko assign kiya]

One User ke many Tasks hain (dono relations)
Ek Task ka exactly ek creator aur ek assignee hai
```

---

## Column Design — Har Field Ka Decision

```
USER TABLE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field        | Type     | Nullable | Default  | Why
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           | String   | NO       | cuid()   | PK, unique identifier
name         | String   | NO       | —        | Display name, required
email        | String   | NO       | —        | Login, @unique
password     | String   | NO       | —        | Hashed! Never plain text
role         | UserRole | NO       | EMPLOYEE | Default employee jab signup
clerkId      | String   | YES      | —        | Clerk auth sync (if using Clerk)
createdAt    | DateTime | NO       | now()    | Audit trail
updatedAt    | DateTime | NO       | auto     | Last modified tracking
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK TABLE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field        | Type       | Nullable | Default  | Why
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           | String     | NO       | cuid()   | PK
title        | String     | NO       | —        | Task naam, required
description  | String     | YES      | —        | Extra details, optional
status       | TaskStatus | NO       | TODO     | Current state
priority     | Priority   | NO       | MEDIUM   | Urgency level
dueDate      | DateTime   | YES      | —        | Optional deadline
assignedToId | String     | NO       | —        | FK → User (kaun karega)
createdById  | String     | NO       | —        | FK → User (kisne banaya)
createdAt    | DateTime   | NO       | now()    | Audit trail
updatedAt    | DateTime   | NO       | auto     | Last modified
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Final Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUMS ──────────────────────────────────────────────────
enum UserRole {
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

// ─── MODELS ─────────────────────────────────────────────────
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      UserRole @default(EMPLOYEE)
  clerkId   String?  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations — named because same table appears twice
  assignedTasks Task[] @relation("AssignedTasks")
  createdTasks  Task[] @relation("CreatedTasks")

  @@map("users")
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
  @@index([assignedToId])           // Employee ke tasks fetch karna
  @@index([status])                 // Status filter
  @@index([dueDate])                // Overdue tasks
  @@index([assignedToId, status])   // "Mere pending tasks" — most common query

  @@map("tasks")
}
```

---

## Sample Data — Tables Kaise Fill Hongi

```
users table:
┌──────────────┬──────────────────┬────────────────────────┬──────────┐
│ id           │ name             │ email                  │ role     │
├──────────────┼──────────────────┼────────────────────────┼──────────┤
│ u_rohan001   │ Rohan Sharma     │ rohan@staffsync.com    │ ADMIN    │
│ u_rahul002   │ Rahul Verma      │ rahul@staffsync.com    │ EMPLOYEE │
│ u_priya003   │ Priya Singh      │ priya@staffsync.com    │ EMPLOYEE │
│ u_amit004    │ Amit Patel       │ amit@staffsync.com     │ EMPLOYEE │
└──────────────┴──────────────────┴────────────────────────┴──────────┘

tasks table:
┌──────────────┬──────────────────────────┬────────────┬──────────┬──────────────┬─────────────┐
│ id           │ title                    │ status     │ priority │ assignedToId │ createdById │
├──────────────┼──────────────────────────┼────────────┼──────────┼──────────────┼─────────────┤
│ t_task001    │ Design homepage mockup   │ TODO       │ HIGH     │ u_rahul002   │ u_rohan001  │
│ t_task002    │ Fix login page bug       │ IN_PROGRESS│ HIGH     │ u_rahul002   │ u_rohan001  │
│ t_task003    │ Write API documentation  │ TODO       │ MEDIUM   │ u_priya003   │ u_rohan001  │
│ t_task004    │ Setup CI/CD pipeline     │ DONE       │ LOW      │ u_priya003   │ u_rohan001  │
│ t_task005    │ Review PR #42            │ TODO       │ MEDIUM   │ u_amit004    │ u_priya003  │
└──────────────┴──────────────────────────┴────────────┴──────────┴──────────────┴─────────────┘

NOTICE:
→ t_task005 → createdById = u_priya003 (Employee ne bhi task create ki)
  Matlab koi bhi task create kar sakta hai, sirf admin nahi
  (Ya tum restrict kar sakte ho Server Action mein role check se)
→ u_rahul002 ke 2 tasks hain — t_task001, t_task002 (One-to-Many clearly visible)
→ u_rohan001 kabhi assignedToId mein nahi — Admin khud tasks nahi karta

Queries aur results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query 1: "Rahul ke saare tasks"
WHERE assignedToId = 'u_rahul002'
Result: t_task001, t_task002

Query 2: "Saare TODO tasks"
WHERE status = 'TODO'
Result: t_task001, t_task003, t_task005

Query 3: "Rahul ke TODO tasks" (composite index use hoga)
WHERE assignedToId = 'u_rahul002' AND status = 'TODO'
Result: t_task001 only

Query 4: "Admin dashboard — status count"
SELECT status, COUNT(*) FROM tasks GROUP BY status
Result: TODO: 3, IN_PROGRESS: 1, DONE: 1
```

---

## Prisma Queries — Common Operations

```typescript
// 1. Employee ka tasks fetch karo:
const myTasks = await prisma.task.findMany({
  where: {
    assignedToId: currentUserId,
    status: { not: 'DONE' }  // Done exclude karo
  },
  orderBy: [
    { priority: 'desc' },   // HIGH first
    { dueDate: 'asc' }      // Earliest deadline first
  ],
  include: {
    createdBy: {
      select: { name: true }  // Sirf naam chahiye
    }
  }
})

// 2. Admin dashboard stats:
const stats = await prisma.task.groupBy({
  by: ['status'],
  _count: { status: true }
})
// Result: [{ status: 'TODO', _count: { status: 3 } }, ...]

// 3. Overdue tasks:
const overdueTasks = await prisma.task.findMany({
  where: {
    dueDate: { lt: new Date() },  // Less than today
    status: { not: 'DONE' }
  },
  include: {
    assignedTo: { select: { name: true, email: true } }
  }
})

// 4. Task create karo:
const newTask = await prisma.task.create({
  data: {
    title: 'New task title',
    description: 'Optional description',
    priority: 'HIGH',
    dueDate: new Date('2024-12-31'),
    assignedToId: employeeId,
    createdById: adminId,
  }
})

// 5. Status update karo:
const updatedTask = await prisma.task.update({
  where: { id: taskId },
  data: { status: 'IN_PROGRESS' }
})
```

---

## Interview Points — Ye Bolna Hai

```
"StaffSync ka database design mein ek interesting decision tha —
User table ek hi hai Admin aur Employee dono ke liye.
Do separate tables banane ki zaroorat nahi thi — role column se differentiate hota hai.

Task table mein do FK hain same User table pe —
assignedToId aur createdById — dono alag relations hain.
Prisma mein named relations use ki — 'AssignedTasks' aur 'CreatedTasks'.

Composite index lagayi @@index([assignedToId, status]) kyunki
sabse frequent query thi 'mere pending tasks' — employee dashboard pe.
Ye Prisma automatically nahi karta, manually add karna padta hai."
```

---

**Next →** `db-project-02-hirehop.md` — Job Board schema
