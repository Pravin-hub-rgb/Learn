# 28 — Local State vs Global State: Fark Kya Hai

> Pichle doc mein State Management umbrella samjha.
> Ab seedha fark — **Local State kab, Global State kab**.

---

## Local State — useState

Jab state sirf ek component aur uske direct children ke liye ho.

```jsx
// Password field show/hide toggle — sirf is component ko chahiye
function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <input type={showPassword ? 'text' : 'password'} />
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  )
}
```

Koi aur component ko `showPassword` ki zaroorat nahi — local state perfect hai.

---

## Jab Local State Kafi Nahi Hoti — Prop Drilling

Maan lo cart item count Navbar mein dikhana hai:

```jsx
// App
function App() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div>
      <Navbar cartCount={cartCount} />           {/* Prop pass kiya */}
      <ProductPage setCartCount={setCartCount} /> {/* Setter pass kiya */}
    </div>
  )
}

// Navbar
function Navbar({ cartCount }) {
  return <div>Cart ({cartCount})</div>
}

// ProductPage → ProductList → ProductCard → AddToCartButton
function AddToCartButton({ setCartCount }) {  // Prop 3 levels neeche
  return <button onClick={() => setCartCount(prev => prev + 1)}>Add</button>
}
```

Yeh **prop drilling** hai — state upar hai, data kai levels neeche jaana chahiye. Messy aur hard to maintain.

---

## Global State — Solution

Global state ko **koi bhi component seedha access** kar sakta hai — props se pass karne ki zaroorat nahi.

```jsx
// Global store mein cart hai
// Navbar seedha access karta hai
function Navbar() {
  const cartCount = useCartStore(state => state.items.length)
  return <div>Cart ({cartCount})</div>
}

// AddToCartButton seedha access karta hai
function AddToCartButton({ product }) {
  const addItem = useCartStore(state => state.addItem)
  return <button onClick={() => addItem(product)}>Add</button>
}

// Dono ko props se kuch pass nahi karna — seedha store se
```

---

## Decision — Local ya Global?

```
Kya yeh state sirf ek component use karti hai?
  → Haan → useState (local)

Kya 2-3 levels neeche jaana hai props se?
  → Thoda → Context theek hai
  → Zyada → Zustand

Kya poori app mein chahiye (cart, user)?
  → Zustand
```

---

## ShopKaro Mein Local State Examples

```jsx
// Form input values — local
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

// Loading state — local
const [isLoading, setIsLoading] = useState(false)

// Error message — local
const [error, setError] = useState(null)

// Modal open/close — local (usually)
const [isModalOpen, setIsModalOpen] = useState(false)

// Accordion open/close — local
const [isExpanded, setIsExpanded] = useState(false)
```

---

## ShopKaro Mein Global State Examples

```
Cart items → Navbar + Cart page + Checkout = Zustand
User info → Protected routes + Profile = Zustand ya Context
Toast notifications → Har jagah se trigger = Zustand
```

---

## Agla Doc

`29-state-context.md` — **React Context** — built-in global state solution. Kab kaafi hai, kab Zustand chahiye — yeh decision samjhenge.
