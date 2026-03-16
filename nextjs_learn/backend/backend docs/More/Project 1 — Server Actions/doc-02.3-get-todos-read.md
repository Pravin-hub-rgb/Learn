# Doc 2.3 — Get Todos (Read) 📖

## Pehle Problem Samjho — Bina Read Ke Kya Hoga?

Chalo ek scenario socho.

Tumne todo add karna sikha (Doc 2.2). Ab socha "Todo kaise dikhayenge?"

Ab **kaun decide karega ki todo kaise dikhana hai?**
**Kaise pata chalega ki kaun todo kaun sa hai?**
**Kaise pata chalega ki kaun todo kaun si hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message read karne ka tarika nahi hota, kaise pata chalega ki kaun message kisne bheja?
- **Instagram** — agar post read karne ka tarika nahi hota, kaise pata chalega ki kaun post kisne kiya?
- **Amazon** — agar product read karne ka tarika nahi hota, kaise pata chalega ki kaun product kis category mein aata hai?

---

## Get Todos Kya Hota Hai? (Real Life Analogy)

Get Todos ek **library** mein books dhoondne jaisa hai:

| Library Search | App Development |
|----------------|-----------------|
| Book Title     | Todo Title |
| Book ID        | Todo ID |
| Book Status    | Todo Status |
| Book Location  | Database Location |

Agar library mein books dhoondne ka tarika nahi hota, kaise pata chalega ki kaun book kahan hai? Isliye search zaroori hai.

---

## Hum Kya Sikhenge?

Hum Get Todos sikhenge jisse:

1. **Todo read ho** - Sab todos fetch ho
2. **Data display ho** - Frontend mein display ho
3. **Response mile** - Frontend ko response mile

---

## Step 1: Read Server Action

Ab read Server Action banate hain:

```typescript
// Pehle kaam karo
// "Ab read Server Action banate hain — iske liye GET method chahiye"
// "GET method data read karne ke liye use hota hai"
// "Export async function GET use karte hain"
```

**Kyun yeh structure?**
- **GET()** - Read operation ke liye
- **Request** - Frontend se request aati hai
- **Response** - Frontend ko response bhejte hain

---

## Step 2: Database Se Data Fetch Karo

Ab database se data fetch karte hain:

```typescript
// Pehle kaam karo
// "Ab database se data fetch karna hai — iske liye prisma use karte hain"
// "prisma.todo.findMany() se sab todos fetch hote hain"
// "Data ko await karna padta hai"
```

**Kyun yeh syntax?**
- **prisma.todo.findMany()** - Sab todos fetch karta hai
- **await** - Async operation handle karta hai
- **findMany()** - Multiple data fetch karta hai

---

## Step 3: Response Banao

Ab response banao:

```typescript
// Pehle kaam karo
// "Ab response bana kar bhejna hai — iske liye NextResponse use karte hain"
// "NextResponse.json() se response format hota hai"
// "Fetched data ko bhejte hain"
```

**Kyun yeh structure?**
- **NextResponse.json()** - Response format karta hai
- **todos** - Fetched data ko bhejte hain
- **Status code** - Success status bhejte hain

---

## Step 4: Complete Read Function

Ab complete function banate hain:

```typescript
// Pehle kaam karo
// "Ab complete function banate hain"
// "Sab steps ko mila kar ek function banate hain"
// "Error handling bhi add karte hain"
```

**Complete function:**
```typescript
export async function GET() {
  try {
    // Database se data fetch karo
    const todos = await prisma.todo.findMany()

    // Response banao
    return NextResponse.json(todos)
  } catch (error) {
    // Error handle karo
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
```

---

## Step 5: Read Operation Ka Advantage

Ab advantage samjho:

```typescript
// Pehle kaam karo
// "Ab advantage samjhna hai — iske liye examples chahiye"
// "Read operation ka advantage yeh hai ki"
// "1. Data sort kar sakte hain"
// "2. Data filter kar sakte hain"
// "3. Data paginate kar sakte hain"
```

**Advantage:**
- **Sorting** - Data sort kar sakte hain
- **Filtering** - Data filter kar sakte hain
- **Pagination** - Data ko parts mein divide kar sakte hain

---

## Summary — Doc 2.3 Mein Kya Sikha

✅ **Problem** - Bina read ke todo kaise dikhayenge?
✅ **Get Todos ka importance** - Library search jaisa, data dhoondne ke liye zaroori
✅ **GET method** - Data read karne ke liye
✅ **Database fetch** - Prisma se data fetch karna
✅ **Response format** - Frontend ko response bhejna

---

## Agla Step — Doc 2.4

**Doc 2.4: Update Todo (Toggle Done)**

Abhi humne todo read karna sikha. Lekin kaise update karenge? Kaise toggle karenge? Woh samjhenge agle doc mein. 🚀