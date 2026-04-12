# ShopKaro — Poora Picture, Ek Baar

> Yeh doc ek trailer hai. Har cheez thodi thodi dikhegi — detail mein nahi jaayenge abhi.
> Aage ki har doc is trailer ke kisi ek scene ko zoom in karegi.
> Agar kuch samajh na aaye toh ghabrao mat — aage explain hoga sab.

---

## ShopKaro kya hai?

Hum ek **chhota e-commerce platform** bana rahe hain — jisme:
- User **signup/login** kar sakta hai
- **Products** dekh sakta hai, search kar sakta hai
- **Cart** mein add kar sakta hai
- **Order** place kar sakta hai
- **Payment** kar sakta hai
- Apne **orders track** kar sakta hai

Bas. Simple. Lekin is simple cheez ke peeche ek poora system hai — jo hum step by step samjhenge.

---

## Ek User Ka Safar — Browser Se Database Tak

Socho — Priya hai. Woh ShopKaro kholti hai apne phone mein.

```
Priya ka phone (Browser)
        ↓
   ShopKaro Website (Next.js — Frontend)
        ↓
   ShopKaro Server (Next.js — Backend / API)
        ↓
   Database (PostgreSQL)
```

Yeh hai poora system — 4 layers. Har layer ka ek kaam hai.

Chalo har layer ko ek baar dekh lete hain mota mota.

---

## Layer 1 — Browser (Priya ka Phone)

Priya jo kuch bhi dekhti hai — products, cart, buttons — woh sab **HTML, CSS, JavaScript** hai jo uske browser mein chal raha hai.

Yeh hissa **Frontend** kehlaata hai.

Next.js mein yeh **React components** hote hain — jaise `ProductCard.jsx`, `CartPage.jsx`, etc.

**Yahan hoti hain yeh cheezein:**
- Page kaisi dikhegi — UI
- User ne kya click kiya, kya type kiya — Events
- Cart mein kya hai abhi — State (yaadaasht)
- Kaunsa page server se fresh laana hai, kaunsa browser mein hi banana hai — Rendering Strategy

Aage cover hoga: Rendering (Doc 14-18), State Management (Doc 27-31)

---

## Layer 2 — Next.js Frontend (Jo Priya Dekhti Hai)

Jab Priya `shopkaro.com` kholti hai, uske browser mein pages load hote hain.

Yeh pages **3 tarah se ban sakte hain:**

| Page | Kaise banega | Kyun |
|------|-------------|------|
| Homepage | Pehle se bana hua (SSG) | Sab ke liye same hai |
| Product Detail | Server se fresh (SSR) | Stock real-time dikhana hai |
| Cart | Browser mein hi (CSR) | Sirf Priya ka data hai |

Yeh decision — **kaunsa page kaise banega** — ek important skill hai. Isko Rendering Strategy kehte hain.

Aage cover hoga: Doc 14-18

---

## Layer 3 — Next.js Backend (API Routes)

Jab Priya login karti hai ya order place karti hai — uska browser **ek request bhejta hai server ko.**

```
Browser → POST /api/auth/login → Server
Browser → GET /api/products → Server
Browser → POST /api/orders → Server
```

Yeh requests **API** kehlaati hain. Server in requests ko handle karta hai, database se baat karta hai, aur response bhejta hai.

Next.js mein yeh `/app/api/` folder mein hota hai.

**Yahan hoti hain yeh cheezein:**
- Login/Signup logic — Authentication
- Product, Order, Cart ka data — Business Logic
- Database se baat karna — Database calls
- Payment process karna — Payment Integration

Aage cover hoga: API Design (Doc 23-26), Authentication (Doc 02-09), Payments (Doc 36-38)

---

## Layer 4 — Database (PostgreSQL)

Sab kuch yahan **permanently store** hota hai.

Priya ka account? Database mein.
ShopKaro ke products? Database mein.
Priya ka order? Database mein.

Hum **PostgreSQL** use kar rahe hain — ek popular relational database.

Aur database se baat karne ke liye hum direct SQL nahi likhte — **Prisma** use karte hain. Prisma ek **ORM** hai — matlab ek tool jo JavaScript mein likhne deta hai aur woh SQL mein convert kar deta hai.

```javascript
// Yeh Prisma hai — JavaScript mein
const user = await prisma.user.create({
  data: { email: "priya@gmail.com", password: hashedPassword }
})

// Prisma yeh SQL run karta hai peeche
// INSERT INTO users (email, password) VALUES ('priya@gmail.com', '...')
```

Aage cover hoga: Database (Doc 19-22)

---

## Poora Flow Ek Baar — Priya Login Karti Hai

```
1. Priya apna email + password daalti hai → Browser

2. Browser bhejta hai →
   POST /api/auth/login
   { email: "priya@gmail.com", password: "12345" }

3. Server receive karta hai request →
   - Database mein Priya ko dhundhta hai
   - Password compare karta hai (bcrypt se)
   - Sahi hai toh → Session banata hai
   - Session ID → Cookie mein bhej deta hai browser ko

4. Browser save kar leta hai cookie →
   Ab har request ke saath yeh cookie jaati hai automatically

5. Priya dashboard dekhti hai →
   Browser cookie bhejta hai → Server check karta hai → "Haan yeh Priya hai" → Data bhejta hai
```

Yeh poora flow **Authentication** kehlaata hai. Aage isko bahut detail mein samjhenge.

Aage cover hoga: Doc 02-09

---

## Poora Flow Ek Baar — Priya Product Kharidti Hai

```
1. Priya "Buy Now" dabati hai

2. Browser →
   POST /api/orders
   { productId: "123", quantity: 1 }

3. Server →
   - Check karo Priya logged in hai? (Authentication)
   - Check karo product available hai? (Database)
   - Order create karo (Database)
   - Payment initiate karo (Razorpay)

4. Razorpay →
   - Payment page dikhao
   - Priya pay karti hai
   - Razorpay → Server ko batata hai "payment successful" (Webhook)

5. Server →
   - Order status update karo "paid"
   - Confirmation email bhejo Priya ko

6. Priya ko dikhta hai → "Order placed!"
```

Aage cover hoga: Payments (Doc 36-38)

---

## Umbrella Terms — Ek Quick Map

Yeh poori series inhi umbrellas ke around hai. Ek baar dekh lo — detail baad mein aayegi.

```
AUTHENTICATION       → Login, Signup, Sessions, JWT, OAuth, bcrypt
ARCHITECTURE         → Folder structure, MVC, BFF layer
RENDERING            → SSR, CSR, SSG — kaunsa page kaise banega
DATABASE             → PostgreSQL, Prisma, Data Models
API DESIGN           → REST, GraphQL, Endpoints
STATE MANAGEMENT     → Zustand, Context, React Query
CACHING              → localStorage, CDN, Server cache
PAYMENTS             → Razorpay, Stripe, Webhooks
PERFORMANCE          → Images, Lazy loading, Pagination
ACCESSIBILITY        → ARIA, Keyboard navigation
DEPLOYMENT           → Vercel, Environment Variables
```

Har umbrella ki apni docs hain. Aur har doc mein ShopKaro ka context rahega — taki kabhi na lage ki "yeh kahan se aaya."

---

## Yeh Series Kaise Padhni Hai

1. **Pehli baar** — poori series ek baar padhlo, implementation mat karo
2. **Doosri baar** — jab project banao, tab relevant doc kholo aur saath mein kaam karo
3. **Confuse ho toh** — wapas is `00-overview.md` pe aao — yahan sab ka context hai

---

## Agla Doc

`01-how-to-think.md` — Project shuru karne se pehle ek senior dev kya sochta hai? Kaise decisions leta hai? Woh mental model kya hai jo todo app aur production app mein fark karta hai.
