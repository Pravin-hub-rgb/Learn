# Phase 1.7 — Data Hatao — DELETE

## Pichle Doc Se Aage

1.6 mein data update karna seekha — `UPDATE` se.

Aakhri SQL operation — `DELETE` — data hatana.

---

## DELETE — Syntax Samjho

```sql
DELETE FROM todos WHERE id = 5;
```

Tod ke:

**`DELETE FROM todos`**
```
DELETE FROM  ← "is table se hatao"
todos        ← kaunsi table se
```

**`WHERE id = 5`**
```
WHERE id = 5  ← "sirf woh row jo id = 5 ho"
```

---

## ⚠️ WHERE Yahan Bhi Bahut Zaroori Hai

`WHERE` nahi diya — **saara data delete ho jaayega!**

```sql
-- GALAT — saari rows delete!
DELETE FROM todos;

-- SAHI — sirf id = 5 wala
DELETE FROM todos WHERE id = 5;
```

---

## Try Karo

`id = 5` wala "Test todo" delete karo:

```sql
DELETE FROM todos WHERE id = 5;
```

Result:
```
DELETE 1
```

`DELETE 1` — "1 row delete hui." ✅

Verify karo:

```sql
SELECT * FROM todos;
```

```
1  | Homework       | false
2  | Exercise karo  | false
3  | SQL seekho     | true
4  | Drizzle seekho | false
```

`id = 5` wala gayab! ✅

---

## ID Gap — Normal Hai

Notice karo — `id` 1, 2, 3, 4 hai — 5 delete hua toh woh gap reh gaya.

Agar naaya todo add karein:

```sql
INSERT INTO todos (title) VALUES ('Naya todo');
```

```
6  | Naya todo  | false   ← 5 se nahi shuru hua — 6 se!
```

`SERIAL` kabhi wapas nahi jaata — yahi sahi hai. IDs unique honi chahiye — reuse nahi hoti.

---

## Phase 1 Complete — SQL Ka Poora Chakkar

Tune SQL Editor mein seedha PostgreSQL se baat ki — koi code nahi, koi library nahi — raw SQL:

```sql
-- Table banai
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done BOOLEAN DEFAULT false
);

-- Data daala
INSERT INTO todos (title) VALUES ('Homework');

-- Data dekha
SELECT * FROM todos WHERE done = false;

-- Data badla
UPDATE todos SET done = true WHERE id = 1;

-- Data hataya
DELETE FROM todos WHERE id = 5;
```

Yeh sab ab samajh aata hai — kyun likha, kya kaam karta hai. ✅

---

## MongoDB Se Compare — Ek Baar

```
MongoDB                          SQL
────────────────────────────     ────────────────────────────
Todo.find()                      SELECT * FROM todos
Todo.find({ done: false })       SELECT * FROM todos WHERE done = false
Todo.create({ title: '...' })    INSERT INTO todos (title) VALUES ('...')
Todo.findByIdAndUpdate(id, ...)  UPDATE todos SET ... WHERE id = ...
Todo.findByIdAndDelete(id)       DELETE FROM todos WHERE id = ...
```

Concepts same hain — sirf syntax alag.

---

## Aaj Ka Summary

✅ `DELETE FROM table WHERE condition` — data hatao  
✅ `WHERE` zaroori — nahi diya toh saara data delete  
✅ `DELETE 1` — 1 row delete hui  
✅ ID gap normal hai — SERIAL reuse nahi karta  

---

## Agla Step

**Phase 2.1** — Ab Next.js project mein aayenge — Neon se connect karenge — connection string use karenge! 🔌
