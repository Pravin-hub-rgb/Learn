# 31 — Server State: React Query

> Pichle doc mein Zustand — client-side global state.
> Ab **Server State** — data jo server se aata hai.
> React Query / TanStack Query yeh handle karta hai.

---

## Server State Alag Kyun Hai

Cart state — browser mein hai, browser control karta hai.

Products list — server pe hai. Frontend sirf ek copy rakhta hai. Problems:
- Data stale ho sakta hai (server pe update hua, frontend pe purana)
- Loading state handle karo
- Error handle karo
- Baar baar same data fetch mat karo (cache karo)

Yeh sab manually karna tedious hai — React Query automatically karta hai.

---

## Bina React Query — Manual Approach

```jsx
function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return <div>{products.map(...)}</div>
}
```

Yeh pattern har jagah repeat hota hai — boring aur error prone.

---

## React Query Se — Same Cheez

```bash
npm install @tanstack/react-query
```

```jsx
import { useQuery } from '@tanstack/react-query'

function ProductsPage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],           // Unique key — caching ke liye
    queryFn: () => fetch('/api/products').then(r => r.json())
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  return <div>{products.map(...)}</div>
}
```

Chhota, clean. Aur React Query automatically:
- **Cache karta hai** — same data dobara fetch nahi karta jaldi
- **Background refresh** — stale data quietly update karta hai
- **Loading/error state** — automatically manage
- **Retry** — request fail ho toh dobara try karta hai

---

## ShopKaro Mein React Query

```jsx
// Products list — with filters
function useProducts(filters) {
  return useQuery({
    queryKey: ['products', filters],  // Filters change → new fetch
    queryFn: () => {
      const params = new URLSearchParams(filters)
      return fetch(`/api/products?${params}`).then(r => r.json())
    },
    staleTime: 5 * 60 * 1000,  // 5 minute tak fresh maano — dobara fetch mat karo
  })
}

// Usage:
function ProductsPage() {
  const [filters, setFilters] = useState({ category: 'shoes' })
  const { data, isLoading } = useProducts(filters)
  // ...
}
```

```jsx
// Orders list — auth required
function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch('/api/orders').then(r => r.json()),
    staleTime: 0,  // Hamesha fresh chahiye — order status change ho sakta hai
  })
}
```

---

## Mutation — Data Change Karna

React Query mutations se POST/PUT/DELETE bhi handle hoti hai:

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

function AddToCartButton({ product }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (productId) =>
      fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity: 1 })
      }),
    onSuccess: () => {
      // Cart data refresh karo
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  return (
    <button
      onClick={() => mutation.mutate(product.id)}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Adding...' : 'Cart Mein Daalo'}
    </button>
  )
}
```

---

## State Management — Complete Summary

```
Local State (useState):
  → Sirf ek component: form inputs, toggles, loading

Global Client State (Zustand):
  → Poori app mein, baar baar change: cart, notifications

Global Stable State (Context):
  → Poori app mein, kam change: user info, theme

Server State (React Query):
  → Server se aaya data: products, orders, user profile
```

## State Management Umbrella — Complete Hua

```
STATE MANAGEMENT
│
├── Local State     → Doc 28 ✓
├── Context         → Doc 29 ✓
├── Zustand         → Doc 30 ✓
└── React Query     → Doc 31 ✓ (YEH)
```

---

## Agla Doc

`32-caching-what-is-it.md` — Saatwa umbrella — **Caching**. Data bar bar fetch karna slow karta hai — cache karne se speed milti hai. localStorage, sessionStorage, CDN, server cache — yeh sab samjhenge.
