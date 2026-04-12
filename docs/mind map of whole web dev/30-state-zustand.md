# 30 — Zustand: Global State Jo Context Se Better Hai

> Pichle doc mein Context dekha — stable data ke liye theek hai.
> Ab **Zustand** — cart jaisi frequently changing state ke liye.

---

## Zustand Kya Hai

Zustand ek **lightweight state management library** hai. Ek store banate hain jisme state aur actions dono hoti hain — koi bhi component use kar sakta hai.

```bash
npm install zustand
```

---

## Zustand Ka Basic Structure

```javascript
import { create } from 'zustand'

const useStore = create((set) => ({
  // State
  count: 0,

  // Actions — state ko kaise change karein
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
```

```jsx
// Koi bhi component mein use karo
function Counter() {
  const { count, increment } = useStore()
  return <button onClick={increment}>{count}</button>
}
```

---

## ShopKaro Ka Cart Store — Zustand Se

```javascript
// /store/cartStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(  // persist → localStorage mein save hoga — page refresh pe cart nahi jaayega
    (set, get) => ({

      // ─── State ───
      items: [],  // [{ id, name, price, imageUrl, quantity }]

      // ─── Actions ───

      // Cart mein item add karo
      addItem: (product) => set((state) => {
        const existing = state.items.find(item => item.id === product.id)

        if (existing) {
          // Pehle se hai → quantity badhao
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        } else {
          // Naya item → add karo
          return {
            items: [...state.items, { ...product, quantity: 1 }]
          }
        }
      }),

      // Quantity update karo
      updateQuantity: (productId, quantity) => set((state) => ({
        items: quantity === 0
          ? state.items.filter(item => item.id !== productId)  // 0 → remove
          : state.items.map(item =>
              item.id === productId ? { ...item, quantity } : item
            )
      })),

      // Item remove karo
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      // Cart clear karo (order place hone ke baad)
      clearCart: () => set({ items: [] }),

      // Total calculate karo (derived value)
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
    }),
    {
      name: 'shopkaro-cart',  // localStorage key
    }
  )
)
```

---

## Components Mein Use Karo

### Navbar — Cart Count:
```jsx
'use client'
import { useCartStore } from '@/store/cartStore'

function Navbar() {
  const items = useCartStore(state => state.items)  // Sirf items subscribe karo
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav>
      <span>Cart ({count})</span>
    </nav>
  )
}
```

### Product Card — Add To Cart:
```jsx
'use client'
import { useCartStore } from '@/store/cartStore'

function AddToCartButton({ product }) {
  const addItem = useCartStore(state => state.addItem)

  return (
    <button onClick={() => addItem(product)}>
      Cart Mein Daalo
    </button>
  )
}
```

### Cart Page:
```jsx
'use client'
import { useCartStore } from '@/store/cartStore'

function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <div>Total: ₹{getTotal()}</div>
    </div>
  )
}
```

---

## Zustand vs Context — Final Summary

| | Context | Zustand |
|--|---------|---------|
| Setup | Built-in, no install | `npm install zustand` |
| Re-renders | Sab consumers re-render | Sirf subscribed parts |
| Async actions | Manual | Easy |
| persist (localStorage) | Manual | Middleware se easy |
| Best for | Stable data (user, theme) | Dynamic data (cart, notifications) |

---

## Agla Doc

`31-state-server.md` — **Server State** — React Query / TanStack Query. Products list, order history — yeh server se aata hai. Yeh alag tarah ki state hai — caching, loading, error sab React Query handle karta hai automatically.
