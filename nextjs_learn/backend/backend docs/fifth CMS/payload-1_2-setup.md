# Phase 1.2 — Project Banao — `create-payload-app`

## Pichle Doc Se Aage

1.1 mein:
- Payload kya hai samjha
- Routes auto milte hain — Admin Panel built-in
- Next.js andar hi hai

Ab project banate hain.

---

## Coder Ki Soch

> *"Drizzle mein `create-next-app` se project banaya tha — phir manually packages install kiye. Payload mein kya hoga?"*

Payload ka apna CLI hai — ek command mein sab set ho jaata hai.

---

## Command Chalao

```bash
npx create-payload-app@latest
```

Kuch questions poochega — yeh select karo:

```
Project name:        todo-payload
Template:            blank
Database:            PostgreSQL
```

**Template `blank` kyun?**

Payload mein kuch pre-made templates hain — blog, ecommerce. Hum scratch se banayenge — `blank` lo.

**Database PostgreSQL kyun?**

Drizzle wala Neon same use karenge — familiar hai.

Install hone do — thoda time lagega.

---

## Project Folder Mein Jao

```bash
cd todo-payload
```

---

## Structure Dekho

```
todo-payload/
├── src/
│   ├── app/                    ← Next.js — same as always
│   │   ├── (frontend)/
│   │   │   └── page.tsx        ← tera frontend yahan
│   │   └── (payload)/
│   │       └── admin/          ← Admin Panel — Payload ka
│   ├── collections/            ← naya — yahan collections define honge
│   └── payload.config.ts       ← Payload ki main config
├── .env
└── package.json
```

> *"Itne folders — Drizzle mein toh simple tha — `app/`, `db/`. Yahan `(frontend)`, `(payload)` — yeh kya hai?"*

Yeh **Next.js Route Groups** hain — brackets wale folders URL mein nahi aate — sirf organize karne ke liye:

```
(frontend) → localhost:3000/       ← tera page
(payload)  → localhost:3000/admin  ← admin panel
```

Dono alag alag — par ek hi Next.js app mein.

---

## `.env` File — Database URL Daalo

`.env` file mein yeh hoga:

```
DATABASE_URI=
PAYLOAD_SECRET=
```

**`DATABASE_URI`** — Neon connection string — same jo Drizzle mein use ki thi:

```
DATABASE_URI=postgresql://username:password@ep-something.neon.tech/neondb?sslmode=require
```

**`PAYLOAD_SECRET`** — koi bhi random string — Admin Panel ke liye security:

```
PAYLOAD_SECRET=kuch-bhi-likho-yahan-lamba-sa
```

---

## `payload.config.ts` — Ek Nazar

```ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  collections: [],    // ← yahan collections aayenge
  secret: process.env.PAYLOAD_SECRET,
})
```

**`buildConfig`** — Payload ki main config function.

**`postgresAdapter`** — PostgreSQL ke liye adapter — Neon connection string yahan jaati hai.

**`collections: []`** — abhi khaali — Todo collection yahan add karenge.

> *"Drizzle mein `db/index.ts` mein connection string pass ki thi — yahan `payload.config.ts` mein ho raha hai — same idea alag jagah."*

Bilkul.

---

## Pehli Baar Chalao

```bash
bun dev
# ya
npm run dev
```

Browser mein jao:

```
localhost:3000/admin
```

Pehli baar Admin Panel setup karega — email aur password maangega — **apna account banao**:

```
Email:    tum@example.com
Password: kuch-bhi-strong
```

Login karo — Admin Panel dikh jaayega — abhi khaali hai — koi collection nahi.

---

## Abhi Tak Structure:

```
todo-payload/
├── src/
│   ├── app/
│   │   ├── (frontend)/
│   │   │   └── page.tsx     ← yahan frontend banayenge
│   │   └── (payload)/
│   │       └── admin/       ← Admin Panel — already chal raha hai
│   ├── collections/         ← abhi khaali
│   └── payload.config.ts    ← database connected
├── .env                     ← DATABASE_URI + PAYLOAD_SECRET
└── package.json
```

---

## Aaj Ka Summary

✅ `npx create-payload-app` — project ready  
✅ `(frontend)` aur `(payload)` — Route Groups — URL mein nahi aate  
✅ `.env` — `DATABASE_URI` Neon se — `PAYLOAD_SECRET` random string  
✅ `payload.config.ts` — main config — database connection yahan  
✅ `localhost:3000/admin` — Admin Panel chal raha hai  

---

## Agla Step

**Phase 1.3** — Todos Collection banayenge — Drizzle ke `pgTable` jaisi — fields define karenge! 📝
