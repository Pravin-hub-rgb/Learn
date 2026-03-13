# Phase 2.1 — PostgreSQL, Neon, Aur Setup

## Phase 1 Khatam — Ab Kya?

Phase 1 mein sirf **SQL language seekhi** — Neon ke SQL Editor mein seedha queries likhi:

```
CREATE TABLE → INSERT → SELECT → UPDATE → DELETE
```

Yeh sirf practice thi — jaise driving seekhne se pehle traffic rules padhte hain.

Ab asli gaadi chalani hai — **Next.js app mein PostgreSQL use karna hai.**

---

## Pehle Samjho — PostgreSQL Kya Hai?

Phase 1 mein SQL seekhi — par yeh kabhi explain nahi hua ki hum PostgreSQL kyun use kar rahe hain.

**PostgreSQL ek database hai** — data store karne ke liye — bilkul MongoDB ki tarah.

Toh fark kya hai?

```
MongoDB     → documents store karta hai — { title: "Homework", done: false }
PostgreSQL  → tables mein store karta hai — rows aur columns — Excel ki tarah
```

Dono databases hain — dono data store karte hain — bas structure alag hai.

Humne pehle MongoDB seekha — ab PostgreSQL seekh rahe hain — kyunki duniya mein bahut saari companies PostgreSQL use karti hain — dono aana chahiye.

---

## Ab Neon Kya Hai?

PostgreSQL ek software hai — seedha cloud pe nahi milta.

Matlab — agar tu PostgreSQL use karna chahta hai — toh ya toh **apne computer pe install kar** — ya koi **cloud service use kar** jo PostgreSQL host kare.

Apne computer pe install karna beginner ke liye complicated hai — local setup, ports, config — sab manually karna padta hai.

**Neon** — ek cloud service hai — jo PostgreSQL host karti hai:

```
MongoDB    →   Atlas   (cloud pe MongoDB deta hai)
PostgreSQL →   Neon    (cloud pe PostgreSQL deta hai)
```

Bilkul Atlas jaisa — tu Neon pe jaata hai — account banata hai — woh ek PostgreSQL database deta hai — tu connect karta hai. Apne computer pe kuch install nahi karna.

**Phase 1 mein Neon account ban chuka tha** — `neondb` database mila tha — wahi use karenge aage bhi.

---

## Next.js Project Banao

Agar pehle se project hai toh wahi use karo.

Naya banana ho toh:

```bash
npx create-next-app@latest todo-drizzle
```

```
TypeScript? Yes
Tailwind?   Yes
App Router? Yes
Baaki sab — default
```

---

## Ab Socho — Next.js Neon Se Baat Kaise Karega?

Next.js app ek jagah hai — Neon ka database cloud pe alag jagah hai.

Dono ko milana hai — iske liye **connection string** chahiye — ek address jisme likha hota hai:

```
kaunsa database + username + password + server kahan hai
```

MongoDB wali yaad hai?

```
mongodb+srv://pravin:abc123@cluster0.mongodb.net/tododb
```

Neon wali bhi aisi hi hoti hai:

```
postgresql://pravin:abc123@ep-xyz.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

Har part ka matlab:

```
postgresql://       ← "PostgreSQL se connect karo" — jaise https:// websites ke liye
pravin              ← username
:abc123             ← password
@                   ← "is server pe"
ep-xyz...neon.tech  ← Neon ka server address
/neondb             ← database ka naam
?sslmode=require    ← "secure connection use karo"
```

---

## Connection String Kahan Se Milegi?

Neon dashboard pe jao — left sidebar mein **"Dashboard"** click karo — **"Connection string"** section milega — **"Copy"** button dabao.

---

## Connection String `.env.local` Mein Rakho

Connection string mein password hota hai — seedha code mein nahi likhte — GitHub pe push ho jaayega.

MongoDB mein `MONGODB_URI` naam rakha tha — Drizzle community mein convention `DATABASE_URL` hai:

```
DATABASE_URL=postgresql://username:password@ep-xyz.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

Project root mein `.env.local` file hai — wahan add karo.

---

## Packages Install Karo

Next.js ko Neon se baat karni hai — queries likhni hain — iske liye teen packages chahiye.

Pehle install karo — phir ek ek explain karte hain:

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

---

**`drizzle-orm` kya hai?**

Seedha SQL string likhne ki problem hai:

```ts
// Yeh ek string hai — TypeScript ko pata nahi andar kya hai
"SELECT * FORM todos"
//         ↑ typo — FORM nahi FROM — yeh error tab milega jab user app use karega
```

`drizzle-orm` se TypeScript mein queries likhte hain:

```ts
db.select().from(todos)
//          ↑ typo kiya toh VS Code turant red underline — pehle hi pata chal jaayega
```

Yeh **ORM** hai — Object Relational Mapper:

```
O — Object    → TypeScript objects — { title: 'Homework', done: false }
R — Relational → PostgreSQL — tables, rows, columns
M — Mapper    → dono ke beech convert karta hai
```

Mongoose MongoDB ke liye tha — Drizzle PostgreSQL ke liye hai.

---

**`@neondatabase/serverless` kya hai?**

`drizzle-orm` akela Neon se connect nahi kar sakta — use ek bridge chahiye.

Yeh package woh bridge hai — Neon ka official connector.

**Serverless matlab kya?**

MongoDB mein permanent connection banana padta tha — `readyState` check karna padta tha — "pehle se connection open hai kya?"

Neon serverless hai — har query pe automatically fresh connection banta hai — automatically band hota hai — tu manually kuch nahi karta. Isliye MongoDB jaisa `readyState` check nahi karna padta.

---

**`drizzle-kit` kya hai?**

Yeh app ke andar kaam nahi karta — **development tool** hai — terminal mein commands chalate hain isse.

Iska kaam — TypeScript mein jo schema likhenge — usse dekh ke Neon mein table banana.

`-D` flag — sirf development mein chahiye — production mein nahi jaayega.

---

## Abhi Tak Project Structure

```
todo-drizzle/
├── app/
│   └── page.tsx
├── .env.local          ← DATABASE_URL add ki ✅
└── package.json        ← teen packages install hue ✅
```

---

## Aaj Ka Summary

✅ PostgreSQL — table wala database — MongoDB se fark sirf structure ka  
✅ Neon — PostgreSQL ko cloud pe host karta hai — Atlas jaisa MongoDB ke liye tha  
✅ Connection string — Neon Dashboard se copy ki — `.env.local` mein rakhi  
✅ `DATABASE_URL` — Drizzle ka convention  
✅ `drizzle-orm` — TypeScript mein queries — Mongoose jaisa  
✅ `@neondatabase/serverless` — Neon ka bridge — serverless matlab auto connection  
✅ `drizzle-kit` — dev tool — tables banata hai — `-D` flag  

---

## Agla Step

**Phase 2.2** — Pehla kaam schema banana hai — `db/schema.ts` — Todo table TypeScript mein define karenge — kyunki connection file ko schema chahiye hoga! 📋
