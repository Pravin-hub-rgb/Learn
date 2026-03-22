**NextAuth — Auth.js v5 — Final Doc Plan**

```
Phase 1: Foundation
1.1 — Project setup (Next.js 15 install + folder structure)
1.2 — Auth.js v5 install + auth.ts anatomy
1.3 — GitHub OAuth setup + signIn() flow + pehli baar login

Phase 2: Session
2.1 — Session kya hoti hai + useSession() basics
2.2 — SessionProvider kyu chahiye + kahan lagao
2.3 — Navbar mein user naam dikhao

Phase 3: Route Protection
3.1 — Client-side protection (useSession + redirect)
3.2 — RSC kya hai + Server Component protection (auth() helper)
3.3 — Middleware kya hai + route protection
3.4 — Middleware mein public/protected routes ka proper setup

Phase 4: UX Polish
4.1 — Already logged-in user ko login page pe redirect
4.2 — Custom Sign-In page + error handling
4.3 — Loading states + edge cases

Phase 5: Production Concepts
5.1 — JWT vs Database session — kab konsa
5.2 — AUTH_SECRET + environment variables + security
```

**Total — 15 docs**

---

Bol jab 1.1 banana ho. 🙂