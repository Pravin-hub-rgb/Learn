# 14 — SQL Databases: PostgreSQL, MySQL, SQLite, Neon, Supabase

> Umbrella: Database → SQL (Relational)
> Kaam: Structured data store karna — tables, rows, relationships
> ShopKaro docs mein: Doc 19-20 mein cover hua

---

## SQL Databases Do Categories

```
DATABASE ENGINE (Actual database software):
  → PostgreSQL, MySQL, SQLite
  → Tum install karte ho / manage karte ho

MANAGED DATABASE SERVICE (Cloud pe hosted):
  → Neon, Supabase, PlanetScale, Railway
  → Koi company manage karti hai — tum sirf use karo
```

---

## Database Engines

---

### PostgreSQL
**Tag: 🟢 Industry Standard | Most Recommended | Feature-rich**

```
Kya hai: Most advanced open-source relational database
Kab use karo:
  → Almost always — default choice
  → Complex queries chahiye
  → JSON data bhi store karna ho (JSONB support)
  → Full-text search chahiye (without Elasticsearch)
  → Geospatial data (location-based apps)

Real app example:
  → Swiggy, Zomato: Orders, restaurants, reviews
  → CRED: Financial transactions (ACID compliance critical)
  → ShopKaro: Users, products, orders — sab kuch

MySQL se fark:
  → PostgreSQL: More standards-compliant, better JSON support, better for complex queries
  → MySQL: Simpler, WordPress ecosystem, slightly faster for simple reads
  → 2024 recommendation: PostgreSQL (almost always)

India mein: Growing rapidly — especially Next.js + Prisma + Neon combo
```

---

### MySQL
**Tag: 🟢 Widely Used | WordPress/PHP ecosystem**

```
Kya hai: Most popular relational database (historically)
Kab use karo:
  → WordPress site (MySQL only)
  → Existing MySQL codebase
  → PHP/Laravel projects
  → Simple reads, high traffic (slightly faster than Postgres for reads)

PostgreSQL se kya kam:
  → JSON support poor (PostgreSQL ka JSONB much better)
  → Window functions limited
  → Standards compliance lower

Real app example:
  → Most WordPress sites
  → Older PHP/Laravel Indian apps
  → Facebook (historically MySQL at extreme scale with custom patches)

India mein: Purane projects mein bahut milega — PHP era
```

---

### SQLite
**Tag: 🟢 Local/Small | File-based | No server**

```
Kya hai: File-based database — koi server nahi, ek .db file
Kab use karo:
  → Local development
  → Desktop apps (Electron)
  → Mobile apps (React Native)
  → Very small apps, prototypes
  → Edge databases (Turso)

Production mein:
  → Single server apps mein use hota hai
  → Multiple servers mein? Problem — file shared nahi hoti

Real app example:
  → WhatsApp local message store
  → VS Code ka extension data
  → Electron apps

Turso (SQLite at edge):
  → Cloudflare Workers pe SQLite
  → Replicated SQLite — growing concept
```

---

## Managed Database Services

---

### Neon
**Tag: 🟢 Serverless PostgreSQL | Vercel-friendly | Recommended for Next.js**

```
Kya hai: Serverless PostgreSQL — scale to zero, branch databases
Kab use karo:
  → Next.js + Vercel project
  → Serverless chahiye (pay for what you use)
  → Development branches chahiye (separate DB for PR previews)

Special features:
  → Branching: Har PR ke liye alag database branch — testing ke liye
  → Scale to zero: Koi traffic nahi → Database so jaata hai → Bill nahi
  → Vercel integration: Seamless

Free tier: Generous — side projects ke liye perfect

Connection string:
  DATABASE_URL="postgresql://user:pass@ep-xyz.neon.tech/shopkaro"

India mein: Next.js community mein most popular choice 2024
```

---

### Supabase
**Tag: 🟢 PostgreSQL + Everything | Firebase Alternative**

```
Kya hai: PostgreSQL + Auth + Storage + Realtime + Edge Functions — sab ek mein
Kab use karo:
  → Firebase replace karna hai (open-source alternative)
  → Quick backend chahiye — backend code kam likhna
  → Real-time features chahiye
  → Auth, storage sab ek jagah chahiye

Firebase se fark:
  → Supabase: Open-source, PostgreSQL (SQL), self-host possible
  → Firebase: Google, proprietary, NoSQL

Real app example:
  → Indie developers ki apps — backend quickly banana
  → Startups ka MVP — ek platform pe sab

Code feel:
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)

Cons:
  → Vendor lock-in (lekin open-source hai, self-host possible)
  → Complex apps mein limitations

India mein: Indie devs, small startups mein growing
```

---

### PlanetScale
**Tag: 🟡 MySQL serverless | Was popular 2022-23 | Free tier removed**

```
Kya hai: Serverless MySQL — branching like Neon
Status: 2024 mein free tier remove kar diya → Many users left
Neon (PostgreSQL) prefer karo instead

Kab use karo: Existing PlanetScale codebase ya MySQL required specifically
```

---

### Railway
**Tag: 🟢 Simple | Full platform | Good for starters**

```
Kya hai: Deploy everything platform — PostgreSQL + Redis + backend sab ek jagah
Kab use karo:
  → Vercel jaisi simplicity chahiye lekin backend bhi
  → Database + Node server ek saath chahiye
  → Neon ya Supabase se alag feel chahiye

Free tier: Limited lekin good for prototyping
India mein: Growing — especially full-stack projects
```

---

## Quick Decision

```
Naya project, PostgreSQL chahiye?
  → Neon (Vercel ke saath) ya Supabase (sab ek jagah)

WordPress/PHP?
  → MySQL (required)

Local development / prototype?
  → SQLite

Firebase replace karna hai?
  → Supabase

Enterprise, full control?
  → Self-hosted PostgreSQL (AWS RDS ya DigitalOcean)

Edge database?
  → Turso (SQLite at edge)
```

---

## India Mein Reality

```
Next.js startups (2024):    Neon ya Supabase
Traditional apps:           MySQL (purana) ya PostgreSQL (naya)
Firebase users:             Supabase mein migrate kar rahe hain
Enterprise:                 AWS RDS PostgreSQL ya MySQL
Learning:                   SQLite (local) → Neon (deploy)
```

---

## Agla Doc

`15-database-nosql.md` — NoSQL Databases — MongoDB, Redis, DynamoDB, Firestore — kab SQL se hatna chahiye, Redis cache vs database, Firebase vs Supabase.
