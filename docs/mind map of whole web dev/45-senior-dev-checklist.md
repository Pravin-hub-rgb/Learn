# 45 — Senior Dev Checklist: Project Banane Se Pehle Aur Baad

> Yeh poori series ka **aakhri doc** hai.
> ShopKaro complete hua — Authentication se Deployment tak.
> Ab ek checklist — jo senior devs mentally run karte hain har project pe.

---

## Phase 1 — Shuru Karne Se Pehle (Planning)

```
□ Features list banai — Must have vs Nice to have
□ Users define kiye — Buyer, Seller, Admin?
□ Tech decisions liye —
  □ Framework: Next.js ✓
  □ Database: PostgreSQL ✓
  □ Auth: Khud / NextAuth / Clerk?
  □ State: Zustand + React Query?
  □ Payments: Razorpay / Stripe?
  □ Deploy: Vercel?
□ Rough folder structure socha
□ Data models sketch kiye (tables + relations)
□ API endpoints list banai
□ Rendering strategy har page ke liye decide ki
```

---

## Phase 2 — Development Ke Dauran

```
□ .env file mein secrets hain — .gitignore mein .env hai
□ .env.example file hai (keys hain, values nahi)
□ Passwords hashed hain (bcrypt) — plain text nahi
□ Auth check protected routes pe hai
□ SQL injection nahi ho sakta (Prisma use kar rahe ho — safe)
□ Error handling hai API routes mein
□ Loading states hain
□ Empty states hain (agar products nahi hain → "No products found")
```

---

## Phase 3 — Deploy Karne Se Pehle

```
SECURITY:
□ Environment variables Vercel mein add kiye
□ Test keys production mein nahi hain
□ HttpOnly cookies use kar rahe ho auth ke liye
□ CORS configured hai agar separate backend hai

PERFORMANCE:
□ next/image use kar rahe ho (regular img tag nahi)
□ Console.log statements hata diye
□ Unused dependencies hata diye

DATABASE:
□ Production database use kar rahe ho (Neon/Supabase)
□ Migrations run ki hain production pe

PAYMENTS:
□ Razorpay live keys use kar rahe ho (test nahi)
□ Webhook URL Razorpay dashboard mein set hai
□ Payment flow end-to-end test kiya
```

---

## Phase 4 — Deploy Ke Baad

```
□ Live URL kholke manually test kiya
□ Login/Signup kaam kar raha hai
□ Product listing dikh rahi hai
□ Cart add/remove kaam karta hai
□ Payment end-to-end test kiya (Razorpay test mode mein)
□ Mobile pe check kiya
□ 404 page theek hai
□ Error page theek hai
```

---

## Poori Series Ka Map — Ek Baar Dekho

```
00  Overview — ShopKaro ka poora picture
01  Kaise Sochte Hain — Senior dev ki planning

AUTHENTICATION (02-09):
02  Auth umbrella — overview
03  bcrypt — password hashing
04  Sessions — login ke baad yaad rakhna
05  JWT — sessions ka alternative
06  Cookies — session/JWT browser tak
07  OAuth — Google se login
08  Email verification + password reset
09  Libraries — NextAuth, Clerk

ARCHITECTURE (10-13):
10  Architecture umbrella — overview
11  MVC — code ko 3 parts mein todna
12  Folder structure — kya kahan
13  BFF layer — kab alag backend

RENDERING (14-18):
14  Rendering umbrella — overview
15  CSR — browser mein render
16  SSR — server pe render
17  SSG — pehle se bana hua
18  ShopKaro decisions — kaunsa page kaunsi strategy

DATABASE (19-22):
19  Database umbrella — overview
20  SQL vs NoSQL — PostgreSQL vs MongoDB
21  Prisma — ORM, JavaScript se DB se baat
22  Data models — ShopKaro ka complete schema

API DESIGN (23-26):
23  API umbrella — overview
24  REST — endpoints design karna
25  GraphQL — REST ka alternative
26  ShopKaro APIs — complete reference

STATE MANAGEMENT (27-31):
27  State umbrella — overview
28  Local vs Global state
29  React Context
30  Zustand — cart store
31  React Query — server state

CACHING (32-35):
32  Caching umbrella — overview
33  Browser storage — localStorage, sessionStorage
34  CDN — static files globally
35  Server-side caching

PAYMENTS (36-38):
36  Payments umbrella — overview
37  Razorpay flow — integration
38  Webhooks — payment backup

PERFORMANCE (39-42):
39  Performance umbrella — overview
40  Images — Next.js Image component
41  Lazy loading + Skeleton screens
42  Pagination vs Infinite scroll

ACCESSIBILITY (43):
43  Accessibility basics — sab ke liye

DEPLOYMENT (44):
44  Vercel deploy + Environment variables

CHECKLIST (45):
45  Senior dev checklist ← YEH
```

---

## Ek Aakhri Baat

Jab tumne yeh series shuru ki — tum ek cheez jaante the: Next.js mein todo app banana.

Ab tum jaante ho:

- Authentication umbrella ke andar kya kya hota hai
- Kab JWT, kab Sessions, kab Clerk
- MVC kya hai aur Next.js mein kaise apply hota hai
- SSR, CSR, SSG mein fark aur kab kya
- Database design — tables, relations, Prisma
- API design — REST endpoints
- State management — local, global, server state
- Zustand se cart banana
- Caching — browser se CDN tak
- Payment integration — Razorpay + Webhooks
- Performance — images, lazy loading, pagination
- Deployment — Vercel pe live karna

**Yeh "senior dev" ki vocabulary hai.** Ab jab tum koi feature banao — tum jaante ho kis umbrella ke andar ho, kya options hain, aur kab kya use karna hai.

Jao aur ShopKaro banao. 🚀
