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
import { useState, useEffect } from 'react'

// "Ab display ka structure banate hain"
export default function TodoList() {
  // "Ab todos ko manage karne ke liye useState use karte hain"
  const [todos, setTodos] = useState([])

  // "Ab todos ko fetch karne ke liye useEffect use karte hain"
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch('/api/todos')
      const data = await response.json()
      setTodos(data)
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

**Kyun yeh structure?**
- **useState** - Todos ko manage karne ke liye
- **useEffect** - Data fetch karne ke liye
- **map** - Todos ko display karne ke liye

---

## Step 2: Display with Server Actions

Ab display with Server Actions banate hain:

```typescript
// Pehle kaam karo
import { useState, useEffect } from 'react'

// "Ab display ko Server Actions ke saath integrate karte hain"
export default function TodoList() {
  const [todos, setTodos] = useState([])

  // "Ab todos ko fetch karne ke liye useEffect use karte hain"
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch('/api/todos')
      const data = await response.json()
      setTodos(data)
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

**Advantage:**
- **Type safety** - TypeScript se type checking
- **Error handling** - Error handle karna
- **Simple syntax** - API routes se simple

---

## Step 3: Display with Toggle Functionality

Ab toggle functionality samjho:

```typescript
// Pehle kaam karo
import { useState, useEffect } from 'react'

// "Ab toggle functionality ko samjhte hain"
export default function TodoList() {
  const [todos, setTodos] = useState([])

  // "Ab todos ko fetch karne ke liye useEffect use karte hain"
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch('/api/todos')
      const data = await response.json()
      setTodos(data)
    }
    fetchTodos()
  }, [])

  // "Ab toggle function banate hain"
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

**Toggle functionality:**
- **PATCH request** - Status update karne ke liye
- **State update** - UI ko update karne ke liye
- **Error handling** - Error handle karne ke liye

---

## Step 4: Display with Delete Functionality

Ab delete functionality samjho:

```typescript
// Pehle kaam karo
import { useState, useEffect } from 'react'

// "Ab delete functionality ko samjhte hain"
export default function TodoList() {
  const [todos, setTodos] = useState([])

  // "Ab todos ko fetch karne ke liye useEffect use karte hain"
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch('/api/todos')
      const data = await response.json()
      setTodos(data)
    }
    fetchTodos()
  }, [])

  // "Ab toggle function banate hain"
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

  // "Ab delete function banate hain"
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

**Delete functionality:**
- **DELETE request** - Data delete karne ke liye
- **State update** - UI ko update karne ke liye
- **Error handling** - Error handle karne ke liye

---

## Step 5: Display with Real-time Updates

Ab real-time updates samjho:

```typescript
// Pehle kaam karo
import { useState, useEffect } from 'react'

// "Ab real-time updates ko samjhte hain"
export default function TodoList() {
  const [todos, setTodos] = useState([])

  // "Ab todos ko fetch karne ke liye useEffect use karte hain"
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch('/api/todos')
      const data = await response.json()
      setTodos(data)
    }
    fetchTodos()
  }, [])

  // "Ab real-time updates ke liye polling use karte hain"
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTodos()
    }, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [])

  // "Ab toggle function banate hain"
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

  // "Ab delete function banate hain"
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

**Real-time updates:**
- **Polling** - Data ko regular interval pe fetch karna
- **State update** - UI ko automatically update karna
- **Error handling** - Error handle karna

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