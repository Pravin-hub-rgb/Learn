# Phase 1.4 — Data Daalo — INSERT

## Pichle Doc Se Aage

1.3 mein `todos` table banayi — abhi khaali hai.

Ab data daalte hain — `INSERT` se.

---

## INSERT — Syntax Samjho

```sql
INSERT INTO todos (title, done) VALUES ('Homework karo', false);
```

Tod ke:

**`INSERT INTO todos`**
```
INSERT INTO  ← "is table mein data daalo"
todos        ← kaunsi table mein
```

**`(title, done)`**
```
(title, done)  ← kaunse columns mein data daalna hai
```

`id` kyun nahi likha? Kyunki `SERIAL` hai — automatically milega!

**`VALUES ('Homework karo', false)`**
```
VALUES          ← "yeh values daalo"
'Homework karo' ← title ka value — string single quotes mein
false           ← done ka value
```

Order matter karta hai — `(title, done)` mein pehle title, phir done. `VALUES` mein bhi same order.

---

## SQL Editor Mein Try Karo

```sql
INSERT INTO todos (title, done) VALUES ('Homework karo', false);
```

---

## Verify Karo — Data Dikh Raha Hai?

```sql
SELECT * FROM todos;
```

Result:

```
id | title          | done
---|----------------|------
1  | Homework karo  | false
```

`id` automatically `1` mila — `SERIAL` ne diya! ✅

---

## Aur Data Daalo

Teen aur rows daalo — ek ek karke:

```sql
INSERT INTO todos (title, done) VALUES ('Exercise karo', false);
```

```sql
INSERT INTO todos (title, done) VALUES ('SQL seekho', true);
```

```sql
INSERT INTO todos (title, done) VALUES ('Drizzle seekho', false);
```

Ab `SELECT * FROM todos` karo — result:

```
id | title          | done
---|----------------|------
1  | Homework karo  | false
2  | Exercise karo  | false
3  | SQL seekho     | true
4  | Drizzle seekho | false
```

`id` automatically 1, 2, 3, 4 mila — khud nahi dena pada! ✅

---

## `done` Default Value Test Karo

`done` mein `DEFAULT false` tha — matlab agar `done` nahi diya — automatically `false` aayega.

Try karo:

```sql
INSERT INTO todos (title) VALUES ('Test todo');
```

Notice karo — `done` bilkul nahi diya. `SELECT * FROM todos` karo:

```
5  | Test todo  | false   ← done automatically false!
```

`DEFAULT` kaam kar raha hai! ✅

---

## Aaj Ka Summary

✅ `INSERT INTO table (columns) VALUES (values)` — data daalo  
✅ `id` nahi dena — `SERIAL` automatically deta hai  
✅ String values — single quotes mein — `'Homework'`  
✅ `DEFAULT` kaam karta hai — column skip karo — default value aayegi  
✅ `INSERT 0 1` — 1 row insert hui  

---

## Agla Step

**Phase 1.5** — Data dekhenge — `SELECT` se — filters bhi lagayenge! 👀
