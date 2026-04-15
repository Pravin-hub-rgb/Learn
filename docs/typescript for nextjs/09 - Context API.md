# 09 ✅ Context API - FULL PRACTICAL

---

## 🧠 SOCH:
✅ Hum is file mein sirf Context API ko TypeScript ke saath type karna sikh rahe hai
✅ Ye transcript ke 43:45 se 44:42 tak ke hisse ko cover karega
✅ Sabse pehle problem dikhayenge phir solution
✅ Har step mein sirf 1-2 line add karenge
✅ Har line ka deep explanation denge
✅ Koi bhi cheez nahi assume karenge
✅ Iske baad hum useReducer par jayenge

---

## 🚀 SABSE PEHLE PROBLEM DIKHTE HAI

Maan lo tumhe theme (dark/light mode) poore app mein chahiye. Tum abhi aise kar rahe ho:

```tsx
// App -> Page -> Header -> ThemeButton
// Teen level par tumhe theme prop pass karna pad raha hai
```

❌ **PROBLEM KYA HAI?**
Har baar har component mein prop pass karna pad raha hai. Agar 10 level ho jaye toh 10 baar prop pass karna padega. Yeh prop drilling kehte hai.

Yeh problem solve karne ke liye Context API hai.

---

## 🎯 Context API Kya Hai?

> Context API matlab tum ek global box bana lo.
> 
> Us box mein kuch bhi rakh lo.
> 
> Poore app mein kahi se bhi tum us box ke andar ka cheez le sakte ho.
> 
> Koi prop pass karne ki jarurat nahi hai.

---

---

### 🧠 **SOCH:**
✅ Hum ab type define karenge pehle
✅ Kyunki hume TypeScript ko batana padta hai ki context mein kya kya rahega
✅ Agar nahi karoge toh TypeScript kuch nahi samjhega
✅ Iske baad hum context banayenge

---

### Step 1: Sabse pehle sirf type define karo

```tsx
// types/theme.ts
type ThemeState = {
  theme: "dark" | "light";
  fontSize: number;
}
```

✅ Humne TypeScript ko bol diya hai ki is context mein sirf ye do hi cheeze rahenge
✅ Ab aage agar tum koi aur cheez add karoge toh error milega
✅ Yeh TypeScript ka power hai

---

---

### 🧠 **SOCH:**
✅ Hum ab alag file mein context banayenge
✅ Kyunki hum isko poore app mein kahi se bhi import kar sakte hai
✅ Agar nahi karoge toh har jagah same code likhna padega
✅ Iske baad hum provider lagayenge

---

### Step 2: Ab sirf file banalo aur first line add karo

```tsx
// context/theme.context.ts
"use client";
```

✅ **Yeh line kyu hai?**
Context sirf client par hi chalta hai. Next.js App Router mein isliye "use client" jaruri hai.
Yeh nahi likhoge toh error milega.

---

### Step 2.1: Ab import add karo

```tsx
import { createContext } from "react";
import { ThemeState } from "@/types/theme";
```

✅ `createContext`: Ye React ka apna function hai. Isse naya context banate hai.
✅ `ThemeState`: Hum wahi type import kar rahe hai jo upar banaya tha.

---

### Step 2.2: Ab default value define karo

```tsx
const defaultState: ThemeState = {
  theme: "light",
  fontSize: 16
}
```

✅ Jab koi component provider ke bahar hoga toh yeh default value milega.
✅ Har baar null nahi rakhna chahiye.

---

### Step 2.3: Ab context create karo

```tsx
export const ThemeContext = createContext<ThemeState>(defaultState);
```

✅ `<ThemeState>`: Yeh hum generic pass kar rahe hai.
✅ Ab TypeScript ko 100% pata hai ki is context mein kya hoga.
✅ Ab agar tum galat cheez daloge toh code likhte hi error milega.

---

---

### 🧠 **SOCH:**
✅ Hum ab provider ko root layout par lagayenge
✅ Kyunki poore app ko is context ka access chahiye
✅ Agar yaha lagayenge toh har component isko use kar sakta hai
✅ Iske baad hum kisi bhi component mein use kar sakte hai

---

### Step 3: Ab provider lagao sirf

```tsx
// app/layout.tsx
import { ThemeContext } from "@/context/theme.context";
```

✅ Pehle hum context ko import kar rahe hai.

---

### Step 3.1: Ab provider wrap karo

```tsx
export default function RootLayout({ children }) {

  return (
    <ThemeContext.Provider value={{ theme: "dark", fontSize: 16 }}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ThemeContext.Provider>
  )
}
```

✅ Ab poore app ke andar har jagah yeh context available hai.
✅ Provider ke andar jitne bhi components hai sab isko access kar sakte hai.
✅ Bahaar wale components ko nahi milega.

---

---

### 🧠 **SOCH:**
✅ Hum ab ek component banayenge jisme context use karenge
✅ Kyunki hum dekhna chahte hai ki actually kaam karta hai ya nahi
✅ Koi prop pass nahi karenge direct context se le lenge
✅ Iske baad hum useReducer par jayenge

---

### Step 4: Ab component mein use karo

```tsx
// components/ThemeButton.tsx
"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/theme.context";
```

✅ `useContext`: Ye React ka hook hai jo context se data nikalta hai.

---

### Step 4.1: Ab context se data le lo

```tsx
export default function ThemeButton() {
  const state = useContext(ThemeContext);
```

✅ Ab `state` mein tumhe `theme` aur `fontSize` dono mil gaye hai.
✅ Koi bhi prop pass nahi karna pada.
✅ Direct global box se le liya.

---

### Step 4.2: Ab render karo

```tsx
  return (
    <div>
      <p>Current Theme: {state.theme}</p>
      <p>Font Size: {state.fontSize}px</p>
    </div>
  )
}
```

✅ Ab tum page ko browser mein open karoge toh ye dikhega:
- Current Theme: dark
- Font Size: 16px

✅ Bilkul perfect chal raha hai.

---

## ✅ Ab Tum Kya Samajh Gaye?

1.  ✅ Context API prop drilling ko solve karta hai
2.  ✅ Har baar har component mein prop pass nahi karna padta
3.  ✅ TypeScript mein tumhe hamesha context ka type batana padta hai
4.  ✅ `createContext` mein generic pass karo
5.  ✅ Provider ko root par lagao
6.  ✅ Kahi se bhi `useContext` se access karo

---

## 🚀 Next Step:

Ab humne sirf context create kiya hai. Ab isme state change karna hai uske liye hum useReducer use karenge.

👉 Next File: `10 - useReducer Hook.md`