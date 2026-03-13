# Doc 08.1 — Delete Ke Liye Naya Route Chahiye 🔗
### (Dynamic Routes — `[id]` folder)

---

## Pehle Yaad Karte Hain

Doc 07 complete hua — todos add ho sakte hain, list mein dikh rahe hain, database mein save ho rahe hain.

**Ab problem:**

User ne "Milk lana" add kiya — kal milk aa gayi — ab woh todo hatana chahta hai.

Delete button dikhega — click karega — todo chala jaayega.

**Lekin server ko kaise pata chalega kaunsa todo hatana hai?**

---

## Problem — ID Chahiye

Database mein teen todos hain:

```json
{ "_id": "abc1", "title": "Milk lana" }
{ "_id": "abc2", "title": "Assignment karna" }
{ "_id": "abc3", "title": "Exercise" }
```

User ne "Assignment karna" pe Delete click kiya.

Server ko batana padega — **kaunsa** hatao. Toh ID URL mein bhejte hain:

```
DELETE /api/todos/abc2   ← "abc2 wala hatao"
```

---

## Problem — Abhi Ka Route Kafi Nahi

Abhi humara route hai:

```
app/api/todos/route.ts → /api/todos
```

Yeh sirf `/api/todos` handle karta hai — ID ke saath nahi.

Delete ke liye chahiye:
```
/api/todos/abc1
/api/todos/abc2
/api/todos/abc3
```

Har todo ki alag ID — itni saari alag files nahi bana sakte.

**Solution: Dynamic Route**

---

## Dynamic Route Kya Hota Hai?

**Dynamic Route = URL ka ek hissa variable hota hai**

Next.js mein folder ke naam mein **square brackets** likhte hain — woh variable ban jaata hai:

```
app/api/todos/[id]/route.ts
```

Ab yeh sab URLs is ek file se handle honge:

```
/api/todos/abc1    → id = "abc1"
/api/todos/abc2    → id = "abc2"
/api/todos/xyz99   → id = "xyz99"
```

Folder ka naam `[id]` hai — toh variable ka naam `id` hoga. Agar `[todoId]` hota toh `todoId`.

---

## Folder Structure Kaisi Hogi?

```
app/
└── api/
    └── todos/
        ├── route.ts        ← /api/todos  (GET + POST)
        └── [id]/
            └── route.ts    ← /api/todos/:id  (DELETE, PUT baad mein)
```

**Dono alag files — alag responsibilities:**

- `todos/route.ts` → Saare todos ke saath kaam — GET, POST
- `todos/[id]/route.ts` → Ek specific todo ke saath kaam — DELETE, PUT

---

## File Banao — Abhi Khali

`app/api/todos/[id]/` folder banao, usme `route.ts` file banao — abhi khali:

```typescript
// app/api/todos/[id]/route.ts
```

Bas itna. Backend baad mein likhenge — pehle frontend ka kaam karenge.

---

## `context.params` — ID Kaise Milegi?

Jab backend mein function likhenge tab yeh kaam aayega — abhi sirf samjho:

Next.js is file ke functions ko automatically do cheezein deta hai:

```typescript
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  // id = "abc2"  ← Jo bhi URL mein aaya
}
```

**`context.params`** — ek object jisme URL ke variable parts hote hain:

```
URL: /api/todos/abc2
params = { id: "abc2" }
```

**`await` kyun?** Next.js ne params ko async bana diya hai — bina `await` ke id nahi milegi.

Yeh sirf tab kaam aayega jab backend likhenge — abhi yaad rakho bas.

---

## Summary — Doc 08.1 Mein Kya Kiya

✅ **Problem samjha** — Delete ke liye ID chahiye, URL mein bhejte hain

✅ **Dynamic Routes** — `[id]` folder — variable URL

✅ **Folder structure** — `todos/[id]/route.ts` — khali file banayi

✅ **`context.params`** — baad ke liye concept samjha

---

## Agla Step — Doc 08.2

**Doc 08.2: Delete — Frontend Se Shuru Karenge**

Pehle frontend mein Delete button banayenge, test karenge — phir backend banana shuru karenge. 🗑️
