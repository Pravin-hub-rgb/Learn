# 15 — NoSQL Databases: MongoDB, Redis, DynamoDB, Firestore

> Umbrella: Database → NoSQL
> Kaam: Flexible document storage, caching, key-value — SQL ki rigidity nahi chahiye

---

### MongoDB
**Tag: 🟢 Most Popular NoSQL | Document database**

```
Kya hai: Document-based database — JSON-like documents
Kab use karo:
  → Schema frequently change hota ho
  → Nested/flexible data — product catalog with varying attributes
  → Content management systems
  → User activity logs

SQL se kab prefer:
  → Product catalog: Ek shoe ka size/color hai, ek laptop ka RAM/processor → Varying fields
  → CMS: Har article ka structure alag ho sakta hai
  → Social media posts: Varying content types

Real app example:
  → MongoDB Atlas Search (Zomato type search)
  → Content platforms — Medium jaisi
  → Gaming leaderboards

ShopKaro mein: PostgreSQL better hai — lekin user activity/analytics ke liye MongoDB
India mein: Bootcamp popular (MERN stack) — production mein PostgreSQL shift ho raha hai
```

---

### Redis
**Tag: 🟢 Cache Standard | Sessions | Queues**

```
Kya hai: In-memory key-value store — ultra fast
Kab use karo: (Multiple use cases)
  → Cache: Database results store karo — baar baar DB mat kholo
  → Sessions: User sessions store karo (fast access)
  → Queue: BullMQ ke liye backend
  → Rate limiting: "10 requests per minute per IP"
  → Pub/Sub: Simple real-time

Database nahi hai Redis — cache aur temporary data ke liye

Real app example:
  → Swiggy: Restaurant list cache — har request pe DB mat kholo
  → Zomato: Rate limiting — ek user baar baar API na kar sake
  → BullMQ: Redis pe queues

India mein: Production apps mein almost always — DB ke saath
```

---

### Firestore / Firebase
**Tag: 🟢 Google | Real-time | Mobile-first**

```
Kya hai: Google ka NoSQL cloud database — real-time sync built-in
Kab use karo:
  → Mobile apps (React Native) — Firebase SDK mature hai
  → Real-time sync chahiye (without Socket.io)
  → Google ecosystem
  → Quick MVP — backend code minimum

Supabase se fark:
  → Firebase: Proprietary, Google, NoSQL
  → Supabase: Open-source, PostgreSQL, SQL

Real app example:
  → Many Indian mobile apps (early stage startups)
  → Chat apps — real-time sync built-in

India mein: Mobile apps mein popular — Supabase se competition growing
```

---

### DynamoDB
**Tag: 🟢 AWS | Infinite Scale | Complex**

```
Kya hai: AWS ka managed NoSQL — extreme scale ke liye
Kab use karo:
  → AWS ecosystem mein pehle se ho
  → Millions of users, extreme scale
  → Serverless (Lambda + DynamoDB combo)

Complex: Data modeling DynamoDB mein bahut different hai — learning curve high
India mein: Large companies jo AWS pe hain (Flipkart type)
```

---

## Agla Doc

`16-database-search.md` mein search databases cover hain — Algolia, Elasticsearch, Typesense.