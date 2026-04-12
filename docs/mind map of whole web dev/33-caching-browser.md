# 33 — Browser Storage: localStorage, sessionStorage, IndexedDB

> Pichle doc mein Caching umbrella overview hua.
> Ab **Browser Storage** — teeno options, kab kya.

---

## localStorage

Browser mein **permanently** data save karo — tab band karo, browser band karo, computer restart karo — data wahan rahega.

```javascript
// Save karo
localStorage.setItem('theme', 'dark')
localStorage.setItem('language', 'hindi')

// Nikalo
const theme = localStorage.getItem('theme')  // "dark"

// Delete karo
localStorage.removeItem('theme')
```

**Objects ke liye JSON use karo:**
```javascript
// Save
localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Priya' }))

// Nikalo
const user = JSON.parse(localStorage.getItem('user'))
```

**Limitations:**
- Sirf strings store hoti hain (isliye JSON.stringify)
- ~5MB limit
- Sirf browser mein — server nahi dekh sakta (cookies alag hain)
- JavaScript se readable — sensitive data mat rakho

**ShopKaro mein kahan:** Zustand cart store yahan save hota hai (persist middleware se automatic).

---

## sessionStorage

localStorage jaisa — lekin **tab band hone pe delete** ho jaata hai.

```javascript
sessionStorage.setItem('checkoutStep', '2')
const step = sessionStorage.getItem('checkoutStep')
```

**ShopKaro mein kahan:** Checkout progress temporarily save karna — agar user accidentally back daba de toh wapas aa sake.

---

## localStorage vs sessionStorage

| | localStorage | sessionStorage |
|--|-------------|----------------|
| Kab delete hota hai | Manually | Tab close pe |
| Tabs ke beech | Shared | Each tab alag |
| Use case | Preferences, cart | Temp form data |

---

## IndexedDB

Browser mein **database** — bada data, complex queries.

```javascript
// Complex — directly use nahi karte usually
// Libraries use karte hain: idb, Dexie.js
import { openDB } from 'idb'

const db = await openDB('shopkaro', 1, {
  upgrade(db) {
    db.createObjectStore('products', { keyPath: 'id' })
  }
})

await db.put('products', { id: 1, name: 'Nike Shoes', price: 2999 })
const product = await db.get('products', 1)
```

**ShopKaro mein kahan:** V1 mein nahi. Agar offline support chahiye toh — product catalog IndexedDB mein save karo.

---

## Kab Kya Use Karein

| Data | Storage |
|------|---------|
| User preferences (theme, language) | localStorage |
| Cart data | localStorage (Zustand persist) |
| Checkout step | sessionStorage |
| Auth session | Cookie (server set karta hai — not localStorage) |
| Large offline data | IndexedDB |

---

## Security Warning

```javascript
// KABHI MAT KARO — Auth tokens localStorage mein nahi
localStorage.setItem('authToken', 'abc123')  // ❌ XSS attack se steal ho sakta hai

// SAHI — Session cookie (HttpOnly) — JavaScript access nahi kar sakti
// Yeh server set karta hai automatically
```

---

## Agla Doc

`34-caching-cdn.md` — **CDN** kya hota hai — ShopKaro ki images aur static files duniya mein fast kaise pahunchaayein.
