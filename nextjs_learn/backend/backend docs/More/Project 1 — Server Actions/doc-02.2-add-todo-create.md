# Doc 2.2 — Add Todo (Create) ✍️

## Pehle Problem Samjho — Bina Create Ke Kya Hoga?

Chalo ek scenario socho.

Tumne Server Actions samjh liye (Doc 2.1). Ab socha "Todo kaise add karenge?"

Ab **kaun decide karega ki todo kaise add karna hai?**
**Kaise pata chalega ki kaun todo kaun add kar raha hai?**
**Kaise pata chalega ki kaun todo kaun sa hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message add karne ka tarika nahi hota, kaise pata chalega ki kaun message kis group mein add hua?
- **Instagram** — agar post add karne ka tarika nahi hota, kaise pata chalega ki kaun post kis profile mein add hua?
- **Amazon** — agar product add karne ka tarika nahi hota, kaise pata chalega ki kaun product kis cart mein add hua?

---

## Add Todo Kya Hota Hai? (Real Life Analogy)

Add Todo ek **notebook** mein entry karne jaisa hai:

| Notebook Entry | App Development |
|----------------|-----------------|
| Page            | Database Table |
| Line            | Record/Row |
| Writing          | Insert Operation |
| Page Number      | ID/Unique Identifier |

Agar notebook mein entry nahi karte, kaise pata chalega ki kaun kya likha? Isliye entry zaroori hai.

---

## Hum Kya Sikhenge?

Hum Add Todo sikhenge jisse:

1. **Todo create ho** - New todo add ho
2. **Data save ho** - Database mein save ho
3. **Response mile** - Frontend ko response mile

---

## Step 1: Create Server Action

Ab create Server Action banate hain:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab create Server Action banate hain — iske liye POST method chahiye"
export async function POST(req: Request) {
  // "Frontend se data aa raha hai — isko parse karna hai"
  const todo = await req.json()

  // "Ab database mein data create karna hai"
  const createdTodo = await prisma.todo.create({
    data: {
      title: todo.title,
      done: false
    }
  })

  // "Ab response bana kar bhejna hai"
  return NextResponse.json(createdTodo)
}
```

**Kyun yeh structure?**
- **POST()** - Create operation ke liye
- **req.json()** - Frontend se aaya data parse karta hai
- **prisma.todo.create()** - Database mein data create karta hai
- **NextResponse.json()** - Response format karta hai

---

## Step 2: Create Operation Ka Advantage

Ab advantage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab create operation ko detail se samjhte hain"
export async function POST(req: Request) {
  // "Frontend se data aa raha hai — isko validate karna hai"
  const todo = await req.json()

  // "Ab database mein data create karne se pehle check karna hai"
  if (!todo.title) {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    )
  }

  // "Ab database mein data create kar rahe hain"
  const createdTodo = await prisma.todo.create({
    data: {
      title: todo.title,
      done: false
    }
  })

  // "Ab response bana kar bhej rahe hain"
  return NextResponse.json(createdTodo)
}
```

**Advantage:**
- **Validation** - Data validate karna
- **Error handling** - Error handle karna
- **Type safety** - TypeScript se type checking

---

## Step 3: Create Operation Ka Usage

Ab usage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab create operation ko alag alag scenarios mein use karke dekhna hai"
export async function POST(req: Request) {
  // "Scenario 1: Basic create"
  const todo = await req.json()
  const createdTodo = await prisma.todo.create({
    data: {
      title: todo.title,
      done: false
    }
  })
  return NextResponse.json(createdTodo)

  // "Scenario 2: With validation"
  if (!todo.title) {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    )
  }

  // "Scenario 3: With additional fields"
  const createdTodoWithMeta = await prisma.todo.create({
    data: {
      title: todo.title,
      done: false,
      createdAt: new Date()
    }
  })
  return NextResponse.json(createdTodoWithMeta)
}
```

**Scenarios:**
- **Basic create** - Simple create operation
- **With validation** - Data validate karke create
- **With additional fields** - Extra fields ke saath create

---

## Step 4: Create Operation Ka Import Karne Ka Tarika

Ab import kaise karte hain, samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab alag alag files mein isko use karke dekhna hai"
export async function POST(req: Request) {
  // "Frontend se data aa raha hai — isko parse kar rahe hain"
  const todo = await req.json()

  // "Ab database mein data create kar rahe hain"
  const createdTodo = await prisma.todo.create({
    data: {
      title: todo.title,
      done: false
    }
  })

  // "Ab response bana kar bhej rahe hain"
  return NextResponse.json(createdTodo)
}
```

**Import ka pattern:**
- **import { NextResponse }** - Next.js API routes ke liye
- **import prisma** - Database client ke liye
- **export async function POST** - Create operation export karne ke liye

---

## Step 5: Create Operation Ka Testing

Ab testing samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab create operation ko test karke dekhna hai"
export async function POST(req: Request) {
  // "Test scenario 1: Valid data"
  const todo = await req.json()
  if (todo.title) {
    const createdTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        done: false
      }
    })
    return NextResponse.json(createdTodo)
  }

  // "Test scenario 2: Invalid data"
  return NextResponse.json(
    { error: 'Invalid data' },
    { status: 400 }
  )
}
```

**Test scenarios:**
- **Valid data** - Sahi data ke saath test
- **Invalid data** - Galat data ke saath test
- **Edge cases** - Boundary conditions ke saath test

---

## Summary — Doc 2.2 Mein Kya Sikha

✅ **Problem** - Bina create ke todo kaise add karenge?
✅ **Add Todo ka importance** - Notebook entry jaisa, data add karne ke liye zaroori
✅ **Create operation** - POST method se data create karna
✅ **Validation** - Data validate karna
✅ **Testing** - Operation ko test karna

---

## Agla Step — Doc 2.3

**Doc 2.3: Get Todos (Read)**

Abhi humne todo add karna sikha. Lekin kaise dikhayenge? Kaise read karenge? Woh samjhenge agle doc mein. 🚀