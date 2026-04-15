# 02 ✅ TypeScript Functions - FOR ABSOLUTE BEGINNERS

---

## 🧠 SOCH:
✅ Hum is file mein Functions ko TypeScript mein properly type karna sikh rahe hai
✅ Ye next most important topic hai basic types ke baad
✅ Har cheez step by step, problem dikha ke phir solution
✅ Aap apne aap har code test kar sakoge test.ts file mein
✅ Iske baad hum Type Aliases par jayenge

---

## 🚀 Pehle Kya Problem Hai JavaScript Mein?

Apne test.ts mein yeh likho:
```typescript
function multiplyByTwo(num) {
  return num * 2;
}

console.log(multiplyByTwo(5));
```

Run karo:
```bash
npx tsx test/test.ts
```
✅ Output: `10`

Ab yeh karo:
```typescript
console.log(multiplyByTwo("5"));
```

Run karo:
✅ Output: `10`

❌ **PROBLEM KYA HAI?**
Hum function mein string pass kar rahe hai aur woh bhi chala! Koi error nahi aaya.

Ab project bade hote hai toh aise hi chote chote mistakes se 100 din bug dhundoge. TypeScript is problem ko solve karta hai.

---

## 🔹 TypeScript Function - Rule Lagao

Ab wahi function TypeScript mein:
```typescript
function multiplyByTwo(num: number) {
  return num * 2;
}

multiplyByTwo(5); // ✅ Theek hai
multiplyByTwo("5"); // ❌ ERROR
```

✅ Ab tum VS Code mein hi red line dekhoge. Code run karne se pehle hi pata chal gaya ki tum galat kar rahe ho.

---

## 🔹 Function ke Liye 2 Cheezein Type Karni Hai:

1.  ✅ Function ke andar jo parameters aa rahe hai unka type
2.  ✅ Function jo return karta hai uska type

---

### ✅ 1. Parameter Types

Har parameter ke baad `:` lagake uska type likho:

```typescript
// is function mein sirf number hi aa sakta hai num mein
function add(num1: number, num2: number) {
  return num1 + num2;
}

add(10, 20); // ✅ 30
add(10, "20"); // ❌ ERROR
add(10); // ❌ ERROR: 2 parameter chahiye
add(10, 20, 30); // ❌ ERROR: Sirf 2 parameter hi allowed
```

✅ Ab tum exact number parameters aur exact type ke parameters hi pass kar sakte ho. Kuch extra nahi kuch kam nahi.

---

### ✅ 2. Return Type

Function jo value return karta hai uska bhi type define kar sakte ho:

```typescript
// yeh function sirf number hi return karega
function add(num1: number, num2: number): number {
  return num1 + num2;
}
```

#### ❌ Agar tum galat cheez return karoge toh error aayega:
```typescript
function add(num1: number, num2: number): number {
  return "Hello"; // ❌ ERROR: String return nahi kar sakte
}
```

✅ TypeScript automatic return type bhi detect karta hai agar tum nahi likho toh lekin achha practice hai ki tum explicitly likho.

---

### ✅ Void Return Type

Agar function kuch bhi return nahi karta hai toh uska type `void` hota hai:

```typescript
function printMessage(message: string): void {
  console.log(message);
  // isme koi return nahi hai
}

printMessage("Hello World");
```

✅ Void matlab "kuch nahi return karega".

---

## 🔹 Optional Parameters

Kya agar tumhe koi parameter optional rakhna hai?

`?` lagao parameter ke naam ke baad:

```typescript
function greet(name: string, greeting?: string) {
  if (greeting) {
    console.log(`${greeting} ${name}`);
  } else {
    console.log(`Hello ${name}`);
  }
}

greet("Pravin"); // ✅ Theek hai, sirf 1 parameter diya
greet("Pravin", "Good Morning"); // ✅ Theek hai, dono parameter diya
```

✅ `?` lagane se woh parameter optional ho jata hai. Tum de sakte ho nahi bhi de sakte ho.

---

## 🔹 Default Parameters

Agar koi parameter nahi aata toh default value set kar sakte ho:

```typescript
function greet(name: string, greeting: string = "Hello") {
  console.log(`${greeting} ${name}`);
}

greet("Pravin"); // ✅ Output: Hello Pravin
greet("Pravin", "Good Morning"); // ✅ Output: Good Morning Pravin
```

✅ Default value dene se wo parameter automatically optional ho jata hai. Tumhe `?` nahi lagana padta.

---

## 🔹 Function As A Variable

Tum function ko variable mein bhi store kar sakte ho, uska bhi type kar sakte ho:

```typescript
// is variable mein sirf woh function aa sakta hai jo 2 number lekar number return kare
let calculate: (a: number, b: number) => number;

calculate = add; // ✅ Theek hai
calculate = multiplyByTwo; // ❌ ERROR: Sirf 1 parameter leta hai
```

---

## ✅ Ab Tum Kya Samajh Gaye?

1.  ✅ Function ke har parameter ka type define karo
2.  ✅ Function ke return type bhi define karo
3.  ✅ Agar kuch return nahi kar raha toh `void` use karo
4.  ✅ Optional parameter ke liye `?` use karo
5.  ✅ Default value de sakte ho optional parameters ke liye

---

## 🎯 Important Note:

> TypeScript sirf development time pe check karta hai. Jab code run hoga JavaScript banega aur saare types hat jayenge.
> 
> Tumhe error dekhne ke liye yeh command chalao:
> ```bash
> npx tsc --noEmit test.ts
> ```

---

## 🚀 Next Step:

Ab humne functions 100% samajh liye hai. Ab hum Type Aliases sikhange jisse tum apne khud ke custom types bana sakte ho.

👉 Next File: `03 - Type Aliases.md`