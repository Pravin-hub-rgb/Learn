# 14 — Rendering: Umbrella Kya Hai

> Architecture umbrella complete hua — MVC, Folders, BFF.
> Ab teesra bada umbrella — **Rendering**.
> SSR, CSR, SSG — yeh confusion yahan khatam hogi.

---

## Rendering Kya Hota Hai

**Rendering** matlab — HTML page **kahan** aur **kab** banega.

Jab Priya `shopkaro.com/products` kholti hai — ek HTML page uske browser mein dikhta hai. Yeh HTML:
- Server pe bana? Ya browser mein bana?
- Request ke time bana? Ya pehle se bana tha?

Yahi rendering strategy decide karti hai.

---

## Teen Strategies — Ek Line Mein

| Strategy | HTML Kahan Banta Hai | Kab Banta Hai |
|----------|---------------------|---------------|
| **SSG** — Static Site Generation | Server pe | Build time pe — deploy se pehle |
| **SSR** — Server Side Rendering | Server pe | Har request pe — real-time |
| **CSR** — Client Side Rendering | Browser mein | Browser mein JavaScript run hone ke baad |

---

## Simple Comparison — Teen Scenarios

### SSG — Pehle Se Bana Hua

```
Build time (deploy karte waqt):
Server → HTML banao → File save karo → "about.html", "homepage.html"

Jab Priya request karti hai:
Priya → Server → "homepage.html" file direct do → Done (bahut fast)
```

Sab ke liye same HTML — real-time data nahi.

---

### SSR — Request Pe Bano

```
Jab Priya /products/123 kholti hai:
Priya → Server → Database se product lo → HTML banao → Bhejo

Har request pe fresh HTML — real-time data milta hai
```

---

### CSR — Browser Mein Bano

```
Priya /cart kholti hai:
Priya → Server → Khali HTML bhejo + JavaScript bhejo
Browser JavaScript run karta hai → API call kaarta hai → Data aata hai → Page dikhta hai
```

Pehle blank page dikhta hai — phir data load hota hai.

---

## Rendering Umbrella Ke Andar Kya Kya

```
RENDERING
│
├── SSG (Static Site Generation)   → Doc 17
├── SSR (Server Side Rendering)    → Doc 16
├── CSR (Client Side Rendering)    → Doc 15
└── ShopKaro mein kaunsa kahan     → Doc 18
```

---

## ShopKaro Ka Quick Preview

| Page | Strategy | Kyun |
|------|----------|------|
| Homepage | SSG | Sab ke liye same, fast load |
| /products | SSR | Products real-time chahiye |
| /products/[id] | SSR | Stock real-time dikhana hai |
| /cart | CSR | Sirf Priya ka data, fast interactions |
| /orders | SSR | Auth required, fresh data |

Yeh decisions detail mein Doc 18 mein cover honge.

---

## Agla Doc

`15-rendering-csr.md` — Pehle **CSR** — Client Side Rendering. Tum abhi React mein jo karte ho — useState, useEffect se data fetch karna — yahi CSR hai. Familiar ground se shuru karte hain.
