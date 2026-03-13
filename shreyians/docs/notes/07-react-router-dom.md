# 07 — React Router DOM
### Navigation Between Pages in React

---

## 🤔 Wait — React Apps Only Have ONE HTML File?

Yes! That's right. When you build a React app, there's only ONE `index.html` file. So how do you have multiple "pages" like Home, About, Contact?

This is where **React Router DOM** comes in.

React Router lets you show different components based on the URL — without actually loading a new HTML page. This is what's called a **Single Page Application (SPA)**. The page never actually reloads; React just swaps out components based on the URL.

> 💬 The instructor opens `shar.io` (Sheriyans' website) and shows how the URL changes from `/` to `/about` to `/courses` — but the page doesn't do a full browser reload. That's React Router in action.

---

## 📦 Installing React Router DOM

```bash
npm install react-router-dom
```

---

## 🗂️ Setting Up Routes — The Basic Structure

Here's the standard setup for React Router in your `main.jsx`:

```jsx
// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
```

And then in `App.jsx`, you need to tell React Router WHERE to render the child pages:

```jsx
// App.jsx
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />    {/* Navbar stays on every page */}
      <Outlet />    {/* THIS is where the page components get rendered */}
    </div>
  )
}

export default App
```

`<Outlet />` is like a placeholder — it's where the current page's component appears. So when you go to `/about`, the Outlet renders `<About />`. When you go to `/contact`, it renders `<Contact />`. The Navbar stays constant.

---

## 🔗 Navigation Links — `<Link>` and `<NavLink>`

**Don't use regular `<a>` tags for navigation in React!** They cause full page reloads. Use `<Link>` from React Router instead:

```jsx
// ❌ WRONG - causes full page reload
<a href="/about">About</a>

// ✅ CORRECT - React Router handles it, no reload
import { Link } from 'react-router-dom'
<Link to="/about">About</Link>
```

### `<NavLink>` — for navigation menus

`NavLink` is like `Link` but it automatically adds an `active` class when the current URL matches the link. Perfect for navbars:

```jsx
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-800">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-yellow-400 font-bold" : "text-white"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "text-yellow-400 font-bold" : "text-white"
        }
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "text-yellow-400 font-bold" : "text-white"
        }
      >
        Contact
      </NavLink>
    </nav>
  )
}
```

When you're on the `/about` page, the About link automatically gets the `text-yellow-400 font-bold` styling. No extra code needed.

---

## 🔀 Programmatic Navigation — `useNavigate`

Sometimes you need to navigate not from a link click, but from code — like after a form is submitted, redirect to the home page.

```jsx
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // ... login logic
    navigate('/')           // redirect to home
    navigate('/dashboard')  // or wherever
    navigate(-1)            // go back (like browser back button)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form fields */}
      <button type="submit">Login</button>
    </form>
  )
}
```

---

## 📂 Dynamic Routes — URL Parameters

Sometimes you need routes like `/user/1`, `/user/2`, `/product/shoes` — where part of the URL is dynamic.

```jsx
// In your router setup:
{ path: '/user/:id', element: <UserDetail /> }

// In UserDetail.jsx — grab the :id from the URL:
import { useParams } from 'react-router-dom'

function UserDetail() {
  const { id } = useParams()  // gets the :id from the URL

  return <h1>Showing details for user {id}</h1>
}
```

So if the URL is `/user/42`, `id` will be `"42"`. You can then use that `id` to fetch the specific user's data from an API.

---

## 🏗️ Complete Example — Full App with Router

Let's put it all together with a simple 3-page app:

```jsx
// pages/Home.jsx
function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome Home 🏠</h1>
      <p className="text-gray-600 mt-2">This is the home page.</p>
    </div>
  )
}
export default Home
```

```jsx
// pages/About.jsx
function About() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">About Us ℹ️</h1>
      <p className="text-gray-600 mt-2">We are learning React!</p>
    </div>
  )
}
export default About
```

```jsx
// components/Navbar.jsx
import { NavLink } from 'react-router-dom'

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold"
      : "text-white hover:text-gray-300"

  return (
    <nav className="bg-gray-900 flex gap-6 px-8 py-4">
      <NavLink to="/" className={linkStyle}>Home</NavLink>
      <NavLink to="/about" className={linkStyle}>About</NavLink>
    </nav>
  )
}
export default Navbar
```

```jsx
// App.jsx
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
export default App
```

```jsx
// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
```

---

## 🚧 404 — Handling Unknown Routes

What if a user types a URL that doesn't exist? Add an `errorElement`:

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div className="p-8 text-red-500 text-2xl">404 - Page Not Found!</div>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
    ]
  }
])
```

---

## ✅ Quick Summary

| Concept | What to Remember |
|---------|-----------------|
| React Router DOM | Library for navigation in React SPAs |
| `npm install react-router-dom` | How to install |
| `createBrowserRouter` | Creates your route configuration |
| `RouterProvider` | Wraps your app with the router |
| `<Outlet />` | Placeholder where child pages render |
| `<Link to="/path">` | Navigate without page reload |
| `<NavLink>` | Like Link but adds active class automatically |
| `useNavigate()` | Navigate from code (after form submit, etc.) |
| `useParams()` | Get dynamic URL parameters like `/user/:id` |
| `errorElement` | Show for 404 / unknown routes |

---

*Next up → useEffect, useRef, and React Toastify (flash messages)!*
