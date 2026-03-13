# Doc 02 — Backend Kya Hota Hai? 🔧
### (Aur Next.js mein woh kahan rehta hai)

---

## Pehle Problem — Frontend Seedha Database Se Baat Kyun Nahi Kar Sakta?

Maan lo tumne React mein directly MongoDB se connect karne ki koshish ki:

```javascript
// ❌ YEH KABHI MAT KARO — yeh GALAT hai aur DANGEROUS bhi
import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://username:PASSWORD123@cluster.mongodb.net/myapp")
```

**Kya problem hai isme?**

Tumhara React code **browser mein run hota hai**. Browser mein run hone wala code **duniya ke saamne hota hai** — koi bhi browser mein "View Source" kare ya DevTools khole toh **tumhara database password dikh jaayega.** 😱

Isliye ek **middleman** chahiye — jo:
1. Browser se request le
2. Khud database se baat kare (securely, server pe)
3. Result wapas browser ko de

Iss middleman ka naam hai — **Backend / Server**

---

## Frontend vs Backend — Real Life Analogy

Socho ek **restaurant** hai:

```
Customer (tum)     →   Waiter          →   Kitchen
[Frontend/Browser]     [Backend/API]       [Database]

"Mujhe pasta chahiye"   Order liya,        Khana banaya,
                        kitchen ko         waiter ko diya
                        bataya
```

- **Customer** seedha kitchen mein nahi jaata
- **Waiter** (backend) beech mein hota hai
- **Kitchen** (database) sirf waiter se baat karta hai

---

## Next.js Mein Backend Kahan Hota Hai?

Yahan kuch **magical** hai Next.js mein.

Normal websites mein:
- Frontend alag project hota hai (React)
- Backend alag project hota hai (Node.js/Express)
- Dono ko alag alag deploy karo

**Next.js mein:**
- Frontend aur Backend **ek hi project** mein hota hai! 🎉
- `app/` folder mein pages hote hain (frontend)
- `app/api/` folder mein backend hota hai

```
my-todo-app/
├── app/
│   ├── page.tsx          ← Frontend (jo browser pe dikhta hai)
│   ├── api/
│   │   └── todos/
│   │       └── route.ts  ← Backend (server pe chalega, database se baat karega)
```

`app/api/` ke andar jo files hain — **woh tumhara backend hai।** Yeh code kabhi browser mein nahi jaata — sirf server pe chalta hai। Isliye yahan safely database password rakh sakte hain।

---

## API Kya Hoti Hai?

**API** = Application Programming Interface

Mushkil naam — simple idea.

API ek **waiter** hai — browser aur database ke beech mein.

Browser API ko request bhejta hai:
```
"Mujhe saare todos chahiye"
"Yeh naya todo save kar do"
"Is todo ko delete kar do"
```

API request leti hai — database se kaam karwata hai — response wapas bhejti hai.

## HTTP Methods Kya Hote Hain?

Jab browser backend se baat karta hai — ek **request** bhejta hai। Har request mein batana padta hai — **kya karna chahte ho?**

Yeh "kya karna hai" ko **HTTP Method** kehte hain। CRUD ke saath match karo:

| CRUD Action | HTTP Method | Real Life Example |
|-------------|-------------|-------------------|
| **C**reate | `POST` | "Yeh nayi item add karo" |
| **R**ead | `GET` | "Mujhe saari items do" |
| **U**pdate | `PUT` | "Iss item ko update karo" |
| **D**elete | `DELETE` | "Yeh item hatao" |

Jaise restaurant mein:
- `GET` = "Menu dikhao" (sirf dekhna, kuch change nahi)
- `POST` = "Naya order banao"
- `PUT` = "Mera order change karo"
- `DELETE` = "Order cancel karo"

---

## API Route Kaise Kaam Karta Hai? (Concept)

`app/api/todos/route.ts` ek file hai jahan tum likhte ho:

> *"Jab koi `GET` request aaye `/api/todos` pe, toh database se saare todos fetch karo aur wapas bhejo"*

> *"Jab koi `POST` request aaye `/api/todos` pe, toh jo data aaya hai use database mein save karo"*

Abhi code nahi likhenge — sirf concept clear karo:

```
Browser                         Server (Next.js API Route)
  |                                      |
  |  GET /api/todos  ───────────────→   |
  |                                      | Database se fetch karo
  |  ←─────────── [todo1, todo2, ...]   |
  |                                      |
  |  POST /api/todos                     |
  |  (data: {title: "New todo"}) ──────→|
  |                                      | Database mein save karo
  |  ←─────────── {success: true}       |
```

---

## URL Structure Samjho

Jab tum browser mein `http://localhost:3000/about` type karte ho — Next.js `app/about/page.tsx` dikhata hai।

Same tarah:

| URL | File | Kya karta hai |
|-----|------|---------------|
| `/` | `app/page.tsx` | Home page |
| `/about` | `app/about/page.tsx` | About page |
| `/api/todos` | `app/api/todos/route.ts` | API endpoint (backend) |

`/api/...` wale URLs ko **API Endpoints** bolte hain — yeh pages nahi hote, yeh backend functions hote hain।

---

## `fetch()` Kya Hoti Hai? (Preview)

Frontend se backend ko request kaise bhejte hain? `fetch()` se।

Yeh browser mein built-in hai — koi library install nahi karni।

```javascript
// Yeh frontend (React component) mein likhte hain
const response = await fetch('/api/todos')  // GET request
const data = await response.json()          // JSON mein convert karo
console.log(data)                           // [{ title: "Milk lana", ... }]
```

Abhi yeh poori tarah nahi samjhenge — aage practically likhenge toh clear ho jaayega।

---

## Summary — Doc 02 Mein Kya Sikha

✅ **Frontend seedha database se connect nahi karta** — password expose ho jaata

✅ **Backend middleman hai** — browser se request leta hai, database se baat karta hai

✅ **Next.js mein `app/api/`** folder hi backend hai — alag server nahi chahiye

✅ **HTTP Methods** — GET (padhna), POST (banana), PUT (update), DELETE (hatana)

✅ **API Endpoint** — ek URL jahan backend function rehta hai

✅ **`fetch()`** — frontend se backend ko request bhejne ka tarika

---

## Agla Step — Doc 03

**Doc 03: Project Setup & Folder Structure**

Ab concept clear hai। Ab actually kaam karte hain:
- Next.js project banana
- MongoDB Atlas account banana (free)
- `.env` file kya hoti hai
- Har folder ka kaam kya hai

Hands-on shuru hoga Doc 03 se! 🛠️
