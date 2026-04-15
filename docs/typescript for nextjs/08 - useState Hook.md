# 08 ✅ useState Hook - FULL PRACTICAL

---

## 🧠 SOCH:
✅ Hum is file mein React ke useState hook ko TypeScript ke saath properly type karna sikh rahe hai
✅ Poora actual practical project banayenge
✅ Step by step error dikhayenge phir fix karenge
✅ Jaise tum apne test folder mein kar rahe ho bilkul waisa hi
✅ Sabse pehle galat code likhenge phir gradually sahi karenge
✅ Iske baad hum Context API par jayenge

---

## 🚀 TODAY WE ARE GOING TO BUILD:

Hum aaj poora practical profile page banayenge:
1.  Ek `lib/server_data.ts` file banayenge
2.  Isme 5 second delay hoga jaise real API
3.  `app/use_state_hook/page.tsx` banayenge
4.  Waha se data fetch karenge
5.  Sabse pehle galat tareeke se banayenge har error dekh kar phir sahi karenge

---

## 🎯 Pehle yeh samjho: HOOK kya hai?

> Hook matlab React ke andar ke built in functions hai.
> 
> Unko use karke tum React ke andar ke features use kar sakte ho.
> 
> Normal tum apne khud ke function banate ho, yeh React ke apne functions hai.

---

## 🎯 useState Hook kya hai?

> `useState` React ka sabse basic, sabse zyada use hone wala hook hai.
>
> Iska kaam sirf itna hai: Component mein variable bana lo, agar us variable ki value change karoge toh component automatically re-render hoga.
>
> Sirf itna hi. Aur kuch nahi. Bas automatic re-render.

---

## 🚀 LETS START: STEP BY STEP

---

### 🧠 **SOCH:**
✅ Hum is step mein server file banayenge
✅ Kyunki hum real project ke tarah data ko alag jagah se laenge
✅ Agar yeh nahi karoge toh tumhe har jagah same code copy paste karna padega
✅ Iske baad hum page banayenge

---

### Step 1: Pehle server file banalo

```tsx
// lib/server_data.ts
export async function getServerUser() {
  // REAL SERVER KI TARAH 5 SECOND DELAY
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  return {
    id: 1,
    username: "Pravin",
    email: "pravin@test.com"
  }
}
```

✅ Ab tum yeh file apne project mein bana lo. Ye hamara fake server hai.
✅ Hum isko kahi se bhi import karke use kar sakte hai
✅ Ab is file mein agar tum kuch change karoge toh poore project mein automatically change ho jayega

---

### 🧠 **SOCH:**
✅ Hum is step mein page banayenge
✅ Sabse pehle galat tareeke se banayenge jaise har naya developer karta hai
✅ Hum error dekh ke usko samajhenge phir fix karenge
✅ Is tareeke se tum hamesha yaad rakhoge ki kyun woh galti nahi karni hai

---

### Step 2: Ab page banalo - SABSE PEHLE GALAT TARAAKE SE

```tsx
// app/use_state_hook/page.tsx
"use client";

import { useEffect } from "react";
import { getServerUser } from "@/lib/server_data";

export default function ProfilePage() {

  useEffect(() => {
    async function loadUser() {

      // 🚨 HAR NAYA DEVELOPER YAHI GALTI KARTA HAI!
      // Yaha par tum useState andar call kar rahe ho!
      const [user, setUser] = useState(null);
      
      const data = await getServerUser();
      setUser(data);
    }
    loadUser();
  }, [])

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  )
}
```

✅ Ab tum is code ko likho. Tumhe yeh error milega:
```
❌ React Hook "useState" cannot be called in an async function
```

---

### ✅ ERROR 1 EXPLANATION:
React Hooks ka ek rule hai ki tum hooks ko **sirf component ke TOP level pe hi call kar sakte ho**

| ✅ Sahi jagah | ❌ Galat jagah |
|---|---|
| Component ke andar, sabse upar | Koi function ke andar |
| Baahar hi likho | Kisi if ke andar |
| Directly | Kisi loop ke andar |
| | Async function ke andar |
| | useEffect ke andar |

---

### 🧠 **SOCH:**
✅ Hum is step mein pehle error ko fix karenge
✅ Hum useState ko sahi jagah leke aayenge
✅ Lekin ab bhi dusra error aayega jo hum baad mein fix karenge
✅ Har baar ek hi error fix karenge

---

### Step 3: Ab is error ko fix karo

```tsx
// app/use_state_hook/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getServerUser } from "@/lib/server_data";

export default function ProfilePage() {

  // ✅ AB SAHI JAGAH LIKHA HAI! SABSE UPAR
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const data = await getServerUser();
      setUser(data); // ❌ AB YAHAN NAYA ERROR AAYEGA!
    }
    loadUser();
  }, [])

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  )
}
```

✅ Ab tum yeh code save karo. Ab naya error milega:
```
❌ Argument of type '{ id: number; username: string; email: string; }' is not assignable to parameter of type 'SetStateAction<null>'.
```

---

### ✅ ERROR 2 EXPLANATION:
Jab tum `useState(null)` likhte ho, TypeScript ko lagta hai ki is state mein sirf `null` hi aa sakta hai. Kuch nahi.

Tum usme kabhi bhi user ka data nahi dal sakte. Wo tumhe error dega.

Ye 99% developers ki sabse common galti hai. Har koi ye galti karta hai.

---

## 🎯 Core Concept: Server Data Handle Karna

> Ye TypeScript mein sabse important cheez hai:
> 
> Jab tum server se data lete ho toh 3 stage hote hai:
> 1.  Loading: Abhi data nahi aaya
> 2.  Success: Data aa gaya
> 3.  Error: Koi problem hui
> 
> Isliye state mein `null` rehta hai. Kyuki tum nahi pata ki data aayega bhi ya nahi.

---

## 🎯 Case 2: Multiple types in state

Agar tumhe ek state mein string ya number dono rakhna hai toh union type use karo:

```tsx
const [value, setValue] = useState<string | number>(0);

setValue(10); // ✅ Theek hai
setValue("Hello"); // ✅ Theek hai
setValue(true); // ❌ Error
```

Ye tumhe har jagah chahiye hoga.

---

---

### 🧠 **SOCH:**
✅ Hum is step mein final version banayenge
✅ Kyunki ab hum dono error fix kar chuke hai
✅ Agar yeh nahi karoge toh tumhe error hi milte rahenge
✅ Iske baad hum page run karenge browser mein

---

### Step 4: Ab har line ko add karo ek ek karke

---

#### Line 1: Hum User ka type define karenge pehle
```tsx
type User = {
  id: number;
  username: string;
  email: string;
}
```
✅ Yeh wahi type hai jo humare server se aane wala hai
✅ Isme woh sab properties hai jo hum expect kar rahe hai
✅ Agar tum isme koi extra property add karoge toh TypeScript automatically tumhe sab jagah error dikhayega

---

#### Line 2: Ab useState mein yeh type pass karo
```tsx
const [user, setUser] = useState<User | null>(null);
```
✅ Humne TypeScript ko bol diya hai:
  - Is state mein `null` aa sakta hai
  - Ya phir `User` type ka object aa sakta hai
  - Aur kuch nahi aayega
✅ Ab tum `setUser(data)` karoge toh koi error nahi aayega

---

#### Line 3: Loading state bhi add karo
```tsx
const [loading, setLoading] = useState(true);
```
✅ Jab tak data nahi aata tab tak user ko loading dikhane ke liye
✅ By default true rahega kyunki jab page load hoga tab pehle loading hi rahegi

---

#### Line 4: useEffect ke andar ab data le lo
```tsx
useEffect(() => {
  async function loadUser() {
    setLoading(true);
    const data = await getServerUser();
    setUser(data);
    setLoading(false);
  }
  loadUser();
}, [])
```
✅ `setLoading(true)`: Jab data lena start karo loading true kar do
✅ `await getServerUser()`: 5 second wait hoga jaise real server
✅ `setUser(data)`: Ab data aa gaya hai state mein dal do
✅ `setLoading(false)`: Ab loading band kar do

---

#### Line 5: Loading state show karo
```tsx
if(loading) return <div>Loading...</div>;
```
✅ Jab tak loading true hai sirf yahi dikhega
✅ Page poora load hone tak user yahi dekhega

---

#### Line 6: Final render
```tsx
{user && (
  <div>
    <h3>Welcome {user.username}</h3>
    <p>Email: {user.email}</p>
  </div>
)}
```
✅ Ye condition check kar raha hai ki `user` null nahi hai
✅ Jab tak null hai andar ka code nahi chalega
✅ App kabhi crash nahi hoga

---

### Ab poora final code yeh hai:
```tsx
// app/use_state_hook/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getServerUser } from "@/lib/server_data";

type User = {
  id: number;
  username: string;
  email: string;
}

export default function ProfilePage() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      const data = await getServerUser();
      setUser(data);
      setLoading(false);
    }
    loadUser();
  }, [])

  if(loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile Page</h1>
      {user && (
        <div>
          <h3>Welcome {user.username}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  )
}
```

✅ AB Koi bhi error nahi hai! Poora perfect chalega.

✅ Ab tum page ko browser mein open karo:
1.  Pehle 5 second tumhe `Loading...` dikhega
2.  Phir automatically user ka data aa jayega
3.  Koi error nahi hogi
4.  Koi warning nahi hogi

Yeh poora professional level ka code hai. Har real world project mein aise hi karte hai.

---

## ✅ Ab Tum Kya Samajh Gaye?

1.  ✅ useState ko hamesha top pe hi likhna hai
2.  ✅ Jab null hai toh tumhe explicit type batana padta hai `<Type | null>`
3.  ✅ Ab tumhe kabhi bhi `any` use karne ki jarurat nahi hai
4.  ✅ Sabse pehle galat code likh kar error dekh ke usko fix karo
5.  ✅ Is tareeke se tum hamesha ke liye yaad rakhoge

---

## 🔹 Golden Rules For useState:

1.  ✅ Jab initial value dete ho toh kabhi bhi explicit type mat likho. Auto detect ho jayega.
2.  ✅ Jab initial value null hai toh hamesha explicit type likho `<Type | null>`
3.  ✅ Hamesha useState ko component ke top pe hi likho
4.  ✅ Kabhi bhi andar kisi function mein mat likho
5.  ✅ Kabhi bhi `<any>` mat use karo useState mein

---

## 🚀 Next Step:

Ab humne useState 100% samajh liye hai. Ab hum Context API ko TypeScript ke saath use karna sikhange.

👉 Next File: `09 - Context API.md`