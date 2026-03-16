# Doc 2.6 — Error Handling & Validation 🛡️

## Pehle Problem Samjho — Bina Error Handling Ke Kya Hoga?

Chalo ek scenario socho.

Tumne todo delete karna sikha (Doc 2.5). Ab socha "Error kaise handle karenge?"

Ab **kaun decide karega ki error kaise handle karna hai?**
**Kaise pata chalega ki kaun error kaun sa hai?**
**Kaise pata chalega ki kaun error kaun handle kar raha hai?**

Sab kuch manually karna padega — aur yeh bahut risky hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message error handle nahi hota, kaise pata chalega ki kaun message fail ho gaya?
- **Instagram** — agar post error handle nahi hota, kaise pata chalega ki kaun post crash ho gaya?
- **Amazon** — agar order error handle nahi hota, kaise pata chalega ki kaun order fail ho gaya?

---

## Error Handling Kya Hota Hai? (Real Life Analogy)

Error Handling ek **fire alarm** jaisa hai:

| Fire Alarm | App Development |
|------------|-----------------|
| Smoke       | Error/Problem |
| Alarm       | Error Detection |
| Response    | Error Handling |
| Safety      | App Stability |

Agar fire alarm nahi hota, kaise pata chalega ki aag lagi hai? Isliye alarm zaroori hai.

---

## Hum Kya Sikhenge?

Hum Error Handling sikhenge jisse:

1. **Errors detect ho** - Errors automatically detect ho
2. **Errors handle ho** - Errors properly handle ho
3. **App stable rahe** - App crash na ho

---

## Step 1: Basic Error Handling

Ab basic error handling samjhte hain:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab error handling ko samjhte hain — iske liye try-catch chahiye"
export async function POST(req: Request) {
  try {
    // "Ab database mein data create karne ki koshish karte hain"
    const todo = await req.json()
    const createdTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        done: false
      }
    })

    // "Ab response bana kar bhejte hain"
    return NextResponse.json(createdTodo)
  } catch (error) {
    // "Ab error ko handle karte hain"
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
```

**Kyun yeh structure?**
- **try-catch** - Error handling ke liye
- **500 status** - Server error ke liye
- **catch block** - Error ko handle karne ke liye

---

## Step 2: Specific Error Handling

Ab specific error handling samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab specific errors ko handle karte hain"
export async function POST(req: Request) {
  try {
    const todo = await req.json()
    const createdTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        done: false
      }
    })
    return NextResponse.json(createdTodo)
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // "Database specific errors"
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Duplicate entry' },
          { status: 400 }
        )
      }
    } else if (error instanceof PrismaClientUnknownRequestError) {
      // "Unknown errors"
      return NextResponse.json(
        { error: 'Unknown error' },
        { status: 500 }
      )
    } else {
      // "General errors"
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      )
    }
  }
}
```

**Specific errors:**
- **P2002** - Duplicate entry error
- **400 status** - Bad request
- **500 status** - Server error

---

## Step 3: Validation Handling

Ab validation handling samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab validation ko handle karte hain"
export async function POST(req: Request) {
  try {
    const todo = await req.json()

    // "Ab validation check karte hain"
    if (!todo.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    if (todo.title.length > 100) {
      return NextResponse.json(
        { error: 'Title too long' },
        { status: 400 }
      )
    }

    const createdTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        done: false
      }
    })
    return NextResponse.json(createdTodo)
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
```

**Validation checks:**
- **Required fields** - Mandatory fields check
- **Length validation** - Length check
- **Type validation** - Data type check

---

## Step 4: Error Response Structure

Ab error response structure samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab error response ko standardize karte hain"
export async function POST(req: Request) {
  try {
    const todo = await req.json()
    const createdTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        done: false
      }
    })
    return NextResponse.json(createdTodo)
  } catch (error) {
    // "Ab standardized error response bana rahe hain"
    const errorResponse = {
      error: {
        message: 'Something went wrong',
        code: 'INTERNAL_ERROR',
        details: error.message
      }
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
```

**Standardized structure:**
- **message** - Error message
- **code** - Error code
- **details** - Error details

---

## Step 5: Error Logging

Ab error logging samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab error ko log karke dekhna hai"
export async function POST(req: Request) {
  try {
    const todo = await req.json()
    const createdTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        done: false
      }
    })
    return NextResponse.json(createdTodo)
  } catch (error) {
    // "Ab error ko log kar rahe hain"
    console.error('Error creating todo:', error)

    // "Ab response bana rahe hain"
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
```

**Logging:**
- **console.error** - Error log karna
- **Error details** - Error details log karna
- **Monitoring** - Error monitoring

---

## Summary — Doc 2.6 Mein Kya Sikha

✅ **Problem** - Bina error handling ke app crash ho sakta hai
✅ **Error handling ka importance** - Fire alarm jaisa, safety ke liye zaroori
✅ **Basic error handling** - try-catch se error handle karna
✅ **Specific error handling** - Different errors ko alag alag handle karna
✅ **Validation handling** - Data validate karke error handle karna

---

## Agla Step — Doc 2.7

**Doc 2.7: Custom Error Types**

Abhi humne error handling samjha. Lekin custom error types kaise banayenge? Woh samjhenge agle doc mein. 🚀