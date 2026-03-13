# Doc 05.1 — Todo Kya Hota Hai? 📝
### (Problem: Database mein data save karna hai)

---

## Pehle Problem Samjho

Database mein data save karna hai — lekin **structure kya hoga?**

Socho tum ek register (ledger) mein todos likhte ho। Agar koi format nahi hai:

```
Page 1: "Milk lana" - haan, kiya
Page 2: 42
Page 3: { kuch random }
Page 4: "Assignment" - nahi pata done hua ya nahi
```

Bahut confusing। Koi consistency nahi।

**Agar format decide ho:**

```
Column: Title (text) | Done (yes/no) | Date (when added)
Row 1:  Milk lana    | Yes           | 2024-01-15
Row 2:  Assignment   | No            | 2024-01-16
```

Yahi kaam **Schema** karta hai — data ka **structure/template** define karna।

---

## Todo Kya Hota Hai?

**Todo = Task jo karna hai**

Real life mein hum todos likhte hain:
- "Milk lana"
- "Assignment submit karna"
- "Gym jana"

Har todo mein kya kya hota hai?

```
Todo 1:
- Title: "Milk lana"
- Done: No (abhi tak nahi kiya)
- CreatedAt: 2024-01-15 (kab add kiya)

Todo 2:
- Title: "Assignment submit karna"
- Done: Yes (kar liya)
- CreatedAt: 2024-01-16
```

---

## Database Mein Todo Kaise Save Hoga?

Database mein har todo ek **document** ki tarah save hoga:

```json
{
  "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
  "title": "Milk lana",
  "done": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Har todo mein kya kya hoga?**

1. **`_id`** — Unique ID (MongoDB automatically banata hai)
2. **`title`** — Todo ka naam (string)
3. **`done`** — Todo complete hua ya nahi (boolean)
4. **`createdAt`** — Kab add kiya (date)
5. **`updatedAt`** — Kab update kiya (date)

---

## Problem Kya Hai?

**Abhi tak humne:**
- ✅ Database connection setup kiya (`lib/mongodb.ts`)
- ✅ Mongoose install kiya

**Ab sawaal yeh hai:**
> "Database mein data save karna hai — lekin structure kya hoga?"

---

## Solution — Schema Banana

**Schema = Data ka blueprint / template**

Real life mein:
- Passport form — har field fix hai: Name, DOB, Address... koi bhi "date of birth" ki jagah "favorite color" nahi likh sakta
- Job application form — fields decide hain

**Mongoose mein Schema bolte ho:**
> "MongoDB mein jo bhi todo document save hoga, usmein exactly yeh fields hongi, in types ke saath"

---

## Agla Step — Doc 05.2

**Doc 05.2: Schema Kya Hota Hai?**

Ab samjhega ki:
- Schema kya hota hai?
- Mongoose mein kaise banate hain?
- Kaise use karte hain?

Yahan seekhenge:
- mongoose import karna
- Schema function extract karna
- Schema banana
- Validation rules add karna 🚀