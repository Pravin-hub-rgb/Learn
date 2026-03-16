# Doc 5.2 — Error States Implementation ⚠️

## Pehle Problem Samjho — Bina Error States Ke Kya Hoga?

Chalo ek scenario socho.

Tumne loading states samjhe (Doc 5.1). Ab socha "Error states kaise implement karenge?"

Ab **kaun decide karega ki error states kaise implement karna hai?**
**Kaise pata chalega ki kaun error states kaun use kar raha hai?**
**Kaise pata chalega ki kaun error states kaun dikha raha hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar error states nahi hote, kaise pata chalega ki kaun error states kaun dikha raha hai?
- **Instagram** — agar error states nahi hote, kaise pata chalega ki kaun error states kaun dikha raha hai?
- **Amazon** — agar error states nahi hote, kaise pata chalega ki kaun error states kaun dikha raha hai?

---

## Error States Kya Hote Hain? (Real Life Analogy)

Error States ek **warning sign** jaisa hai:

| Warning Sign | App Development |
|--------------|-----------------|
| Warning Message | Error Message |
| Alert Sound | Error Notification |
| Safety Instructions | Error Resolution |
| User Guidance | User Experience |

Agar warning sign nahi hota, kaise pata chalega ki kaun warning kaun dikha raha hai? Isliye sign zaroori hai.

---

## Hum Kya Sikhenge?

Hum Error States sikhenge jisse:

1. **Errors show ho** - Error state show ho
2. **User guidance mile** - User ko guidance mile
3. **App stable rahe** - App crash na ho

---

## Step 1: Basic Error State

Ab basic error state banate hain:

```typescript
// Pehle kaam karo
// "Ab basic error state banate hain"
// "Error state ke liye useState use karte hain"
// "Error ko manage karne ke liye useState zaroori hai"
```

**Kyun yeh structure?**
- **useState** - Error ko manage karne ke liye
- **error** - Error ko store karne ke liye
- **setError** - Error ko update karne ke liye

---

## Step 2: Error State Implementation

Ab error state implementation karte hain:

```typescript
// Pehle kaam karo
// "Ab error state ko implement karte hain"
// "Error state ko show karne ke liye conditional rendering use karte hain"
// "Error state ko display karne ke liye zaroori hai"
```

**Kyun yeh approach?**
- **Conditional rendering** - Error state ko show karta hai
- **Error component** - Error ko display karta hai
- **State management** - State ko manage karta hai

---

## Step 3: Error Types Define Karo

Ab error types define karte hain:

```typescript
// Pehle kaam karo
// "Ab error types ko define karte hain"
// "Different errors ke liye alag alag types banate hain"
// "Error ko categorize karne ke liye zaroori hai"
```

**Kyun yeh structure?**
- **Network error** - Network issues ke liye
- **Validation error** - Validation failures ke liye
- **Server error** - Server issues ke liye

---

## Step 4: Error Handling Logic

Ab error handling logic samjho:

```typescript
// Pehle kaam karo
// "Ab error handling logic ko samjhte hain"
// "Different errors ko alag alag handle karte hain"
// "Error ko properly handle karne ke liye zaroori hai"
```

**Kyun yeh approach?**
- **Try-catch** - Errors ko catch karta hai
- **Error types** - Different errors ko identify karta hai
- **User feedback** - User ko feedback deta hai

---

## Step 5: Error Recovery Options

Ab error recovery options samjho:

```typescript
// Pehle kaam karo
// "Ab error recovery options ko samjhte hain"
// "Retry option ko provide karte hain"
// "Refresh option ko provide karte hain"
```

**Kyun yeh structure?**
- **Retry** - Operation ko retry karne ka option
- **Refresh** - Page ko refresh karne ka option
- **Contact support** - Support ko contact karne ka option

---

## Step 6: Complete Error States

Ab complete error states banate hain:

```typescript
// Pehle kaam karo
// "Ab complete error states banate hain"
// "Sab steps ko mila kar ek structure banate hain"
// "Error states ko complete karte hain"
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
        if (err instanceof TypeError) {
          setError('Network error. Please check your connection.')
        } else if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Something went wrong. Please try again.')
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchTodos()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <div>
        <p className="error-message">Error: {error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
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

## Step 7: Form Error States

Ab form error states samjho:

```typescript
// Pehle kaam karo
// "Ab form mein error states ko samjhte hain"
// "Form validation mein error states use karte hain"
// "Form ko validate karne ke liye zaroori hai"
```

**Kyun yeh approach?**
- **Form validation** - Form ko validate karta hai
- **Error messages** - Error messages display karta hai
- **User guidance** - User ko guidance deta hai

---

## Step 8: Complete Form Error States

Ab complete form error states banate hain:

```typescript
// Pehle kaam karo
// "Ab complete form error states banate hain"
// "Sab steps ko mila kar ek structure banate hain"
// "Form error states ko complete karte hain"
```

**Complete structure:**
```typescript
export default function TodoForm() {
  const [formData, setFormData] = useState({
    title: '',
    done: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    // Validation check karo
    const newErrors: any = {}
    if (!formData.title) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title too long'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create todo')
      }

      const result = await response.json()
      console.log('Todo created:', result)
    } catch (error) {
      if (error instanceof TypeError) {
        setErrors({ form: 'Network error. Please try again.' })
      } else {
        setErrors({ form: error.message })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter todo title"
        disabled={isSubmitting}
      />
      {errors.title && <p className="error">{errors.title}</p>}
      {errors.form && <p className="error">{errors.form}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  )
}
```

---

## Step 9: Error State Best Practices

Ab best practices samjho:

```typescript
// Pehle kaam karo
// "Ab error state best practices ko samjhte hain"
// "Error handling ko properly implement karna zaroori hai"
// "User experience ko improve karna zaroori hai"
```

**Best practices:**
- **Clear messages** - Clear error messages
- **Recovery options** - Recovery options provide karna
- **User guidance** - User ko guidance dena
- **Logging** - Errors ko log karna

---

## Summary — Doc 5.2 Mein Kya Sikha

✅ **Problem** - Bina error states ke user kaise samjhega ki kya hua?
✅ **Error states ka importance** - Warning sign jaisa, user guidance ke liye zaroori
✅ **Basic error state** - Error ko manage karna
✅ **Error types** - Different errors ko categorize karna
✅ **Error recovery** - Recovery options provide karna

---

## Agla Step — Doc 6.1

**Doc 6.1: Complex App — Naya Project**

Abhi humne error states samjhe. Lekin ab complex app kaise banayenge? Kaise sab features ko combine karenge? Woh samjhenge agle doc mein. 🚀