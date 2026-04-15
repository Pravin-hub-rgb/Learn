# 04 ✅ Interfaces - FOR ABSOLUTE BEGINNERS

---

## 🧠 SOCH:
✅ Hum is file mein Interfaces sikh rahe hai
✅ Ye Type Aliases ke baad next topic hai
✅ Transcript ke 17:34 se 20:06 tak ke poore hisse ko cover karega
✅ Hum pehle difference samajhenge Type Alias vs Interface
✅ Har cheez itna deep mein ki ab tum hamesha ke liye samajh jaoge
✅ Iske baad hum Generics par jayenge

---

## 🚀 Pehle Tum Kya Jante Ho?

Tum abhi Type Aliases jante ho:
```typescript
type User = {
  username: string;
  age: number;
}
```

✅ Ab tumhe aisa lag raha hoga "Interface bhi yahi karta hai phir naya kya hai?"

Bilkul sahi baat hai! 90% case mein dono same kaam karte hai. Lekin 10% case mein Interface extra power deta hai.

---

## 🔹 Interface Kya Hai?

```typescript
interface User {
  username: string;
  age: number;
}
```

✅ Dekho bas `type` ki jagah `interface` likha hai, aur `=` hat gaya hai. Bas itna hi farak hai line mein.

✅ Ab tum isko bhi har jagah use kar sakte ho bilkul Type Alias ki tarah:
```typescript
function printUser(user: User) {
  console.log(user.username);
}
```

---

## 🔹 Ab Aaya Asli FARAK

✅ Interface ka super power hai: **EXTENDS**

Matlab tum ek interface ko dusre interface se extend kar sakte ho, aur saari properties automatically mil jayengi.

### 🎯 Real Life Example:

Tumhare app mein 2 type ke user hai:
1.  Normal User
2.  Employee User

Employee User ke paas Normal User ki saari properties hai + uske paas extra `employeeId` bhi hai.

---

### ❌ Agar tum Type Alias use kar rahe ho toh aise karoge:

```typescript
type User = {
  username: string;
  age: number;
}

type Employee = {
  username: string;
  age: number;
  employeeId: number;
}
```

❌ **PROBLEM KYA HAI?**
Tum `username` aur `age` ko 2 baar likh rahe ho. Baar baar same cheez.

Agar kal tumhe User mein `phone` property add karni padi toh 2 jagah change karna padega.

---

### ✅ Agar tum Interface use kar rahe ho toh aise karoge:

```typescript
interface User {
  username: string;
  age: number;
}

// Ye bol raha hai "Employee User ke saari properties le lo, aur apna extra add kar lo"
interface Employee extends User {
  employeeId: number;
}
```

✅ Ab actual mein kya hota hai dekh lo:

```typescript
const normalUser: User = {
  username: "Pravin",
  age: 25
}

const employeeUser: Employee = {
  username: "Ram",
  age: 30,
  employeeId: 101
}

console.log(normalUser);
console.log(employeeUser);
```

✅ Run kar ke dekh lo, dono bilkul sahi chalenge.

✅ Ab agar tum User mein naya property add karo:
```typescript
interface User {
  username: string;
  age: number;
  phone: string; // ✅ Sirf yaha ek baar add karo
}
```

✅ Ab tumhe Employee mein kuch nahi karna padega. `phone` property automatically Employee mein bhi aa jayega.

✅ Ab agar tum employee object banate ho toh tumhe `phone` bhi dena padega. Ek jagah change karo har jagah ho gaya.

Yeh hi Interface ka actual power hai. Type Alias se tum ye nahi kar sakte.

---

## 🔹 Kab Type Alias use karo kab Interface?

| Situation | Kya use karo |
|---|---|
| Simple object type define karna hai | Koi bhi chalega |
| Tumhe extend karna hai dusre type se | ✅ Interface |
| Function signature define karna hai | ✅ Type Alias |
| Union types banana hai | ✅ Type Alias |
| Literal types banana hai | ✅ Type Alias |

✅ **Golden Rule**: Jab bhi tumhe extend karna hai, tab hi Interface use karo. Baaki sab jagah Type Alias hi theek hai.

---

## 🔹 Bahut Important Baat:

> Internet mein tum log padhte ho "Interface hi use karo Type Alias mat use karo" yeh sab bakwas hai.
>
> Har cheez apna jagah hai. Kabhi kabhi Type Alias accha hai kabhi Interface.
>
> Tum sirf apne requirement ke according choose karo. Koi bhi wrong nahi hai.

---

## ✅ Ab Tum Kya Samajh Gaye?

1.  ✅ Interface 90% case mein Type Alias ke jaisa hi hai
2.  ✅ Sirf farak ye hai ki Interface extend kar sakte hai
3.  ✅ Jab bhi tumhe ek type dusre type se properties inherit karni hai tab Interface use karo
4.  ✅ Baaki sab jagah tum Type Alias use kar sakte ho koi problem nahi hai
5.  ✅ Koi bhi galat nahi hai, dono hi sahi hai apne apne jagah pe

---

## 🚀 Next Step:

Ab humne Interface 100% samajh liye hai. Ab hum TypeScript ka sabse important aur sabse difficult topic Generics sikhange.

👉 Next File: `05 - Generics.md`