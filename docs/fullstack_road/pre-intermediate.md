# Pre-Intermediate — Full-Stack Next.js Roadmap
> You know HTML, CSS, JS basics. Now: Git, deeper JS, and your first taste of React & Next.js.

---

## JavaScript — Going Deeper

- [ ] Closures — what they are and why they matter
- [ ] Hoisting — variables and functions
- [ ] The `this` keyword — how it behaves in different contexts
- [ ] Prototypes and prototype chain — basic concept
- [ ] ES6 Modules — `import` and `export`, named vs default exports
- [ ] Higher-order functions — functions that take or return functions
- [ ] Pure functions — same input always same output, no side effects
- [ ] Immutability concept — why you don't mutate data directly
- [ ] Array destructuring with defaults — `const [a = 0] = arr`
- [ ] Object shorthand — `{ name }` instead of `{ name: name }`
- [ ] Computed property names — `{ [key]: value }`
- [ ] `Promise.all()`, `Promise.allSettled()` — running multiple async calls
- [ ] `Array.from()`, `Array.isArray()`
- [ ] Map and Set data structures — when to use over plain objects/arrays
- [ ] Symbols — basic awareness
- [ ] Generators — basic concept (don't need to master, just know they exist)
- [ ] WeakMap / WeakRef — basic awareness

---

## Git & Terminal

- [ ] What is the terminal / command line
- [ ] Basic terminal commands — `cd`, `ls`, `mkdir`, `touch`, `rm`, `mv`, `cp`, `pwd`
- [ ] What is Git — version control concept
- [ ] `git init` — starting a repo
- [ ] `git status` — seeing what changed
- [ ] `git add .` — staging changes
- [ ] `git commit -m "message"` — saving a snapshot
- [ ] `git log` — viewing history
- [ ] `git diff` — seeing exact changes
- [ ] `git checkout -- file` — discarding changes
- [ ] What is GitHub — remote repositories
- [ ] `git remote add origin`, `git push`, `git pull`
- [ ] `git clone` — copying a repo
- [ ] Branching — `git branch`, `git checkout -b`, `git switch`
- [ ] Merging — `git merge`
- [ ] Merge conflicts — what they are and how to resolve
- [ ] Pull Requests — opening one on GitHub, reviewing, merging
- [ ] `.gitignore` — what to ignore and why (`node_modules`, `.env`)
- [ ] GitHub Issues — creating and referencing in commits
- [ ] Writing a good README — what to include
- [ ] Feature branch workflow — branch per feature, merge to main

---

## Node.js & npm Basics

- [ ] What is Node.js — JS outside the browser
- [ ] What is npm — package manager
- [ ] `npm init` / `npm init -y`
- [ ] `package.json` — what it is, scripts, dependencies
- [ ] `npm install package-name` — installing packages
- [ ] `npm install -D package-name` — dev dependencies
- [ ] `node_modules` — what it is, why you don't commit it
- [ ] `package-lock.json` — what it does
- [ ] Running scripts — `npm run dev`, `npm run build`
- [ ] What is `npx` — running packages without installing globally
- [ ] CommonJS vs ES Modules — `require()` vs `import`
- [ ] Basic Node.js built-ins awareness — `fs`, `path`, `os`

---

## React — Getting Started

- [ ] What is React and why use it — component-based UI
- [ ] Setting up a React project — `create-react-app` or Vite
- [ ] What is JSX — HTML-like syntax in JavaScript
- [ ] JSX rules — one root element, `className` not `class`, self-closing tags
- [ ] JSX expressions — `{variable}`, `{2 + 2}`, `{condition && <div/>}`
- [ ] Functional components — creating and using them
- [ ] Props — passing data from parent to child
- [ ] Props destructuring — `function Card({ title, description })`
- [ ] `children` prop — wrapping content
- [ ] `defaultProps` — fallback values
- [ ] `useState` hook — declaring and updating state
- [ ] Re-rendering — when and why React re-renders
- [ ] Conditional rendering — ternary, `&&`, early return
- [ ] Rendering lists — `.map()` to render arrays
- [ ] Keys in lists — why React needs them, using unique IDs
- [ ] Handling events in React — `onClick`, `onChange`, `onSubmit`
- [ ] Controlled inputs — connecting input value to state
- [ ] Component file structure — one component per file
- [ ] Importing and exporting components

---

## React — Thinking in Components

- [ ] Breaking a UI into components — how to think about it
- [ ] Component composition — using components inside components
- [ ] Lifting state up — moving state to a parent when siblings need it
- [ ] One-way data flow — data flows down, events flow up
- [ ] When to split a component — single responsibility principle
- [ ] Prop drilling — passing props many levels deep (problem awareness)
- [ ] `useEffect` hook — running code after render
- [ ] `useEffect` dependency array — `[]` once, `[value]` on change, none = every render
- [ ] `useEffect` cleanup — returning a function to clean up
- [ ] Fetching data with `useEffect` + `fetch()`
- [ ] Loading and error states — handling async data in UI
- [ ] React DevTools — installing and inspecting component tree

---

## TypeScript — Introduction

- [ ] What is TypeScript and why use it
- [ ] TypeScript vs JavaScript — it compiles to JS
- [ ] Installing TypeScript — `tsc`, `tsconfig.json`
- [ ] Basic types — `string`, `number`, `boolean`, `null`, `undefined`
- [ ] Arrays — `string[]`, `number[]`, `Array<string>`
- [ ] Tuples — `[string, number]`
- [ ] `any` type — what it is and why to avoid it
- [ ] `unknown` type — safer alternative to `any`
- [ ] Type inference — TypeScript figures out the type automatically
- [ ] Type annotations — explicitly writing `: string`
- [ ] `type` aliases — `type User = { name: string; age: number }`
- [ ] `interface` — `interface User { name: string; age: number }`
- [ ] `type` vs `interface` — basic differences
- [ ] Optional properties — `name?: string`
- [ ] `readonly` properties
- [ ] Union types — `string | number`
- [ ] Intersection types — `TypeA & TypeB`
- [ ] Typing function parameters and return types
- [ ] Typing arrays and objects
- [ ] `tsconfig.json` — `strict` mode, what it enables

---

## Next.js — First Look

- [ ] What is Next.js — React framework with extras
- [ ] Why Next.js over plain React — routing, SSR, file-based structure
- [ ] Creating a Next.js project — `npx create-next-app@latest`
- [ ] Project structure — `app/`, `public/`, `next.config.js`, `package.json`
- [ ] `app/page.tsx` — your home page
- [ ] `app/layout.tsx` — root layout wrapping all pages
- [ ] File-based routing — creating a file = creating a route
- [ ] `app/about/page.tsx` → `/about` route
- [ ] `<Link>` component — client-side navigation, no page reload
- [ ] `next/image` — basic usage, `src`, `alt`, `width`, `height`
- [ ] `public/` folder — static assets like images, fonts
- [ ] Running dev server — `npm run dev`
- [ ] Building for production — `npm run build`
- [ ] Environment variables basics — `.env.local`, `NEXT_PUBLIC_` prefix
- [ ] What is `node_modules/.next` — build output folder
