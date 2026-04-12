# 29 — React Context: Built-in Global State

> Pichle doc mein local vs global state ka fark samjha.
> Ab **React Context** — React ka apna global state solution.

---

## Context Kya Hai

Context React ka built-in tarika hai kisi bhi component ko data accessible banana ka — bina prop drilling ke.

```jsx
// Context banao
const UserContext = createContext(null)

// Provider se wrap karo — data yahan se aata hai
function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar />        {/* Koi bhi component */}
      <ProductPage />   {/* Nested kitna bhi ho */}
    </UserContext.Provider>
  )
}

// Koi bhi component seedha access kar sakta hai
function Navbar() {
  const { user } = useContext(UserContext)
  return <div>{user ? `Hi ${user.name}` : 'Login Karo'}</div>
}
```

---

## Context Kab Theek Hai

```
User login status → Context ✓
  Poori app mein chahiye, baar baar change nahi hota

Theme (dark/light mode) → Context ✓
  Stable, sab jagah chahiye

Language preference → Context ✓
  Stable data
```

---

## Context Ki Problem — Re-renders

Context ka ek issue hai — **jab bhi context value change hoti hai, saare consumers re-render hote hain.**

```jsx
const CartContext = createContext()

function App() {
  const [cartItems, setCartItems] = useState([])

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <Navbar />      // Cart count ke liye consume karta hai
      <Sidebar />     // Kisi cheez ke liye consume karta hai
      <ProductPage /> // Cart add karne ke liye consume karta hai
      <Footer />      // Bhi consume karta hai
    </CartContext.Provider>
  )
}

// Ek item add kiya → cartItems change → SARE components re-render
// Footer ko koi matlab nahi cart se — phir bhi re-render
```

Agar cart baar baar change ho (user + karta hai, - karta hai) → bahut re-renders → slow UI.

---

## Kab Context, Kab Zustand?

| Situation | Context | Zustand |
|-----------|---------|---------|
| Stable data (user, theme) | ✓ Best | Overkill |
| Frequently changing data (cart) | Re-render problem | ✓ Better |
| Complex logic | Verbose | ✓ Cleaner |
| Small app | ✓ | Overkill |
| Large app | Messy | ✓ |

---

## ShopKaro Mein Context Use Karein?

**User info ke liye → Context ✓**
User login/logout baar baar nahi hota — re-render problem nahi.

```jsx
// /lib/context/UserContext.jsx
'use client'

import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children, initialUser }) {
  const [user, setUser] = useState(initialUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
```

**Cart ke liye → Zustand (agla doc)**
Cart baar baar change hoti hai — Zustand better hai.

---

## Agla Doc

`30-state-zustand.md` — **Zustand** — lightweight global state library. Cart, notifications jaise frequently changing state ke liye perfect. Zustand exactly kya hai, kaise kaam karta hai — ShopKaro ke cart example ke saath.
