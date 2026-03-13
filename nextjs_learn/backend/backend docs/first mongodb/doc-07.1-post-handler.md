# Doc 07.1 — POST Handler Banana 📬
### (Backend mein naya todo save karna)

---

## Pehle Yaad Karte Hain

Doc 06 complete hua — ab humara app database se todos **fetch** kar sakta hai aur screen pe dikha sakta hai.

Lekin ek problem hai:

```
Database abhi bhi empty hai।
Koi todo add karne ka tarika nahi।
App sirf "Koi todo nahi। Naya banao!" dikhata hai।
```

**Toh ab kya karna hai?**

---

## Problem — Data Sirf Ek Taraf Ja Raha Hai

Abhi tak hum sirf data **le** rahe the — database se frontend tak.

```
Frontend ←←← GET /api/todos ←←← Database
```

Ab humein data **bhejni** hai — frontend se database tak.

```
Frontend →→→ POST /api/todos →→→ Database
```

**GET aur POST mein fark:**

```
GET  → "Mujhe data do"  → Server sirf response bhejta hai
POST → "Yeh data lo"    → Frontend data bhejta hai, server save karta hai
```

---

## Kahan Likhein?

Doc 06 mein humne `app/api/todos/route.ts` banaya tha sirf GET ke liye.

**Ab us same file mein POST function bhi add karenge.**

```typescript
// app/api/todos/route.ts — abhi sirf yeh hai
export async function GET() {
  // todos fetch karna
}

// Yahan POST bhi add karenge
export async function POST() {
  // naya todo save karna
}
```

Next.js ka rule:
- Same file mein alag alag HTTP methods ke functions likhte hain
- `GET` function → GET requests handle karta hai
- `POST` function → POST requests handle karta hai

---

## Step 1 — POST Function Ka Skeleton Banao

Pehle sirf structure:

```typescript
export async function POST() {
  // Yahan code aayega
}
```

**Abhi yeh GET jaisa hi lagta hai — fark kya hoga?**

POST mein frontend **data bhejta hai** — title, content, etc. Woh data function ko milta hai `request` ke through.

Toh GET se ek cheez alag hai:

```typescript
// GET mein request nahi chahiye — sirf data fetch karna hai
export async function GET() { ... }

// POST mein request chahiye — user ka bheja hua data isme hota hai
export async function POST(request: NextRequest) { ... }
```

**`NextRequest` kahan se aayega?**

Import karna padega:

```typescript
import { NextRequest, NextResponse } from "next/server"
```

Pehle sirf `NextResponse` import tha — ab `NextRequest` bhi add karo.

---

## Step 2 — Request Body Se Data Nikalo

User ne title likha — "Milk lana". Woh data `request` ke andar hota hai, `body` mein.

**`request.body` seedha nahi padh sakte** — pehle parse karna padta hai:

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json()
}
```

**`request.json()` kya karta hai?**

Network pe data sirf text ki form mein travel karta hai. Frontend ne bheja:

```
'{"title":"Milk lana"}'   ← Yeh ek string hai
```

`request.json()` us string ko JavaScript object mein convert karta hai:

```javascript
{ title: "Milk lana" }   ← Ab yeh object hai
```

Ab `body.title` se title nikal sakte hain:

```typescript
const body = await request.json()
const { title } = body
// Same as: const title = body.title
```

---

## Step 3 — Validation Add Karo

Kya ho agar user ne khaali title bheja? Ya title hi nahi bheja?

```typescript
// Yeh dono cases handle karne chahiye:
{ title: "" }         // Khaali string
{ title: "   " }      // Sirf spaces
{}                    // title field hi nahi
```

```typescript
if (!title || title.trim() === "") {
  return NextResponse.json(
    { message: "Title dena zaroori hai" },
    { status: 400 }
  )
}
```

**`400` status kyun?**

Pehle dekha tha status codes table mein — `400` = "Bad Request" — matlab user ne galat data bheja. Server ki galti nahi, user ki galti hai.

---

## Step 4 — Database Mein Save Karo

Ab valid title mil gaya — save karna hai.

```typescript
const newTodo = await Todo.create({
  title: title.trim(),
  done: false,
})
```

**`Todo.create()` kya karta hai?**

Yeh ek Mongoose method hai. `Todo.find()` yaad hai? Woh data fetch karta tha. `Todo.create()` naya document **banata aur save** karta hai — ek hi step mein.

```
Todo.create({ title: "Milk lana", done: false })
→ MongoDB mein naya document bana
→ { _id: "abc123", title: "Milk lana", done: false, createdAt: "...", ... }
→ Woh nayi document return hoti hai
```

**`done: false` kyun manually diya?**

Schema mein `default: false` rakha tha — toh technically nahi dena padta. Lekin explicitly likhna better hai — code padhne wale ko clearly pata chalta hai ki naya todo hamesha "incomplete" se shuru hota hai.

---

## Step 5 — Response Bhejo

```typescript
return NextResponse.json(newTodo, { status: 201 })
```

**`201` kyun, `200` nahi?**

Dono success hain, lekin:
- `200` = "OK" — koi bhi general success
- `201` = "Created" — specifically **naya resource bana**

Convention hai — jab naya cheez bana toh `201` bhejo. Frontend ko bhi pata chalta hai ki kya hua.

---

## Step 6 — try/catch Add Karo

Database kaam nahi kare, connection fail ho — toh error handle karna hai:

```typescript
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { title } = body

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { message: "Title dena zaroori hai" },
        { status: 400 }
      )
    }

    const newTodo = await Todo.create({
      title: title.trim(),
      done: false,
    })

    return NextResponse.json(newTodo, { status: 201 })

  } catch (error) {
    console.error("Todo create error:", error)
    return NextResponse.json(
      { message: "Todo create nahi ho saka" },
      { status: 500 }
    )
  }
}
```

---

## Abhi File Kaisi Dikhti Hai?

```typescript
// app/api/todos/route.ts
import { NextRequest, NextResponse } from "next/server"
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

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { title } = body

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { message: "Title dena zaroori hai" },
        { status: 400 }
      )
    }

    const newTodo = await Todo.create({
      title: title.trim(),
      done: false,
    })

    return NextResponse.json(newTodo, { status: 201 })

  } catch (error) {
    console.error("Todo create error:", error)
    return NextResponse.json(
      { message: "Todo create nahi ho saka" },
      { status: 500 }
    )
  }
}
```

---

## Summary — Doc 07.1 Mein Kya Kiya

✅ **Problem samjha** — Data sirf le rahe the, ab bhejni bhi hai

✅ **Same file mein POST function add kiya** — Next.js ka pattern

✅ **`request: NextRequest`** — user ka bheja hua data isme hota hai

✅ **`request.json()`** — body string ko object mein convert karna

✅ **Validation add ki** — khaali title reject karo

✅ **`Todo.create()`** — naya document banana aur save karna

✅ **`201` status** — naya resource bana toh yeh bhejo

---

## Agla Step — Doc 07.2

**Doc 07.2: Frontend Form Banana**

Backend ready hai — POST request accept kar sakta hai. Ab frontend mein:

- Input field banana
- State manage karna
- Submit pe POST request bhejni 🚀
