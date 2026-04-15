# 01 ✅ TypeScript Basic Types - FOR ABSOLUTE BEGINNERS

---

## 🧠 SOCH:
✅ Hum is file mein TypeScript ke basic types sikh rahe hai, BILKUL ZERO SE
✅ Har cheez ko run karenge, actual error dekenge, actual output dekhenge
✅ Koi bhi cheez assume nahi karenge, har chhota cheez explain karenge
✅ Aap apne aap har code test kar sakoge
✅ Iske baad hum functions par jayenge

---

## 🚀 PEHLE SETUP KARO - ABHI KARO

✅ Yeh sab karo abhi, taaki tum har code apne aap run kar sako:

### Step 1: File create karo
`docs/typescript for nextjs/test/test.ts` naam se ek file banalo

### Step 2: Run kaise karna hai?
Terminal mein yeh command chalao:
```bash
npx tsx test/test.ts
```

---

### ✅ Is Command Ka Poora Breakdown Kya Hai?

Har part ko samjho:
| Part | Matlab |
|---|---|
| `npx` | Node Package Runner = Tum install kiye bina directly npm package chala sakte ho |
| `tsx` | Ye ek tool hai jo TypeScript file ko directly run karta hai, bina compile kiye |
| `test/test.ts` | Woh file ka path jo tum run kar rahe ho |

✅ Kyun tsx use kar rahe hai?
- Normal TypeScript ko pehle JavaScript mein compile karna padta hai phir run karna padta hai
- tsx seedha TypeScript file ko direct run karta hai, 1 step mein
- Tumhe kuch install nahi karna padta, npx automatically le lega

✅ Bas itna hi! Ab tum jo bhi code test.ts mein likhoge woh yeh command se run ho jayega.

---

### ⚠️ BOHOT IMPORTANT NOTE - SABSE BADA MISCONCEPTION

✅ **VS Code mein red line dikh raha hai lekin code run ho raha hai?**
Yeh har naye bande ke sath hota hai!

| Command | Kya karta hai |
|---|---|
| `npx tsx test.ts` | Sirf code run karta hai, TypeScript errors ko **IGNORE** karke |
| `npx tsc --noEmit test.ts` | Sirf TypeScript errors check karta hai, code run nahi karta |

✅ **Yeh baat hamesha yaad rakh**:
1. TypeScript error sirf **development time** pe hota hai jab tum code likh rahe ho
2. Jab code run hota hai, woh JavaScript mein convert ho jata hai, saare types hat jate hai
3. tsx jaldi run karne ke liye errors ignore karta hai
4. Actual project mein hum `tsc` command se pehle poore project ke errors check karte hai

✅ **Actual TypeScript error dekhne ke liye ye command chalao**:
```bash
npx tsc --noEmit test.ts
```

Ab tumhe sach mein error dikhega:
```
❌ error TS2322: Type 'number' is not assignable to type 'string'.
```

Ye hai asli TypeScript check!

---

## 🎯 Sabse pehle yeh samjho

> **TypeScript kya karta hai?**
> 
> Tum variable ko ek "RULE" dete ho ki isme sirf yahi type ka data ayega.
> Agar tum us rule todoge toh TypeScript tumhe pehle hi ERROR dega, code run karne se pehle hi.
> 
> JavaScript mein tum code run kar ke baad error dekhate ho.
> TypeScript mein code likhte hi error dekhata hai.

---

---

## 🔹 1. Sabse Pehle Normal JavaScript - Problem Dhekho

Apne test.ts mein yeh likho:
```typescript
let username = "Pravin";
console.log(username);
```

Run karo:
```bash
npx tsx test/test.ts
```
✅ Output: `Pravin`

Ab yeh karo:
```typescript
let username = "Pravin";
username = 25;
console.log(username);
```

Run karo:
✅ Output: `25`

❌ **PROBLEM KYA HAI?**
Koi nahi rok raha hai tumhe! Tum string wale variable mein number daal rahe ho.
Chhote project mein theek hai lekin jab project 10000 line ka hoga toh iske wajah se 100 din bug dhundoge.

---

## 🔹 2. TypeScript - Rule Lagao

Ab wahi code TypeScript mein:
```typescript
let username: string = "Pravin";
username = 25;
```

✅ Ab tum code run karne se pehle hi VS Code mein red line dikhega!

Error dikhega:
```
❌ Type 'number' is not assignable to type 'string'.
```

✅ Ab tumhe pata chal gaya ki tum galat kar rahe ho, code run karne se pehle hi!

---

## 🔹 3. Sab Basic Types Ek Ek Karke

| Type | Matlab | Example |
|---|---|---|
| `string` | Sirf text | `"hello"`, `'test'` |
| `number` | Sirf number | `25`, `10.5`, `-100` |
| `boolean` | Sirf haan ya na | `true`, `false` |

### ✅ String Type
```typescript
// is variable mein sirf TEXT hi aa sakta hai, kuch nahi
let name: string = "Ram";

name = "Shyam"; // ✅ Theek hai
name = 25;      // ❌ ERROR
name = true;    // ❌ ERROR
```

### ✅ Number Type
```typescript
// is variable mein sirf NUMBER hi aa sakta hai
let age: number = 25;

age = 30;      // ✅ Theek hai
age = "30";    // ❌ ERROR
age = false;   // ❌ ERROR
```

### ✅ Boolean Type
```typescript
// is variable mein sirf true ya false hi aa sakta hai
let isAdmin: boolean = true;

isAdmin = false; // ✅ Theek hai
isAdmin = "yes"; // ❌ ERROR
isAdmin = 1;     // ❌ ERROR
```

---

### ✅ Auto Type Detection Rule - Sabse Important Rule

| Case | Kya Hoga |
|---|---|
| `let naam = "Pravin"` | ✅ Theek hai, TypeScript automatically `string` type laga dega |
| `let naam: string` | ✅ Theek hai, humne type bata diya hai |
| `let naam` | ❌ Galat hai! Ye automatically `any` type ho jayega |

✅ **Rule 1**: Agar tum variable declare karte waqt hi value dete ho, toh type nahi bhi likho toh chalega. TypeScript apne aap detect kar lega.

✅ **Rule 2**: Agar tum variable declare karte waqt value nahi dete ho, toh tumhe compulsary type batana padega. Nahi toh wo `any` ho jayega.

✅ Example:
```typescript
// ✅ Sahi hai, initial value di hai, type auto detect
let age = 25;

// ❌ Galat hai, initial value nahi di hai, type bhi nahi bataya
let phone; // Ye any type ho jayega

// ✅ Sahi hai, initial value nahi di hai lekin type bata diya hai
let phone: string;
phone = "9876543210";
```

Yeh TypeScript ka sabse basic rule hai, har beginner isme galti karta hai.

---

## 🔹 4. Union Type - Kya Hai?

> **Union Type = 1 variable mein 2 type allow karna**

Matlab: "Is variable mein ya toh string aa sakta hai ya number, par baaki kuch nahi"

```typescript
// | ye pipe symbol hai. Usko bolte hai OR
let userId: string | number;

userId = 101;         // ✅ Theek hai
userId = "user_101";  // ✅ Theek hai
userId = true;        // ❌ ERROR
userId = {};          // ❌ ERROR
```

✅ Ab tum samajh gaye kya Union Type hai?
Bas do type ke beech mein `|` lagao, bas!

---

## 🔹 5. Array Types

Array = same type ke multiple values ek saath

### ✅ Sirf String wali Array
```typescript
// [] ye lagane se Array ban jata hai
let names: string[] = ["Ram", "Shyam", "Hari"];

names.push("Gopal"); // ✅ Theek hai
names.push(25);      // ❌ ERROR: Number nahi daal sakte string array mein
```

### ✅ Sirf Number wali Array
```typescript
let numbers: number[] = [1, 2, 3, 4, 5];

numbers.push(10);   // ✅ Theek hai
numbers.push("10"); // ❌ ERROR
```

### ✅ Union Array
Union + Array = Array mein do type allow karna

```typescript
// Bracket mein (string | number) likho
let mixed: (string | number)[] = ["Hello", 10, "World", 20];

mixed.push(50);      // ✅
mixed.push("Test");  // ✅
mixed.push(true);    // ❌ ERROR: Boolean nahi allowed
```

✅ Ab tum samajh gaye difference:
- `string[]` = sirf string
- `number[]` = sirf number
- `(string | number)[]` = string ya number dono

---

## 🔹 6. Object Type

Object = ek variable mein multiple alag alag values rakhna

```typescript
const user = {
  username: "Pravin",
  age: 25,
  isAdmin: false
};
```

✅ TypeScript automatically iske saare types detect kar lega:
- `user.username` sirf string hai
- `user.age` sirf number hai
- `user.isAdmin` sirf boolean hai

Ab agar tum yeh karoge:
```typescript
user.phone = "9876543210";
```
❌ ERROR! Kyuki tumne pehle phone property nahi banayi thi.

### Optional Property
Agar tumhe koi property optional rakhni hai toh `?` lagao:
```typescript
const user: {
  username: string;
  age: number;
  isAdmin: boolean;
  phone?: string; // ? = optional, hai bhi toh theek nahi bhi toh theek
} = {
  username: "Pravin",
  age: 25,
  isAdmin: false
};

user.phone = "9876543210"; // ✅ Ab allowed hai
```

---

## 🔹 7. `any` Type - MAT KARO YEH

⚠️ Ye TypeScript ki sabse badi galti hai:
```typescript
let kuch_bhi: any;

kuch_bhi = "string";
kuch_bhi = 25;
kuch_bhi = true;
kuch_bhi = {};
kuch_bhi = [];
```

✅ `any` lagate hi TypeScript chup ho jata hai, koi error nahi deta.
Matlab tum phir wapas JavaScript mein aa gaye!

👉 Kabhi bhi `any` use mat karo. Sirf tab hi use karo jab tum sach mein nahi pata type kya hoga.

---

## ✅ Ab Tum Kya Samajh Gaye?

1. Har variable ko type dete hai
2. Agar tum us type ke alawa kuch daaloge toh error milega
3. Union se do type allow kar sakte hai
4. Array ko bhi type kar sakte hai
5. Object ko bhi type kar sakte hai
6. `any` mat use karo

---

## 🚀 Next Step:

Ab humne basic types 100% samajh liye hai. Ab hum functions ko type karna sikhange.

👉 Next File: `02 - TypeScript Functions.md`