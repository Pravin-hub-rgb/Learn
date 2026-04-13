# 01 ✅ TypeScript Basic Types

---

## 🧠 SOCH:
✅ Hum is file mein TypeScript ke basic types sikh rahe hai
✅ Ye TypeScript ka foundation hai, yeh nahi samjhe toh aage kuch nahi samajh ayega
✅ Sabse pehle hum problem dekhenge phir uska solution TypeScript mein dekhenge
✅ Iske baad hum functions par jayenge

---

## 🚀 Kya Problem Hai JavaScript Mein?

JavaScript mein tum variable mein kuch bhi dal sakte ho:
```javascript
let username = "Pravin";
username = 25;
username = true;
```

✅ Problem kya hai?
- Runtime pe error aayega
- VS Code ka intellisense nahi chalega
- Bug dhundna impossible ho jayega
- Project bade hote hai toh sab kuch toot jayega

Yahi problem TypeScript solve karta hai.

---

## 🔹 Primitive Types

TypeScript mein har variable ka fixed type hota hai.

### String Type
```typescript
let username: string = "Pravin";
```

✅ Ab tum isme number ya boolean nahi dal sakte:
```typescript
username = 25; // ❌ Error: number is not assignable to type string
```

### Number Type
```typescript
let age: number = 25;
```

### Boolean Type
```typescript
let isAdmin: boolean = true;
```

✅ TypeScript auto detect bhi karta hai agar tum initial value dete ho:
```typescript
let email = "test@gmail.com"; // Ye automatically string type ho jayega
```

---

## 🔹 Union Types

Kya agar tumhe ek variable mein do type allow karne hai?

```typescript
let userId: string | number;

userId = 101; // ✅
userId = "user_101"; // ✅
userId = true; // ❌ Error
```

✅ Isme tum sirf string ya number hi dal sakte ho, kuch nahi.

---

## 🔹 Array Types

Array ko bhi type safe kar sakte ho:

### String Array
```typescript
let names: string[] = ["Ram", "Shyam", "Hari"];

names.push(25); // ❌ Error
names.push("Gopal"); // ✅
```

### Number Array
```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
```

### Union Array
```typescript
let mixed: (string | number)[] = ["Hello", 10, "World", 20];
```

✅ Is array mein sirf string ya number hi aa sakte hai.

---

## 🔹 Object Types

Sabse important hai object ko type karna:

### Auto Detected Object
```typescript
const user = {
  username: "Pravin",
  age: 25,
  isAdmin: false
};
```

✅ TypeScript automatically iska type detect kar lega:
```
user: {
  username: string;
  age: number;
  isAdmin: boolean;
}
```

Ab tum extra property add nahi kar sakte:
```typescript
user.phone = "9876543210"; // ❌ Error: Property 'phone' does not exist
```

---

### Explicit Object Type
```typescript
const user: {
  username: string;
  age: number;
  isAdmin: boolean;
  phone?: string;
} = {
  username: "Pravin",
  age: 25,
  isAdmin: false
};
```

✅ `?` lagane se woh property optional ho jata hai:
```typescript
user.phone = "9876543210"; // ✅ Ab allowed hai
```

---

## 🔹 `any` Type

⚠️ Ye TypeScript ki sabse badi galti hai:
```typescript
let anything: any;

anything = "string";
anything = 25;
anything = true;
anything = {};
anything = [];
```

✅ Kabhi bhi `any` use mat karo. Ye TypeScript ka fayda hi khatam kar deta hai. Sirf tab hi use karo jab tum 100% sure nahi ho type ke baare mein.

---

## 🚀 Next Step:

Ab humne basic types samajh liye hai. Ab hum functions ko type karna sikhange.

👉 Next File: `02 - TypeScript Functions.md`