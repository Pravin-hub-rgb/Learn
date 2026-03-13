# Doc 09.1 — Toggle Ke Liye Kya Chahiye? 🔄
### (PUT request ka concept)

---

## Pehle Yaad Karte Hain

Doc 08 complete hua — todos delete ho sakte hain.

**Ab ek cheez baaki hai:**

Todo complete hua? Checkbox click karo — `done: true` ho jaaye. Dobara click karo — `done: false` ho jaaye.

---

## Problem — Kaunsa HTTP Method?

Abhi tak humne use kiye:
- `GET` — data fetch karna
- `POST` — naya todo banana
- `DELETE` — todo hatana

Update ke liye? **`PUT`** use karte hain.

```
PUT /api/todos/abc2   + body: { done: true }
← "abc2 wale todo ka done field update kar do"
```

---

## Kahan Likhein?

Delete ke liye `[id]/route.ts` banaya tha — kyunki ek specific todo pe kaam karna tha, ID chahiye thi URL mein.

Toggle bhi ek specific todo pe kaam karta hai — same ID chahiye.

Toh **same file** mein add karenge:

```
app/api/todos/[id]/route.ts — abhi sirf DELETE hai
                             — PUT bhi yahan aayega
```

Next.js same file mein alag alag HTTP methods ke liye alag functions rakhne deta hai.

**Abhi kuch nahi karna** — file waise hi rehne do. Backend 9.2 mein likhenge.

---

## Summary — Doc 09.1 Mein Kya Kiya

✅ **Toggle = PUT method** — update operation

✅ **Same `[id]/route.ts`** — kyunki specific todo pe kaam hai, ID chahiye

---

## Agla Step — Doc 09.2

**Doc 09.2: Toggle — Frontend Se Shuru Karenge**

8 ki tarah — pehle frontend mein checkbox banayenge, test karenge — phir backend banana shuru karenge. 🔄
