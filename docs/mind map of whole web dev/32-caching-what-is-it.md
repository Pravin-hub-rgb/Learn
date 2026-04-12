# 32 — Caching: Umbrella Kya Hai

> State Management complete hua.
> Ab saatwa umbrella — **Caching**.
> Same data baar baar fetch karna slow hai — cache karo.

---

## Caching Kya Hai

**Caching** = data ek jagah save kar lo, taaki baar baar server se maangna na pade.

Priya ShopKaro products page kholti hai:
- Bina cache: Har baar database se products fetch → Slow
- Cache ke saath: Pehli baar fetch, save karo → Agli baar saved data do → Fast

---

## Caching Umbrella Ke Andar Kya Kya

```
CACHING
│
├── Browser Storage
│   ├── localStorage    → Permanent browser storage
│   ├── sessionStorage  → Tab close hone tak
│   └── IndexedDB       → Large data storage
│
├── CDN (Content Delivery Network)
│   → Static files world mein distribute karna
│
└── Server-side Cache
    → Database results save karna (Redis etc.)
```

---

## Kahan Kya Cache Hota Hai — ShopKaro

```
USER KA BROWSER:
  Cart data (Zustand persist) → localStorage
  Auth token/session → Cookie (server set karta hai)
  Product images → Browser automatically cache karta hai

CDN:
  ShopKaro ki images (product photos)
  Static JS, CSS files

SERVER:
  Popular product queries ka result
  Homepage data
```

---

## Agla Doc

`33-caching-browser.md` — localStorage, sessionStorage, IndexedDB — teeno kab use karte hain, fark kya hai, ShopKaro mein kahan use hoga.
