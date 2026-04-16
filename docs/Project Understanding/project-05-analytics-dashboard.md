# 🚀 Project 5 — DataLens: Internal Analytics Dashboard
### Sales Data Visualize Karo — Charts, Filters, Export

---

## 💬 The Brief — Client Ne Kya Kaha

> *"Hamari sales team ko ek internal dashboard chahiye.
> Wo apna performance dekh sakein — daily/weekly/monthly sales,
> top products, region-wise breakdown. Excel se fed up hain — visual chahiye.
> Login ke peeche hai — public access nahi. Export to CSV bhi chahiye."*

Ye pehle chaar projects se alag hai. Yahan **koi SEO nahi**, **koi public pages nahi**, **no real-time**, **no complex auth flows**. Ye ek pure **data visualization tool** hai — internal use, authenticated users only. Architecture simple ho sakti hai, par **data fetching + visualization** pe focus hai.

---

## 📋 Step 1 — PRD Lite

```
PROJECT NAME  : DataLens
TYPE          : Internal Analytics Dashboard
ONE LINE      : "Ye ek internal dashboard hai jo sales team ko
                 apna performance visually track karne deta hai."

TARGET USER:
  Primary   → Sales team members
              Semi-technical, desktop use mostly
  Secondary → Sales Manager
              Team ka aggregate performance dekhega

CORE FEATURES (MVP):
  [ ] Auth (login) — company email based
  [ ] Overview page — key metrics (total sales, orders, revenue)
  [ ] Date range filter (last 7d, 30d, 90d, custom)
  [ ] Sales trend chart (line chart — day wise)
  [ ] Top 10 products table
  [ ] Region-wise breakdown (bar chart)
  [ ] Individual salesperson performance (agar role = manager)
  [ ] Export data to CSV

STRETCH (V2):
  [ ] Real-time sales ticker (WebSocket/SSE)
  [ ] Email reports (scheduled weekly)
  [ ] Goal tracking (set targets, show progress)
  [ ] Drill-down (click on region → see that region's data)

OUT OF SCOPE:
  ❌ Public access
  ❌ Mobile app (desktop-first)
  ❌ Custom report builder
  ❌ Third-party integrations (Salesforce, HubSpot)
```

---

## 🏗️ Step 2 — Architecture Decisions

---

**Rendering → CSR (Almost Entirely) ✅**

```
Kyun CSR?
→ SEO ki koi zaroorat nahi — internal tool, Google index nahi karna
→ Highly interactive — date filters change hote hain, charts update hote hain
→ User logged in hona zaroori hai — public access nahi
→ Dashboard content user ke filters pe depend karta hai — har filter change pe
   naya data fetch hota hai (React Query se)

SSR kyun nahi?
→ Initial page load pe data not personalized beyond "logged in user"
→ Date range filter state client mein hai — server-side render karna
   over-engineering hoga

Exception: Login page → SSG (static, no data needed)
```

---

**Framework → Next.js (par minimal usage)**

```
Next.js kyun even though CSR dominant hai?
→ Auth handling easy (NextAuth / Clerk)
→ API routes ke liye — data fetch karne ke liye server-side queries
→ Future mein agar koi SSR page add karni ho — ready hai
→ Deployment ecosystem mature hai

Par agar ye project strictly internal aur simple tha:
→ Vite + React bhi valid choice hota — simpler setup
→ Next.js is case mein slightly overkill, par harm nahi
```

---

**Auth → Clerk ✅ (Email-only)**

```
Simple case hai yahan:
→ Company emails se login
→ Social login nahi chahiye
→ No complex role flows (simple: manager vs employee)

Clerk kyun?
→ Fast setup
→ Organization feature built-in (company-specific login)
→ UI ready-made

Role handling:
→ Clerk mein custom metadata mein 'role' set karo: 'manager' | 'employee'
→ Dashboard mein conditionally render karo manager-only sections
```

---

**Data Fetching → React Query + Aggregation API Routes**

```
Dashboard mein charts ke liye complex aggregation queries hain:
→ "Last 30 days mein har din ki total sales"
→ "Top 10 products by revenue this month"
→ "Region-wise breakdown for selected period"

Ye queries database level pe run hongi (PostgreSQL aggregations).

Architecture:
→ Next.js API routes mein query logic
→ Prisma ya raw SQL for aggregation
→ React Query client pe — caching, loading states, refetch on filter change

React Query ka benefit:
→ User date range change karta hai
→ React Query automatically refetch karta hai naye params ke saath
→ Previous data show karta hai jab tak naya load ho (keepPreviousData)
→ Same query dobara run nahi hoti agar cache mein hai (short TTL — 5 minutes)
```

---

**State Management → URL State + React Query (Zustand nahi)**

```
Ye interesting approach hai. Dashboard mein primary state = filters.

Option A: Zustand for filters
→ Kaam karta hai
→ Par URL mein reflect nahi hota
→ User link share karna chaahe "ye view dekho" → possible nahi

Option B: URL Search Params ✅ (nuqs library)
→ Filter state URL mein: /dashboard?range=30d&region=north
→ User bookmark kar sakta hai specific view
→ Back button kaam karta hai properly
→ Share link se same filters open hote hain

nuqs (Next.js URL query state library):
→ URL params ko React state ki tarah use karo
→ Type-safe, Next.js optimized
→ useQueryState('range', parseAsString.withDefault('30d'))

React Query filter params ko dependency mein le:
→ useQuery(['sales', range, region], () => fetchSales(range, region))
→ Filter change → new query → fresh data
```

---

**Charts → Recharts ✅**

```
Options:
→ Chart.js: Popular par React integration clunky
→ D3.js: Powerful par complex, low-level
→ Victory: React-native, good API
→ Recharts ✅: Built for React, composable, good docs

Recharts kyun?
→ React component-based API
→ Responsive containers built-in
→ Customizable tooltips, legends
→ Line, Bar, Pie — sab chahiye hain — sab available

Dashboard mein:
→ Line chart: Sales trend over time
→ Bar chart: Region-wise comparison
→ Simple cards: KPI metrics (no chart library needed — plain HTML/CSS)
→ Table: Top products (plain React table — no library needed for basic)
```

---

**CSV Export → Server-side generation**

```
User "Export CSV" click karta hai:

Option A: Client-side CSV generation
→ JavaScript mein data array ko CSV string banao
→ Blob download trigger karo
→ Problem: Data already fetched hai toh yahi karo
→ Large data ke liye slow — sab data client pe hona chahiye

Option B: Server-side CSV generation ✅
→ API route pe CSV generate karo
→ Stream as file download
→ Better for large datasets
→ Sensitive data client pe completely nahi aata

Implementation:
→ GET /api/export/sales?range=30d&region=all
→ Server mein query run hoti hai
→ csv-stringify library se CSV generate
→ Content-Type: text/csv header
→ Browser automatically download karta hai
```

---

**Database → PostgreSQL ✅ + Aggregation optimization**

```
Sales data clearly relational hai:
→ Sales → Products → Regions → Salespeople — sab related

Performance consideration:
→ Analytics queries heavy hoti hain — GROUP BY, SUM, DATE_TRUNC
→ Large datasets pe slow ho sakti hain

Optimizations:
→ Indexes on frequently filtered columns (date, region, salesperson_id)
→ Materialized views consider karo for common aggregations (V2)
→ Connection pooling (PgBouncer ya Neon's built-in pooling)
→ Query-level caching via React Query (5-minute stale time)

Kyun separate analytics DB nahi?
→ Overkill for this scale
→ ClickHouse ya BigQuery tab sochte hain jab millions of rows hoon
→ PostgreSQL WITH proper indexes kaafi hai is scale pe
```

---

## 🗄️ Step 3 — Data Model

```
SALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id              UUID        PK
salesperson_id  UUID        FK → User, indexed
product_id      UUID        FK → Product, indexed
region          VARCHAR(100) indexed
amount          DECIMAL(10,2)
quantity        INTEGER
sale_date       DATE        indexed  ← Most queried column
created_at      TIMESTAMP

PRODUCT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id          UUID       PK
name        VARCHAR
category    VARCHAR
unit_price  DECIMAL

USER (Salesperson)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id          UUID       PK
name        VARCHAR
email       VARCHAR    UNIQUE
role        ENUM       'manager' | 'employee'
region      VARCHAR    ← Salesperson ka assigned region
clerk_id    VARCHAR    UNIQUE

INDEXES (Performance-critical):
→ Sale.sale_date           (date range queries — most frequent)
→ Sale.salesperson_id      (per-person reports)
→ Sale.region              (region filter)
→ Sale.product_id          (top products query)
→ Composite: (sale_date, region)  ← Combined filter common hai

KEY QUERIES:

1. Daily sales last 30 days:
SELECT DATE_TRUNC('day', sale_date) as day,
       SUM(amount) as total
FROM sales
WHERE sale_date >= NOW() - INTERVAL '30 days'
GROUP BY day
ORDER BY day;

2. Top 10 products:
SELECT p.name, SUM(s.amount) as revenue, SUM(s.quantity) as units
FROM sales s
JOIN products p ON s.product_id = p.id
WHERE s.sale_date >= [range]
GROUP BY p.id, p.name
ORDER BY revenue DESC
LIMIT 10;

3. Region breakdown:
SELECT region, SUM(amount) as total
FROM sales
WHERE sale_date >= [range]
GROUP BY region;
```

---

## 📋 Step 4 — Feature Breakdown

```
PHASE 1 — MVP:

  Auth
  ├── [ ] Clerk setup (email login only)
  ├── [ ] Role in Clerk metadata
  └── [ ] Protected routes middleware

  Dashboard Layout
  ├── [ ] Sidebar navigation
  ├── [ ] Date range picker (URL state)
  └── [ ] Region filter (URL state)

  Charts & Data
  ├── [ ] KPI cards (total revenue, orders, avg order value)
  ├── [ ] Sales trend line chart (Recharts)
  ├── [ ] Region breakdown bar chart
  ├── [ ] Top products table
  └── [ ] Salesperson performance (manager only)

  API Routes
  ├── [ ] /api/analytics/overview
  ├── [ ] /api/analytics/trend
  ├── [ ] /api/analytics/regions
  └── [ ] /api/analytics/top-products

  Export
  └── [ ] CSV export API + download trigger

  Edge Cases
  ├── [ ] Empty data state (new month, no sales yet)
  ├── [ ] Loading skeletons for charts
  └── [ ] Error state (DB query failed)

PHASE 2:
  [ ] Scheduled email reports (Inngest cron + Resend)
  [ ] Drill-down charts
  [ ] Real-time updates (SSE for today's live ticker)
```

---

## 🎙️ Interview Script — STAR Format

```
SITUATION:
"Maine DataLens banaya — ek internal sales analytics dashboard.
Sales team Excel sheets se fed up thi — manually data aggregate karna tedious tha.
Unhe visual, filterable dashboard chahiye tha."

TASK:
"Internal tool tha — no SEO, no public access. Primary challenge tha
heavy aggregation queries efficiently handle karna aur
good visualization experience dena."

ACTION:
"Teen interesting decisions —

Pehla: Sirf CSR use kiya — SSR skip kiya.
Internal tool hai, SEO zero concern. Highly interactive hai — filters continuously change hote hain.
Ye case clearly CSR ke liye banaya hua hai.
Next.js still use kiya API routes aur auth ke liye, par pages CSR hain.

Doosra: Filter state URL mein rakha — Zustand mein nahi.
nuqs library use ki. Date range aur region filter URL params mein hain.
Is approach ka faayda ye tha ki user specific view bookmark kar sakta hai,
aur link share kar sakta hai manager ko — 'ye dekho Q3 north region'.
Zustand se ye possible nahi hota.

Teesra: Database aggregation queries pe zyada dhyaan diya.
Analytics queries heavy hoti hain — GROUP BY, SUM, DATE_TRUNC.
Indexes carefully design kiye — sale_date, region, salesperson_id.
React Query mein 5-minute stale time rakha — same filter pe
baar baar DB hit na ho.

Challenge tha CSV export — large data. Client-side generation
sensitive data completely expose karta. Server-side streaming
CSV better tha — API route se Content-Type: text/csv bheja,
browser automatically download karta hai."

RESULT:
"Dashboard mein 4 chart types the, date range + region filters URL mein the,
CSV export tha, aur manager-only performance view tha.
Reflection: Loading states aur pehle better design karta.
Charts load hone mein time lagta hai — skeleton loaders
pehle se plan karna chahiye tha, beech mein add karna padha."
```

---

## 📊 Final Comparison — Sab 5 Projects Ek Jagah

```
┌─────────────────┬────────────┬──────────┬───────────┬─────────────┬──────────────┐
│ Feature          │ StaffSync  │ HireHop  │ TalkSpace │ ShopKaro    │ DataLens     │
│                  │ (Task Mgr) │ (JobBoard│ (Chat)    │ (E-comm)    │ (Analytics)  │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Rendering        │ SSR        │ ISR+SSR  │ CSR       │ ISR+SSR+CSR │ CSR          │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ API Style        │ Server     │ REST     │ Socket.io │ REST        │ API Routes   │
│                  │ Actions    │ Routes   │           │ Routes      │              │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ State Mgmt       │ Zustand +  │ React    │ Zustand   │ Zustand +   │ URL State +  │
│                  │ React Query│ Query    │           │ React Query │ React Query  │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Database         │ PostgreSQL │ PostgreSQL│ MongoDB  │ PostgreSQL  │ PostgreSQL   │
│                  │            │          │ + Redis   │ + Redis     │              │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Auth             │ Clerk      │ NextAuth │ NextAuth  │ NextAuth    │ Clerk        │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ RBAC             │ Yes        │ Yes      │ No        │ Yes (admin) │ Yes (manager)│
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Real-time        │ No         │ No       │ Socket.io │ No          │ No           │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ File Upload      │ No         │ Uploadth │ No        │ Cloudinary  │ No           │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Email            │ No         │ Resend   │ No        │ Resend      │ No           │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Payments         │ No         │ No       │ No        │ Razorpay    │ No           │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ SEO              │ No         │ Critical │ No        │ Critical    │ No           │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Hosting          │ Vercel     │ Vercel   │ Railway   │ Vercel      │ Vercel       │
└─────────────────┴────────────┴──────────┴───────────┴─────────────┴──────────────┘
```

---

> **Key Insight:** Har project mein alag decisions hain — same stack everywhere use karna wrong hai.
> Interview mein ye table ka type of thinking dikhana sabse powerful hai.
> **"It depends — aur yahan kyon depends karta hai wo main explain karta hoon."**
