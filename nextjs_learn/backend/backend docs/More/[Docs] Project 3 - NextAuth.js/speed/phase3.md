# Phase 3 — Route Protection (Speed Run)

---

## 3.1 — Client-side protection (useSession + redirect)

**`app/dashboard/page.tsx`** banao:

```tsx
"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  if (status === "loading") return <p>Loading...</p>
  if (!session) return null

  return <h1>Welcome to Dashboard, {session.user?.name}</h1>
}
```

> **Problem with this approach:** Page ek second ke liye flash hota hai — phir redirect hota hai. Isliye better options hain.

---

## 3.2 — Server Component protection (auth() helper)

**`app/secret/page.tsx`** banao:

```tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function SecretPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return <h1>Secret Page — Welcome {session.user?.name}</h1>
}
```

> **Yeh better hai** — server pe check hota hai, koi flash nahi, koi extra JS nahi.

---

## 3.3 — Middleware protection

> **Next.js 16 note:** `middleware.ts` deprecated ho gaya — ab `proxy.ts` use karo same location pe.

**`proxy.ts`** — root mein banao (next.config.ts ke saath):

```ts
export { auth as middleware } from "@/auth"
```

Bas itna — yeh saari routes pe auth check lagata hai.

---

## 3.4 — Public/Protected routes ka proper setup

Sirf `proxy.ts` itna nahi enough — sab kuch protect ho jaata hai including `/api/auth` bhi — jo galat hai.

**`proxy.ts`** update karo:

```ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthRoute = req.nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = ["/", "/login"].includes(req.nextUrl.pathname)

  if (isAuthRoute) return NextResponse.next()
  if (isPublicRoute) return NextResponse.next()

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
```

### Test karo:
```
http://localhost:3000/secret
```
- Login nahi → `/` pe redirect ✅
- Login hai → secret page dikhe ✅
- `/api/auth/...` routes → block nahi honge ✅

---

## Phase 3 Complete ✅

**Kya working hai abhi:**
- Client-side protection (useSession)
- Server Component protection (auth() helper) — best approach
- Middleware set up
- Public/protected routes properly configured

**Agla → Phase 4: UX Polish**