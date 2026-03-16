# Doc 3.2 — Display Todos 📋

## Pehle Problem Samjho — Bina Display Ke Kya Hoga?

Chalo ek scenario socho.

Tumne form banaya (Doc 3.1). Ab socha "Todo kaise dikhayenge?"

Ab **kaun decide karega ki todo kaise dikhana hai?**
**Kaise pata chalega ki kaun todo kaun sa hai?**
**Kaise pata chalega ki kaun todo kaun si hai?**

Sab kuch manually karna padega — aur yeh bahut time waste hoga.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar message display karne ka tarika nahi hota, kaise pata chalega ki kaun message kisne bheja?
- **Instagram** — agar post display karne ka tarika nahi hota, kaise pata chalega ki kaun post kisne kiya?
- **Amazon** — agar product display karne ka tarika nahi hota, kaise pata chalega ki kaun product kis category mein aata hai?

---

## Display Todos Kya Hota Hai? (Real Life Analogy)

Display Todos ek **notice board** jaisa hai:

| Notice Board | App Development |
|--------------|-----------------|
| Notice        | Todo Item |
| Pin           | Display Component |
| Board          | UI Container |
| Updates        | Data Refresh |

Agar notice board nahi hota, kaise pata chalega ki kaun notice kaun dekh raha hai? Isliye board zaroori hai.

---

## Hum Kya Sikhenge?

Hum Display Todos sikhenge jisse:

1. **Todos display ho** - Sab todos show ho
2. **Data refresh ho** - Data automatically update ho
3. **UI responsive rahe** - UI smoothly work kare

---

## Step 1: Basic Display Structure

Ab basic display structure banate hain:

```typescript
// Pehle kaam karo
// "Ab display ka structure banate hain"
// "Display ke liye useState use karte hain"
// "Todos ko manage karne ke liye useState zaroori hai"
```

**Kyun yeh structure?**
- **useState** - Todos ko manage karne ke liye
- **todos** - Todos ko store karne ke liye
- **setTodos** - Data ko update karne ke liye

---

## Step 2: Data Fetch Karo

Ab data fetch karte hain:

```typescript
// Pehle kaam karo
// "Ab data fetch karna hai — iske liye useEffect use karte hain"
// "useEffect se data fetch kar sakte hain"
// "Data ko await karna padta hai"
```

**Kyun yeh approach?**
- **useEffect** - Data fetch karne ke liye
- **fetch** - Data ko server se lana
- **await** - Async operation handle karna

---

## Step 3: Data Display Karo

Ab data display karte hain:

```typescript
// Pehle kaam karo
// "Ab data display karna hai"
// "Todos ko map karke display karte hain"
// "Har todo ka alag li element banata hai"
```

**Kyun yeh syntax?**
- **map** - Data ko iterate karne ke liye
- **key** - Unique identifier ke liye
- **li element** - List item ke liye

---

## Step 4: Complete Display Function

Ab complete function banate hain:

```typescript
// Pehle kaam karo
// "Ab complete function banate hain"
// "Sab steps ko mila kar ek function banate hain"
// "Error handling bhi add karte hain"
```

**Complete function:**
```typescript
export default function TodoList() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch('/api/todos')
        const data = await response.json()
        setTodos(data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }
    fetchTodos()
  }, [])

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

## Step 5: Toggle Functionality Add Karo

Ab toggle functionality add karte hain:

```typescript
// Pehle kaam karo
// "Ab toggle functionality add karte hain"
// "Toggle ke liye PATCH request use karte hain"
// "Status ko update karne ke liye PATCH method use karte hain"
```

**Toggle approach:**
- **PATCH request** - Status update karne ke liye
- **toggleTodo function** - Status ko toggle karne ke liye
- **State update** - UI ko update karne ke liye

---

## Step 6: Complete Display with Toggle

Ab complete display with toggle banate hain:

```typescript
// Pehle kaam karo
// "Ab complete display with toggle banate hain"
// "Sab steps ko mila kar ek function banate hain"
// "Toggle functionality, error handling, sab add karte hain"
```

**Complete function:**
```typescript
export default function TodoList() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch('/api/todos')
        const data = await response.json()
        setTodos(data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }
    fetchTodos()
  }, [])

  async function toggleTodo(id: string) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: !todos.find(t => t.id === id)?.done })
      })

      const updatedTodo = await response.json()
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ))
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.done ? 'Done' : 'Pending'}
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.done ? 'Undo' : 'Done'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Step 7: Delete Functionality Add Karo

Ab delete functionality add karte hain:

```typescript
// Pehle kaam karo
// "Ab delete functionality add karte hain"
// "Delete ke liye DELETE request use karte hain"
// "Data ko permanently remove karne ke liye DELETE method use karte hain"
```

**Delete approach:**
- **DELETE request** - Data delete karne ke liye
- **deleteTodo function** - Data ko delete karne ke liye
- **State update** - UI ko update karne ke liye

---

## Step 8: Complete Display with Delete

Ab complete display with delete banate hain:

```typescript
// Pehle kaam karo
// "Ab complete display with delete banate hain"
// "Sab steps ko mila kar ek function banate hain"
// "Delete functionality, error handling, sab add karte hain"
```

**Complete function:**
```typescript
export default function TodoList() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch('/api/todos')
        const data = await response.json()
        setTodos(data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }
    fetchTodos()
  }, [])

  async function toggleTodo(id: string) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: !todos.find(t => t.id === id)?.done })
      })

      const updatedTodo = await response.json()
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ))
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  async function deleteTodo(id: string) {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      })

      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.done ? 'Done' : 'Pending'}
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.done ? 'Undo' : 'Done'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Summary — Doc 3.2 Mein Kya Sikha

✅ **Problem** - Bina display ke todos kaise dikhayenge?
✅ **Display Todos ka importance** - Notice board jaisa, data show karne ke liye zaroori
✅ **Basic display structure** - Todos ko display karne ka basic structure
✅ **Toggle functionality** - Status ko toggle karna
✅ **Delete functionality** - Data ko delete karna

---

## Agla Step — Doc 4.1

**Doc 4.1: Deploy on Vercel**

Abhi humne display karna sikha. Lekin kaise deploy karenge? Kaise live karenge? Woh samjhenge agle doc mein. 🚀