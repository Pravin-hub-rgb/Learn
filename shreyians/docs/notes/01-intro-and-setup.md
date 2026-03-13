# 01 — Intro & Setup
### What is React, Why React, Installing with Vite, Import/Export, Folder Structure

---

## 🤔 So... What Even is React?

Okay, let's start from the very beginning. You already know HTML, CSS, and JavaScript — great. So why does something called **React** even exist?

Think about it this way. You've been building websites with plain HTML and JS. That works fine for small stuff. But imagine you're building something like **Instagram** or **YouTube** — thousands of components, buttons, posts, comments, all updating in real time. Doing that with plain JS would be a nightmare.

**React is a JavaScript library** created by Facebook (now Meta) that makes building complex UIs way easier. It lets you break your whole website into small reusable pieces called **components** — like LEGO blocks. You build each block once, then use it anywhere you want.

> 💬 The instructor puts it simply: React is basically the most popular frontend library right now. In a 2023 Stack Overflow survey, **40%+ developers** said they use React. And on LinkedIn alone, there were **80,000+ job openings** for React developers. So yeah — worth learning.

---

## 😩 Why Not Just Use Plain HTML + JS?

Here's the real problem with plain HTML/JS — something called the **Real DOM**.

When you click a button and something on the page changes, the browser has to **reload the entire page structure** (the DOM) — even the parts that didn't change at all. It's like repainting your entire house just because one wall got dirty.

For small websites, this is fine. But for big apps? It's super slow and inefficient.

**React solves this** with something called the **Virtual DOM** (we'll cover this deeply in the next file). In short — React is smarter about what it updates. It only changes the exact parts that need to change. Nothing more.

---

## 📦 What is React Actually Made Of?

When you use React for web apps, you actually use **two things together**:

- **React** — the library that helps you *build* the UI (components, logic)
- **ReactDOM** — the library that *connects* your React UI to the actual browser

Think of it like this: React is the chef who cooks the food, and ReactDOM is the waiter who brings it to your table (the browser).

> 💡 Fun fact: React can also be used for mobile apps — but then instead of ReactDOM, you use **React Native**. Same React, different delivery method.

---

## ⚙️ Installing React with Vite

Now let's actually set up a React project. The way the instructor recommends (and what most developers use today) is **Vite** — a super fast build tool.

### Step 1 — Open your terminal and run:

```bash
npm create vite@latest
```

It'll ask you a few questions:
- **Project name** → name it whatever you want (e.g., `my-react-app`)
- **Framework** → choose **React**
- **Variant** → choose **JavaScript** (not TypeScript, for now)

### Step 2 — Navigate into your project:

```bash
cd my-react-app
```

### Step 3 — Install dependencies:

```bash
npm install
```

### Step 4 — Start the development server:

```bash
npm run dev
```

Now open your browser and go to `http://localhost:5173` — you'll see your React app running! 🎉

> 💬 The instructor uses **VS Code** as his editor. You can use any editor, but VS Code is highly recommended. Also install the **ES7+ React/Redux/React-Native Snippets** extension — it gives you shortcuts that save a lot of typing (we'll use these soon).

---

## 📁 React Folder Structure — What's What?

When Vite creates your project, you'll see a bunch of files and folders. Let's break down what matters:

```
my-react-app/
├── node_modules/     ← All the installed packages (don't touch this)
├── public/           ← Static files like favicon
├── src/              ← THIS is where you write your code
│   ├── App.jsx       ← Your main component (the starting point)
│   ├── main.jsx      ← Entry point — connects React to the browser
│   └── index.css     ← Global CSS
├── index.html        ← The one HTML file (React apps only have ONE)
├── package.json      ← Project info + list of dependencies
└── vite.config.js    ← Vite configuration (usually don't touch this)
```

### The most important files:

**`index.html`** — This is the only HTML file. If you look inside it, you'll see one single `<div id="root">`. That's where React puts your ENTIRE app. Just one div — and React fills it with everything.

**`main.jsx`** — This is the entry point. It grabs that `#root` div and tells React to render your app inside it:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

**`App.jsx`** — This is your main component. Think of it as the "homepage" of your React app. Everything starts here.

> 💡 Notice the file extension is `.jsx` not `.js`. JSX is a special syntax that lets you write HTML-like code inside JavaScript. We'll cover this in the next file!

---

## 📤 Import & Export — How React Files Talk to Each Other

In React, every component lives in its own file. So how do they share stuff with each other? Through **import and export**.

### Exporting (sending something out of a file)

**Named Export:**
```js
// utils.js
export const greet = () => {
  console.log("Hello!")
}

export const add = (a, b) => a + b
```

**Default Export:**
```js
// App.jsx
const App = () => {
  return <h1>Hello World</h1>
}

export default App  // only ONE default export per file
```

### Importing (bringing something into a file)

**Importing a named export** → use curly braces `{}`
```js
import { greet, add } from './utils'
```

**Importing a default export** → no curly braces, any name you want
```js
import App from './App'        // works
import MyApp from './App'      // also works! default exports can be renamed
```

### Real example you'll see constantly:

```js
// In any component file
import React from 'react'           // importing React itself
import { useState } from 'react'    // importing a specific hook (named)
import App from './App'             // importing your App component (default)
```

> 💡 **Quick rule:** curly braces `{}` = named export. No curly braces = default export. Simple as that.

---

## ✅ Quick Summary

| Topic | What to Remember |
|-------|-----------------|
| React | JS library for building UIs with reusable components |
| ReactDOM | Connects React to the browser |
| Vite | Fast tool to set up a React project (`npm create vite@latest`) |
| `src/` folder | Where all your actual code lives |
| `main.jsx` | Entry point — mounts the app into `#root` |
| `App.jsx` | Your main/starting component |
| `export default` | One per file, import without `{}` |
| `export const` | Multiple allowed, import with `{}` |

---

*Next up → How React actually works under the hood: Real DOM vs Virtual DOM, and JSX!*
