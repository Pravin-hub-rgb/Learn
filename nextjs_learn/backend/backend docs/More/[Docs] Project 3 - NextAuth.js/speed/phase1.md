# Phase 1 — Foundation (Speed Run)

---

## 1.1 — Project Setup

```bash
npx create-next-app@latest nextauth-project
```

Options select karo:
```
✔ TypeScript → Yes
✔ ESLint → Yes
✔ Tailwind CSS → Yes
✔ src/ directory → No
✔ App Router → Yes
✔ Turbopack → Yes
✔ Import alias → No
```

```bash
cd nextauth-project
npm run dev
```

**Folder structure jo matter karti hai:**
```
app/
  layout.tsx       ← root layout
  page.tsx         ← home page
  api/
    auth/
      [...nextauth]/
        route.ts   ← yeh hum banayenge 1.2 mein
middleware.ts      ← root level pe (next.config.ts ke saath)
auth.ts            ← root level pe
.env.local         ← root level pe
```

---

## 1.2 — Auth.js v5 Install + auth.ts

```bash
npm install next-auth@beta
```

```bash
# Yeh command mat chalao — BETTER_AUTH_SECRET generate karta hai jo galat hai
# npx auth secret   ← nahi
```

> **2025+ reality:** `npx auth secret` / `bunx auth secret` dono ab `BETTER_AUTH_SECRET` suggest karte hain — kyunki CLI package Better Auth team ne le liya. Lekin next-auth@beta ko `AUTH_SECRET` chahiye. Toh manually `.env.local` banao aur secret khud likho.

**`auth.ts`** — root mein banao:
```ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
})
```

**`app/api/auth/[...nextauth]/route.ts`** — banao:
```ts
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

---

## 1.3 — GitHub OAuth + pehli baar login

### GitHub pe OAuth App banao

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. Fill karo:
   ```
   Application name: nextauth-project (kuch bhi)
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:3000/api/auth/callback/github
   ```
3. Register karo → **Client ID** copy karo
4. **Generate a new client secret** → copy karo

### `.env.local` manually banao root mein:
```env
AUTH_SECRET=<already added by npx auth secret>
AUTH_GITHUB_ID=<client id here>
AUTH_GITHUB_SECRET=<client secret here>
```

### Login button — `app/page.tsx`:
```tsx
import { signIn, signOut, auth } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <main>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <form action={async () => { "use server"; await signOut() }}>
            <button type="submit">Sign Out</button>
          </form>
        </>
      ) : (
        <form action={async () => { "use server"; await signIn("github") }}>
          <button type="submit">Sign In with GitHub</button>
        </form>
      )}
    </main>
  )
}
```

### Test karo:
```
http://localhost:3000
```
Sign In click karo → GitHub pe redirect hoga → authorize karo → wapas aao → naam dikhe ✅

---

## Phase 1 Complete ✅

**Kya working hai abhi:**
- Next.js 15 App Router project
- Auth.js v5 configured
- GitHub OAuth working
- Login / Logout functional
- Session server component mein readable hai

**Agla → Phase 2: Session deep dive**