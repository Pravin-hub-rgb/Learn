# Phase 3.5 — Done Toggle Karo — PATCH Route

## Pichle Doc Se Aage

3.4 mein:
- Frontend mein input + Add button aa gaya
- Naya todo add ho raha hai

Ab todo done mark karna hai — **PATCH route** banayenge.

---

## Naya Route File Kyun?

Abhi `app/api/todos/route.ts` hai — yeh `/api/todos` handle karta hai — saare todos ke liye.

Par update karne ke liye **specific todo** chahiye:

```
PATCH /api/todos/1   ← id = 1 wala update karo
PATCH /api/todos/3   ← id = 3 wala update karo
```

URL mein `id` alag alag hoga — same file se handle nahi hoga.

**Dynamic route** chahiye — `[id]` wala folder.

---

## `[id]` Folder Kya Hota Hai?

Next.js mein brackets wala folder naam — dynamic segment hota hai:

```
/api/todos/5   →   params.id = '5'
/api/todos/12  →   params.id = '12'
```

Jo bhi URL mein aaye — woh `params.id` mein milta hai — automatically.

`app/api/todos/` ke andar — naya folder banao: `[id]` — exactly yahi naam — brackets ke saath. Phir andar `route.ts` banao:

```
app/api/todos/
├── route.ts          ← /api/todos — GET, POST ✅
└── [id]/
    └── route.ts      ← yeh banao — /api/todos/1, /api/todos/2
```

---

## Ek Zaroori Fark — `id` Number Hai

MongoDB mein `_id` string tha — seedha use ho jaata tha.

PostgreSQL mein `id` **number** hai — par URL se jo milta hai woh hamesha **string** hota hai:

```
/api/todos/1   ←   params.id = "1"   ← yeh string hai — number nahi
```

Database mein compare karne ke liye number chahiye — convert karna padega:

```ts
const id = parseInt(params.id)
//   "1" (string) → 1 (number)
```

### Kyun Convert Karna Padta Hai?

**JavaScript mein comparison strict hota hai:**
- `1 === 1` → `true` (number === number)
- `"1" === 1` → `false` (string !== number)
- `1 == 1` → `true` (loose comparison, but not recommended)

**Database mein bhi strict matching hota hai:**
- Database column `id` number type ka hai
- Agar hum `"1"` (string) pass karenge, toh database match nahi karega
- Isliye `parseInt()` se string ko number mein convert karna zaroori hai

### parseInt() Kaise Kaam Karta Hai?

```javascript
parseInt("1")     // → 1
parseInt("123")   // → 123
parseInt("1abc")  // → 1 (numbers ke baad kuch bhi ignore)
parseInt("abc")   // → NaN (not a number)
```

**Error handling ke liye hum check karenge ki agar NaN aaye toh kya karna hai.**

---

## PATCH Route Likhna Shuru Karo

`app/api/todos/[id]/route.ts` banao.

Kya karna hai? — Specific todo update karna — `db` aur table chahiye — import karo:

```ts
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
```

---

Function banao — `params` se `id` lo:

```ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Next.js 16+ mein params ek Promise hai, isliye await karna padta hai
  const paramsValue = await params;
  const id = parseInt(paramsValue.id)
  const body = await request.json()
}
```

**`{ params }: { params: { id: string } }`** — Next.js dynamic route mein URL ki value `params` se milti hai — second argument mein aati hai. TypeScript type — `params` object hai — `id` string hai.

**Important:** Next.js 16+ mein `params` ek **Promise** hai, isliye `params.id` ko directly access nahi kiya ja sakta. Pehle `params` ko `await` karna padta hai:

```ts
const paramsValue = await params;  // ← params ko await karna zaroori hai
const id = parseInt(paramsValue.id);  // ← ab id access kar sakte hain
```

**Kyun yeh zaroori hai?**
- Next.js 16+ mein dynamic route parameters Promise return karte hain
- `params.id` ko directly access karne ki koshish karne par error aata hai
- `params` ko `await` karke hi `id` access kiya ja sakta hai

`NextRequest` chahiye — body padhni hai — import karo:

```ts
import { NextRequest } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
```

---

## UPDATE Query Likho

Specific row update karni hai — `WHERE id = ?` chahiye.

Drizzle mein WHERE condition ke liye `eq` function hota hai — `drizzle-orm` se:

```
eq(drizzle_todos.id, 1)   ←   drizzle_todos.id = 1
```

`eq` = equal. Import karo jab zaroorat padi:

```ts
import { eq } from 'drizzle-orm'
```

Ab query:

```ts
const updated = await db
  .update(drizzle_todos)
  .set({ done: body.done })
  .where(eq(drizzle_todos.id, id))
  .returning()
```

**Tod ke:**

```
db.update(drizzle_todos)            ← "drizzle_todos table update karo"
  .set({ done: body.done })        ← "done column yeh value set karo"
  .where(eq(drizzle_todos.id, id))  ← "sirf jiska id match kare"
  .returning()                     ← "updated row wapas do"
```

Phase 1 wali SQL:

```sql
UPDATE drizzle_todos SET done = true WHERE id = 1;
```

`.returning()` yahan bhi kyun? — PostgreSQL mein UPDATE ke baad bhi row automatically wapas nahi aati — same INSERT wali baat.

---

Agar woh `id` ka todo hi nahi mila — 404 bhejo:

```ts
if (!updated.length) {
  return NextResponse.json(
    { error: 'Todo nahi mila!' },
    { status: 404 }
  )
}

return NextResponse.json(updated[0])
```

**`!updated.length`** — array khaali hai — 0 rows update hue — wrong id.

---

## Abhi Tak Poori `[id]/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { db } from '@/db'
import { drizzle_todos } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Next.js 16+ mein params ek Promise hai, isliye await karna padta hai
    const paramsValue = await params;
    const id = parseInt(paramsValue.id)
    const body = await request.json()

    const updated = await db
      .update(drizzle_todos)
      .set({ done: body.done })
      .where(eq(drizzle_todos.id, id))
      .returning()

    if (!updated.length) {
      return NextResponse.json(
        { error: 'Todo nahi mila!' },
        { status: 404 }
      )
    }

    return NextResponse.json(updated[0])
  } catch (error) {
    return NextResponse.json(
      { error: 'Update nahi hua!' },
      { status: 500 }
    )
  }
}
```

---

## Test Karo — Postman Se

```
PATCH http://localhost:3000/api/todos/1
Body: { "done": true }
```

Response:

```json
{ "id": 1, "title": "Pehla Drizzle Todo", "done": true }
```

✅

---

## Aaj Ka Summary

✅ Dynamic route `[id]` — specific todo ke liye alag file  
✅ `params.id` — URL se id milti hai — string hoti hai  
✅ `parseInt(params.id)` — string → number — PostgreSQL ko number chahiye  
✅ `eq` — drizzle-orm se — WHERE condition — tab import kiya jab chahiye tha  
✅ `db.update().set().where(eq(...))` — UPDATE SET WHERE  
✅ `.returning()` — UPDATE ke baad bhi zaroori  
✅ `!updated.length` — 0 rows = id nahi mili = 404  

---

## Agla Step

**Phase 3.6** — Frontend mein checkbox add karenge — todo toggle hoga — strikethrough dikhega! ☑️
