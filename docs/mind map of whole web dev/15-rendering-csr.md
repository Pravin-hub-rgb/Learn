# 15 — CSR: Client Side Rendering

> Pichle doc mein Rendering umbrella ka overview hua.
> Ab pehli strategy — **CSR**. Yeh tum pehle se jaante ho — React mein yahi karte the.

---

## CSR Kya Hai

**Client Side Rendering** — HTML browser mein JavaScript ke through banta hai.

```
1. Priya /cart kholti hai
2. Server → Bhejta hai: khali HTML + JavaScript bundle
3. Browser JavaScript run karta hai
4. JavaScript → API call karta hai → Cart data aata hai
5. JavaScript → HTML banata hai → Page dikhta hai
```

Pehle blank/loading screen → phir content.

---

## Tum Yeh Pehle Se Jaante Ho

React mein tum yeh karte ho:

```jsx
'use client'  // Next.js mein yeh likhna padta hai CSR ke liye

import { useState, useEffect } from 'react'

function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Yeh CSR hai — browser mein data fetch ho raha hai
    fetch('/api/cart')
      .then(r => r.json())
      .then(data => {
        setCartItems(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {cartItems.map(item => <CartItem key={item.id} item={item} />)}
    </div>
  )
}
```

Yeh pure CSR hai — data browser mein fetch ho raha hai.

---

## CSR Ke Fayde

**Fast interactions** — page load hone ke baad sab instant lagta hai

**User-specific data** — har user ka alag data, server pe cache nahi hota

**Real-time updates** — cart mein item add kiya → turant update, page refresh nahi

---

## CSR Ki Problems

**Pehle blank screen** — JavaScript load hone tak kuch nahi dikhta

**SEO problem** — Google crawler JavaScript run karta hai lekin unreliable — content index nahi hota properly

**Slow first load** — sabse pehle JavaScript download hota hai, phir API call, phir render

---

## ShopKaro Mein CSR Kahan Use Karein

```
/cart → CSR ✓
  Kyun: Sirf logged-in user ka data, fast add/remove chahiye,
        SEO ki zaroorat nahi (private page)

/checkout → CSR ✓
  Kyun: User interaction heavy, real-time price updates, private page

Counter, quantity buttons → CSR ✓
  Kyun: Instant feedback chahiye, UI interactions
```

---

## CSR Kahan Use MAT Karo

```
/products → Mat karo
  Kyun: SEO chahiye, Google ko products index karne hain

/products/[id] → Mat karo
  Kyun: SEO important hai — log Google pe "Nike shoes" search karte hain

Homepage → Mat karo
  Kyun: Fast load zaroori hai, SEO important
```

---

## Next.js Mein 'use client'

Next.js by default **server components** use karta hai. CSR ke liye `'use client'` likhna padta hai file ke top pe:

```jsx
'use client'  // Yeh file browser mein run hogi

// Ab useState, useEffect, onClick sab kaam karenge
```

Bina `'use client'` ke — `useState` ya `useEffect` use karo → Error aayega.

---

## Summary

| | |
|--|--|
| **CSR kya hai** | Browser mein JavaScript se HTML banana |
| **Kab use karein** | Private pages, heavy interactions, real-time updates |
| **Kab mat karo** | Public pages, SEO important ho |
| **Next.js mein** | `'use client'` directive |

---

## Agla Doc

`16-rendering-ssr.md` — Ab **SSR** — Server Side Rendering. Request aane pe server fresh HTML banata hai. ShopKaro ke product pages yahi use karenge — kyun, kaise — samjhenge.
