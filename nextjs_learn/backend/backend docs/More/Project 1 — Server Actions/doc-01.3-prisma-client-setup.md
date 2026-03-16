# Doc 1.3 — Prisma Client Setup 🛠️

## Pehle Problem Samjho — Bina Client Ke Kya Hoga?

Chalo ek scenario socho.

Tumne project setup kar liya (Doc 1.1) aur schema design kar liya (Doc 1.2). Ab socha "Database se kaise baat karenge?"

Ab **kaun decide karega ki database se kaise connect hona hai?**
**Kaise pata chalega ki kaun query kaun sa hai?**
**Kaise pata chalega ki kaun function kaun sa kaam karta hai?**

Sab kuch manually karna padega — aur yeh bahut complicated hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message send karne ka client nahi hota, kaise pata chalega ki kaun message kis server pe bhejna hai?
- **Instagram** — agar post karne ka client nahi hota, kaise pata chalega ki kaun post kis database mein daalna hai?
- **Amazon** — agar order karne ka client nahi hota, kaise pata chalega ki kaun order kis system mein daalna hai?

---

## Prisma Client Kya Hota Hai? (Real Life Analogy)

Client ek **translator** jaisa hai:

| Communication | App Development |
|---------------|-----------------|
| English speaker | Your code |
| Hindi speaker | Database |
| Translator | Prisma Client |
| Translation | Query conversion |

Agar translator nahi hai, dono kaise baat karenge? Isliye client zaroori hai.

---

## Hum Kya Setup Karenge?

Hum Prisma client setup karenge jisse:

1. **Database se connect ho** - Database se baat kar sake
2. **Queries run ho** - Data fetch, insert, update, delete kar sake
3. **TypeScript types milen** - Type safety aur autocomplete

---

## Step 1: lib/prisma.ts File Create Karo

Ab lib folder aur file create karte hain:

```bash
mkdir -p lib
```

```typescript
// Pehle kaam karo
import { PrismaClient } from '@prisma/client'

// "Ab Prisma client banana hai — iske liye constructor chahiye"
const prisma = new PrismaClient()

// "Ab is client ko export karna hai taaki dusre files use kar sake"
export default prisma
```

**Kyun yeh structure?**
- **lib/prisma.ts** - Reusable code ke liye folder
- **PrismaClient** - Database se interact karne ke liye class
- **export default** - Dusre files mein use karne ke liye

---

## Step 2: Database Connection Check Karo

Ab database connection check karte hain:

```typescript
// Pehle kaam karo
import prisma from './lib/prisma'

// "Ab database se data fetch karke dekhna hai ki connection kaam kar raha hai ya nahi"
async function checkConnection() {
  try {
    const todos = await prisma.todo.findMany()
    console.log('Database connection successful!', todos)
  } catch (error) {
    console.error('Database connection failed:', error)
  }
}

checkConnection()
```

**Kyun yeh code?**
- **findMany()** - Sab todos fetch karta hai
- **try-catch** - Error handling ke liye
- **console.log** - Debug karne ke liye

---

## Step 3: Client Usage Samjho

Ab client kaise use karte hain, samjho:

```typescript
// Pehle kaam karo
import prisma from './lib/prisma'

// "Ab alag alag operations karke dekhna hai ki client kaise kaam karta hai"
async function demoOperations() {
  // Create
  const newTodo = await prisma.todo.create({
    data: {
      title: 'Learn Server Actions',
      done: false
    }
  })

  // Read
  const allTodos = await prisma.todo.findMany()

  // Update
  const updatedTodo = await prisma.todo.update({
    where: { id: newTodo.id },
    data: { done: true }
  })

  // Delete
  await prisma.todo.delete({ where: { id: newTodo.id } })
}
```

**Har operation ka matlab:**
- **create()** - New data insert karta hai
- **findMany()** - Sab data fetch karta hai
- **update()** - Existing data update karta hai
- **delete()** - Data delete karta hai

---

## Step 4: Client Import Karne Ka Tarika

Ab client kaise import karte hain, samjho:

```typescript
// Pehle kaam karo
import prisma from './lib/prisma'

// "Ab alag alag files mein is client ko use karke dekhna hai"
async function getAllTodos() {
  // "Prisma client se database se data fetch kar rahe hain"
  const todos = await prisma.todo.findMany()
  return todos
}

export default function TodosList() {
  // "Ab humara function use karke data dikha rahe hain"
  const todos = getAllTodos()
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  )
}
```

**Import ka pattern:**
- **import prisma from './lib/prisma'** - Client import karna
- **prisma.todo** - Specific table use karna
- **findMany(), create()** - Operations use karna

---

## Summary — Doc 1.3 Mein Kya Sikha

✅ **Problem** - Bina client ke database se kaise baat karenge?
✅ **Client ka importance** - Translator jaisa, communication ke liye zaroori
✅ **lib/prisma.ts** - Reusable code ke liye folder aur file
✅ **Operations** - create, findMany, update, delete kaise kaam karte hain
✅ **Import pattern** - Dusre files mein kaise use karte hain

---

## Agla Step — Doc 1.4

**Doc 1.4: Environment Variables & Connection**

Abhi humne client setup kiya. Lekin database URL kaun handle karega? Kaise secure rahega? Woh samjhenge agle doc mein. 🚀