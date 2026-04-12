# 02 — Authentication: Umbrella Kya Hai

> Pichle doc mein humne ShopKaro ka rough plan banaya.
> Ab pehla bada umbrella — **Authentication**.
> Yeh doc sirf overview hai — andar ki har cheez ke alag docs hain.

---

## Authentication Kya Hai?

Ek line mein: **"Yeh user kaun hai?" — yeh prove karna.**

ShopKaro pe jab Priya aati hai aur bolti hai "main Priya hoon" — toh app ko kaise pata ki woh sach mein Priya hai? Koi aur toh nahi jo Priya ban ke aa raha?

Yahi solve karta hai Authentication.

---

## Authentication vs Authorization — Fark Kya Hai?

Yeh do words bohot confuse karte hain — ek baar clear kar lo:

| | Matlab | ShopKaro Example |
|--|--------|-----------------|
| **Authentication** | "Tum kaun ho?" — Identity prove karna | Priya ne login kiya — haan, yeh Priya hai |
| **Authorization** | "Tumhe kya karne ki permission hai?" — Access control | Priya apna hi order dekh sakti hai, kisi aur ka nahi |

Pehle Authentication hoti hai, phir Authorization.

---

## Authentication Umbrella Ke Andar Kya Kya Aata Hai

```
AUTHENTICATION
│
├── Password Hashing (bcrypt)
│   → User ka password safe kaise store karein
│
├── Sessions
│   → Login ke baad user ko "yaad" kaise rakhein
│
├── JWT (JSON Web Tokens)
│   → Sessions ka ek alternative tarika
│
├── Cookies
│   → Session ya JWT ko browser tak kaise pohnchaayein
│
├── OAuth
│   → "Google se login karo" wala system
│
├── Email Verification + Password Reset
│   → Email pe link bhejna, token verify karna
│
└── Auth Libraries
    → NextAuth, Clerk, Auth.js — ready-made solutions
```

ShopKaro mein hum **inhe sab use karenge** — ek ek karke samjhenge.

---

## ShopKaro Ka Authentication Flow — Mota Mota

### Signup:
```
1. Priya form fill karti hai → email + password
2. Server password ko hash karta hai (bcrypt)
3. Database mein save hota hai → email + hashed password
4. Session create hoti hai
5. Priya logged in hai ab
```

### Login:
```
1. Priya email + password daalta hai
2. Server database mein email dhundhta hai
3. Password compare karta hai (bcrypt)
4. Match → Session create karo → Cookie bhejo
5. Priya logged in hai
```

### Har Request:
```
1. Priya koi page kholti hai
2. Browser automatically cookie bhejta hai
3. Server cookie check karta hai → "Haan yeh Priya hai"
4. Data bhejta hai
```

### Logout:
```
1. Priya logout dabati hai
2. Server session delete karta hai
3. Cookie clear hoti hai
4. Priya logged out
```

---

## Kya Kya Decisions Lene Hain ShopKaro Mein

**Decision 1 — Password kaise store karein?**
- Plain text mein? ❌ (Kabhi nahi — agar database leak ho toh sab passwords expose)
- Encrypted? (Reversible) — thoda better, lekin phir bhi risky
- Hashed? (bcrypt) ✓ — Yahi karenge

**Decision 2 — Login ke baad user ko kaise yaad rakhein?**
- Sessions → Server pe store hota hai, cookie mein sirf ID
- JWT → Sab kuch token mein hota hai, server pe kuch store nahi

ShopKaro mein → **Sessions** use karenge (simple, beginner-friendly)

**Decision 3 — Google/GitHub login chahiye?**
- ShopKaro v1 mein nahi — sirf email/password
- Baad mein add kar sakte ho → OAuth doc mein samjhenge

---

## Ek Important Cheez

Authentication ek aisa topic hai jahan **galti karna dangerous hota hai.**

Agar tum galat tarike se passwords store karo ya sessions handle karo — user ka data unsafe ho sakta hai.

Isliye yeh docs mein hum **kyun** bhi samjhenge — sirf "kaise" nahi.

---

## Agla Doc

`03-auth-password-hashing.md` — Priya ka password database mein kaise store hota hai? bcrypt kya hai, hashing kya hoti hai, aur plain text password kabhi kyun nahi store karna chahiye.
