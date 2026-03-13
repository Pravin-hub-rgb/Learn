# 08 — Hooks Deep Dive
### useEffect (Lifecycle), useRef (DOM Events), and React Toastify (Flash Messages)

---

## 🔁 useEffect — Understanding Lifecycle

We used `useEffect` briefly in File 06 for fetching API data. Now let's understand it properly.

Every React component has a **lifecycle** — it gets born (mounts), lives (updates), and dies (unmounts). `useEffect` lets you run code at each of these stages.

> 💬 The instructor explains it with a nice analogy: "Imagine a clock. The clock has a role on your website — it shows the time. It appears, ticks for 5 minutes, and then you navigate to another page — it disappears. That's mounting, living, and unmounting."

---

## ⏰ The Three Modes of useEffect

### Mode 1 — Run once on mount (most common)

```jsx
useEffect(() => {
  console.log("Component appeared on screen!")
  // Perfect for: fetching data, setting up subscriptions
}, [])  // empty [] = runs only when component first appears
```

### Mode 2 — Run when a value changes

```jsx
useEffect(() => {
  console.log("username changed to:", username)
  // Perfect for: reacting to state/prop changes
}, [username])  // runs whenever 'username' changes
```

### Mode 3 — Run on every render

```jsx
useEffect(() => {
  console.log("Component re-rendered!")
  // Usually avoid this — can cause performance issues
})  // no array at all = runs on every render
```

---

## 🧹 Cleanup Function — When Component Unmounts

Sometimes when a component disappears (unmounts), you need to clean up after it — like stopping a timer or cancelling a subscription. You do this by returning a function from useEffect:

```jsx
useEffect(() => {
  // Set up something
  const timer = setInterval(() => {
    console.log("Tick!")
  }, 1000)

  // Clean up when component unmounts
  return () => {
    clearInterval(timer)
    console.log("Component removed, timer cleared!")
  }
}, [])
```

The returned function runs when the component is removed from the screen. Without cleanup, you'd have timers running forever even after the component is gone — a **memory leak**.

---

## 🏗️ useEffect Real-World Patterns

### Pattern 1 — Fetch data on load (from File 06):

```jsx
useEffect(() => {
  fetchData()
}, [])
```

### Pattern 2 — Search as user types:

```jsx
const [search, setSearch] = useState("")
const [results, setResults] = useState([])

useEffect(() => {
  if (search.length === 0) return  // don't search if empty

  const fetchResults = async () => {
    const res = await axios.get(`https://api.example.com/search?q=${search}`)
    setResults(res.data)
  }

  fetchResults()
}, [search])  // re-runs every time 'search' changes
```

Every time the user types, `search` updates, useEffect fires, and new results load. This is how live search works!

### Pattern 3 — Update page title:

```jsx
useEffect(() => {
  document.title = `You have ${messages} messages`
}, [messages])  // updates browser tab title whenever messages count changes
```

---

## 🎯 useRef — Accessing DOM Elements Directly

There are rare times in React when you need to directly interact with a DOM element — like:
- Focusing an input field automatically
- Getting the scroll position
- Playing/pausing a video
- Measuring element size

For these cases, React gives us **useRef**.

```jsx
import { useRef } from 'react'

function App() {
  const inputRef = useRef(null)  // create a ref, initially null

  const focusInput = () => {
    inputRef.current.focus()  // directly call .focus() on the input
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="I'll get focused" />
      <button onClick={focusInput}>Click to Focus Input</button>
    </div>
  )
}
```

`inputRef.current` gives you direct access to the actual DOM element. It's like `document.querySelector()` but the React way.

> 💡 **Important:** `useRef` doesn't cause re-renders when it changes. It's just a way to hold a reference to something — either a DOM element or any value you want to persist across renders without triggering a re-render.

### Another useRef use case — storing previous value:

```jsx
const [count, setCount] = useState(0)
const prevCount = useRef(0)

useEffect(() => {
  prevCount.current = count  // save current count before it changes
})

return (
  <div>
    <p>Current: {count}</p>
    <p>Previous: {prevCount.current}</p>
    <button onClick={() => setCount(count + 1)}>Add</button>
  </div>
)
```

---

## 🍞 React Toastify — Flash Messages

**React Toastify** is a library that shows those nice little pop-up notification messages — like "Login successful!", "Error!", "Item added to cart!". The instructor shows this briefly as a real-world tool you'll use.

### Installing:

```bash
npm install react-toastify
```

### Setting up — add to your main App component:

```jsx
// App.jsx
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'  // don't forget the CSS!

function App() {
  return (
    <div>
      {/* your app content */}
      <ToastContainer />  {/* put this once, anywhere in your app */}
    </div>
  )
}
```

### Showing toasts:

```jsx
import { toast } from 'react-toastify'

// Different types of toasts:
toast("Basic message")
toast.success("Login successful! ✅")
toast.error("Something went wrong! ❌")
toast.warning("Please fill all fields! ⚠️")
toast.info("New update available! ℹ️")
```

### Customizing position:

```jsx
// In ToastContainer:
<ToastContainer position="top-right" />     // default
<ToastContainer position="top-center" />
<ToastContainer position="bottom-right" />
<ToastContainer position="bottom-center" />
```

### Real-world example — toast on form submit:

```jsx
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email!")
      return
    }

    if (!email.includes("@")) {
      toast.warning("Please enter a valid email!")
      return
    }

    toast.success("Form submitted successfully! 🎉")
    setEmail("")
  }

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}
```

`autoClose={3000}` means the toast disappears after 3 seconds. You can also set it to `false` to make it stay until the user closes it.

---

## ✅ Quick Summary

| Concept | What to Remember |
|---------|-----------------|
| `useEffect(() => {}, [])` | Runs once when component mounts |
| `useEffect(() => {}, [val])` | Runs when `val` changes |
| `useEffect(() => {})` | Runs on every render (use rarely) |
| Cleanup function | Return a function from useEffect to run on unmount |
| `useRef(null)` | Creates a reference — doesn't cause re-renders |
| `ref.current` | Access the actual DOM element |
| React Toastify | Library for pop-up notifications |
| `<ToastContainer />` | Place once in your app |
| `toast.success()` / `toast.error()` | Show different styled notifications |

---

*Next up → Context API: sharing data across your whole app without props drilling!*
