# Doc 2.4 — Update Todo (Toggle Done) 🔄

## Pehle Problem Samjho — Bina Update Ke Kya Hoga?

Chalo ek scenario socho.

Tumne todo read karna sikha (Doc 2.3). Ab socha "Todo kaise update karenge?"

Ab **kaun decide karega ki todo kaise update karna hai?**
**Kaise pata chalega ki kaun todo kaun update kar raha hai?**
**Kaise pata chalega ki kaun todo kaun sa hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message update karne ka tarika nahi hota, kaise pata chalega ki kaun message kisne edit kiya?
- **Instagram** — agar post update karne ka tarika nahi hota, kaise pata chalega ki kaun post kisne modify kiya?
- **Amazon** — agar order update karne ka tarika nahi hota, kaise pata chalega ki kaun order kisne change kiya?

---

## Update Todo Kya Hota Hai? (Real Life Analogy)

Update Todo ek **light switch** toggle karne jaisa hai:

| Light Switch | App Development |
|--------------|-----------------|
| On/Off        | Done/Not Done |
| Switch        | Update Operation |
| Light         | Todo Status |

Agar light switch nahi hota, kaise pata chalega ki light on hai ya off? Isliye switch zaroori hai.

---

## Hum Kya Sikhenge?

Hum Update Todo sikhenge jisse:

1. **Todo update ho** - Todo ka status change ho
2. **Data save ho** - Database mein save ho
3. **Response mile** - Frontend ko response mile

---

## Step 1: Update Server Action

Ab update Server Action banate hain:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab update Server Action banate hain — iske liye PATCH method chahiye"
export async function PATCH(req: Request, { params }) {
  // "Frontend se data aa raha hai — isko parse karna hai"
  const todo = await req.json()

  // "Ab database mein data update karna hai"
  const updatedTodo = await prisma.todo.update({
    where: { id: params.id },
    data: {
      done: todo.done
    }
  })

  // "Ab response bana kar bhejna hai"
  return NextResponse.json(updatedTodo)
}
```

**Kyun yeh structure?**
- **PATCH()** - Update operation ke liye
- **params.id** - Specific todo ka ID
- **prisma.todo.update()** - Database mein data update karta hai
- **NextResponse.json()** - Response format karta hai

---

## Step 2: Update Operation Ka Advantage

Ab advantage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab update operation ko detail se samjhte hain"
export async function PATCH(req: Request, { params }) {
  // "Ab database mein data update karne se pehle check karna hai"
  const todo = await req.json()

  // "Ab database mein data update kar rahe hain"
  const updatedTodo = await prisma.todo.update({
    where: { id: params.id },
    data: {
      done: todo.done,
      updatedAt: new Date()
    }
  })

  // "Ab response bana kar bhej rahe hain"
  return NextResponse.json(updatedTodo)
}
```

**Advantage:**
- **Partial update** - Sirf specific fields update karna
- **Timestamp** - Update time track karna
- **Type safety** - TypeScript se type checking

---

## Step 3: Update Operation Ka Usage

Ab usage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab update operation ko alag alag scenarios mein use karke dekhna hai"
export async function PATCH(req: Request, { params }) {
  // "Scenario 1: Basic update"
  const todo = await req.json()
  const updatedTodo = await prisma.todo.update({
    where: { id: params.id },
    data: {
      done: todo.done
    }
  })
  return NextResponse.json(updatedTodo)

  // "Scenario 2: With additional fields"
  const updatedTodoWithMeta = await prisma.todo.update({
    where: { id: params.id },
    data: {
      done: todo.done,
      updatedAt: new Date(),
      completedAt: todo.done ? new Date() : null
    }
  })
  return NextResponse.json(updatedTodoWithMeta)
}
```

**Scenarios:**
- **Basic update** - Simple update operation
- **With additional fields** - Extra fields ke saath update
- **With timestamps** - Time tracking ke saath update

---

## Step 4: Update Operation Ka Import Karne Ka Tarika

Ab import kaise karte hain, samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab alag alag files mein isko use karke dekhna hai"
export async function PATCH(req: Request, { params }) {
  // "Frontend se data aa raha hai — isko parse kar rahe hain"
  const todo = await req.json()

  // "Ab database mein data update kar rahe hain"
  const updatedTodo = await prisma.todo.update({
    where: { id: params.id },
    data: {
      done: todo.done
    }
  })

  // "Ab response bana kar bhej rahe hain"
  return NextResponse.json(updatedTodo)
}
```

**Import ka pattern:**
- **import { NextResponse }** - Next.js API routes ke liye
- **import prisma** - Database client ke liye
- **export async function PATCH** - Update operation export karne ke liye

---

## Step 5: Update Operation Ka Testing

Ab testing samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab update operation ko test karke dekhna hai"
export async function PATCH(req: Request, { params }) {
  // "Test scenario 1: Valid update"
  const todo = await req.json()
  if (todo.done !== undefined) {
    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: {
        done: todo.done
      }
    })
    return NextResponse.json(updatedTodo)
  }

  // "Test scenario 2: Invalid update"
  return NextResponse.json(
    { error: 'Invalid update data' },
    { status: 400 }
  )
}
```

**Test scenarios:**
- **Valid update** - Sahi data ke saath test
- **Invalid update** - Galat data ke saath test
- **Edge cases** - Boundary conditions ke saath test

---

## Summary — Doc 2.4 Mein Kya Sikha

✅ **Problem** - Bina update ke todo kaise toggle karenge?
✅ **Update Todo ka importance** - Light switch jaisa, status change karne ke liye zaroori
✅ **Update operation** - PATCH method se data update karna
✅ **Partial update** - Sirf specific fields update karna
✅ **Testing** - Operation ko test karna

---

## Agla Step — Doc 2.5

**Doc 2.5: Delete Todo**

Abhi humne todo update karna sikha. Lekin kaise delete karenge? Woh samjhenge agle doc mein. 🚀