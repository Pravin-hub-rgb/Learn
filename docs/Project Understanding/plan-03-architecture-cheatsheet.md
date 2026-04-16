# 📋 Plan Phase — Doc 3: Architecture Cheatsheet
### Kaunsi Situation Mein Kaunsa Tool — Quick Reference

---

> Ye doc ek decision guide hai.
> PRD fill karne ke baad yahan aao — tool choices quickly lock karo with reasons.

---

## 🖥️ Framework Decision

```
KYA BANANA HAI?                              TOOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full-stack web app (React + Backend together)  → Next.js ✅
Pure frontend SPA (React only, separate API)   → Vite + React
Content-heavy site (blogs, docs, marketing)    → Astro
Vue ecosystem                                  → Nuxt.js
Web standards focused, remix routes            → Remix
```

**Real Talk:** Next.js App Router is the standard 2024-25.
Agar full-stack banana hai toh Next.js — period.

---

## 🎨 Rendering Strategy

```
PAGE TYPE                                    STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User-specific data (dashboard, profile)      → SSR
Real-time data (stock, live scores)          → SSR
Public + rarely changing (blog, docs)        → SSG
Public + regular updates (news, e-commerce)  → ISR
Internal tool, no SEO needed                 → CSR
Landing page + marketing                     → SSG
Mix of above                                 → Next.js (har page alag)
```

```
Next.js mein kaise karte hain:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SSG (default):   async function Page() { await fetch(url) }
SSR:             await fetch(url, { cache: 'no-store' })
ISR:             await fetch(url, { next: { revalidate: 60 } })
CSR:             'use client' + useEffect
```

---

## 🗂️ State Management

```
SITUATION                                    TOOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Single component state (form, modal toggle)  → useState
2-3 components share state                   → useState + props / Context
Global state, medium complexity              → Context API (built-in!)
Global state, many unrelated components      → Zustand 🟢 (recommended)
Server data (API responses, caching)         → React Query / TanStack Query
Enterprise, complex logic, time-travel debug → Redux Toolkit
```

**Real Talk:**
- Zustand + React Query = sweet spot for most projects
- Context API underrated hai — medium projects ke liye bilkul enough
- Redux = overkill unless company already use kar rahi hai

```
INTERVIEW ANSWER TEMPLATE:
"Maine [Context/Zustand] choose kiya kyunki [reason].
 Server state ke liye React Query use kiya —
 kyunki wo caching, background refetching, aur loading/error
 states automatically handle karta hai, jisse mujhe
 wo sab manually likhna nahi pada."
```

---

## 🌐 API Style

```
SITUATION                                    STYLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Next.js web app, no external consumers       → Server Actions ✅
Mobile app ya external clients bhi hain      → REST API routes
Full type safety, Next.js monorepo           → tRPC
Complex data requirements, multiple clients  → GraphQL
```

**Server Actions kab choose karo:**
```
✅ Sirf web app hai (no mobile, no third-party)
✅ Form submissions, CRUD operations
✅ Less boilerplate chahiye
✅ Type safety automatic (TypeScript ke saath)

❌ External API consumers hain
❌ Mobile app bhi hai
❌ Webhook endpoints banana hai
```

---

## 🗄️ Database

```
SITUATION                                    DATABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Structured data, relations important         → PostgreSQL ✅
Document-based, flexible schema              → MongoDB
Caching, sessions, real-time pub/sub         → Redis
Local dev / small embedded app               → SQLite
Managed PostgreSQL (serverless)              → Neon / Supabase
```

**Real Talk:** PostgreSQL + Prisma = default choice for 90% of apps.
MongoDB tab le jab data genuinely unstructured ho — social media posts, logs, etc.

```
ORM CHOICE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prisma   → TypeScript-first, great DX, migrations easy  [Recommended]
Drizzle  → Lightweight, SQL-like syntax, bundle size kam
Mongoose → MongoDB ke liye
```

---

## 🔐 Auth

```
SITUATION                                    TOOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fastest setup, UI components included        → Clerk ✅
Full control, open source, self-hosted       → NextAuth / Auth.js
TypeScript-first, modern, flexible           → Better Auth
Simple social login (Google/GitHub)          → NextAuth
Enterprise SSO (SAML, LDAP)                  → Auth0
Supabase users                               → Supabase Auth
```

**RBAC kab chahiye:**
```
Project mein RBAC zaroor tab:
→ Multiple user types hain (Admin, User, Guest, Manager)
→ Alag alag permissions hain
→ "Ye kaam sirf admin kar sakta hai" type requirements hain

Implementation:
→ User model mein `role` field rakho
→ Middleware mein role check karo
→ Server Actions / API routes mein bhi check karo
   (client-side check sirf UX ke liye, security nahi)
```

---

## 📦 Supporting Tools

```
NEED                    TOOL                    WHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Form handling           React Hook Form         Performant, less re-renders
Validation              Zod                     TypeScript-first, reuse server/client
Image upload            Uploadthing             Next.js ke liye easiest
Image CDN + transform   Cloudinary              Resize, crop, optimize
Emails                  Resend                  Modern API, React email templates
Charts                  Recharts                React-native charts
UI Components           shadcn/ui               Copy-paste, customizable, accessible
Animation               Framer Motion           Production-grade React animations
Background jobs         Inngest                 Serverless-friendly, retries built-in
Error tracking          Sentry                  Production must-have
```

---

## 🏗️ Project Type → Quick Stack Recommendation

```
TASK MANAGER / SAAS:
→ Next.js + Server Actions + Prisma + PostgreSQL
→ Clerk auth + RBAC
→ Zustand (UI state) + React Query (server state)
→ Resend (emails) + Vercel (hosting)

E-COMMERCE:
→ Next.js + REST API routes + Prisma + PostgreSQL
→ NextAuth + RBAC (customer, admin)
→ Zustand (cart) + React Query (products)
→ Stripe/Razorpay + Cloudinary (images) + Redis (cart cache)

REAL-TIME APP (Chat, Collab):
→ Next.js + Socket.io
→ MongoDB (flexible message schema) + Redis (pub/sub)
→ NextAuth
→ Railway hosting (WebSocket support)

ANALYTICS DASHBOARD (Internal):
→ Next.js CSR pages + REST API
→ Clerk (easy auth) + RBAC
→ PostgreSQL + Prisma
→ Recharts / Victory (visualization)
→ React Query (heavy data fetching)

BLOG / CONTENT SITE:
→ Next.js + SSG/ISR
→ MDX / Contentlayer (content management)
→ No complex state needed
→ Vercel (hosting, ISR support)

JOB BOARD:
→ Next.js + SSG (public) + SSR (dashboard)
→ PostgreSQL + Prisma
→ NextAuth (employer + seeker roles)
→ Uploadthing (resume uploads) + Resend (notifications)
→ Algolia / Postgres Full-Text (search)
```

---

**Next Doc →** `plan-04-star-method.md` — Project ko interview mein kaise explain karo: STAR framework with examples.
