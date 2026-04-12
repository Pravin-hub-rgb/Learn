# 07 — OAuth: "Google Se Login Karo" Kaise Kaam Karta Hai

> Pichle doc mein cookies samjhe — session/JWT browser tak kaise pohnchaati hain.
> Ab ek popular concept — **OAuth**. ShopKaro v1 mein nahi use karenge, lekin yeh har jagah milega.

---

## Problem Jo OAuth Solve Karta Hai

Soch lo tum ek naya app use karna chahte ho — **ShopKaro**.

Option 1: Naya email + password banana → boring, time lagta hai
Option 2: "Google se Login karo" → ek click, done

Option 2 kaafi popular hai — aur users bhi prefer karte hain.

Lekin sawaal yeh hai — **ShopKaro ko tumhara Google password kaise pata?**

Answer: **Pata nahi hota. Aur hona bhi nahi chahiye.**

Yahi OAuth ka kaam hai.

---

## OAuth Flow — Kaise Kaam Karta Hai

```
1. Priya ShopKaro pe "Google se Login" dabati hai

2. ShopKaro → Priya ko Google pe redirect karta hai
   "Google bhai, yeh ShopKaro hai — Priya se pooch ki mujhe uska
   naam aur email de sakti hai?"

3. Google → Priya ko poochta hai
   "ShopKaro aapka naam aur email access karna chahta hai. Allow?"

4. Priya → "Allow" dabati hai

5. Google → ShopKaro ko ek **code** bhejta hai
   "Yeh lo ek temporary code"

6. ShopKaro → Google ko code bhejta hai
   "Yeh code lo, mujhe Priya ki info do"

7. Google → ShopKaro ko info deta hai
   { name: "Priya Sharma", email: "priya@gmail.com" }

8. ShopKaro → Priya ka account banata hai/dhundhta hai → Login!
```

**Poore process mein ShopKaro ko Priya ka Google password kabhi pata nahi chala.**

---

## Key Terms

**Provider** — Jiske account se login ho raha hai (Google, GitHub, Facebook)

**Client** — Tumhara app (ShopKaro)

**Scope** — Kya information maangi hai (sirf email? ya contacts bhi?)

**Access Token** — Google ShopKaro ko deta hai — future API calls ke liye

---

## ShopKaro Mein OAuth Add Karna — Kab Karein?

**v1 mein nahi** — kyunki:
- Setup thoda complex hai (Google Console mein app register karna padta hai)
- Pehle basic auth samajhna zaroori hai

**v2 mein add karo** — jab basic auth comfortable ho.

---

## OAuth Kaise Add Karein (Next.js Mein) — NextAuth Se

NextAuth / Auth.js OAuth ko bahut simple bana deta hai:

```javascript
// /app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const { GET, POST } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ]
})
```

Bas — yeh 10 lines mein Google login ready.

`GOOGLE_CLIENT_ID` aur `GOOGLE_CLIENT_SECRET` — Google Console se milte hain jab app register karo.

---

## OAuth vs Password Login — Dono Saath Rakh Sakte Ho

ShopKaro mein dono options ho sakte hain:

```
Login Page:
┌─────────────────────────┐
│  Email: ____________    │
│  Password: _________    │
│  [Login]                │
│                         │
│  ─── ya ───             │
│                         │
│  [G] Google se Login    │
│  [GitHub se Login]      │
└─────────────────────────┘
```

Dono alag flows hain — lekin end result same: user logged in, session/cookie set.

---

## Summary

| | |
|--|--|
| **OAuth kya hai** | Third-party se login — bina unka password jaane |
| **Flow** | App → Provider → User allow → Code → Token → Info |
| **ShopKaro mein** | v2 mein add karenge NextAuth se |
| **v1 mein** | Sirf email/password — khud banaya hua |

---

## Agla Doc

`08-auth-email-verification.md` — Priya ne signup kiya — lekin kya woh email sach mein uski hai? **Email verification** aur **password reset** flow kaise kaam karta hai — tokens, expiry — yeh sab samjhenge. Yeh ShopKaro v1 mein bhi hai.
