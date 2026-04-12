# 40 — Images: Sabse Easy Performance Win

> Pichle doc mein Performance umbrella overview hua.
> Ab **Image Optimization** — sabse quick aur high impact improvement.

---

## Images Itni Slow Kyun Hoti Hain

```
Original product photo (camera se): 3MB PNG
Priya mobile pe dekh rahi hai 300x300px mein
Woh 3MB download karti hai sirf 300px image ke liye → Waste!
```

Fix:
- Sahi size ka image bhejo (300px ke liye 300px image)
- WebP format use karo (PNG/JPG se ~30% chhota)
- Lazy load karo (sirf jo screen pe hai woh load karo)

---

## Next.js Image Component — Sab Automatic

Next.js ka `<Image>` component yeh sab automatically karta hai:

```jsx
import Image from 'next/image'

// ❌ Regular img tag — koi optimization nahi
<img src="/products/nike-shoes.jpg" alt="Nike Shoes" />

// ✓ Next.js Image — sab kuch optimize
<Image
  src="/products/nike-shoes.jpg"
  alt="Nike Shoes"
  width={300}
  height={300}
  // Automatically:
  // → WebP mein convert karta hai
  // → Sahi size ka image bhejta hai (mobile pe chhota, desktop pe bada)
  // → Lazy load karta hai (screen pe aane pe load)
  // → Placeholder dikhata hai load hone tak
/>
```

---

## ShopKaro Product Card Mein

```jsx
// /components/ProductCard.jsx
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div style={{ position: 'relative', height: '250px' }}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill                    // Parent div ko fill karo
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 33vw"
          // sizes → Browser ko batao kitne bade screen pe kitni badi image
          // Mobile: poori width, Desktop: ek tehai width
          priority={false}        // false = lazy load (default)
          // Homepage hero image ke liye priority={true} karo
        />
      </div>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
    </div>
  )
}
```

---

## External Images — next.config.js

Agar images kisi aur server pe hain (Cloudinary, S3):

```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',  // Cloudinary images allow karo
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',    // S3 images
      }
    ]
  }
}
```

---

## Hero Image — Priority Loading

Homepage ka hero banner — yeh **above the fold** hai (screen pe seedha dikhta hai). Lazy load mat karo:

```jsx
<Image
  src="/hero-banner.jpg"
  alt="ShopKaro Sale"
  width={1200}
  height={400}
  priority={true}  // Immediately load karo — lazy load nahi
/>
```

---

## Summary

| | |
|--|--|
| **Next Image** | Automatic WebP, resize, lazy load |
| **sizes prop** | Browser ko batao kitni badi image chahiye |
| **priority** | Hero images ke liye — immediately load |
| **External images** | next.config.js mein allow karo |

---

## Agla Doc

`41-performance-loading.md` — **Lazy Loading aur Skeleton Screens** — page load feel fast kaise karo bina actual speed badhaye.
