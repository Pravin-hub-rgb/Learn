# 09 — ORMs: Prisma, Drizzle, Sequelize, TypeORM, Mongoose

> Umbrella: Backend → ORM (Object Relational Mapper)
> Kaam: Database se JavaScript mein baat karna — SQL likhne ki zaroorat nahi
> ShopKaro docs mein: Doc 21 mein Prisma cover hua

---

## ORM Kyun Use Karte Hain

```
Raw SQL:
  SELECT u.name, o.id, o.total
  FROM users u
  JOIN orders o ON u.id = o.userId
  WHERE u.id = 1 AND o.status = 'paid'

Prisma (ORM):
  prisma.order.findMany({
    where: { userId: 1, status: 'PAID' },
    include: { user: true }
  })

ORM advantages:
  → JavaScript/TypeScript mein likhna
  → Auto-complete, type safety
  → Database switch karna easier
  → Migrations manage karna
```

---

## Tools

---

### Prisma
**Tag: 🟢 Most Popular 2024 | TypeScript-first | Recommended**

```
Kya hai: Next-generation ORM — schema-first, TypeScript-first
Kab use karo:
  → TypeScript project (Next.js, NestJS)
  → PostgreSQL ya MySQL ya SQLite
  → ShopKaro jaisa app — almost always

Real app example:
  → ShopKaro: User, Product, Order, Cart tables
  → Naye Indian startups ka majority
  → Vercel, Supabase examples — Prisma use karte hain

Unique features:
  → Schema se types automatically generate hoti hain
  → Prisma Studio — visual database browser
  → Migrations built-in

Code feel:
  // Schema define karo
  model User {
    id    Int    @id @default(autoincrement())
    email String @unique
    name  String?
  }

  // Query karo — fully typed
  const user = await prisma.user.findUnique({
    where: { email: 'priya@gmail.com' }
  })
  // user.email → TypeScript jaanta hai yeh string hai

Cons:
  → Complex queries mein verbose
  → Raw SQL zyada efficient kabhi kabhi
  → Bundle size (Prisma Client bada hai)

India mein: 2022 ke baad rapidly adopted — especially Next.js projects
```

---

### Drizzle
**Tag: 🟢 Growing Fast | Lightweight | SQL-like syntax**

```
Kya hai: TypeScript ORM — SQL jaisi syntax, lightweight
Kab use karo:
  → Prisma se alag feel chahiye
  → SQL comfort hai — Drizzle mein SQL expressions likhte ho
  → Edge environments (Cloudflare Workers) — Prisma wahan nahi chalta
  → Bundle size critical

Prisma se fark:
  → Drizzle: SQL-like syntax — SELECT, WHERE expressions
  → Prisma: Higher-level abstraction
  → Drizzle: Edge-ready (Cloudflare Workers)
  → Prisma: Not edge-compatible (yet)
  → Drizzle: Chhota bundle

Code feel:
  // Schema
  const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
  })

  // Query — SQL-like
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, 'priya@gmail.com'))

India mein: Growing — especially Hono + Cloudflare Workers combo mein
Trend: 2024 mein Prisma vs Drizzle debate growing hai
```

---

### Sequelize
**Tag: 🟡 Legacy | Was popular 2016-2021**

```
Kya hai: Oldest popular Node.js ORM
Kab use karo:
  → Existing Sequelize codebase
  → Naye projects mein avoid

Prisma se kya kharab:
  → TypeScript support poor (afterthought tha)
  → Complex queries bahut verbose
  → Migration system clunky

India mein: Purane projects mein bahut milega (bootcamp era)
```

---

### TypeORM
**Tag: 🟡 NestJS common | Decorator-based**

```
Kya hai: Decorator-based ORM — NestJS ke saath commonly used
Kab use karo:
  → NestJS project hai (common pair)
  → Active Record ya Data Mapper pattern chahiye
  → Existing TypeORM codebase

NestJS ke bahar:
  → Drizzle ya Prisma prefer karo

Code feel:
  @Entity()
  class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string
  }

India mein: NestJS ke saath enterprise projects mein
```

---

### Mongoose
**Tag: 🟢 MongoDB Standard | Almost required for MongoDB**

```
Kya hai: MongoDB ke liye ODM (Object Document Mapper) — ORM ka NoSQL equivalent
Kab use karo:
  → MongoDB use kar rahe ho → Almost always Mongoose

MongoDB raw driver use karna complex hai — Mongoose simplify karta hai

Code feel:
  const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: String
  })
  const User = model('User', userSchema)

  const user = await User.findOne({ email: 'priya@gmail.com' })

Prisma se fark:
  → Mongoose: MongoDB only
  → Prisma: PostgreSQL, MySQL, MongoDB (beta) — multi-DB

India mein: MongoDB use karne waale projects mein standard
```

---

### Kysely
**Tag: 🔵 SQL Query Builder | Type-safe | Not full ORM**

```
Kya hai: Type-safe SQL query builder — ORM nahi, raw SQL helper
Kab use karo:
  → Full ORM nahi chahiye — SQL control chahiye
  → Complex queries jahan ORM abstract karta hai too much
  → Drizzle jaisa lekin different API

Code feel:
  const result = await db
    .selectFrom('users')
    .where('email', '=', 'priya@gmail.com')
    .selectAll()
    .executeTakeFirst()
```

---

## Quick Decision

```
PostgreSQL/MySQL, TypeScript project?
  → Prisma (default choice)

Edge environment (Cloudflare Workers)?
  → Drizzle (Prisma edge nahi chalti)

NestJS project?
  → TypeORM ya Prisma (dono common)

MongoDB?
  → Mongoose

SQL comfort hai, full ORM nahi chahiye?
  → Drizzle ya Kysely

Existing codebase?
  → Jo hai wahi — rewrite nahi
```

---

## India Mein Reality

```
Next.js startups (2024):   Prisma (strong preference)
NestJS enterprise:         TypeORM ya Prisma
MongoDB projects:          Mongoose
Edge/Cloudflare:           Drizzle
Purane projects:           Sequelize (milega bahut)
Learning:                  Prisma (best docs, easiest start)
```

---

## Agla Doc

`10-backend-realtime.md` — Real-time tools — Socket.io, Pusher, SSE — Swiggy ka live order tracking, Ola ka driver location update kaise hota hai.
