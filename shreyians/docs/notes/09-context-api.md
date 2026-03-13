# 09 — Context API
### Sharing Data Across Your Whole App Without Props Drilling

---

## 😤 The Problem — Props Drilling Gets Messy

Remember props drilling from File 05? You pass data from parent → child → grandchild → great-grandchild... just to get it to the component that needs it. Every component in between has to receive and pass along data it doesn't even use.

```
App (has userData)
  └── Layout (passes userData down)
        └── Sidebar (passes userData down)
              └── UserProfile (FINALLY uses userData)
```

Layout and Sidebar don't need `userData` at all — they're just middlemen. Imagine doing this for 10 levels deep. Nightmare.

**Context API solves this.** It lets you put data in a "global store" that any component can access directly — no middlemen needed.

```
App (has userData in Context)
  └── Layout
        └── Sidebar
              └── UserProfile (gets userData directly from Context ✅)
```

---

## 🗃️ Understanding Context — The Concept

Think of Context like a **TV broadcast**. The TV station (your Context Provider) broadcasts a signal. Any TV in any house (any component in your app) can tune in and receive that signal — without needing to be directly wired to the station.

The three things you need to understand:
1. **Create** a context (the "broadcast station")
2. **Provide** data through it (start broadcasting)
3. **Consume** the data anywhere (tune in)

---

## 🏗️ Step-by-Step — Building with Context API

### Step 1 — Create the Context file

Create a folder called `context` inside `src`, and inside it create `UserContext.jsx`:

```jsx
// src/context/UserContext.jsx
import { createContext, useState } from 'react'

// 1. Create the context
export const DataContext = createContext()

// 2. Create the Provider component (this wraps your app)
function UserContext({ children }) {
  const [username, setUsername] = useState("Sarthak")
  const [city, setCity] = useState("Bhopal")

  return (
    // 3. Provide the data through "value" prop
    <DataContext.Provider value={{ username, setUsername, city }}>
      {children}
    </DataContext.Provider>
  )
}

export default UserContext
```

Let's break this down:
- `createContext()` creates the broadcast station
- `DataContext.Provider` starts the broadcast — anything inside `value` gets shared
- `{children}` means "render whatever is wrapped inside this component"

### Step 2 — Wrap your App with the Provider

In `main.jsx`, wrap your app with `UserContext`:

```jsx
// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>   {/* ← wraps everything */}
      <App />
    </UserContext>
  </StrictMode>
)
```

Now `App` and every component inside it can access the context data.

### Step 3 — Consume the Context in any component

Now in ANY component, no matter how deep, you can grab the data:

```jsx
// src/components/Header.jsx
import { useContext } from 'react'
import { DataContext } from '../context/UserContext'

function Header() {
  const { username, city } = useContext(DataContext)  // ← tune into the broadcast

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between">
      <h1>My App</h1>
      <p>Welcome, {username} from {city}!</p>
    </header>
  )
}

export default Header
```

```jsx
// src/components/Footer.jsx
import { useContext } from 'react'
import { DataContext } from '../context/UserContext'

function Footer() {
  const data = useContext(DataContext)

  return (
    <footer className="bg-gray-100 p-4 text-center">
      <p>Logged in as: {data.username}</p>
    </footer>
  )
}

export default Footer
```

Both `Header` and `Footer` get the data directly — no props drilling through `App` or any intermediate component!

---

## 🔄 Updating Context Data

You can also pass setter functions through context, so any component can update the shared data:

```jsx
// In UserContext.jsx — already passing setUsername in value:
<DataContext.Provider value={{ username, setUsername, city }}>

// In any component — change the username from anywhere:
import { useContext } from 'react'
import { DataContext } from '../context/UserContext'

function ProfileSettings() {
  const { username, setUsername } = useContext(DataContext)

  return (
    <div>
      <p>Current name: {username}</p>
      <button onClick={() => setUsername("NewName")}>
        Change Name
      </button>
    </div>
  )
}
```

When `setUsername` is called anywhere, ALL components consuming that context automatically re-render with the new value. That's the power!

---

## 🏗️ Complete Example — Header, Section, Footer with Context

```jsx
// src/context/UserContext.jsx
import { createContext, useState } from 'react'

export const DataContext = createContext()

function UserContext({ children }) {
  const userData = {
    username: "Sarthak Sharma",
    age: 22,
    city: "Bhopal"
  }

  return (
    <DataContext.Provider value={userData}>
      {children}
    </DataContext.Provider>
  )
}

export default UserContext
```

```jsx
// src/components/Header.jsx
import { useContext } from 'react'
import { DataContext } from '../context/UserContext'

function Header() {
  const { username } = useContext(DataContext)
  return <header className="bg-blue-600 text-white p-4">Hello, {username}!</header>
}
export default Header
```

```jsx
// src/components/Section.jsx
import { useContext } from 'react'
import { DataContext } from '../context/UserContext'

function Section() {
  const { username, age } = useContext(DataContext)
  return (
    <section className="p-8">
      <p>This is {username}, age {age}</p>
    </section>
  )
}
export default Section
```

```jsx
// src/components/Footer.jsx
import { useContext } from 'react'
import { DataContext } from '../context/UserContext'

function Footer() {
  const { city } = useContext(DataContext)
  return <footer className="bg-gray-200 p-4 text-center">Location: {city}</footer>
}
export default Footer
```

```jsx
// src/App.jsx
import Header from './components/Header'
import Section from './components/Section'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <Section />
      <Footer />
    </>
  )
}
export default App
```

All three components get their data directly from context. No props. No drilling. Clean!

---

## 🧠 When to Use Context vs Props

Context isn't always the answer. Here's a simple guide:

| Situation | Use |
|-----------|-----|
| Data needed by 1-2 nearby components | Props |
| Data needed by many components at different levels | Context |
| Global app data (user info, theme, language) | Context |
| Simple parent → child data | Props |
| Data that changes often, many consumers | Context (or Redux) |

> 💡 Common real-world uses for Context: logged-in user info, dark/light theme, language/locale, shopping cart data.

---

## ✅ Quick Summary

| Concept | What to Remember |
|---------|-----------------|
| Context API | Share data globally without props drilling |
| `createContext()` | Creates the context object |
| `<Context.Provider value={...}>` | Provides data to all children |
| `useContext(ContextName)` | Reads data from the context |
| `children` prop | Renders whatever is wrapped inside the Provider |
| Can pass functions too | Pass setters to let any component update context data |

---

*Next up → Redux Toolkit and Framer Motion: a quick intro to both!*
