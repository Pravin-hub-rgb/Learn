# Doc 2.4 — Update Todo (Toggle Done) 🔄

## Pehle Problem Samjho — Bina Update Ke Kya Hoga?

Chalo ek scenario socho.

Tumne todo read karna sikha (Doc 2.3). Ab socha "Todo kaise update karenge?"

Ab **kaun decide karega ki todo kaise update karna hai?**
**Kaise pata chalega ki kaun todo kaun update kar raha hai?**
**Kaise pata chalega ki kaun todo kaun sa hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message update karne ka tarika nahi hota, kaise pata chalega ki kaun message kisne edit kiya?
- **Instagram** — agar post update karne ka tarika nahi hota, kaise pata chalega ki kaun post kisne modify kiya?
- **Amazon** — agar order update karne ka tarika nahi hota, kaise pata chalega ki kaun order kisne change kiya?

---

## Update Todo Kya Hota Hai? (Real Life Analogy)

Update Todo ek **light switch** toggle karne jaisa hai:

| Light Switch | App Development |
|--------------|-----------------|
| On/Off        | Done/Not Done |
| Switch        | Update Operation |
| Light         | Todo Status |

Agar light switch nahi hota, kaise pata chalega ki light on hai ya off? Isliye switch zaroori hai.

---

## Hum Kya Sikhenge?

Hum Update Todo sikhenge jisse:

1. **Todo update ho** - Todo ka status change ho
2. **Data save ho** - Database mein save ho
3. **Response mile** - Frontend ko response mile

---

## Step 1: Update Server Action

Ab update Server Action banate hain:

```typescript
// Pehle kaam karo
// "Ab update Server Action banate hain — iske liye PATCH method chahiye"
// "PATCH method data update karne ke liye use hota hai"
// "Export async function PATCH use karte hain"
```

**Kyun yeh structure?**
- **PATCH()** - Update operation ke liye
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

## Step 3: Database Mein Data Update Karo

Ab database mein data update karte hain:

```typescript
// Pehle kaam karo
// "Ab database mein data update karna hai — iske liye prisma use karte hain"
// "prisma.todo.update() se data update hota hai"
// "Data ko object format mein pass karte hain"
```

**Kyun yeh syntax?**
- **prisma.todo.update()** - Data update karta hai
- **where: { id: params.id }** - Specific todo ko identify karta hai
- **data: { done: todo.done }** - Data ko update karta hai

---

## Step 4: Response Banao

Ab response banao:

```typescript
// Pehle kaam karo
// "Ab response bana kar bhejna hai — iske liye NextResponse use karte hain"
// "NextResponse.json() se response format hota hai"
// "Updated data ko bhejte hain"
```

**Kyun yeh structure?**
- **NextResponse.json()** - Response format karta hai
- **updatedTodo** - Updated data ko bhejte hain
- **Status code** - Success status bhejte hain

---

## Step 5: Complete Update Function

Ab complete function banate hain:

```typescript
// Pehle kaam karo
// "Ab complete function banate hain"
// "Sab steps ko mila kar ek function banate hain"
// "Error handling bhi add karte hain"
```

**Complete function:**
```typescript
export async function PATCH(req: Request, { params }) {
  try {
    // Data parse karo
    const todo = await req.json()

    // Database mein update karo
    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: {
        done: todo.done
      }
    })

    // Response banao
    return NextResponse.json(updatedTodo)
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

## Step 6: Update Operation Ka Advantage

Ab advantage samjho:

```typescript
// Pehle kaam karo
// "Ab advantage samjhna hai — iske liye examples chahiye"
// "Update operation ka advantage yeh hai ki"
// "1. Partial update kar sakte hain"
// "2. Timestamp add kar sakte hain"
// "3. Type safety milti hai"
```

**Advantage:**
- **Partial update** - Sirf specific fields update kar sakte hain
- **Timestamp** - Update time track kar sakte hain
- **Type safety** - TypeScript se type checking milti hai

---

## Summary — Doc 2.4 Mein Kya Sikha

✅ **Problem** - Bina update ke todo kaise toggle karenge?
✅ **Update Todo ka importance** - Light switch jaisa, status change karne ke liye zaroori
✅ **PATCH method** - Data update karne ke liye
✅ **Data parsing** - JSON format mein data parse karna
✅ **Database update** - Prisma se data update karna

---

## Agla Step — Doc 2.5

**Doc 2.5: Delete Todo**

Abhi humne todo update karna sikha. Lekin kaise delete karenge? Woh samjhenge agle doc mein. 🚀