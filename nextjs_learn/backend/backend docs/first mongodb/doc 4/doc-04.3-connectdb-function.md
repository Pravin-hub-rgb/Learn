# Doc 04.3 — `connectDB` Function 🔌
### (Logic pehle, code baad mein)

---

## Abhi File Yahan Hai

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

Cache ready hai. Ab ek **function** chahiye jo actually connect kare.

---

## Pehle Socho — Function Ka Kaam Kya Hoga?

Yeh function koi bhi API route call karega jab database chahiye hoga.

Function ko teen situations handle karni hongi:

```
Situation 1: Pehle se connected hain
→ Kuch mat karo, seedha connection do

Situation 2: Connect hone ki process chal rahi hai (doosri request aayi beech mein)
→ Usi process ka wait karo, naya mat shuru karo

Situation 3: Bilkul naya — pehli baar connect karna hai
→ Connect karo, save karo, do
```

Yahi logic function mein likhenge — ek ek step.

---

## Yeh Function "Async" Kyun Hoga?

Database se connect karna **time leta hai** — milliseconds se seconds tak.

JavaScript mein jab koi kaam time le, hum `async/await` use karte hain:

- `async` = "Is function mein time lene wala kaam hai"
- `await` = "Yahan ruko jab tak yeh kaam complete na ho"

Bina `async/await` ke:
```
Connect shuru kiya → JavaScript aage badh gaya → Database ready nahi tha → Error 💥
```

`async/await` ke saath:
```
Connect shuru kiya → await → Complete hua → Ab aage badho ✅
```

Toh function `async` hoga. File mein add karo:

```typescript
// ... upar wala code same ...

async function connectDB() {

}
```

Abhi function khali hai. Ek ek situation handle karenge.

---

## Situation 1: Pehle Se Connected Hain?

Sabse pehle check karo — kya kaam already ho chuka hai?

```typescript
async function connectDB() {

  if (cached.conn) {
    return cached.conn
  }

}
```

**Yeh kya kar raha hai?**

`cached.conn` mein connection hoga agar pehle connect ho chuka hai.

```
cached.conn = null     → pehle connect nahi hua, aage badho
cached.conn = mongoose → already connected! seedha return karo
```

`return` matlab — function yahan band, caller ko connection mil gaya. Baaki code nahi chalega.

---

## Situation 2: Connect Ho Raha Hai Beech Mein?

Socho yeh scenario:

```
Request 1 aayi → connect shuru kiya (time lag raha hai)
Request 2 aayi → connectDB() call hua → kya naya connect shuru karein?
```

Nahi! Pehla connect chal raha hai — usi ka wait karo.

`cached.promise` mein woh process store hoti hai. Check karo:

```typescript
async function connectDB() {

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    // Sirf tab andar aao jab koi process nahi chal rahi
    // Yahan connect karenge
  }

}
```

`if (!cached.promise)` matlab: "Sirf tab naya connect shuru karo jab pehle se koi connect nahi chal raha."

---

## Situation 3: Bilkul Naya Connect

Ab andar ka code — jab genuinely pehli baar connect karna hai:

**Pehle MongoDB URI chahiye** — woh `.env.local` mein save ki thi:

```typescript
async function connectDB() {

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI

    if (!MONGODB_URI) {
      throw new Error(".env.local mein MONGODB_URI nahi hai! Check karo.")
    }

  }

}
```

**`process.env` kya hai?**

Node.js mein ek special object — `.env.local` ki saari values isme available hoti hain:

```
.env.local mein:    MONGODB_URI=mongodb+srv://...
Code mein:          process.env.MONGODB_URI  → "mongodb+srv://..."
```

**`throw new Error()` kyun?**

Agar URI nahi mili — aage koi bhi kaam possible nahi. Toh clearly batao kya gadbad hai aur rok do.

Bina is check ke error aata:
```
Cannot read properties of undefined  ← kuch samajh nahi aata
```

Is check ke baad:
```
.env.local mein MONGODB_URI nahi hai! ← seedha samajh aata
```

---

## Ab Actually Connect Karo

URI mil gayi — ab connect karo:

```typescript
async function connectDB() {

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI

    if (!MONGODB_URI) {
      throw new Error(".env.local mein MONGODB_URI nahi hai! Check karo.")
    }

    cached.promise = mongoose.connect(MONGODB_URI)
  }

}
```

**`cached.promise = mongoose.connect(MONGODB_URI)`**

`mongoose.connect()` immediately complete nahi hota — time lagta hai. Yeh ek **Promise** return karta hai — "main connect kar raha hoon, thoda wait karo."

Woh Promise `cached.promise` mein save kiya — taaki doosri request aaye toh pata chale "connect chal raha hai, wait karo."

---

## Promise Complete Hone Ka Wait Karo

```typescript
async function connectDB() {

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI

    if (!MONGODB_URI) {
      throw new Error(".env.local mein MONGODB_URI nahi hai! Check karo.")
    }

    cached.promise = mongoose.connect(MONGODB_URI)
  }

  cached.conn = await cached.promise
  return cached.conn
}
```

**`cached.conn = await cached.promise`**

`await` — ruko jab tak connect complete na ho.

Complete hua → connection `cached.conn` mein save kiya → return kiya.

Agla baar `connectDB()` call hoga → `cached.conn` mein connection hoga → seedha return (Situation 1).

---

## Last Step — Export Karo

Yeh function doosri files mein use karna hai. Export karo:

```typescript
async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI

    if (!MONGODB_URI) {
      throw new Error(".env.local mein MONGODB_URI nahi hai! Check karo.")
    }

    cached.promise = mongoose.connect(MONGODB_URI)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
```

`export default` — doosri file mein `import connectDB from "@/lib/mongodb"` se aa sakta hai.

---

## Poori Final File Ek Baar Dekho

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

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI

    if (!MONGODB_URI) {
      throw new Error(".env.local mein MONGODB_URI nahi hai! Check karo.")
    }

    cached.promise = mongoose.connect(MONGODB_URI)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
```

---

## Poora Flow Ek Baar:

```
connectDB() call hua
      ↓
cached.conn hai? → YES → return (fast ⚡)
      ↓ NO
cached.promise chal rahi? → YES → await karo
      ↓ NO
MONGODB_URI hai? → NO → Error ❌
      ↓ YES
mongoose.connect() → promise save karo
      ↓
await → conn save karo → return ✅
```

---

## Summary — Doc 04.3

✅ **Kyun async** — connect hone mein time lagta hai

✅ **Situation 1** — already connected? seedha return

✅ **Situation 2** — already connecting? wait karo

✅ **Situation 3** — pehli baar: URI lo, connect karo, save karo

✅ **`throw new Error`** — clear error message, aage mat badho

✅ **`export default`** — doosri files mein import ke liye

---

## Agla Step — Doc 04.4

**Use Kaise Karein? (Short doc)**

File ban gayi. Ab dekhenge API routes mein isko kaise use karte hain — aur `@/` shortcut kya hota hai. 🎯
