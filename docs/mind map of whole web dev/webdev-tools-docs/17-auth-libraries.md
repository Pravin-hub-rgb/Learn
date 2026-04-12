# 17 — Auth Libraries: NextAuth, Clerk, Lucia, Auth0, Better Auth

> Umbrella: Auth

---

### NextAuth / Auth.js
**Tag: 🟢 Next.js Standard | Most Popular**

```
Kya hai: Next.js ke liye auth library
Kab use karo: Google/GitHub login + email/password — Next.js project
Real app: Most Indian startups using Next.js
Cons: Config verbose, docs confusing kabhi kabhi
```

---

### Clerk
**Tag: 🟢 Fastest Setup | UI Included | Paid**

```
Kya hai: Complete auth platform — UI bhi, logic bhi
Kab use karo: Jaldi launch karna, auth pe time waste nahi
Cons: Paid, vendor lock-in
India mein: Funded startups, hackathons
```

---

### Lucia
**Tag: 🟢 Lightweight | DIY | TypeScript**

```
Kya hai: Minimal auth library — sirf sessions, baki tum karo
Kab use karo: Full control chahiye, Clerk costly laga, NextAuth complex laga
ShopKaro approach: Khud banaya → Lucia jaisa approach hai
```

---

### Better Auth
**Tag: 🟢 New | TypeScript-first | Growing**

```
Kya hai: Modern auth library — 2024 mein growing rapidly
Kab use karo: NextAuth alternatives explore kar rahe ho
Status: New but promising — watch karo
```

---

### Auth0
**Tag: 🟢 Enterprise | Okta company**

```
Kya hai: Enterprise auth platform — SSO, SAML, enterprise features
Kab use karo: Enterprise clients, B2B SaaS, SSO required
India mein: Enterprise companies, government projects
```

---

### Passport.js
**Tag: 🟡 Express classic | Strategy-based**

```
Kya hai: Express ke liye auth middleware
Kab use karo: Express backend, existing Passport codebase
Avoid in new projects: NextAuth ya Better Auth better for Next.js
```

---

### Supabase Auth
**Tag: 🟢 Supabase users**

```
Kya hai: Supabase ka built-in auth
Kab use karo: Already Supabase use kar rahe ho
```

---

### Firebase Auth
**Tag: 🟢 Mobile apps | Google**

```
Kya hai: Google ka auth — mobile + web
Kab use karo: React Native apps, Firebase ecosystem
```

---

## Auth Quick Decision

```
Next.js, Google/GitHub login chahiye?
  → NextAuth / Auth.js

Jaldi launch, UI bhi ready chahiye?
  → Clerk

Full control, lightweight?
  → Lucia ya Better Auth

Express backend?
  → Passport.js ya khud banao

Enterprise, SSO?
  → Auth0

Supabase use kar rahe ho?
  → Supabase Auth
```

---

## Agla Doc

`18-testing.md` — Testing tools — Vitest, Jest, Playwright, Cypress — Swiggy ka checkout test kaise hota hoga.
