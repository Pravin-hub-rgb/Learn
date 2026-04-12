# 08 — Email Verification & Password Reset

> Pichle doc mein OAuth dekha — Google/GitHub login.
> Ab ShopKaro v1 ka hissa — **Email Verification** aur **Password Reset**.
> Yeh dono token-based flows hain — concept same hai dono mein.

---

## Email Verification Kyun Zaroori Hai?

Agar email verify nahi karte toh:
- Koi bhi "priya@gmail.com" se register kar sakta hai — chahe woh Priya ki email ho ya nahi
- Spam accounts easily ban sakte hain
- Password reset emails galat jagah jaayengi

---

## Email Verification Flow

```
1. Priya signup karti hai
   → Account banta hai database mein
   → emailVerified = false

2. Server → Ek unique random token banata hai
   token = "x7k2m9p..." (random, expire hoga 24 ghante mein)
   → Token database mein save hota hai (userId ke saath)

3. Server → Email bhejta hai Priya ko
   "Yeh link dabao verify karne ke liye:
   shopkaro.com/verify-email?token=x7k2m9p..."

4. Priya link dabati hai

5. Server → Token check karta hai
   - Token exist karta hai? ✓
   - Expire toh nahi hua? ✓
   - Sahi user ka hai? ✓

6. → emailVerified = true → Token delete karo → Login karo Priya ko
```

---

## Password Reset Flow

```
1. Priya "Forgot Password" dabati hai, email daalta hai

2. Server → User dhundo → Token banao → Email bhejo
   "shopkaro.com/reset-password?token=abc123"

3. Priya link dabati hai → Naya password daalta hai

4. Server → Token verify karo → Password update karo (bcrypt hash) → Token delete karo

5. Done — Priya naye password se login kar sakti hai
```

---

## Token Kaise Banate Hain

```javascript
import crypto from 'crypto'

// Secure random token
const token = crypto.randomBytes(32).toString('hex')
// → "a3f9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0"

// Expiry time — 24 ghante baad
const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
```

---

## Database Mein Kya Store Hoga

```
EmailVerificationToken table:
id | userId | token        | expiresAt
---|--------|--------------|----------
1  | 1      | "a3f9b2..." | 2024-01-02 10:00:00

PasswordResetToken table:
id | userId | token        | expiresAt | used
---|--------|--------------|-----------|-----
1  | 1      | "x7k2m9..."  | 2024-01-02| false
```

Token use hone ke baad → **turant delete karo** (ya `used = true` mark karo). Ek token sirf ek baar kaam kare.

---

## ShopKaro Mein Email Kaise Bhejenge

Email bhejne ke liye ek service chahiye — seedha server se nahi bhej sakte (spam filters block kar dete hain).

Popular options:
- **Resend** — developer-friendly, free tier accha hai
- **Nodemailer + Gmail** — simple, free, limits hain
- **SendGrid** — production ke liye popular

ShopKaro v1 mein → **Resend** ya **Nodemailer** — dono simple hain.

```javascript
// Resend se email bhejno
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'ShopKaro <noreply@shopkaro.com>',
  to: user.email,
  subject: 'Email Verify Karo',
  html: `<a href="shopkaro.com/verify?token=${token}">Verify karo</a>`
})
```

---

## Important Security Points

**Token strong hona chahiye** — `crypto.randomBytes(32)` — guess karna impossible

**Expiry zaroori hai** — 24 ghante baad link kaam na kare

**Token ek baar use ho** — use ke baad delete karo

**Rate limiting** — ek email pe baar baar reset request na ho sake (baad mein seekhna)

---

## Summary

| | |
|--|--|
| **Email verification** | Signup pe token → email → verify → account activate |
| **Password reset** | Token → email → new password → token delete |
| **Token kaise** | crypto.randomBytes — secure random string |
| **Email service** | Resend ya Nodemailer |

---

## Agla Doc

`09-auth-libraries.md` — Humne sab kuch khud banaya — bcrypt, sessions, email. Lekin real projects mein **NextAuth, Clerk, Auth.js** jaisi libraries bhi use hoti hain. Kab khud banao, kab library lo — yeh decision samjhenge. Aur authentication umbrella ka yahi last doc hai.
