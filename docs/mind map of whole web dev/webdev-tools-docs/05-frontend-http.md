# 05 — HTTP Clients: fetch, Axios, React Query, SWR

> Umbrella: Frontend → HTTP Client (API Calls)
> Kaam: Server se data maangna, bhejhna
> Note: Yahan do alag concepts hain — HTTP client (kaise request karo) + Data fetching library (state kaise manage karo)

---

## Do Alag Cheezein

```
HTTP CLIENT:          Request kaise bhejo
  → fetch (native), Axios, ky

DATA FETCHING LIBRARY: Server state manage karo — loading, caching, refetch
  → React Query, SWR

Combo:
  → React Query internally fetch ya Axios use karta hai
  → React Query = Axios + loading state + caching + retry — sab ek mein
```

---

## HTTP Clients

---

### fetch (Native Browser API)
**Tag: 🟢 Built-in | No install | Always available**

```
Kya hai: Browser ka built-in HTTP client — koi library nahi chahiye
Kab use karo:
  → Simple requests
  → Next.js server components (Next.js ne fetch extend kiya hai — caching built-in)
  → Bundle size zero rakhna ho

Code feel:
  const response = await fetch('/api/products')
  const data = await response.json()

  // Error handling manual hai
  if (!response.ok) throw new Error('Failed')

Cons:
  → Error handling verbose — har baar check karo response.ok
  → Interceptors nahi (har request pe token add karna manual)
  → Request cancellation complex

Next.js mein special:
  → Next.js ka fetch extended hai — caching, revalidation built-in
  → Server components mein fetch use karo (Axios nahi)
```

---

### Axios
**Tag: 🟢 Most Popular | Feature-rich | Client + Server**

```
Kya hai: HTTP client library — fetch se zyada features
Kab use karo:
  → Browser mein API calls with interceptors
  → Node.js backend mein bhi (isomorphic)
  → File upload with progress
  → Request/response transformation

Pros:
  → Interceptors: Har request pe automatically token add karo
  → Automatic JSON parse
  → Better error handling (non-2xx status → throw karta hai)
  → Request cancellation easy
  → Timeout support

Code feel:
  // Interceptor — ek baar setup, har request mein token
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  // Request
  const { data } = await axios.get('/api/products')
  // data already parsed JSON hai

Real app example:
  → Zomato: Restaurant list fetch — interceptor mein location header add
  → Ola: Ride requests — interceptor mein user token
  → ShopKaro: CSR pages mein API calls

fetch se fark:
  → Axios: Error throw karta hai non-2xx pe, automatic JSON parse
  → fetch: Manual check karna padta hai, manual JSON parse

India mein: Abhi bhi very popular — especially React + Express combo
```

---

### ky
**Tag: 🔵 Lightweight | fetch wrapper | Growing**

```
Kya hai: Fetch ka wrapper — Axios se chhota, fetch se better
Kab use karo:
  → Bundle size matter karta hai
  → Axios jaisi features chahiye, lighter package

Axios se fark:
  → ky: ~3KB | Axios: ~15KB
  → Newer, TypeScript-first

Status: Growing lekin Axios ka ecosystem zyada mature
```

---

## Data Fetching Libraries

---

### TanStack Query (React Query)
**Tag: 🟢 Industry Standard 2024 | Server State Management**
**Full Form: TanStack = TypeScript + Stack (TanStack is the organization that maintains this library)**
**Also known as: React Query (old name, still commonly used)**

```
Kya hai: Server state management — data fetching, caching, background updates
Kab use karo:
  → CSR pages mein server data chahiye
  → Caching, background refresh chahiye
  → Loading/error states automatically manage karna ho
  → Infinite scroll, pagination
  → Optimistic updates

ShopKaro docs mein: Doc 31 mein cover hua

Real app example:
  → Swiggy: Restaurant list — background mein refresh hoti rehti hai
  → Zomato: Search results with caching
  → CRED: Transaction history — stale while revalidate

What it replaces:
  → useState + useEffect + manual loading/error → React Query ek line mein

Code feel:
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants', city],
    queryFn: () => axios.get(`/api/restaurants?city=${city}`).then(r => r.data),
    staleTime: 5 * 60 * 1000  // 5 min cache
  })

Mutation (POST/PUT/DELETE):
  const mutation = useMutation({
    mutationFn: (newItem) => axios.post('/api/cart', newItem),
    onSuccess: () => queryClient.invalidateQueries(['cart'])
  })

India mein: Rapidly growing — 2022 ke baad standard
```

---

### SWR
**Tag: 🟢 Vercel | Lightweight | Simple**
**Full Form: SWR = Stale While Revalidate (caching strategy name)**
**Meaning: Pehle cached data dikhao (stale), background mein refresh karo (revalidate)**

```
Kya hai: Data fetching library — Vercel ne banaya, Next.js ke saath natural fit
Kab use karo:
  → Simple data fetching — React Query ka full power nahi chahiye
  → Next.js project, lightweight solution chahiye

React Query se fark:
  → SWR: Simpler API, lekin features kam
  → React Query: Zyada features — mutations, devtools, infinite queries
  → Production mein: React Query zyada versatile

Code feel:
  const { data, error } = useSWR('/api/products', fetcher)

Status: Still good — lekin React Query ne zyada adoption li
```

---

## Best Combos

```
Next.js Server Components:
  → Native fetch (Next.js extended version)
  → No library needed

Next.js Client Components (CSR):
  → React Query + Axios (or fetch)
  → Most popular combo

Simple project, no complex caching:
  → Axios directly (without React Query)
  → ya SWR for simple cases
```

---

## Quick Decision

```
Server component (Next.js)?
  → Native fetch

Client component, complex state (caching, background refresh)?
  → React Query

Client component, simple fetch?
  → Axios ya fetch directly

Bundle size critical?
  → ky (fetch wrapper)
```

---

## Agla Doc

`06-frontend-animation.md` — Animation tools — Framer Motion, GSAP, CSS Animations — Swiggy ka food card hover, Zomato ka loading animation kaise bana hoga.
