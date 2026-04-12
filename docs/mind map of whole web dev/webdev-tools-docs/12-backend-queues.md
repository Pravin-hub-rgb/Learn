# 12 — Background Jobs + Queues: BullMQ, Inngest, Trigger.dev

> Umbrella: Backend → Background Jobs / Queues
> Kaam: Heavy/slow tasks ko background mein karo — user wait na kare
> Example: Order place → User ko response milo → Background mein email bhejo

---

## Storage Types - Poora Detail Mein

Web development mein **3 tarah ke storage** hote hain — har ek ka alag kaam:

```
┌─────────────────────────────────────────────────────────────────┐
│                     STORAGE TYPES OVERVIEW                       │
├─────────────────────────────────────────────────────────────────┤
│ 1. Client Side (Browser)     → Cookies, LocalStorage, Session   │
│ 2. Server Side - Database    → MongoDB, PostgreSQL, MySQL       │
│ 3. Server Side - Cache/Queue → Redis, Memcached                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 1. Client Side Storage (Browser Mein)

**Kahan Store Hota Hai:** User ke browser mein
**Kab Use Karein:** User-specific temporary data

#### A. Cookies
```javascript
// Size: 4KB max
// Lifetime: Set kar sakte ho (days, months, years)
// Use: Authentication tokens, preferences

document.cookie = "token=abc123; max-age=86400; path=/";
// Server se set karna (Next.js):
res.setHeader('Set-Cookie', 'token=abc123; HttpOnly; Secure');
```

**Next.js Example:**
```javascript
// next.config.js
export const middleware = (request) => {
  const token = request.cookies.get('auth-token')?.value;
  // Token check karo
};
```

#### B. LocalStorage
```javascript
// Size: 5-10MB (browser dependent)
// Lifetime: Forever (jab tak clear na karo)
// Use: User preferences, cached data, cart items

localStorage.setItem('cart', JSON.stringify([item1, item2]));
const cart = JSON.parse(localStorage.getItem('cart'));
```

**Next.js Example:**
```javascript
// Client component mein
'use client';
import { useEffect, useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);
}
```

#### C. SessionStorage
```javascript
// Size: 5-10MB
// Lifetime: Tab close hote hi delete
// Use: Temporary session data

sessionStorage.setItem('currentPage', 'checkout');
// Tab band kiya → sab delete
```

#### D. IndexedDB
```javascript
// Size: Unlimited (practically)
// Lifetime: Forever
// Use: Large structured data, offline apps

// Example: PWA mein offline data store karna
const db = await indexedDB.open('MyAppDB', 1);
```

---

### 2. Server Side - Permanent Database

**Kahan Store Hota Hai:** Server/Cloud pe
**Kab Use Karein:** Permanent, structured data

#### A. SQL Databases (PostgreSQL, MySQL)
```javascript
// Structured data, relationships
// Use: Users, Orders, Products, Transactions

// Prisma + PostgreSQL example
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// User create karna
const user = await prisma.user.create({
  data: {
    email: 'priya@gmail.com',
    name: 'Priya',
    orders: {
      create: { total: 500, status: 'pending' }
    }
  }
});
```

**Next.js Example:**
```javascript
// app/api/users/route.js
import { prisma } from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}
```

#### B. NoSQL Databases (MongoDB)
```javascript
// Flexible schema, documents
// Use: Logs, analytics, flexible data

// MongoDB + Mongoose example
const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  total: Number,
  status: String
});

const Order = mongoose.model('Order', orderSchema);
await Order.create({ userId: '123', items: [...], total: 500 });
```

**Next.js Example:**
```javascript
// app/api/orders/route.js
import Order from '@/models/Order';

export async function POST(req) {
  const body = await req.json();
  const order = await Order.create(body);
  return Response.json(order);
}
```

---

### 3. Server Side - Cache/Queue (Temporary Fast Storage)

**Kahan Store Hota Hai:** Server/Cloud pe (RAM based)
**Kab Use Karein:** Temporary data, fast access, background jobs

#### A. Redis (In-Memory Data Store)
```
Redis = In-memory key-value database
Speed: RAM based → Milliseconds mein response
Use Cases:
  → Cache (frequently accessed data)
  → Queue (background jobs)
  → Session store
  → Rate limiting
```

**Redis Kya Hai Simple Bhasha Mein:**
```
Normal Database (MongoDB/PostgreSQL):
  → Disk pe store hota hai
  → Slow (milliseconds to seconds)
  → Permanent data ke liye

Redis:
  → RAM mein store hota hai
  → Super fast (microseconds)
  → Temporary data ke liye
  → Restart pe data chala jata hai (unless persisted)
```

**Redis Ke Main Use Cases:**

```javascript
// 1. CACHE - Frequently accessed data
const cachedUser = await redis.get('user:123');
if (!cachedUser) {
  const user = await db.user.findById(123);
  await redis.setex('user:123', 3600, JSON.stringify(user)); // 1 hour cache
}

// 2. QUEUE - Background jobs
await redis.lpush('email-queue', JSON.stringify({
  to: 'user@gmail.com',
  subject: 'Welcome!'
}));
// Worker process karega

// 3. SESSION STORE - User sessions
await redis.setex(`session:${sessionId}`, 86400, userData);

// 4. RATE LIMITING - API calls limit
const count = await redis.incr(`rate:${userId}`);
if (count > 100) {
  // Block user for 1 minute
  await redis.setex(`blocked:${userId}`, 60, 'true');
}
```

**Next.js + Redis Setup:**

```bash
# Install Redis client
npm install redis
# Ya serverless ke liye
npm install @upstash/redis
```

```javascript
// lib/redis.js
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN
});
```

```javascript
// app/api/cache-example/route.js
import { redis } from '@/lib/redis';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Check cache first
  let products = await redis.get('products');
  
  if (!products) {
    // Cache miss - database se lao
    products = await prisma.product.findMany();
    // Cache mein daal do for 5 minutes
    await redis.setex('products', 300, JSON.stringify(products));
  } else {
    // Cache hit - Redis se wapas lao
    products = JSON.parse(products);
  }
  
  return Response.json(products);
}
```

---

### Storage Types Comparison Table

```
┌──────────────────┬─────────────┬──────────────┬─────────────────────┐
│ Storage Type     │ Size Limit  │ Speed        │ Use Case            │
├──────────────────┼─────────────┼──────────────┼─────────────────────┤
│ Cookies          │ 4KB         │ Fast         │ Auth tokens         │
│ LocalStorage     │ 5-10MB      │ Fast         │ User preferences    │
│ SessionStorage   │ 5-10MB      │ Fast         │ Tab session data    │
│ IndexedDB        │ Unlimited   │ Medium       │ Offline data        │
├──────────────────┼─────────────┼──────────────┼─────────────────────┤
│ PostgreSQL       │ Unlimited   │ Medium       │ Structured data     │
│ MongoDB          │ Unlimited   │ Medium       │ Flexible documents  │
│ MySQL            │ Unlimited   │ Medium       │ Traditional apps    │
├──────────────────┼─────────────┼──────────────┼─────────────────────┤
│ Redis            │ RAM limit   │ Super Fast   │ Cache, Queue        │
│ Memcached        │ RAM limit   │ Super Fast   │ Cache only          │
└──────────────────┴─────────────┴──────────────┴─────────────────────┘
```

---

### Next.js Default Setup (Bina Redis Ke)

**Zyadatar Next.js apps shuru mein bina Redis ke chal sakte hain:**

```javascript
// Typical Next.js setup:
// 1. Database: MongoDB/PostgreSQL (Prisma)
// 2. Auth: NextAuth.js (database sessions)
// 3. Cache: Next.js built-in cache (revalidatePath)
// 4. Storage: Vercel Blob / AWS S3 (file uploads)

// Example: Full stack e-commerce without Redis
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  const order = await prisma.order.create({...});
  
  // Email sync bhej do (thoda slow but okay for small apps)
  await sendEmail(order);
  
  return Response.json(order);
}
```

**Kab Redis Add Karein:**

```
✅ Add Redis when:
  → 1000+ daily active users
  → Background jobs needed (email, notifications)
  → High traffic, database pe load kam karna hai
  → Rate limiting chahiye
  → Real-time features (chat, notifications)

❌ Don't need Redis when:
  → < 1000 daily users
  → Simple CRUD app
  → Sab kuch sync kar sakte ho
  → Budget tight hai (Redis managed service costs)
```

---

## Redis Deep Dive

### Redis Data Structures for Queues

```javascript
// 1. LIST - Simple queue (FIFO)
await redis.lpush('queue', 'job1');
await redis.lpush('queue', 'job2');
const job = await redis.rpop('queue'); // job1 milega

// 2. SORTED SET - Priority queue
await redis.zadd('priority-queue', 10, 'high-priority-job');
await redis.zadd('priority-queue', 1, 'low-priority-job');
const job = await redis.zpopmin('priority-queue'); // low priority first

// 3. STREAMS - Event streaming (advanced)
await redis.xadd('events', '*', 'type', 'order', 'id', '123');
const events = await redis.xread({ key: 'events', id: '0' });
```

### Redis Persistence

```javascript
// Redis data RAM mein hota hai, lekin persist bhi kar sakte hain:

// RDB (Snapshot)
// → Periodic snapshots le leta hai
// → Fast recovery
// → Thoda data loss ho sakta hai

// AOF (Append Only File)
// → Har operation log hota hai
// → Zero data loss
// → Slow recovery

// Managed Redis (Upstash, Redis Cloud):
// → Dono RDB + AOF default on
// → Automatic backups
// → No configuration needed
```

---

## Yeh Kyun Chahiye

Priya ne order place kiya:

```
Bina queue:
Order save karo → Email bhejo → Invoice banao → SMS bhejo → Response do
User 5 second wait karta hai → Bad UX

Queue ke saath:
Order save karo → Response do turant → Background mein: email, invoice, SMS
User turant "Order placed!" dekhta hai → Good UX
```

Background jobs ka fayda:
- User ko slow tasks ka wait nahi karna
- Failure pe retry automatic
- Heavy tasks spread out karo

---

## Tools

---

### BullMQ
**Tag: 🟢 Most Popular | Redis-based | Battle-tested**

```
Kya hai: Redis-based job queue — Node.js ke liye most popular
Kab use karo:
  → Self-hosted backend (Express, Fastify, NestJS)
  → Redis already hai ya add kar sakte ho
  → Complex queue logic — priorities, delayed jobs, repeatable jobs

Real app example:
  → Swiggy: Order placed → Queue mein daalo → Worker process kare:
    - Restaurant notification
    - Driver assignment
    - Customer confirmation email
    - Analytics event
  → Zomato: Image processing queue (restaurant photos resize karna)

Code feel:
  // Job add karo (producer)
  const emailQueue = new Queue('emails', { connection: redis })
  await emailQueue.add('order-confirmation', {
    userId: 1, orderId: 123, email: 'priya@gmail.com'
  })

  // Worker — job process karo
  const worker = new Worker('emails', async (job) => {
    await sendOrderConfirmationEmail(job.data)
  }, { connection: redis })

Features:
  → Retry on failure — automatic
  → Delayed jobs — "1 ghante baad reminder bhejo"
  → Repeatable jobs — "Har raat 2 baje report generate karo"
  → Job priorities
  → Concurrency control

Cons:
  → Redis required — extra infra
  → Serverless pe nahi chalta directly

India mein: Production apps mein most common choice
```

---

### Inngest
**Tag: 🟢 Managed | Serverless-friendly | Growing**

```
Kya hai: Managed background job service — serverless mein bhi chalta hai
Kab use karo:
  → Vercel pe deploy kar rahe ho (serverless)
  → Redis manage nahi karna
  → Event-driven workflows

BullMQ se fark:
  → Inngest: Managed service, no Redis needed, serverless-friendly
  → BullMQ: Self-hosted, Redis required, traditional servers

Code feel:
  // Function define karo
  const sendWelcomeEmail = inngest.createFunction(
    { id: 'send-welcome-email' },
    { event: 'user.signup' },
    async ({ event, step }) => {
      await step.run('send-email', async () => {
        await resend.emails.send({ to: event.data.email, ... })
      })
      await step.sleep('wait-1-day', '1d')
      await step.run('send-tips', async () => {
        await resend.emails.send({ to: event.data.email, subject: 'Tips...' })
      })
    }
  )

  // Event trigger karo
  await inngest.send({ name: 'user.signup', data: { email: 'priya@gmail.com' } })

Special:
  → Step functions — multi-step workflows with waits
  → Automatic retry
  → Dashboard for monitoring

Real app example:
  → Vercel pe Next.js + Inngest → Serverless background jobs
  → SaaS onboarding flows (welcome email → day 1 tips → day 7 check-in)

India mein: Growing — especially Vercel users
```

---

### Trigger.dev
**Tag: 🟢 Modern | TypeScript-first | Growing**

```
Kya hai: Background jobs for modern stack — TypeScript-first
Kab use karo:
  → TypeScript project
  → Long-running tasks (minutes ya ghante)
  → AI tasks (LLM calls jo slow hain)

Inngest se fark:
  → Similar concept — dono managed, serverless-friendly
  → Trigger.dev: Better for long-running tasks (minutes/hours)
  → Inngest: Better for event-driven short workflows

Real app example:
  → AI processing jobs (PDF parse karo → AI se summarize karo → Store karo)
  → Data sync jobs

India mein: Growing — AI apps mein popular
```

---

### node-cron
**Tag: 🟢 Simple | Cron jobs | No queue**

```
Kya hai: Cron job scheduler — specific time pe task run karo
Kab use karo:
  → Simple scheduled tasks — queue nahi chahiye
  → "Har raat 12 baje database clean karo"
  → "Har ghante report generate karo"

Cron syntax:
  cron.schedule('0 0 * * *', async () => {
    // Har raat 12 baje
    await cleanExpiredSessions()
  })

  cron.schedule('*/5 * * * *', async () => {
    // Har 5 minute mein
    await syncInventory()
  })

BullMQ se fark:
  → node-cron: Scheduled tasks only (time-based)
  → BullMQ: Queue — event-based, retry, priorities

Cons:
  → Multiple servers → Multiple cron instances → Problem
  → Serverless pe nahi chalta
```

---

### Agenda
**Tag: 🟡 MongoDB-based | Older**

```
Kya hai: MongoDB-based job queue
Kab use karo:
  → MongoDB use kar rahe ho, Redis nahi hai
  → Existing Agenda codebase

BullMQ se kya kharab:
  → MongoDB MongoDB se slow queue operations ke liye
  → BullMQ Redis → Much faster

Status: Maintained lekin BullMQ preferred
```

---

## Quick Decision

```
Serverless (Vercel)?
  → Inngest ya Trigger.dev

Traditional server, Redis available?
  → BullMQ

Simple time-based tasks only?
  → node-cron

Long-running AI/processing tasks?
  → Trigger.dev

MongoDB pe queue chahiye?
  → Agenda (lekin Redis add karo BullMQ ke liye)
```

---

## ShopKaro Mein Kab Use Karein

```
V1 mein: Queue ki zaroorat nahi
  → Email bhejhna sync kar sakte hain (thoda slow but okay)

V2 mein (zyada users):
  → BullMQ (self-hosted) ya Inngest (Vercel)
  → Order placed → Queue → Email, notification, analytics

Jobs jo queue mein jaayenge:
  → Order confirmation email
  → Low stock alert (admin ko)
  → Invoice PDF generate karna
  → Payment failure retry notification
```

---

## Agla Doc

`13-backend-storage.md` — File Upload + Storage — Cloudinary, S3, Uploadthing — ShopKaro ka product image upload, Swiggy ka restaurant photo kahan store hota hai.
