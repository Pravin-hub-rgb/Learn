# 01 — Sochna Seekho: Project Shuru Karne Se Pehle

> Pichle doc mein humne dekha ki ShopKaro ka poora picture kaisa dikhta hai.
> Ab yeh samjhते hain ki ek senior dev kisi bhi project ko **kaise sochta hai** — code likhne se pehle.

---

## Problem Kya Hai Abhi

Tum abhi kuch aisa karte ho:

```
Idea aaya → VS Code khola → Code likhne lage
```

Yeh natural hai — beginners yahi karte hain. Lekin problem yeh hai ki beech mein jaake **wall** aati hai.

- "Yeh data kahan store karun?"
- "Yeh login wala kaise karun?"
- "Cart ka data ek page se dusre pe kaise jaayega?"

Aur tab tum Google karte ho, kuch copy karte ho, aur aage badhte ho — lekin samajh nahi aata ki **kyun** woh kiya.

---

## Senior Dev Kya Karta Hai

Senior dev ka flow aisa hota hai:

```
Idea aaya → Sochta hai (bina code ke) → Phir likhta hai
```

Yeh "sochna" roughly 3 stages mein hota hai:

### Stage 1 — "Kya banana hai?" (Requirements)
### Stage 2 — "Kaise banana hai?" (Design Decisions)
### Stage 3 — "Phir banata hai" (Implementation)

Tum abhi seedha **Stage 3** pe jump karte ho. Stage 1 aur 2 skip ho jaati hai.

Chalo teeno ko ShopKaro ke saath samjhte hain.

---

## Stage 1 — "Kya banana hai?"

Yeh stage mein sirf **questions** pooche jaate hain — answers baad mein.

**ShopKaro ke liye questions:**

```
USERS:
- Kaun use karega? (Buyers? Sellers? Admin?)
- Kya koi bhi dekh sakta hai products, ya login zaroori hai?
- Kya ek user seller bhi ho sakta hai buyer bhi?

FEATURES:
- Kya kya karna chahiye user ko?
  - Products browse karna ✓
  - Cart mein add karna ✓
  - Order place karna ✓
  - Payment karna ✓
  - Order track karna ✓
  - Review dena? (maybe later)
  - Wishlist? (maybe later)

MUST HAVE vs NICE TO HAVE:
- Must: Login, Products, Cart, Order, Payment
- Nice: Reviews, Wishlist, Seller Dashboard
```

Yeh list banane ka fayda? — Tum **scope** decide karte ho. Warna hota yeh hai ki project kabhi khatam nahi hota kyunki naye features add karte rehte ho.

---

## Stage 2 — "Kaise banana hai?"

Ab har feature ke liye **decisions** lete hain.

Yeh decisions hi hain jo ek senior dev ko beginner se alag karte hain. Decisions mein options hote hain — aur har option ke trade-offs hote hain.

### Decision 1 — Authentication kaise karein?

**Options:**
- Khud banao (email + password + bcrypt + sessions) — ShopKaro mein yahi karenge
- Clerk use karo — ready-made solution, 10 minute setup
- NextAuth use karo — popular library, flexible

**Kab kya use karein:**
- Sirf email/password chahiye + seekhna chahte ho andar se → Khud banao
- Jaldi launch karna hai, Google/GitHub login bhi chahiye → Clerk
- Custom logic chahiye + thoda control → NextAuth

ShopKaro mein hum **khud banayenge** — kyunki seekhna maksad hai.

Aage cover hoga: Doc 02-09

---

### Decision 2 — Database kaunsa?

**Options:**
- PostgreSQL — rows aur columns, structured data
- MongoDB — flexible, JSON jaisa

**Kab kya:**
- Data ka structure fixed hai (User, Product, Order) → PostgreSQL
- Data ka structure flexible hai, schema baar baar badle → MongoDB

ShopKaro mein data structured hai — **PostgreSQL**.

Aage cover hoga: Doc 19-22

---

### Decision 3 — State kahan rakhein?

"State" matlab app ki yaadaasht — jaise cart mein kya hai abhi.

**Options:**
- React `useState` — sirf ek component ke liye
- React Context — poori app ke liye, simple cases
- Zustand — poori app ke liye, complex cases
- Server se har baar fetch karo — kabhi kabhi yahi sahi hota hai

**Kab kya:**
- Cart data (sirf browser mein chahiye, fast update) → Zustand
- User ka login status (poori app mein chahiye) → Context ya Zustand
- Product list (server se aati hai) → React Query (server state)

Aage cover hoga: Doc 27-31

---

### Decision 4 — Rendering strategy kya ho?

Matlab — page server pe banega ya browser mein?

**Options:**
- SSR — server pe banega, fresh data
- CSR — browser mein banega, fast interactions
- SSG — pehle se bana hua, fastest

**ShopKaro mein:**
- Homepage → SSG (same for everyone)
- Product page → SSR (stock real-time)
- Cart → CSR (sirf user ka data)

Aage cover hoga: Doc 14-18

---

## Stage 3 — "Phir banata hai"

Jab Stage 1 aur 2 clear ho — tab VS Code kholo.

Ab tum jab bhi kuch likhte ho, tumhe pata hota hai:
- Yeh kis umbrella ka part hai
- Yeh decision kyun liya
- Aur kya alternatives the

---

## ShopKaro Ka Rough Plan (Text Mein)

Yeh woh document hai jo ek senior dev project shuru karne se pehle banata hai — koi fancy tool nahi, sirf text mein:

```
PROJECT: ShopKaro

USERS:
- Buyer (register kar sakta hai, products kharid sakta hai)
- Admin (products add kar sakta hai) — baad mein

CORE FEATURES (v1):
- Signup / Login / Logout
- Product listing + detail page
- Cart (add, remove, update quantity)
- Checkout + Payment (Razorpay)
- Order history

TECH DECISIONS:
- Framework: Next.js (App Router)
- Database: PostgreSQL + Prisma
- Auth: Khud banayenge (bcrypt + sessions)
- State: Zustand (cart), React Query (server data)
- Payments: Razorpay
- Deploy: Vercel

RENDERING:
- Homepage: SSG
- /products: SSR
- /product/[id]: SSR
- /cart: CSR
- /orders: SSR (with auth)

FOLDER STRUCTURE (rough):
/app
  /api          → Backend API routes
  /(auth)       → Login, Signup pages
  /products     → Product listing + detail
  /cart         → Cart page
  /orders       → Order history
/components     → Reusable UI components
/lib            → Utility functions, db connection
/prisma         → Database schema
```

Yeh likhne mein 20-30 minute lagte hain — lekin baad mein **ghanton ki confusion** bachti hai.

---

## Ek Cheez Yaad Rakho

> Tum jab bhi koi decision lete ho — note karo kyun liya.
> "Zustand use kiya kyunki cart data poori app mein chahiye tha" — yeh ek line kaafi hai.
> Yahi hai senior dev ki thinking.

---

## Agla Doc

`02-auth-what-is-it.md` — Authentication umbrella kya hai. Login, Signup, Sessions, JWT, OAuth — yeh sab ek hi umbrella ke andar hain. Pehle poora umbrella dekh lo, phir andar jaayenge.
