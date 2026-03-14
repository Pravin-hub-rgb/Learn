# Phase 3.3 — Naya Todo Add Karo — POST Route

## Pichle Doc Se Aage

3.2 mein:
- `.orderBy(desc(...))` add kiya — naaya todo upar aata hai
- Frontend mein list dikh rahi hai

Ab naya todo add karna hai — **POST route** banayenge.

---

## Kahan Likhenge?

POST route bhi `/api/todos` pe hi hoga — toh same file mein likhenge:

```
app/api/todos/route.ts   ← GET pehle se hai — POST yahan add karenge
```

Same file mein alag function — `export async function POST()`.

---

## POST Mein Request Body Chahiye

GET mein koi data nahi aata — sirf fetch karna tha.

POST mein user data bhejta hai — `{ title: 'Naya Todo' }` — yeh **request body** mein aata hai.

Request body padhne ke liye `NextRequest` chahiye — Next.js ka built-in type.

Pehle query likhte hain — tab import karenge jab zaroorat padegi.

---

## POST Function Shuru Karo

```ts
export async function POST(request) {

}
```

Pehle body padho — user ne kya bheja:

```ts
export async function POST(request) {
  const body = await request.json()
}
```

**`request.json()`** — request ki body JSON mein parse karta hai — `{ title: 'Naya Todo' }` milega.

Ab `body.title` mein title hai.

---

TypeScript bolega — "`request` ka type kya hai?" — `NextRequest` type dena padega. Woh `next/server` se aata hai:

```ts
import { NextRequest } from 'next/server'
```

Function update karo:

```ts
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
}
```

---

## Validation — Title Kabhi Khali Nahi Hona Chahiye

Ab hum chahte hain ki user koi bhi todo add kare, uska title kabhi khali na rahe. 
Hum dono cases handle karenge:
1. **Completely empty** - Jab koi title hi nahi diya gaya ho
2. **Sirf spaces** - Jab user sirf spaces (whitespace) daal de

```ts
export async function POST(request: NextRequest) {
  const body = await request.json()

  // Check 1: Agar title bilkul nahi hai (undefined/null)
  // Check 2: Agar title sirf spaces hai (trim() se empty string ban jaye)
  if (!body.title || !body.title.trim()) {
    return NextResponse.json(
      { error: 'Title zaroori hai!' },
      { status: 400 }
    )
  }
}
```

### Samjhein Logic Ko:

**`!body.title`** - Yeh check karta hai ki:
- `body.title` undefined hai (user ne title field hi nahi bheja)
- `body.title` null hai
- `body.title` empty string `""` hai

**`!body.title.trim()`** - Yeh check karta hai ki:
- `body.title` mein sirf spaces, tabs, ya newlines hain
- `trim()` function string ke start aur end se saare whitespace characters hata deta hai
- Agar sirf spaces the, toh `trim()` ke baad empty string `""` ban jayegi
- `!""` false ho jayega, isliye hum return kar denge error

### Examples:

```javascript
// Case 1: Completely empty
body.title = undefined
!body.title = true  // Error return hoga

// Case 2: Empty string
body.title = ""
!body.title = true  // Error return hoga

// Case 3: Sirf spaces
body.title = "   "
body.title.trim() = ""  // trim() ne saare spaces hata diye
!body.title.trim() = true  // Error return hoga

// Case 4: Valid title
body.title = "Learn React"
!body.title = false
!body.title.trim() = false  // Dono checks pass, continue karega
```

**`status: 400`** — "Client ki galti — galat ya incomplete data bheja."

---

## INSERT Query Likho

Ab `body.title` mil gaya — database mein daalna hai.

```ts
const newTodo = await db
  .insert(drizzle_todos)
  .values({ title: body.title })
```

**`db.insert(drizzle_todos).values({...})` tod ke:**

```
db                       ← Drizzle instance
  .insert(drizzle_todos)  ← "drizzle_todos table mein insert karo"
  .values({              ← "yeh values daalo"
    title: body.title
  })
```

Phase 1 wali SQL:

```sql
INSERT INTO drizzle_todos (title) VALUES ('Naya Todo');
```

`done` nahi diya — schema mein `default(false)` tha — automatically `false` set hoga.

### Kyun `const newTodo` Use Karte Hain?

**Sawal:** Kya hum seedha `await db.insert(...)` karke return nahi kar sakte?

**Jawab:** Haan, hum kar sakte hain! Lekin hum `const newTodo` use karte hain frontend optimization ke liye.

#### Option 1: Sirf Insert Karke Message Return Karna
```ts
// Backend
await db.insert(drizzle_todos).values({ title: body.title })
return NextResponse.json({ message: "Todo added!" })

// Frontend
async function addTodo() {
  if (!input.trim()) return
  try {
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: input })
    })
    setInput('')
    fetchTodos() // ← Extra API call - puri list fetch karni padegi
  } catch (error) {
    console.error('Add error:', error)
  }
}
```

#### Option 2: Insert + Return New Todo (Current Approach)
```ts
// Backend
const newTodo = await db.insert(drizzle_todos).values({ title: body.title }).returning()
return NextResponse.json(newTodo[0])

// Frontend
async function addTodo() {
  if (!input.trim()) return
  try {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: input })
    })
    const newTodo = await res.json() // ← Naya todo mil gaya
    setTodos([newTodo, ...todos])    // ← Direct add karo
    setInput('')
  } catch (error) {
    console.error('Add error:', error)
  }
}
```

### Trade-offs Comparison:

| Approach | Pros | Cons |
|----------|------|------|
| **Sirf Insert + Re-render** | • Simple logic<br>• Fresh data milta hai<br>• Consistency maintain | • Extra API call (POST + GET)<br>• Thoda slow<br>• User ko wait karna padta hai |
| **Insert + Return** | • Fast (sirf 1 request)<br>• Better user experience<br>• Real-time feel | • Thoda complex logic<br>• Frontend mein array manipulation |

**Hum current approach use karte hain kyunki:**
- User experience better hota hai
- Real-time feel aata hai
- Performance better hoti hai
- Frontend immediately update ho jata hai

**Par agar beginner ke liye simple rakhna hai, toh Option 1 bhi bilkul valid hai!**

---

## Ek Problem — PostgreSQL Row Wapas Nahi Deta

`newTodo` mein kya aayega?

MongoDB mein `Todo.create()` seedha naya object return karta tha:

```ts
const newTodo = await Todo.create({ title })
// newTodo = { _id: '...', title: 'Naya Todo', done: false }
```

PostgreSQL mein INSERT ke baad row **automatically wapas nahi aati.**

Toh `newTodo` mein kya hoga? Khaali result — naya todo nahi milega.

**Fix** — `.returning()` lagao — "insert ke baad naya row wapas do":

```ts
const newTodo = await db
  .insert(drizzle_todos)
  .values({ title: body.title })
  .returning()
```

Ab `newTodo` mein inserted row aa jaayegi.

**Par ek aur baat** — `.returning()` array deta hai — kyunki ek baar mein multiple rows bhi insert ho sakti hain. Hum ek hi insert kar rahe hain — `[0]` se pehla element nikalo:

```ts
return NextResponse.json(newTodo[0], { status: 201 })
```

**`status: 201`** — "naya resource ban gaya."

---

## try/catch Lagao

```ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { error: 'Title zaroori hai!' },
        { status: 400 }
      )
    }

    const newTodo = await db
      .insert(drizzle_todos)
      .values({ title: body.title })
      .returning()

    return NextResponse.json(newTodo[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Todo nahi bana!' },
      { status: 500 }
    )
  }
}
```

---

## Abhi Tak Poori `route.ts`:

```ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allTodos = await db
      .select()
      .from(drizzle_todos)
      .orderBy(desc(drizzle_todos.id))

    return NextResponse.json(allTodos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todos nahi aaye!' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { error: 'Title zaroori hai!' },
        { status: 400 }
      )
    }

    const newTodo = await db
      .insert(drizzle_todos)
      .values({ title: body.title })
      .returning()

    return NextResponse.json(newTodo[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Todo nahi bana!' },
      { status: 500 }
    )
  }
}
```

---

## Test Karo — Postman Se

```
POST http://localhost:3000/api/todos
Body: { "title": "Drizzle se banaya" }
```

Response:

```json
{
  "id": 2,
  "title": "Drizzle se banaya",
  "done": false
}
```

Neon SQL Editor mein verify karo:

```sql
SELECT * FROM drizzle_todos;
```

Naya todo dikh jaayega! ✅

---

## Aaj Ka Summary

✅ POST route — same `route.ts` file mein — alag function  
✅ `NextRequest` — request body padhne ke liye — tab import kiya jab chahiye tha  
✅ `request.json()` — body parse karo  
✅ `db.insert(drizzle_todos).values({...})` — INSERT INTO drizzle_todos  
✅ `.returning()` — PostgreSQL INSERT ke baad row wapas nahi deta — yeh lagao  
✅ `newTodo[0]` — `.returning()` array deta hai — pehla element nikalo  
✅ `status: 201` — naya resource bana  

---

## Agla Step

**Phase 3.4** — Frontend mein input box aur Add button add karenge — user naya todo type kare aur add kare! ✏️
