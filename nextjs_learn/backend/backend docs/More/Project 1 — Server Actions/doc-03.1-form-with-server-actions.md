# Doc 3.1 — Form with Server Actions 📝

## Pehle Problem Samjho — Bina Form Ke Kya Hoga?

Chalo ek scenario socho.

Tumne custom error types samjhe (Doc 2.7). Ab socha "Frontend mein kaise form banayenge?"

Ab **kaun decide karega ki form kaise banana hai?**
**Kaise pata chalega ki kaun form kaun use kar raha hai?**
**Kaise pata chalega ki kaun form kaun submit kar raha hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message form nahi hota, kaise pata chalega ki kaun message kaun bhej raha hai?
- **Instagram** — agar post form nahi hota, kaise pata chalega ki kaun post kaun kar raha hai?
- **Amazon** - agar order form nahi hota, kaise pata chalega ki kaun order kaun kar raha hai?

---

## Form with Server Actions Kya Hota Hai? (Real Life Analogy)

Form with Server Actions ek **order form** jaisa hai:

| Order Form | App Development |
|------------|-----------------|
| Customer    | User |
| Form Fields | Input Fields |
| Submit Button | Submit Action |
| Order Confirmation | Server Response |

Agar order form nahi hota, kaise pata chalega ki kaun order kaun de raha hai? Isliye form zaroori hai.

---

## Hum Kya Sikhenge?

Hum Form with Server Actions sikhenge jisse:

1. **Form create ho** - Form ban jaye
2. **Data submit ho** - Data server ko bheje
3. **Response mile** - Server se response mile

---

## Step 1: Basic Form Structure

Ab basic form structure banate hain:

```typescript
// Pehle kaam karo
import { useState } from 'react'

// "Ab form ka structure banate hain"
export default function TodoForm() {
  // "Ab form state ko manage karne ke liye useState use karte hain"
  const [formData, setFormData] = useState({
    title: '',
    done: false
  })

  // "Ab form submit karne ke liye function banate hain"
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // "Ab form data ko server ko bhejte hain"
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    // "Ab response ko handle karte hain"
    const result = await response.json()
    console.log('Todo created:', result)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter todo title"
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}
```

**Kyun yeh structure?**
- **useState** - Form state manage karne ke liye
- **handleSubmit** - Form submit karne ke liye
- **fetch** - Server ko data bhejne ke liye

---

## Step 2: Form with Server Actions

Ab form with Server Actions banate hain:

```typescript
// Pehle kaam karo
import { useState } from 'react'

// "Ab form ko Server Actions ke saath integrate karte hain"
export default function TodoForm() {
  const [formData, setFormData] = useState({
    title: '',
    done: false
  })

  // "Ab Server Action ko call karte hain"
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      // "Ab Server Action ko call kar rahe hain"
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      // "Ab response ko handle kar rahe hain"
      const result = await response.json()
      console.log('Todo created:', result)
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter todo title"
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}
```

**Advantage:**
- **Type safety** - TypeScript se type checking
- **Error handling** - Error handle karna
- **Simple syntax** - API routes se simple

---

## Step 3: Form Validation

Ab form validation samjho:

```typescript
// Pehle kaam karo
import { useState } from 'react'

// "Ab form validation ko samjhte hain"
export default function TodoForm() {
  const [formData, setFormData] = useState({
    title: '',
    done: false
  })

  const [errors, setErrors] = useState({})

  // "Ab form submit karne se pehle validation check karte hain"
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // "Ab validation check karte hain"
    const newErrors: any = {}
    if (!formData.title) {
      newErrors.title = 'Title is required'
    }

    if (formData.title.length > 100) {
      newErrors.title = 'Title too long'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      // "Ab Server Action ko call kar rahe hain"
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      // "Ab response ko handle kar rahe hain"
      const result = await response.json()
      console.log('Todo created:', result)
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter todo title"
      />
      {errors.title && <p className="error">{errors.title}</p>}
      <button type="submit">Add Todo</button>
    </form>
  )
}
```

**Validation checks:**
- **Required fields** - Mandatory fields check
- **Length validation** - Length check
- **Type validation** - Data type check

---

## Step 4: Form with Loading States

Ab loading states samjho:

```typescript
// Pehle kaam karo
import { useState } from 'react'

// "Ab loading states ko samjhte hain"
export default function TodoForm() {
  const [formData, setFormData] = useState({
    title: '',
    done: false
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // "Ab form submit karne se pehle loading state set karte hain"
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // "Ab validation check karte hain"
    const newErrors: any = {}
    if (!formData.title) {
      newErrors.title = 'Title is required'
    }

    if (formData.title.length > 100) {
      newErrors.title = 'Title too long'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      // "Ab Server Action ko call kar rahe hain"
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      // "Ab response ko handle kar rahe hain"
      const result = await response.json()
      console.log('Todo created:', result)
    } catch (error) {
      console.error('Error creating todo:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter todo title"
      />
      {errors.title && <p className="error">{errors.title}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Add Todo'}
      </button>
    </form>
  )
}
```

**Loading states:**
- **Loading indicator** - Loading show karna
- **Disabled button** - Button disable karna
- **Spinner** - Spinner show karna

---

## Step 5: Form with Error Handling

Ab error handling samjho:

```typescript
// Pehle kaam karo
import { useState } from 'react'

// "Ab error handling ko samjhte hain"
export default function TodoForm() {
  const [formData, setFormData] = useState({
    title: '',
    done: false
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  // "Ab form submit karne se pehle error handling karte hain"
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // "Ab validation check karte hain"
    const newErrors: any = {}
    if (!formData.title) {
      newErrors.title = 'Title is required'
    }

    if (formData.title.length > 100) {
      newErrors.title = 'Title too long'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setFormError('')
    try {
      // "Ab Server Action ko call kar rahe hain"
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      // "Ab response ko handle kar rahe hain"
      const result = await response.json()
      console.log('Todo created:', result)
    } catch (error) {
      console.error('Error creating todo:', error)
      setFormError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter todo title"
      />
      {errors.title && <p className="error">{errors.title}</p>}
      {formError && <p className="form-error">{formError}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Add Todo'}
      </button>
    </form>
  )
}
```

**Error handling:**
- **Form errors** - Form level errors
- **Field errors** - Field level errors
- **Loading states** - Loading states

---

## Summary — Doc 3.1 Mein Kya Sikha

✅ **Problem** - Bina form ke data kaise submit karenge?
✅ **Form with Server Actions ka importance** - Order form jaisa, data submit karne ke liye zaroori
✅ **Basic form structure** - Form ka basic structure
✅ **Form validation** - Data validate karna
✅ **Loading states** - Loading states handle karna

---

## Agla Step — Doc 3.2

**Doc 3.2: Display Todos**

Abhi humne form banaya. Lekin kaise display karenge todos? Kaise show karenge? Woh samjhenge agle doc mein. 🚀