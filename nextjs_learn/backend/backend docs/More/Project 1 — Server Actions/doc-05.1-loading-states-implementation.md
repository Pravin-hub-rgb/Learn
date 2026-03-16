# Doc 5.1 — Loading States Implementation 🔄

## Pehle Problem Samjho — Bina Loading States Ke Kya Hoga?

Chalo ek scenario socho.

Tumne database setup karna sikha (Doc 4.2). Ab socha "Loading states kaise implement karenge?"

Ab **kaun decide karega ki loading states kaise implement karna hai?**
**Kaise pata chalega ki kaun loading states kaun use kar raha hai?**
**Kaise pata chalega ki kaun loading states kaun dikha raha hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar loading states nahi hote, kaise pata chalega ki kaun loading states kaun dikha raha hai?
- **Instagram** — agar loading states nahi hote, kaise pata chalega ki kaun loading states kaun dikha raha hai?
- **Amazon** — agar loading states nahi hote, kaise pata chalega ki kaun loading states kaun dikha raha hai?

---

## Loading States Kya Hote Hain? (Real Life Analogy)

Loading States ek **traffic signal** jaisa hai:

| Traffic Signal | App Development |
|----------------|-----------------|
| Red Light      | Loading State |
| Green Light    | Ready State |
| Yellow Light   | Processing State |
| Traffic Flow   | User Experience |

Agar traffic signal nahi hota, kaise pata chalega ki kaun traffic kaun flow kar raha hai? Isliye signal zaroori hai.

---

## Hum Kya Sikhenge?

Hum Loading States sikhenge jisse:

1. **Loading show ho** - Loading state show ho
2. **User experience improve ho** - User experience better ho
3. **App professional lag** - App professional lag

---

## Step 1: Basic Loading State

Ab basic loading state banate hain:

```typescript
// Pehle kaam karo
// "Ab basic loading state banate hain"
// "Loading state ke liye useState use karte hain"
// "Loading ko manage karne ke liye useState zaroori hai"
```

**Kyun yeh structure?**
- **useState** - Loading ko manage karne ke liye
- **isLoading** - Loading state ko store karne ke liye
- **setLoading** - Loading ko update karne ke liye

---

## Step 2: Loading State Implementation

Ab loading state implementation karte hain:

```typescript
// Pehle kaam karo
// "Ab loading state ko implement karte hain"
// "Loading state ko show karne ke liye conditional rendering use karte hain"
// "Loading state ko display karne ke liye zaroori hai"
```

**Kyun yeh approach?**
- **Conditional rendering** - Loading state ko show karta hai
- **Loading component** - Loading ko display karta hai
- **State management** - State ko manage karta hai

---

## Step 3: Loading Spinner Create Karo

Ab loading spinner create karte hain:

```typescript
// Pehle kaam karo
// "Ab loading spinner create karte hain"
// "Spinner ke liye CSS use karte hain"
// "Spinner ko design karne ke liye zaroori hai"
```

**Kyun yeh structure?**
- **CSS** - Spinner ko design karta hai
- **Animation** - Spinner ko animate karta hai
- **Visual** - Visual feedback provide karta hai

---

## Step 4: Loading States in Forms

Ab loading states in forms samjho:

```typescript
// Pehle kaam karo
// "Ab forms mein loading states ko samjhte hain"
// "Form submit mein loading state use karte hain"
// "Form ko disable karne ke liye zaroori hai"
```

**Kyun yeh approach?**
- **Form submit** - Form submit mein loading state
- **Disable** - Form ko disable karta hai
- **User feedback** - User ko feedback deta hai

---

## Step 5: Loading States in Data Fetching

Ab loading states in data fetching samjho:

```typescript
// Pehle kaam karo
// "Ab data fetching mein loading states ko samjhte hain"
// "Data fetch mein loading state use karte hain"
// "Data ko wait karne ke liye zaroori hai"
```

**Kyun yeh structure?**
- **Data fetch** - Data fetch mein loading state
- **Wait** - Data ko wait karta hai
- **User experience** - User experience improve karta hai

---

## Step 6: Complete Loading States

Ab complete loading states banate hain:

```typescript
// Pehle kaam karo
// "Ab complete loading states banate hain"
// "Sab steps ko mila kar ek structure banate hain"
// "Loading states ko complete karte hain"
```

**Complete structure:**
```typescript
export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchTodos() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/todos')
        const data = await response.json()
        setTodos(data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTodos()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.done ? 'Done' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Step 7: Advanced Loading States

Ab advanced loading states samjho:

```typescript
// Pehle kaam karo
// "Ab advanced loading states ko samjhte hain"
// "Skeleton screens ko use karte hain"
// "Progressive loading ko implement karte hain"
```

**Advanced approach:**
- **Skeleton screens** - Placeholder content
- **Progressive loading** - Step by step loading
- **Error states** - Error handling

---

## Step 8: Complete Advanced Loading States

Ab complete advanced loading states banate hain:

```typescript
// Pehle kaam karo
// "Ab complete advanced loading states banate hain"
// "Sab steps ko mila kar ek structure banate hain"
// "Advanced features ko add karte hain"
```

**Complete structure:**
```typescript
export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTodos() {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/todos')
        if (!response.ok) {
          throw new Error('Failed to fetch todos')
        }
        const data = await response.json()
        setTodos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTodos()
  }, [])

  if (isLoading) {
    return (
      <div>
        <h2>Todos</h2>
        <div className="skeleton">
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.done ? 'Done' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Summary — Doc 5.1 Mein Kya Sikha

✅ **Problem** - Bina loading states ke user experience kaisa hoga?
✅ **Loading states ka importance** - Traffic signal jaisa, user guidance ke liye zaroori
✅ **Basic loading state** - Loading ko manage karna
✅ **Loading spinner** - Visual feedback provide karna
✅ **Advanced loading states** - Skeleton screens aur error handling

---

## Agla Step — Doc 5.2

**Doc 5.2: Error States Implementation**

Abhi humne loading states samjhe. Lekin error states kaise implement karenge? Kaise handle karenge? Woh samjhenge agle doc mein. 🚀