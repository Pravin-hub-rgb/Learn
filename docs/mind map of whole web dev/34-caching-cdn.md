# 34 — CDN: Static Files Ko Fast Deliver Karna

> Pichle doc mein browser storage samjha.
> Ab **CDN** — Content Delivery Network.

---

## Problem — Sab Requests Ek Server Pe

ShopKaro ka server Mumbai mein hai.

Priya Mumbai mein hai → Request → Mumbai server → Fast ✓
Rahul Delhi mein hai → Request → Mumbai server → Thoda slow
Anita New York mein hai → Request → Mumbai server → Bahut slow ✗

Images, JS files, CSS — yeh sab har user ko bhejne padte hain. Duniya bhar ke users ke liye slow ho sakta hai.

---

## Solution — CDN

**CDN (Content Delivery Network)** — duniya mein kai jagah servers hote hain. Static files sab jagah copy hoti hain. User apne **nearest server** se files paata hai.

```
Bina CDN:
Anita (New York) → Mumbai server → Image (slow)

CDN ke saath:
Anita (New York) → New York CDN server → Image (fast)
```

---

## CDN Kya Cache Karta Hai

**Static files** — jo baar baar change nahi hoti:
- Product images
- JavaScript bundles
- CSS files
- Fonts

**Dynamic data** (API responses) — CDN usually nahi karta. Yeh server se aata hai.

---

## ShopKaro Mein CDN — Automatic

Good news — **Vercel pe deploy karo toh CDN automatic hai.**

Vercel globally distributed hai — Next.js ki static files automatically CDN se serve hoti hain. Tumhe kuch extra nahi karna.

Product images ke liye — **Cloudinary ya AWS S3 + CloudFront** use kar sakte ho:

```jsx
// Next.js Image component — automatic optimization + CDN
import Image from 'next/image'

function ProductCard({ product }) {
  return (
    <Image
      src={product.imageUrl}
      alt={product.name}
      width={300}
      height={300}
      // Next.js automatically:
      // - WebP format mein convert karta hai
      // - Resize karta hai device ke hisaab se
      // - Lazy load karta hai
      // - CDN se serve karta hai (Vercel pe)
    />
  )
}
```

---

## CDN vs Browser Cache — Fark

| | CDN | Browser Cache |
|--|-----|---------------|
| Kahan | Server ke paas (network level) | User ke browser mein |
| Kiske liye | Sab users | Sirf us user ke liye |
| Control | Tum control karte ho | Browser control karta hai |

---

## Summary

| | |
|--|--|
| **CDN kya hai** | Files globally distribute karna — nearest server se serve |
| **ShopKaro mein** | Vercel pe automatic, Images ke liye Next/Image |
| **Kya cache hota hai** | Images, JS, CSS — static files |

---

## Agla Doc

`35-caching-server.md` — **Server-side caching** — database results save karna taaki baar baar DB hit na ho. Redis concept aur Next.js mein built-in caching.
