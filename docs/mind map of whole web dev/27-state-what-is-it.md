# 27 — State Management: Umbrella Kya Hai

> API Design complete hua — REST, GraphQL, ShopKaro endpoints.
> Ab chha umbrella — **State Management**.
> Yeh topic bahut confuse karta hai — yahan clearly samjhenge.

---

## State Kya Hoti Hai

**State** = app ki **abhi ki situation** — kya data hai, kya dikhna chahiye.

ShopKaro mein state ka matlab:
- Cart mein kitne items hain abhi?
- User logged in hai ya nahi?
- Kaunsa modal open hai?
- Products load ho rahe hain ya aa gaye?

Yeh sab **state** hai — aur yeh **change hoti rehti hai** user ke actions se.

---

## State Management Umbrella Ke Andar Kya Kya

```
STATE MANAGEMENT
│
├── Local State (useState)
│   → Sirf ek component ke liye
│
├── Global State
│   ├── React Context → Simple global state
│   └── Zustand → Complex global state
│
└── Server State (React Query / TanStack Query)
    → Server se aane wala data — alag concept
```

---

## Teen Tarah Ki State

### 1. Local State — Sirf Ek Component Ka Data

```jsx
function SearchBar() {
  const [query, setQuery] = useState('')  // Sirf SearchBar ko chahiye

  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
```

Yeh state sirf `SearchBar` mein use hoti hai — kisi aur ko nahi chahiye.

---

### 2. Global State — Poori App Ka Data

```
Cart items → Navbar mein count dikhna chahiye
           → Cart page mein list dikhni chahiye
           → Checkout mein total dikhna chahiye

Yeh teen alag components hain — unhe ek hi cart data chahiye
```

Yeh **global state** hai — poori app mein accessible.

---

### 3. Server State — Server Se Aaya Data

```
Products list → Server se fetch ki
User profile → Server se fetch ki
Order history → Server se fetch ki
```

Yeh data server pe hai — frontend sirf copy rakhta hai. Aur yeh **stale** ho sakta hai (server pe change ho gaya, frontend pe purana hai).

Server state alag tarike se handle hoti hai — React Query se.

---

## ShopKaro Mein Kaunsi State Kahan

| State | Type | Tool |
|-------|------|------|
| Cart items | Global | Zustand |
| User login status | Global | Zustand ya Context |
| Search input value | Local | useState |
| Modal open/closed | Local | useState |
| Products list | Server | React Query |
| User profile data | Server | React Query |

---

## Agla Doc

`28-state-local-vs-global.md` — Local state aur Global state ka fark ek concrete example ke saath — kab props se kaam chale, kab global chahiye.
