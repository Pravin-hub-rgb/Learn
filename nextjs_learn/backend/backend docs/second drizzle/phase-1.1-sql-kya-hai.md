# Phase 1.1 — SQL Kya Hai? MongoDB Se Kya Fark Hai?

## Pichle Kaam Se Shuru Karte Hain

Tune MongoDB se Todo App banaya — data documents mein save hota tha:

```js
{
  _id: '507f1f77...',
  title: 'Homework',
  done: false
}
```

Flexible tha — koi bhi shape ka document save kar sakte the.

Ab PostgreSQL seekhenge — yeh bilkul alag tarika hai data store karne ka.

---

## PostgreSQL Kya Hai?

PostgreSQL ek **SQL database** hai.

SQL database mein data **tables** mein store hota hai — MongoDB ke documents mein nahi.

Table kaisi hoti hai? Bilkul Excel spreadsheet jaisi:

```
| id | title      | done  |
|----|------------|-------|
| 1  | Homework   | false |
| 2  | Exercise   | true  |
| 3  | Study SQL  | false |
```

Har **row** — ek todo.
Har **column** — ek field.

---

## MongoDB vs PostgreSQL — Seedha Compare

**MongoDB mein:**
```js
// Schema define karte hain — lekin flexible rehta hai
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false }
})

// Extra fields add kar sakte hain — schema mein nahi likha ho toh bhi chalta hai
{ title: 'Homework', done: false, priority: 'high' }  // ← extra field chal jata hai
```

**PostgreSQL mein:**
```sql
-- Table define karte hain — strict hota hai
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done BOOLEAN DEFAULT false
);

-- Extra column add karna ho — pehle ALTER TABLE karna padta hai
ALTER TABLE todos ADD COLUMN priority TEXT;
```

**Key Difference:**
- **MongoDB:** Schema define karte hain, lekin runtime pe extra fields add kar sakte hain
- **PostgreSQL:** Table structure fix hoti hai, extra column ke liye ALTER TABLE karna padta hai

**Example:**
- **MongoDB:** Todo banao → { title: 'Homework', done: false } → Baad mein { title: 'Homework', done: false, priority: 'high' } kar sakte hain
- **PostgreSQL:** Table banao → Columns fix → Extra column chahiye → ALTER TABLE karo → Phir data daalo

---

## Naye Concepts — Ek Ek Samjho

### Table

Table = ek type ka data ka ghar.

Todo App mein:
- `todos` table — saare todos
- `users` table — saare users (baad mein)

MongoDB mein yeh **collection** tha — PostgreSQL mein **table** hai.

---

### Row

Row = ek record — ek todo.

```
| 1  | Homework  | false |   ← yeh ek row hai
| 2  | Exercise  | true  |   ← yeh aur ek row hai
```

MongoDB mein yeh **document** tha — PostgreSQL mein **row** hai.

---

### Column

Column = ek field — har row mein hoti hai.

```
id | title | done
↑    ↑       ↑
teen columns hain is table mein
```

MongoDB mein yeh **field** tha — PostgreSQL mein **column** hai.

---

### Primary Key

Har row ka ek **unique identifier** hona chahiye — jisse specific row dhund sake.

MongoDB mein yeh `_id` tha — MongoDB khud deta tha.

PostgreSQL mein yeh `id` hota hai — aur `SERIAL` type ka hota hai:

```
SERIAL = automatically 1, 2, 3, 4... count karta jaata hai
```

Naya todo add karo — `id` automatically `1` milega. Doosra add karo — `2` milega. Khud nahi dena.

---

## Toh PostgreSQL Kyun Seekhein?

MongoDB theek tha — par PostgreSQL alag cheezein offer karta hai:

**Strict structure** — data consistent rehta hai. Koi bhi galat format mein save nahi ho sakta.

**Relations** — User ke todos — User aur Todo tables ko link kar sakte hain. MongoDB mein yeh manually karna padta tha.

**SQL** — ek powerful language — sirf PostgreSQL nahi — MySQL, SQLite, sab mein yahi language. Ek baar seekha — kai jagah kaam aata hai.

---

## Aaj Ka Summary

✅ PostgreSQL — SQL database — data tables mein store hota hai  
✅ Table — ek type ka data — MongoDB ki collection jaisi  
✅ Row — ek record — MongoDB ka document  
✅ Column — ek field — har row mein hoti hai  
✅ Primary Key — unique ID — PostgreSQL mein `id`, MongoDB mein `_id`  
✅ SERIAL — automatically 1, 2, 3... count karta hai  

---

## Agla Step

**Phase 1.2** — Neon pe account banayenge — PostgreSQL database milega — SQL Editor mein queries likhenge! 🚀
