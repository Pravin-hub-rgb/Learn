# 10 ✅ useReducer Hook - FULL PRACTICAL

---

## 🧠 SOCH:
✅ Hum is file mein sirf useReducer Hook ko TypeScript ke saath type karna sikh rahe hai
✅ Ye transcript ke 44:42 se 48:12 tak ke hisse ko cover karega
✅ Sabse pehle problem dikhayenge phir solution
✅ Har step mein sirf 1-2 line add karenge
✅ Har line ka deep explanation denge
✅ Koi bhi cheez nahi assume karenge
✅ Iske baad hum context + useReducer ko combine karenge

---

## 🚀 SABSE PEHLE PROBLEM DIKHTE HAI

Har jagah jab tum API call karte ho toh tum ye karte ho:

```tsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

❌ **PROBLEM KYA HAI?**
3 alag alag useState hai. Har jagah 3 baar alag alag set karna padta hai.

❌ **SABSE BADA PROBLEM:**
Koi bhi component kahi bhi `setLoading(true)` kar sakta hai
Koi bhi `setError(null)` kar sakta hai
Koi bhi kuch bhi kar sakta hai. Koi rules nahi hai.

Kahi ek set bhool jaoge toh bug aa jayega. Messy ho jata hai.
Bade projects mein ye impossible ho jata hai manage karna.

Yeh problem solve karne ke liye useReducer hai.

---

## 🎯 useReducer Kya Hai?

> Ab tum sochoge: "Context se hum global state manage kar lete hai toh useReducer kyun chahiye?"
> 
> 📌 **Distribute vs Manage: Dono alag cheeze hai!**
> 
> ✅ **Context ka kaam sirf itna hai:** Box banaya usme kuch rakha poore app mein sabko de diya. Bas itna hi.
> 
> ✅ **useReducer ka kaam sirf itna hai:** Us box ke andar jo cheeze hai usko sahi tareeke se change karna. Rule set banana ki kis tareeke se hi change hoga.
> 
> ❌ **Agar sirf Context use karoge toh:** Koi bhi component kuch bhi change kar sakta hai box ke andar. Koi rules nahi hai.
> 
> ✅ **useReducer + Context use karoge toh:** Sirf fixed hi tareeke se hi box ke andar ki cheeze change ho sakti hai. Koi galat tareeke se change nahi kar sakta.
> 
> Jab tumhare paas 3 ya 4 se zyada related state hote hai toh useReducer best hai.

✅ useReducer se ye teeno state ek jagah manage hoga. Sirf action bhejo baaki sab automatic.

---

---

### 🧠 **SOCH:**
✅ Hum ab actual API call example banayenge
✅ Isme data, loading, error teeno state honge
✅ Ye har project mein har jagah use hota hai
✅ Isse tum samajh jaoge ki useReducer ka actual fayda kya hai
✅ Iske baad hum state ka type define karenge

---

### Step 1: Sabse pehle State type define karo

✅ **Yeh file kaha banani hai?**
`types/api.ts` file banalo naya.

```tsx
// types/api.ts
type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
}
```

✅ Humne generic type banaya hai
✅ Koi bhi type ke data ke liye ye use kar sakte hai

✅ **For Example:**
Agar tumhe User ke data ke liye use karna hai:
```tsx
// User type ke liye
const apiState: ApiState<User> = {
  data: null,
  loading: false,
  error: null
}
```

Agar tumhe Post ke data ke liye use karna hai:
```tsx
// Post type ke liye
const apiState: ApiState<Post> = {
  data: null,
  loading: false,
  error: null
}
```

✅ Ek baar yeh type banaya ab har jagah use kar sakte hai koi bhi data ke liye
✅ Teeno state ek saath managed honge

---

---

### 🧠 **SOCH:**
✅ Hum ab action type define karenge
✅ Kyunki hum sirf fixed hi tareeke se state change karna chahte hai
✅ Agar nahi karoge toh koi bhi kuch bhi change kar sakta hai
✅ Iske baad hum reducer function banayenge

---

### Step 2: Ab pehle sirf pehla action define karo

✅ **Yaad hai na humne doc 03 mein pada tha?**
Humne **Literal Types** padha tha. Ye wahi cheez hai.
Hum sirf fixed hi strings allow kar rahe hai. Jaise humne `theme: "dark" | "light"` kiya tha.

✅ **Revision:**
```tsx
// Hamne doc 03 mein yeh padha tha
type Theme = "dark" | "light";
```

Yaha bhi wahi same cheez hai bas object ke andar hai.
Hum sirf `"FETCH_START"` hi allow kar rahe hai type property mein. Kuch nahi.

```tsx
type ApiAction<T> = { type: "FETCH_START" }
```

✅ Humne TypeScript ko bol diya hai ki ye ek allowed action hai
✅ `type` property mein sirf `"FETCH_START"` hi a sakta hai. Kuch nahi.
✅ Isme koi payload nahi chahiye sirf type hi kaafi hai

---

### Step 2.1: Ab dusra action add karo

```tsx
type ApiAction<T> = 
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
```

✅ **`|` ye kya hai?** Ye OR hai. Matlab ya toh pehla wala hoga ya dusra wala.
✅ `payload` matlab hum action ke saath extra data bhi bhej sakte hai
✅ Success case mein hum actual data bhejenge isliye payload hai

---

### Step 2.2: Ab teesra action add karo

```tsx
type ApiAction<T> = 
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: string }
```

✅ Ab error case bhi add kar diya hai
✅ Error mein hum error message bhejenge isliye payload string hai

✅ Sirf ye 3 hi action allowed hai ab
✅ Ab agar tum koi aur type bhejoge toh code likhte hi error milega
✅ Koi galat tareeke se state change nahi kar sakte ab

---

---

### 🧠 **SOCH:**
✅ Hum ab reducer function banayenge
✅ Ye woh function hai jo har action receive karega
✅ Iske basis par woh state change karega
✅ Iske baad hum useReducer call karenge

---

### Step 3: Ab reducer function banalo

```tsx
function apiReducer<T>(state: ApiState<T>, action: ApiAction<T>): ApiState<T> {

}
```

✅ Generic reducer hai kisi bhi data ke liye use kar sakte hai
✅ TypeScript automatically type detect karega

---

### Step 3.1: Ab switch case add karo

```tsx
  switch (action.type) {
    case "FETCH_START":
      return {
        data: null,
        loading: true,
        error: null
      }
```

✅ Jab API call start hoga toh loading true kar do
✅ Data aur error null kar do

---

### Step 3.2: Ab success case add karo

```tsx
    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        loading: false,
        error: null
      }
```

✅ Jab data aa jaye toh loading false kar do
✅ Payload ko data mein dal do

---

### Step 3.3: Ab error case add karo

```tsx
    case "FETCH_ERROR":
      return {
        data: null,
        loading: false,
        error: action.payload
      }
    
    default:
      return state;
  }
```

✅ Agar error aaye toh error set kar do
✅ Loading false kar do

---

---

### 🧠 **SOCH:**
✅ Hum ab useReducer hook ko call karenge
✅ Ye hume state aur dispatch function dega
✅ State se data le sakte hai
✅ Dispatch se action bhej sakte hai

---

### Step 4: Ab useReducer use karo component mein

✅ **Yeh sab code kaha likhna hai?**
Apne page mein. Banao naya page: `app/use_reducer/page.tsx`

```tsx
// app/use_reducer/page.tsx
"use client";

import { useReducer } from "react";
```

✅ `useReducer`: Ye React ka built in hook hai

---

### Step 4.1: Ab useReducer call karo

```tsx
const [state, dispatch] = useReducer(apiReducer, {
  data: null,
  loading: false,
  error: null
});
```

✅ Ab tumhare paas teeno state ek saath hai
✅ Koi 3 alag alag useState nahi chahiye
✅ `state.data`, `state.loading`, `state.error` direct access kar sakte ho

---

---

### 🧠 **SOCH:**
✅ Hum ab actual API call function banayenge
✅ Isme sirf action dispatch karna hai
✅ Baaki sab reducer automatically handle karega
✅ Iske baad hum buttons banayenge

---

### Step 5: Ab API call karo

✅ Yeh bhi apne page component ke andar hi likho

✅ **Note:** `/api/data` sirf example hai. Tum apna actual API endpoint yaha daalo.
Agar abhi ke liye test karna hai toh tum dummy data bhi bhej sakte ho.

```tsx
async function fetchData() {
  dispatch({ type: "FETCH_START" });

  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    dispatch({ type: "FETCH_SUCCESS", payload: data });
  } catch (err) {
    dispatch({ type: "FETCH_ERROR", payload: "Failed to load data" });
  }
}
```

✅ Sirf action dispatch karo
✅ Baaki sab reducer automatically handle karega
✅ Koi alag alag setLoading, setError nahi karna pada

---

### Step 5.1: Ab render karo

```tsx
if(state.loading) return <div>Loading...</div>;
if(state.error) return <div>Error: {state.error}</div>;

return (
  <div>
    <button onClick={fetchData}>Load Data</button>
    {state.data && <div>Data Loaded!</div>}
  </div>
)
```

✅ Ab tum button par click karoge toh sab automatic ho jayega
✅ Loading dikhega phir data aa jayega ya error ayega
✅ Koi extra code nahi likhna pada

✅ Ab tum isko kahi bhi use kar sakte hai har API call ke liye
✅ Ye standard pattern hai har professional developer use karta hai

---

## ✅ Ab Tum Kya Samajh Gaye?

1.  ✅ useReducer complex state manage karne ke liye hai
2.  ✅ Sab state changes ek hi jagah hote hai reducer mein
3.  ✅ Sirf fixed hi action bhej sakte hai
4.  ✅ TypeScript ko state aur action dono ka type batana padta hai
5.  ✅ useReducer se [state, dispatch] milta hai
6.  ✅ Dispatch se action bhejte hai

---

## 🚀 Next Step:

Ab humne useReducer samajh liya hai. Ab hum isko Context API ke saath combine karenge taaki poore app mein isko use kar sake.

👉 Next File: `11 - Context + useReducer Combined.md`