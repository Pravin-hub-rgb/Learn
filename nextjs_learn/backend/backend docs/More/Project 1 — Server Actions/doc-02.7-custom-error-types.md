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
// "Ab custom error classes banate hain"
// "Custom error classes banane ke liye Error class extend karte hain"
// "Har error ka apna class banate hain"
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
// "Ab custom error handling ko samjhte hain"
// "Custom errors ko handle karne ke liye instanceof use karte hain"
// "Har error ko alag alag handle karte hain"
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
// "Ab custom errors ko use karke dekhna hai"
// "Custom errors ko throw karke use karte hain"
// "Validation mein custom errors use karte hain"
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
// "Ab custom error types ko standardize karte hain"
// "Base error class banate hain"
// "Har error ko base class se extend karte hain"
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
// "Ab custom error types ko test karke dekhna hai"
// "Custom errors ko test karke dekhna hai"
// "Error handling ko test karke dekhna hai"
```

**Test scenarios:**
- **Validation errors** - ValidationError test karna
- **Database errors** - DatabaseError test karna
- **Not found errors** - NotFoundError test karna

---

## Step 6: Complete Custom Error Types

Ab complete custom error types banate hain:

```typescript
// Pehle kaam karo
// "Ab complete custom error types banate hain"
// "Sab steps ko mila kar ek structure banate hain"
// "Error handling ko complete karte hain"
```

**Complete structure:**
```typescript
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

---

## Step 7: Complete Error Handling with Custom Types

Ab complete error handling banate hain:

```typescript
// Pehle kaam karo
// "Ab complete error handling banate hain"
// "Custom errors ko use karke error handling karte hain"
// "Validation mein custom errors use karte hain"
```

**Complete function:**
```typescript
export async function POST(req: Request) {
  try {
    // Data parse karo
    const todo = await req.json()

    // Validation check karo
    if (!todo.title) {
      throw new ValidationError('Title is required')
    }

    if (todo.title.length > 100) {
      throw new ValidationError('Title too long')
    }

    // Database mein create karo
    const createdTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        done: false
      }
    })

    // Response banao
    return NextResponse.json(createdTodo)
  } catch (error) {
    // Error ko handle karo
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      )
    } else if (error instanceof DatabaseError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
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