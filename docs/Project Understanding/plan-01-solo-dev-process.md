# 📋 Plan Phase — Doc 1: The Solo Dev Process
### MNC ka Lite Version — Ek Bhi Line Code Likhne Se Pehle

---

## 🤔 Pehle Ye Samjho — MNC Mein Kya Hota Hai?

Ek MNC mein jab koi project aata hai, toh pura ek system hota hai. Seedha code nahi likhte. Ek bada team hoti hai — Product Manager, Architects, Designers, Developers, QA — sab milke pehle **plan** karte hain, tab code hota hai.

```
MNC ka typical flow:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Client requirement aaya
        ↓
Product Manager → PRD banata hai (Product Requirements Doc)
        ↓
Architect → Tech stack decide karta hai
        ↓
Designer → Wireframes / Mockups
        ↓
Tech Lead → Task breakdown (Jira tickets)
        ↓
Developers → Code
        ↓
QA → Testing
        ↓
DevOps → Deploy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Tu akela hai — toh kya kare?**
Ye saara kaam khud karna hai, par lightweight version mein. Ghabrana nahi — ye 5 step process hai. Ek baar samajh gaya toh second nature ban jaayega.

---

## ✅ The 5-Step Solo Dev Process

---

### Step 1 — PRD Lite (Product Requirements Doc)

PRD matlab **"Kya banana hai"** — clearly, in writing.

Ye likhne ki wajah ye hai ki jab tum code karte karte bhatkoge, ye doc tumhe ground pe rakhega.

**Structure hona chahiye:**

```
PROJECT NAME: ___________________

ONE LINE DESCRIPTION:
"Ye ek [type of app] hai jo [target user] ke liye
 [main kaam] karta hai."

TARGET USER:
- Kaun use karega? (Student, Business Owner, Admin)
- Technical hain ya non-technical?

CORE FEATURES (Must Have — MVP):
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

STRETCH FEATURES (Nice to Have — V2):
- [ ] Feature A
- [ ] Feature B

OUT OF SCOPE (Kya NAHI banana):
- X nahi banana
- Y nahi banana

SUCCESS CRITERIA:
- Kab bolenge ki project complete hua?
```

> **Interview Tip:** "Out of Scope" wala section bahut powerful hai interview mein.
> Jab tum ye bolte ho — *"Maine scope clearly define kiya tha, aur in features ko V2 mein push kiya"* —
> ye dikhata hai ki tum production-level sochte ho. Junior devs scope nahi socha karte.

---

### Step 2 — Architecture Decision Doc

PRD padhne ke baad, tool selection karo. Par sirf **"maine ye choose kiya"** nahi — **"maine ye choose kiya KYUNKI..."** — ye important hai.

Ye questions khud se poochho:

```
PLATFORM:
→ Sirf web app hai?                  Yes → Next.js
→ Mobile bhi chahiye?                Yes → React Native ya PWA
→ Pure static site hai?              Yes → Astro

DATA LAYER:
→ API endpoints chahiye bahar ke liye?   Yes → REST / tRPC
→ Sirf internal web app use karega?      Yes → Server Actions (simpler!)
→ Real-time data chahiye?                Yes → WebSockets / SSE
→ Complex queries / multiple resources?  Yes → GraphQL consider karo

STATE MANAGEMENT:
→ Sirf local component state?            useState enough
→ 2-3 components share karte hain?      Context API enough
→ Complex global state, many components? Zustand
→ Enterprise, time-travel debug?         Redux Toolkit

DATABASE:
→ Data structured aur relational?        PostgreSQL
→ Flexible schema, documents?            MongoDB
→ Caching / sessions / real-time?        Redis
→ Simple, local / small app?             SQLite

AUTH:
→ Social login + email, minimal setup?   Clerk
→ Full control, custom UI?               NextAuth / Better Auth
→ Enterprise SSO?                        Auth0

RENDERING STRATEGY:
→ SEO important hai?                     SSG / SSR
→ User-specific data?                    SSR
→ Rarely changing content?               SSG / ISR
→ Dashboard, no SEO needed?              CSR
→ Mix of above?                          Next.js (mix karo)

FILE UPLOADS:
→ Images with transformations?           Cloudinary
→ Next.js project, simple?               Uploadthing
→ Enterprise / S3 compatible?            AWS S3 / Cloudflare R2

EMAIL:
→ Transactional emails?                  Resend (modern) / Nodemailer

BACKGROUND JOBS:
→ Cron jobs, scheduled tasks?            node-cron / Inngest
→ Queue-based, retry logic?              BullMQ

HOSTING:
→ Next.js project?                       Vercel
→ Full stack with DB?                    Railway
→ Enterprise?                            AWS / GCP
```

> **Interview Tip:** Har decision ke saath reason likho.
> "Maine Zustand choose kiya **kyunki** cart state multiple unrelated components
> share karte the, aur Context se re-render issues aa rahe the" —
> ye answer junior ko senior se alag karta hai.

---

### Step 3 — Data Model

Code likhne se pehle **database schema** socho. Ye ek aur jagah hai jahan beginners skip karte hain aur baad mein pachtate hain.

```
HAR ENTITY KE LIYE SOCHO:

1. Kya entities hain mere app mein?
   (User, Product, Order, Post, Comment...)

2. Har entity ke kya fields hain?
   (id, name, email, created_at...)

3. Entities ke beech kya relations hain?
   - One to One:    User → Profile
   - One to Many:   User → Orders (ek user ke many orders)
   - Many to Many:  Student → Courses (ek student many courses, ek course many students)

4. Kya indexes lagungi?
   (Email pe — login ke liye, Product name pe — search ke liye)

5. Kya soft delete chahiye?
   (deleted_at field — data permanently delete nahi hoti)
```

**Example template:**

```
ENTITY: User
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           UUID / SERIAL (PK)
name         VARCHAR(100)
email        VARCHAR(255) UNIQUE
password     VARCHAR(255) [hashed]
role         ENUM (admin, user)
created_at   TIMESTAMP
updated_at   TIMESTAMP
deleted_at   TIMESTAMP [nullable — soft delete]

ENTITY: Post
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           UUID / SERIAL (PK)
title        VARCHAR(255)
content      TEXT
author_id    FK → User.id
status       ENUM (draft, published)
created_at   TIMESTAMP
```

> **Interview Tip:** Agar interviewer pooche "database kaise design ki?" —
> tum entity relationships aur indexes ka mention karo.
> "Maine email column pe index lagaya kyunki login query frequent thi" —
> ye dikhata hai DB optimization awareness.

---

### Step 4 — Feature Breakdown (Task List)

Pura project ek saath mat socho. Toro isko:

```
PHASE 1 — Core (MVP):
  Auth
  ├── [ ] Signup page
  ├── [ ] Login page
  ├── [ ] Logout
  └── [ ] Protected routes

  Main Feature
  ├── [ ] List view (read)
  ├── [ ] Create
  ├── [ ] Edit
  └── [ ] Delete

  Edge Cases
  ├── [ ] Empty state (koi data nahi toh kya dikhega?)
  ├── [ ] Loading state
  ├── [ ] Error state
  └── [ ] Form validation

PHASE 2 — Polish:
  ├── [ ] Search / Filter
  ├── [ ] Pagination
  ├── [ ] Email notifications
  └── [ ] Mobile responsive
```

> **Ye kyun important hai?**
> Jab interviewer pooche "project mein kya challenges aaye?" —
> tum keh sakte ho "Maine feature breakdown pehle kiya tha,
> toh main clearly jaanta tha ki MVP mein kya hai aur kya baad mein."
> Ye planning maturity dikhata hai.

---

### Step 5 — Folder Structure Decision

Next.js App Router ke saath:

```
src/
├── app/                     ← Routes (App Router)
│   ├── (auth)/              ← Route group — auth pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/         ← Route group — protected pages
│   │   ├── layout.tsx       ← Auth check yahan
│   │   └── dashboard/page.tsx
│   ├── api/                 ← API routes (agar chahiye)
│   └── layout.tsx           ← Root layout
│
├── components/
│   ├── ui/                  ← Generic reusable (Button, Input, Modal)
│   └── features/            ← Feature-specific (ProductCard, UserAvatar)
│
├── lib/
│   ├── db.ts                ← Prisma client
│   ├── auth.ts              ← Auth config
│   └── utils.ts             ← Helper functions
│
├── actions/                 ← Server Actions (agar Server Actions use kar rahe)
│   ├── auth.actions.ts
│   └── product.actions.ts
│
├── hooks/                   ← Custom React hooks
│   └── useCart.ts
│
└── types/                   ← TypeScript types
    └── index.ts
```

---

## 🎯 The Complete Checklist — Har Project Ke Liye

```
PRE-CODE CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] PRD Lite likha?
    [ ] One line description
    [ ] Target user defined
    [ ] Core features listed
    [ ] Out of scope defined

[ ] Architecture decisions with reasons?
    [ ] Platform decided
    [ ] Rendering strategy decided
    [ ] State management decided
    [ ] Database chosen
    [ ] Auth solution chosen

[ ] Data model banaya?
    [ ] Entities identified
    [ ] Relations mapped
    [ ] Indexes noted

[ ] Feature breakdown kiya?
    [ ] MVP features only Phase 1 mein
    [ ] Edge cases listed

[ ] Folder structure decided?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AB CODE LIKHNA SHURU KAR SAKTE HO! 🚀
```

---

> **Remember:** Interview mein jab koi pooche "apna project explain karo" —
> tum PRD se shuru karo, architecture decision pe aao, phir challenges pe.
> **Seedha features mat ginao.** Wo sab koi kar sakta hai.
> Planning + reasoning dikhana hi tumhe alag karta hai.

---

**Next Doc →** `plan-02-prd-template.md` — Blank PRD template jo har project mein use kar sako.
