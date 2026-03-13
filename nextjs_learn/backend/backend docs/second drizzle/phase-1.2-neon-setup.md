# Phase 1.2 — Neon Setup — PostgreSQL Database Banao

## Pichle Doc Se Aage

1.1 mein samjha — PostgreSQL data tables mein store karta hai.

Par PostgreSQL apne computer pe install karna — complicated hai beginners ke liye. Port conflicts, configuration — bahut jhanjhat.

**Solution — Neon.**

---

## Neon Kya Hai?

Neon — cloud pe free PostgreSQL service hai.

Bilkul waise jaise MongoDB ke liye **Atlas** tha:

```
MongoDB ke liye  →  Atlas  (cloud pe MongoDB)
PostgreSQL ke liye →  Neon   (cloud pe PostgreSQL)
```

Tune Atlas mein kuch install nahi kiya tha — bas account banaya, database mila, connect kiya.

Neon mein bhi same — kuch install nahi karna. Browser mein kholo — database ready.

---

## Neon Ki Hierarchy — Pehle Samjho

Atlas mein yeh tha:
```
Account → Organization → Project → Cluster → Database → Collection
```

Neon mein aisa hai:
```
Account → Project → Database → Tables
```

Simple hai — kam levels hain.

**Project** — ek app ka container. Jaise "Todo App Project."

**Database** — project ke andar actual database. Jaise `todo_db`.

**Tables** — database ke andar data — `todos`, `users` etc.

---

## Step 1 — Neon Account Banao

`neon.tech` pe jao — "Sign Up" click karo.

GitHub se sign up karo — easiest hoga.

---

## Step 2 — Pehla Project Banao

Login ke baad — yeh screen dikhegi — "Create your first project."

Yahan:
- **Project name** — `todo-app` likho
- **PostgreSQL version** — jo bhi latest ho — wahi rakho
- **Region** — `AWS - ap-south-1 (Mumbai)` — India ke paas hai — fast hoga
- **Create project** click karo

---

## Step 3 — Database Automatically Bana

Project banate hi — Neon ne automatically ek database bana diya — `neondb` naam ka.

Abhi kuch karne ki zarurat nahi — yahi database use karenge.

Ek popup aayega — connection string dikhayega — **abhi ignore karo** — Phase 2 mein kaam aayegi.

**"Skip"** ya **"Got it"** click karo.

---

## Step 4 — SQL Editor Dhundo

Yahi kaam aayega Phase 1 mein — **SQL Editor**.

Left sidebar mein dekho — **"SQL Editor"** option hoga — click karo.

Yeh ek text box jaisi cheez hai — yahan SQL queries likhenge — Run karenge — result neeche dikhega.

```
┌─────────────────────────────────┐
│  SQL Editor                     │
│                                 │
│  SELECT * FROM todos;           │  ← yahan query likhte hain
│                                 │
└─────────────────────────────────┘
│  Results                        │
│  id | title | done              │  ← result yahan dikhta hai
└─────────────────────────────────┘
```

---

## Step 5 — Pehli Query — Test Karo

SQL Editor mein yeh likho:

```sql
SELECT 1;
```

**"Run"** button dabao — ya `Ctrl + Enter`.

Result mein `1` dikhega — matlab SQL Editor kaam kar raha hai. ✅

**`SELECT 1` kya tha?**

Sirf ek test tha — "kya database connected hai?" Koi actual data nahi maanga — bas `1` return karo. Developers aise test karte hain connection check karne ke liye.

---

## Aaj Ka Summary

✅ Neon — cloud pe free PostgreSQL — Atlas jaisa  
✅ Account → Project → Database → Tables — hierarchy  
✅ Database automatically bana — `neondb`  
✅ SQL Editor — yahan queries likhenge — Phase 1 mein yahi kaam aayega  
✅ Connection string — abhi nahi — Phase 2 mein  

---

## Agla Step

**Phase 1.3** — SQL Editor mein pehli real query — Table banayenge! 🗃️
