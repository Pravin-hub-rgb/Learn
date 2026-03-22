**NextAuth — Auth.js v5 — Final Doc Plan**

```
Phase 1: Foundation
1.1 — Project setup ✅
1.2 — Auth.js v5 install + auth.ts ✅
1.3 — GitHub OAuth + signIn + pehli baar login ✅

Phase 2: Session
2.1 ✅ — Session kya hoti hai + cookie story + DevTools
2.2 — auth() se session read karo + signOut
2.3 — useSession() kya hai + kyun chahiye
2.4 — SessionProvider kya hai + kahan lagao
2.5 — Navbar mein user naam + dropdown

Phase 3: Route Protection
3.1 — Client-side protection (useSession + redirect)
3.2 — RSC kya hai — Server vs Client component story
3.3 — Server Component protection (auth() helper)
3.4 — Middleware kya hai — story + concept
3.5 — proxy.ts banao + basic route protection
3.6 — Public/protected routes ka proper setup

Phase 4: UX Polish
4.1 — Custom Sign-In page banao
4.2 — Error handling login page pe
4.3 — Already logged-in user ko redirect
4.4 — Loading states + edge cases

Phase 5: Production
5.1 — JWT kya hota hai + session strategy samjho
5.2 — Database session kab use karein
5.3 — AUTH_SECRET + env variables + security