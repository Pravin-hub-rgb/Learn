# Doc 2.5 — Delete Todo 🗑️

## Pehle Problem Samjho — Bina Delete Ke Kya Hoga?

Chalo ek scenario socho.

Tumne todo update karna sikha (Doc 2.4). Ab socha "Todo kaise delete karenge?"

Ab **kaun decide karega ki todo kaise delete karna hai?**
**Kaise pata chalega ki kaun todo kaun delete kar raha hai?**
**Kaise pata chalega ki kaun todo kaun sa hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message delete karne ka tarika nahi hota, kaise pata chalega ki kaun message kisne delete kiya?
- **Instagram** — agar post delete karne ka tarika nahi hota, kaise pata chalega ki kaun post kisne delete kiya?
- **Amazon** — agar order delete karne ka tarika nahi hota, kaise pata chalega ki kaun order kisne delete kiya?

---

## Delete Todo Kya Hota Hai? (Real Life Analogy)

Delete Todo ek **dustbin** mein daalne jaisa hai:

| Dustbin | App Development |
|---------|-----------------|
| Trash   | Deleted Data |
| Throw   | Delete Operation |
| Empty   | Database Cleanup |

Agar dustbin nahi hota, kaise pata chalega ki kaun kachra kahan daala? Isliye dustbin zaroori hai.

---

## Hum Kya Sikhenge?

Hum Delete Todo sikhenge jisse:

1. **Todo delete ho** - Todo permanently remove ho
2. **Data cleanup ho** - Database clean ho
3. **Response mile** - Frontend ko response mile

---

## Step 1: Delete Server Action

Ab delete Server Action banate hain:

```typescript
// Pehle kaam karo
// "Ab delete Server Action banate hain — iske liye DELETE method chahiye"
// "DELETE method data delete karne ke liye use hota hai"
// "Export async function DELETE use karte hain"
```

**Kyun yeh structure?**
- **DELETE()** - Delete operation ke liye
- **Request** - Frontend se request aati hai
- **Response** - Frontend ko response bhejte hain

---

## Step 2: Database Mein Data Delete Karo

Ab database mein data delete karte hain:

```typescript
// Pehle kaam karo
// "Ab database mein data delete karna hai — iske liye prisma use karte hain"
// "prisma.todo.delete() se data delete hota hai"
// "Data ko identify karne ke liye id chahiye"
```

**Kyun yeh syntax?**
- **prisma.todo.delete()** - Data delete karta hai
- **where: { id: params.id }** - Specific todo ko identify karta hai
- **await** - Async operation handle karta hai

---

## Step 3: Response Banao

Ab response banao:

```typescript
// Pehle kaam karo
// "Ab response bana kar bhejna hai — iske liye NextResponse use karte hain"
// "NextResponse.json() se response format hota hai"
// "Deleted data ko bhejte hain"
```

**Kyun yeh structure?**
- **NextResponse.json()** - Response format karta hai
- **deletedTodo** - Deleted data ko bhejte hain
- **Status code** - Success status bhejte hain

---

## Step 4: Complete Delete Function

Ab complete function banate hain:

```typescript
// Pehle kaam karo
// "Ab complete function banate hain"
// "Sab steps ko mila kar ek function banate hain"
// "Error handling bhi add karte hain"
```

**Complete function:**
```typescript
export async function DELETE({ params }) {
  try {
    // Database mein delete karo
    const deletedTodo = await prisma.todo.delete({
      where: { id: params.id }
    })

    // Response banao
    return NextResponse.json(deletedTodo)
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

## Step 5: Delete Operation Ka Advantage

Ab advantage samjho:

```typescript
// Pehle kaam karo
// "Ab advantage samjhna hai — iske liye examples chahiye"
// "Delete operation ka advantage yeh hai ki"
// "1. Data permanently remove ho jata hai"
// "2. Database clean hota hai"
// "3. Storage save hota hai"
```

**Advantage:**
- **Permanent removal** - Data permanently remove ho jata hai
- **Database cleanup** - Database clean hota hai
- **Storage saving** - Storage save hota hai

---

## Summary — Doc 2.5 Mein Kya Sikha

✅ **Problem** - Bina delete ke todo kaise remove karenge?
✅ **Delete Todo ka importance** - Dustbin jaisa, data remove karne ke liye zaroori
✅ **DELETE method** - Data delete karne ke liye
✅ **Database delete** - Prisma se data delete karna
✅ **Response format** - Frontend ko response bhejna

---

## Agla Step — Doc 2.6

**Doc 2.6: Error Handling & Validation**

Abhi humne todo delete karna sikha. Lekin error kaise handle karenge? Validation kaise karenge? Woh samjhenge agle doc mein. 🚀