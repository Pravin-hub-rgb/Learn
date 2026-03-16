# Doc 1.4 — Environment Variables & Connection 🔐

## Pehle Problem Samjho — Bina Secure Connection Ke Kya Hoga?

Chalo ek scenario socho.

Tumne project setup kar liya (Doc 1.1), schema design kar liya (Doc 1.2), aur client setup kar liya (Doc 1.3). Ab socha "Database URL kaise secure rahega?"

Ab **kaun decide karega ki database URL kahan save hona chahiye?**
**Kaise pata chalega ki kaun URL kaun use kar raha hai?**
**Kaise pata chalega ki kaun URL leak nahi hona chahiye?**

Sab kuch openly karna padega — aur yeh bahut unsafe hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message server ka URL leak ho jaye, kaise pata chalega ki kaun server hack ho raha hai?
- **Instagram** — agar database URL leak ho jaye, kaise pata chalega ki kaun data compromise ho raha hai?
- **Amazon** — agar payment gateway ka URL leak ho jaye, kaise pata chalega ki kaun transaction hack ho raha hai?

---

## Environment Variables Kya Hote Hain? (Real Life Analogy)

Environment variables ek **locker** jaisa hai:

| Storage Method | Security Level |
|----------------|----------------|
| Open paper     | Low (unsafe)   |
| Locker         | Medium (safe)  |
| Bank vault     | High (very safe)|

Agar password open paper pe likha hua ho, koi bhi padh sakta hai. Isliye locker mein rakhte hain.

---

## Hum Kya Setup Karenge?

Hum environment variables setup karenge jisse:

1. **Database URL secure rahe** - URL leak na ho
2. **Configuration manage ho** - Alag alag environments ke liye alag settings
3. **Code clean rahe** - Hardcoded values na ho

---

## Step 1: .env File Create Karo

Ab .env file create karte hain:

```bash
touch .env
```

```env
# Pehle kaam karo
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"

# "Ab is URL ko secure karna hai — iske liye .env file mein daalna hai"
DATABASE_URL="postgresql://nextjs:password@localhost:5432/server_actions"

# "Ab is file ko .gitignore mein daalna hai taaki git mein na jaaye"
```

**Kyun yeh structure?**
- **.env** - Secret variables ke liye file
- **DATABASE_URL** - Database connection string
- **.gitignore** - Git mein na jaane ke liye

---

## Step 2: .gitignore File Edit Karo

Ab .gitignore file edit karte hain:

```gitignore
# Pehle kaam karo
node_modules/
.next/
.env.local
.env.development.local
.env.test.local
.env.production.local

# "Ab .env file ko bhi add karna hai taaki wo bhi git mein na jaaye"
.env
```

**Kyun yeh entries?**
- **.env** - Environment variables file
- **.env.local** - Local environment variables
- **.env.development** - Development environment variables
- **.env.test** - Test environment variables
- **.env.production** - Production environment variables

---

## Step 3: Database Connection Check Karo

Ab database connection check karte hain:

```typescript
// Pehle kaam karo
import prisma from './lib/prisma'

// "Ab environment variables se database URL lekar connection check karte hain"
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
- **import prisma** - Client import karna
- **findMany()** - Data fetch karke check karna
- **try-catch** - Error handling ke liye

---

## Step 4: Environment Variables Import Karne Ka Tarika

Ab environment variables kaise import karte hain, samjho:

```typescript
// Pehle kaam karo
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

// "Ab environment variables ko use karke response bana rahe hain"
export async function GET() {
  // "Database se data fetch kar rahe hain"
  const todos = await prisma.todo.findMany()

  // "Ab response banane ke liye NextResponse use kar rahe hain"
  return NextResponse.json(todos)
}
```

**Import ka pattern:**
- **import { NextResponse }** - Next.js API routes ke liye
- **import prisma** - Database client ke liye
- **NextResponse.json()** - Response format karne ke liye

---

## Step 5: Multiple Environment Setup

Ab multiple environments setup karte hain:

```env
# Development environment
DATABASE_URL="postgresql://nextjs:password@localhost:5432/server_actions_dev"

# Test environment
DATABASE_URL="postgresql://nextjs:password@localhost:5432/server_actions_test"

# Production environment
DATABASE_URL="postgresql://nextjs:password@localhost:5432/server_actions_prod"
```

**Kyun alag alag environments?**
- **Development** - Local development ke liye
- **Test** - Testing ke liye
- **Production** - Live deployment ke liye

---

## Summary — Doc 1.4 Mein Kya Sikha

✅ **Problem** - Bina secure connection ke database URL leak ho sakta hai
✅ **Environment variables ka importance** - Locker jaisa, security ke liye zaroori
✅ **.env file** - Secret variables ke liye file
✅ **.gitignore** - Git mein na jaane ke liye
✅ **Multiple environments** - Alag alag settings ke liye alag files

---

## Agla Step — Doc 2.1

**Doc 2.1: Server Actions Kya Hote Hain?**

Abhi humne project setup kiya, schema design kiya, client setup kiya, aur environment variables setup kiye. Ab actual Server Actions samjhenge. 🚀