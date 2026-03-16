# Doc 2.5 — Delete Todo 🗑️

## Pehle Problem Samjho — Bina Delete Ke Kya Hoga?

Chalo ek scenario socho.

Tumne todo update karna sikha (Doc 2.4). Ab socha "Todo kaise delete karenge?"

Ab **kaun decide karega ki todo kaise delete karna hai?**
**Kaise pata chalega ki kaun todo kaun delete kar raha hai?**
**Kaise pata chalega ki kaun todo kaun sa hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message delete karne ka tarika nahi hota, kaise pata chalega ki kaun message kisne delete kiya?
- **Instagram** — agar post delete karne ka tarika nahi hota, kaise pata chalega ki kaun post kisne delete kiya?
- **Amazon** — agar order delete karne ka tarika nahi hota, kaise pata chalega ki kaun order kisne delete kiya?

---

## Delete Todo Kya Hota Hai? (Real Life Analogy)

Delete Todo ek **dustbin** mein daalne jaisa hai:

| Dustbin | App Development |
|---------|-----------------|
| Trash   | Deleted Data |
| Throw   | Delete Operation |
| Empty   | Database Cleanup |

Agar dustbin nahi hota, kaise pata chalega ki kaun kachra kahan daala? Isliye dustbin zaroori hai.

---

## Hum Kya Sikhenge?

Hum Delete Todo sikhenge jisse:

1. **Todo delete ho** - Todo permanently remove ho
2. **Data cleanup ho** - Database clean ho
3. **Response mile** - Frontend ko response mile

---

## Step 1: Delete Server Action

Ab delete Server Action banate hain:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab delete Server Action banate hain — iske liye DELETE method chahiye"
export async function DELETE({ params }) {
  // "Ab database mein data delete karna hai"
  const deletedTodo = await prisma.todo.delete({
    where: { id: params.id }
  })

  // "Ab response bana kar bhejna hai"
  return NextResponse.json(deletedTodo)
}
```

**Kyun yeh structure?**
- **DELETE()** - Delete operation ke liye
- **params.id** - Specific todo ka ID
- **prisma.todo.delete()** - Database mein data delete karta hai
- **NextResponse.json()** - Response format karta hai

---

## Step 2: Delete Operation Ka Advantage

Ab advantage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab delete operation ko detail se samjhte hain"
export async function DELETE({ params }) {
  // "Ab database mein data delete karne se pehle check karna hai"
  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id: params.id }
    })
    return NextResponse.json(deletedTodo)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    )
  }
}
```

**Advantage:**
- **Error handling** - Error handle karna
- **Soft delete** - Data permanently delete nahi karna
- **Type safety** - TypeScript se type checking

---

## Step 3: Delete Operation Ka Usage

Ab usage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab delete operation ko alag alag scenarios mein use karke dekhna hai"
export async function DELETE({ params }) {
  // "Scenario 1: Basic delete"
  const deletedTodo = await prisma.todo.delete({
    where: { id: params.id }
  })
  return NextResponse.json(deletedTodo)

  // "Scenario 2: With soft delete"
  const softDeletedTodo = await prisma.todo.update({
    where: { id: params.id },
    data: {
      deletedAt: new Date()
    }
  })
  return NextResponse.json(softDeletedTodo)
}
```

**Scenarios:**
- **Basic delete** - Simple delete operation
- **Soft delete** - Data permanently delete nahi karna
- **With timestamps** - Time tracking ke saath delete

---

## Step 4: Delete Operation Ka Import Karne Ka Tarika

Ab import kaise karte hain, samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab alag alag files mein isko use karke dekhna hai"
export async function DELETE({ params }) {
  // "Ab database mein data delete kar rahe hain"
  const deletedTodo = await prisma.todo.delete({
    where: { id: params.id }
  })

  // "Ab response bana kar bhej rahe hain"
  return NextResponse.json(deletedTodo)
}
```

**Import ka pattern:**
- **import { NextResponse }** - Next.js API routes ke liye
- **import prisma** - Database client ke liye
- **export async function DELETE** - Delete operation export karne ke liye

---

## Step 5: Delete Operation Ka Testing

Ab testing samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab delete operation ko test karke dekhna hai"
export async function DELETE({ params }) {
  // "Test scenario 1: Valid delete"
  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id: params.id }
    })
    return NextResponse.json(deletedTodo)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    )
  }

  // "Test scenario 2: Invalid delete"
  return NextResponse.json(
    { error: 'Invalid delete request' },
    { status: 400 }
  )
}
```

**Test scenarios:**
- **Valid delete** - Sahi data ke saath test
- **Invalid delete** - Galat data ke saath test
- **Error handling** - Error handling ke saath test

---

## Summary — Doc 2.5 Mein Kya Sikha

✅ **Problem** - Bina delete ke todo kaise remove karenge?
✅ **Delete Todo ka importance** - Dustbin jaisa, data remove karne ke liye zaroori
✅ **Delete operation** - DELETE method se data delete karna
✅ **Error handling** - Error handle karna
✅ **Testing** - Operation ko test karna

---

## Agla Step — Doc 2.6

**Doc 2.6: Error Handling & Validation**

Abhi humne todo delete karna sikha. Lekin error kaise handle karenge? Validation kaise karenge? Woh samjhenge agle doc mein. 🚀