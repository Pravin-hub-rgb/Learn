# 🚀 Project 2 — HireHop: Job Board
### Employers Post Jobs, Seekers Apply — with Search & Resume Upload

---

## 💬 The Brief — Client Ne Kya Kaha

> *"Bhai, ek niche job board banana hai — specifically for design professionals.
> Employers jobs post karein, job seekers browse karein aur apply karein.
> Resume upload honi chahiye. Email notification bhi chahiye when someone applies.
> SEO important hai — Google pe jobs dikhne chahiye."*

Okay. Ye pehle project se alag hai. Yahan **public-facing pages** hain, **SEO critical** hai, **file upload** hai, **email** hai, aur **do alag user types** hain — Employer aur Job Seeker.

---

## 📋 Step 1 — PRD Lite

```
PROJECT NAME  : HireHop
TYPE          : Public Web App / Job Board
ONE LINE      : "Ye ek niche job board hai jo design professionals
                 ko relevant job opportunities se connect karta hai."

TARGET USER:
  Primary A  → Employer
               Company jo design roles hire karna chahti hai
               Posts jobs, reviews applications
  Primary B  → Job Seeker
               Designer who is looking for work
               Browses jobs, applies with resume

CORE FEATURES (MVP):
  [ ] Public job listings — searchable, filterable
  [ ] Job detail page (SEO optimized)
  [ ] Employer: Post a job
  [ ] Employer: View applications for their jobs
  [ ] Job Seeker: Create profile + upload resume
  [ ] Job Seeker: Apply to a job (attach resume)
  [ ] Email: Employer gets notified when someone applies
  [ ] Auth: Separate flows for employer vs seeker

STRETCH (V2):
  [ ] Saved/bookmarked jobs
  [ ] Application status tracking (Applied → Reviewed → Interview → Rejected/Hired)
  [ ] Featured job listings (paid)
  [ ] Job alerts via email

OUT OF SCOPE:
  ❌ In-app messaging between employer and seeker
  ❌ Payment gateway (featured listings V2 hai)
  ❌ Mobile app
  ❌ AI job matching
```

---

## 🏗️ Step 2 — Architecture Decisions

---

**Framework → Next.js App Router**

Same reason — full-stack chahiye. Par yahan ek extra reason hai: **SEO critical hai**. Next.js SSG/ISR support karta hai — job pages Google pe index honge. Ye Vite + React se possible nahi hota easily.

---

**Rendering Strategy → MIXED (Ye interesting hai!)**

```
Alag alag pages ke liye alag strategy:

PUBLIC JOB LISTINGS PAGE (/jobs)
→ ISR (revalidate: 3600 — 1 hour)
→ Job listings frequently change — par second-by-second nahi
→ CDN se serve hoga — fast for all users
→ SEO perfect ✅

JOB DETAIL PAGE (/jobs/[slug])
→ ISR (revalidate: 1800 — 30 minutes)
→ Individual job page Google pe index hoga
→ Pre-built at build time, ISR se updated

EMPLOYER DASHBOARD (/dashboard/employer)
→ SSR — user-specific data (sirf unki posted jobs)
→ Sensitive — login required

SEEKER DASHBOARD (/dashboard/seeker)
→ SSR — user-specific (unki applications, profile)

LOGIN / SIGNUP PAGES
→ SSG — static, no dynamic data

WHY NOT SSG for job pages?
→ Jobs roz change hote hain — new jobs post, old expire
→ Full rebuild har baar nahi karna — impractical
→ ISR = static speed + automatic updates ✅
```

---

**API Style → REST API Routes (Server Actions nahi)**

```
Ye decision pehle project se alag hai. Kyun?

Pehle project mein: Sirf web app tha
Is project mein: Future mein mobile app bhi ho sakta hai

Client ne mention kiya ki "kal mobile app bhi banana hai maybe"
→ Toh REST API routes better investment hai
→ Web aur mobile dono same API use kar sakenge

Specific endpoints:
POST   /api/jobs          ← Job post karna
GET    /api/jobs          ← All jobs (with filters)
GET    /api/jobs/[slug]   ← Single job
POST   /api/apply         ← Apply to a job (with resume)
GET    /api/applications  ← Employer ke applications
```

---

**Auth → NextAuth ✅ (Clerk nahi)**

```
Kyun NextAuth?
→ Do alag user types hain — Employer aur Job Seeker
→ Signup form pe "Account type" select hoga
→ Custom signup flow chahiye — Clerk isme rigid hota

Kyun Clerk nahi?
→ Clerk ka UI opinionated hai — custom onboarding hard hota
→ NextAuth se custom callbacks easily likhte hain

Implementation:
→ User model mein 'role' field: 'employer' | 'seeker'
→ Signup pe role select karo
→ Middleware mein role-based route protection
```

---

**Search → PostgreSQL Full-Text Search (Algolia nahi for V1)**

```
Client ne search ka mention kiya. Options:

Option A: Algolia
→ Powerful managed search
→ Cost: Paid after free tier
→ External service — extra complexity

Option B: PostgreSQL Full-Text Search
→ Already PostgreSQL use kar rahe hain
→ Free — no extra service
→ Job title + description search ke liye kaafi hai
→ Advanced faceted search nahi chahiye V1 mein

Decision: PostgreSQL Full-Text for V1.
Agar scale pe complex search chahiye → Algolia/Typesense V2 mein.

Implementation:
→ Job model mein tsvector column (title + description indexed)
→ GIN index on tsvector
→ Query: WHERE search_vector @@ plainto_tsquery('designer')
```

---

**File Upload → Uploadthing ✅**

```
Resume upload — options:
→ AWS S3: Powerful but complex setup
→ Cloudinary: Images ke liye great, par documents ke liye overkill
→ Uploadthing: Next.js ke liye specifically banaya gaya

Uploadthing kyun?
→ Next.js integration seedha — ek route handler bas
→ Type-safe — file types aur sizes define karo
→ Free tier generous hai
→ PDF aur DOCX support

Resume storage:
→ File Uploadthing pe store hoga
→ Database mein sirf URL save hoga (resume_url field)
```

---

**Email → Resend + React Email**

```
Jab koi apply karta hai:
→ Employer ko email jaayegi — "Someone applied to [Job Title]"
→ Seeker ko confirmation email — "Application submitted"

Resend kyun?
→ Modern API
→ React Email ke saath HTML email templates likhte hain React mein
→ Free tier: 100 emails/day — enough for V1

Implementation:
→ /api/apply route mein — after application save
→ Resend SDK se email trigger
→ Template: applicant ka name, resume link, job title
```

---

**State Management → React Query only (Zustand nahi for V1)**

```
Kyun Zustand nahi?
→ Is app mein complex global UI state nahi hai
→ No cart, no filters that multiple components share simultaneously

React Query kahan use hoga:
→ Employer dashboard: useQuery('my-jobs', fetchMyJobs)
→ Seeker dashboard: useQuery('my-applications', fetchApplications)
→ Job listings: useQuery(['jobs', filters], fetchJobs)

Simple state?
→ Search input, filter dropdowns → useState enough hai
→ Modal open/close → useState
```

---

## 🗄️ Step 3 — Data Model

```
USER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id            UUID        PK
name          VARCHAR(100)
email         VARCHAR(255) UNIQUE  ← Index
password_hash VARCHAR(255)
role          ENUM        'employer' | 'seeker'
company_name  VARCHAR(255) nullable  ← Employer ke liye
resume_url    VARCHAR(500) nullable  ← Seeker ke liye
created_at    TIMESTAMP

JOB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id             UUID          PK
slug           VARCHAR(255)  UNIQUE  ← Index (URL ke liye)
title          VARCHAR(255)
description    TEXT
location       VARCHAR(255)
job_type       ENUM          'full_time' | 'part_time' | 'contract' | 'remote'
salary_range   VARCHAR(100)  nullable
employer_id    UUID          FK → User.id
status         ENUM          'active' | 'closed' | 'draft'
search_vector  TSVECTOR      ← Full-text search ke liye (generated column)
expires_at     DATE
created_at     TIMESTAMP
updated_at     TIMESTAMP

APPLICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           UUID      PK
job_id       UUID      FK → Job.id
seeker_id    UUID      FK → User.id
resume_url   VARCHAR(500)
cover_note   TEXT      nullable
status       ENUM      'applied' | 'reviewed' | 'shortlisted' | 'rejected'
applied_at   TIMESTAMP

UNIQUE(job_id, seeker_id)  ← Ek seeker ek job pe sirf ek baar apply kar sakta hai

RELATIONS:
→ User (employer) has many Jobs
→ Job has many Applications
→ User (seeker) has many Applications
→ Application belongs to Job AND User

INDEXES:
→ Job.slug           (URL lookup — GET /jobs/[slug])
→ Job.employer_id    (employer ke jobs fetch karna)
→ Job.search_vector  (full-text search — GIN index)
→ Job.status         (sirf active jobs dikhana)
→ Application.job_id (employer apni job ke applications dekhta hai)
→ Application.seeker_id (seeker apni applications dekhta hai)
```

---

## 📋 Step 4 — Feature Breakdown

```
PHASE 1 — MVP:

  Auth
  ├── [ ] Signup with role selection (employer / seeker)
  ├── [ ] Login
  ├── [ ] Protected routes middleware (role-based)
  └── [ ] NextAuth setup (credentials provider)

  Public Pages
  ├── [ ] /jobs — listing page with search + filters
  ├── [ ] /jobs/[slug] — job detail page
  └── [ ] ISR setup for both

  Employer Features
  ├── [ ] Post a job (form with validation)
  ├── [ ] My posted jobs list
  ├── [ ] View applications per job
  └── [ ] Close/reopen job

  Seeker Features
  ├── [ ] Browse + search jobs
  ├── [ ] Apply to job — resume upload + optional cover note
  ├── [ ] My applications history
  └── [ ] Profile (upload resume for quick apply)

  Email
  ├── [ ] Employer notification on application
  └── [ ] Seeker confirmation on apply

  Edge Cases
  ├── [ ] Duplicate application prevention
  ├── [ ] Expired job — can't apply
  ├── [ ] File type validation (PDF/DOCX only for resume)
  └── [ ] Empty states (no jobs posted, no applications yet)
```

---

## 🎙️ Interview Script — STAR Format

```
SITUATION:
"Maine HireHop banaya — ye ek niche job board hai design professionals ke liye.
Problem ye thi ki existing generic job boards pe design-specific jobs dhundhna
mushkil tha — sabke beech filtered nahi hota tha effectively."

TASK:
"Do user types the — Employer aur Job Seeker.
Employers jobs post karte, seekers apply karte with resume.
SEO critical tha — Google pe individual job pages index hone chahiye the."

ACTION:
"Teen interesting decisions liye —

Pehla: Mixed rendering strategy use ki.
Public job listing aur detail pages ke liye ISR use kiya — revalidate: 1 hour.
Ye isliye kyunki SSG se poora site rebuild karna padta har job ke liye,
aur SSR se CDN caching nahi milti.
ISR ne static speed + automatic updates dono diye.
Dashboard pages SSR the — user-specific data tha.

Doosra: Full-text search PostgreSQL se implement ki instead of Algolia.
V1 ke liye job title aur description search kaafi tha.
Extra service aur cost avoid karna tha — PostgreSQL mein tsvector column
aur GIN index se performance good thi. Agar scale pe complex faceted search
chahiye hoti toh Typesense consider karta.

Teesra: File upload ke liye Uploadthing use kiya.
Resume PDF upload karna tha — AWS S3 overkill tha is scale pe.
Uploadthing Next.js ke liye specifically designed hai,
type-safe file routes milte hain, aur free tier enough tha.

Ek challenge tha: Employer ko role ke hisaab se signup karna tha
aur ek seeker ko different fields chahiye thi (resume) vs employer (company name).
Maine NextAuth mein custom callbacks likhe jo signup pe role-based fields
database mein save karte the."

RESULT:
"App mein ISR-powered public job pages the jo Google pe index hote the,
role-based dashboards the, resume upload tha, aur Resend se email notifications thi.
Reflection: Search functionality aur pehle better design karta —
beech mein search vector column add karna pada migration ke time, jo painful tha.
Apfront schema design is lesson ka best example hai."
```

---

**Next →** `project-03-chat-app.md` — TalkSpace: Real-time Chat Application
