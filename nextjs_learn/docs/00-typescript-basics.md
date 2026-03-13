# 00 — TypeScript Basics 🧠

## Pehle Yeh Bata — JS Mein Kya Problem Thi?

Ek chhoti si kahani sun —

Tu ek burger shop chalata hai. Tera ek helper hai — **JavaScript**. Tu usse bolta hai:

> "Yaar, customer ka naam le aur bill mein likh do."

JS helper seedha kaam karta hai. Par ek din koi customer aaya aur usne **naam ki jagah apna phone number** de diya. JS helper ne bina kuch bole woh number bhi likh diya bill mein. 😅

Ab bill mein likha hai: `"Customer: 9876543210"` — koi matlab nahi!

JS ne kabhi nahi pucha — *"bhai, yeh toh number hai, naam hona chahiye tha na?"*

---

Yehi problem hai JavaScript mein —

```js
function greet(naam) {
  console.log("Hello " + naam)
}

greet("Ali")        // ✅ Hello Ali
greet(9876543210)   // 😬 Hello 9876543210  — JS ne kuch nahi bola!
greet(true)         // 😬 Hello true  — yeh bhi chala diya!
```

JS ko koi fark nahi padta tu kya de raha hai. Woh chup chaap chalata rehta hai.

**Yeh bugs production mein jaake phatते hain — jab actual users use kar rahe hote hain!**

---

## TypeScript — Strict Wala Helper 😤

Ab imagine kar tera ek naya helper hai — **TypeScript**. Tu usse bolta hai:

> "Yaar, customer ka **naam** lena — aur naam **sirf text** hoga, koi number nahi."

Ab agar koi number dega —

> TypeScript: "Bhai ruk. Yeh number hai, naam nahi. Pehle theek kar."

Aur yeh error **code likhte waqt hi** batata hai — VS Code mein red underline aa jaata hai. Production tak jaata hi nahi! 🔥

---

## TypeScript Basically Hai Kya?

> **TypeScript = JavaScript + Type Checking**

Bas itna hi hai. Koi naya language nahi seekhna. Jo JS jaanta hai, woh TS jaanta hai — bas thodi extra cheezein likhni padti hain.

Aur ek important baat —

**Browser TypeScript nahi samajhta.** Browser sirf JS samajhta hai.

Toh TS automatically JS mein **convert** ho jaata hai (isko "compile" kehte hain) — tu directly yeh kaam nahi karta, Next.js apne aap karta hai.

```
Tu TypeScript likhta hai
        ↓
Next.js automatically JS mein convert karta hai
        ↓
Browser khush ho jaata hai 😄
```

---

## Part 1 — Basic Types 🔤

Types batate hain ki koi variable **kis tarah ka data** rakh sakta hai.

### String — Text ke liye

```ts
let naam: string = "Ali"
let city: string = "Delhi"
```

Real life: Kisi ka naam, address, email — yeh sab string hain.

```ts
let naam: string = 42      // ❌ Error! Number hai, string chahiye tha
let naam: string = "Ali"   // ✅ 
```

### Number — Numbers ke liye

```ts
let age: number = 25
let price: number = 999.99
```

Real life: Umar, price, quantity — yeh sab number hain.

```ts
let age: number = "pachees"  // ❌ Error! String hai, number chahiye tha
let age: number = 25         // ✅
```

### Boolean — Haan ya Naa ke liye

```ts
let isLoggedIn: boolean = true
let isAdmin: boolean = false
```

Real life: Light on hai ya off? User logged in hai ya nahi? — sirf do options, yeh boolean hai.

```ts
let isLoggedIn: boolean = "haan"  // ❌ Error!
let isLoggedIn: boolean = true    // ✅
```

### Array — List ke liye

```ts
let fruits: string[] = ["Apple", "Mango", "Banana"]
let scores: number[] = [95, 87, 76, 100]
```

Real life: Dosto ki list, marks ki list — yeh arrays hain.

```ts
let fruits: string[] = ["Apple", 42, true]  // ❌ Error! Sirf strings chahiye
let fruits: string[] = ["Apple", "Mango"]   // ✅
```

---

## Part 2 — Type Alias 🏷️

Abhi tak tune ek variable ka type define kiya. Par real life mein ek **poori object** hoti hai — jaise ek User ka naam bhi hai, age bhi hai, email bhi hai.

Har baar yeh sab likhna mushkil hai. **Type Alias** se apna custom type bana sakte hain.

### Bina Type Alias ke (mushkil)

```ts
let user: { naam: string; age: number; email: string } = {
  naam: "Ali",
  age: 25,
  email: "ali@gmail.com"
}
```

Yeh lamba hai aur baar baar likhna padega. 😩

### Type Alias ke saath (clean ✅)

```ts
type User = {
  naam: string
  age: number
  email: string
}

let user: User = {
  naam: "Ali",
  age: 25,
  email: "ali@gmail.com"
}
```

Ab `User` ek naya type ban gaya. Jahan chahiye use karo!

```ts
let user1: User = { naam: "Ali", age: 25, email: "ali@gmail.com" }
let user2: User = { naam: "Sara", age: 22, email: "sara@gmail.com" }

// Galat diya toh error
let user3: User = { naam: "Ravi", age: "bees" }  // ❌ age number hona chahiye!
```

---

## Part 3 — Interface 🤝

`interface` aur `type` almost same kaam karte hain. Dono se object ka shape define hota hai.

```ts
// Type alias se
type Product = {
  naam: string
  price: number
}

// Interface se
interface Product {
  naam: string
  price: number
}
```

**Dono almost same hain.** Par React/Next.js mein **interface** zyada use hoti hai — especially **props ke liye**. Toh abhi se interface ko hi zyada yaad rakh.

> **Simple rule:** Props define karne ke liye `interface` use karo. Baaki cheezein ke liye `type` use kar sakte ho.

```ts
interface Product {
  naam: string
  price: number
  inStock: boolean
}

let laptop: Product = {
  naam: "Dell Laptop",
  price: 55000,
  inStock: true
}
```

---

## Part 4 — Optional Properties `?` 🤷

Kabhi kabhi koi property **zaroor nahi hoti** — ho bhi sakti hai, na bhi.

Jaise ek user ka **middle name** — kisi ka hota hai, kisi ka nahi.

```ts
interface User {
  firstName: string
  middleName?: string    // ← yeh ? matlab optional hai
  lastName: string
}

// Dono valid hain ✅
let user1: User = { firstName: "Ali", lastName: "Khan" }
let user2: User = { firstName: "Sara", middleName: "Bano", lastName: "Ahmed" }
```

---

## Part 5 — Functions Mein Types 🔧

Functions mein bhi types lagaate hain — parameters pe aur return value pe.

### Parameters pe type

```ts
function greet(naam: string) {
  console.log("Hello " + naam)
}

greet("Ali")   // ✅
greet(42)      // ❌ Error! naam string hona chahiye
```

### Return type bhi define kar sakte ho

```ts
function add(a: number, b: number): number {
  return a + b
}
```

Woh `: number` end mein — yeh bata raha hai ki yeh function **number return karega**.

```ts
function add(a: number, b: number): number {
  return "hello"  // ❌ Error! Number return karna tha, string diya
}
```

### Kuch return nahi karna — `void`

```ts
function logMessage(message: string): void {
  console.log(message)
  // kuch return nahi hota
}
```

---

## Part 6 — `.tsx` File Kya Hai?

Tu notice karega ki Next.js + TypeScript mein files ka extension `.js` ya `.jsx` nahi hota — hota hai **`.tsx`**

```
.js   → JavaScript
.jsx  → JavaScript + JSX (React wala HTML jaisa syntax)
.ts   → TypeScript
.tsx  → TypeScript + JSX  ← yeh use hoga humara
```

Bas itna hi fark hai — `.tsx` mein TypeScript bhi hai aur React ka JSX bhi.

---

## Part 7 — Ek Chhota Example — Sab Saath

```ts
// Ek Product ka type banaya
interface Product {
  id: number
  naam: string
  price: number
  available?: boolean   // optional
}

// Ek function jo product ka naam aur price print kare
function showProduct(product: Product): string {
  return `${product.naam} — ₹${product.price}`
}

// Use karna
const laptop: Product = {
  id: 1,
  naam: "Dell Laptop",
  price: 55000,
  available: true
}

console.log(showProduct(laptop))  // Dell Laptop — ₹55000
```

---

## Yaad Rakhne Wali Cheezein 📌

| Cheez | Syntax | Kab use karo |
|-------|--------|--------------|
| String | `naam: string` | Text ke liye |
| Number | `age: number` | Numbers ke liye |
| Boolean | `isOn: boolean` | True/false ke liye |
| Array | `items: string[]` | List ke liye |
| Type alias | `type User = {...}` | Custom type banana |
| Interface | `interface User {...}` | Props define karne ke liye |
| Optional | `naam?: string` | Zaroor na ho toh |
| Void | `: void` | Function kuch return na kare |

---

## Aaj Ka Summary ✅

✅ TypeScript = JS + strictness — browser ke liye JS mein convert ho jaata hai  
✅ Types batate hain ki variable mein kya data aayega  
✅ `interface` se object ka shape define karte hain — props ke liye use hoga  
✅ `?` optional property hai  
✅ Functions mein parameter aur return type dono define kar sakte hain  
✅ Next.js mein `.tsx` files use hongi  

---

## Agla Step

**01-setup.md** — Ab Next.js project banayenge — TypeScript ke saath! Setup mein TS select karna hoga aur `.tsx` files dikhenge. 🚀
