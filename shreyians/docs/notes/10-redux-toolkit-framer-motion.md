# 10 — Redux Toolkit & Framer Motion
### What Are They and Why Do They Exist?

---

> ⚠️ **Quick note:** This file is intentionally kept simple. Both of these are big topics — Redux especially has its own deep learning curve. Here we just want to understand *what* they are and *why* they exist. Think of this as a "first handshake" introduction.

---

## 🗄️ Redux Toolkit — Global State Management

### The Problem Context API Doesn't Fully Solve

Context API (from File 09) is great for sharing data. But as your app grows really large — think an e-commerce site, a social media app, a dashboard — Context can get messy:

- Multiple contexts for different kinds of data (user context, cart context, theme context...)
- Hard to track which component changed what data and when
- Can cause unnecessary re-renders when context updates

**Redux Toolkit** is the industry-standard solution for managing state in large React applications.

### What is Redux?

Redux is a **global state manager**. Instead of state living inside individual components (like `useState`) or in context, Redux keeps ALL your app's state in one central place called the **store**.

Think of it like this:
- `useState` → a variable inside ONE component
- Context API → shared data accessible by many components
- Redux Store → the single "brain" of the entire application, everything lives here

```
Without Redux:                    With Redux:
                                  
Component A → its own state       Component A
Component B → its own state   →        ↕
Component C → its own state       Redux Store (one place for everything)
                                       ↕
                                  Component B
                                       ↕
                                  Component C
```

### Key Concepts (just to know the vocabulary):

**Store** — The single place where all your app's state lives.

**Slice** — A piece of the store for one feature (e.g., a `cartSlice` for shopping cart data, a `userSlice` for user data).

**Action** — An instruction telling Redux what to do (e.g., "add item to cart", "remove item").

**Reducer** — A function that handles the action and updates the state.

**Dispatch** — How you send an action to the store ("hey store, do this thing").

**Selector** — How you read data from the store in a component.

### A tiny taste of how Redux Toolkit looks:

```bash
npm install @reduxjs/toolkit react-redux
```

```js
// counterSlice.js — defining a piece of state
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    reset: (state) => { state.value = 0 },
  }
})

export const { increment, decrement, reset } = counterSlice.actions
export default counterSlice.reducer
```

```js
// store.js — the central store
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
  }
})

export default store
```

```jsx
// In a component — reading and updating Redux state
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './counterSlice'

function Counter() {
  const count = useSelector(state => state.counter.value)  // read from store
  const dispatch = useDispatch()                           // get the dispatch function

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
```

### Context API vs Redux — When to Use Which?

| Situation | Use |
|-----------|-----|
| Small to medium app | Context API is fine |
| Large app with complex state | Redux Toolkit |
| Few state updates | Context API |
| Frequent, complex state updates | Redux Toolkit |
| Getting started/learning | Context API first, then Redux |
| Job interviews / production apps | Know both |

> 💡 Redux Toolkit is a lot to take in at once. The good news: with Context API already in your toolkit, you understand the *concept*. Redux is just a more powerful, structured version of the same idea. Learn it once you're comfortable with everything else.

---

## 🎬 Framer Motion — Animations in React

### What is it?

**Framer Motion** is a library that makes adding animations to your React components incredibly easy. Things like:
- Fade in / fade out
- Slide in from the side
- Scale up on hover
- Smooth page transitions
- Drag and drop with physics

### Why not just use CSS animations?

You can — CSS works fine for simple stuff. But Framer Motion gives you:
- **Gesture-based animations** (hover, tap, drag)
- **Spring physics** (bouncy, natural-feeling animations)
- **Layout animations** (automatically animate when elements move/resize)
- **Exit animations** (animate elements as they're removed — CSS can't do this easily)

### Installing:

```bash
npm install framer-motion
```

### Basic usage — animate anything:

```jsx
import { motion } from 'framer-motion'

// Instead of a regular div:
<div>Hello</div>

// Use a motion div:
<motion.div
  initial={{ opacity: 0, y: -50 }}   // starting state
  animate={{ opacity: 1, y: 0 }}     // ending state
  transition={{ duration: 0.5 }}     // how long the animation takes
>
  Hello — I fade in from above! ✨
</motion.div>
```

What's happening:
- `initial` → where the element starts (invisible, 50px above)
- `animate` → where it ends up (fully visible, normal position)
- `transition` → how long it takes to get there (0.5 seconds)

### Hover and tap animations:

```jsx
<motion.button
  whileHover={{ scale: 1.1 }}        // grows 10% on hover
  whileTap={{ scale: 0.95 }}         // shrinks slightly when clicked
  transition={{ type: 'spring' }}    // spring physics feel
  className="bg-blue-500 text-white px-6 py-3 rounded-xl"
>
  Click Me!
</motion.button>
```

### Slide in from left:

```jsx
<motion.div
  initial={{ x: -200, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  I slide in from the left!
</motion.div>
```

### Staggered list animations (one by one):

```jsx
import { motion } from 'framer-motion'

const items = ["Item 1", "Item 2", "Item 3", "Item 4"]

function AnimatedList() {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
          className="p-2 bg-gray-100 mb-2 rounded"
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

Each item slides in one after another — super smooth, and only a few lines of code.

### Quick Reference — Common Animation Properties:

| Property | What it does |
|----------|-------------|
| `opacity` | Fade in/out (0 = invisible, 1 = visible) |
| `x` / `y` | Move horizontally / vertically |
| `scale` | Grow or shrink (1 = normal, 0.5 = half size) |
| `rotate` | Rotate in degrees |
| `duration` | Time in seconds |
| `delay` | Wait before starting |
| `ease` | Animation curve (`'easeIn'`, `'easeOut'`, `'spring'`) |
| `whileHover` | Animation while hovering |
| `whileTap` | Animation while clicking |

---

## ✅ Quick Summary

| Library | What it's for |
|---------|--------------|
| Redux Toolkit | Global state management for large apps |
| `useSelector` | Read data from Redux store |
| `useDispatch` | Send actions to Redux store |
| `createSlice` | Define a piece of state + its update functions |
| Framer Motion | Animations in React |
| `<motion.div>` | Animatable version of any HTML element |
| `initial` / `animate` | Starting and ending states |
| `whileHover` / `whileTap` | Gesture animations |

---

*Last file → Deploying your React app to the internet!*
