# 44 — Deployment: App Ko Duniya Ko Dikhao

> Accessibility complete hua.
> Ab gyarawa umbrella — **Deployment**.
> Local pe kaam karta hai — ab live karo.

---

## Deployment Kya Hai

**Deployment** = tumhara app local machine se **internet pe** le jaana — taaki koi bhi access kar sake.

Abhi: `localhost:3000` — sirf tumhare computer pe
Baad mein: `shopkaro.com` — poori duniya ke liye

---

## Vercel — Next.js Ke Liye Best Choice

Vercel ne hi Next.js banaya hai — integration perfect hai.

**Kyun Vercel:**
- Free tier kaafi hai side projects ke liye
- GitHub connect karo → Push karo → Automatic deploy
- Next.js sab features support karta hai (SSR, SSG, API routes)
- Global CDN automatic
- Domain connection easy

---

## Deploy Kaise Karo — Step by Step

### Step 1 — GitHub Pe Push Karo
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2 — Vercel Pe Account Banao
`vercel.com` → GitHub se sign up

### Step 3 — Project Import Karo
- "New Project" → GitHub repo select karo → Import
- Vercel automatically detect karta hai Next.js

### Step 4 — Environment Variables Add Karo
Yeh **sabse important step** hai.

`.env` file GitHub pe nahi daali — toh Vercel ko bhi nahi pata. Manually add karo:

```
Vercel Dashboard → Project → Settings → Environment Variables

DATABASE_URL          = postgresql://...
SESSION_SECRET        = your-secret-here
RAZORPAY_KEY_ID       = rzp_live_...
RAZORPAY_KEY_SECRET   = ...
RESEND_API_KEY        = re_...
NEXT_PUBLIC_APP_URL   = https://shopkaro.vercel.app
```

### Step 5 — Deploy
"Deploy" click karo → 2-3 minute → Live!

---

## Environment Variables — Development vs Production

```bash
# .env (local development)
DATABASE_URL="postgresql://localhost:5432/shopkaro"
RAZORPAY_KEY_ID="rzp_test_..."    # Test keys — fake payments

# Vercel mein (production)
DATABASE_URL="postgresql://neon.tech/shopkaro"  # Real database
RAZORPAY_KEY_ID="rzp_live_..."                  # Live keys — real payments
```

**Test vs Live keys** — development mein test mode use karo. Production mein live mode. Kabhi test keys production mein mat daalo.

---

## NEXT_PUBLIC_ Prefix

```bash
# Sirf server pe available — browser nahi dekh sakta
SESSION_SECRET="abc123"
DATABASE_URL="postgresql://..."

# Browser mein bhi available — NEXT_PUBLIC_ prefix
NEXT_PUBLIC_APP_URL="https://shopkaro.com"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_..."
```

Rule: Sensitive cheezein (passwords, secrets) kabhi `NEXT_PUBLIC_` nahi honi chahiye.

---

## Automatic Deploys — Git Push = Auto Deploy

```
Local mein kaam karo
→ git push origin main
→ Vercel automatically new deploy karta hai
→ 2 min mein live

Feature branch:
→ git push origin feature/cart-update
→ Vercel preview URL deta hai — test karo pehle
→ Merge karo main mein → Production deploy
```

---

## Custom Domain

```
Vercel Dashboard → Project → Settings → Domains
→ "shopkaro.com" add karo
→ DNS settings configure karo (domain provider pe)
→ SSL/HTTPS automatic
```

---

## Database — Production Ke Liye

Local: PostgreSQL tumhare computer pe
Production: Cloud database chahiye

Options:
- **Neon** — Free tier, Vercel ke saath perfect integration
- **Supabase** — Free tier, extra features
- **Railway** — Simple, generous free tier

---

## Deployment Umbrella — Complete Hua

```
DEPLOYMENT
│
├── Vercel deploy → Doc 44 ✓ (YEH)
└── Environment variables → Covered ✓
```

---

## Agla Doc

`45-senior-dev-checklist.md` — **Aakhri doc** — Senior Dev Checklist. Project banane se pehle aur baad — kya check karna hai. Poori series ka summary bhi yahan hai.
