# 05 ✅ Generics - FOR ABSOLUTE BEGINNERS

---

## 🧠 SOCH:
✅ Hum is file mein Generics sikh rahe hai
✅ Ye TypeScript ka sabse important aur sabse difficult topic hai
✅ Transcript ke 20:06 se 25:24 tak ke poore hisse ko cover karega
✅ Sabse pehle problem dikhayenge phir solution
✅ Har cheez itna aasan banaunga ki tum hamesha ke liye samajh jaoge
✅ Iske baad hum React Props par jayenge

---

## 🚀 SABSE PEHLE PROBLEM DIKHTE HAI

Maan lo tumhe ek Post type banana hai:
```typescript
interface Post {
  id: number;
  title: string;
  description: string;
  extra: any;
}
```

✅ Ab tum isme extra mein kuch bhi daal sakte ho. Lekin problem kya hai?
❌ `any` use kar rahe ho
❌ TypeScript ka koi fayda nahi hai
❌ Intellisense nahi chalega
❌ Errors nahi dikhenge

Ab maan lo tumhe ek baar extra mein User dalna hai, ek baar Category dalna hai, ek baar Tags dalna hai.

Tum kya karoge? 3 alag alag interface banaoge?
```typescript
interface PostWithUser {
  id: number;
  title: string;
  description: string;
  extra: User;
}

interface PostWithCategory {
  id: number;
  title: string;
  description: string;
  extra: Category;
}

interface PostWithTags {
  id: number;
  title: string;
  description: string;
  extra: string[];
}
```

❌ **BADI PROBLEM KYA HAI?**
Tum har baar same interface baar baar bana rahe ho. Sirf `extra` ka type badal raha hai baaki sab same hai.

Yeh problem solve karne ke liye **Generics** hai.

---

## 🔹 Generics Kya Hai? - HAR HISSA SAMJHO

> Generics matlab tum type ko bhi variable bana lo. 
> 
> Jaise tum value ke liye variable banate ho:
> ```typescript
> let age = 25;
> age = 30;
> ```
> 
> Bilkul usi tarah type ke liye bhi variable bana lo. Wahi hai Generics.

---

✅ Syntax har cheez ko tod ke samjho:

```typescript
interface Post<T> {
  id: number;
  title: string;
  description: string;
  extra: T;
}
```

| Har part kya hai | Matlab |
|---|---|
| `< >` | Ye angle brackets ye batate hai ki ye Generic hai |
| `T` | Ye wo variable hai jisme tum type daloge. Isme koi naam de sakte ho lekin sab log `T` hi use karte hai |
| `extra: T` | Extra property ka type wahi hoga jo tum T mein daloge |

✅ Ab jaise tum variable mein value badal sakte ho usi tarah is T mein tum type badal sakte ho.

---

### 🎯 ACTUAL MEIN KYA HOTA HAI STEP BY STEP:

✅ Pehle hum User aur Category define kar lete hai:
```typescript
type User = {
  id: number;
  username: string;
}

type Category = {
  id: number;
  name: string;
}
```

✅ Ab jab tum yeh likhte ho:
```typescript
const postWithUser: Post<User> = { ... }
```

✅ Yeh TypeScript automatic yeh badal deta hai:
```typescript
// Ye tumne nahi likha, TypeScript automatically bana leta hai:
interface Post {
  id: number;
  title: string;
  description: string;
  extra: User; // ✅ T ki jagah User aa gaya!
}
```

✅ Ab jab tum yeh likhte ho:
```typescript
const postWithCategory: Post<Category> = { ... }
```

✅ TypeScript automatic yeh badal deta hai:
```typescript
interface Post {
  id: number;
  title: string;
  description: string;
  extra: Category; // ✅ Ab T ki jagah Category aa gaya!
}
```

✅ Ab jab tum yeh likhte ho:
```typescript
const postWithTags: Post<string[]> = { ... }
```

✅ TypeScript automatic yeh badal deta hai:
```typescript
interface Post {
  id: number;
  title: string;
  description: string;
  extra: string[]; // ✅ Ab T ki jagah string array aa gaya!
}
```

---

✅ Ab actual mein code likh ke test karo apne test.ts mein:

```typescript
// Sabse pehle type define karo
type User = {
  id: number;
  username: string;
}

// Generic interface
interface Post<T> {
  id: number;
  title: string;
  description: string;
  extra: T;
}

// Ab actual object banao
const postWithUser: Post<User> = {
  id: 1,
  title: "Hello World",
  description: "Test Post",
  extra: {
    id: 101,
    username: "Pravin"
  }
}

// Ab isko print karo
console.log(postWithUser);
console.log("Author: ", postWithUser.extra.username);
```

✅ Ab run karo:
```bash
npx tsx test/test.ts
```

✅ Output:
```
{
  id: 1,
  title: 'Hello World',
  description: 'Test Post',
  extra: { id: 101, username: 'Pravin' }
}
Author:  Pravin
```

✅ Ab tum samajh rahe ho?
- Tum sirf ek baar Post interface banate ho
- Jab tum use karte ho tab apne hisab ka type pass karo
- TypeScript automatically us jagah T ko tumhare type se replace kar deta hai
- Har baar alag alag interface banana nahi padta

Yeh hi Generics hai. Bas itna hi.

✅ Ab kya ho gaya?
- Ek baar interface bana lo
- Har time alag alag type pass karo
- Baar baar same code nahi likhna padta
- Sab kuch type safe hai
- `any` nahi use kar rahe ho

Yeh hi Generics ka actual power hai.

---

## 🔹 Itna Deep Mein Samjho:

| Kya hua hai? |
|---|
| ✅ Tumne type ko bhi variable bana diya hai |
| ✅ Jaise tum function mein parameter pass karte ho waise hi type pass kar rahe ho |
| ✅ Har baar alag alag type de sakte ho |
| ✅ Baaki sab cheezein same rehti hai |

Generics sirf itna hi hai. Itna hi simple hai. Sab internet wale log isko itna complicated kyun banate hai nahi pata.

---

## 🔹 Generic Constraints

Agar tum chahte ho ki tum sirf object hi pass karo, string ya number nahi?

```typescript
// T ko humne constraint diya hai ki ye sirf object hi hoga
interface Post<T extends object> {
  id: number;
  title: string;
  description: string;
  extra: T;
}
```

✅ Ab tum isme string ya number nahi pass kar sakte:
```typescript
const post: Post<string> = {} // ❌ ERROR! Sirf object allowed hai
```

Aur agar tum chahte ho ki har object mein `id` property jarur ho?

```typescript
interface Post<T extends { id: number }> {
  id: number;
  title: string;
  description: string;
  extra: T;
}
```

✅ Ab jo bhi type pass karoge usme `id: number` property jarur honi chahiye.

---

## ✅ Ab Tum Kya Samajh Gaye?

1.  ✅ Generics matlab type ko variable banana
2.  ✅ Ek baar interface banao har baar alag type pass karo
3.  ✅ Baar baar same code nahi likhna padta
4.  ✅ `any` ki jagah generics use karo
5.  ✅ Constraints lagake type ko aur strict kar sakte ho

---

## 🎯 Important Note:

> React ke saare hooks `useState`, `useReducer`, `useContext` sab inme hi generics use hote hai.
>
> Jab hum React wale parts padhenge tumhe har jagah yahi dekhne ko milega.

---

## 🚀 Next Step:

Ab humne Generics 100% samajh liye hai. Ab hum aage badhte hai React ke saath TypeScript use karna. Sabse pehle Props typing sikhange.

👉 Next File: `06 - React Props with TypeScript.md`