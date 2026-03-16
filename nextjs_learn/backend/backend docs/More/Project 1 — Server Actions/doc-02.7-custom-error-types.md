# Doc 2.7 — Custom Error Types ⚠️

## Pehle Problem Samjho — Bina Custom Errors Ke Kya Hoga?

Chalo ek scenario socho.

Tumne error handling samjha (Doc 2.6). Ab socha "Custom error types kaise banayenge?"

Ab **kaun decide karega ki custom error types kaise banane hain?**
**Kaise pata chalega ki kaun error kaun type ka hai?**
**Kaise pata chalega ki kaun error kaun handle kar raha hai?**

Sab kuch generic errors se kaam chalana padega — aur yeh bahut confusing hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message error types nahi hote, kaise pata chalega ki kaun message fail ho gaya?
- **Instagram** — agar post error types nahi hote, kaise pata chalega ki kaun post crash ho gaya?
- **Amazon** — agar order error types nahi hote, kaise pata chalega ki kaun order fail ho gaya?

---

## Custom Error Types Kya Hote Hain? (Real Life Analogy)

Custom Error Types ek **color-coded system** jaisa hai:

| Color | Meaning | App Development |
|-------|---------|-----------------|
| Red   | Critical | Database Error |
| Yellow| Warning | Validation Error |
| Blue  | Info    | Not Found Error |

Agar colors nahi hote, kaise pata chalega ki kaun cheez kis category mein aati hai? Isliye colors zaroori hain.

---

## Hum Kya Sikhenge?

Hum Custom Error Types sikhenge jisse:

1. **Errors categorize ho** - Errors automatically categorize ho
2. **Errors handle ho** - Errors properly handle ho
3. **App stable rahe** - App crash na ho

---

## Step 1: Custom Error Classes

Ab custom error classes banate hain:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab custom error classes banate hain"
class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}
```

**Kyun yeh classes?**
- **ValidationError** - Validation errors ke liye
- **DatabaseError** - Database errors ke liye
- **NotFoundError** - Not found errors ke liye

---

## Step 2: Custom Error Handling

Ab custom error handling samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab custom error handling ko samjhte hain"
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
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    } else if (error instanceof DatabaseError) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    } else if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      )
    } else {
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      )
    }
  }
}
```

**Custom handling:**
- **ValidationError** - 400 status
- **DatabaseError** - 500 status
- **NotFoundError** - 404 status

---

## Step 3: Custom Error Usage

Ab custom error usage samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab custom errors ko use karke dekhna hai"
export async function POST(req: Request) {
  try {
    const todo = await req.json()

    // "Ab validation check karte hain"
    if (!todo.title) {
      throw new ValidationError('Title is required')
    }

    if (todo.title.length > 100) {
      throw new ValidationError('Title too long')
    }

    const createdTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        done: false
      }
    })
    return NextResponse.json(createdTodo)
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    } else {
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      )
    }
  }
}
```

**Usage scenarios:**
- **Validation errors** - ValidationError throw karna
- **Database errors** - DatabaseError throw karna
- **Not found errors** - NotFoundError throw karna

---

## Step 4: Custom Error Types Structure

Ab structure samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab custom error types ko standardize karte hain"
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message)
    this.name = 'AppError'
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400)
  }
}

class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 'DATABASE_ERROR', 500)
  }
}

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 'NOT_FOUND_ERROR', 404)
  }
}
```

**Standardized structure:**
- **AppError** - Base error class
- **code** - Error code
- **status** - HTTP status code

---

## Step 5: Custom Error Types Testing

Ab testing samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab custom error types ko test karke dekhna hai"
export async function POST(req: Request) {
  try {
    const todo = await req.json()

    // "Test scenario 1: Validation error"
    if (!todo.title) {
      throw new ValidationError('Title is required')
    }

    // "Test scenario 2: Database error"
    const createdTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        done: false
      }
    })
    return NextResponse.json(createdTodo)
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    } else {
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      )
    }
  }
}
```

**Test scenarios:**
- **Validation errors** - ValidationError test karna
- **Database errors** - DatabaseError test karna
- **Not found errors** - NotFoundError test karna

---

## Summary — Doc 2.7 Mein Kya Sikha

✅ **Problem** - Bina custom errors ke error handling confusing ho sakta hai
✅ **Custom error types ka importance** - Color-coded system jaisa, clarity ke liye zaroori
✅ **Custom error classes** - Different error types ke liye alag classes
✅ **Custom error handling** - Different errors ko alag alag handle karna
✅ **Custom error usage** - Custom errors ko use karke error handling

---

## Agla Step — Doc 3.1

**Doc 3.1: Form with Server Actions**

Abhi humne custom error types samjhe. Lekin frontend mein kaise form banayenge? Kaise Server Actions use karenge? Woh samjhenge agle doc mein. 🚀