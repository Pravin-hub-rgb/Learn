# Doc 04.4 — `connectDB` Use Karna 🔗
### (Import karo, call karo — bas itna)

---

## File Ready Hai — Ab Use Karna Hai

`lib/mongodb.ts` complete ho gayi. Ab har API route mein jab bhi database chahiye — pehle yeh function call karna hoga.

**Kaise import karein?**

---

## `@/` Shortcut — Kyun Use Karte Hain?

Socho `app/api/todos/route.ts` mein ho aur `lib/mongodb.ts` import karni hai.

Bina shortcut ke — **relative path:**

```typescript
import connectDB from "../../../lib/mongodb"
// Kitne ../ ? Confusing. File move karo toh path toot jaata hai.
```

`@/` ke saath — **absolute path:**

```typescript
import connectDB from "@/lib/mongodb"
// Hamesha project root se shuru — kahan se bhi import karo, same rahega
```

`@/` = "project root se shuru karo." Next.js mein yeh already configured hota hai.

---

## API Route Mein Use Karna

Har API route mein database se kaam karne se pehle — pehli line yeh hogi:

```typescript
import connectDB from "@/lib/mongodb"

export async function GET() {
  await connectDB()    // ← pehle connect karo
  // phir database ka kaam...
}
```

**`await` kyun zaroori hai?**

`connectDB` async function hai — time leta hai. Bina `await` ke:

```
connectDB() shuru hua — JavaScript aage badh gaya
Agla line: database se data maango — ERROR! connected nahi hain abhi 💥
```

`await` ke saath:

```
await connectDB() — ruko jab tak connect complete na ho ✅
Agla line: connected hain — database se data maango ✅
```

---

## Yeh Pattern Aage Har Jagah Dikhega

Doc 06 se jab API routes banayenge — har ek mein yeh pattern hoga:

```typescript
import connectDB from "@/lib/mongodb"
import Todo from "@/models/Todo"

export async function GET() {
  await connectDB()           // Step 1: Connect
  const todos = await Todo.find()  // Step 2: Kaam karo
  return Response.json(todos)      // Step 3: Response do
}
```

Abhi `Todo` model kya hota hai — woh Doc 05 mein banayenge. Sirf pattern dekho:

**Connect → Kaam → Respond**

---

## Summary — Doc 04 Complete! 🎉

Poori `lib/mongodb.ts` journey:

| Doc | Kyun | Kya kiya |
|-----|------|----------|
| 04.1 | Next.js aur MongoDB ko connect karna tha | Samjha kyun file chahiye, caching kyun |
| 04.2 | File likhna shuru | Import, interface, global cache setup |
| 04.3 | Actual connect karna | connectDB function — 3 situations handle |
| 04.4 | Doosri files mein use karna | Import pattern, `@/` shortcut |

---

## Agla Step — Doc 05

**Model Kya Hota Hai? (Mongoose Schema)**

Connection ready hai. Ab ek naya sawaal:

> "MongoDB mein data save karna hai — lekin **kaise** save hoga? Kya koi structure hai? Kya todo mein sirf title hoga ya aur bhi fields?"

Yahi define karte hain **Model** mein. `models/Todo.ts` banayenge — step by step, WHY se shuru karke. 🚀
