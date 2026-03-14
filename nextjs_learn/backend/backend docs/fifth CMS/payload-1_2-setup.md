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

**Database PostgreSQL select karne ke baad, setup tumse database connection string maangega. Agar tumne Neon setup kiya hai, toh wahan pe woh connection string paste karo. Agar nahi kiya hai, toh default template string hi use kar sakte ho.**

**Recommendation:** Agar pehle kisi aur project (jaise drizzle) ke liye Neon database use kiya hai, toh Payload ke liye **alag database** banao. Same database use karne se tables conflict ho sakte hain aur Admin Panel properly nahi khulega. Fresh setup ke liye new database + fresh project best hai.

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

**Note:** Agar installation time pe database connection string nahi daali gayi ho, toh yahan pe manually apni Neon database ki connection string paste karo.

**`PAYLOAD_SECRET`** — koi bhi random string — Admin Panel ke liye security:

```
PAYLOAD_SECRET=kuch-bhi-likho-yahan-lamba-sa
```

---

## `payload.config.ts` — Payload ki Setting File

Ye file Payload CMS ki setting define karti hai — jaise Drizzle mein `db/index.ts` database connection karti thi.

### Collection Kya Hota Hai?

**Collection** — Payload ka table hai. Drizzle mein hum `pgTable` se table banate the, Payload mein hum `CollectionConfig` se collection banate hain.

**Example:**
```ts
// Drizzle mein table banate the
export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  done: boolean('done').default(false),
})

// Payload mein collection banate hain
export const Todos: CollectionConfig = {
  slug: 'todos',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'done', type: 'checkbox', defaultValue: false },
  ],
}
```

### Default Setup — Users aur Media

Jab bhi koi Payload project create karta hai, toh ye **default collections** aate hain:

1. **Users Collection** — Admin Panel mein login karne ke liye
   - Jab aapne `localhost:3000/admin` pe email aur password daala, toh ye Users table mein save hua
   - Ye Payload ka built-in hai — remove nahi karna chahiye (login ke liye chahiye)

2. **Media Collection** — Files aur images upload karne ke liye
   - Todo app ke liye iski zaroorat nahi hai
   - Isko ignore kar sakte hain ya remove kar sakte hain

### Todo App Ke Liye Kya Karna Hai?

Hum Todo app banane wale hain, isliye:

1. **Users collection ko chhod dena** — login ke liye chahiye
2. **Media collection ko ignore karna** — hume iski zaroorat nahi
3. **Apna Todo collection banana** — 1.3 mein

### Code Update — Todo App Ke Liye

```ts
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Default collections ko import karna (Users aur Media dono chahiye)
import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,  // ← Users collection se login hoga
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],  // ← Todo collection 1.3 mein add karenge
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
```

**Har Line Ka Matlab (Simple):**

- `buildConfig` — Payload ki main setting function
- `admin` — Admin Panel ki setting (kaun login kar sakta hai)
- `collections: [Users, Media]` — Default collections (Todo 1.3 mein add karenge)
- `editor: lexicalEditor()` — Text editor (jaise rich text editor)
- `secret` — Security ke liye password
- `typescript` — TypeScript types generate karne ki setting
- `db: postgresAdapter` — Database connection (PostgreSQL)
- `sharp` — Image processing ke liye
- `plugins: []` — Extra features add karne ke liye (abhi khaali)

> *"Drizzle mein `db/index.ts` mein connection string pass ki thi — yahan `payload.config.ts` mein ho raha hai — same idea alag jagah."*

Bilkul.

### Agla Step — 1.3 Mein

**Phase 1.3** — Hum apna **Todo collection** banayenge aur `payload.config.ts` mein add karenge:

```ts
collections: [Users, Media, Todo],  // ← Todo collection 1.3 mein add karenge
```

Abhi ke liye default setup maintain karo — Users aur Media ke saath!

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
