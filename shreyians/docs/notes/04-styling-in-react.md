# 04 — Styling in React
### Normal CSS, CSS Modules, and Tailwind CSS

---

## 🎨 Three Ways to Style in React

In React, you have a few different ways to add styles. The instructor covers two main ones — **normal CSS** and **Tailwind CSS**. Let's go through all of them so you understand when to use which.

---

## 1️⃣ Normal CSS (The Simple Way)

This is the most straightforward approach. You write a `.css` file and import it into your component.

### How to do it:

Create a file called `App.css`:
```css
/* App.css */
.container {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
}

.title {
  color: navy;
  font-size: 24px;
}

button {
  background-color: lightgreen;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

Then import it in your component:
```jsx
// App.jsx
import './App.css'   // just import it — no need to store it in a variable

function App() {
  return (
    <div className="container">
      <h1 className="title">Hello React!</h1>
      <button>Click me</button>
    </div>
  )
}
```

> 💡 Remember — it's `className` in JSX, not `class`. If you write `class`, you'll get a warning and things might not work right.

### Inline styles in JSX:

You can also write styles directly on an element — but the syntax is a bit different from HTML:

```jsx
// HTML style: <div style="color: red; font-size: 20px">
// JSX style:
<div style={{ color: 'red', fontSize: '20px' }}>Hello</div>
```

Notice:
- Double curly braces `{{ }}` — outer `{}` is for JavaScript expression, inner `{}` is the style object
- Property names are **camelCase**: `fontSize` not `font-size`, `backgroundColor` not `background-color`
- Values are **strings**: `'red'`, `'20px'`

---

## 2️⃣ CSS Modules (Scoped CSS)

One problem with normal CSS: if you have `.title` in multiple files, they can clash and override each other. **CSS Modules** solve this by making styles local to each component.

### How to use CSS Modules:

Name your file with `.module.css`:
```css
/* Card.module.css */
.card {
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
}
```

Import and use it:
```jsx
// Card.jsx
import styles from './Card.module.css'

function Card() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Card Title</h2>
    </div>
  )
}
```

Behind the scenes, CSS Modules converts `.card` into something like `.Card_card__abc123` — a unique class name that won't clash with anything else. Clean!

---

## 3️⃣ Tailwind CSS (The Modern Way)

Tailwind is what most modern React developers use today. Instead of writing CSS files, you apply **utility classes** directly in your JSX.

> 💬 The instructor says: "I write Tailwind with some laziness but I always recommend it because once you get used to it, you style incredibly fast."

### Setting up Tailwind in a Vite project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then in `tailwind.config.js`, update the content array:
```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

Add to your `index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Restart your dev server. Tailwind is ready!

### Using Tailwind — it's just classes:

```jsx
function Card() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Card Title</h2>
      <p className="text-gray-500">Some description here</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3 hover:bg-blue-600">
        Click me
      </button>
    </div>
  )
}
```

### Common Tailwind classes (quick reference):

| What you want | Tailwind class |
|---------------|---------------|
| Background color | `bg-red-500`, `bg-white`, `bg-gray-100` |
| Text color | `text-black`, `text-blue-600`, `text-white` |
| Font size | `text-sm`, `text-xl`, `text-3xl` |
| Font weight | `font-normal`, `font-semibold`, `font-bold` |
| Padding | `p-4`, `px-4` (horizontal), `py-2` (vertical) |
| Margin | `m-4`, `mt-4` (top), `mb-4` (bottom) |
| Border radius | `rounded`, `rounded-lg`, `rounded-full` |
| Width | `w-full`, `w-1/2`, `w-64` |
| Height | `h-10`, `h-full`, `h-screen` |
| Flexbox | `flex`, `items-center`, `justify-between` |
| Shadow | `shadow`, `shadow-md`, `shadow-xl` |
| Hover | `hover:bg-blue-700`, `hover:text-white` |

> 💡 **Numbers in Tailwind** — classes like `p-4` use a spacing scale. `p-4` = 16px, `p-1` = 4px. Each step is 4px. So `p-6` = 24px, `m-8` = 32px.

### Tailwind vs Normal CSS:

```jsx
// Normal CSS way
<div className="card">...</div>

// Tailwind way (same result, no separate CSS file needed)
<div className="bg-white rounded-xl p-4 shadow-md">...</div>
```

**When to use which?**
- **Learning/small projects** → Normal CSS is fine
- **Real projects/jobs** → Tailwind is what companies use. Learn it!

---

## 🔥 Dynamic Classes (Adding Classes Based on State)

Sometimes you want to change styles based on some condition. Here's how:

```jsx
import { useState } from 'react'

function App() {
  const [isActive, setIsActive] = useState(false)

  return (
    <button
      className={`px-4 py-2 rounded ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}
      onClick={() => setIsActive(!isActive)}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  )
}
```

Notice the template literal `` ` ` `` (backticks) — this lets you mix fixed classes with dynamic ones using `${}`.

---

## ✅ Quick Summary

| Method | Best For |
|--------|---------|
| Normal CSS + `className` | Simple projects, when you're learning |
| Inline styles `style={{}}` | Quick one-off styles |
| CSS Modules | When you want scoped styles, no clashes |
| Tailwind CSS | Real projects, fast styling, industry standard |

---

*Next up → Components, Props, and Rendering Lists of Data!*
