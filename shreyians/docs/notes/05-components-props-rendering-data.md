# 05 — Components, Props & Rendering Data
### Components, Props Drilling, and Rendering JSON Data with .map()

---

## 🧩 What is a Component?

You already know a component is a function that returns JSX. But let's talk about *why* components are so powerful.

Imagine you're building a social media app. You have a user card that shows a profile photo, name, city, and an "Add Friend" button. Now you need to show 50 of these cards — one for each user.

Without components, you'd copy-paste that card HTML 50 times. Change something? Update 50 places. Nightmare.

With components, you write the card **once** as a component and **reuse** it 50 times — each time with different data.

```jsx
// Instead of this (50 times):
<div class="card">
  <h2>Sarthak</h2>
  <p>Bhopal</p>
</div>
<div class="card">
  <h2>Aryan</h2>
  <p>Delhi</p>
</div>
// ...48 more

// You do this:
<Card user="Sarthak" city="Bhopal" />
<Card user="Aryan" city="Delhi" />
// ... and so on
```

**One component, infinite reuse.** That's the power.

---

## 📨 Props — Passing Data into Components

**Props** (short for properties) are how you pass data **from a parent component into a child component**.

Think of a component like a function — and props are the arguments you pass to it.

### Basic Props Example:

```jsx
// Child component
function Card(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>{props.city}</p>
      <p>Age: {props.age}</p>
    </div>
  )
}

// Parent component
function App() {
  return (
    <div>
      <Card name="Sarthak" city="Bhopal" age={22} />
      <Card name="Aryan" city="Delhi" age={21} />
      <Card name="Harsh" city="Mumbai" age={23} />
    </div>
  )
}
```

When you write `<Card name="Sarthak" city="Bhopal" age={22} />`, React collects all those attributes into one object called `props` and passes it to the `Card` function. Inside `Card`, you access them like `props.name`, `props.city`, etc.

> 💡 Note: string props use `"quotes"`, but number/boolean/variable props use `{curly braces}`. So `name="Sarthak"` but `age={22}`.

### Destructuring Props (Cleaner Way):

Instead of writing `props.name` everywhere, you can destructure:

```jsx
// Instead of this:
function Card(props) {
  return <h2>{props.name}</h2>
}

// Do this (much cleaner):
function Card({ name, city, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{city}</p>
      <p>Age: {age}</p>
    </div>
  )
}
```

Same result, cleaner code. Most React developers use destructuring.

### Props are read-only!

You **cannot** change a prop inside the child component. Props only flow one way — from parent to child. If the child needs to change something, it must tell the parent (via a function passed as prop — we'll see this later).

---

## 🪜 Props Drilling — Passing Props Through Multiple Levels

Sometimes you have data at the top level (grandparent) but you need it deep down (grandchild). You have to pass props through every level in between — this is called **props drilling**.

```jsx
// Data starts at the top
function App() {
  const username = "Sarthak"
  return <Parent username={username} />
}

// Parent passes it down
function Parent({ username }) {
  return <Child username={username} />
}

// Child finally uses it
function Child({ username }) {
  return <h1>Hello, {username}!</h1>
}
```

This works fine for 2-3 levels. But imagine passing a prop through 10 levels of components — it becomes messy and hard to manage. That's why we have **Context API** (covered in File 09).

---

## 📄 Rendering JSON Data with `.map()`

In real apps, data comes from APIs or databases in **JSON format** — which is basically an array of objects. React lets you render lists of data super cleanly using JavaScript's `.map()` method.

### The `.map()` method (quick reminder):

```js
const numbers = [1, 2, 3]
const doubled = numbers.map(n => n * 2)
// doubled = [2, 4, 6]
```

`.map()` loops through an array, does something to each item, and returns a new array. In React, we use it to turn an array of data into an array of JSX elements.

### Rendering a simple list:

```jsx
function App() {
  const fruits = ["Apple", "Banana", "Mango", "Orange"]

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  )
}
```

### The `key` prop — very important!

Notice `key={index}` on the `<li>`? React requires a unique `key` on each item in a list. Without it, you get a warning and React can't track items properly.

The key should ideally be a **unique ID** from your data (like a database ID), not just the array index. We use `index` here only because we don't have IDs.

---

## 🏗️ Rendering JSON Data with Components

Here's where it all comes together. Let's say you have an array of user objects (like data from an API):

```jsx
const users = [
  { id: 1, name: "Sarthak", city: "Bhopal", age: 22, profession: "Developer" },
  { id: 2, name: "Aryan", city: "Delhi", age: 21, profession: "Designer" },
  { id: 3, name: "Harsh", city: "Mumbai", age: 23, profession: "Manager" },
  { id: 4, name: "Priya", city: "Pune", age: 24, profession: "Engineer" },
  { id: 5, name: "Rohit", city: "Chennai", age: 25, profession: "Analyst" },
]
```

Now let's build a `Card` component and render all 5 users:

```jsx
// Card.jsx — the reusable card component
function Card({ name, city, age, profession }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-4 flex items-center gap-4">
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-500">{city}</p>
        <p className="text-blue-500 text-sm">{profession}</p>
        <p className="text-gray-400 text-sm">Age: {age}</p>
        <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
          Add Friend
        </button>
      </div>
    </div>
  )
}

export default Card
```

```jsx
// App.jsx — renders all user cards
import Card from './Card'

const users = [
  { id: 1, name: "Sarthak", city: "Bhopal", age: 22, profession: "Developer" },
  { id: 2, name: "Aryan", city: "Delhi", age: 21, profession: "Designer" },
  { id: 3, name: "Harsh", city: "Mumbai", age: 23, profession: "Manager" },
  { id: 4, name: "Priya", city: "Pune", age: 24, profession: "Engineer" },
  { id: 5, name: "Rohit", city: "Chennai", age: 25, profession: "Analyst" },
]

function App() {
  return (
    <div className="p-8">
      {users.map((user) => (
        <Card
          key={user.id}
          name={user.name}
          city={user.city}
          age={user.age}
          profession={user.profession}
        />
      ))}
    </div>
  )
}
```

Here `key={user.id}` is better than `key={index}` because IDs are unique and stable. 

> 💬 The instructor shows this exact pattern — map over the array, and for each user, render a `<Card />` component with the user's data passed as props. This is the bread and butter of React development.

### Even cleaner — spread the whole object:

Instead of listing every prop manually, you can spread the object:

```jsx
{users.map((user) => (
  <Card key={user.id} {...user} />
))}
```

`{...user}` automatically passes all the object's properties as props. So if user has `name`, `city`, `age`, `profession` — they all get passed automatically. The `Card` component receives them the same way.

---

## 🧠 The `children` Prop — Wrapping Content

There's one special prop called `children`. It lets you pass JSX content between the opening and closing tags of a component:

```jsx
// Layout component that wraps content
function Box({ children }) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl">
      {children}   {/* renders whatever is put between <Box>...</Box> */}
    </div>
  )
}

// Using it:
function App() {
  return (
    <Box>
      <h1>Title</h1>
      <p>Some content here</p>
    </Box>
  )
}
```

`children` is incredibly useful for building layout components, wrappers, cards, modals — anything that wraps other content.

---

## ✅ Quick Summary

| Concept | What to Remember |
|---------|-----------------|
| Component | Reusable function that returns JSX |
| Props | Data passed from parent to child |
| Destructuring props | `function Card({ name, age })` instead of `props.name` |
| Props drilling | Passing props through multiple levels of components |
| `.map()` | Loop through array, return JSX for each item |
| `key` prop | Required for list items — use unique ID from data |
| `{...object}` spread | Pass all object properties as props at once |
| `children` prop | Lets components wrap other JSX content |

---

*Next up → Fetching real data from the internet with API integration using Axios!*
