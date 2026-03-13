# 07 — Conditional Rendering 🎭

## Kya Dikhao, Kya Chhupao?

Real websites pe sab kuch hamesha nahi dikhta:
- User login hai toh "Profile" dikh, nahi toh "Login" dikh
- Data load ho raha hai toh spinner, aa gaya toh data
- Cart empty hai toh message, items hain toh list

Yeh sab **Conditional Rendering** hai — condition ke hisaab se UI dikhana.

---

## Tarika 1 — if/else (Alag Return)

```tsx
interface GreetingProps {
  isLoggedIn: boolean
}

export default function Greeting({ isLoggedIn }: GreetingProps) {
  if (isLoggedIn) {
    return <h2>👋 Wapas aaye! Kya haal hai?</h2>
  } else {
    return <h2>🔐 Pehle login karo yaar!</h2>
  }
}
```

---

## Tarika 2 — Ternary Operator `? :`

JSX ke **andar** `if/else` direct nahi likh sakte — ternary use karte hain:

```tsx
// ❌ JSX ke andar if nahi chalta
<div>
  {if (isLoggedIn) { return "Hello" }}
</div>

// ✅ Ternary use karo
<div>
  {isLoggedIn ? '👋 Welcome Back!' : '🔐 Please Login'}
</div>
```

**Syntax:** `condition ? "agar sahi" : "agar galat"`

---

## Tarika 3 — `&&` Operator

Sirf ek case mein dikhana ho (no else):

```tsx
{isLoggedIn && <button>Logout</button>}
// isLoggedIn true → button dikh
// isLoggedIn false → kuch nahi

{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
// Error hai toh dikhao, nahi toh kuch nahi
```

---

## TypeScript Ka Faida — `null` Check 🔵

TypeScript mein agar tune state `User | null` rakhi hai toh woh tumhe **force karta hai** check karne ke liye — warna error dega.

```tsx
interface User {
  name: string
  email: string
}

const [user, setUser] = useState<User | null>(null)

// ❌ TS Error! user null bhi ho sakta hai, .name directly access nahi kar sakte
<p>{user.name}</p>

// ✅ Pehle check karo
{user && <p>{user.name}</p>}

// Ya if se
if (!user) return <p>No user</p>
return <p>{user.name}</p>  // ab TS jaanta hai user null nahi hai
```

Yeh TypeScript ki ek badi khoobi hai — null pointer errors production mein nahi jaate! 🔥

---

## Teen States Pattern — Loading / Error / Data

Yeh pattern **har jagah** use hota hai jab API se data fetch karo:

```tsx
'use client'
import { useState, useEffect } from 'react'

interface Post {
  id: number
  title: string
  body: string
}

export default function PostViewer() {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((r) => r.json())
      .then((data: Post) => {
        setPost(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Post nahi aaya!')
        setLoading(false)
      })
  }, [])

  // State 1: Loading
  if (loading) {
    return <p style={{ textAlign: 'center', padding: '40px' }}>⏳ Load ho raha hai...</p>
  }

  // State 2: Error
  if (error) {
    return <p style={{ color: 'red', padding: '40px' }}>❌ {error}</p>
  }

  // State 3: Data aa gaya
  // Yahan TypeScript ko pata hai post null nahi hai (upar check ho gaye)
  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{post!.title}</h2>
      <p>{post!.body}</p>
    </div>
  )
}
```

**`post!` kya hai?** — Woh `!` TypeScript ko bolta hai "main guarantee deta hun yeh null nahi hai." Isko **non-null assertion** kehte hain. Tab use karo jab tujhe 100% pata ho.

---

## Mini Project — Login/Logout System 🛠️

```tsx
// app/components/AuthApp.tsx
'use client'

import { useState } from 'react'

interface UserData {
  naam: string
  email: string
}

interface LoginFormProps {
  onLogin: (user: UserData) => void   // ← function type kaise likhte hain
}

interface DashboardProps {
  user: UserData
  onLogout: () => void                // ← koi argument nahi, kuch return nahi
}

// Dashboard — logged in screen
function Dashboard({ user, onLogout }: DashboardProps) {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ fontSize: '60px' }}>👋</div>
      <h2>Wapas aaye, {user.naam}!</h2>
      <p style={{ color: '#666' }}>Email: {user.email}</p>

      <div style={{ margin: '20px 0', padding: '20px', background: '#f0f8ff', borderRadius: '10px' }}>
        <h3>📊 Tumhara Dashboard</h3>
        <p>Modules complete: <strong>7/8</strong> 🎉</p>
      </div>

      <button
        onClick={onLogout}
        style={{ padding: '10px 20px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Logout Karo 🚪
      </button>
    </div>
  )
}

// Login Form — logged out screen
function LoginForm({ onLogin }: LoginFormProps) {
  const [naam, setNaam] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  function handleLogin() {
    if (!naam || !email || !password) {
      setError('Sab fields bhar yaar! 😤')
      return
    }
    if (password.length < 6) {
      setError('Password kam se kam 6 characters ka hona chahiye!')
      return
    }
    setError('')
    onLogin({ naam, email })
  }

  return (
    <div style={{ padding: '40px', maxWidth: '350px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>🔐 Login Karo</h2>

      {error && (
        <p style={{ color: 'red', background: '#fff0f0', padding: '10px', borderRadius: '5px' }}>
          {error}
        </p>
      )}

      <input
        type="text"
        placeholder="Tumhara naam"
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
      />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
      />
      <input
        type="password"
        placeholder="Password (6+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
      />

      <button
        onClick={handleLogin}
        style={{ width: '100%', padding: '12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
      >
        Login ✅
      </button>
    </div>
  )
}

// Main Component
export default function AuthApp() {
  const [user, setUser] = useState<UserData | null>(null)

  return (
    <div>
      {user
        ? <Dashboard user={user} onLogout={() => setUser(null)} />
        : <LoginForm onLogin={(userData) => setUser(userData)} />
      }
    </div>
  )
}
```

### Function Types — Yeh Naya Tha! 🔵

Notice kar `DashboardProps` aur `LoginFormProps` mein:

```tsx
interface LoginFormProps {
  onLogin: (user: UserData) => void
//          ^^^^^^^^^^^^^^    ^^^^
//          parameter type    return type
}

interface DashboardProps {
  onLogout: () => void
//           ^^   ^^^^
//           koi arg nahi   kuch return nahi
}
```

Matlab — agar koi function prop pass karna ho toh uska bhi type likhna padta hai. `(parameter: Type) => ReturnType` — yeh syntax hai.

---

## Aaj Ka Summary

✅ `if/else` — multiple screens ke liye (early return)  
✅ `? :` ternary — JSX ke andar do options  
✅ `&&` — kuch optional dikhana/chhupana  
✅ TypeScript `null` check force karta hai — safe code  
✅ Loading / Error / Data — teen states pattern yaad rakhna  
✅ Function props ka type — `(param: Type) => void`  

---

## Agla Step

**08-mini-project.md** — Aakhri file! Sab concepts ek saath ek **TechBlog website** mein — poora TypeScript ke saath! 🚀
