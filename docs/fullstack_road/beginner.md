# Beginner — Full-Stack Next.js Roadmap
> Pure fundamentals. No frameworks yet. Master these before moving to pre-intermediate.

---

## HTML Basics

- [ ] What is HTML and how browsers read it
- [ ] Basic document structure — `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`
- [ ] Headings — `h1` to `h6` and when to use each
- [ ] Paragraphs, line breaks, horizontal rules
- [ ] Links — `<a href="">`, absolute vs relative URLs, `target="_blank"`
- [ ] Images — `<img src="" alt="">`, why alt text matters
- [ ] Lists — ordered `<ol>`, unordered `<ul>`, `<li>`
- [ ] Tables — `<table>`, `<tr>`, `<td>`, `<th>`, `<thead>`, `<tbody>`
- [ ] Divs and spans — block vs inline elements
- [ ] Semantic HTML5 elements — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- [ ] Forms basics — `<form>`, `<input>`, `<label>`, `<button>`, `<textarea>`, `<select>`
- [ ] Input types — text, email, password, number, checkbox, radio, file
- [ ] Form attributes — `action`, `method`, `name`, `placeholder`, `required`
- [ ] HTML comments
- [ ] `id` vs `class` attributes — difference and when to use each
- [ ] `data-*` attributes — what they are
- [ ] Meta tags — `charset`, `viewport`, `description`
- [ ] Linking CSS and JS files in HTML

---

## CSS Basics

- [ ] How CSS works — selectors, properties, values
- [ ] Three ways to write CSS — inline, internal `<style>`, external stylesheet
- [ ] CSS box model — content, padding, border, margin
- [ ] `box-sizing: border-box` — why it matters
- [ ] Basic selectors — element, class `.`, id `#`, universal `*`
- [ ] Combinators — descendant ` `, child `>`, adjacent `+`
- [ ] Colors — named, hex `#fff`, rgb, rgba, hsl
- [ ] Typography — `font-family`, `font-size`, `font-weight`, `line-height`, `text-align`
- [ ] `px` vs `em` vs `rem` — difference and when to use each
- [ ] `width`, `height`, `max-width`, `min-height`
- [ ] Display property — `block`, `inline`, `inline-block`, `none`
- [ ] Positioning — `static`, `relative`, `absolute`, `fixed`, `sticky`
- [ ] `z-index` — stacking elements
- [ ] Overflow — `visible`, `hidden`, `scroll`, `auto`
- [ ] Background — `background-color`, `background-image`, `background-size`, `background-position`
- [ ] Borders — `border`, `border-radius`
- [ ] Shadows — `box-shadow`, `text-shadow`
- [ ] Pseudo-classes — `:hover`, `:focus`, `:active`, `:first-child`, `:last-child`, `:nth-child()`
- [ ] Pseudo-elements — `::before`, `::after`, `::placeholder`
- [ ] CSS specificity — how the browser decides which rule wins
- [ ] CSS inheritance — what inherits and what doesn't
- [ ] CSS reset vs normalize — why you need one
- [ ] CSS comments

---

## CSS Layout

- [ ] Flexbox — `display: flex`, what it does
- [ ] Flexbox — `flex-direction`, `justify-content`, `align-items`, `align-self`
- [ ] Flexbox — `flex-wrap`, `gap`
- [ ] Flexbox — `flex-grow`, `flex-shrink`, `flex-basis`
- [ ] CSS Grid — `display: grid`, `grid-template-columns`, `grid-template-rows`
- [ ] CSS Grid — `gap`, `grid-column`, `grid-row`, `grid-area`
- [ ] CSS Grid — `fr` unit, `repeat()`, `minmax()`
- [ ] When to use Flexbox vs Grid
- [ ] Responsive design concept — what it means
- [ ] Media queries — `@media (max-width: 768px) { }`
- [ ] Mobile-first vs desktop-first approach
- [ ] CSS variables — `--my-color: red;` and `var(--my-color)`
- [ ] Basic CSS transitions — `transition: all 0.3s ease`
- [ ] Basic CSS animations — `@keyframes`, `animation` property

---

## JavaScript Fundamentals

- [ ] What is JavaScript — what it does in the browser
- [ ] Where to write JS — `<script>` tag, external `.js` file
- [ ] `console.log()` — your best friend for debugging
- [ ] Variables — `var`, `let`, `const` — differences and when to use each
- [ ] Data types — string, number, boolean, null, undefined, object, array
- [ ] `typeof` operator
- [ ] String methods — `.length`, `.toUpperCase()`, `.toLowerCase()`, `.trim()`, `.includes()`, `.split()`, `.replace()`, `.slice()`
- [ ] Template literals — `` `Hello ${name}` ``
- [ ] Number methods — `Math.round()`, `Math.floor()`, `Math.ceil()`, `Math.random()`, `parseInt()`, `parseFloat()`
- [ ] Arithmetic operators — `+`, `-`, `*`, `/`, `%`, `**`
- [ ] Comparison operators — `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
- [ ] Logical operators — `&&`, `||`, `!`
- [ ] `if`, `else if`, `else` statements
- [ ] Ternary operator — `condition ? a : b`
- [ ] `switch` statement
- [ ] `for` loop, `while` loop, `do...while` loop
- [ ] `break` and `continue`
- [ ] Functions — declaration vs expression
- [ ] Arrow functions — `const fn = () => {}`
- [ ] Parameters and arguments
- [ ] `return` statement
- [ ] Scope — global vs local scope
- [ ] Arrays — creating, accessing by index, `.length`
- [ ] Array methods — `.push()`, `.pop()`, `.shift()`, `.unshift()`, `.splice()`, `.slice()`
- [ ] Array methods — `.map()`, `.filter()`, `.reduce()`, `.find()`, `.some()`, `.every()`, `.includes()`
- [ ] `for...of` loop for arrays
- [ ] Objects — creating, accessing properties with `.` and `[]`
- [ ] Object methods — `Object.keys()`, `Object.values()`, `Object.entries()`
- [ ] `for...in` loop for objects
- [ ] Destructuring — arrays `const [a, b] = arr` and objects `const { name } = obj`
- [ ] Spread operator — `...arr`, `...obj`
- [ ] Rest parameters — `function fn(...args)`
- [ ] Nullish coalescing — `??`
- [ ] Optional chaining — `?.`
- [ ] Short-circuit evaluation — `&&` and `||` tricks
- [ ] Truthy and falsy values
- [ ] `JSON.stringify()` and `JSON.parse()`
- [ ] `try`, `catch`, `finally` — basic error handling
- [ ] `throw new Error('message')`

---

## DOM Manipulation

- [ ] What is the DOM — document object model
- [ ] `document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()`
- [ ] Reading and changing text — `.textContent`, `.innerHTML`
- [ ] Reading and changing attributes — `.getAttribute()`, `.setAttribute()`
- [ ] Adding and removing CSS classes — `.classList.add()`, `.classList.remove()`, `.classList.toggle()`
- [ ] Changing styles — `.style.color = 'red'`
- [ ] Creating elements — `document.createElement()`
- [ ] Adding to DOM — `.appendChild()`, `.prepend()`, `.insertAdjacentElement()`
- [ ] Removing from DOM — `.remove()`
- [ ] Event listeners — `element.addEventListener('click', fn)`
- [ ] Common events — `click`, `input`, `change`, `submit`, `keydown`, `keyup`, `mouseover`, `mouseout`
- [ ] `event.preventDefault()` — stopping default browser behavior
- [ ] `event.target` — what was clicked
- [ ] Event bubbling concept

---

## Async JavaScript Basics

- [ ] Synchronous vs asynchronous — what's the difference
- [ ] `setTimeout()` and `setInterval()`
- [ ] Callbacks — what they are and basic usage
- [ ] Promises — `.then()`, `.catch()`, `.finally()`
- [ ] `async` / `await` — cleaner way to write async code
- [ ] `fetch()` — making HTTP requests
- [ ] Reading JSON response — `response.json()`
- [ ] Basic error handling with async/await

---

## Browser & Tools Basics

- [ ] How the browser renders a page — basic concept
- [ ] Browser DevTools — opening, Elements tab, Console tab
- [ ] Inspecting and editing HTML/CSS live in DevTools
- [ ] Console tab — running JS, seeing errors
- [ ] Network tab — seeing requests being made
- [ ] What is a code editor — installing VS Code
- [ ] VS Code basics — opening folders, creating files, terminal
- [ ] Useful VS Code extensions — Prettier, ESLint, Live Server
- [ ] What is `Live Server` extension and why use it
