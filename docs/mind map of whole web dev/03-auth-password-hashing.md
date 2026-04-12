# 03 — Password Hashing: bcrypt Kya Hai

> Pichle doc mein humne Authentication umbrella dekha.
> Ab pehla andar wala concept — **Password Hashing**.
> Priya ka password database mein kaise store hoga?

---

## Problem — Password Plain Text Mein Store Karo Toh Kya Hoga?

Maan lo tumhara database hack ho gaya. Agar tumne passwords plain text mein store kiye hain:

```
email              | password
-------------------|----------
priya@gmail.com    | mypassword123
rahul@gmail.com    | iloveshopping
```

Ab hacker ke paas **sabke passwords hain.** Aur kyunki log ek hi password kaafi jagah use karte hain — hacker ne ek jagah se sab unlock kar liya.

Yeh real mein hota hai — bade bade companies ke saath bhi.

---

## Solution — Hashing

Hashing ek aisa process hai jo password ko ek **random-looking string** mein convert kar deta hai — jo **reverse nahi ho sakti.**

```
"mypassword123"  →  bcrypt  →  "$2b$10$xK9mN3pQ..."
```

Yeh `$2b$10$xK9mN3pQ...` wali string database mein store hoti hai — original password nahi.

**Key point:** Hashing **one-way** hai. Matlab:
- Password → Hash: Possible ✓
- Hash → Password: Possible nahi ✗

---

## Hashing vs Encryption — Fark

Yeh dono alag hain:

| | Hashing | Encryption |
|--|---------|------------|
| Direction | One-way (reverse nahi) | Two-way (decrypt ho sakta hai) |
| Use case | Passwords | Data jo baad mein padhna ho |
| Example | bcrypt | AES |

Passwords ke liye **hashing use karo** — encryption nahi. Kyunki agar tum decrypt kar sakte ho, toh hacker bhi kar sakta hai.

---

## bcrypt Kya Hai

bcrypt ek popular **password hashing algorithm** hai. Yeh specially passwords ke liye banaya gaya hai.

Kuch special cheezein bcrypt mein:

### 1. Salt
Bcrypt automatically ek random "salt" add karta hai — matlab same password do alag users ka bhi alag hash banega:

```
Priya:  "password123"  →  "$2b$10$abc..."
Rahul:  "password123"  →  "$2b$10$xyz..."
```

Dono ka same password hai, lekin hash alag hai. Isliye hacker "rainbow tables" use nahi kar sakta.

### 2. Cost Factor (Slowness)
bcrypt **intentionally slow** hai. Yeh bug nahi — feature hai.

```javascript
const saltRounds = 10  // Cost factor
```

`saltRounds = 10` matlab bcrypt 2^10 = 1024 baar process karega. Aaj ke computers pe yeh ~100ms lagta hai.

Tumhare liye 100ms okay hai. Lekin hacker jo **lakhs passwords** try kar raha hai — uske liye yeh impractical ho jaata hai.

---

## ShopKaro Mein bcrypt — Kaise Use Hoga

### Signup ke waqt — Password Hash Karo:

```javascript
import bcrypt from 'bcrypt'

// User ne form submit kiya
const { email, password } = req.body

// Hash karo — kabhi plain text store mat karo
const saltRounds = 10
const hashedPassword = await bcrypt.hash(password, saltRounds)

// Database mein save karo
await prisma.user.create({
  data: {
    email: email,
    password: hashedPassword  // original password nahi, hash store ho raha hai
  }
})
```

### Login ke waqt — Password Compare Karo:

```javascript
// User ne email + password diya
const { email, password } = req.body

// Database se user dhundo
const user = await prisma.user.findUnique({
  where: { email: email }
})

// Password compare karo
const isMatch = await bcrypt.compare(password, user.password)
// bcrypt.compare → plain text password ko hash se compare karta hai

if (isMatch) {
  // Login successful
} else {
  // Wrong password
}
```

`bcrypt.compare` magic karta hai — yeh plain text password ko **dobara hash karke** stored hash se compare karta hai. Tum kabhi hash se original password nahi nikaal sakte — yeh compare karta hai internally.

---

## Database Mein Kya Dikhega

```
id  | email              | password
----|--------------------|---------
1   | priya@gmail.com    | $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh9i
2   | rahul@gmail.com    | $2b$10$Ks3Vz7YhB4mR2pL9sJdTwuWQeXnNa5c8vFgH1iOzPtMqKjRlCbEdu
```

Agar yeh database hack bhi ho jaaye — hacker ko sirf hashes milenge. Original passwords nahi.

---

## Summary

| | |
|--|--|
| **bcrypt kya karta hai** | Password → irreversible hash |
| **Salt kyun** | Same password, alag hash |
| **Slow kyun** | Hackers ke liye impractical |
| **ShopKaro mein kab** | Signup pe hash, login pe compare |

---

## Agla Doc

`04-auth-sessions.md` — Theek hai, Priya login ho gayi. Ab server ko **har baar** kaise pata chalega ki yeh Priya hai? Har page pe dobara password nahi daalna — toh Sessions kaam aati hain.
