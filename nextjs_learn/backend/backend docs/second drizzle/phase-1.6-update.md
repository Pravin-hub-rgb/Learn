# Phase 1.6 — Data Badlo — UPDATE

## Pichle Doc Se Aage

1.5 mein data dekhna seekha — SELECT se filters bhi lagaye.

Ab data badlenge — todo complete mark karna, title change karna — `UPDATE` se.

---

## UPDATE — Syntax Samjho

```sql
UPDATE todos SET done = true WHERE id = 1;
```

Tod ke:

**`UPDATE todos`**
```
UPDATE  ← "is table mein kuch badlo"
todos   ← kaunsi table
```

**`SET done = true`**
```
SET       ← "yeh value set karo"
done      ← kaunsa column
= true    ← kya value set karo
```

**`WHERE id = 1`**
```
WHERE id = 1  ← "sirf us row mein jo id = 1 ho"
```

---

## ⚠️ WHERE Bahut Zaroori Hai

`WHERE` nahi diya toh — **saari rows update ho jaayengi!**

```sql
-- GALAT — saare todos done ho jaayenge!
UPDATE todos SET done = true;

-- SAHI — sirf id = 1 wala
UPDATE todos SET done = true WHERE id = 1;
```

Hamesha `WHERE` ke saath `UPDATE` likho.

---

## Try Karo — Todo Complete Karo

`id = 1` wala todo — "Homework karo" — complete mark karo:

```sql
UPDATE todos SET done = true WHERE id = 1;
```

Result:
```
UPDATE 1
```

`UPDATE 1` — "1 row update hui." ✅

Verify karo:

```sql
SELECT * FROM todos WHERE id = 1;
```

```
1  | Homework karo  | true   ← done ab true hai!
```

---

## Title Bhi Badal Sakte Hain

```sql
UPDATE todos SET title = 'Homework complete!' WHERE id = 1;
```

Verify:
```sql
SELECT * FROM todos WHERE id = 1;
```

```
1  | Homework complete!  | true
```

---

## Ek Saath Do Cheezein Badlo

`SET` mein comma se multiple columns:

```sql
UPDATE todos SET title = 'Homework', done = false WHERE id = 1;
```

Verify:
```
1  | Homework  | false
```

Dono ek saath update! ✅

---

## Toggle Karo — Done Ka Opposite

Todo done hai — false karo. Done nahi hai — true karo. SQL mein directly toggle:

```sql
UPDATE todos SET done = NOT done WHERE id = 2;
```

**`NOT done` kya hai?**

```
NOT     ← "ulta karo"
done    ← jo abhi done ki value hai
```

```
done = false  →  NOT done = true
done = true   →  NOT done = false
```

MongoDB mein `{ done: !currentDone }` bhejte the — yahan SQL mein seedha `NOT done`. ✅

---

## Aaj Ka Summary

✅ `UPDATE table SET column = value WHERE condition` — data badlo  
✅ `WHERE` zaroori — nahi diya toh saari rows update  
✅ `SET col1 = val1, col2 = val2` — ek saath multiple columns  
✅ `NOT done` — boolean toggle — opposite value  
✅ `UPDATE 1` — 1 row update hui  

---

## Agla Step

**Phase 1.7** — Data hatayenge — `DELETE` se! 🗑️
