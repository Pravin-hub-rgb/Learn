# Doc 04.2 — File Likhna Shuru Karte Hain ✍️
### (Pehle kya chahiye — woh socho)

---

## File Banao

`lib/` folder mein `mongodb.ts` file banao. Abhi bilkul khali:

```typescript
// lib/mongodb.ts — abhi khali hai
```

Ab socho — **is file mein sab se pehle kya chahiye hoga?**

---

## Pehli Zaroorat — Mongoose

Hum MongoDB se connect karne wale hain. Yeh kaam khud karna bahut complicated hota — low level code likhna padta.

Isliye Doc 03 mein `mongoose` install kiya tha:

```bash
npm install mongoose
```

Ab is file mein use karna hai toh **pehle import karna padega.**

Import ka matlab: "Yeh installed library is file mein available karo."

```typescript
import mongoose from "mongoose"
```

File abhi yahan hai:

```typescript
import mongoose from "mongoose"
```

---

## Doosri Zaroorat — Cache Ka Structure

Doc 04.1 mein samjha tha — connection ek baar banao, baar baar reuse karo.

Toh hume ek **cache** chahiye — ek jagah jahan connection store ho.

**Lekin ek problem hai — connection banana time leta hai.**

Socho agar hum aise karte:

```typescript
// ❌ GALAT APPROACH
const connection = mongoose.connect(MONGODB_URI)  // ← Connect shuru kiya
const todos = await Todo.find()                   // ← Seedha aage badhe
```

**Problem kya hoga?**

```
mongoose.connect() shuru hua → JavaScript aage badh gaya
Todo.find() call hua → Database ready nahi tha → ERROR! 💥
```

**Solution kya chahiye?**

Database connect hone ka **wait karna padega**. Jab tak connect na ho, aage mat badho.

---

## Wait Kaise Karein? — Promise System

JavaScript mein jab koi kaam time leta hai, woh ek **Promise** deta hai.

**Promise matlab:** "Main complete karunga, tum wait karo."

Toh hume cache mein do cheezein store karni hain:

```
Connection store karna hai → toh ek field chahiye: conn
Wait karne ka system chahiye → toh ek field chahiye: promise
```

Yeh do cheezein store karni hain. Toh cache object aisa dikhega:

```
{
  conn: ...      ← actual connection yahan hoga
  promise: ...   ← connect hone ki process yahan hogi
}
```

**Promise kya hota hai — samajhne ke liye dekho **Doc 04.2.1 — Promise Kya Hai?** 📖

Ab TypeScript mein jab bhi koi object banate hain — uska **type/structure pehle define karte hain** (interface se). Tum yeh jaante ho already.

Toh yeh interface likhenge:

```typescript
import mongoose from "mongoose"

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}
```

**`typeof mongoose` kyun — seedha `mongoose` kyun nahi?**

`mongoose` ek object hai — library. Uska **type** refer karna hai, khud object nahi. TypeScript mein kisi existing cheez ka type lene ke liye `typeof` use karte hain.

**`| null` kyun?**

Shuru mein dono fields khaali honge — connection bana nahi, promise bhi nahi. `null` matlab "abhi kuch nahi."

---

## Teesri Zaroorat — Cache Kahan Rakhen?

Yeh thoda interesting hai. Socho:

Agar hum normal variable banayein:

```typescript
let cached = { conn: null, promise: null }
```

**Problem:** Next.js development mein file save karo — Hot Reload hoti hai. File dobara load hoti hai. Yeh variable **reset** ho jaata hai — cache gaya, connection gaya, phir se connect karna padega.

**Solution chahiye:** Koi aisi jagah jahan variable **file reload ke baad bhi survive kare.**

Woh jagah hai — **`global` object.**

Node.js (jis pe Next.js chalta hai) mein `global` ek special object hai. Jaise browser mein `window` hota hai — poori application mein accessible, survive karta hai.

Toh cache `global` mein rakhenge. Lekin TypeScript strict hai — pehle use batana padega ki `global` pe yeh property hogi:

```typescript
import mongoose from "mongoose"

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

**`declare global { ... }` kya hota hai?**

`declare` TypeScript ko batata hai ki yeh property exist karti hai, lekin actual create nahi karta.

Socho jaise tum kisi ko batate ho: "Yeh cheez yahan exist karti hai" — lekin khud create nahi karte.

**`Promise<typeof mongoose> | null` kya hota hai?**

- `Promise<typeof mongoose>` → mongoose ka connection promise hai
- `| null` → shuru mein kuch nahi hoga (null)
- Combined → "Promise hoga ya null hoga"

**`typeof mongoose` kya hota hai?**

- `mongoose` ek object hai — library
- `typeof mongoose` uska **type** refer karta hai, khud object nahi
- TypeScript mein kisi existing cheez ka type lene ke liye `typeof` use karte hain
```

**`declare global { ... }` sirf TypeScript ko inform karna hai** — actual kuch create nahi hota. Bina iske TypeScript error dega: "mongoose property nahi hai global pe."

---

## Ab Cache Variable Banao

Ab actually cache banate hain:

```typescript
import mongoose from "mongoose"

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null }
global.mongoose = cached
```

**Yeh do lines mein kya ho raha hai?**

`??` operator — "nullish coalescing":

```
global.mongoose ?? { conn: null, promise: null }

→ Agar global.mongoose mein kuch hai (pehle wala cache) → wahi lo
→ Agar kuch nahi (pehli baar) → fresh { conn: null, promise: null } se shuru karo
```

Phir `global.mongoose = cached` — jo bhi liya, use global mein save karo taaki next reload pe survive kare.

---

## Abhi File Kaisi Dikhti Hai?

```typescript
import mongoose from "mongoose"

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null }
global.mongoose = cached
```

**Abhi kuch run nahi hoga** — hum sirf setup kar rahe hain. Actual kaam karne wala function abhi baaki hai.

---

## Summary — Doc 04.2

✅ **`import mongoose`** — library available karna kyunki bina iske connect nahi kar sakte

✅ **`MongooseCache` interface** — cache object ka structure: conn aur promise

✅ **`global` mein kyun rakha** — hot reload pe normal variable reset ho jaata

✅ **`declare global`** — TypeScript ko inform karna, actual kuch nahi banta

✅ **`??` operator** — pehle wala cache lo, nahi hai toh fresh shuru karo

---

## Agla Step — Doc 04.3

Setup complete. Ab **actual `connectDB` function** likhenge.

Yahan logic aayega — "connected hain? nahi? connect karo." Step by step. 🎯
