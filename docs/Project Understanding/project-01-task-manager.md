# 🚀 Project 1 — StaffSync: Task Management SaaS
### Small Business ke liye Employee Task Tracker

---

## 💬 The Brief — Client Ne Kya Kaha

> *"Bhai, mera ek chhota business hai — 8 employees hain. WhatsApp pe tasks assign karta hoon,
> sab bhool jaate hain. Koi simple tool chahiye jisme main tasks assign kar sakoon,
> deadlines set kar sakoon, aur dekh sakoon kaun kya kar raha hai.
> Koi Jira jaisi complicated cheez nahi chahiye — simple rakhna."*

Theek hai. Samajh aaya. Ye ek **internal task management tool** hai — chhoti team ke liye, non-technical users.

---

## 📋 Step 1 — PRD Lite

```
PROJECT NAME  : StaffSync
TYPE          : Internal Web App / SaaS (single business use)
ONE LINE      : "Ye ek task management tool hai jo chhote business
                 owners ke liye unki team ke kaam ko track karne mein
                 madad karta hai."

TARGET USER:
  Primary   → Business Owner / Manager (Admin)
              Non-technical, mobile se bhi use karega
  Secondary → Employee (limited access — sirf apne tasks dekhega)

CORE FEATURES (MVP):
  [ ] Auth (login/logout) — Google ya email
  [ ] Admin: Employee add/remove karna
  [ ] Admin: Task create karna + employee ko assign karna
  [ ] Admin: Dashboard — sab tasks ka status ek jagah
  [ ] Employee: Apne assigned tasks dekhna
  [ ] Employee: Task status update karna (Todo → In Progress → Done)
  [ ] Deadline set karna + overdue highlight karna

STRETCH (V2):
  [ ] Email/push notifications on assignment
  [ ] Comments on tasks
  [ ] File attachments
  [ ] Analytics (completion rate, employee performance)

OUT OF SCOPE:
  ❌ Mobile app (web responsive enough hai)
  ❌ Multiple organizations / multi-tenant
  ❌ Time tracking
  ❌ Billing / payments
```

---

## 🏗️ Step 2 — Architecture Decisions

Chalo ek ek karke sochte hain.

---

**Framework → Next.js App Router**

Yahan koi debate nahi. Full-stack chahiye, SEO ka zyada concern nahi (internal tool hai), aur Server Actions use karna hai. Next.js perfect hai.

---

**API Style → Server Actions ✅ (REST nahi)**

Ye ek interesting decision hai. Kyun Server Actions?

```
Client ne specifically bola: "Sirf web app banana hai."
→ Koi mobile app nahi
→ Koi external third-party consumers nahi
→ Webhook endpoints nahi chahiye

Toh REST API routes banane ki zaroorat hi nahi thi.
Server Actions se directly form submit hoti hai → server pe execute hoti hai.
TypeScript ke saath type safety automatic hai.
Less boilerplate — no fetch(), no response.json(), no route file.

Agar kal mobile app banana hota → tab REST routes add karte.
Par abhi, Server Actions cleaner approach hai.
```

---

**Auth → Clerk ✅**

```
Kyun Clerk?
→ Setup bahut fast hai — 30 minutes mein done
→ UI components included hain (login page, user button — sab ready)
→ Google + Email login out of the box
→ User management dashboard bhi milta hai (admin ke liye helpful)

Kyun NextAuth nahi?
→ NextAuth mein zyada custom code likhna padta — callbacks, providers config
→ Is project mein auth complex nahi hai, toh Clerk ka simplicity win karta hai
→ Custom UI chahiye hoti ya full control chahiye hoti toh NextAuth/Better Auth
```

---

**RBAC — Role-Based Access Control → ZAROOR CHAHIYE**

```
Ye project definitely RBAC maangta hai kyunki:
→ Admin: Sab kuch dekh sakta hai, manage kar sakta hai
→ Employee: Sirf apne tasks, status update kar sakta hai

Implementation plan:
→ User model mein "role" field: ENUM ('admin', 'employee')
→ Middleware mein role check (protected routes)
→ Server Actions mein bhi role verify karna (client-side check bypass ho sakta hai!)
→ UI conditionally render karega based on role
```

---

**State Management → Zustand (minimal) + React Query**

```
Zustand kyun?
→ Task filters ka state (status filter, assignee filter) multiple components share karte hain
→ Sidebar mein filter, main content mein tasks — dono ko sync rehna chahiye
→ Context bhi kaam karta, par Zustand cleaner hai yahan

React Query kyun?
→ Tasks server se aate hain — ye server state hai
→ React Query automatic caching, background refetch, loading/error states handle karta hai
→ Task create/update ke baad automatic list refresh — optimistic updates possible

useState kyun nahi sirf?
→ Prop drilling bahut ho jaata — task list component ne status filter uthao,
   filter component ko, wo sidebar tak... messy ho jaata
```

---

**Database → PostgreSQL + Prisma**

```
Kyun PostgreSQL?
→ Data clearly relational hai:
  User → Tasks (one to many)
  Task → Assignee (many to one)
  Kal agar comments add karne hain → Task → Comments (one to many)
→ Relations important hain → SQL database best choice

Kyun Prisma?
→ TypeScript-first — types auto-generate hote hain schema se
→ Migrations easy hain
→ Query syntax readable aur type-safe hai

Hosted where?
→ Neon (serverless PostgreSQL) — Vercel ke saath seamlessly kaam karta hai
```

---

**Rendering → SSR for dashboard, SSG for landing/login**

```
Dashboard (admin/employee views):
→ User-specific data hai — har user ka alag data dikhega
→ SSR — har request pe fresh data, personalized

Login/Signup pages:
→ Static hai — SSG fine hai

Landing page (agar public hai):
→ SSG — pre-built, fast, CDN se serve
```

---

## 🗄️ Step 3 — Data Model

```
USER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id          UUID          PK
name        VARCHAR(100)
email       VARCHAR(255)  UNIQUE  ← Index here (login query)
role        ENUM          'admin' | 'employee'
clerk_id    VARCHAR(255)  UNIQUE  ← Clerk se sync ke liye
created_at  TIMESTAMP

TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           UUID          PK
title        VARCHAR(255)
description  TEXT          nullable
status       ENUM          'todo' | 'in_progress' | 'done'
priority     ENUM          'low' | 'medium' | 'high'
due_date     DATE          nullable
created_by   UUID          FK → User.id  (Admin ne create kiya)
assigned_to  UUID          FK → User.id  (Employee ko assign)
created_at   TIMESTAMP
updated_at   TIMESTAMP

RELATIONS:
→ User has many Tasks (as creator)
→ User has many Tasks (as assignee)
→ Task belongs to User (creator)
→ Task belongs to User (assignee)

INDEXES:
→ Task.assigned_to  (employee apne tasks fetch karta hai — frequent query)
→ Task.status       (filter by status — frequent)
→ Task.due_date     (overdue tasks query)
→ User.email        (login lookup)
```

---

## 📋 Step 4 — Feature Breakdown

```
PHASE 1 — MVP:

  Auth (Clerk)
  ├── [ ] Clerk setup + middleware
  ├── [ ] Login / Signup pages
  ├── [ ] Role assignment on first login (default: employee)
  └── [ ] Protected routes (dashboard requires auth)

  Admin Features
  ├── [ ] Employee list view
  ├── [ ] Task create form (title, desc, assignee, due date, priority)
  ├── [ ] Task list — all tasks with filters (status, assignee)
  ├── [ ] Task edit
  ├── [ ] Task delete
  └── [ ] Dashboard summary (todo count, in-progress, done, overdue)

  Employee Features
  ├── [ ] My tasks list
  └── [ ] Status update (drag or dropdown)

  Edge Cases
  ├── [ ] Empty state (no tasks assigned)
  ├── [ ] Overdue tasks visual indicator
  ├── [ ] Form validation (Zod — client + server)
  └── [ ] Loading/error states (React Query handles this)

PHASE 2:
  [ ] Email notifications (Resend — on task assignment)
  [ ] Comments on tasks
  [ ] Due date reminders (Inngest cron job)
```

---

## 🗂️ Step 5 — Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx        ← Clerk login page
│   ├── (dashboard)/
│   │   ├── layout.tsx            ← Auth check + role fetch
│   │   ├── admin/
│   │   │   ├── page.tsx          ← Admin dashboard
│   │   │   ├── tasks/page.tsx    ← All tasks view
│   │   │   └── employees/page.tsx
│   │   └── employee/
│   │       └── page.tsx          ← My tasks view
│   └── layout.tsx
│
├── actions/
│   ├── task.actions.ts           ← createTask, updateTask, deleteTask
│   └── user.actions.ts           ← inviteEmployee, updateRole
│
├── components/
│   ├── ui/                       ← shadcn/ui components
│   └── features/
│       ├── TaskCard.tsx
│       ├── TaskForm.tsx
│       ├── TaskFilters.tsx
│       └── DashboardStats.tsx
│
├── lib/
│   ├── db.ts                     ← Prisma client
│   ├── auth.ts                   ← Clerk helpers
│   └── validations/
│       └── task.schema.ts        ← Zod schemas
│
└── stores/
    └── taskFilters.store.ts      ← Zustand — filter state
```

---

## 🎙️ Interview Script — STAR Format

```
SITUATION:
"Maine StaffSync banaya — ye chhote businesses ke liye ek task management tool hai.
Problem ye thi ki 5-10 person teams typically WhatsApp ya verbal communication
se tasks manage karte the — koi accountability nahi thi, deadlines miss hoti thin."

TASK:
"Mujhe ek simple web app banana tha jo non-technical users bhi easily use kar sakein.
Maine scope clearly define kiya — sirf task creation, assignment, aur status tracking.
Analytics aur notifications V2 ke liye push ki kyunki core workflow pehle solid hona chahiye tha."

ACTION:
"Kuch interesting decisions liye —

Pehli baat: Server Actions choose kiye REST ke jagah.
App sirf web-based tha, koi external consumers nahi the.
Server Actions ne type safety automatically di aur boilerplate reduce hui.

Doosri baat: RBAC implement ki — Admin aur Employee roles.
Important decision ye tha ki role check sirf UI pe nahi, Server Actions mein bhi kiya.
Client-side checks bypass ho sakte hain — security server pe honi chahiye.

Teesri baat: State management ke liye Zustand + React Query use ki.
Filter state Zustand mein — kyunki sidebar filter aur main list dono ko
same state chahiye thi. Task data React Query mein — server state ke liye
ye perfect hai, caching aur background refetch automatically milta hai.

Ek challenge tha — employee pehle baar login karta toh
role automatically assign hona chahiye tha as 'employee'.
Clerk mein ek webhook setup kiya jo user creation pe trigger hota tha
aur database mein default role set karta tha."

RESULT:
"App mein full RBAC tha — Admin sab tasks manage kar sakta tha,
Employee sirf apne tasks dekh aur update kar sakta tha.
Ek reflection ye hai ki data model thoda aur time deta pehle —
beech mein priority field add karna pada jo migration ke waqt
thoda painful tha. Next time data model pe zyada upfront time dunga."
```

---

**Next →** `project-02-job-board.md` — HireHop: Job Board with Employer & Seeker Roles
