# 01 — State Management: Zustand, Redux, Jotai aur Baaki Sab

> Umbrella: Frontend → State Management
> Kaam: App ki global "yaadaasht" manage karna — cart, user, UI state
> ShopKaro docs mein: Doc 27-31

---

## Yeh Category Kya Solve Karti Hai

Jab ek component ka data doosre component ko chahiye — aur woh directly related nahi hain (parent-child nahi) — tab **state management** kaam aata hai.

```
Zomato example:
Cart mein items → Header mein count dikhana + Cart page + Checkout
Teen alag components → Ek hi cart data chahiye → Global state
```

---

## Tools

---

### React Context
**Tag: 🟢 Built-in | No install needed**

```
Kya hai: React ka built-in global state solution
Kab use karo:
  → Stable data jo baar baar change na ho
  → User login status, theme (dark/light), language
  → Chhoti app, props drilling avoid karna ho

Kab mat use karo:
  → Cart jaisi frequently changing state
  → Baar baar update ho → Sab components re-render → Slow

Real app example:
  → Hotstar: Current logged-in user info poori app mein
  → Swiggy: Selected city/location (baar baar change nahi hoti)

Industry preference:
  → Hamesha available — koi bhi app mein milega
  → Complex state ke liye akela kaafi nahi
```

---

#### Installation
```bash
# No installation needed! React ke saath built-in aata hai
# Bas React install hona chahiye:
npm install react
# or
pnpm add react
```

#### Import + Code Example
```javascript
import { createContext, useContext, useState } from 'react'

// 1. Context create karo
const ThemeContext = createContext()

// 2. Provider component banao
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Consume karo kisi bhi component mein
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle {theme}
  </button>
}
```

---

### Zustand
**Tag: 🟢 Most Popular 2024 | Recommended for new projects**

```
Kya hai: Minimal global state library — simple API, powerful
Kab use karo:
  → Cart, notifications, modal state — frequently changing
  → Medium size apps
  → Ek ya chhoti team
  → Naya project shuru kar rahe ho

Kab mat use karo:
  → Bahut complex state logic with time-travel debugging chahiye (Redux better)

Real app example:
  → ShopKaro: Cart items (add, remove, quantity update)
  → Swiggy clone: Cart + delivery address + coupon state
  → Razorpay dashboard clone: Active tab, filters, selected items

India mein: 2023 ke baad naye projects mein Redux se shift ho raha hai Zustand ki taraf
Global: Vercel, Linear, bade companies use kar rahe hain

Alternatives se fark:
  → Redux se: 10x kam code, no boilerplate
  → Context se: Re-render problem nahi
  → Jotai se: Store-based (ek jagah sab), Jotai atom-based (chota chota pieces)
```

---

#### Installation
```bash
npm install zustand
# or
pnpm add zustand
```

#### Import + Code Example
```javascript
import { create } from 'zustand'

// Store create karo
const useCartStore = create((set) => ({
  items: [],
  
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter(item => item.id !== itemId)
  })),
  
  clearCart: () => set({ items: [] })
}))

// Component mein use karo
function CartComponent() {
  const { items, addItem, removeItem } = useCartStore()
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}
```

---

### Redux Toolkit (RTK)
**Tag: 🟡 Enterprise | Legacy Projects | Still relevant**

```
Kya hai: Predictable state container — complex global state with strict patterns
Kab use karo:
  → Existing Redux codebase hai (rewrite mat karo)
  → Badi team — 10+ developers
  → Complex state logic — undo/redo, time-travel debugging chahiye
  → Enterprise app jahan strict patterns zaroori hain

Kab mat use karo:
  → Naya project shuru kar rahe ho — Zustand lo
  → Chhoti team, simple state

Real app example:
  → Flipkart: Complex state — cart + filters + search + user + wishlist + offers
  → IRCTC: Booking state machine — seat selection, passenger info, payment steps
  → Trading platforms: Real-time data updates, complex UI state

India mein: Bahut purane projects mein milega — 2018-2022 era ke apps
Global: Twitter (purana), Facebook, enterprise apps

Redux vs Redux Toolkit:
  → Redux (original): Bahut boilerplate — actions, action creators, reducers alag
  → Redux Toolkit: Official way — createSlice se sab simple
  → Naya project? Redux Toolkit use karo, plain Redux nahi
```

---

#### Installation
```bash
npm install @reduxjs/toolkit react-redux
# or
pnpm add @reduxjs/toolkit react-redux
```

#### Import + Code Example
```javascript
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

// Slice banao (actions + reducers ek saath)
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    }
  }
})

// Store configure karo
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
})

// Component mein use karo
function CartComponent() {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => dispatch(cartSlice.actions.removeItem(item.id))}>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
```

---

### Jotai
**Tag: 🔵 Lightweight | Atomic State | Growing**

```
Kya hai: Atom-based state — chhote chhote independent pieces
Kab use karo:
  → State ke chhote chhote independent pieces hain
  → React Suspense ke saath kaam karna ho
  → Bundle size bahut chhota chahiye

Kab mat use karo:
  → Sab state ek jagah rakhna ho (store pattern prefer karte ho)
  → Team badi hai — Zustand/Redux patterns zyada familiar hain

Real app example:
  → Blog editor: Har field (title, content, tags) alag atom
  → Dashboard: Har widget ki state independently manage karna

Zustand se fark:
  → Zustand: Ek bada store → Sab kuch usme
  → Jotai: Kai chhote atoms → Compose karo
```

---

#### Installation
```bash
npm install jotai
# or
pnpm add jotai
```

#### Import + Code Example
```javascript
import { atom, useAtom } from 'jotai'

// Atom create karo (independent piece of state)
const countAtom = atom(0)
const nameAtom = atom('Guest')

// Multiple atoms ko combine bhi kar sakte ho
const greetingAtom = atom((get) => `Hello, ${get(nameAtom)}!`)

// Component mein use karo
function Counter() {
  const [count, setCount] = useAtom(countAtom)
  const [name] = useAtom(nameAtom)
  const [greeting] = useAtom(greetingAtom)
  
  return (
    <div>
      <p>{greeting}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

---

### MobX
**Tag: 🟠 Reactive | OOP Style | Niche**

```
Kya hai: Reactive state management — state change → UI automatically update
Kab use karo:
  → OOP (class-based) style prefer karte ho
  → Angular background se aa rahe ho
  → Complex derived state (computed values)

Kab mat use karo:
  → Naya React project — React ecosystem mein out of place lagta hai
  → Functional style prefer karte ho

Real app example:
  → Enterprise apps with Angular/React hybrid
  → Purani company ki codebase

India mein: Rare — mostly purane projects
```

---

#### Installation
```bash
npm install mobx mobx-react-lite
# or
pnpm add mobx mobx-react-lite
```

#### Import + Code Example
```javascript
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

// Store class banao
class CartStore {
  items = []
  
  constructor() {
    makeAutoObservable(this)
  }
  
  addItem(item) {
    this.items.push(item)
  }
  
  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId)
  }
  
  get totalCount() {
    return this.items.length
  }
}

const cartStore = new CartStore()

// Component mein use karo (observer se wrap karo)
const CartComponent = observer(({ store }) => {
  return (
    <div>
      <p>Total items: {store.totalCount}</p>
      {store.items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => store.removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
})
```

---

### XState
**Tag: 🔵 State Machines | Complex Logic | Niche**

```
Kya hai: Finite state machines — complex flows model karna
Kab use karo:
  → Complex multi-step flows — booking, onboarding, wizards
  → State transitions explicitly define karni hain
  → Impossible states prevent karni hain

Real app example:
  → MakeMyTrip: Booking flow — search → select → passenger details → payment → confirmation
  → Ola: Driver state machine — offline → available → on trip → completing

Jab samjho toh powerful hai — lekin learning curve zyada hai
Beginner ke liye: Baad mein seekhna
```

---

#### Installation
```bash
npm install xstate
# or
pnpm add xstate
```

#### Import + Code Example
```javascript
import { createMachine, createActor } from 'xstate'

// State machine define karo
const bookingMachine = createMachine({
  id: 'booking',
  initial: 'searching',
  states: {
    searching: {
      on: { FOUND: 'selected' }
    },
    selected: {
      on: { 
        CONFIRM: 'passengerDetails',
        CANCEL: 'searching'
      }
    },
    passengerDetails: {
      on: { 
        SUBMIT: 'payment',
        BACK: 'selected'
      }
    },
    payment: {
      on: { 
        SUCCESS: 'confirmed',
        FAILED: 'payment'
      }
    },
    confirmed: {
      type: 'final'
    }
  }
})

// Actor create karo aur use karo
const bookingActor = createActor(bookingMachine)
bookingActor.start()

// Component mein use karo
function BookingFlow() {
  const [state, setState] = React.useState(bookingActor.getSnapshot())
  
  React.useEffect(() => {
    const subscription = bookingActor.subscribe((snapshot) => {
      setState(snapshot)
    })
    return () => subscription.unsubscribe()
  }, [])
  
  return (
    <div>
      <p>Current state: {state.value}</p>
      {state.value === 'searching' && (
        <button onClick={() => bookingActor.send({ type: 'FOUND' })}>
          Flight Found
        </button>
      )}
      {/* ... other states */}
    </div>
  )
}
```

---

### Valtio
**Tag: 🔵 Proxy-based | Simple | Growing**

```
Kya hai: Proxy-based state — seedha mutate karo, reactivity automatic
Kab use karo:
  → Zustand jaisa lekin mutable style prefer karte ho
  → Chhoti apps, quick prototypes

Zustand se fark: Mutation style vs functional style
```

---

#### Installation
```bash
npm install valtio
# or
pnpm add valtio
```

#### Import + Code Example
```javascript
import { proxy, useSnapshot } from 'valtio'

// State create karo (proxy se)
const state = proxy({
  count: 0,
  items: [],
  
  increment() {
    ++state.count
  },
  
  addItem(item) {
    state.items.push(item)
  }
})

// Component mein use karo
function Counter() {
  const snap = useSnapshot(state)
  
  return (
    <div>
      <p>Count: {snap.count}</p>
      <button onClick={() => state.increment()}>
        Increment
      </button>
    </div>
  )
}
```

---

### Recoil
**Tag: 🔴 Avoid | Facebook ne abandon kiya**

```
Kya hai: Facebook ka atom-based state
Kyun avoid: Facebook ne practically abandon kar diya — last major update 2023
Alternative: Jotai (same concept, actively maintained)
```

---

#### Installation (Not Recommended)
```bash
# Agar phir bhi use karna ho (legacy project):
npm install recoil
# or
pnpm add recoil

# Lekin behtar hai Jotai use karo:
npm install jotai
```

#### Import + Code Example (For Reference Only)
```javascript
import { atom, useRecoilState, RecoilRoot, RecoilState } from 'recoil'

// Atom create karo
const countAtom = atom({
  key: 'countAtom',
  default: 0
})

// Component mein use karo
function Counter() {
  const [count, setCount] = useRecoilState(countAtom)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}

// App ko RecoilRoot mein wrap karna padta hai
function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  )
}
```

---

## Quick Decision — Kaunsa Choose Karo

```
Naya Next.js project?
  → Zustand (cart, global UI) + React Query (server data)

Existing Redux codebase?
  → Redux Toolkit ke saath rehne do — rewrite mat karo

Sirf ek do cheezein global chahiye (user, theme)?
  → React Context kaafi hai

Complex multi-step flow (booking, onboarding)?
  → XState explore karo

Atom-based state prefer karte ho?
  → Jotai
```

---

## India Mein Industry Reality

```
Startup / New project (2024):  Zustand + React Query
Mid-size company:              Redux Toolkit ya Zustand
Enterprise / Purani company:   Redux (plain ya RTK)
Freelance projects:            Zustand ya Context — jaldi setup
```

---

## Agla Doc

`02-frontend-styling.md` — Styling tools — Tailwind, CSS Modules, Styled Components — Swiggy ka UI Tailwind se hai, MUI se kaise alag hai, kab kya.
