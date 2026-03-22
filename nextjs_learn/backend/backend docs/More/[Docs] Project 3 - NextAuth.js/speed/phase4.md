# Phase 4 — UX Polish (Speed Run)

---

## 4.1 — Already logged-in user ko login page pe redirect

Agar custom login page hai aur logged-in user directly `/login` visit kare — toh usse dashboard pe bhejo.

**`proxy.ts`** update karo:

```ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard") ||
                           req.nextUrl.pathname.startsWith("/profile")
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login")

  // Already logged in → login page pe mat aane do
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }

  // Protected route + not logged in → redirect to login
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
```

---

## 4.2 — Custom Sign-In page

**`auth.ts`** mein pages config add karo:

```ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/login",
    error: "/login",
  },
})
```

**`app/login/page.tsx`** banao:

```tsx
import { signIn } from "@/auth"

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
      <h1>Sign In</h1>

      {searchParams.error && (
        <p style={{ color: "red" }}>
          {searchParams.error === "Configuration"
            ? "Server error — check your credentials"
            : "Something went wrong — try again"}
        </p>
      )}

      <form
        action={async () => {
          "use server"
          await signIn("github", { redirectTo: "/dashboard" })
        }}
      >
        <button type="submit">Sign In with GitHub</button>
      </form>
    </main>
  )
}
```

---

## 4.3 — Loading states + edge cases

**Navbar mein loading state already hai** (Phase 2 mein `status === "loading"` handle kiya tha) ✅

**Edge case — session user image null ho sakti hai:**

`app/components/Navbar.tsx` mein image check update karo:

```tsx
{session.user?.image ? (
  <img
    src={session.user.image}
    alt="avatar"
    width={32}
    height={32}
    style={{ borderRadius: "50%", marginRight: "8px" }}
  />
) : (
  <span style={{
    width: 32, height: 32, borderRadius: "50%",
    background: "#555", display: "inline-flex",
    alignItems: "center", justifyContent: "center",
    marginRight: "8px"
  }}>
    {session.user?.name?.[0] ?? "?"}
  </span>
)}
```

### Test karo:
```
# Logged in hokar visit karo:
http://localhost:3000/login  → /dashboard pe redirect ho ✅

# Logout karke visit karo:
http://localhost:3000/login  → login page dikhe ✅

# Wrong credentials se error:
URL mein ?error=Configuration → error message dikhe ✅
```

---

## Phase 4 Complete ✅

**Kya working hai abhi:**
- Logged-in user login page pe nahi ja sakta
- Custom login page with error handling
- Navbar mein fallback avatar (naam ka pehla letter)

**Agla → Phase 5: Production Concepts**