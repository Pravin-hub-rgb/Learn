# 05 — JWT: Sessions Ka Dusra Tarika

> Pichle doc mein humne Sessions dekhe — server pe stored, cookie mein ID.
> Ab ek aur approach — **JWT (JSON Web Token).**
> Yeh concept kaafi jagah milega — samajhna zaroori hai.

---

## Sessions Mein Ek Problem

Sessions mein server ko har request pe **database check** karna padta hai:

```
Priya request karti hai → Server: sessionId database mein dhundo → Priya hai → Response
```

Agar lakhs users hain aur har baar database hit ho — yeh slow ho sakta hai.

JWT is problem ko alag tarike se solve karta hai.

---

## JWT Kya Hai

JWT ek **self-contained token** hai. Matlab — token ke andar hi saari information hoti hai. Server ko database check nahi karna.

```
SESSION approach:
Token → Server → Database check → "Haan Priya hai" → Response

JWT approach:
Token → Server → Token verify karo (no database) → "Haan Priya hai" → Response
```

---

## JWT Dikhta Kaise Hai

JWT teen parts ka hota hai, dots se separated:

```
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoicHJpeWFAZ21haWwuY29tIn0.xK9mN3pQ...
     HEADER              PAYLOAD                                    SIGNATURE
```

### Part 1 — Header
Algorithm batata hai jisse token sign kiya gaya:
```json
{ "alg": "HS256" }
```

### Part 2 — Payload
Actual data — yeh **public hota hai**, encrypted nahi:
```json
{
  "userId": 1,
  "email": "priya@gmail.com",
  "exp": 1735689600  // Expiry time
}
```

### Part 3 — Signature
Yeh verify karta hai ki token tamper nahi hua:
```
HMACSHA256(header + payload, SECRET_KEY)
```

---

## JWT Kaise Kaam Karta Hai

```
LOGIN:
1. Priya login karti hai → Sahi credentials
2. Server → JWT banata hai (userId, email daalta hai andar)
3. JWT → Secret key se sign karta hai
4. JWT → Priya ke browser ko bhejta hai (cookie ya localStorage)

PROTECTED REQUEST:
1. Priya request karti hai → JWT saath mein bhejti hai
2. Server → JWT ki signature verify karta hai (secret key se)
3. Valid hai → Payload se userId nikalta hai → Response bhejta hai
4. Database check? NAHI — sab token mein hai
```

---

## JWT Ka Sabse Important Point — Signature

JWT ka payload **publicly readable** hai — koi bhi decode kar sakta hai:

```javascript
// Yeh koi bhi kar sakta hai — no key needed
atob("eyJ1c2VySWQiOjF9")  // → { userId: 1 }
```

Lekin **modify nahi kar sakta** — kyunki signature toot jaayegi:

```
Original: { userId: 1 }  → Signature: "abc123"
Tampered: { userId: 99 } → Signature: "abc123"  ← MISMATCH → Server reject karega
```

Isliye JWT mein **sensitive data mat daalo** — password, credit card — kyunki payload readable hai. Sirf non-sensitive info daalo jaise userId, email.

---

## Sessions vs JWT — Kab Kaunsa?

| | Sessions | JWT |
|--|---------|-----|
| Storage | Server (database) | Client (browser) |
| Database hit per request | Haan | Nahi |
| Logout karna | Easy — database se delete | Hard — token expire hone tak valid |
| Scalability | Complex (multiple servers) | Easy |
| Complexity | Simple | Thoda complex |

### ShopKaro mein kya use karein?

**Sessions** — kyunki:
- Simple hai, beginner-friendly
- Logout properly kaam karta hai
- ShopKaro ek server pe chalega abhi

JWT kaafi popular hai — aur tum future projects mein zaroor miloge isse. Isliye concept samajhna zaroori tha.

### JWT kab sahi hota hai?
- Multiple servers hain (microservices)
- Mobile app + web app dono same API use kar rahe hain
- Third-party services ko bhi access dena hai

---

## ShopKaro Mein JWT — Example (Agar Use Karo)

```javascript
import jwt from 'jsonwebtoken'

// Login pe token banao
const token = jwt.sign(
  { userId: user.id, email: user.email },  // Payload
  process.env.JWT_SECRET,                   // Secret key
  { expiresIn: '7d' }                       // 7 din mein expire
)

// Token bhejo cookie mein
// (cookie ke baare mein agla doc)
```

```javascript
// Protected route pe verify karo
const token = req.cookies.token
const decoded = jwt.verify(token, process.env.JWT_SECRET)
// decoded = { userId: 1, email: "priya@gmail.com" }
```

---

## Summary

| | |
|--|--|
| **JWT kya hai** | Self-contained token jisme user info hoti hai |
| **Sessions se fark** | Server database check nahi karta |
| **Payload** | Public — readable, lekin tamper-proof |
| **ShopKaro mein** | Sessions use karenge — JWT concept ke liye jaano |

---

## Agla Doc

`06-auth-cookies.md` — Sessions ho ya JWT — dono ko browser tak pohnchaane ke liye **Cookies** chahiye. Cookie exactly kya hoti hai, kaise set hoti hai, aur security settings kya honi chahiye — yeh sab samjhenge.
