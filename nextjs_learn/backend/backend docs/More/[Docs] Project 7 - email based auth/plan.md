# Project 7 — Email Authentication (Prisma v7 + Database Sessions)

## Goal

Complete email-based auth system — from scratch — bina kisi auth library ke.
Registration → Email Verification → Login → Sessions → Logout → Protected Routes → Password Reset → OAuth (Phase 7)

## Tech Stack

- Next.js (App Router) — `app/` folder, Server Actions for all mutations
- Prisma v7 — `prisma-client-js` provider, `@prisma/adapter-pg`
- PostgreSQL — local, DATABASE_URL already in .env
- bcryptjs — password hashing (pure JS — Next.js ke saath koi issue nahi)
- Resend — email bhejne ke liye
- TypeScript

---

## Final Folder Structure

```
app/
  (auth)/
    register/page.tsx
    login/page.tsx
    verify/page.tsx
    forgot-password/page.tsx
    reset-password/page.tsx
  (protected)/
    dashboard/page.tsx
  actions/
    auth.ts          ← sab auth actions yahan

lib/
  prisma.ts          ← Prisma singleton
  password.ts        ← hash + compare helpers
  session.ts         ← create, get, delete session
  token.ts           ← verification + reset tokens
  email.ts           ← Resend wrapper
  validations/
    auth.ts          ← shared Zod schemas

prisma/
  schema.prisma

middleware.ts
prisma.config.ts
```

> **Route Groups — Kaise Kaam Karte Hain**
> `(auth)` aur `(protected)` sirf organization ke liye hain — URL mein nahi aata.
> `(auth)/login/page.tsx` ka URL hoga `/login` — `(auth)` invisible hai.
> Server Actions use ho rahe hain (RESTful API nahi) — isliye route groups perfectly fit hote hain.
> Dono groups ke alag layouts ho sakte hain.

---

## Important — Core Philosophies

### Model Strategy

Models tab banenge jab us feature pe kaam shuru ho. Ek saath sab models pehle se nahi banenge.
Har naye model ke baad — `npx prisma migrate dev` chalega.

### Package Installation Strategy

Packages tab install honge jab us feature pe kaam shuru ho. "Just-in-time" installation — koi bhi package "out of blue" nahi aayega.

### Server Actions Strategy

Koi bhi RESTful API route nahi banega (`app/api/`). Sab mutations Server Actions se honge.

- Auth actions → `app/actions/auth.ts` (register, login, logout, forgotPassword, resetPassword, verifyEmail)
- Future features (blog, posts) → `app/actions/blog.ts`, `app/actions/posts.ts` — alag files
- UI simple HTML forms se — koi component library nahi

### Teaching Philosophy

**Problem-First Approach — Hamesha:**

- Koi bhi concept/library seedha introduce nahi karna
- Pehle manually karo — problem samne aayegi — phir solution introduce karo
- Galat: "Ab Zod use karte hain validation ke liye — install karo..."
- Sahi: "Pehle manually validation karo — if checks — boilerplate — phir Zod introduce karo"

**Error-First Approach:**

- Pehle error aane do — naturally — phir explain karo kyun aayi — phir fix karo
- Fake errors mat banao — jo actually aati hai woh dikhao

**Code Gradually Upgrade Hoga:**

- Pehle sabse chhota form likhenge — ek line — phir add karte jayenge
- Koi bhi function pehle `console.log` se start hoga — phir gradually logic add hoga
- Ek baar mein poora function/component paste nahi hoga

---

## Models — Kab Banenge

| Model                | Phase   | Kyun Tab                         |
| -------------------- | ------- | -------------------------------- |
| `User`               | Phase 2 | Registration tab banayenge       |
| `VerificationToken`  | Phase 3 | Email verification tab banayenge |
| `Session`            | Phase 4 | Login + session tab banayenge    |
| `PasswordResetToken` | Phase 6 | Password reset tab aayega        |
| `Account`            | Phase 7 | OAuth tab integrate karenge      |

---

## Packages — Kab Install Honge

| Package(s)                                       | Phase     | Kyun Tab                                        |
| ------------------------------------------------ | --------- | ----------------------------------------------- |
| `@prisma/client`, `@prisma/adapter-pg`, `prisma` | Phase 1.1 | Core Prisma v7 setup                            |
| `pg`, `@types/pg`                                | Phase 2.3 | lib/prisma.ts mein PrismaPg adapter use karenge |
| `bcryptjs`                                       | Phase 2.4 | Password hash karne ke liye lib/password.ts     |
| `resend`                                         | Phase 3.1 | Email verification ke liye lib/email.ts         |
| `zod`                                            | Phase 2.9 | Validation ke liye — pehle manually karenge     |

---

## User Flow — Big Picture

```
Register
  ↓
"Check your email" page
  ↓
User email kholta hai → link pe click karta hai
  ↓
isVerified = true → "You're verified! Login karo" + login link
  ↓
Login → isVerified check → Session banta hai
  ↓
Dashboard (protected)
```

---

## Phase 1 — Prisma v7 Setup + DB Connection

**1.1 — Core packages install karo**

- Dev: `prisma`
- Normal: `@prisma/client`, `@prisma/adapter-pg`
- Note: Sirf basic packages — baaki jab zaroorat pade

**1.2 — `npx prisma init` chalao**

- `prisma/schema.prisma` banega
- `prisma.config.ts` root mein banega (automatically)
- `prisma.config.ts` already configure hai — `import "dotenv/config"` included
- `schema.prisma` mein `url` nahi hota — `prisma.config.ts` mein hota hai

**1.3 — Database Connect**

- PostgreSQL server check karo — chal raha hai verify karo
- `.env` file mein `DATABASE_URL` set karo
- `npx prisma db pull` chalao
- **Expected Error:** `P4001 introspected database was empty` — yeh expected hai. Connection verify ho gaya.

> **Prisma v7 — Critical Notes**
>
> - Turbopack Compatibility: Prisma v7 (7.6.0+) mein `prisma-client` provider automatically Turbopack compatible hai
> - `output` field required hai — `"../app/generated/prisma"`
> - Import path: `from "../app/generated/prisma/client"` — `@prisma/client` se nahi
> - Driver adapter mandatory — `new PrismaPg({ connectionString: process.env.DATABASE_URL })`
> - `url` datasource block mein nahi likhna — sirf `prisma.config.ts` mein hoga
> - `tsconfig.json` chhona nahi — Next.js ne already sahi set kiya hua hai

---

## Phase 2 — User Model + Registration

> **Is Phase Mein:**
> Model: `User` | Lib: `lib/prisma.ts`, `lib/password.ts` | Action: `registerUser()` | UI: `(auth)/register/page.tsx`

**2.1 — User model banana**

- Fields: `id`, `email`, `password`, `isVerified`, `createdAt`
- Har field ka reason explain karna
- `isVerified` default `false` — registration pe unverified hoga

**2.2 — Pehli migration run karo**

- `npx prisma migrate dev --name init`
- Migration SQL file dekho — samjho kya hua

**2.3 — `lib/prisma.ts` banana — Prisma Client singleton**

- Pehle `pg` + `@types/pg` install karo: `npm install pg @types/pg`
- `PrismaPg` adapter — `connectionString: process.env.DATABASE_URL`
- Import from `"../app/generated/prisma/client"` — purana `@prisma/client` nahi chalega
- Singleton kyun — hot reload problem samjhao

**2.4 — `lib/password.ts` banana**

- Pehle `bcryptjs` install karo: `npm install bcryptjs`
- `hashPassword()` + `comparePassword()` — dono helpers ek jagah

**2.5 — `app/actions/auth.ts` banana — `registerUser()` action**

> **Server Action vs API Route — Fark**
>
> - API Route (purana): `app/api/auth/register/route.ts` — POST handler — `request.json()` — `Response.json()`
> - Server Action (naya): `app/actions/auth.ts` — async function with `"use server"` — direct arguments — return object
> - Postman ki zaroorat nahi — UI directly action call karega

- `"use server"` directive file ke top pe
- Pehle sirf `console.log` — kuch nahi — gradually build karo
- Email + password parameters directly function mein aayenge

**2.6 — `(auth)/register/page.tsx` banana — Registration UI**

- Simple HTML form — koi component library nahi
- `<form action={registerUser}>` — directly action call hogi
- Email + password input fields
- Submit button
- Browser se test karo — console verify karo

**2.7 — Password hash + User save karo**

- Email + password form se nikalo
- Password hash karo — `hashPassword()` call karo
- User database mein save karo — `prisma.user.create`
- Browser se test — pgAdmin mein row dekho
- **Problem notice karo:** Same email se multiple users create ho rahe hain!

**2.8 — Duplicate email check + Error handling (Error-First Approach)**

- Duplicate email check — `prisma.user.findUnique`
- **Error-First:** Prisma ka `P2002` error naturally aane do — phir handle karo
- `{ error: "Email already exists" }` — duplicate case
- `{ error: "Something went wrong" }` — server error
- `{ success: true }` — happy path

**2.9 — UI mein error/success messages dikhao: `useActionState` Hook**

- `useActionState` hook use karo — Server Action response capture karne ke liye
- Error/success messages form ke neeche dikhao
- `isPending` se loading state dikhao
- Server Action signature change: `(state, formData) => RegistrationResult`

**2.10 — RHF + Zod + useActionState: Complete Integration**

- React Hook Form + Zod add karo client-side validation ke liye
- `form action={formAction}` → `form onSubmit={handleSubmit(onSubmit)}` change karo
- `startTransition` use karo — `useActionState` warning fix karne ke liye
- Client-side validation (RHF + Zod) + Server-side handling (useActionState)

**2.11 — Shared Zod Validation: Frontend + Backend**

- Zod schema ko `lib/validations/auth.ts` mein shift karo
- Same schema frontend aur backend dono mein use karo
- Server Action mein `safeParse` se validate karo
- Postman se invalid data bhejne par bhi server-side validation ho

> **Note:** Registration ke baad abhi sirf `{ success: true }` return hoga.
> Verification email Phase 3 mein attach hoga — tab `registerUser()` mein token generate + email send bhi hoga.

---

## Phase 3 — Email Verification

> **Is Phase Mein:**
> Model: `VerificationToken` | Lib: `lib/email.ts`, `lib/token.ts` | Action: `verifyEmail()` | UI: `(auth)/verify/page.tsx`

**3.1 — Resend setup + `lib/email.ts` banana**

- Pehle `resend` install karo: `npm install resend`
- `.env` mein `RESEND_API_KEY` add karo
- `sendEmail()` helper banana — `resend.emails.send()` ka wrapper
- Test email bhejo — inbox mein verify karo

**3.2 — Verification flow samjho**

- Token kya hota hai — random string — ek baar use hota hai — expiry hoti hai
- Flow: Register → token generate → email mein link → click → verify → login

**3.3 — `VerificationToken` model banana**

- Tab banao — Phase 3 mein, pehle nahi
- Fields: `id`, `userId`, `token`, `expiresAt`
- Migration run karo

**3.4 — `lib/token.ts` banana — `generateVerificationToken()` helper**

- `crypto.randomBytes` — random token generate karo
- DB mein save karo — expiry ke saath (24 hours)

**3.5 — `registerUser()` action mein verification email attach karo**

- Registration successful hone ke baad:
  - `generateVerificationToken()` call karo
  - `sendEmail()` — link mein token hoga — `/verify?token=...`
  - Return: `{ success: true, message: "Check your email" }`
- Register page pe: "Check your email" message dikhao

**3.6 — `(auth)/verify/page.tsx` banana**

- URL se `token` param nikalo (`searchParams`)
- Page load hote hi `verifyEmail(token)` action call karo
- Success: "You're verified! Login karo" + login page link dikhao
- Error: "Invalid or expired link" dikhao

**3.7 — `verifyEmail()` action — `app/actions/auth.ts` mein add karo**

- Token DB mein dhundo
- Nahi mila → `{ error: "Invalid token" }`
- Expiry check → `{ error: "Link expired. Register again." }`
- `isVerified = true` update karo
- Token delete karo — ek baar use, phir kaam nahi
- Return `{ success: true }`

---

## Phase 4 — Login + Session System

> **Is Phase Mein:**
> Model: `Session` | Lib: `lib/session.ts` | Actions: `loginUser()`, `logoutUser()` | UI: `(auth)/login/page.tsx`

**4.1 — `(auth)/login/page.tsx` banana — Login UI**

- Simple HTML form
- `<form action={loginUser}>`
- Email + password fields

**4.2 — `app/actions/auth.ts` mein `loginUser()` add karo**

- Pehle sirf structure — `console.log`
- Email se user dhundo — `prisma.user.findUnique`
- User nahi mila → `return { error: "Invalid credentials" }`

**4.3 — Password compare karo**

- `comparePassword()` from `lib/password.ts`
- Match nahi hua → `return { error: "Invalid credentials" }`

**4.4 — `isVerified` check add karo**

- Password match hone ke baad check karo
- `isVerified === false` → `return { error: "Please verify your email first" }`
- Yeh woh check hai jo Phase 3 ke bina possible nahi tha

**4.5 — Session ki zaroorat kyun — problem dikhao**

- Bina session ke kya hota — samjho pehle
- Cookie-only vs DB session — fark kyun padta hai

**4.6 — Session model banana**

- Tab banao — Phase 4 mein, pehle nahi
- Fields: `id`, `userId`, `expiresAt`, `createdAt`
- Migration run karo

**4.7 — `lib/session.ts` banana — `createSession()` helper**

- `crypto.randomUUID()` — session ID
- DB mein save karo
- Cookie set karo — `httpOnly` kyun, `secure` kyun

**4.8 — `loginUser()` action complete karo**

- User verify → `isVerified` check → `createSession()` → `redirect('/dashboard')`

**4.9 — `getSession()` helper — `lib/session.ts` mein**

- Cookie se session ID nikalo (`next/headers` se)
- DB mein dhundo + expiry check

**4.10 — `logoutUser()` action — `app/actions/auth.ts` mein add karo**

- `deleteSession()` call karo
- `redirect('/login')`

**4.11 — `deleteSession()` helper — `lib/session.ts` mein**

- DB se session delete karo + cookie clear karo

---

## Phase 5 — Protected Routes

> **Is Phase Mein:**
> UI: `(protected)/dashboard/page.tsx` | Lib function: `getCurrentUser()` | `middleware.ts` banegi

**5.1 — `getCurrentUser()` helper — `lib/session.ts` mein add karo**

- `getSession()` → `prisma.user.findUnique` → user return karo

**5.2 — `(protected)/dashboard/page.tsx` banana**

- Server Component mein `getCurrentUser()` use karo
- null check — unauthorized → `redirect('/login')`
- User ka email dikhao
- Logout button — `logoutUser()` action call

**5.3 — `middleware.ts` — route level protection**

- Kaunse routes protect karne hain
- Cookie check — session nahi → `redirect('/login')`

---

## Phase 6 — Password Reset

> **Is Phase Mein:**
> Model: `PasswordResetToken` | Actions: `forgotPassword()`, `resetPassword()` | UI: `(auth)/forgot-password/page.tsx`, `(auth)/reset-password/page.tsx`

**6.1 — Forgot password flow samjho**

- Step by step sochte hain pehle — kya karna hai

**6.2 — `PasswordResetToken` model banana**

- Tab banao — Phase 6 mein, pehle nahi
- Fields: `id`, `userId`, `token`, `expiresAt`
- Migration run karo

**6.3 — `generatePasswordResetToken()` — `lib/token.ts` mein add karo**

**6.4 — `(auth)/forgot-password/page.tsx` banana**

- Email input form — `forgotPassword()` action call

**6.5 — `forgotPassword()` action — `app/actions/auth.ts` mein add karo**

- Email se user dhundo → token generate → email bhejo

**6.6 — Reset email template banana**

**6.7 — `(auth)/reset-password/page.tsx` banana**

- URL se token nikalo
- Naya password form — `resetPassword(token, formData)` action call

**6.8 — `resetPassword()` action — `app/actions/auth.ts` mein add karo**

- Token verify → naya password hash → save
- Us user ki saari sessions invalidate karo — kyun? tab samjhayenge

---

## Phase 7 — NextAuth.js Integration (OAuth)

> **Is Phase Mein:**
> Model: `Account` | OAuth providers: GitHub, Google

**7.1 — NextAuth.js install + basic config**

- Existing DB tables ke saath integrate karna

**7.2 — `Account` model banana**

- Tab banao — Phase 7 mein, pehle nahi
- OAuth provider info store karne ke liye
- Migration run karo

**7.3 — GitHub provider setup**

**7.4 — Google provider setup**

**7.5 — Email-based auth + OAuth combine karna**

- Dono ek saath kaam karein — ek hi app mein

---

## Quick Reference — Har Phase Ka Summary

| Phase | Model                | Lib File                   | Action(s)                             | UI Page                                           |
| ----- | -------------------- | -------------------------- | ------------------------------------- | ------------------------------------------------- |
| 1     | —                    | —                          | —                                     | —                                                 |
| 2     | `User`               | `prisma.ts`, `password.ts` | `registerUser()`                      | `(auth)/register`                                 |
| 3     | `VerificationToken`  | `email.ts`, `token.ts`     | `verifyEmail()`                       | `(auth)/verify`                                   |
| 4     | `Session`            | `session.ts`               | `loginUser()`, `logoutUser()`         | `(auth)/login`                                    |
| 5     | —                    | —                          | —                                     | `(protected)/dashboard`                           |
| 6     | `PasswordResetToken` | —                          | `forgotPassword()`, `resetPassword()` | `(auth)/forgot-password`, `(auth)/reset-password` |
| 7     | `Account`            | —                          | —                                     | —                                                 |
