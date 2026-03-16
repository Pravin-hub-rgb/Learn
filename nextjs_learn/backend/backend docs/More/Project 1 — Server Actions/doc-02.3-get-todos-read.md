# Doc 2.3 — Get Todos (Read) 📖

## Pehle Problem Samjho — Bina Read Ke Kya Hoga?

Chalo ek scenario socho.

Tumne todo add karna sikha (Doc 2.2). Ab socha "Todo kaise dikhayenge?"

Ab **kaun decide karega ki todo kaise dikhana hai?**
**Kaise pata chalega ki kaun todo kaun sa hai?**
**Kaise pata chalega ki kaun todo kaun si hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message read karne ka tarika nahi hota, kaise pata chalega ki kaun message kisne bheja?
- **Instagram** — agar post read karne ka tarika nahi hota, kaise pata chalega ki kaun post kisne kiya?
- **Amazon** — agar product read karne ka tarika nahi hota, kaise pata chalega ki kaun product kis category mein aata hai?

---

## Get Todos Kya Hota Hai? (Real Life Analogy)

Get Todos ek **library** mein books dhoondne jaisa hai:

| Library Search | App Development |
|----------------|-----------------|
| Book Title     | Todo Title |
| Book ID        | Todo ID |
| Book Status    | Todo Status |
| Book Location  | Database Location |

Agar library mein books dhoondne ka tarika nahi hota, kaise pata chalega ki kaun book kahan hai? Isliye search zaroori hai.

---

## Hum Kya Sikhenge?

Hum Get Todos sikhenge jisse:

1. **Todo read ho** - Sab todos fetch ho
2. **Data display ho** - Frontend mein display ho
3. **Response mile** - Frontend ko response mile

---

## Step 1: Read Server Action

Ab read Server Action banate hain:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab read Server Action banate hain — iske liye GET method chahiye"
export async function GET() {
  // "Ab database se data fetch karna hai"
  const todos = await prisma.todo.findMany()

  // "Ab response bana kar bhejna hai"
  return NextResponse.json(todos)
}
```

**Kyun yeh structure?**
- **GET()** - Read operation ke liye
- **prisma.todo.findMany()** - Sab todos fetch karta hai
- **NextResponse.json()** - Response format karta hai

---

## Step 2: Read Operation Ka Advantage

Ab advantage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab read operation ko detail se samjhte hain"
export async function GET() {
  // "Ab database se data fetch karne se pehle sort karna hai"
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  // "Ab response bana kar bhej rahe hain"
  return NextResponse.json(todos)
}
```

**Advantage:**
- **Sorting** - Data sort karna
- **Filtering** - Data filter karna
- **Pagination** - Data paginate karna

---

## Step 3: Read Operation Ka Usage

Ab usage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab read operation ko alag alag scenarios mein use karke dekhna hai"
export async function GET() {
  // "Scenario 1: Basic read"
  const todos = await prisma.todo.findMany()
  return NextResponse.json(todos)

  // "Scenario 2: With sorting"
  const sortedTodos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return NextResponse.json(sortedTodos)

  // "Scenario 3: With filtering"
  const filteredTodos = await prisma.todo.findMany({
    where: {
      done: false
    }
  })
  return NextResponse.json(filteredTodos)
}
```

**Scenarios:**
- **Basic read** - Simple read operation
- **With sorting** - Data sort karke read
- **With filtering** - Data filter karke read

---

## Step 4: Read Operation Ka Import Karne Ka Tarika

Ab import kaise karte hain, samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab alag alag files mein isko use karke dekhna hai"
export async function GET() {
  // "Ab database se data fetch kar rahe hain"
  const todos = await prisma.todo.findMany()

  // "Ab response bana kar bhej rahe hain"
  return NextResponse.json(todos)
}
```

**Import ka pattern:**
- **import { NextResponse }** - Next.js API routes ke liye
- **import prisma** - Database client ke liye
- **export async function GET** - Read operation export karne ke liye

---

## Step 5: Read Operation Ka Testing

Ab testing samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab read operation ko test karke dekhna hai"
export async function GET() {
  // "Test scenario 1: Basic read"
  const todos = await prisma.todo.findMany()
  if (todos) {
    return NextResponse.json(todos)
  }

  // "Test scenario 2: Empty data"
  return NextResponse.json(
    { error: 'No todos found' },
    { status: 404 }
  )
}
```

**Test scenarios:**
- **Basic read** - Sahi data ke saath test
- **Empty data** - Empty data ke saath test
- **Error handling** - Error handling ke saath test

---

## Summary — Doc 2.3 Mein Kya Sikha

✅ **Problem** - Bina read ke todo kaise dikhayenge?
✅ **Get Todos ka importance** - Library search jaisa, data dhoondne ke liye zaroori
✅ **Read operation** - GET method se data fetch karna
✅ **Sorting & filtering** - Data sort aur filter karna
✅ **Testing** - Operation ko test karna

---

## Agla Step — Doc 2.4

**Doc 2.4: Update Todo (Toggle Done)**

Abhi humne todo read karna sikha. Lekin kaise update karenge? Kaise toggle karenge? Woh samjhenge agle doc mein. 🚀