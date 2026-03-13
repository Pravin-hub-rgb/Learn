# Phase 1.3 — Table Banao — CREATE TABLE

## Pichle Doc Se Aage

1.2 mein Neon setup kiya — SQL Editor tak pahunche.

Ab SQL Editor mein pehla kaam — **todos table banao.**

---

## Pehle Socho — Table Mein Kya Chahiye?

Todo App ke liye ek todo mein kya hoga?

```
title  — todo ka text     — string
done   — complete hai?    — true/false
id     — unique number    — automatically milega
```

Yahi teen cheezein table mein columns banenge.

---

## `CREATE TABLE` — Syntax Samjho

SQL mein table banane ke liye `CREATE TABLE` use karte hain.

Pehle poori query dekho — phir tod ke samjhate hain:

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done BOOLEAN DEFAULT false
);
```

Ab ek ek part:

---

**`CREATE TABLE todos`**

```
CREATE TABLE  ← "ek naya table banao"
todos         ← table ka naam — hum ne rakha
```

---

**`id SERIAL PRIMARY KEY`**

```
id           ← column ka naam
SERIAL       ← automatically 1, 2, 3... count karega — khud nahi dena
PRIMARY KEY  ← yeh column unique identifier hai — do rows ka id same nahi hoga
```

MongoDB mein `_id` tha — woh MongoDB deta tha. Yahan `id` hai — SERIAL automatically deta hai.

---

**`title TEXT NOT NULL`**

```
title     ← column ka naam
TEXT      ← type — string/text data
NOT NULL  ← "khaali nahi chhod sakte" — zaroori hai
```

MongoDB mein `required: true` tha — yahan `NOT NULL` hai — same kaam.

---

**`done BOOLEAN DEFAULT false`**

```
done      ← column ka naam
BOOLEAN   ← type — sirf true ya false
DEFAULT false  ← agar nahi diya — automatically false set hoga
```

MongoDB mein `default: false` tha — yahan bhi same — `DEFAULT false`.

---

**`;`**

Har SQL query ke end mein semicolon — "query khatam." 

---

## SQL Editor Mein Likho — Run Karo

SQL Editor mein yeh paste karo:

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done BOOLEAN DEFAULT false
);
```

**Run** karo — `Ctrl + Enter`.

Result mein dikhega:

```
CREATE TABLE
```

Matlab table ban gayi! ✅

---

## Table Bani — Verify Karo

Table bani ki nahi — check karo. SQL Editor mein yeh likho:

```sql
SELECT * FROM todos;
```

**`SELECT * FROM todos`** kya hai?

```
SELECT    ← "dikhao"
*         ← "sab columns"
FROM      ← "kahan se"
todos     ← "todos table se"
```

Neon mein result mein **"No result"** dikhega — yeh bilkul sahi hai!

"No result" ka matlab — table ban gayi par abhi koi data nahi hai. Khaali table hai. ✅

Left sidebar mein **"Tables"** click karo — wahan `todos` listed dikh jaayegi — confirm ho jaayega ki table ban gayi.

Table ready hai — ab data daalte hain! ✅

---

## Aaj Ka Summary

✅ `CREATE TABLE` — naya table banao  
✅ `SERIAL PRIMARY KEY` — automatic id — unique  
✅ `TEXT NOT NULL` — string — zaroori  
✅ `BOOLEAN DEFAULT false` — true/false — default value  
✅ `SELECT * FROM todos` — table verify karo  

---

## Agla Step

**Phase 1.4** — Table mein data daalenge — `INSERT`! 📝  
