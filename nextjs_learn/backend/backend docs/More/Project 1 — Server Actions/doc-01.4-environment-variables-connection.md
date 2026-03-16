# Doc 1.4 — Environment Variables & Connection 🔐

## Pehle Problem Samjho — Bina Secure Connection Ke Kya Hoga?

Chalo ek scenario socho.

Tumne client setup kar liya (Doc 1.3). Ab socha "Database URL kaun provide karega?"

Ab **kaun decide karega ki database URL kaise provide karna hai?**
**Kaise pata chalega ki kaun URL kaun use kar raha hai?**
**Kaise pata chalega ki kaun URL kaun save kar raha hai?**

Sab kuch hardcoded karna padega — aur yeh bahut unsafe hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar database URL hardcoded hota, kaise pata chalega ki kaun URL kaun use kar raha hai?
- **Instagram** — agar backend URL hardcoded hota, kaise pata chalega ki kaun URL kaun use kar raha hai?
- **Amazon** - agar database URL hardcoded hota, kaise pata chalega ki kaun URL kaun use kar raha hai?

---

## Environment Variables Kya Hote Hain? (Real Life Analogy)

Environment Variables ek **locker** jaisa hai:

| Locker | App Development |
|--------|-----------------|
| Key     | Environment Variable |
| Locker  | .env file       |
| Contents| Sensitive Data  |
| Access  | Process.env     |

Agar locker nahi hota, kaise pata chalega ki kaun key kaun use kar raha hai? Isliye locker zaroori hai.

---

## Hum Kya Setup Karenge?

Hum Environment Variables setup karenge jisse:

1. **Database URL secure ho** - URL safe rahe
2. **Configuration manage ho** - Settings easily manage ho
3. **Multiple environments ho** - Development, production alag ho

---

## Step 1: .env File Create Karo

Ab .env file create karte hain:

```bash
touch .env
```

**Kyun .env file?**
- Sensitive data ke liye
- Environment variables ke liye
- Convention hai ki .env mein secrets rakha jata hai

---

## Step 2: Database URL Add Karo

Ab database URL add karte hain:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
```

**Kyun yeh format?**
- **postgresql://** - Database type
- **username:password** - Credentials
- **localhost:5432** - Host aur port
- **mydb** - Database name

---

## Step 3: Schema.prisma File Edit Karo

Ab schema.prisma file edit karte hain:

```prisma
// Pehle kaam karo
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// "Ab model define karna hai — iske liye Prisma ki syntax chahiye"
model Todo {
  id        String   @id @default(cuid())
  title     String
  done      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

**Kyun env("DATABASE_URL")?**
- **env()** - Environment variable ko access karta hai
- **DATABASE_URL** - Variable ka name
- **.env file** - Variable ka source

---

## Step 4: Connection Test Karo

Ab connection test karte hain:

```bash
npx prisma db seed --preview-feature
```

Yeh command kya karta hai:
- Database mein data seed karta hai
- Connection test karta hai
- Ready karta hai database ko use karne ke liye

---

## Step 5: Connection Samjho

Ab humara connection ready hai. Socho:

```typescript
// Pehle kaam karo
import prisma from './lib/prisma'

// "Ab database se data fetch karna hai — iske liye prisma client chahiye"
const allTodos = await prisma.todo.findMany()

// "Ab is data ko use kar sakte hain"
console.log(allTodos)
```

**Connection flow:**
- **.env file** - URL provide karta hai
- **env()** - URL ko access karta hai
- **prisma client** - URL ko use karta hai
- **Database** - Connection establish karta hai

---

## Summary — Doc 1.4 Mein Kya Sikha

✅ **Problem** - Bina secure connection ke database URL kaise provide karenge?
✅ **Environment variables ka importance** - Locker jaisa, sensitive data ke liye zaroori
✅ **.env file** - Secrets ke liye convention
✅ **env() function** - Variable ko access karne ka tarika
✅ **Connection test** - Kaise check karte hain ki connection kaam kar raha hai

---

## Agla Step — Doc 2.1

**Doc 2.1: Server Actions Kya Hote Hain?**

Abhi humne project setup kiya. Lekin Server Actions kya hote hain? Kaise kaam karte hain? Woh samjhenge agle doc mein. 🚀