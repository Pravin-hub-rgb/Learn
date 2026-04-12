# 04 — Sessions: Login Ke Baad User Ko Yaad Rakhna

> Pichle doc mein humne bcrypt se password hash karna seekha.
> Ab agla sawaal — Priya login ho gayi, **ab kaise pata rahega ki woh logged in hai?**

---

## Problem — HTTP Bhoolakkad Hai

Web ka ek fundamental problem hai — **HTTP stateless hai.**

Matlab har request independent hai. Server ko koi memory nahi hoti previous request ki.

```
Request 1: POST /api/login → Server: "Okay, Priya logged in"
Request 2: GET /api/orders → Server: "Kaun hai? Pata nahi 🤷"
```

Server bhool jaata hai. Har baar fresh start.

Toh problem yeh hai — Priya login kare, products dekhe, cart mein daale, order kare — har step pe server ko yaad rakhna hoga ki **yeh Priya hai.**

---

## Solution — Sessions

Session ek tarika hai server ko "yaad" dilane ka.

Kaam kaise karta hai:

```
1. Priya login karti hai → Sahi credentials

2. Server ek unique Session ID banata hai
   sessionId = "a3f9b2c1d4e5..."  (random string)

3. Server is Session ID ko apne paas store karta hai
   (database ya memory mein)
   sessions = {
     "a3f9b2c1d4e5": { userId: 1, email: "priya@gmail.com" }
   }

4. Yeh Session ID → Cookie mein bhej deta hai Priya ke browser ko

5. Ab Priya ka browser har request ke saath yeh cookie automatically bhejta hai

6. Server cookie dekh ke → Session ID nikalta hai → "Haan yeh Priya hai"
```

---

## Cookie Kya Hoti Hai?

Cookie browser mein store hone wala ek **chhota sa data piece** hai — jo har request ke saath automatically server ko jaata hai.

```
Browser ke paas:
Cookie: sessionId=a3f9b2c1d4e5

Har request ke saath yeh header automatically jaata hai:
GET /api/orders
Cookie: sessionId=a3f9b2c1d4e5
```

Cookies ke baare mein alag doc hai — `06-auth-cookies.md` — wahan detail mein samjhenge.

---

## Session Flow — Poora Picture

```
SIGNUP/LOGIN:
Priya → POST /api/login → Server verifies → Session banao → Cookie bhejo

PROTECTED PAGE:
Priya → GET /dashboard
        Cookie: sessionId=abc123
        → Server: sessionId se user dhundo → Priya hai → Data bhejo

LOGOUT:
Priya → POST /api/logout → Server: Session delete karo → Cookie clear karo
```

---

## ShopKaro Mein Sessions — Kaise Karenge

Next.js mein sessions ke liye hum **`iron-session`** ya **`express-session`** jaisi library use kar sakte hain. ShopKaro mein `iron-session` use karenge — yeh Next.js ke saath accha kaam karta hai.

### Login API Route:

```javascript
// /app/api/auth/login/route.js

import { getIronSession } from 'iron-session'

export async function POST(req) {
  const { email, password } = await req.json()

  // 1. User dhundo
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return Response.json({ error: "User not found" }, { status: 401 })

  // 2. Password compare karo
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return Response.json({ error: "Wrong password" }, { status: 401 })

  // 3. Session banao
  const session = await getIronSession(req, res, sessionOptions)
  session.userId = user.id
  session.email = user.email
  await session.save()  // Cookie set ho jaati hai

  return Response.json({ message: "Logged in!" })
}
```

### Protected Route — Session Check:

```javascript
// /app/api/orders/route.js

export async function GET(req) {
  const session = await getIronSession(req, res, sessionOptions)

  // Session check karo
  if (!session.userId) {
    return Response.json({ error: "Please login" }, { status: 401 })
  }

  // User logged in hai — data bhejo
  const orders = await prisma.order.findMany({
    where: { userId: session.userId }
  })

  return Response.json(orders)
}
```

### Logout:

```javascript
// /app/api/auth/logout/route.js

export async function POST(req) {
  const session = await getIronSession(req, res, sessionOptions)
  session.destroy()  // Session delete
  return Response.json({ message: "Logged out" })
}
```

---

## Session Kahan Store Hoti Hai?

```
Option 1 — Database mein (ShopKaro mein yahi karenge)
  Pros: Reliable, logout pe turant delete
  Cons: Har request pe database query

Option 2 — Memory mein (server RAM)
  Pros: Fast
  Cons: Server restart pe sab sessions gone

Option 3 — Redis (cache database)
  Pros: Fast + Persistent
  Cons: Extra setup — baad mein seekhna
```

ShopKaro v1 mein → **Database mein sessions store karenge** (simplest approach).

---

## Ek Important Security Point

Session ID ko guess karna **impossible** hona chahiye. Isliye:

```javascript
// Yeh mat karo — predictable
sessionId = user.id  // "1", "2", "3" — easily guessable

// Yeh karo — random
sessionId = crypto.randomUUID()  // "a3f9b2c1-d4e5-..." — impossible to guess
```

`iron-session` aur similar libraries yeh automatically handle karti hain.

---

## Summary

| | |
|--|--|
| **Session kya hai** | Server pe stored user info, linked via Session ID |
| **Cookie ka kaam** | Session ID browser se server tak pohnchaana |
| **ShopKaro mein** | Login pe session banao, har request pe check karo, logout pe delete karo |
| **Store kahan** | Database (v1), Redis (baad mein) |

---

## Agla Doc

`05-auth-jwt.md` — Sessions ek tarika tha. Ek aur popular tarika hai — **JWT (JSON Web Token)**. Yeh sessions se kaafi alag hai. Kab kaunsa use karein — woh samjhenge.
