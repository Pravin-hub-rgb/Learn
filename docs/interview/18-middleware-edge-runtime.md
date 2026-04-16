# ⚙️ Phase 3: Topic 18 - Middleware & Edge Runtime

> **Interview Question:** "Next.js Middleware kya hai? Edge Runtime kya hai? Middleware kaha chalta hai? Auth checks, redirects, rewrites kaise karte hai? Edge pe kyun run hota hai?"

---

## 🚨 **The Golden Rule — Sabse Pehle Samjho!**

> **"Middleware woh security guard hai jo tumhare ghar ke gate par khada hai. Koi bhi andar aane se pehle uske paas se hi jaana padta hai. Woh request ko rok sakta hai, redirect kar sakta hai, modify kar sakta hai ya andar jane de sakta hai."**

Edge Runtime matlab ye security guard tumhare ghar ke saamne nahi, user ke ghar ke paas hi khada hai. Sabse najdeek mein, sabse fast.

---

## 💡 Beginner-Friendly Explanation (Real World Analogy)

```
🛂 Airport Security Check:
Tum airport ja rahe ho flight catch karne.
✈️  Tumne gate par pahuncha
🛂  Security Guard tumhe rokta hai (Middleware)
    → Tumhara ticket check karta hai
    → Tumhara ID card check karta hai
    → Agar sab sahi hai → andar jane deta hai
    → Agar galat hai → bahar bhej deta hai (Redirect)
    → Tumhare saath koi chiz nahi hai → woh tumhe andar jaane nahi deta

⚡ Normal Server:
Security guard Delhi airport mein hai tum Bangalore se aa rahe ho. Tum 2 ghante flight kar ke Delhi aaye phir security ne tumhe rok diya. Time waste.

⚡ Edge Runtime:
Security guard Bangalore airport mein hi khada hai. Tum hi nikalte hi woh tumhe check kar leta hai. Agar nahi allowed hai toh tumhe hi waha rok deta hai. Bangalore se hi return. No time waste.
```

✅ **Middleware Ka Kaam:**
- Request reach hone se **pehle** run hota hai
- Cache se bhi pehle, page render se bhi pehle
- Sabse pehle yahi chalta hai

✅ **Edge Runtime Ka Faida:**
- User ke najdeek server par run hota hai
- 50ms se bhi kam time mein response aata hai
- Poore origin server tak request nahi jaati

---

## 📊 Middleware Flow Step by Step

```
                                User Request aaya hai
                                          │
                                          ▼
                                  🛂 MIDDLEWARE
            ✅ Sabse PEHLA code jo run hota hai, kisi bhi cheez se pehle
                                          │
                        ┌─────────────────┴─────────────────┐
                        │                                   │
                  ❌ Redirect / Reject               ✅ Allow Request
                        │                                   │
                        ▼                                   ▼
            User ko wapas bhej do                  Request aage badho
                                                          │
                                                          ▼
                                                    Cache Check
                                                          │
                                                          ▼
                                                    Page Render
                                                          │
                                                          ▼
                                                    Response User ko
```

✅ **Important:** Middleware cache se bhi pehle chalta hai. Agar tumne middleware mein redirect kiya toh cache bhi nahi check hoga. Poore process ko hi shortcut kar deta hai.

---

## 🎯 Middleware Kya Kar Sakta Hai?

| ✅ Ye kar sakte hai | ❌ Ye nahi kar sakte |
|---------------------|----------------------|
| Redirect kar sakte hai | Database query nahi kar sakte |
| Rewrite kar sakte hai | Heavy calculation nahi kar sakte |
| Headers set kar sakte hai | Response body modify nahi kar sakte |
| Cookies set / delete kar sakte hai | Node.js APIs nahi use kar sakte |
| Auth check kar sakte hai | File system access nahi hai |
| IP address check kar sakte hai | Large dependencies nahi import kar sakte |
| A/B test kar sakte hai | |
| Geo location check kar sakte hai | |
| Bot detection kar sakte hai | |
| Rate limit kar sakte hai | |

> **Rule:** Middleware mein sirf woh kaam karo jo **super fast** hai. 10ms se bhi zyada mat lao.

---

## 📝 Basic Middleware Example

```tsx
// ✅ middleware.ts - Root folder mein rakhna hai (app ke bahar)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // ✅ Sab se pehle yaha aata hai har request

  // Auth check example
  const isLoggedIn = request.cookies.get('auth_token')

  if (!isLoggedIn && request.nextUrl.pathname.startsWith('/dashboard')) {
    // ❌ Login nahi hai toh login par redirect karo
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ✅ Sab sahi hai toh aage badhne do
  return NextResponse.next()
}

// ✅ Kon kon se routes par middleware chalaega
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/:path*'
  ]
}
```

✅ **Ye poora code Edge par chalta hai.** User ke najdeek server par, 10ms mein poora process ho jata hai.

---

## 🎭 Common Middleware Use Cases

### 1. 🔐 Authentication Check
Sabse common use case. Protected routes par jaane se pehle check karo user login hai ya nahi.

```tsx
export function middleware(request: NextRequest) {
  const session = request.cookies.get('next-auth.session-token')

  const protectedRoutes = ['/dashboard', '/settings', '/profile']

  if (protectedRoutes.includes(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
```

### 2. 🌍 Geo Location Based Redirect
User ka country dekh ke usko correct domain par bhejo.

```tsx
export function middleware(request: NextRequest) {
  const country = request.geo?.country

  if (country === 'IN' && !request.nextUrl.pathname.startsWith('/in')) {
    return NextResponse.redirect(new URL('/in', request.url))
  }

  if (country === 'US' && !request.nextUrl.pathname.startsWith('/us')) {
    return NextResponse.redirect(new URL('/us', request.url))
  }

  return NextResponse.next()
}
```

### 3. 🧱 Bot Protection
User agent dekh ke bots ko block karo.

```tsx
export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''

  const badBots = ['curl', 'wget', 'python-requests', 'scrapy']

  if (badBots.some(bot => userAgent.toLowerCase().includes(bot))) {
    return new NextResponse('Not allowed', { status: 403 })
  }

  return NextResponse.next()
}
```

### 4. ⚖️ A/B Testing
50% users ko version A, 50% ko version B dikhao.

```tsx
export function middleware(request: NextRequest) {
  // Cookie already hai toh wahi dikhao
  let variant = request.cookies.get('ab-test')

  if (!variant) {
    // Naya user hai, random assign karo
    variant = Math.random() > 0.5 ? 'A' : 'B'

    const response = NextResponse.next()
    response.cookies.set('ab-test', variant)
    return response
  }

  // Rewrite karo correct variant par
  return NextResponse.rewrite(new URL(`/variant-${variant}`, request.url))
}
```

---

## ⚡ Edge Runtime Deep Dive

Edge Runtime Vercel ke poore global network ke har server par available hai.

| 🕰️ Normal Node.js Server | ⚡ Edge Runtime |
|---------------------------|-----------------|
| 1 location mein chalta hai | 300+ locations mein chalta hai |
| 200-500ms response time | 10-50ms response time |
| Cold start 1000ms+ | Cold start 5ms |
| Full Node.js APIs available | Limited Web Standard APIs |
| Unlimited code size | Maximum 1MB code |
| Unlimited execution time | Maximum 10 seconds |
| Database se connect kar sakte hai | Direct database nahi connect kar sakte |

✅ **Koi bhi country ka user aaye uske najdeek 100km ke andar hi server hai waha middleware run hoga.**

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Middleware mein database call karna
```tsx
// ❌ GALAT! Ye mat karo
export async function middleware(request: NextRequest) {
  const user = await db.user.findUnique({ id: 1 }) // ❌ Ye edge par nahi chalta
  // 200ms lag jaayega, poore faayde ka nuksan ho jaayega
}
```

✅ **Sahi tareeka:** Sirf cookies aur JWT verify karo. Database nahi.

### ❌ Mistake 2: Middleware mein heavy libraries import karna
```tsx
// ❌ GALAT!
import lodash from 'lodash' // 100KB library edge par mat lao
```

✅ **Sahi tareeka:** Sirf small micro libraries use karo ya khud code likho.

### ❌ Mistake 3: Har route par middleware chala rahe ho
```tsx
// ❌ GALAT!
export const config = {
  matcher: '/:path*' // Har route par middleware mat chalao
}
```

✅ **Sahi tareeka:** Sirf jaha zaroorat hai wahi par chalao.

### ❌ Mistake 4: Middleware mein 10 se zyada kaam kar rahe ho
Middleware sirf 1 ya 2 kaam karo. Auth check + redirect. Bas. Aur kuch mat karo.

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "Middleware kya hai Next.js mein?"

**Answer:** "Sir, Middleware woh code hai jo har request se sabse pehle run hota hai. Cache se bhi pehle, page render se bhi pehle. Hum isme auth check, redirects, rewrites, bot protection, geo based routing jaise kaam karte hai. Ye Edge Runtime par chalta hai isliye bahut fast hota hai."

### Q: "Edge Runtime kya hai?"

**Answer:** "Edge Runtime ek lightweight runtime hai jo Vercel ke saare global servers par available hai. Har user ke najdeek server par code run hota hai. Isliye response time 10-50ms rehta hai. Normal Node.js ki tarah nahi hai, isme sirf web standard APIs available hai, Node.js APIs nahi."

### Q: "Middleware kaha chalta hai?"

**Answer:** "Middleware by default Edge Runtime par chalta hai. Hum agar chahe toh Node.js runtime par bhi chala sakte hai par uska koi faayda nahi hai. Sabse zyada faida edge par hi hai kyunki woh user ke bahut najdeek hota hai."

### Q: "Middleware se tum kya kya kar sakte ho?"

**Answer:** "Hum redirect kar sakte hai, rewrite kar sakte hai, headers set kar sakte hai, cookies manage kar sakte hai, auth check kar sakte hai, geo location check kar sakte hai, ab test kar sakte hai, rate limit kar sakte hai. Par hum database query nahi kar sakte, heavy calculations nahi kar sakte, response body modify nahi kar sakte."

### Q: "Middleware mein database call kyun nahi karte?"

**Answer:** "Kyunki middleware ka purpose hi super fast hona hai. Agar hum database call karenge toh 200ms lag jaayega, poore faayde ka nuksan ho jaayega. Aur Edge Runtime se direct database connection bhi nahi hota hai."

### Q: "Edge Runtime ke kya limitations hai?"

**Answer:** "Edge Runtime mein poore Node.js APIs nahi available hai. Maximum 1MB code hi chala sakte hai. Maximum 10 seconds execution time hai. File system access nahi hai. Direct database connection nahi hota hai."

### Q: "Auth check middleware mein hi kyun karte hai page mein kyun nahi?"

**Answer:** "Kyunki middleware request se sabse pehle chalta hai. Agar user login nahi hai toh hum usko turant redirect kar dete hai. Page par jaane hi nahi dete. Cache bhi nahi check hota, poore process ko hi shortcut kar deta hai. Ye 10ms mein ho jaata hai edge par."

### Q: "Middleware aur API route mein kya farak hai?"

**Answer:** "API route origin server par chalta hai. Middleware edge par chalta hai. API route har route ke liye alag alag hoti hai. Middleware ek baar hi har request ke liye chalta hai. API route bahut saare kaam kar sakti hai, middleware sirf chote fast kaam ke liye hai."

---

## ✅ **Key Takeaways**

1.  Middleware har request se **sabse pehle** chalta hai
2.  Default mein Edge Runtime par chalta hai - 300+ locations mein
3.  Auth check, redirects, rewrites, bot protection ke liye perfect hai
4.  Sirf light weight fast kaam hi karo middleware mein
5.  Database calls mat karo, heavy libraries mat lao
6.  Sirf jaha zaroorat hai waha par hi matcher lagao
7.  Ye Next.js ka sabse underrated powerful feature hai

> **Final Tip:** Interview mein hamesha ye line bol dena: "Middleware ka best part ye hai ki agar tumhe request reject karni hai toh tum usko poore origin server tak pahunchne se pehle hi rok dete ho. Load origin server pe kabhi hi nahi aata."
