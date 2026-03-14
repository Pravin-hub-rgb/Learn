# Phase 2.1 — Database Mein Table Banao — `prisma migrate dev`

## Pichle Doc Se Aage

1.3 mein:
- `schema.prisma` mein `Todo` model likha
- Types samjhe — `Int`, `String`, `Boolean`

Ab yeh model database mein actually banana hai — table banni chahiye Neon mein.

---

## Coder Ki Soch

> *"Drizzle mein `npx drizzle-kit push` chalaya tha — schema se seedha table ban gayi thi Neon mein. Prisma mein kya hoga? Koi similar command hoga?"*

Haan — par thoda alag — `prisma migrate dev`.

Par pehle samjho — **migration kya hoti hai** — push se kaise alag hai.

---

## Push vs Migrate — Fark Kya Hai?

### Drizzle ka `push`

```bash
npx drizzle-kit push
```

Seedha schema dekha — database update kar diya — **koi record nahi rakha** ki kya changes hue.

Soch aise — ghar mein painting karni hai — seedha kar di — kisi ko nahi bataya — koi note nahi rakha.

### Prisma ka `migrate`

```bash
npx prisma migrate dev --name init
```

Schema dekha — changes calculate kiye — **ek SQL file banayi** — phir database update kiya.

Soch aise — ghar mein painting karni hai — pehle ek paper pe likha "aaj painting ki, yeh yeh badla" — phir kiya — record raha hamesha ke liye.

---

## Migration File Kya Hoti Hai?

`prisma migrate dev` ke baad ek naya folder banega:

```
prisma/
├── schema.prisma
└── migrations/
    └── 20240101_init/
        └── migration.sql    ← yeh bani
```

`migration.sql` ke andar actual SQL hogi:

```sql
CREATE TABLE "Todo" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "done" BOOLEAN NOT NULL DEFAULT false
);
```

Prisma ne yeh SQL khud likhi — schema dekh ke — tu nahi likha.

> *"Par yeh file kisi kaam ki hai? Mujhe toh bas table chahiye."*

Bahut kaam ki hai — team mein kaam karte waqt ya production mein:

```
Aaj: Table banayi      → migration 1
Kal: Column add kiya   → migration 2
Parso: Index lagaya    → migration 3
```

Koi bhi naya developer project join kare — `prisma migrate dev` chalaye — saari migrations ek ek karke chalein — uska database exactly same ho jaayega tera jaisa. History rehti hai.

Drizzle `push` mein yeh nahi hota — seedha overwrite.

---

## Command Chalao

```bash
npx prisma migrate dev --name init
```

**`--name init`** — is migration ka naam — tujhe meaningful naam dena hai — pehli migration hai toh `init`.

Yeh command teen kaam karta hai:

```
1. Schema.prisma padha
2. SQL generate ki — migrations/ folder mein save ki
3. Neon mein table banaayi
```

Output aayega:

```
✔ Generated Prisma Client
✔ Your database is now in sync with your Prisma schema.
```

---

## Ek Bonus — Prisma Client Bhi Generate Hua

Notice karo — output mein `Generated Prisma Client` tha.

> *"Yeh client kya hai?"*

Jab tu `schema.prisma` mein `Todo` model likhta hai — Prisma us model ke hisaab se **TypeScript types aur functions** generate karta hai — automatically.

Iska matlab — `prisma.todo.findMany()` likhega — TypeScript ko pata hoga `todo` kya hai — fields kya hain — sab kuch. Tu manually `interface Todo` nahi likhta — Prisma ne kar diya.

Yeh files `node_modules/@prisma/client` mein hain — dikhti nahi — par kaam karti hain.

---

## Neon Mein Verify Karo

Neon Dashboard → SQL Editor:

```sql
SELECT * FROM "Todo";
```

```
id | title | done
---+-------+------
(0 rows)
```

Table ban gayi — abhi khaali hai. ✅

> *"Inverted commas kyun — `"Todo"` — Drizzle mein toh `drizzle_todos` seedha tha?"*

Prisma model naam `Todo` (capital) se table banaata hai — PostgreSQL mein case-sensitive names ke liye double quotes chahiye. Drizzle mein lowercase tha toh quotes nahi lage.

---

## Aaj Ka Summary

✅ `prisma migrate dev --name init` — schema se table banayi  
✅ Migration file — `prisma/migrations/` mein SQL save hoti hai  
✅ Push vs Migrate — push seedha karta hai, migrate record rakhta hai  
✅ Prisma Client auto-generate hua — types aur functions ready  
✅ Table naam `"Todo"` — capital — PostgreSQL mein quotes chahiye  

---

## Agla Step

**Phase 2.2** — `lib/prisma.ts` banayenge — PrismaClient connect karenge — Drizzle ke `db/index.ts` se compare karenge! 🔌
