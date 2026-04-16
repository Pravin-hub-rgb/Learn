# 🚀 Project 4 — ShopKaro: E-Commerce Store
### Products, Cart, Checkout, Payments — Full Flow

---

## 💬 The Brief — Client Ne Kya Kaha

> *"Ek chhota online store banana hai — handmade jewellery sell karna hai.
> Products display honge, cart mein add karo, checkout karo, payment karo.
> Admin ko products add/remove karne ka panel chahiye.
> SEO important hai — products Google pe dikhne chahiye."*

Classic e-commerce. Ye complex hai kyunki **multiple layers** hain — public product pages (SEO), private cart (user-specific), payment integration, aur admin panel. Architecture mein careful mixing chahiye.

---

## 📋 Step 1 — PRD Lite

```
PROJECT NAME  : ShopKaro
TYPE          : E-Commerce Web Application
ONE LINE      : "Ye ek online store hai jahan handmade jewellery
                 browse, cart mein add, aur payment ke saath purchase ho sakti hai."

TARGET USER:
  Primary   → Customer (buyer)
              Non-technical, mobile se mostly shop karega
  Secondary → Admin (shop owner)
              Products manage karta hai, orders dekhta hai

CORE FEATURES (MVP):
  [ ] Product listing page (SEO optimized, filterable)
  [ ] Product detail page (SEO optimized)
  [ ] Cart (add/remove/update quantity)
  [ ] Checkout flow
  [ ] Payment integration (Razorpay / Stripe)
  [ ] Order confirmation page + email
  [ ] Admin: Product CRUD (add, edit, delete, image upload)
  [ ] Admin: Order list + status update

STRETCH (V2):
  [ ] User accounts (order history)
  [ ] Wishlist
  [ ] Product reviews
  [ ] Discount codes / coupons
  [ ] Inventory alerts (low stock)

OUT OF SCOPE:
  ❌ Multiple vendors / marketplace
  ❌ Subscription products
  ❌ Mobile app
  ❌ Live chat support
```

---

## 🏗️ Step 2 — Architecture Decisions

---

**Rendering Strategy → MIXED (Most interesting decision here)**

```
Ye project rendering strategy ka best example hai — alag pages, alag strategies.

PRODUCT LISTING PAGE (/products):
→ ISR (revalidate: 3600 — 1 hour)
→ Products daily update hote hain (new items, out of stock)
→ SEO critical — Google pe index hona chahiye
→ CDN se serve = fast for all users
→ SSG nahi kyunki daily updates hain
→ SSR nahi kyunki personalized nahi hai yeh page

PRODUCT DETAIL PAGE (/products/[slug]):
→ ISR (revalidate: 1800 — 30 minutes)
→ Individual product page Google pe rank karega
→ "Handmade Silver Ring" Google pe dikhni chahiye
→ Stock status thodi frequently change ho sakti hai → ISR 30 min

CART PAGE (/cart):
→ CSR + Client-side state (Zustand)
→ Cart completely user-specific + session-based
→ SEO nahi chahiye cart page ke liye
→ Real-time feel chahiye — instant add/remove

CHECKOUT PAGE (/checkout):
→ SSR — sensitive page, user logged in state verify karna hai
→ Dynamic pricing (apply coupons V2 mein)

ADMIN DASHBOARD (/admin):
→ CSR — SEO nahi chahiye, highly interactive
→ Behind auth wall — Google ne index nahi karna chahiye

ORDER CONFIRMATION (/orders/[id]):
→ SSR — user-specific, real data
```

---

**Cart Architecture → Zustand + Redis Hybrid**

```
Ye interesting decision hai. Cart state kahan rakhen?

Option A: Sirf localStorage (client-side)
→ Problem: Page refresh pe data rehta hai, par login karo different device pe
  → cart gone! Bad UX.

Option B: Sirf Database (PostgreSQL)
→ Problem: Har add/remove pe API call → slow feel

Option C: Zustand (optimistic) + Database sync ← Best for logged-in users
→ User click karta hai "Add to Cart"
→ Zustand immediately update hota hai (optimistic — instant UI)
→ Background mein API call hoti hai database sync ke liye
→ Agar user different device pe aaye → server se cart load

Option D: Redis for guest cart
→ Guest user (not logged in) bhi cart use kar sakta hai
→ Redis mein session-based cart store karo (TTL: 7 days)
→ Login pe — Redis cart + DB cart merge karo

Final Decision:
→ Guest: Zustand (client only, no server sync)
→ Logged in: Zustand (UI state) + PostgreSQL sync
```

---

**Payment → Razorpay ✅ (India-first project)**

```
Razorpay vs Stripe:

Razorpay:
→ India ke liye designed — UPI, netbanking, cards, wallets
→ INR support native
→ KYC simple for Indian businesses
→ Well-documented Node.js SDK

Stripe:
→ International payments
→ Complex for Indian domestic use (extra setup)

Decision: Razorpay — client India mein sell karna chahta hai.

Payment Flow:
1. User "Place Order" click karta hai
2. Server: Order create karo DB mein (status: 'pending')
3. Server: Razorpay order create karo (amount, currency)
4. Client: Razorpay checkout modal open hota hai
5. User payment complete karta hai
6. Razorpay: Webhook bhejta hai server ko (payment.captured)
7. Server: Order status update → 'paid'
8. Server: Confirmation email bhejta hai (Resend)
9. Client: Order confirmation page dikhata hai

IMPORTANT: Webhook verification karo!
→ Razorpay webhook signature verify karo
→ Bina verification ke koi bhi fake payment event bhej sakta hai
```

---

**Image Storage → Cloudinary ✅**

```
Admin product images upload karega. Options:

Uploadthing:
→ Simple uploads, good for documents
→ Image transformations limited

Cloudinary:
→ Image CDN + transformations
→ Auto resize for thumbnails (product listing vs detail page mein alag size)
→ Auto WebP conversion (faster loading)
→ Lazy loading ke liye placeholder images generate karta hai
→ Free tier: 25GB storage enough for jewellery store

Decision: Cloudinary — e-commerce mein image optimization matter karta hai.

Usage:
→ Admin upload karta hai → Cloudinary pe store
→ Database mein sirf Cloudinary URL save hota hai
→ Product listing: thumbnail URL (400x400)
→ Product detail: full URL (800x800)
→ Cloudinary URL parameters se resize on-the-fly
```

---

**Admin Panel → Simple approach — same Next.js app**

```
Option A: Separate admin app (different repo/domain)
→ Overkill for small store

Option B: /admin route group in same Next.js app ✅
→ Simpler — ek hi codebase
→ Middleware se admin role check karo
→ Products shared hain — no duplication

Admin mein Server Actions use karunga:
→ Admin product add karta hai → Server Action
→ External consumers nahi hain admin ke liye
→ Type safety automatic
```

---

**State Management → Zustand (cart) + React Query (products/orders)**

```
Zustand:
→ Cart state — user ka cart globally accessible hai
→ Header mein cart badge count
→ Cart page mein items list
→ Checkout page mein order summary
→ Ye sab same cart state share karte hain

React Query:
→ Product listings — ISR pages pe prefetching
→ Admin dashboard — order list, product list
→ Mutations — order status update

useState:
→ Filter state (price range, category)
→ Search input
→ Modal state (image gallery)
```

---

## 🗄️ Step 3 — Data Model

```
PRODUCT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id             UUID        PK
slug           VARCHAR     UNIQUE, indexed
name           VARCHAR(255)
description    TEXT
price          DECIMAL(10,2)
compare_price  DECIMAL(10,2) nullable  ← "Was ₹999, Now ₹749"
stock          INTEGER
category       VARCHAR(100) indexed
images         TEXT[]      ← Array of Cloudinary URLs
status         ENUM        'active' | 'draft' | 'archived'
created_at     TIMESTAMP

ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id                UUID      PK
customer_email    VARCHAR   indexed
customer_name     VARCHAR
status            ENUM      'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
total_amount      DECIMAL(10,2)
razorpay_order_id VARCHAR   indexed  ← For payment reconciliation
razorpay_payment_id VARCHAR nullable
shipping_address  JSONB     ← { line1, city, state, pincode }
created_at        TIMESTAMP
updated_at        TIMESTAMP

ORDER_ITEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id          UUID      PK
order_id    UUID      FK → Order, indexed
product_id  UUID      FK → Product
quantity    INTEGER
unit_price  DECIMAL   ← Snapshot of price at time of order (price change hone pe bhi sahi record)
product_name VARCHAR  ← Snapshot of name too

CART (for logged-in users)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id          UUID      PK
user_id     UUID      UNIQUE, indexed
items       JSONB     ← [{ productId, quantity, price }]
updated_at  TIMESTAMP

IMPORTANT: Order_Item mein price snapshot kyon?
→ Product ka price baad mein change ho sakta hai
→ Purana order galat price show karne lage
→ Snapshot = order ke waqt ka price permanently saved
```

---

## 📋 Step 4 — Feature Breakdown

```
PHASE 1 — MVP:

  Public Pages
  ├── [ ] Product listing (ISR + filters)
  ├── [ ] Product detail (ISR)
  └── [ ] SEO metadata (title, description, OG tags)

  Cart
  ├── [ ] Add to cart (Zustand — instant UI)
  ├── [ ] Remove from cart
  ├── [ ] Update quantity
  ├── [ ] Cart summary / total calculation
  └── [ ] Persist cart (localStorage for guest)

  Checkout + Payment
  ├── [ ] Checkout form (shipping address)
  ├── [ ] Razorpay integration
  ├── [ ] Webhook handler (payment.captured)
  ├── [ ] Order create + status update
  └── [ ] Confirmation email (Resend)

  Admin
  ├── [ ] Admin auth (separate role check)
  ├── [ ] Product add (with Cloudinary upload)
  ├── [ ] Product edit / delete
  └── [ ] Order list + status update

  Edge Cases
  ├── [ ] Out of stock — disable "Add to Cart"
  ├── [ ] Payment failed flow
  ├── [ ] Empty cart state
  └── [ ] Webhook signature verification
```

---

## 🎙️ Interview Script — STAR Format

```
SITUATION:
"Maine ShopKaro banaya — ek handmade jewellery e-commerce store.
Client ko ek website chahiye thi jahan products Google pe dikhein,
customers cart mein add karein, aur Razorpay se payment karein."

TASK:
"Complex project tha — multiple user types (customer, admin),
mixed rendering requirements (SEO + personalized pages),
aur payment integration."

ACTION:
"Kuch interesting decisions —

Pehla: Mixed rendering strategy.
Product pages ISR se — SEO ke liye zaroori tha, revalidate 30 minutes.
Cart page pure CSR + Zustand — user-specific, SEO nahi chahiye.
Admin CSR — behind auth wall, highly interactive.
Ye mixing hi correct approach hai e-commerce ke liye —
ek hi strategy se poora project handle karna wrong hota.

Doosra: Cart architecture hybrid rakha.
Sirf Zustand mein rakhta — different device pe cart lost ho jaati.
Sirf DB mein rakhta — har add/remove pe API call = slow feel.
Solution: Zustand optimistic update + background DB sync for logged-in users.
Instant UI feel mila, data persistence bhi.

Teesra: Order item mein price snapshot kiya.
Ye common mistake hai — product price reference rakhne ke baad agar price change ho
toh purana order galat price dikhata hai.
Maine unit_price aur product_name order creation pe snapshot kiya.

Payment ka challenge tha Razorpay webhook handle karna.
Signature verification zaroori tha — bina iske koi bhi fake event bhej sakta tha.
Razorpay ka hmac signature verify kiya server pe before processing."

RESULT:
"App mein ISR-powered SEO pages the, full cart-to-checkout flow tha,
Razorpay payment tha, aur admin panel tha.
Reflection: Stock management aur pehle better plan karta —
race condition possible hai agar do log same last item simultaneously buy karein.
Database transaction + pessimistic locking is case mein correct solution hoga —
ye V2 mein address karunga."
```

---

**Next →** `project-05-analytics-dashboard.md` — DataLens: Internal Analytics Dashboard
