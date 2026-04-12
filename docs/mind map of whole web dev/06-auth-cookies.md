# 06 — Cookies: Browser Aur Server Ki Baat

> Pichle doc mein JWT dekha — sessions ka alternative.
> Ab yeh samjhte hain ki Session ID ya JWT **browser tak pohnchaata kaise hai** — **Cookies**.

---

## Cookie Kya Hoti Hai

Cookie browser mein store hone wala ek **chhota data piece** hai.

Sabse important baat — cookie **automatically** har request ke saath server ko jaati hai. Tumhe manually kuch nahi karna.

```
Server → Cookie set karo → Browser save kar leta hai
Browser → Har request mein cookie automatically bhejta hai → Server
```

---

## Cookie Kaise Set Hoti Hai

Server response mein ek header bhejta hai:

```
Set-Cookie: sessionId=a3f9b2c1; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

Browser yeh dekh ke automatically cookie save kar leta hai.

---

## Cookie Ki Important Settings

Yeh settings security ke liye bahut zaroori hain:

### HttpOnly
```
Set-Cookie: sessionId=abc; HttpOnly
```

`HttpOnly` matlab — **JavaScript cookie nahi padh sakti.**

```javascript
// HttpOnly cookie hai toh yeh kaam nahi karega
document.cookie  // → "" (empty)
```

Kyun zaroori? — Agar kisi ne malicious JavaScript inject ki (XSS attack), toh woh cookie steal nahi kar sakta.

**ShopKaro mein session cookie → hamesha HttpOnly.**

---

### Secure
```
Set-Cookie: sessionId=abc; Secure
```

`Secure` matlab — **sirf HTTPS pe bhejo cookie.** HTTP pe nahi.

Development mein HTTP use hota hai — isliye sirf production mein `Secure` lagao.

---

### SameSite
```
Set-Cookie: sessionId=abc; SameSite=Strict
```

`SameSite` CSRF attacks se bachata hai (jab koi aur website tumhare naam pe request karti hai).

| Value | Matlab |
|-------|--------|
| `Strict` | Sirf same site ki requests mein cookie jaaye |
| `Lax` | Same site + top-level navigation (links) |
| `None` | Sab jagah — `Secure` bhi zaroori |

**ShopKaro mein → `SameSite=Lax`** (common default, works well)

---

### Max-Age / Expires
```
Set-Cookie: sessionId=abc; Max-Age=604800
```

`Max-Age` seconds mein — kitne time baad cookie expire ho.

`604800` = 7 din (7 × 24 × 60 × 60)

Agar yeh set nahi kiya → **Session cookie** — browser band hone pe delete ho jaati hai.

---

## ShopKaro Mein Cookie Setup

`iron-session` yeh automatically handle karta hai — config ek baar karni hai:

```javascript
// /lib/session.js

export const sessionOptions = {
  password: process.env.SESSION_SECRET,  // Strong secret — env variable mein
  cookieName: "shopkaro-session",
  cookieOptions: {
    httpOnly: true,           // JavaScript se nahi padh sakti
    secure: process.env.NODE_ENV === "production",  // Production pe HTTPS only
    sameSite: "lax",          // CSRF protection
    maxAge: 60 * 60 * 24 * 7  // 7 din
  }
}
```

Bas — ek baar yeh set karo, `iron-session` baaki sab handle karta hai.

---

## Cookie vs localStorage — Kab Kya?

Yeh confusion bohot hoti hai — clear kar lo:

| | Cookie | localStorage |
|--|--------|-------------|
| Automatic request ke saath | Haan ✓ | Nahi — manually add karna |
| JavaScript se readable | Depends (HttpOnly) | Haan |
| Server set kar sakta hai | Haan | Nahi |
| Expiry | Set kar sakte ho | Manual clear |
| Security | Better (HttpOnly) | XSS attack vulnerable |

**Session/Auth ke liye → hamesha Cookie** (HttpOnly wali)

**Non-sensitive data ke liye** (theme preference, language) → localStorage theek hai

---

## Ek Cheez Dhyan Mein Rakho

Cookies ke baare mein bohot confusion hoti hai kyunki:
- Marketing cookies alag hoti hain (tracking, ads)
- Auth cookies alag hoti hain

Hum sirf **auth cookies** ki baat kar rahe hain — jo session ya JWT store karti hain.

---

## Summary

| | |
|--|--|
| **Cookie kya hai** | Browser stored data, auto-send with requests |
| **HttpOnly** | JavaScript se protect — hamesha on karo auth ke liye |
| **Secure** | HTTPS only — production mein on karo |
| **SameSite** | CSRF protection |
| **ShopKaro mein** | iron-session automatically handle karta hai |

---

## Agla Doc

`07-auth-oauth.md` — ShopKaro v1 mein nahi hai, lekin concept zaroori hai — **OAuth**. "Google se Login karo" kaise kaam karta hai? Tumhare app ko Google ka password kaise pata chalता hai? Yeh samjhenge.
