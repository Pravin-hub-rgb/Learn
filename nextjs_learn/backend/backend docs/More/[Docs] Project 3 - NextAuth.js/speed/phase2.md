# Phase 2 — Session (Speed Run)

---

## 2.1 — Session kya hoti hai + useSession() basics

Session = server pe stored data jo batata hai "kaun logged in hai".

**2 jagah se session read kar sakte ho:**
- **Server Component mein** → `auth()` helper (Phase 1 mein already use kiya)
- **Client Component mein** → `useSession()` hook

`useSession()` ke liye **SessionProvider** chahiye — yeh 2.2 mein lagayenge.

---

## 2.2 — SessionProvider kahan lagao

**`app/layout.tsx`** mein wrap karo:

```tsx
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

> **Note:** `SessionProvider` ek Client Component hai — lekin `layout.tsx` Server Component rehta hai. Yeh Next.js allow karta hai — Provider ko alag file mein nahi nikalna pada ab (v5 mein fix ho gaya).

---

## 2.3 — Navbar mein user naam + dropdown

**`app/components/Navbar.tsx`** banao:

```tsx
"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#111", color: "#fff" }}>
      <span>MyApp</span>

      <div>
        {status === "loading" && <span>Loading...</span>}

        {status === "unauthenticated" && (
          <button onClick={() => signIn("github")}>
            Sign In
          </button>
        )}

        {status === "authenticated" && (
          <div style={{ position: "relative" }}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="avatar"
                  width={32}
                  height={32}
                  style={{ borderRadius: "50%", marginRight: "8px" }}
                />
              )}
              {session.user?.name} ▾
            </button>

            {dropdownOpen && (
              <div style={{
                position: "absolute", right: 0, top: "110%",
                background: "#222", padding: "0.5rem",
                borderRadius: "8px", minWidth: "120px"
              }}>
                <button
                  onClick={() => signOut()}
                  style={{ width: "100%", padding: "0.5rem", color: "#fff", background: "none", border: "none", cursor: "pointer" }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
```

**`app/layout.tsx`** mein Navbar add karo:

```tsx
import { SessionProvider } from "next-auth/react"
import Navbar from "./components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

### Test karo:
```
http://localhost:3000
```
- Login nahi → "Sign In" button dikhe ✅
- Login hai → profile picture + naam dikhe ✅
- Click karo → "Sign Out" dropdown aaye ✅
- Sign Out click karo → wapas "Sign In" button ✅

---

## Phase 2 Complete ✅

**Kya working hai abhi:**
- SessionProvider set up
- Navbar dynamic — login state ke hisaab se change hoti hai
- Profile picture + naam + logout dropdown

**Agla → Phase 3: Route Protection**