# 09 — Auth Libraries: NextAuth, Clerk, Auth.js — Kab Kaunsa?

> Pichle docs mein humne authentication ka poora system khud banaya.
> Ab ek important decision — **kab library use karein, kab khud banao?**
> Yeh Authentication umbrella ka aakhri doc hai.

---

## Humne Khud Kyun Banaya?

Agar Clerk ya NextAuth 10 minutes mein sab solve kar deta hai — toh humne itna kyun padha?

Kyunki jab tum library use karte ho bina andar samjhe — toh:
- Kuch kaam nahi karta → pata nahi kyun
- Customize karna hai → pata nahi kahan se shuru karein
- Interview mein poochhte hain → "bas library use ki" ← yeh nahi chalega

Ab jo tune seekha — woh **har library ke andar** hi hota hai. Tum ab samajhte ho library kya kar rahi hai.

---

## Teen Popular Options

### 1. Khud Banao (Jo Humne Kiya)
**Kab:** Seekhna hai, full control chahiye, simple email/password hi kaafi hai
**Pros:** Samajh aata hai, customize kar sakte ho
**Cons:** Zyada code, security mistakes ho sakti hain
**ShopKaro v1:** Yahi

---

### 2. Auth.js / NextAuth
**Kab:** OAuth providers chahiye (Google, GitHub), Next.js use kar rahe ho
**Pros:** Multiple providers, flexible, free, Next.js ke saath perfect
**Cons:** Config thoda complex, docs kabhi kabhi confusing

```javascript
// Sirf yeh karo — Google + GitHub + Email ready
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'

export const { GET, POST } = NextAuth({
  providers: [
    Google({ clientId: "...", clientSecret: "..." }),
    GitHub({ clientId: "...", clientSecret: "..." }),
    Credentials({
      // Apna email/password logic yahan
      async authorize(credentials) {
        // bcrypt compare, user dhundo, return karo
      }
    })
  ]
})
```

**ShopKaro v2 mein** — Google login add karna ho toh NextAuth best choice.

---

### 3. Clerk
**Kab:** Jaldi launch karna hai, UI bhi ready chahiye, team feature chahiye
**Pros:** Poora UI ready (login page, signup page, profile page), multi-tenant support, magic links, MFA — sab out of the box
**Cons:** Paid (free tier limited hai), less control, vendor lock-in

```javascript
// Clerk ke saath sirf yeh karo
import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return <SignIn />  // Poora login form ready — styling bhi
}
```

```javascript
// Protected route
import { auth } from '@clerk/nextjs'

export default async function Dashboard() {
  const { userId } = auth()
  if (!userId) redirect('/login')
  // ...
}
```

**Kab use karein:** Startup, hackathon, jab time nahi hai auth pe — Clerk sab handle karta hai.

---

## Decision Guide — ShopKaro Ke Liye

```
Kya seekhna hai auth andar se?
  → Haan → Khud banao (ShopKaro v1)

Kya Google/GitHub login chahiye?
  → Haan → NextAuth

Kya jaldi launch karna hai, auth pe time waste nahi karna?
  → Haan → Clerk

Kya enterprise features chahiye (SSO, SAML, organizations)?
  → Haan → Clerk ya WorkOS
```

---

## Ek Comparison Table

| | Khud Banao | NextAuth | Clerk |
|--|-----------|----------|-------|
| Setup time | Ghante | 30 min | 10 min |
| Learning | Maximum | Medium | Minimum |
| Control | Full | High | Limited |
| OAuth | Manual | Built-in | Built-in |
| UI | Khud banao | Khud banao | Ready |
| Cost | Free | Free | Freemium |
| Best for | Learning | Production Next.js | Fast launch |

---

## Authentication Umbrella — Complete Hua

Ab tum Authentication umbrella ka poora map jaante ho:

```
AUTHENTICATION
│
├── Password Hashing (bcrypt)       → Doc 03 ✓
├── Sessions                         → Doc 04 ✓
├── JWT                              → Doc 05 ✓
├── Cookies                          → Doc 06 ✓
├── OAuth                            → Doc 07 ✓
├── Email Verification + Reset       → Doc 08 ✓
└── Libraries (NextAuth, Clerk)      → Doc 09 ✓ (YEH)
```

Jab bhi koi bole "Authentication karo" — ab tum jaante ho isके andar kya kya aata hai aur kab kya use karna hai.

---

## Agla Doc

`10-architecture-what-is-it.md` — Authentication poora hua. Ab dusra bada umbrella — **Architecture**. Matlab — tumhara project internally kaise organized hai? Folders, files, kaunsi cheez kahan jaati hai — yeh decisions kahin bhi nahi sikhaate, yahan sikhenge.
