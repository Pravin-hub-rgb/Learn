# Phase 5 — Production Concepts (Speed Run)

---

## 5.1 — JWT vs Database session

**Default: JWT (no setup needed)**

Auth.js v5 by default JWT use karta hai — session browser cookie mein store hoti hai, koi database nahi chahiye.

```ts
// auth.ts — JWT (default, kuch nahi likhna)
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
})
```

**Database session use karna ho toh:**

```bash
bun add @auth/prisma-adapter @prisma/client
```

```ts
// auth.ts — Database session
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [GitHub],
})
```

> **Kab konsa?**
> - **JWT** → simple projects, no DB needed, fast ✅
> - **Database** → session revoke karna ho, extra user data store karna ho, multi-device logout chahiye

---

## 5.2 — AUTH_SECRET + Environment variables + Security

**`.env.local`** — final structure:

```env
# Required — hamesha
AUTH_SECRET=<strong random string — 32+ chars>

# GitHub OAuth
AUTH_GITHUB_ID=<github client id>
AUTH_GITHUB_SECRET=<github client secret>

# Production mein add karo
NEXTAUTH_URL=https://yourdomain.com
```

**`.gitignore`** mein check karo — `.env.local` already ignore hona chahiye:

```
.env.local        ← must be here
.env*.local
```

**Production deploy karte waqt:**
- Vercel/Railway pe environment variables manually add karo
- `AUTH_SECRET` production ke liye alag generate karo — development wala mat use karo
- `NEXTAUTH_URL` production domain set karo

> **Security rules:**
> - `.env.local` kabhi commit mat karo
> - Client components mein `AUTH_SECRET` use mat karo — server only
> - `AUTH_GITHUB_SECRET` public nahi honi chahiye — `NEXT_PUBLIC_` prefix kabhi mat lagao

---

## Phase 5 Complete ✅

**Kya working hai abhi:**
- JWT vs Database session — kab konsa use karna
- Environment variables proper setup
- Security best practices

---

## 🎉 Speed Run Complete — Saare Phases Done

```
Phase 1 ✅ — Foundation + GitHub OAuth
Phase 2 ✅ — Session + Navbar
Phase 3 ✅ — Route Protection + Middleware
Phase 4 ✅ — UX Polish + Custom Login
Phase 5 ✅ — Production Concepts
```

**Ab deep docs banane ka time** — har phase ki proper explanation ke saath. 🙂