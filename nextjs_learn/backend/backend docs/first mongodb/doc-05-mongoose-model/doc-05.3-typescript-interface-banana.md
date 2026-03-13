# Doc 05.3 — TypeScript Interface Banana 📝
### (Data ka type define karna)

---

## Pehle Problem Yaad Karo

**Schema ban gaya। Ab sawaal yeh hai:**
> "TypeScript ko bhi batana padega ki data kaisa dikhega"

---

## Interface Kya Hota Hai?

**Interface = Data ka type definition**

Real life mein:
- Passport form — fields decide hain: Name, DOB, Address
- Interface bhi wahi kaam karta hai — batata hai ki data mein kya kya hoga

**TypeScript mein Interface bolte ho:**
> "Ek todo object mein exactly yeh fields hongi, in types ke saath"

---

## Abhi File Mein Kya Hai?

```typescript
// models/Todo.ts
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

**Ab interface banate hain:**

```typescript
import mongoose, { Schema } from "mongoose"

interface ITodo {
  title: string;
  done: boolean;
}

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

**`interface ITodo` kya hota hai?**

- `interface` → TypeScript ka keyword
- `ITodo` → Interface ka naam
- `title: string` → title field string type ka hoga
- `done: boolean` → done field boolean type ka hoga

---

## `I` Prefix Kyo? (`ITodo` nahi sirf `Todo`)

Convention hai TypeScript mein — `I` se interface ka pata chalta hai।

```
ITodo = "Todo ka Interface"
Todo  = "Todo ka Model/Class"
```

---

## `export` Kyo Nahi Kiya Pehle?

**Abhi interface sirf TypeScript ke liye hai — database se data aayega, TypeScript ko batana hai ki data kaisa dikhega।**

Export karne ki zaroorat nahi abhi। Jab use karnege tab export kar lenge।

---

## Date Field Kyo Nahi Rakha?

**`timestamps: true` use kar rahe hain — woh automatically `createdAt` aur `updatedAt` add karega।**

Isliye manually `Date` field nahi rakha।

---

## Consistency Kyo Important Hai?

```typescript
// ❌ GALAT — inconsistent
interface ITodo {
  Title: string;    // Capital T
  Done: boolean;    // Capital D
  Date: Date;       // Manual date
}

// ✅ SAHI — consistent
interface ITodo {
  title: string;    // Small t
  done: boolean;    // Small d
}
```

TypeScript mein convention hai:
- Variables small letters se shuru
- Types capital letters se shuru
- Consistent naming important hai

---

## Schema + Interface Connect Karna

**Ab dono ko connect karna hai।**

**Problem:** Interface mein `createdAt` hai, lekin schema mein `timestamps: true` hai।

**Solution:** Interface ko extend karo `Document` se।

```typescript
import mongoose, { Schema, Document } from "mongoose"

interface ITodo extends Document {
  title: string;
  done: boolean;
  createdAt: Date;
}

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

**`extends Document` kya hota hai?**

`extends` matlab "yeh bhi lo, aur apna bhi daalo"।

`Document` Mongoose ka type hai। Har MongoDB document mein automatically hota hai:
- `_id` — unique ID
- `__v` — version number (MongoDB ka internal)
- `.save()`, `.deleteOne()` — methods

Toh `ITodo extends Document` ka matlab:
> "Ek Todo mein `_id`, `__v` aur baaki Mongoose cheezein bhi hongi, aur saath mein `title`, `done`, `createdAt` bhi।"

```typescript
// ITodo ke andar actually yeh sab hota hai:
{
  _id: ObjectId,        // Document se aaya
  __v: number,          // Document se aaya  
  title: string,        // Humne define kiya
  done: boolean,        // Humne define kiya
  createdAt: Date,      // Humne define kiya (timestamps: true se)
  save: Function,       // Document se aaya (method)
  deleteOne: Function,  // Document se aaya (method),
}
```

---

## Abhi File Kaisi Dikhti Hai?

```typescript
import mongoose, { Schema, Document } from "mongoose"

interface ITodo extends Document {
  title: string;
  done: boolean;
  createdAt: Date;
}

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

## Summary — Doc 05.3 Mein Kya Kiya

✅ **Interface kya hota hai?** — Data ka type definition

✅ **Interface banaya** — TypeScript ke liye Todo ka type

✅ **`I` prefix explain kiya** — Convention

✅ **`export` kyo nahi kiya pehle** — Abhi sirf TypeScript ke liye

✅ **Date field kyo nahi rakha** — `timestamps: true` use kar rahe hain

✅ **Consistency explain ki** — TypeScript conventions

✅ **Schema + Interface connect kiya** — extends Document

---

## Agla Step — Doc 05.4

**Doc 05.4: Model Banana aur Export Karna**

Ab schema aur interface dono ready hain। Ab **Model** banana hai aur **export** karna hai।

Yahan seekhenge:
- Model kya hota hai?
- Kaise banate hain?
- Kaise export karte hain?
- Next.js Hot Reload problem kya hai? 🚀