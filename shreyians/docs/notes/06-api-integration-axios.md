# 06 — API Integration
### Fetching Real Data with Axios and useEffect

---

## 🌐 What is an API?

An **API** (Application Programming Interface) is basically a way for your app to talk to a server and get data.

Think of it like a restaurant:
- You (the React app) are the customer
- The waiter (API) takes your order
- The kitchen (server/database) prepares the food (data)
- The waiter brings it back to you

In real apps, things like weather data, user lists, products, posts — all of this comes from APIs. Your React app asks for it, the server sends it back as **JSON data**, and you display it.

---

## 📦 What is Axios?

You could fetch data using the browser's built-in `fetch()` function. But **Axios** is a popular library that makes it even easier — better error handling, cleaner syntax, and it works the same way in all browsers.

### Installing Axios:

```bash
npm install axios
```

### Basic Axios usage:

```js
import axios from 'axios'

// GET request (fetching data)
const response = await axios.get('https://api.example.com/users')
console.log(response.data)  // the actual data is in response.data
```

> 💡 Notice `response.data` — Axios automatically parses the JSON for you, and the actual data is always in `.data`. With regular `fetch()`, you'd have to manually call `.json()`. Axios just handles it.

---

## ⏳ async/await (Quick Refresher)

API calls take time — the server needs to respond. We use `async/await` to handle this:

```js
// Without async/await (using .then):
axios.get(url).then(response => {
  console.log(response.data)
})

// With async/await (cleaner):
const getData = async () => {
  const response = await axios.get(url)
  console.log(response.data)
}
```

`await` pauses the function until the API responds. `async` marks the function as one that contains `await`.

---

## 🔄 useEffect — Running Code at the Right Time

Here's the problem: you want to fetch data when the component loads. But if you just call your fetch function directly inside the component, it runs on every re-render — which can cause infinite loops and other issues.

This is where **useEffect** comes in. It lets you run code at specific times — like when the component first appears on screen.

```jsx
import { useEffect } from 'react'

useEffect(() => {
  // code here runs after the component renders
  console.log("Component loaded!")
}, [])  // the empty [] means: run ONLY ONCE when component first loads
```

The second argument `[]` is the **dependency array**:
- `[]` empty → runs once when component mounts (appears on screen)
- `[someValue]` → runs whenever `someValue` changes
- No array → runs on every single render (usually not what you want)

---

## 🏗️ Putting It Together — Fetching API Data

Here's the full pattern you'll use in almost every real React project:

```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])        // store fetched data
  const [loading, setLoading] = useState(true) // show loading state

  const getData = async () => {
    try {
      const response = await axios.get('https://picsum.photos/v2/list')
      setData(response.data)   // save data to state
      setLoading(false)        // hide loading
    } catch (error) {
      console.log("Error fetching data:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()  // call fetch function when component loads
  }, [])       // empty [] = only on first load

  if (loading) return <h2>Loading...</h2>

  return (
    <div className="p-4">
      {data.map((item) => (
        <div key={item.id} className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg mb-3">
          <img
            src={item.download_url}
            alt={item.author}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{item.author}</h3>
            <p className="text-sm text-gray-500">ID: {item.id}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
```

> 💬 The instructor uses `https://picsum.photos/v2/list` as an example — it's a free API that returns a list of photos with author info. Great for practicing!

Let's trace through what happens:
1. Component renders — `data` is `[]`, `loading` is `true`
2. Screen shows "Loading..."
3. `useEffect` runs → calls `getData()`
4. `getData()` sends GET request to the API
5. Response comes back — `setData(response.data)` fills state with data
6. `setLoading(false)` hides the loader
7. React re-renders — now `data` has stuff → renders all cards

---

## 🛡️ try/catch for Error Handling

Always wrap your API calls in `try/catch`. Networks fail. APIs go down. Without error handling, your app just breaks silently.

```jsx
const getData = async () => {
  try {
    const response = await axios.get(url)
    setData(response.data)
  } catch (error) {
    console.log("Something went wrong:", error.message)
    // you could also setError(error.message) and show it to the user
  }
}
```

---

## 🔃 Different Types of Requests

Axios can do more than just GET:

```js
// GET — fetch data
const res = await axios.get('/api/users')

// POST — send data (like submitting a form)
const res = await axios.post('/api/users', {
  name: 'Sarthak',
  email: 'sarthak@example.com'
})

// PUT — update existing data
const res = await axios.put('/api/users/1', { name: 'Updated Name' })

// DELETE — delete data
const res = await axios.delete('/api/users/1')
```

For now, `GET` and `POST` are the most important ones.

---

## 📊 Displaying the Fetched Data in a Component

Following the pattern from File 05, let's render the API data using a separate card component:

```jsx
// UserCard.jsx
function UserCard({ author, download_url }) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow mb-3">
      <img
        src={download_url}
        alt={author}
        className="h-14 w-14 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold">{author}</h3>
    </div>
  )
}

export default UserCard
```

```jsx
// App.jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import UserCard from './UserCard'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('https://picsum.photos/v2/list')
      setUsers(res.data)
    }
    fetchUsers()
  }, [])

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  )
}
```

---

## ✅ Quick Summary

| Concept | What to Remember |
|---------|-----------------|
| API | A way to get data from a server |
| Axios | Library for making HTTP requests |
| `npm install axios` | How to install it |
| `axios.get(url)` | Fetches data from a URL |
| `response.data` | The actual data (Axios wraps it) |
| `useEffect(() => {}, [])` | Runs code once when component loads |
| Dependency array `[]` | Controls WHEN useEffect runs |
| `async/await` | Handle waiting for API responses |
| `try/catch` | Always wrap API calls for error handling |
| Loading state | Show "Loading..." while waiting for data |

---

*Next up → Navigation between pages with React Router DOM!*
