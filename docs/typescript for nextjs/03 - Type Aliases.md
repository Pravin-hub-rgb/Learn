# 03 ✅ Type Aliases - FOR ABSOLUTE BEGINNERS

---

## 🧠 SOCH:
✅ Hum is file mein Type Aliases sikh rahe hai
✅ Ye ab tak ka sabse important topic hai
✅ Sabse pehle problem dikhayenge phir solution
✅ Transcript ke 13:44 se 17:34 tak ke poore hisse ko cover karega
✅ Har cheez itna deep mein ki ab tum hamesha ke liye samajh jaoge
✅ Iske baad hum Interfaces par jayenge

---

## 🚀 SABSE PEHLE PROBLEM DIKHTE HAI

Apne test.ts mein yeh likho:

```typescript
function printUser(user: {
  username: string;
  age: number;
  phone?: string;
}) {
  console.log(user.username);
  console.log(user.age);
}
```

✅ Ye theek hai, lekin ab tum agar dusre function mein bhi same user chahiye?

```typescript
function createUser(user: {
  username: string;
  age: number;
  phone?: string;
}) {
  // save user to database
}
```

❌ **BADI PROBLEM KYA HAI?**
- Tum same code baar baar likh rahe ho
- Ek baar agar tum user mein naya property add karoge toh har jagah change karna padega
- 10 function hai toh 10 jagah change karna padega
- Bahut jaldi code ganda ho jayega

Yeh problem solve karne ke liye TypeScript mein **Type Aliases** hai.

---

## 🔹 Type Alias Kya Hai?

> Type Alias matlab tum apna khud ka custom type bana lo, ek baar banao aur har jagah use karo.

```typescript
// Ek baar yaha type define kar lo
type User = {
  username: string;
  age: number;
  phone?: string;
}
```

✅ Ab tum ye `User` type har jagah use kar sakte ho:

```typescript
function printUser(user: User) {
  console.log(user.username);
}

function createUser(user: User) {
  // save to database
}

function updateUser(user: User) {
  // update user
}
```

✅ Ab agar tumhe user mein naya property add karna hai toh sirf ek jagah change karo, saare function automatically update ho jayenge.

---

## 🔹 Itna Deep Mein Samjho:

| Toh ab kya ho gaya? |
|---|
| ✅ Tumne apne khud ka naya data type banaya hai |
| ✅ Ab `User` bhi ek type hai jaise `string`, `number` hai |
| ✅ Tum har jagah ye use kar sakte ho |
| ✅ Ek baar change karo poore code mein reflect ho jayega |

Yeh hi actual power hai TypeScript ki. Jab project 10000 line ka hoga tab tum iske fayde samjhoge.

---

## 🔹 Function Signature Ka Type Alias - ACTUAL MEIN KYA HAI

### 🎯 Pehle Problem Samjho:

Tumhare pas 3 function hai sab ka same signature hai:
```typescript
let add = (a: number, b: number): number => {
  return a + b;
}

let multiply = (a: number, b: number): number => {
  return a * b;
}

let divide = (a: number, b: number): number => {
  return a / b;
}
```

❌ **PROBLEM KYA HAI?**
Tum har baar same type baar baar likh rahe ho. `(a: number, b: number): number` ye line 3 baar likhi hai.

Agar kal tumhe isme 3rd parameter add karna pada toh 3 jagah change karna padega.

---

### ✅ Solution: Function Type Alias

Ek baar type banao, 100 baar use karo:

```typescript
// Ek baar yaha type define kar lo
// Ye ek "blueprint" hai function ka
type MathFunction = (firstNumber: number, secondNumber: number) => number;

// 🔴 Har hissa samjho:
// (firstNumber: number) 👉 First parameter number hoga
// (..., secondNumber: number) 👉 Second parameter bhi number hoga
// => number 👉 Ye function FINAL MEIN number hi return karega
```

✅ Ab har function mein bas ye type lagao:

❌ **Pehle ye likhna padta tha:**
```typescript
let add = (a: number, b: number): number => {
  return a + b;
}
```

✅ **Ab bas itna likho:**
```typescript
let add: MathFunction = (a, b) => {
  return a + b;
}
```

✅ Saare 3 function ab aise banenge:
```typescript
let add: MathFunction = (a, b) => {
  return a + b;
}

let multiply: MathFunction = (a, b) => {
  return a * b;
}

let divide: MathFunction = (a, b) => {
  return a / b;
}
```

✅ **Ab dekh lo kya kya remove ho gaya:**
- Har function se parameter types hat gaye
- Har function se return type hat gaya
- Sirf ek baar `MathFunction` likh lo bas

Ab tum 50 function bhi banao sab mein sirf itna hi likhna padega.

---

### 🤯 Ab Kya Hua Hai?

| Ab kya fayda hua? |
|---|
| ✅ Ab tumhe kabhi bhi parameters ka type nahi likhna padega |
| ✅ Ab tumhe return type nahi likhna padega |
| ✅ TypeScript automatically sab kuch samajh jayega |
| ✅ Agar kal tumhe type change karna hai toh sirf 1 jagah change karo |
| ✅ Sab function automatically update ho jayenge |

> Yeh sirf bade projects mein kaam aata hai. Jab tumhare paas 50 same type ke function honge tab tumhe iski value samajh ayegi.

---

## 🔹 Literal Types - Sabse JADUI Cheez

Agar tumhe kisi variable mein sirf 2 ya 3 hi fixed values chahiye?

Jaise: App mein sirf `dark` ya `light` theme hi allowed hai, kuch nahi.

```typescript
type Theme = "dark" | "light";
```

✅ Ab tum isme sirf ye dono hi dal sakte ho:

```typescript
let currentTheme: Theme;

currentTheme = "dark"; // ✅ Theek hai
currentTheme = "light"; // ✅ Theek hai
currentTheme = "blue"; // ❌ ERROR! Bilkul nahi allowed
```

✅ Tum kitne bhi fixed value rakh sakte ho:
```typescript
type Role = "admin" | "user" | "moderator";
type Status = "pending" | "approved" | "rejected";
```

Yeh cheez tum JavaScript mein kabhi nahi kar sakte. Ye TypeScript ka super power hai.

---

## 🔹 Kuch Golden Rules:

1.  ✅ Har object ka alag type alias banao
2.  ✅ Kabhi bhi inline object type mat likho function parameter mein
3.  ✅ Ek baar type banaye 100 baar use kare
4.  ✅ Fixed options ke liye hamesha literal types use karo
5.  ✅ Type ka naam hamesha capital letter se start karo

---

## ✅ Ab Tum Kya Samajh Gaye?

1.  ✅ Type Alias se apne custom type banate hai
2.  ✅ Ek baar banao har jagah use karo
3.  ✅ Code dry rehta hai, baar baar nahi likhna padta
4.  ✅ Ek jagah change karo poore project mein update ho jata hai
5.  ✅ Literal types se fixed values set kar sakte hai

---

## 🎯 Important Note:

> Ab tum agar kahi bhi inline object type dekh rahe ho toh samajh lo woh galat hai. Waha hamesha type alias use karna chahiye.

---

## 🚀 Next Step:

Ab humne Type Aliases 100% samajh liye hai. Ab hum Interfaces sikhange jo type alias se thode alag hai lekin same kaam karte hai.

👉 Next File: `04 - Interfaces.md`