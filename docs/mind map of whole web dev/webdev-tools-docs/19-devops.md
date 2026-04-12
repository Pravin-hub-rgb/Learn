# 19 — DevOps: Hosting, CI/CD, Monitoring

> Umbrella: DevOps / Infra
> Kaam: App deploy karna, automatically test + deploy karna, errors track karna
> ShopKaro docs mein: Doc 44 mein Vercel cover hua

---

## Teen Sub-categories

```
HOSTING:    App kahan chalegi? (Vercel, Railway, AWS)
CI/CD:      Code push → Automatically test + deploy (GitHub Actions)
MONITORING: Kya kuch toot gaya? Errors track karo (Sentry)
```

---

## Hosting

---

### Vercel
**Tag: 🟢 Next.js Standard | Easiest | Recommended**

```
Kya hai: Frontend + Serverless deployment platform — Next.js ke creators ka
Kab use karo: Next.js project → Almost always Vercel

Features:
  → GitHub push → Auto deploy
  → Preview URLs har PR ke liye
  → Global CDN automatic
  → Serverless functions (Next.js API routes)
  → Analytics built-in

Free tier: Generous — side projects ke liye kaafi
Cons: Expensive at scale, serverless limitations (no WebSocket, no long processes)

India mein: Next.js projects ka default choice
```

---

### Netlify
**Tag: 🟢 Frontend | JAMstack | Static Sites**

```
Kya hai: Static site + serverless platform
Kab use karo:
  → Static sites, Gatsby, Astro
  → Vercel alternative

Vercel se fark:
  → Netlify: Static sites pe better (historically)
  → Vercel: Next.js pe better
  → 2024: Dono similar features — Vercel Next.js ke liye prefer
```

---

### Railway
**Tag: 🟢 Full Stack | Simple | Good for beginners**

```
Kya hai: Deploy everything — Node.js, PostgreSQL, Redis, everything ek jagah
Kab use karo:
  → Full backend server chahiye (WebSocket, long processes)
  → Vercel ka serverless nahi chalega
  → Sab ek platform pe chahiye (app + database)

Real app example:
  → Express/NestJS backends
  → Socket.io apps (WebSocket chahiye)
  → ShopKaro agar dedicated server chahiye

Free tier: Limited but good for learning
India mein: Growing — especially backend developers
```

---

### Render
**Tag: 🟢 Heroku Alternative | Simple**

```
Kya hai: Web services, databases, cron jobs — Heroku replacement
Kab use karo:
  → Heroku se migrate kar rahe ho
  → Simple server deployment

Heroku: Free tier band ho gaya 2022 → Render sabse popular alternative
```

---

### Fly.io
**Tag: 🟢 Containers | Global | Docker**

```
Kya hai: Docker containers globally deploy karo
Kab use karo:
  → Docker use kar rahe ho
  → Global low-latency chahiye
  → Vercel limitations face kar rahe ho

Real app example: Apps jahan multiple regions mein deploy karna ho
```

---

### AWS / GCP / Azure
**Tag: 🟢 Enterprise | Everything | Complex**

```
Kya hai: Full cloud platforms — infinite services
Kab use karo:
  → Enterprise scale
  → Specific AWS services chahiye (Lambda, S3, SES, SQS)
  → Existing cloud commitment

Learning curve: High — dedicated DevOps/Cloud engineer chahiye usually
India mein: Large companies, enterprise (Flipkart, Zomato at scale)
```

---

### Cloudflare Pages + Workers
**Tag: 🟢 Edge | Fast | Growing**

```
Kya hai: Edge deployment — globally distributed, ultra-fast
Kab use karo:
  → Edge computing chahiye
  → Hono + Drizzle + Cloudflare stack

Workers = Serverless functions at edge (like Vercel but Cloudflare network)
India mein: Growing — especially performance-conscious developers
```

---

## CI/CD

---

### GitHub Actions
**Tag: 🟢 Most Popular | Free for public repos**

```
Kya hai: Code push → Automatically run tests → Deploy
Kab use karo: GitHub use kar rahe ho → GitHub Actions (default)

Code feel:
  # .github/workflows/deploy.yml
  on: push
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - run: npm install
        - run: npm test
    deploy:
      needs: test
      steps:
        - run: vercel deploy --prod

Real app example:
  → ShopKaro: Push to main → Tests run → If pass → Vercel deploy

India mein: Almost standard — especially Vercel + GitHub combo
```

---

## Monitoring + Error Tracking

---

### Sentry
**Tag: 🟢 Error Tracking Standard**

```
Kya hai: Error tracking — kab kya error aaya, kaun sa user, kya context
Kab use karo: Production app → Hamesha Sentry (ya koi error tracker)

Real app example:
  → ShopKaro: Priya ke liye checkout crash → Sentry mein dikhega → Fix karo

Code feel:
  import * as Sentry from "@sentry/nextjs"
  Sentry.init({ dsn: process.env.SENTRY_DSN })
  // Ab koi bhi unhandled error → Sentry dashboard mein

Free tier: 5000 errors/month — starting ke liye kaafi
India mein: Production apps mein standard
```

---

### PostHog
**Tag: 🟢 Analytics + Feature Flags | Privacy-friendly**

```
Kya hai: Product analytics — user kya karta hai track karo + feature flags
Feature flags: "20% users ko naya checkout dikhao" → A/B testing

Real app example:
  → Swiggy: "Naya UI 10% users pe test karo" → Feature flag
  → ShopKaro: "Kitne users cart pe aate hain, kitne checkout" → Analytics

India mein: Growing — Google Analytics alternative (privacy-friendly)
```

---

### LogRocket
**Tag: 🟢 Session Replay | Frontend debugging**

```
Kya hai: User ka session record karo — exactly kya hua error se pehle
Kab use karo: Sentry se aage — error context chahiye visually

Real app example: "Priya ka order fail hua — LogRocket mein dekho exactly kya click kiya"
```

---

## Quick Decision

```
Next.js deploy karna?
  → Vercel (default)

Full backend server (WebSocket, long processes)?
  → Railway ya Render

Docker use kar rahe ho?
  → Fly.io

Enterprise?
  → AWS ya GCP

CI/CD?
  → GitHub Actions (almost always)

Error tracking?
  → Sentry (always in production)

Analytics?
  → PostHog (privacy) ya Google Analytics (free)
```

---

## Agla Doc

`20-meta-tools.md` — Meta Tools — TypeScript, tRPC, Zod, Monorepos, Package Managers — poori series ka aakhri doc.
