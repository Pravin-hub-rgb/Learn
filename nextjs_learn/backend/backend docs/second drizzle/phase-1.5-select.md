# Phase 1.5 — Data Dekho — SELECT

## Pichle Doc Se Aage

1.4 mein data daala — 5 todos hain abhi table mein.

`SELECT * FROM todos` toh kar liya — saara data aaya. Par real apps mein hamesha saara data nahi chahiye hota.

Jaise — sirf incomplete todos dikhao. Ya sirf ek specific todo.

Yeh sab `SELECT` se hi hota hai — thoda aur seekhte hain.

---

## SELECT — Abhi Tak Kya Pata Hai

```sql
SELECT * FROM todos;
```

```
*      ← saare columns
todos  ← is table se
```

---

## Sirf Kuch Columns Chahiye?

Saare columns nahi chahiye — sirf `title` aur `done` chahiye:

```sql
SELECT title, done FROM todos;
```

Result:
```
title          | done
---------------|------
Homework karo  | false
Exercise karo  | false
SQL seekho     | true
Drizzle seekho | false
Test todo      | false
```

`id` nahi aaya — kyunki maanga nahi. ✅

---

## Filter Lagao — WHERE

Sirf incomplete todos chahiye — `done = false` wale:

```sql
SELECT * FROM todos WHERE done = false;
```

**`WHERE` kya hai?**

```
WHERE       ← "sirf woh rows jo yeh condition satisfy karein"
done = false ← condition — done false ho
```

Result:
```
1  | Homework karo  | false
2  | Exercise karo  | false
4  | Drizzle seekho | false
5  | Test todo      | false
```

Sirf `done = false` wale aaye — `SQL seekho` nahi aaya kyunki woh `true` tha. ✅

---

## Sirf Ek Todo — ID Se Dhundo

Specific todo chahiye — jiska `id = 3` ho:

```sql
SELECT * FROM todos WHERE id = 3;
```

Result:
```
3  | SQL seekho  | true
```

Sirf ek row aaya. ✅

MongoDB mein `findById(id)` tha — yahan `WHERE id = 3` hai.

---

## ORDER BY — Sort Karo

Todos ko `id` ke hisaab se ulta order mein dikhao — naaye pehle:

```sql
SELECT * FROM todos ORDER BY id DESC;
```

**`ORDER BY id DESC` kya hai?**

```
ORDER BY  ← "is column ke hisaab se sort karo"
id        ← id column se sort karo
DESC      ← descending — bada pehle, chota baad mein
            (ASC = ascending — chota pehle — default hota hai)
```

Result:
```
5  | Test todo      | false
4  | Drizzle seekho | false
3  | SQL seekho     | true
2  | Exercise karo  | false
1  | Homework karo  | false
```

Naaya todo pehle aaya! ✅

---

## WHERE + ORDER BY — Saath Mein

Incomplete todos — naaye pehle:

```sql
SELECT * FROM todos WHERE done = false ORDER BY id DESC;
```

Result:
```
5  | Test todo      | false
4  | Drizzle seekho | false
2  | Exercise karo  | false
1  | Homework karo  | false
```

Dono conditions saath kaam kar rahe hain! ✅

---

## Aaj Ka Summary

✅ `SELECT col1, col2` — sirf kuch columns  
✅ `WHERE condition` — filter lagao  
✅ `WHERE done = false` — incomplete todos  
✅ `WHERE id = 3` — specific row dhundo  
✅ `ORDER BY id DESC` — sort karo — naaya pehle  
✅ `WHERE` + `ORDER BY` — saath mein use kar sakte hain  

---

## Agla Step

**Phase 1.6** — Data badlenge — `UPDATE` se — todo complete mark karenge! ✅
