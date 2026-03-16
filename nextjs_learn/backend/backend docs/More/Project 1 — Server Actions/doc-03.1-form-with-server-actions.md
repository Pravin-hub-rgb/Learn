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
// "Ab form ka structure banate hain"
// "Form ke liye useState use karte hain"
// "Form state ko manage karne ke liye useState zaroori hai"
```

**Kyun yeh structure?**
- **useState** - Form state manage karne ke liye
- **formData** - Form data ko store karne ke liye
- **setFormData** - Data ko update karne ke liye

---

## Step 2: Form Fields Banate Hain

Ab form fields banate hain:

```typescript
// Pehle kaam karo
// "Ab form fields banate hain"
// "Input fields ke liye type="text" use karte hain"
// "Value aur onChange ka use zaroori hai"
```

**Kyun yeh approach?**
- **type="text"** - Text input ke liye
- **value** - Current value ko show karta hai
- **onChange** - Data ko update karta hai

---

## Step 3: Form Submit Karo

Ab form submit karte hain:

```typescript
// Pehle kaam karo
// "Ab form submit karna hai — iske liye handleSubmit function banate hain"
// "handleSubmit function form submit ko handle karta hai"
// "e.preventDefault() se page refresh nahi hota"
```

**Kyun yeh structure?**
- **handleSubmit** - Form submit ko handle karta hai
- **e.preventDefault()** - Page refresh ko prevent karta hai
- **async function** - Async operation handle karta hai

---

## Step 4: Server Actions Ko Call Karo

Ab Server Actions ko call karte hain:

```typescript
// Pehle kaam karo
// "Ab Server Actions ko call karna hai"
// "fetch se data server ko bhejte hain"
// "POST method se data create karte hain"
```

**Kyun yeh approach?**
- **fetch** - Data ko server ko bhejta hai
- **POST method** - Data create karne ke liye
- **JSON.stringify** - Data ko string format mein convert karta hai

---

## Step 5: Response Handle Karo

Ab response handle karte hain:

```typescript
// Pehle kaam karo
// "Ab response ko handle karna hai"
// "Response ko await karke data nikalte hain"
// "Response ko console.log se dekh sakte hain"
```

**Kyun yeh structure?**
- **await response.json()** - Data ko parse karta hai
- **console.log** - Data ko display karta hai
- **Error handling** - Errors ko handle karta hai

---

## Step 6: Complete Form Function

Ab complete function banate hain:

```typescript
// Pehle kaam karo
// "Ab complete function banate hain"
// "Sab steps ko mila kar ek function banate hain"
// "Error handling bhi add karte hain"
```

**Complete function:**
```typescript
export default function TodoForm() {
  const [formData, setFormData] = useState({
    title: '',
    done: false
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      // Data ko server ko bhejo
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      // Response ko handle karo
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

---

## Step 7: Form Validation Add Karo

Ab form validation add karte hain:

```typescript
// Pehle kaam karo
// "Ab form validation add karte hain"
// "Validation ke liye errors state use karte hain"
// "Validation check karke errors display karte hain"
```

**Validation approach:**
- **errors state** - Errors ko store karne ke liye
- **Validation checks** - Required fields check karna
- **Error display** - Errors ko display karna

---

## Step 8: Complete Form with Validation

Ab complete form with validation banate hain:

```typescript
// Pehle kaam karo
// "Ab complete form with validation banate hain"
// "Sab steps ko mila kar ek function banate hain"
// "Validation, error handling, sab add karte hain"
```

**Complete function:**
```typescript
export default function TodoForm() {
  const [formData, setFormData] = useState({
    title: '',
    done: false
  })
  const [errors, setErrors] = useState({})

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validation check karo
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
      // Data ko server ko bhejo
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      // Response ko handle karo
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

---

## Summary — Doc 3.1 Mein Kya Sikha

✅ **Problem** - Bina form ke data kaise submit karenge?
✅ **Form with Server Actions ka importance** - Order form jaisa, data submit karne ke liye zaroori
✅ **Basic form structure** - Form ka basic structure
✅ **Form validation** - Data validate karna
✅ **Server Actions call** - Data ko server ko bhejna

---

## Agla Step — Doc 3.2

**Doc 3.2: Display Todos**

Abhi humne form banaya. Lekin kaise display karenge todos? Kaise show karenge? Woh samjhenge agle doc mein. 🚀