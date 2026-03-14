# Phase 3.7 — Todo Hatao — DELETE Route

## Pichle Doc Se Aage

3.6 mein:
- Frontend mein checkbox aa gaya — toggle ho raha hai

Ab todo delete karna hai — **DELETE route** banayenge.

---

## Frontend Se Shuru Karte Hain — Delete Button

Abhi frontend mein checkbox add kar diya, ab delete button bhi add karna hai. Todo identify karne ke liye unique cheez chahiye, isliye ID use karunga. JSX mein button add karunga aur button click hone pe deleteTodo function call karunga.

```tsx
// Frontend mein delete button add karna hai
<button
  onClick={() => deleteTodo(todo.id)}
  className="text-red-400 hover:text-red-600 cursor-pointer"
>
  🗑️
</button>
```

Frontend se backend ko call karna hai → DELETE request bhejni hai.

---

## deleteTodo Function Likho

Frontend ready hai, ab backend se data delete karna hai. Todo identify karne ke liye ID use karunga, DELETE request bhejunga aur list se bhi hatana hai toh frontend array update karunga.

```ts
async function deleteTodo(id: number) {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' })
  setTodos(todos.filter(t => t.id !== id))
}
```

Frontend function → Backend API → Database delete.

---

## Backend DELETE Route Banate Hain

Frontend deleteTodo function ready hai, ab backend mein DELETE route banana hai. Same `[id]/route.ts` file mein add karna hai, same pattern follow karna hai. DELETE function banana hai aur backend logic implement karna hai.

**Important:** Next.js 16+ mein `params` ek **Promise** hai, isliye `params.id` ko directly access nahi kiya ja sakta. Pehle `params` ko `await` karna padta hai:

```ts
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Next.js 16+ mein params ek Promise hai, isliye await karna padta hai
  const paramsValue = await params;
  const id = parseInt(paramsValue.id)  // ← ID extract karna hai
}
```

**Kyun yeh zaroori hai?**
- Next.js 16+ mein dynamic route parameters Promise return karte hain
- `params.id` ko directly access karne ki koshish karne par error aata hai
- `params` ko `await` karke hi `id` access kiya ja sakta hai

---

ID number mein convert karna hai → parseInt() lagana hai. Specific row delete karni hai → WHERE condition. Confirm karna hai → .returning() lagana hai.

```ts
const deleted = await db
  .delete(drizzle_todos)
  .where(eq(drizzle_todos.id, id))
  .returning()
```

**Tod ke:**

```
db.delete(drizzle_todos)             ← "drizzle_todos table se delete karo"
  .where(eq(drizzle_todos.id, id))   ← "sirf jiska id match kare"
  .returning()                      ← "deleted row wapas do — confirm ke liye"
```

### Samjhein DELETE Query:

**`db.delete(drizzle_todos)`** - Yeh batata hai ki humein `drizzle_todos` table se kuch delete karna hai

**`.where(eq(drizzle_todos.id, id))`** - Yeh condition batati hai ki sirf woh row delete ho jiski `id` match kare

**`.returning()`** - Yeh optional hai, lekin humein confirm karna hai ki kya row delete hui ya nahi

**Phase 1 wali SQL:**

```sql
DELETE FROM drizzle_todos WHERE id = 1;
```

**Key Differences from MongoDB:**
- **MongoDB**: `await Todo.findByIdAndDelete(id)` - Seedha delete kar deta tha
- **PostgreSQL**: `db.delete().where().returning()` - Explicit WHERE condition chahiye
- **MongoDB**: Return value mein deleted object milta tha
- **PostgreSQL**: `.returning()` lagana padta hai, warna kuch nahi milta

**Kyun `.returning()` lagate hain?**
- PostgreSQL mein DELETE query ke baad row automatically wapas nahi aati
- Hum check karna chahte hain ki kya actually kuch delete hua ya nahi
- Agar `deleted.length` 0 hai, matlab koi row match nahi hui (wrong ID)

---

Id nahi mili toh 404 — warna success:

```ts
if (!deleted.length) {
  return NextResponse.json(
    { error: 'Todo nahi mila!' },
    { status: 404 }
  )
}

return NextResponse.json({ message: 'Todo delete ho gaya!' })
```

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
    const id = parseInt(params.id)
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    const deleted = await db
      .delete(drizzle_todos)
      .where(eq(drizzle_todos.id, id))
      .returning()

    if (!deleted.length) {
      return NextResponse.json(
        { error: 'Todo nahi mila!' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Todo delete ho gaya!' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Delete nahi hua!' },
      { status: 500 }
    )
  }
}
```

---

## Test Karo — Postman Se

```
DELETE http://localhost:3000/api/todos/1
```

Response:

```json
{ "message": "Todo delete ho gaya!" }
```

Neon SQL Editor mein verify karo:

```sql
SELECT * FROM drizzle_todos;
```

Todo hat gaya! ✅

---

## Aaj Ka Summary

✅ Frontend delete button — todo identify → ID use → function call  
✅ deleteTodo function — DELETE request → list update → array filter  
✅ DELETE route — same `[id]/route.ts` — alag function  
✅ `db.delete(drizzle_todos).where(eq(...))` — DELETE FROM WHERE  
✅ `.returning()` — confirm karne ke liye row wapas lo  
✅ `!deleted.length` — 0 rows = id nahi mili = 404  

---

## Agla Step

**Phase 3.8** — Frontend mein delete button add karenge — poora app ready ho jaayega! 🎉
