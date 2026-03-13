# Doc 09.3 — Fetch Bhejo Aur Backend Banao 🔧
### (PUT request + NextRequest/NextResponse + findByIdAndUpdate)

---

## Pehle Yaad Karte Hain

Doc 09.2 mein:
- Checkbox ban gaya
- `toggleDone` function ka skeleton bana
- Samjha ki state tab update hogi jab backend ready ho

**Ab actual fetch call add karte hain — phir backend banate hain.**

---

## Step 1 — Fetch Call Add Karo

`toggleDone` mein actual PUT request add karo:

```typescript
async function toggleDone(id: string, currentDone: boolean) {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !currentDone }),
    })

    if (!response.ok) throw new Error("Update failed")

    console.log("Server ne 200 diya!")

  } catch (err) {
    alert("Update nahi ho saka।")
    console.error(err)
  }
}
```

**Teen cheezein nai hain — samjho:**

**`method: "PUT"`** — `fetch()` by default GET bhejta hai. PUT explicitly likhna padta hai, warna server ko wrong request milegi.

**`headers: { "Content-Type": "application/json" }`** — Server ko batao ki body mein kya format hai. Bina is header ke server body ko samajh nahi payega.

**`JSON.stringify({ done: !currentDone })`** — Network pe sirf strings jaati hain — objects nahi. `JSON.stringify` object ko string mein convert karta hai:
```javascript
JSON.stringify({ done: true })
// → '{"done":true}'   ← Yeh string jaayegi network pe
```

---

## ✅ Pehla Test

Checkbox click karo.

Network tab mein dekho (F12 → Network):

```
PUT /api/todos/abc2   → 404 Not Found
```

**404 — backend nahi bana abhi!** Yeh expected hai. Ab backend banana padega. 🎉

---

## Step 2 — Backend Ke Liye Next.js Kya Deta Hai?

Backend likhne se pehle — ek baar samjho ki Next.js API routes mein kya available hota hai.

Jab frontend se request aati hai, Next.js do cheezein deta hai function ko:

**`request`** — Puri incoming request. Ismein hai:
- Body — frontend ne kya bheja (`{ done: true }`)
- Headers — content type wagera
- Method — GET, PUT, DELETE kaunsa

**`context`** — URL ke variable parts. Ismein hai:
- `params` — `[id]` folder se jo ID mili URL mein

Yeh dono `next/server` se import karte hain:

```typescript
import { NextRequest, NextResponse } from "next/server"
```

**`NextRequest`** — Request ka type. Sirf TypeScript ke liye — "yeh cheez request hai" batata hai.

**`NextResponse`** — Response banana. Isse JSON response banate hain:
```typescript
NextResponse.json({ message: "Done" }, { status: 200 })
```

Bina `NextResponse` ke response nahi bana sakte — yeh Next.js ka tool hai standard response format ke liye.

---

## Step 3 — PUT Function Ka Skeleton

`app/api/todos/[id]/route.ts` kholo — DELETE pehle se hai. Ab neeche PUT add karo.

**Imports pehle se hain** — DELETE ke liye `NextRequest`, `NextResponse`, `connectDB`, `Todo` already import ho gaye hain. Dobara likhne ki zaroorat nahi.

```typescript
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params

    // Body nikalenge — kya update karna hai
    const body = await request.json()

    // Yahan update karenge
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json(
      { message: "Update nahi ho saka" },
      { status: 500 }
    )
  }
}
```

**`request.json()`** — Frontend ne body mein `{ done: true }` bheja tha — woh nikalna hai. `request.json()` body ko JavaScript object mein convert karta hai:

```javascript
const body = await request.json()
// body = { done: true }
```

POST mein bhi yahi use kiya tha yaad hai? Same cheez.

---

## Step 4 — `findByIdAndUpdate` Add Karo

```typescript
const updatedTodo = await Todo.findByIdAndUpdate(
  id,
  body,
  { new: true, runValidators: true }
)
```

**Teen arguments — detail mein samjho:**

**Pehla — `id`:** Kaunsa document update karna hai. URL se aaya.

**Doosra — `body`:** Kya update karna hai. Body mein `{ done: true }` aaya — toh sirf `done` field update hogi. `title` same rahega — Mongoose sirf woh fields update karta hai jo body mein hain. Poora document replace nahi hota.

**Teesra — `{ new: true, runValidators: true }`:**

`new: true` — Yeh bahut zaroori hai. Default mein `findByIdAndUpdate` **purana** document return karta hai — update se pehle wala. Toh agar `done: false` tha aur `true` kiya — bina `new: true` ke `done: false` wala document milega. `new: true` se **updated** document milta hai — jo actually database mein save hua.

`runValidators: true` — Schema mein jo rules likhe hain — jaise `title` required hai, trim karo — woh sirf `create` pe automatically chalte hain. Update pe bhi check karwane ke liye yeh option daalna padta hai.

**Null check aur response:**

```typescript
if (!updatedTodo) {
  return NextResponse.json(
    { message: "Todo nahi mila" },
    { status: 404 }
  )
}

return NextResponse.json(updatedTodo, { status: 200 })
```

---

## Abhi Poori `[id]/route.ts` File:

```typescript
// app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Todo from "@/models/Todo"

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    const deletedTodo = await Todo.findByIdAndDelete(id)

    if (!deletedTodo) {
      return NextResponse.json(
        { message: "Todo nahi mila" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Todo delete ho gaya" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { message: "Delete nahi ho saka" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    const body = await request.json()

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )

    if (!updatedTodo) {
      return NextResponse.json(
        { message: "Todo nahi mila" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedTodo, { status: 200 })

  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json(
      { message: "Update nahi ho saka" },
      { status: 500 }
    )
  }
}
```

---

## ✅ Doosra Test

Checkbox click karo — Network tab mein dekho:

```
PUT /api/todos/abc2   → 200 OK
```

**200 aa raha hai — database mein update ho gaya!** 🎉

Lekin ek problem — **checkbox wapas bounce kar raha hai, ya UI update nahi ho raha!** Page refresh karne pe sahi dikhta hai.

Yeh fix karna hai — agla doc mein.

---

## Summary — Doc 09.3 Mein Kya Kiya

✅ **Fetch call add ki** — `method: "PUT"`, `headers`, `JSON.stringify`

✅ **404 aaya** — expected tha, backend nahi tha

✅ **`NextRequest` / `NextResponse`** — Next.js kya deta hai functions ko, samjha

✅ **PUT handler skeleton** — `request.json()` se body nikali

✅ **`findByIdAndUpdate`** — teen arguments, `new: true` kyun zaroori, `runValidators`

✅ **200 aaya** — database update ho gaya

---

## Agla Step — Doc 09.4

**Doc 09.4: `map()` Se UI Update Karo**

Database update ho gaya — ab state update karni hai taaki UI turant dikhaye. `map()` pattern aur line-through add karenge. 🔄
