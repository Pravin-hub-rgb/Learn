# Doc 06.2 — GET Function Complete Karna 🔧
### (Hardcoded se Real Data tak — Step by Step)

---

## Pehle Yaad Karte Hain

Doc 06.1 mein humne:
- Problem samjha — frontend aur backend alag hain
- `app/api/todos/route.ts` file banayi
- GET function ka skeleton likha

**Abhi file kaisi hai:**

```typescript
// app/api/todos/route.ts
export async function GET() {
  // Yahan code aayega
}
```

**Ab is function mein kya karna hai?**

Seedha database pe jump nahi karte — pehle ek ek cheez verify karte hain. Pehle dekho ki route kaam kar raha hai, phir database connect karo, phir real data fetch karo.

---

## Step 1 — Pehle Route Ko Kaam Karte Dekho

Function abhi kuch return nahi karta. Pehla kaam — kuch toh response bhejo.

**`NextResponse` ki zaroorat aayi — import karo:**

```typescript
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Hello from API!" }, { status: 200 })
}
```

**`NextResponse` kya hai?**

Next.js ka built-in helper — response banata hai JSON format mein, status code ke saath.

`NextResponse.json()` ke do parts:
- Pehla argument — jo data bhejni hai
- Doosra — `{ status: 200 }` — HTTP status code

**Status code kya hota hai?**

Server aur browser ke beech ek convention — numbers se batate hain kya hua:

| Code | Matlab | Kab use karein |
|------|--------|----------------|
| `200` | OK — sab theek | Data successfully mila |
| `201` | Created | Naya item bana |
| `400` | Bad Request | User ne galat data bheja |
| `404` | Not Found | Item exist nahi karta |
| `500` | Server Error | Humari side pe gadbad |

---

## ⚠️ Teen Common Mistakes — Dhyan Rakho

Yeh teen galtiyan bahut common hain — pehle se pata ho toh bachoge.

**Mistake 1 — `export default` mat likho:**

```typescript
// ❌ Galat — Next.js isko API route nahi manega
export default function Get() { ... }

// ✅ Sahi
export async function GET() { ... }
```

`export default` se Next.js ko pata nahi chalta ki yeh GET requests handle karta hai. Seedha `export` hona chahiye.

**Mistake 2 — Function naam capital mein likhna zaroori hai:**

```typescript
// ❌ Galat — 405 Method Not Allowed error aayega
export async function get() { ... }
export async function Get() { ... }

// ✅ Sahi — exactly capital GET
export async function GET() { ... }
```

Next.js exactly `GET`, `POST`, `DELETE` dhooondta hai — case sensitive hai.

**Mistake 3 — `status` galat jagah mat daalo:**

```typescript
// ❌ Galat — status JSON data ke andar chala gaya
NextResponse.json({ message: "Hello", status: 200 })

// ✅ Sahi — status alag doosre argument mein hota hai
NextResponse.json({ message: "Hello" }, { status: 200 })
```

`NextResponse.json()` ke **do alag arguments** hote hain — pehla data, doosra options.

---

## ✅ Pehli Baar Test Karo

Server chala lo — `npm run dev` ya `bun dev`.

Browser mein jaao:
```
http://localhost:3000/api/todos
```

Yeh dikhna chahiye:
```json
{ "message": "Hello from API!" }
```

**Agar dikh raha hai — route kaam kar raha hai!** 🎉

Ab aage badhte hain.

---

## Step 2 — Database Se Connect Karo

Abhi response mein hardcoded message hai. Real data chahiye — database se.

Database se kaam karne ke liye pehle **connect** karna padega. `lib/mongodb.ts` mein humne `connectDB` function banaya tha — ab usi ko use karna hai.

**`connectDB` ki zaroorat aayi — import karo:**

```typescript
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"

export async function GET() {
  await connectDB()
  return NextResponse.json({ message: "Connected to DB!" }, { status: 200 })
}
```

**`await connectDB()` kyun?**

Database connection time leta hai — network call hai. `await` matlab "ruko jab tak connect na ho jaaye, phir aage badho."

---

## ✅ Doosri Baar Test Karo

Browser mein dobara jaao:
```
http://localhost:3000/api/todos
```

Yeh dikhna chahiye:
```json
{ "message": "Connected to DB!" }
```

**Agar dikh raha hai — database connection kaam kar raha hai!** 🎉

Agar error aaya — `.env.local` mein MongoDB URI check karo.

Ab aage badhte hain.

---

## Step 3 — Database Se Todos Fetch Karo

Connect ho gaya. Ab actually data fetch karna hai.

Data fetch karne ke liye `Todo` model chahiye — `models/Todo.ts` mein banaya tha.

**`Todo` ki zaroorat aayi — import karo:**

```typescript
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Todo from "@/models/Todo"

export async function GET() {
  await connectDB()
  const todos = await Todo.find()
  return NextResponse.json(todos, { status: 200 })
}
```

**`Todo.find()` kya karta hai?**

Mongoose ka built-in method — database se **saare** Todo documents fetch karta hai aur array return karta hai.

---

## ✅ Teesri Baar Test Karo

Browser mein dobara jaao:
```
http://localhost:3000/api/todos
```

Database abhi empty hai — yeh dikhega:
```json
[]
```

**Empty array — bilkul sahi hai!** Database mein abhi koi todo nahi hai — toh empty array hi aayegi. 🎉

---

## Step 4 — Sort Add Karo

Naye todos pehle dikhne chahiye. `.sort()` chain karo `find()` ke saath:

```typescript
const todos = await Todo.find().sort({ createdAt: -1 })
```

**`.sort({ createdAt: -1 })` kya hai?**
- `createdAt: -1` → Descending — naye pehle
- `createdAt: 1` → Ascending — purane pehle

---

## Step 5 — try/catch Add Karo

Database kaam nahi kare, connection fail ho — error handle karna zaroori hai:

```typescript
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Todo from "@/models/Todo"

export async function GET() {
  try {
    await connectDB()
    const todos = await Todo.find().sort({ createdAt: -1 })
    return NextResponse.json(todos, { status: 200 })
  } catch (error) {
    console.error("Todos fetch error:", error)
    return NextResponse.json(
      { message: "Todos fetch nahi ho sake" },
      { status: 500 }
    )
  }
}
```

**`try/catch`:**
- `try` → Normal flow chalao
- `catch` → Kuch bhi galat hua? Yahan aa jaao, `500` return karo

---

## Abhi File Kaisi Dikhti Hai?

```typescript
// app/api/todos/route.ts
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Todo from "@/models/Todo"

export async function GET() {
  try {
    await connectDB()
    const todos = await Todo.find().sort({ createdAt: -1 })
    return NextResponse.json(todos, { status: 200 })
  } catch (error) {
    console.error("Todos fetch error:", error)
    return NextResponse.json(
      { message: "Todos fetch nahi ho sake" },
      { status: 500 }
    )
  }
}
```

**Backend ka GET route complete ho gaya!**

---

## Summary — Doc 06.2 Mein Kya Kiya

✅ **Pehle hardcoded response** — route kaam karta hai verify kiya

✅ **Phir `connectDB` add kiya** — database connection verify kiya

✅ **Phir `Todo.find()` add kiya** — real data fetch kiya

✅ **Har step pe browser mein test kiya** — ek ek cheez verify ki

✅ **`try/catch`** — error handling add ki

---

## Agla Step — Doc 06.3

**Doc 06.3: Frontend — Page Ko Client Component Banana**

Backend ready hai. Ab frontend mein todos dikhane hain.

Lekin ek problem hai — Next.js mein by default saare components server pe chalte hain. `useState`, `useEffect` use karne ke liye kuch karna padega. 🚀
