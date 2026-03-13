# 06 — Lists & Keys 🗂️

## Problem — Array Data Kaise Dikhaaen?

Maan le tere paas 5 dosto ke naam hain:

```tsx
const dost = ['Ali', 'Rahul', 'Priya', 'Sara', 'Ravi']
```

HTML mein tu manually likhta:

```html
<ul>
  <li>Ali</li>
  <li>Rahul</li>
  ...
</ul>
```

100 items hote toh 100 lines. Aur agar backend se dynamic data aaye — phir? 😩

**React ka solution = `.map()`**

---

## `.map()` — Har Item Ko Transform Karo

JavaScript ka `.map()` array ke har item pe kaam karta hai aur naya array return karta hai.

```tsx
const dost = ['Ali', 'Rahul', 'Priya']

return (
  <ul>
    {dost.map((naam) => (
      <li key={naam}>{naam}</li>
    ))}
  </ul>
)
```

---

## Keys Kya Hoti Hain?

Bina `key` ke console mein warning aayegi:

```
Warning: Each child in a list should have a unique "key" prop.
```

**React ko keys kyun chahiye?**

Jab list update hoti hai — React decide karta hai ki kaunsa item change hua, kaunsa nahi. Keys se woh efficiently karta hai.

```tsx
// ❌ Key nahi — warning
dost.map((naam) => <li>{naam}</li>)

// ✅ Key hai — sahi
dost.map((naam) => <li key={naam}>{naam}</li>)
```

**Key unique honi chahiye** — ideally koi `id` use karo, plain index avoid karo.

---

## TypeScript Mein Typed Arrays 🔵

TypeScript mein array ka type define karte hain taaki pata chale andar kya hai.

```tsx
// String array
const dost: string[] = ['Ali', 'Rahul', 'Priya']

// Number array
const marks: number[] = [95, 87, 76]

// Object array — interface ke saath
interface Product {
  id: number
  naam: string
  price: number
  emoji: string
}

const products: Product[] = [
  { id: 1, naam: 'Laptop', price: 50000, emoji: '💻' },
  { id: 2, naam: 'Phone', price: 25000, emoji: '📱' },
]
```

### State Mein Typed Array

```tsx
// useState mein bhi type lagao
const [products, setProducts] = useState<Product[]>([])
//                                       ^^^^^^^^^ array of Product objects
```

---

## Objects Ki List — Real World

```tsx
// app/components/ProductList.tsx

interface Product {
  id: number
  naam: string
  price: number
  emoji: string
}

const products: Product[] = [
  { id: 1, naam: 'Laptop', price: 50000, emoji: '💻' },
  { id: 2, naam: 'Phone', price: 25000, emoji: '📱' },
  { id: 3, naam: 'Headphones', price: 3000, emoji: '🎧' },
  { id: 4, naam: 'Keyboard', price: 2000, emoji: '⌨️' },
]

export default function ProductList() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 Products</h2>
      {products.map((product) => (
        <div
          key={product.id}
          style={{ border: '1px solid #ddd', padding: '12px', margin: '8px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}
        >
          <span>{product.emoji} {product.naam}</span>
          <strong style={{ color: 'green' }}>₹{product.price}</strong>
        </div>
      ))}
    </div>
  )
}
```

Notice kar — `.map()` ke andar `product.naam` likhte waqt **auto-complete** aa rahi hai kyunki TypeScript ko pata hai `Product` interface mein kya fields hain! 🔥

---

## `.filter()` — List Ko Filter Karo

Sirf woh items dikhao jo condition match karte hain:

```tsx
const saste = products.filter((p) => p.price < 5000)
// TypeScript automatically jaanta hai result bhi Product[] hai ✅
```

---

## Mini Project — Dynamic Todo List 🛠️

```tsx
// app/components/TodoApp.tsx
'use client'

import { useState } from 'react'

interface Todo {
  id: number
  text: string
  done: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Next.js seekhna', done: false },
    { id: 2, text: 'TypeScript basics khatam karna', done: true },
    { id: 3, text: 'Ek project banana', done: false },
  ])
  const [newTodo, setNewTodo] = useState<string>('')

  function addTodo() {
    if (!newTodo.trim()) return
    const todo: Todo = { id: Date.now(), text: newTodo, done: false }
    setTodos([...todos, todo])
    setNewTodo('')
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const pendingCount = todos.filter((t) => !t.done).length

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>📝 Mera Todo List</h2>
      <p style={{ color: '#888' }}>{pendingCount} kaam baaki hain</p>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Kya karna hai?"
          style={{ flex: 1, padding: '8px', borderRadius: '5px 0 0 5px', border: '1px solid #ddd' }}
        />
        <button
          onClick={addTodo}
          style={{ padding: '8px 16px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '0 5px 5px 0', cursor: 'pointer' }}
        >
          Add ✅
        </button>
      </div>

      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            marginBottom: '8px',
            background: todo.done ? '#f0fff0' : '#fff',
            border: '1px solid #eee',
            borderRadius: '8px'
          }}
        >
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
            style={{ marginRight: '10px', cursor: 'pointer' }}
          />
          <span style={{
            flex: 1,
            textDecoration: todo.done ? 'line-through' : 'none',
            color: todo.done ? '#aaa' : '#333'
          }}>
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red', fontSize: '18px' }}
          >
            🗑️
          </button>
        </div>
      ))}

      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#aaa' }}>
          🎉 Sab kaam ho gaya! Aaram karo.
        </p>
      )}
    </div>
  )
}
```

TypeScript ka faida yahan — `toggleTodo(id: number)` mein `id` string doge toh TS turant error dega! 🎯

---

## Aaj Ka Summary

✅ `.map()` se array ko JSX mein convert karte hain  
✅ Har item ko `key` prop dena zaroori hai  
✅ TypeScript mein `interface[]` se typed array banate hain  
✅ `useState<Todo[]>([])` — typed state array  
✅ `.filter()` ka result bhi automatically typed hota hai  
✅ Auto-complete milti hai — TypeScript jaanta hai object mein kya hai  

---

## Agla Step

**07-conditional-rendering.md** — Kya dikhao kya chhupao? Loading, Error, Data — TypeScript ke saath teeno states properly handle karenge! 🎭
