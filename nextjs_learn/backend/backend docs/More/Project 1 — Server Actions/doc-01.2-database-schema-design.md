# Doc 1.2 — Database Schema Design (Todo Model) 🗄️

## Pehle Problem Samjho — Bina Schema Ke Kya Hoga?

Chalo ek scenario socho.

Tumne project setup kar liya (Doc 1.1). Ab socha "Database mein todo ka data store karna hai."

Ab **kaun decide karega ki database mein kya fields honge?**
**Kaise pata chalega ki todo kaun sa hai?**
**Kaise pata chalega ki todo complete hua ya nahi?**

Sab kuch manually karna padega — aur yeh bahut confusing hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message ka structure nahi hota, kaise pata chalega ki kaun message kisne bheja?
- **Instagram** — agar post ka structure nahi hota, kaise pata chalega ki kaun post kisne kiya?
- **Amazon** — agar product ka structure nahi hota, kaise pata chalega ki kaun product kis category mein aata hai?

---

## Database Schema Kya Hota Hai? (Real Life Analogy)

Schema ek **blueprint** jaisa hai:

| Building Construction | Database Development |
|----------------------|---------------------|
| Building Plan        | Schema              |
| Rooms ka layout      | Tables ka structure |
| Door, window ka size | Fields ka datatype  |
| Material specification | Validation rules |

Agar building ka plan nahi hai, construction kaise hoga? Isliye pehle schema design karte hain.

---

## Hum Kya Design Karenge?

Hum ek **Todo model** design karenge jisme:

1. **id** - Unique identifier (har todo ka alag ID)
2. **title** - Todo ka title (kya karna hai)
3. **done** - Status (complete hua ya nahi)
4. **createdAt** - Creation time (kab banaya)

---

## Step 1: Schema.prisma File Edit Karo

Ab schema.prisma file edit karte hain:

```prisma
// Pehle kaam karo
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// "Ab model define karna hai — iske liye Prisma ki syntax chahiye"
model Todo {
  id        String   @id @default(cuid())
  title     String
  done      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

**Kyun yeh structure?**
- **id** - Har todo ka unique identifier (cuid() se automatically generate hota hai)
- **title** - String type (text data)
- **done** - Boolean type (true/false)
- **createdAt** - DateTime type (timestamp)

---

## Step 2: Prisma Migrate Run Karo

Ab database mein yeh schema apply karte hain:

```bash
npx prisma migrate dev --name init
```

Yeh command kya karta hai:
- Creates database table
- Applies schema changes
- Creates migration files

---

## Step 3: Prisma Client Generate Karo

Ab Prisma client generate karte hain:

```bash
npx prisma generate
```

Yeh command kya karta hai:
- Creates @prisma/client
- Generates TypeScript types
- Ready karta hai database se interact karne ke liye

---

## Step 4: Schema Samjho

Ab humara schema ready hai. Socho:

```prisma
model Todo {
  id        String   @id @default(cuid())
  title     String
  done      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

**Har field ka matlab:**
- **id** - Unique ID (cuid() se automatically generate hota hai)
- **title** - Todo ka title (String type)
- **done** - Complete hua ya nahi (Boolean type, default false)
- **createdAt** - Kab banaya (DateTime type, default abhi ka time)

---

## Summary — Doc 1.2 Mein Kya Sikha

✅ **Problem** - Bina schema ke database structure kaise decide hoga?
✅ **Schema ka importance** - Building plan jaisa, construction ke liye zaroori
✅ **Todo model** - id, title, done, createdAt fields
✅ **Prisma syntax** - Kaise model define karte hain
✅ **Migrate & generate** - Database mein apply karna aur client ready karna

---

## Agla Step — Doc 1.3

**Doc 1.3: Prisma Client Setup**

Abhi humne schema design kiya. Lekin database se kaise baat karenge? Kaise data fetch karenge? Woh samjhenge agle doc mein. 🚀