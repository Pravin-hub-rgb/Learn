# Doc 03 — Project Setup & Folder Structure 🛠️
### (Pehla kadam — sab kuch install aur setup karo)

---

## Is Doc Mein Kya Karenge

1. Next.js project banana
2. MongoDB Atlas account banana (free cloud database)
3. Zaroori packages install karna
4. `.env` file kya hoti hai — samjhna aur banana
5. Poora folder structure samjhna

Chal shuru karte hain। **Ek ek step — ruko mat, bhaago mat।**

---

## Step 1 — Next.js Project Banana

Terminal kholo aur yeh command likho:

```bash
npx create-next-app@latest todo-app
```

Yeh command chalane ke baad kuch sawaal poochega। **Exactly yahi jawab do:**

```
✔ Would you like to use TypeScript? → Yes
✔ Would you like to use ESLint? → Yes
✔ Would you like to use Tailwind CSS? → Yes
✔ Would you like to use `src/` directory? → No
✔ Would you like to use App Router? → Yes
✔ Would you like to customize the default import alias (@/*)? → No
```

**`src/` directory kyun No?**
`src/` ek extra folder hota hai jo files ko ek jagah group karta hai। Beginners ke liye without `src/` aasan hota hai — files directly root mein hongi।

**App Router kyun Yes?**
Next.js ka naya system hai। Hum `app/` folder use karenge — yahi modern tarika hai।

Ab project folder mein jao:

```bash
cd todo-app
code .
```

(`code .` VS Code mein project kholta hai)

---

## Step 2 — Folder Structure Samjho

Jab project khulega, tum dekhoge:

```
todo-app/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

**Har important folder/file ka kaam:**

### `app/` — Tumhara Poora App Yahan Hai
Next.js ka main folder। Yahan pages aur API routes dono hote hain।

```
app/
├── page.tsx        ← Home page (localhost:3000/)
├── layout.tsx      ← Har page ka common wrapper (navbar wagera)
├── globals.css     ← Global CSS
└── api/            ← Yeh hum khud banayenge — backend yahan hoga
```

**Convention:** `app/` ke andar har folder ek route ban jaata hai।
- `app/about/page.tsx` → `/about`
- `app/api/todos/route.ts` → `/api/todos`

### `public/` — Static Files
Images, icons, fonts jo directly URL se access karo।
- `public/logo.png` → `http://localhost:3000/logo.png`

### `package.json` — Dependencies List
Tumhara app kaun kaun si libraries use karta hai — sab yahan listed hai।

```json
{
  "dependencies": {
    "next": "15.x.x",
    "react": "19.x.x",
    ...
  }
}
```

---

## Step 3 — Zaroori Packages Install Karo

Hume do cheezein chahiye:

```bash
npm install mongoose
```

**`mongoose` kya hai?**

MongoDB se directly baat karna mushkil hai (low level code likhna padta hai)। `mongoose` ek library hai jo:
- MongoDB se connection aasan banata hai
- Data ka structure (Schema) define karne deta hai
- Simple functions deta hai — `.find()`, `.save()`, `.deleteOne()` etc।

Bina `mongoose`:
```javascript
// Bahut complicated, manually sab karna padta
const { MongoClient } = require('mongodb')
const client = new MongoClient(url)
await client.connect()
const db = client.db('myapp')
const collection = db.collection('todos')
const todos = await collection.find({}).toArray()
```

`mongoose` ke saath:
```javascript
// Simple!
const todos = await Todo.find()
```

---

## Step 4 — MongoDB Atlas Setup (Free Cloud Database)

### 4.1 — Account Banana
1. Jao: **https://www.mongodb.com/cloud/atlas**
2. "Try Free" pe click karo
3. Account banao (Google se bhi kar sakte ho)

### 4.2 — Free Cluster Banana
1. Login ke baad "Build a Database" dikhega
2. **"M0 Free"** select karo (bilkul free, forever)
3. Provider: AWS, Region: koi bhi (Mumbai select karo agar option hai)
4. Cluster Name: `Cluster0` (default rehne do)
5. "Create" pe click karo

**Cluster kya hota hai?**
Cluster = ek server jahan tumhara database rahega। M0 Free cluster ek shared server hai — free mein milta hai, todo app ke liye kaafi hai।

### 4.3 — Username aur Password Banana
1. Cluster banne ke baad "Security Quickstart" khulega
2. Authentication Method: "Username and Password"
3. Username: `todouser` (ya jo chahte ho)
4. Password: "Autogenerate" pe click karo — **YEH PASSWORD COPY KARKE RAKHO**
5. "Create User" pe click karo

### 4.4 — Network Access
1. "Add My Current IP Address" pe click karo
2. Ya "Allow Access from Anywhere" (0.0.0.0/0) select karo — development ke liye okay hai
3. "Confirm" karo

### 4.5 — Connection String Lena
1. Cluster ke paas "Connect" button pe click karo
2. "Drivers" select karo
3. Driver: Node.js, Version: latest
4. **Connection string copy karo** — kuch aisa dikhega:

```
mongodb+srv://todouser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**`<password>` wali jagah** apna actual password daalo।

---

## Step 5 — `.env.local` File Kya Hoti Hai?

**Problem:**
Tumhare paas ek secret hai — MongoDB ka password। Yeh code mein seedha nahi likh sakte kyunki:
- GitHub pe push karo toh duniya dekh legi
- Frontend ke code mein ho toh browser mein dikh jaayega

**Solution: `.env.local` file**

Yeh ek special file hai jisme **secret information** rakho। 

**Important properties:**
- `.gitignore` mein already listed hai — GitHub pe nahi jaati
- Sirf server side code is file ko read kar sakta hai
- Next.js automatically is file ko load karta hai

### `.env.local` Banao

Project root mein (jahan `package.json` hai) ek nayi file banao:
**Filename:** `.env.local`

```env
MONGODB_URI=mongodb+srv://todouser:TUMHARA_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Dhyan raho:**
- Apna actual password daalo `TUMHARA_PASSWORD` ki jagah
- Koi spaces nahi `=` ke aagey peeche
- Quotes nahi chahiye

### `.env.local` Ko Access Kaise Karte Hain Code Mein?

Next.js mein server-side code mein aise access karo:

```typescript
process.env.MONGODB_URI
```

`process.env` ek **object** hai jo Node.js mein hota hai। Isme saari environment variables hoti hain।

```
process.env = {
  MONGODB_URI: "mongodb+srv://todouser:...",
  NODE_ENV: "development",
  // ... aur bhi system variables
}
```

Toh `process.env.MONGODB_URI` se tumhara MongoDB URL milega।

---

## Step 6 — Naye Folders Banana (Jo Abhi Nahi Hain)

Hume do naye folders banana hai:

```bash
mkdir lib
mkdir models
```

**Ya manually VS Code mein banao।**

### `lib/` Folder — Kyun?
"Library" ya "utilities" ka short form। Yahan woh code jaata hai jo **baar baar use hota hai** aur kisi specific page ya component ka hissa nahi hai।

Humara MongoDB connection code yahan jaayega — kyunki:
- Multiple API routes use karenge isse
- Ek jagah rakhenge toh baar baar nahi likhna padega

**Convention:** `lib/` mein helper functions, database connection, utility functions।

### `models/` Folder — Kyun?
Yahan **data ke blueprints** (Mongoose Schemas) jaate hain।

Jab hum bolte hain "ek todo ka structure kya hoga" — woh definition `models/` mein hoti hai।

**Convention:** `models/` mein database models/schemas।

---

## Final Folder Structure — Abhi Kya Dikhna Chahiye

```
todo-app/
├── app/
│   ├── api/                 ← YEH BANAO (folder)
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/                     ← YEH BANAO
├── models/                  ← YEH BANAO
├── public/
├── .env.local               ← YEH BANAO (MongoDB URL yahan)
├── .gitignore
├── next.config.mjs
├── package.json
└── tsconfig.json
```

`app/api/` folder abhi khali hai — agle docs mein files banayenge isme।

---

## Verify Karo — Sab Theek Hai?

### Check 1: Package install hua?
```bash
cat package.json
```
`mongoose` dependencies mein dikhna chahiye।

### Check 2: App chal rahi hai?
```bash
npm run dev
```
Browser mein `http://localhost:3000` kholo — Next.js ka default page dikhna chahiye।

### Check 3: `.env.local` sahi hai?
File exist karti hai project root mein? MongoDB URI sahi hai? Password sahi daala?

---

## Summary — Doc 03 Mein Kya Kiya

✅ **Next.js project banaya** — TypeScript + Tailwind ke saath

✅ **Folder structure samjha** — `app/`, `public/`, kaunsa folder kisliye

✅ **`mongoose` install kiya** — MongoDB se baat karne wali library

✅ **MongoDB Atlas setup kiya** — free cloud database, cluster, username/password

✅ **`.env.local` banaya** — secrets ko safely store karne ka tarika

✅ **`lib/` aur `models/` banaye** — convention ke saath

---

## Agla Step — Doc 04

**Doc 04: MongoDB Se Connect Kaise Karein?**

Setup ho gaya। Ab `lib/` folder mein connection file banayenge। 

Yahan `useEffect` bhi practically samjhega — kyunki "app start hone pe ek baar database se connect karo" wali cheez exactly `useEffect` jaisi soch hai।

Chalo! 🚀
