# 11 ✅ Context + useReducer COMBINED - PART 1

---

## 🧠 SOCH:
✅ Hum is file mein ab Context aur useReducer ko ek saath use karenge
✅ Ye transcript ke 48:12 se 52:10 tak ke hisse ko cover karega
✅ Ye actual professional pattern hai har Next.js project mein
✅ Sabse pehle problem dikhayenge phir solution
✅ Har step mein sirf 1-2 line add karenge
✅ Har line ka deep explanation denge

---

## 🚀 SABSE PEHLE PROBLEM DIKHTE HAI

Abhi tak tumne Context banaya hai aur useReducer banaya hai. Par dono alag alag hai.

❌ **PROBLEM KYA HAI?**
Ab tumhe har jagah 2 alag alag cheeze pass karni padti hai.
Koi bhi component directly state nahi le sakta, nahi directly dispatch nahi kar sakta.

Isliye hum dono ko Context ke andar ek saath combine karenge.

---

## 🎯 Kya Krenge Ab?

Hum apne Context mein **state aur dispatch dono** ek saath dalenge.
Taaki poore app mein kahi se bhi tum:
✅ Direct state le sakte ho
✅ Direct action dispatch kar sakte ho

---

---

### 🧠 **SOCH:**
✅ Hum ab pehle context ka type define karenge
✅ Ab context mein sirf state nahi balki state + dispatch dono honge
✅ Agar nahi karoge toh TypeScript nahi samajhega ki context mein kya hai
✅ Iske baad hum context banayenge

---

### Step 1: Pehle context ka type define karo

✅ **Yeh file kaha banani hai?**
`context/theme.context.ts`

```tsx
import { createContext } from "react";
import { ThemeState, ThemeAction } from "@/types/theme";

type ThemeContextType = {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
}
```

✅ `ThemeState`: Wahi state type jo humne useReducer ke liye banaya tha
✅ `React.Dispatch`: Ye React ka built in type hai dispatch function ke liye
✅ `<ThemeAction>`: Ye batata hai ki sirf ThemeAction hi dispatch kar sakte hai

✅ Ab TypeScript ko 100% pata hai ki context mein kya kya hoga.

---

---

### 🧠 **SOCH:**
✅ Hum ab default value define karenge
✅ Jab koi component provider ke bahar hoga toh yeh default value milega
✅ Iske baad hum context create karenge

---

### Step 2: Ab default value aur context banalo

```tsx
const defaultContext: ThemeContextType = {
  state: {
    theme: "light",
    fontSize: 16
  },
  dispatch: () => {}
}

export const ThemeContext = createContext<ThemeContextType>(defaultContext);
```

✅ `dispatch: () => {}` ye dummy function hai jab tak provider nahi lagate
✅ Ab context ready hai

---

---

### 🧠 **SOCH:**
✅ Hum ab provider banayenge
✅ Provider ke andar hum useReducer call karenge
✅ Uske baad state aur dispatch dono ko context mein pass karenge
✅ Iske baad hum children ko wrap karenge

---

### Step 3: Ab Provider banalo

✅ **Yeh file kaha banani hai?**
`context/theme.provider.tsx`

```tsx
"use client";

import { useReducer } from "react";
import { ThemeContext } from "./theme.context";
import { themeReducer } from "./theme.reducer";
```

✅ Sab cheeze import kar lo pehle.

---

### Step 3.1: Ab provider function banalo

```tsx
export default function ThemeProvider({ children }: React.PropsWithChildren) {

  const [state, dispatch] = useReducer(themeReducer, {
    theme: "light",
    fontSize: 16
  });
```

✅ Provider ke andar hi humne useReducer call kiya hai
✅ Ab humare paas state aur dispatch dono ready hai

---

### Step 3.2: Ab provider return karo

```tsx
  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

✅ Ab state aur dispatch dono ko context ke value mein pass kar diya hai
✅ Ab provider ke andar jo bhi component hoga woh dono ko access kar sakta hai

---

---

### 🧠 **SOCH:**
✅ Hum ab layout mein provider lagayenge
✅ Taaki poore app mein yeh context available ho jaye
✅ Iske baad hum kisi bhi component mein isko use kar sakte hai

---

### Step 4: Ab layout mein provider lagao

```tsx
// app/layout.tsx
import ThemeProvider from "@/context/theme.provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

✅ Ab poore app mein har jagah ThemeContext available hai.
✅ Koi bhi component state le sakta hai ya action dispatch kar sakta hai.

---

---

### 🧠 **SOCH:**
✅ Hum ab kisi bhi component mein context ko use karenge
✅ Hum waha se direct state le lenge
✅ Direct action dispatch kar sakte hai
✅ Koi prop pass nahi karna pada

---

### Step 5: Ab kisi bhi component mein use karo

```tsx
// components/ThemeButton.tsx
"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/theme.context";
```

---

### Step 5.1: Ab context se le lo

```tsx
export default function ThemeButton() {
  const { state, dispatch } = useContext(ThemeContext);
```

✅ Ab tumhare paas dono aa gaye hai
✅ Koi prop pass nahi karna pada
✅ Direct global box se le liya

---

### Step 5.2: Ab use karo

```tsx
  return (
    <div>
      <p>Current Theme: {state.theme}</p>

      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Toggle Theme
      </button>

      <button onClick={() => dispatch({ type: "SET_FONT_SIZE", payload: 20 })}>
        Big Font
      </button>
    </div>
  )
}
```

✅ Bas itna hi. Sab kuch kaam kar raha hai.
✅ Ab tum kahi bhi isko use kar sakte hai.

---

## ✅ Ab Tum Kya Samajh Gaye?

1.  ✅ Context + useReducer ek saath use karte hai
2.  ✅ Context mein state + dispatch dono pass karte hai
3.  ✅ Provider ke andar hi useReducer call karte hai
4.  ✅ Koi bhi component dono ko directly access kar sakta hai
5.  ✅ Ye har professional Next.js project mein use hota hai

---

## 🚀 Next Part:

Ab hum next part mein us big problem ko solve karenge jo aata hai jab kuch actions mein payload hota hai aur kuch mein nahi.

👉 Next File: `11.1 - Context + useReducer - Discriminated Unions.md`