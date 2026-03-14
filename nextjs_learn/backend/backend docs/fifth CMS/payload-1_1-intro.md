# Phase 1.1 — Payload CMS Kya Hai?

## Pichle Kaam Se Aage

Drizzle ke saath poora Todo App bana liya —

```
db/schema.ts           ← table define ki
db/index.ts            ← database connect kiya
app/api/todos/route.ts ← GET, POST routes khud likhe
app/page.tsx           ← frontend khud banaya
```

Har cheez manually — schema, routes, sab.

Ab Payload CMS seekhenge — aur pehla sawal yahi hai —

---

## Coder Ki Soch

> *"CMS matlab Content Management System — yeh toh WordPress jaisa hoga? Kya main WordPress pe jaake Todo banaunga?"*

Nahi yaar — Payload bilkul alag hai.

WordPress ek **traditional CMS** hai — GUI pe click karo, content daalo, themes lagao — developer ke liye flexible nahi.

Payload ek **Code-First Headless CMS** hai — matlab:

```
Code-First  → tu code mein sab define karta hai — GUI nahi
Headless    → sirf backend + API — frontend tu khud banata hai
```

---

## Toh Payload Kya Karta Hai?

Ek example se samjhte hain.

Drizzle mein Todo App banate waqt kitna kaam kiya:

```
1. Schema likha         — db/schema.ts
2. Connection banaya    — db/index.ts
3. GET route likha      — SELECT * FROM todos
4. POST route likha     — INSERT INTO todos
5. PATCH route likha    — UPDATE todos SET...
6. DELETE route likha   — DELETE FROM todos
7. Frontend banaya      — states, fetchTodos, JSX
```

Payload mein kya hoga:

```
1. Collection define karo   — bas ek config file
2. ...                      — bas itna
   Payload khud banata hai:
   ✅ GET /api/todos
   ✅ POST /api/todos
   ✅ PATCH /api/todos/:id
   ✅ DELETE /api/todos/:id
   ✅ Admin Panel — GUI se data manage karo
3. Frontend banao            — states, fetchTodos, JSX
```

> *"Matlab routes khud nahi likhne — Payload ne bana diye automatically?"*

Bilkul. Collection define karo — baaki Payload ka kaam.

---

## Admin Panel Kya Hota Hai?

Drizzle mein data daalne ke liye SQL Editor use kiya tha — Neon Dashboard pe jaana pada.

Payload mein — project chalao — `localhost:3000/admin` kholo:

```
┌─────────────────────────────┐
│  Payload Admin Panel        │
│                             │
│  Collections:               │
│  → Todos                    │
│                             │
│  [Add New Todo]             │
│  Title: ____________        │
│  Done:  [ ] false           │
│  [Save]                     │
└─────────────────────────────┘
```

GUI se seedha data daalo — koi SQL nahi — koi Prisma Studio alag se nahi — built-in hai.

---

## Next.js Kahaan Hai?

> *"Yaar toh Payload mein Next.js gaya kya? Main toh Next.js pe hi kaam karna chahta hun."*

Payload **Next.js ke andar hi hota hai** —

```
create-payload-app → Next.js project banta hai
                     + Payload uske upar
```

Ek hi command se dono chalte hain:

```bash
bun dev
# ya
npm run dev
```

```
localhost:3000        ← Next.js frontend — same as always
localhost:3000/admin  ← Payload Admin Panel — free bonus
```

Tera `page.tsx`, `fetchTodos`, states — sab same rahega.

---

## Ek Line Mein Fark

```
Drizzle  → tu sab banata hai — schema, routes, sab manually
Payload  → tu collection define karta hai — routes Payload banata hai
```

---

## Aaj Ka Summary

✅ Payload — Code-First Headless CMS — WordPress nahi  
✅ Collection define karo — GET/POST/PATCH/DELETE routes auto  
✅ Admin Panel built-in — `localhost:3000/admin`  
✅ Next.js andar hi hai — same `page.tsx`, same frontend  
✅ Drizzle mein routes khud likhe — Payload mein auto milte hain  

---

## Agla Step

**Phase 1.2** — Project banayenge — `npx create-payload-app` — kya kya files banti hain dekhenge! 📁
