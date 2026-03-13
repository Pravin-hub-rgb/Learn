# 02 — How React Works
### Real DOM vs Virtual DOM, and JSX

---

## 🌳 What is the DOM?

Before we talk about React's magic, let's make sure we understand what the **DOM** is.

DOM stands for **Document Object Model**. It's basically the browser's way of representing your HTML as a tree structure. When your browser reads your HTML file, it converts it into this tree so JavaScript can interact with it.

Think of it like this: your HTML file is a recipe, and the DOM is the actual dish the browser cooked from it. JavaScript can add ingredients, remove them, or change the taste — that's what `document.querySelector`, `addEventListener`, etc. do.

```
HTML structure → Browser reads it → Creates DOM tree

        html
       /    \
    head     body
     |       /  \
   title  header  section
             |      |
            h1    button
```

---

## 😓 The Problem with the Real DOM

Here's where things get slow. Let's say you have a complex webpage with a header, a sidebar, a list of posts, a footer — everything. Now the user clicks a button that changes just the button's text.

**What does the Real DOM do?** It re-renders (reloads) the **entire DOM tree**. The whole thing. Even the parts that didn't change at all.

For a small site — no big deal. But imagine Facebook with thousands of posts, comments, notifications all on one page. Every tiny update would cause a massive re-render. That's extremely slow and inefficient.

> 💬 The instructor explains it like this: "Imagine you have a form on your page. A user has typed their name in an input field. If the DOM re-renders because something else changed, that input field also reloads — and the user's typed text disappears! That's a real problem."

---

## ⚡ React's Solution: The Virtual DOM

React came up with a clever solution — the **Virtual DOM**.

Here's how it works:

1. React keeps a **copy of the DOM in memory** — this is the Virtual DOM
2. When something changes, React first updates the Virtual DOM
3. Then React **compares** the new Virtual DOM with the old one (this process is called **diffing**)
4. React finds *exactly* what changed
5. Only those specific parts get updated in the **Real DOM**

So instead of repainting the whole house, React figures out exactly which wall needs a fresh coat — and only paints that one wall. Everything else stays untouched.

```
User clicks button
       ↓
React updates Virtual DOM (in memory — super fast)
       ↓
React compares old Virtual DOM vs new Virtual DOM
       ↓
Finds: "Only this button's text changed"
       ↓
Updates ONLY that button in the Real DOM
```

> 💡 This is why React apps feel so fast and smooth. It's not magic — it's just smart updating.

---

## 📝 JSX — Writing HTML Inside JavaScript

Now let's talk about **JSX**, which stands for **JavaScript XML**.

When you open `App.jsx` in your Vite project, you'll see something like this:

```jsx
function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}
```

Wait — that's HTML inside a JavaScript function?! Yes! That's JSX. It lets you write what *looks like* HTML right inside your JavaScript. The browser doesn't actually understand JSX — behind the scenes, a tool called **Babel** converts it into normal JavaScript.

So this JSX:
```jsx
<h1>Hello</h1>
```

Actually becomes this JavaScript under the hood:
```js
React.createElement('h1', null, 'Hello')
```

But you don't have to worry about that. Just write JSX — it's much cleaner and easier to read.

---

## 🧩 JSX Rules You MUST Know

JSX looks like HTML but it has some important differences. Break these rules and you'll get errors!

### Rule 1 — You can only return ONE parent element

This will cause an ERROR:
```jsx
// ❌ WRONG - two elements at the top level
function App() {
  return (
    <h1>Hello</h1>
    <p>World</p>
  )
}
```

This is CORRECT — wrap everything in one parent:
```jsx
// ✅ CORRECT - wrapped in a div
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>World</p>
    </div>
  )
}
```

> 💡 If you don't want an extra `div` in your HTML, you can use **React Fragments** — empty tags `<>...</>`:
> ```jsx
> return (
>   <>
>     <h1>Hello</h1>
>     <p>World</p>
>   </>
> )
> ```

### Rule 2 — Use `className` instead of `class`

In HTML you write `class="..."`. In JSX you write `className="..."` because `class` is a reserved keyword in JavaScript.

```jsx
// ❌ WRONG
<div class="container">...</div>

// ✅ CORRECT
<div className="container">...</div>
```

### Rule 3 — All tags must be closed

In HTML, you can write `<br>` and it's fine. In JSX, every tag must be properly closed:

```jsx
// ❌ WRONG
<img src="photo.jpg">
<br>
<input type="text">

// ✅ CORRECT
<img src="photo.jpg" />
<br />
<input type="text" />
```

### Rule 4 — JavaScript inside JSX goes in curly braces `{}`

This is super important. If you want to use a JavaScript variable or expression inside your JSX, wrap it in `{}`:

```jsx
function App() {
  const name = "Sarthak"
  const age = 22

  return (
    <div>
      <h1>Hello {name}</h1>        {/* prints: Hello Sarthak */}
      <p>Age: {age}</p>            {/* prints: Age: 22 */}
      <p>Next year: {age + 1}</p>  {/* prints: Next year: 23 */}
    </div>
  )
}
```

> 💬 The instructor explains: "If you just write `{name}` it will print the variable's value. If you write `name` without curly braces, it'll literally print the word 'name' as text."

You can also put any JavaScript expression in `{}` — math, ternary operators, function calls:

```jsx
<p>{10 + 5}</p>                          {/* 15 */}
<p>{isLoggedIn ? "Welcome!" : "Login"}</p>  {/* conditional */}
<p>{name.toUpperCase()}</p>              {/* SARTHAK */}
```

---

## 🏗️ Your First React Component

A React component is just a JavaScript function that returns some JSX. Here's how to write one:

```jsx
// Greet.jsx
function Greet() {
  const user = "Sarthak"

  return (
    <div>
      <h1>Hello, {user}!</h1>
      <p>Welcome to React.</p>
    </div>
  )
}

export default Greet
```

And using it in `App.jsx`:

```jsx
// App.jsx
import Greet from './Greet'

function App() {
  return (
    <div>
      <Greet />
    </div>
  )
}
```

> 💡 Component names MUST start with a **capital letter**. `<greet />` is treated as an HTML element. `<Greet />` is treated as a React component. Big difference!

---

## ⚡ The `rafc` Shortcut

The instructor uses the VS Code snippet `rafc` + Enter to quickly generate a component template. If you installed the **ES7+ React snippets** extension, try it:

1. Create a new file `Card.jsx`
2. Type `rafc` and press Enter
3. You get this automatically:

```jsx
import React from 'react'

const Card = () => {
  return (
    <div>Card</div>
  )
}

export default Card
```

This saves a lot of typing. Use it every time you create a new component!

---

## ✅ Quick Summary

| Concept | What to Remember |
|---------|-----------------|
| Real DOM | Browser's page structure — slow to update entirely |
| Virtual DOM | React's in-memory copy — fast, only updates what changed |
| Diffing | React's process of comparing old vs new Virtual DOM |
| JSX | HTML-like syntax inside JavaScript |
| `className` | Use this instead of `class` in JSX |
| `{}` curly braces | Use to embed JavaScript inside JSX |
| Component | A function that returns JSX, name must be capitalized |
| `rafc` snippet | Quick shortcut to generate a component template |

---

*Next up → Making things interactive: useState, functions, forms, and two-way binding!*
