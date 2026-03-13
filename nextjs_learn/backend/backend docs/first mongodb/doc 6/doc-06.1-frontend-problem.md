# Doc 06.1 — Frontend aur Backend ko Kaise Connect Karein? 🌉
### (Pehle Problem Samjho — Why API Routes?)

---

## Pehle Problem Samjho

Ab tak humne:
- ✅ Database connection setup kiya (`lib/mongodb.ts`)
- ✅ Model banana seekha (`models/Todo.ts`)

**Ab sawaal yeh hai:**
> "Frontend (browser) aur backend (database) ko kaise connect karenge?"

---

## Real Life Problem

Socho tum ek dukaan chala rahe ho:

```
Customer (Frontend) → Dukaan (Backend) → Godown (Database)
```

Customer ko cheez chahiye:
- Customer dukaan mein aata hai aur bolta hai: "Mujhe doodh chahiye"
- Dukaan wala godown se doodh leta hai
- Customer ko doodh deta hai

**Par agar dukaan aur godown ke beech connection na ho?**

```
Customer: "Mujhe doodh chahiye"
Dukaan wala: "Sorry, main godown se baat nahi kar sakta"
Customer: "Toh main kahan se doodh lunga?"
```

**Yahi problem humari hai:**

```
User (Browser) → Frontend (React) → Backend (Next.js) → Database (MongoDB)
```

User ko todos chahiye:
- User browser mein aata hai
- Frontend (React) user ko UI dikhata hai
- Frontend database se data nahi le sakta — beech mein koi connection chahiye!

---

## Solution — API Routes

**API Route kya hota hai?**

API Route ek **bridge** hai jo frontend aur backend ke beech connection banata hai।

```
User (Browser) → Frontend (React) → API Route → Backend (Next.js) → Database (MongoDB)
```

**Real life mein:**

```
Customer → Dukaan → Phone Call → Godown → Doodh milta hai
```

**Humare case mein:**

```
User → Frontend → HTTP Request → API Route → Database → Todos milte hain
```

---

## Next.js mein API Routes Kaise Banate Hain?

**Pehle socho — kahan banana chahiye?**

Next.js App Router mein ek special folder hota hai: `app/api/`

```
app/
└── api/          ← Yeh folder special hai
    └── todos/    ← Todo ke liye folder
        └── route.ts    ← Yeh file banayenge
```

**Kyun `app/api/` folder?**

Next.js convention hai:
- `app/page.tsx` → Main page
- `app/about/page.tsx` → About page
- `app/api/todos/route.ts` → Todos API route

**`route.ts` kyun?**

Next.js App Router mein:
- `page.tsx` → UI page
- `route.ts` → API endpoint

---

## Abhi Tak Kya Socha?

1. **Problem**: Frontend aur database alag hain, connection chahiye
2. **Solution**: API Routes — ek bridge banayenge
3. **Location**: `app/api/todos/route.ts` file banayenge
4. **Next Step**: Ab is file mein kya karna hai?

---

## Ab File Banao

**Pehle kya chahiye?**

```typescript
// app/api/todos/route.ts — abhi khali hai
```

**Ab is file mein pehle kya karna chahiye?**

Pehle socho — yeh file kya karegi?

**Yeh file ek function banayegi jo:**
1. Frontend se request lega
2. Database se data fetch karega
3. Frontend ko response bhejega

**Toh pehle function banana shuru karte hain:**

```typescript
// app/api/todos/route.ts
export async function GET() {
  // Yahan code aayega
}
```

**`export async function GET()` kya hota hai?**

- `export` → Next.js ko batana ki yeh function use karna hai
- `async` → Database se data fetch karna time leta hai
- `function GET` → GET request handle karega

**Abhi tak kya kiya?**

1. Problem samjha — Frontend aur backend ko connect karna hai
2. Solution decide kiya — API Routes
3. Location decide kiya — `app/api/todos/route.ts` file
4. Function banana shuru kiya — `export async function GET()`

**Ab agla step kya hoga?**

Ab hume is function mein code add karna hoga jo:
- Database se connect kare
- Data fetch kare
- Response bhejega

Yeh sab seekhenge Doc 06.2 mein! 🚀

---

## Summary — Doc 06.1 Mein Kya Kiya

✅ **Problem samjha** — Frontend aur backend alag hain, connection chahiye

✅ **Solution decide kiya** — API Routes ek bridge banayenge

✅ **Location decide kiya** — `app/api/todos/route.ts` file

✅ **Function banana shuru kiya** — `export async function GET()`

---

## Agla Step — Doc 06.2

**Doc 06.2: Pehla API Route — Setup aur GET Function**

Ab file bani hai, function banana shuru kiya hai। Ab is function mein code add karna hai jo:

- Database se connect kare
- Data fetch kare
- Response bhejega

Yeh sab seekhenge Doc 06.2 mein! 🚀
