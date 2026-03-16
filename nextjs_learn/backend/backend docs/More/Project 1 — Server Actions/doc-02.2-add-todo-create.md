# Doc 2.2 — Add Todo (Create) ✍️

## Pehle Problem Samjho — Bina Create Ke Kya Hoga?

Chalo ek scenario socho.

Tumne server actions samjhe (Doc 2.1). Ab socha "Todo kaise add karenge?"

Ab **kaun decide karega ki todo kaise add karna hai?**
**Kaise pata chalega ki kaun todo kaun add kar raha hai?**
**Kaise pata chalega ki kaun todo kaun sa hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message add karne ka tarika nahi hota, kaise pata chalega ki kaun message kisne bheja?
- **Instagram** — agar post add karne ka tarika nahi hota, kaise pata chalega ki kaun post kisne kiya?
- **Amazon** - agar order add karne ka tarika nahi hota, kaise pata chalega ki kaun order kisne kiya?

---

## Add Todo Kya Hota Hai? (Real Life Analogy)

Add Todo ek **notebook** mein entry karne jaisa hai:

| Notebook Entry | App Development |
|----------------|-----------------|
| Page            | Todo Item       |
| Entry           | Todo Data       |
| Notebook        | Database        |
| Writing         | Create Operation|

Agar notebook mein entry karne ka tarika nahi hota, kaise pata chalega ki kaun entry kaun kiya? Isliye entry zaroori hai.

---

## Hum Kya Sikhenge?

Hum Add Todo sikhenge jisse:

1. **Todo create ho** - Todo ban jaye
2. **Data save ho** - Database mein save ho
3. **Response mile** - Frontend ko response mile

---

## Step 1: Create Server Action

Ab create Server Action banate hain:

```typescript
// Pehle kaam karo
// "Ab create Server Action banate hain — iske liye POST method chahiye"
// "POST method data add karne ke liye use hota hai"
// "Export async function POST use karte hain"
```

**Kyun yeh structure?**
- **POST()** - Data add karne ke liye
- **Request** - Frontend se data aata hai
- **Response** - Frontend ko response bhejte hain

---

## Step 2: Data Parse Karo

Ab data parse karte hain:

```typescript
// Pehle kaam karo
// "Ab data ko parse karna hai — iske liye request.json() use karte hain"
// "Frontend se data aa raha hai — isko parse karna padega"
// "JSON format mein data aata hai"
```

**Kyun yeh approach?**
- **request.json()** - Data ko parse karta hai
- **JSON format** - Standard data format
- **Async operation** - Data ko wait karna padta hai

---

## Step 3: Database Mein Data Add Karo

Ab database mein data add karte hain:

```typescript
// Pehle kaam karo
// "Ab database mein data add karna hai — iske liye prisma use karte hain"
// "prisma.todo.create() se data create hota hai"
// "Data ko object format mein pass karte hain"
```

**Kyun yeh syntax?**
- **prisma.todo.create()** - Data create karta hai
- **data: {}** - Data ko object format mein pass karte hain
- **await** - Async operation handle karta hai

---

## Step 4: Response Banao

Ab response banao:

```typescript
// Pehle kaam karo
// "Ab response bana kar bhejna hai — iske liye NextResponse use karte hain"
// "NextResponse.json() se response format hota hai"
// "Created data ko bhejte hain"
```

**Kyun yeh structure?**
- **NextResponse.json()** - Response format karta hai
- **createdTodo** - Created data ko bhejte hain
- **Status code** - Success status bhejte hain

---

## Step 5: Complete Create Function

Ab complete function banate hain:

```typescript
// Pehle kaam karo
// "Ab complete function banate hain"
// "Sab steps ko mila kar ek function banate hain"
// "Error handling bhi add karte hain"
```

**Complete function:**
```typescript
export async function POST(req: Request) {
  try {
    // Data parse karo
    const todo = await req.json()

    // Database mein add karo
    const createdTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        done: false
      }
    })

    // Response banao
    return NextResponse.json(createdTodo)
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

## Summary — Doc 2.2 Mein Kya Sikha

✅ **Problem** - Bina create ke todo kaise add karenge?
✅ **Add Todo ka importance** - Notebook entry jaisa, data add karne ke liye zaroori
✅ **POST method** - Data add karne ke liye
✅ **Data parsing** - JSON format mein data parse karna
✅ **Database create** - Prisma se data create karna

---

## Agla Step — Doc 2.3

**Doc 2.3: Get Todos (Read)**

Abhi humne todo add karna sikha. Lekin kaise read karenge? Kaise fetch karenge? Woh samjhenge agle doc mein. 🚀