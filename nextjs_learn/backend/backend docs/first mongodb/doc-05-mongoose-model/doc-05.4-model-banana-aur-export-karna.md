# Doc 05.4 — Model Banana aur Export Karna 🏗️
### (Database se kaam karne ke liye class banana)

---

## Pehle Problem Yaad Karo

**Schema aur interface dono ready hain। Ab sawaal yeh hai:**
> "Database se data manage karne ke liye Model banana hai aur export karna hai"

---

## Model Kya Hota Hai?

**Model = Database se data manage karne ke liye tool**

Real life mein:
- Passport office — wahan passport banane ke liye ek system hota hai
- Wahi system passport bana sakta hai, update kar sakta hai, delete kar sakta hai

**Mongoose mein Model bolte ho:**
> "Ek tool jisse hum database mein data ko manage karte hain"

---

## Database Se Data Manage Karna Kya Hota Hai?

**Database se data manage karna = Data ko control karna**

Real life examples (theoretical):

```
Example 1: Todo App
- Naya todo add karna → Database mein save karna
- Saare todos dikhana → Database se fetch karna
- Todo complete mark karna → Database mein update karna
- Todo delete karna → Database se delete karna

Example 2: User Registration
- User register karna → Database mein save karna
- User login karna → Database se check karna
- User profile update karna → Database mein update karna

Example 3: E-commerce
- Product add karna → Database mein save karna
- Products dikhana → Database se fetch karna
- Order place karna → Database mein save karna
```

**Yeh sab "Database se data manage karna" hai!**

---

## Model Kaise Kaam Karta Hai?

**Model = Database ke saath baat karne ka tool**

Real life example:

```
Passport Office:
- Passport banana → Passport Office ka kaam
- Passport update karna → Passport Office ka kaam
- Passport cancel karna → Passport Office ka kaam

Mongoose Model:
- Todo banana → Model ka kaam
- Todo fetch karna → Model ka kaam
- Todo update karna → Model ka kaam
- Todo delete karna → Model ka kaam
```

**Model ke through hum database se yeh kaam kar sakte hain:**

1. **CREATE** → Naya data banana
2. **READ** → Data fetch karna
3. **UPDATE** → Data update karna
4. **DELETE** → Data delete karna

**Abhi syntax nahi batana — sirf theoretical concept!**

---

## Abhi File Mein Kya Hai?

```typescript
// models/Todo.ts
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

**Ab Model banana hai:**

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

const Todo = mongoose.model("Todo", TodoSchema)
```

**`mongoose.model()` kya karta hai?**

1. Pehla argument `"Todo"` — model ka naam। **Mongoose automatically plural karke collection naam banata hai** — `"Todo"` → collection `"todos"` mein data jaayega
2. Doosra argument `TodoSchema` — blueprint

**Yahi woh cheez hai jahan database aur collection automatically banta hai!**

Tumne poocha tha — "database code se banayega?" — Haan! Jab pehli baar koi document save hoga:
- MongoDB Atlas pe `myapp` database ban jaayega (ya jo bhi naam .env mein diya)
- `todos` collection ban jaayegi automatically

Kuch manually banana nahi padta। 🎉

---

## Model Se Kaam Karna (Theoretical)

**Model ke through hum database se yeh kaam kar sakte hain:**

```typescript
// Model se kaam karna = Database se data manage karna

// 1. Naya todo banana (CREATE)
// Model.create() → Database mein naya todo save karega

// 2. Saare todos fetch karna (READ)
// Model.find() → Database se saare todos fetch karega

// 3. Ek todo update karna (UPDATE)
// Model.update() → Database mein ek todo update karega

// 4. Ek todo delete karna (DELETE)
// Model.delete() → Database se ek todo delete karega
```

**Abhi syntax nahi batana — sirf theoretical concept!**

---

## Next.js Hot Reload Problem

**Hot Reload kya hota hai?**

Next.js development mein **Hot Reload** hota hai — jab tum koi file save karte ho (Ctrl+S ya auto-save), toh Next.js automatically reload karta hai।

**Real life example:**

```
VS Code mein:
1. Tum Todo.ts file mein code likho
2. Ctrl+S dabao (save karo)
3. VS Code save karega
4. Next.js development server ko pata chalega ki file change hui
5. Next.js automatically reload karega
6. Browser mein changes dikhegi

Yeh hota hai "Hot Reload"
```

**Problem kya hai?**

Mongoose model ek baar banta hai, dobara nahi banta।

```
1. Pehli baar: mongoose.model("Todo", TodoSchema) → Model bana
2. Doosri baar: mongoose.model("Todo", TodoSchema) → ERROR!
   "Cannot overwrite Todo model once compiled"
```

**Kaise hota hai "File change, reload"?**

```
Scenario:
1. Tum Todo.ts file mein code likho
2. Ctrl+S dabao (save karo)
3. VS Code save karega
4. Next.js development server ko pata chalega ki file change hui
5. Next.js automatically reload karega
6. Reload ke time pe mongoose.model() dobara call hoga
7. ERROR! "Cannot overwrite Todo model once compiled"
```

**Problem:**
- Pehli baar: Model bana
- Doosri baar: Same naam se model banana? ❌ ERROR!
- Mongoose ek baar model banta hai, dobara nahi banta

**Solution — Safe Model Creation:**

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

const Todo =
  mongoose.models.Todo ?? mongoose.model("Todo", TodoSchema)
```

**`mongoose.models.Todo ?? mongoose.model(...)` ka matlab:**

```
mongoose.models kya hai?
→ Yeh ek object hai jisme pehle se bane saare models hote hain।

mongoose.models.Todo kya hai?
→ Agar pehle se "Todo" model ban chuka hai → woh return hoga
→ Agar nahi bana → undefined aayega

?? se:
→ Agar pehle se bana hai (models.Todo exist karta hai) → wahi use karo
→ Agar nahi bana → naya banao mongoose.model("Todo", TodoSchema)
```

**Kaise kaam karta hai?**

```
1. Pehli baar: mongoose.models.Todo = undefined → naya model banao
2. Doosri baar: mongoose.models.Todo = pehle ka model → wahi use karo
3. Error nahi aayega!
```

---

## Server Restart Kya Hota Hai?

**Server restart pe kya hota hai?**

```
1. Ctrl+C → Purana server band hua
2. bun dev → Naya server chalu hua
3. Naya server mein mongoose.models object fresh hai (empty)
4. mongoose.model() pehli baar call hoga
5. Model bana
6. Sab theek chalega
```

**Fark kya hai dono mein?**

```
Hot Reload:
- Same server
- mongoose.models object pehle se bana hua hai
- mongoose.models.Todo exist karta hai
- Safe model creation chahiye

Server Restart:
- Naya server
- mongoose.models object fresh hai (empty)
- mongoose.models.Todo undefined hai
- mongoose.model() pehli baar call hoga
- Safe model creation ka faida milega
```

---

## Database aur Collection Kya Hota Hai?

**Database aur Collection server restart se nahi hoti delete**

Real life example:

```
Passport Office:
- Passport Office band karo (Ctrl+C)
- Phir se Passport Office kholo (bun dev)
- Passport Office fresh hai
- Lekin Passport Database mein records abhi bhi hain
- Passport Office naye records add kar sakta hai
- Purane records delete kar sakta hai
- Sab theek chalega
```

**Database aur Collection kya hoti hai?**

```
Database = "MyApp" (jo tum .env mein define karte ho)
Collection = "todos" (jo mongoose automatically banata hai)

Yeh dono server restart se delete nahi hoti
Yeh MongoDB Atlas pe permanently save rehti hain
Server restart karne pe bhi data safe rehta hai
```

**Server restart pe kya hota hai?**

```
1. Ctrl+C → Server band hua
2. bun dev → Naya server chalu hua
3. Naya server mein Model fresh bana
4. Database aur Collection same hain
5. Data safe hai
6. Sab theek chalega
```

**Key Point:**
- Server restart = Model fresh bana
- Database aur Collection = Permanent rehti hain
- Data = Safe rehta hai
- Safe model creation = Har baar kaam karega

---

## Export Karna

**Ab Model export karna hai — frontend mein use karna hai।**

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

const Todo =
  mongoose.models.Todo ?? mongoose.model("Todo", TodoSchema)

export default Todo
```

**`export default Todo` kyu?**

- Model ko frontend mein use karna hai
- Frontend mein todos fetch karne ke liye Model chahiye
- Isliye Model export karna padega

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

const Todo =
  mongoose.models.Todo ?? mongoose.model("Todo", TodoSchema)

export default Todo
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

## Summary — Doc 05.4 Mein Kya Kiya

✅ **Model kya hota hai?** — Database se kaam karne ke liye class

✅ **Model banana sikha** — mongoose.model() se

✅ **Collection naming** — `"Todo"` model → `"todos"` collection (automatic plural)

✅ **Hot reload problem solve ki** — mongoose.models.Todo ?? pattern

✅ **Model export kiya** — frontend mein use karne ke liye

---

## Agla Step — Doc 06

**Doc 06: Pehla API Route — READ (GET)**

Ab sab setup complete hai:
- ✅ Connection file (`lib/mongodb.ts`)
- ✅ Model (`models/Todo.ts`)

Ab `app/api/todos/route.ts` banayenge aur **database se saare todos fetch** karenge।

Aur yahan **`useEffect` practically use hoga** — "page load ho toh automatically todos fetch karo" — exactly wahi kaam! 🚀