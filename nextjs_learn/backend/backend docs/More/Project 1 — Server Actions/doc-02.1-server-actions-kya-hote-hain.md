# Doc 2.1 — Server Actions Kya Hote Hain? 🎯

## Pehle Problem Samjho — Bina Server Actions Ke Kya Hoga?

Chalo ek scenario socho.

Tumne project setup kar liya (Doc 1.1), schema design kiya (Doc 1.2), client setup kiya (Doc 1.3), aur environment variables setup kiye (Doc 1.4). Ab socha "Frontend se data kaise bhejna hai?"

Ab **kaun decide karega ki frontend se backend kaise baat karega?**
**Kaise pata chalega ki kaun API route kaun sa kaam karta hai?**
**Kaise pata chalega ki kaun function kaun sa logic implement karta hai?**

Sab kuch manually karna padega — aur yeh bahut complicated hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message send karne ka tarika nahi hota, kaise pata chalega ki kaun message kis server pe bhejna hai?
- **Instagram** — agar post karne ka tarika nahi hota, kaise pata chalega ki kaun post kis database mein daalna hai?
- **Amazon** — agar order karne ka tarika nahi hota, kaise pata chalega ki kaun order kis system mein daalna hai?

---

## Server Actions Kya Hote Hain? (Real Life Analogy)

Server Actions ek **waiter** jaisa hai:

| Communication | App Development |
|---------------|-----------------|
| Customer      | Frontend (React) |
| Waiter        | Server Actions |
| Kitchen       | Backend/API |
| Food          | Data/Response |

Agar waiter nahi hai, customer kitchen mein jaakar khud order kaise de? Isliye waiter zaroori hai.

---

## Hum Kya Sikhenge?

Hum Server Actions sikhenge jisse:

1. **Frontend se backend ka connection ho** - Frontend se data bhej sake
2. **API routes simple ho** - API routes manually banane ki zarurat nahi
3. **Type safety mile** - TypeScript se type checking

---

## Step 1: Server Actions Kya Hote Hain?

Ab Server Actions samjhte hain:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab Server Action banana hai — iske liye Next.js ki syntax chahiye"
export async function POST() {
  // "Frontend se data aa raha hai — isko parse karna hai"
  const todo = await request.json()

  // "Ab database mein data save karna hai"
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
- **POST()** - HTTP POST request handle karta hai
- **request.json()** - Frontend se aaya data parse karta hai
- **prisma.todo.create()** - Database mein data create karta hai
- **NextResponse.json()** - Response format karta hai

---

## Step 2: Server Actions Ka Advantage

Ab advantage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab Server Action banate hain — isme type safety bhi hai"
export async function POST(req: Request) {
  // "Frontend se data aa raha hai — isko parse kar rahe hain"
  const todo = await req.json()

  // "Ab database mein data save kar rahe hain"
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
- **Type safety** - TypeScript se type checking
- **Simple syntax** - API routes se simple
- **Built-in** - Next.js mein already available

---

## Step 3: Server Actions Ka Usage

Ab usage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab alag alag operations ke liye alag alag Server Actions banate hain"
export async function POST(req: Request) {
  // "Create operation ke liye"
  const todo = await req.json()
  const createdTodo = await prisma.todo.create({
    data: {
      title: todo.title,
      done: false
    }
  })
  return NextResponse.json(createdTodo)
}

export async function GET() {
  // "Read operation ke liye"
  const todos = await prisma.todo.findMany()
  return NextResponse.json(todos)
}

export async function PATCH(req: Request, { params }) {
  // "Update operation ke liye"
  const todo = await req.json()
  const updatedTodo = await prisma.todo.update({
    where: { id: params.id },
    data: { done: todo.done }
  })
  return NextResponse.json(updatedTodo)
}

export async function DELETE({ params }) {
  // "Delete operation ke liye"
  const deletedTodo = await prisma.todo.delete({
    where: { id: params.id }
  })
  return NextResponse.json(deletedTodo)
}
```

**Har operation ka matlab:**
- **POST()** - Create operation
- **GET()** - Read operation
- **PATCH()** - Update operation
- **DELETE()** - Delete operation

---

## Step 4: Server Actions Ka Import Karne Ka Tarika

Ab import kaise karte hain, samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab alag alag files mein isko use karke dekhna hai"
export async function POST(req: Request) {
  // "Frontend se data aa raha hai — isko parse kar rahe hain"
  const todo = await req.json()

  // "Ab database mein data save kar rahe hain"
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
- **export async function** - Server Action export karne ke liye

---

## Summary — Doc 2.1 Mein Kya Sikha

✅ **Problem** - Bina Server Actions ke frontend se backend kaise baat karega?
✅ **Server Actions ka importance** - Waiter jaisa, communication ke liye zaroori
✅ **Simple syntax** - API routes se simple
✅ **Type safety** - TypeScript se type checking
✅ **Operations** - POST, GET, PATCH, DELETE kaise kaam karte hain

---

## Agla Step — Doc 2.2

**Doc 2.2: Add Todo (Create)**

Abhi humne Server Actions samjhe. Lekin kaise add karenge todo? Kaise create karenge? Woh samjhenge agle doc mein. 🚀