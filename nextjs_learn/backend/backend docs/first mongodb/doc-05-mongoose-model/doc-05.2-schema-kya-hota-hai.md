# Doc 05.2 — Schema Kya Hota Hai? 🔧
### (Mongoose mein data ka blueprint banana)

---

## Pehle Problem Yaad Karo

**Todo banana hai — kya kya chahiye hoga?**

```
Todo:
- Title: "Milk lana" (string)
- Done: false (boolean)
- CreatedAt: 2024-01-15 (date)
```

**Ab sawaal yeh hai:**
> "Database mein todo save karna hai — lekin structure kya hoga?"

---

## Schema Kya Hota Hai?

**Schema = Data ka blueprint / template**

Real life mein:
- Passport form — har field fix hai: Name, DOB, Address... koi bhi "date of birth" ki jagah "favorite color" nahi likh sakta
- Job application form — fields decide hain

**Mongoose mein Schema bolte ho:**
> "MongoDB mein jo bhi todo document save hoga, usmein exactly yeh fields hongi, in types ke saath"

---

## Abhi File Banao

`models/` folder mein ek file banao: `Todo.ts`

**Pehle kya chahiye?**

```typescript
// models/Todo.ts — abhi khali hai
```

---

## Pehli Zaroorat — mongoose Import Karna

**Pehle mongoose library import karo:**

```typescript
import mongoose from "mongoose"
```

**`import mongoose` kya karta hai?**

- `mongoose` ek library hai — MongoDB ke saath kaam karne ke liye
- Isme bahut saare functions hote hain: `connect`, `model`, `Schema`, etc.
- Jab hum `import mongoose from "mongoose"` karte hain, toh pure mongoose object milta hai

---

## Doosri Zaroorat — Schema Extract Karna

**Ab mongoose ke andar se Schema function extract karo:**

```typescript
import mongoose from "mongoose"

const Schema = mongoose.Schema
```

**`mongoose.Schema` kya hota hai?**

- `mongoose` object ke andar `Schema` naam ka ek function hai
- Yeh function blueprint banata hai — data ka structure define karta hai
- `const Schema = mongoose.Schema` se hum us function ko extract karte hain

---

## Teesri Zaroorat — Schema Call Karna

**Ab Schema function ko call karo:**

```typescript
import mongoose from "mongoose"

const Schema = mongoose.Schema
const TodoSchema = new Schema({
  title: String,
  done: Boolean
})
```

**`new Schema({ ... })` kya karta hai?**

- `new Schema()` ek blueprint object banata hai
- `{ title: String, done: Boolean }` mein hum batate hain ki data kaisa hoga
- `title: String` matlab title field string type ka hoga
- `done: Boolean` matlab done field boolean type ka hoga

---

## Chauthi Zaroorat — Destructuring Shortcut

**Abhi code thoda lamba hai। Shortcut ke liye destructuring use karo:**

```typescript
import mongoose, { Schema } from "mongoose"

const TodoSchema = new Schema({
  title: String,
  done: Boolean
})
```

**`import mongoose, { Schema }` kya karta hai?**

- `mongoose` → pure mongoose object
- `{ Schema }` → mongoose ke andar se Schema function extract karo
- Yeh dono ek saath import ho jaate hain

**Fark kya hai dono approaches mein?**

```typescript
// Long approach
import mongoose from "mongoose"
const Schema = mongoose.Schema

// Short approach  
import mongoose, { Schema } from "mongoose"
```

Dono same kaam karte hain, lekin short approach zyada commonly use hota hai।

---

## Paanchvi Zaroorat — Validation Rules Add Karna

Abhi schema basic hai। Real app mein kuch rules chahiye:

**Problem:** Koi todo bina title ke save kar de?

```typescript
// ❌ GALAT — bina title ke save ho sakta hai
{
  title: "",      // Empty title
  done: false
}
```

**Solution:** Validation rules add karo।

```typescript
import mongoose, { Schema } from "mongoose"

const TodoSchema = new Schema({
  title: {
    type: String,       // String type
    required: true,     // Zaroori field
    trim: true,         // Spaces hata do
  },
  done: {
    type: Boolean,      // Boolean type
    default: false,     // Default value
  }
})
```

**Rules explained:**

- `type: String` → Sirf string allowed
- `required: true` → Bina title ke save nahi hoga
- `trim: true` → Aage peeche ke spaces hata do
- `default: false` → Agar done nahi diya toh automatically false hoga

---

## Chhathi Zaroorat — Timestamps Add Karna

Real app mein har todo ke saath **created date** aur **updated date** chahiye।

**Manual approach:**

```typescript
// ❌ Manual — har baar likhna padega
createdAt: {
  type: Date,
  default: Date.now
},
updatedAt: {
  type: Date,
  default: Date.now
}
```

**Smart approach:**

```typescript
import mongoose, { Schema } from "mongoose"

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  done: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true  // ✅ Smart — automatically createdAt aur updatedAt add hoga
})
```

**`timestamps: true` kya karta hai?**

- `createdAt` — document kab bana — automatically add hoga
- `updatedAt` — document kab update hua — automatically add hoga

Tumhe manually nahi daalna padta। 🎉

---

## Abhi File Kaisi Dikhti Hai?

```typescript
import mongoose, { Schema } from "mongoose"

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  done: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
})
```

---

## Todo Object Kaisa Dikhega Database Mein?

Jab ek todo save hoga, MongoDB mein kuch aisa dikhega:

```json
{
  "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
  "title": "Milk lana",
  "done": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}
```

- `_id` — MongoDB ne automatically banaya (24 character hex string)
- `title`, `done` — humne define kiya
- `createdAt`, `updatedAt` — `timestamps: true` se automatically aaya
- `__v` — Mongoose ka internal version field (ignore karo)

---

## Summary — Doc 05.2 Mein Kya Kiya

✅ **Problem yaad kiya** — Todo banana hai, structure kya hoga?

✅ **Schema kya hota hai?** — Data ka blueprint / template

✅ **mongoose import kiya** — library import karna

✅ **Schema extract kiya** — mongoose.Schema se Schema function extract karna

✅ **Schema call kiya** — new Schema() se blueprint banana

✅ **Destructuring shortcut use kiya** — import mongoose, { Schema }

✅ **Validation rules add ki** — required, default, trim

✅ **Timestamps add ki** — createdAt/updatedAt automatically

---

## Agla Step — Doc 05.3

**Doc 05.3: TypeScript Interface Banana**

Ab schema ban gaya। Ab TypeScript ko bhi batana padega ki data kaisa dikhega।

Yahan seekhenge:
- Interface kya hota hai?
- Kaise banate hain?
- Kaise connect karte hain schema se? 🚀