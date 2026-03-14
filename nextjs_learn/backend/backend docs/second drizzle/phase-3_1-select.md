# Phase 3.1 — Pehla Data Daalo + Todos Fetch Karo

## Pichle Phase Se Aage

Phase 2 mein poora setup ho gaya:

```
db/schema.ts         ← drizzle_todos table define ki
db/index.ts          ← Neon connection — db export kiya
drizzle.config.ts    ← drizzle-kit config
npx drizzle-kit push ← table Neon mein ban gayi
```

Ab Phase 3 — **Todo App banayenge** — backend aur frontend saath saath — dheere dheere.

---

## Pehli Problem — Table Empty Hai

`drizzle_todos` table abhi bilkul **empty** hai — koi data nahi.

Agar seedha GET route banayein aur fetch karein — toh kya dikhega?

```json
[]
```

Khaali array — pata nahi chalega — kaam sahi ho raha hai ya nahi.

**Toh pehle ek dummy todo daalo** — SQL Editor se — jaise Phase 1 mein kiya tha.

---

## SQL Editor Se Dummy Data Daalo

Neon Dashboard pe jao — **SQL Editor** kholo.

```sql
INSERT INTO drizzle_todos (title, done) VALUES ('Pehla Drizzle Todo', false);
```

Run karo — "Statement executed successfully" aayega.

Verify karo:

```sql
SELECT * FROM drizzle_todos;
```

```
id | title               | done
---+---------------------+------
1  | Pehla Drizzle Todo  | false
```

Ab data hai — aage badhte hain. ✅

---

## `db` Variable Yaad Karo

`db/index.ts` mein yeh export kiya tha:

```ts
export const db = drizzle(sql, { schema })
```

Yeh `db` — Drizzle instance hai — iske zariye queries chalate hain:

```
db.select()  ← data fetch karo
db.insert()  ← data daalo
db.update()  ← data badlo
db.delete()  ← data hatao
```

MongoDB mein model se karte the — `Todo.find()`, `Todo.create()`.

Drizzle mein `db` se karte hain — aur table variable batate hain — `db.select().from(drizzle_todos)`.

---

## API Route Folder Banao

Next.js ko database se data fetch karna hai — iske liye **API route** chahiye.

`app/` ke andar `api/` folder banao — phir `todos/` — phir `route.ts`:

```
app/
├── api/                ← naya folder
│   └── todos/          ← naya folder
│       └── route.ts    ← yeh banao
└── page.tsx
```

**`api/` folder kyun?**

Next.js mein `app/api/` ke andar jo files hain — woh API routes ban jaati hain. `app/api/todos/route.ts` → `/api/todos` URL ban jaata hai — frontend se fetch kar sakte hain.

---

## GET Route Likhna Shuru Karo

`app/api/todos/route.ts` banao.

Pehle socho — kya karna hai?

Drizzle se saare todos fetch karne hain. `db` variable `db/index.ts` mein hai — woh import karna padega. Aur table chahiye — `drizzle_todos` — woh `db/schema.ts` mein hai.

```ts
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
```

**`@/db` kya hai?**

```
@/    ← project root ka shortcut — Next.js ne setup kiya hai
@/db  ← matlab todo-drizzle/db/index.ts
```

**`@/db/schema` se `drizzle_todos` kyun?**

`db/schema.ts` mein `export const drizzle_todos = pgTable(...)` tha — wahi table variable — Drizzle ko batana padta hai "kaunsi table pe kaam karna hai."

---

Ab GET function banao:

```ts
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'

export async function GET() {

}
```

**`export async function GET()`** — Next.js automatically samjhta hai — jab `/api/todos` pe GET request aayegi — yeh function chalega.

`async` kyun? — Database se data fetch karna hai — time lagta hai — `await` use karna padega — isliye `async`.

---

Ab andar query likho:

```ts
export async function GET() {
  const allTodos = await db
    .select()
    .from(drizzle_todos)
}
```

**`db.select().from(drizzle_todos)` tod ke:**

```
db                       ← Drizzle instance
  .select()              ← "SELECT karo" — saare columns
  .from(drizzle_todos)    ← "drizzle_todos table se"
```

Phase 1 wali SQL:

```sql
SELECT * FROM drizzle_todos;
```

Drizzle ne yeh SQL khud likhi — tu nahi — yahi ORM ka fayda.

---

Ab `allTodos` mein data aa gaya — isko browser ko bhejna hai.

Iske liye `NextResponse` chahiye — Next.js ka built-in tool — API route se response bhejne ke liye.

**`NextResponse` kya hai?**

Browser request karta hai — hum response bhejte hain. Normal JavaScript mein `Response` object hota hai — Next.js ne usse wrap karke `NextResponse` banaya — `NextResponse.json(data)` se JSON response seedha ban jaata hai.

Import karo:

```ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
```

Ab return karo:

```ts
export async function GET() {
  const allTodos = await db
    .select()
    .from(drizzle_todos)

  return NextResponse.json(allTodos)
}
```

---

Database call fail bhi ho sakti hai — network issue, Neon down — `try/catch` lagao:

```ts
export async function GET() {
  try {
    const allTodos = await db
      .select()
      .from(drizzle_todos)

    return NextResponse.json(allTodos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todos nahi aaye!' },
      { status: 500 }
    )
  }
}
```

**`{ status: 500 }` kya hai?**

HTTP status code — response ke saath jaata hai — browser ko batata hai request kaisi rahi:

```
200 → sab theek
201 → naya resource bana
400 → galat data bheja
404 → cheez mili nahi
500 → server ki galti
```

---

## Abhi Tak Poori `route.ts`:

```ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'

export async function GET() {
  try {
    const allTodos = await db
      .select()
      .from(drizzle_todos)

    return NextResponse.json(allTodos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todos nahi aaye!' },
      { status: 500 }
    )
  }
}
```

---

## Test Karo — Browser Se

`npm run dev` chalao — browser mein jao:

```
http://localhost:3000/api/todos
```

Response:

```json
[
  { "id": 1, "title": "Pehla Drizzle Todo", "done": false }
]
```

Data aa raha hai! ✅

---

## Aaj Ka Summary

✅ `drizzle_todos` empty thi — SQL Editor se dummy data daala  
✅ `db` — Drizzle instance — queries yahan se chalti hain  
✅ `app/api/todos/route.ts` — GET route  
✅ `db.select().from(drizzle_todos)` — SELECT * FROM drizzle_todos  
✅ `NextResponse` — data aa gaya — tab import kiya — browser ko bhejna tha  
✅ `try/catch` — database call fail ho sakti hai  
✅ HTTP status codes — 200, 201, 400, 404, 500  

---

## Agla Step

**Phase 3.2** — Abhi todos ka order sahi nahi — naaya todo upar nahi aata — yeh fix karenge — phir frontend mein list dikhayenge! 📋
