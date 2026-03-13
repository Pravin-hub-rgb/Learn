# 03 — State & Events
### useState, Calling Functions, Form Handling, Two-Way Binding

---

## 🤔 The Problem — Why Can't We Just Use Normal Variables?

Let's say you want to build a counter. A user clicks a button, and the number goes up. Simple, right? Let's try it with a regular JavaScript variable:

```jsx
function App() {
  let count = 0

  const increment = () => {
    count = count + 1
    console.log(count) // this DOES change in the console
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Add 1</button>
    </div>
  )
}
```

You click the button. `count` changes in the console — you can see it! But the number on the screen? **It never updates.** Still shows 0.

Why? Because React doesn't know the variable changed. Remember — React manages its own Virtual DOM. If you change a regular variable yourself, React has no idea it happened. It never re-renders the screen.

> 💬 The instructor puts it perfectly: "React says — don't be clever yourself. Tell ME to change things, and I'll handle it. If you change things directly without telling me, I won't do anything."

This is exactly why we need **useState**.

---

## 🎣 What Are Hooks?

Before we learn `useState`, let's understand **Hooks**.

Hooks are special functions that React gives you. They let your component do powerful things — like remember data, respond to changes, or run code at specific times.

The rules of hooks:
- They always start with the word `use` (like `useState`, `useEffect`, etc.)
- You can ONLY call them at the TOP of your component — never inside loops or if-statements

Think of hooks as React's built-in superpowers that you can plug into your components.

---

## 🔁 useState — React's Way to Store Data

`useState` is the most important hook. It's basically React's version of a variable — except when it changes, React **automatically re-renders** (updates) the screen.

### How to use it:

```jsx
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  //     ^^^^^  ^^^^^^^^   ^^^^^^^^^^^
  //   the value  setter fn  initial value
```

Let's break this down:
- `count` — the current value (starts at `0`)
- `setCount` — a function to UPDATE the value
- `useState(0)` — sets the initial value to `0`

**You NEVER change the value directly.** Instead, you use the setter function:

```jsx
setCount(5)       // sets count to 5
setCount(count + 1)  // increments by 1
```

### Full counter example:

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>➕ Add</button>
      <button onClick={() => setCount(count - 1)}>➖ Subtract</button>
      <button onClick={() => setCount(0)}>🔄 Reset</button>
    </div>
  )
}
```

Now when you click the button, `setCount` tells React "hey, the value changed!" — React knows to re-render the screen with the new value. Magic! ✨

### useState with strings:

```jsx
const [name, setName] = useState("Sarthak")

// change it later:
setName("Aryan")
```

### useState with objects:

```jsx
const [user, setUser] = useState({ name: "Sarthak", age: 22 })

// to update, spread the old object and override specific fields:
setUser({ ...user, age: 23 })
```

> 💡 **Naming convention:** If your state variable is called `something`, the setter is always called `setSomething`. It's not a rule — it's just what everyone does, and it makes your code readable.

---

## 🖱️ Calling Functions in React (Event Handling)

In plain JavaScript, you'd do:
```js
document.querySelector('button').addEventListener('click', myFunction)
```

In React, you attach events directly on the element as a prop:

```jsx
<button onClick={myFunction}>Click me</button>
```

React has JSX versions of all the common events:

| Event | What it does |
|-------|-------------|
| `onClick` | Mouse click |
| `onChange` | Input field value changes |
| `onSubmit` | Form submission |
| `onMouseEnter` | Mouse hovers over element |
| `onKeyDown` | Keyboard key pressed |

### The #1 Beginner Mistake — Calling vs Referencing

This is something almost every beginner gets wrong:

```jsx
// ❌ WRONG - the () makes it call immediately when component loads
<button onClick={myFunction()}>Click</button>

// ✅ CORRECT - pass the function itself, React calls it on click
<button onClick={myFunction}>Click</button>
```

The difference: `myFunction` is a *reference* to the function. `myFunction()` *calls* it right now. You want React to call it later when clicked — so no `()`.

But what if you need to pass arguments?

```jsx
// ❌ This calls immediately
<button onClick={greet("Sarthak")}>Click</button>

// ✅ Wrap it in an arrow function
<button onClick={() => greet("Sarthak")}>Click</button>
```

### Full example:

```jsx
import { useState } from 'react'

function App() {
  const [user, setUser] = useState("Sarthak")

  const changeUser = () => {
    setUser("Aryan")
  }

  return (
    <div>
      <h1>Username: {user}</h1>
      <button onClick={changeUser}>Change User</button>
    </div>
  )
}
```

Click the button → `changeUser` runs → `setUser("Aryan")` → React re-renders → screen shows "Aryan". That's the full cycle!

---

## 📋 Form Handling in React

Forms in React are slightly different from plain HTML forms. Here's the problem:

When you submit an HTML form, the browser's **default behavior** is to **reload the page**. In a React app, that wipes out everything. We need to stop that.

### Step 1 — Prevent the default reload

```jsx
function App() {
  const submitHandler = (e) => {
    e.preventDefault()  // stops the page reload!
    console.log("Form submitted!")
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="Enter something" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

`e` is the event object. `e.preventDefault()` stops the browser's default "reload on submit" behavior.

> 💡 You can name `e` anything — `event`, `ev`, `e` — it's just a parameter. But `e` is the most common shorthand.

### Step 2 — Read the input value

Now, how do we actually get what the user typed? This is where **Two-Way Binding** comes in.

---

## 🔄 Two-Way Binding

Two-way binding means the input field and your state are always in sync:
- When the state changes → the input updates
- When the user types → the state updates

Here's how:

```jsx
import { useState } from 'react'

function App() {
  const [username, setUsername] = useState("")  // empty initially

  return (
    <input
      type="text"
      value={username}              // state → input (one direction)
      onChange={(e) => setUsername(e.target.value)}  // input → state (other direction)
    />
  )
}
```

Let's break that `onChange` down:
- `e` is the event
- `e.target` is the input element that was changed
- `e.target.value` is the current text in that input

So every time the user types a character, `setUsername` updates the state with the current input value. And since `value={username}` is set, the input always shows the current state. Two-way!

### Full form example with Two-Way Binding:

```jsx
import { useState } from 'react'

function App() {
  const [username, setUsername] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("Submitted:", username)
    setUsername("") // clear the input after submit
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <p>Typed so far: {username}</p>
    </div>
  )
}
```

Now watch what happens:
1. User types "Sarthak" → `username` state becomes "Sarthak"
2. `<p>` shows "Typed so far: Sarthak" in real time
3. User hits Submit → `submitHandler` runs → logs "Submitted: Sarthak" → clears the input

> 💡 **Why clear the input?** Just call `setUsername("")` after submitting. Since the input's `value` is tied to state, setting state to empty automatically clears the input. That's the beauty of two-way binding!

---

## 🧠 Why is Two-Way Binding so Important?

You might wonder — why not just grab the input value with `document.querySelector`? Because React says: **don't touch the DOM yourself**.

With two-way binding, React always knows what's in the input. It controls the input — not you, not the browser. This means:
- React can validate it
- React can clear it
- React can pre-fill it
- React can use that value anywhere in your app

This is called a **controlled component** — React controls the input, not the DOM.

---

## ✅ Quick Summary

| Concept | What to Remember |
|---------|-----------------|
| `useState` | React's variable — updates trigger re-render |
| `const [value, setValue] = useState(initial)` | The pattern for useState |
| Never change state directly | Always use the setter function |
| `onClick={fn}` | No `()` — pass reference, not call |
| `onClick={() => fn(arg)}` | Use arrow fn when passing arguments |
| `e.preventDefault()` | Stops form from reloading page |
| `e.target.value` | Gets current value of an input |
| Two-Way Binding | `value={state}` + `onChange={e => setState(e.target.value)}` |
| Controlled component | React controls the input's value via state |

---

*Next up → Adding styles to your React app: normal CSS and Tailwind!*
