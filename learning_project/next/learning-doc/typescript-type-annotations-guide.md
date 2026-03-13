# TypeScript Type Annotations: Complete Guide for React Developers

## 🎯 What is TypeScript?

TypeScript is JavaScript with **type checking**. It helps catch errors before your code runs.

### ⏰ The Key Difference: When Errors Are Caught

**JavaScript (Runtime Errors):**
```javascript
let age = 25;
age = "twenty-five";  // This works fine! No error here

// Error happens LATER when you try to use it:
console.log(age + 10);  // "twenty-five10" - weird result!
// OR
age.toFixed(2);         // ERROR! "twenty-five" doesn't have toFixed()
```

**TypeScript (Compile-time Errors):**
```typescript
let age: number = 25;
age = "twenty-five";  // ❌ ERROR IMMEDIATELY! Can't assign string to number
```

### Why This Timing Matters

**JavaScript Problem:**
```javascript
function calculateTotal(price, quantity) {
    return price * quantity;
}

// This works fine:
calculateTotal(10, 5);  // Returns 50

// But this breaks later:
calculateTotal("10", 5);  // Returns "105" (weird string concatenation!)
// OR
calculateTotal(10, "5");  // Also returns "105"!
```

**TypeScript Solution:**
```typescript
function calculateTotal(price: number, quantity: number): number {
    return price * quantity;
}

calculateTotal("10", 5);  // ❌ ERROR BEFORE CODE RUNS!
calculateTotal(10, 5);    // ✅ OK, returns 50
```

**The Real Value:**
- **JavaScript**: Catches errors when users experience them
- **TypeScript**: Catches errors while you're coding

It's like the difference between:
- **JavaScript**: "Oops, the bridge collapsed when the car drove on it"
- **TypeScript**: "Oops, the blueprint has a mistake, let's fix it before building"

### JavaScript vs TypeScript

**JavaScript (No Type Checking):**
```javascript
let age = 25;
age = "twenty-five";  // This works, but is WRONG!
age = true;           // This also works, but is WRONG!
```

**TypeScript (With Type Checking):**
```typescript
let age: number = 25;   // This variable can ONLY hold numbers
age = "twenty-five";    // ❌ ERROR! Can't put text in a number variable
age = true;             // ❌ ERROR! Can't put boolean in a number variable
age = 30;               // ✅ OK! 30 is a number
```

## 🔧 Basic Type Annotations

### Simple Variables

```typescript
let name: string = "John";      // Only text allowed
let isHappy: boolean = true;    // Only true/false allowed
let count: number = 5;          // Only numbers allowed
let items: string[] = ["a", "b"]; // Only arrays of text
```

### Function Parameters and Return Types

```typescript
// Function that takes 2 numbers and returns a number
function add(a: number, b: number): number {
    return a + b;
}

add("hello", 5);  // ❌ ERROR! Can't pass text when number expected
add(3, 5);        // ✅ OK! Returns 8
```

### Function Return Type Annotations

**What is the `: number` after the parameters?**

```typescript
function calculateTotal(price: number, quantity: number): number {
    return price * quantity;
}
```

**Breaking it down:**
1. `function calculateTotal` = function name
2. `(price: number, quantity: number)` = parameters with types
3. `): number` = **return type annotation**

**What `: number` means:**
- The function **must return** a number
- TypeScript will check that whatever you return is actually a number
- If you try to return something else, TypeScript will give an error

**Examples:**

```typescript
// ✅ This works - returns a number
function calculateTotal(price: number, quantity: number): number {
    return price * quantity;  // Returns a number
}

// ❌ This would error - returns text instead of number
function calculateTotal(price: number, quantity: number): number {
    return "hello";  // ERROR! Should return number, not text
}

// ❌ This would error - returns boolean instead of number
function calculateTotal(price: number, quantity: number): number {
    return true;  // ERROR! Should return number, not boolean
}
```

**Why is this useful?**

```typescript
// Without return type (JavaScript)
function calculateTotal(price, quantity) {
    if (price < 0) {
        return "Invalid price";  // Returns text!
    }
    return price * quantity;     // Returns number
}

// TypeScript can't catch this bug:
let result = calculateTotal(-5, 10);  // "Invalid price"
console.log(result + 5);  // "Invalid price5" - weird result!
```

```typescript
// With return type (TypeScript)
function calculateTotal(price: number, quantity: number): number {
    if (price < 0) {
        return "Invalid price";  // ❌ ERROR! Should return number
    }
    return price * quantity;     // ✅ OK, returns number
}
```

**Common Return Types:**

```typescript
function getName(): string {
    return "John";  // Must return text
}

function isHappy(): boolean {
    return true;    // Must return true/false
}

function getAge(): number {
    return 25;      // Must return number
}

function doNothing(): void {
    console.log("Hello");  // void = function returns nothing
}
```

**So the pattern is:**
```typescript
function functionName(param1: type1, param2: type2): returnType {
    return something;  // Must match returnType
}
```

## 🏗️ Objects and Interfaces

### What is an Interface?

An interface defines the **shape** of an object - what properties it has and what types they should be.

```typescript
interface Person {
    name: string;    // name must be text
    age: number;     // age must be a number
    isStudent: boolean; // isStudent must be true/false
}

let person: Person = {
    name: "John",
    age: 30,
    isStudent: false
};

person.name = 42;  // ❌ ERROR! name must be text, not number
person.name = "Jane";  // ✅ OK!
```

## ⚛️ React Components and Props

### What are Props?

Props (properties) are how you pass data to React components.

```jsx
// In JavaScript
function Button(props) {
    return <button>{props.text}</button>;
}

Button({ text: "Click me" });  // Pass text to component
```

### Adding Types to Props

```typescript
interface ButtonProps {
    text: string;  // text prop must be text, not number
}

function Button(props: ButtonProps) {
    return <button>{props.text}</button>;
}

Button({ text: 123 });        // ❌ ERROR! text must be text
Button({ text: "Click me" }); // ✅ OK!
```

## 🎭 The Special `children` Prop

### What is `children`?

When you write `<Button>Click me</Button>`, React automatically puts "Click me" in a special prop called `children`.

```jsx
// These are the same:
<Button>Click me</Button>
<Button children="Click me" />
```

### Why `React.ReactNode`?

`React.ReactNode` means "anything that React can render":

- Text: `"Hello"`
- Numbers: `42`
- Components: `<div>Hello</div>`
- Arrays: `["a", "b", "c"]`
- Nothing: `null`, `undefined`

```typescript
interface ButtonProps {
    children: React.ReactNode;  // Can be text, numbers, components, etc.
}

function Button(props: ButtonProps) {
    return <button>{props.children}</button>;
}

// All of these work:
<Button>Hello</Button>                    // text
<Button>{42}</Button>                     // number
<Button><span>Hello</span></Button>       // component
<Button>{["a", "b"]}</Button>             // array
```

## 🔄 Destructuring + Types

### Long Way (No Destructuring)

```typescript
interface ButtonProps {
    children: React.ReactNode;
}

function Button(props: ButtonProps) {
    return <button>{props.children}</button>;
}
```

### Short Way (With Destructuring)

```typescript
interface ButtonProps {
    children: React.ReactNode;
}

function Button({ children }: ButtonProps) {
    // { children } = take "children" out of props object
    // : ButtonProps = props must match this interface
    return <button>{children}</button>;
}
```

## 📝 Your ScoreBox Example Explained

```typescript
function ScoreBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="m-2 rounded-4xl border p-2">
            <p>{children}</p>
        </div>
    );
}
```

### Breaking It Down

1. `function ScoreBox(...)` = function name
2. `({ children }` = extract "children" from props object
3. `:` = "the type of props is..."
4. `{ children: React.ReactNode }` = props object structure

### How to Use It

```jsx
<ScoreBox>84% User Score</ScoreBox>
<ScoreBox>🥹😅😍</ScoreBox>
<ScoreBox>What's your vibe?</ScoreBox>
```

## 🎓 Common TypeScript Patterns

### 1. Optional Props

```typescript
interface ButtonProps {
    text: string;
    disabled?: boolean;  // Optional - may or may not be provided
}

function Button({ text, disabled = false }: ButtonProps) {
    return <button disabled={disabled}>{text}</button>;
}

// Usage:
<Button text="Click me" />           // disabled defaults to false
<Button text="Click me" disabled /> // disabled is true
```

### 2. Multiple Props

```typescript
interface UserCardProps {
    name: string;
    age: number;
    email: string;
    isOnline: boolean;
}

function UserCard({ name, age, email, isOnline }: UserCardProps) {
    return (
        <div>
            <h3>{name}</h3>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
            <span>{isOnline ? "Online" : "Offline"}</span>
        </div>
    );
}
```

### 3. Props with Default Values

```typescript
interface GreetingProps {
    name: string;
    greeting?: string;  // Optional with default
}

function Greeting({ name, greeting = "Hello" }: GreetingProps) {
    return <h1>{greeting}, {name}!</h1>;
}

// Usage:
<Greeting name="John" />           // "Hello, John!"
<Greeting name="John" greeting="Hi" /> // "Hi, John!"
```

## 🚀 Advanced Patterns

### 1. Union Types

```typescript
interface ButtonProps {
    variant: "primary" | "secondary" | "danger";  // Only these 3 values allowed
    size: "small" | "medium" | "large";
}

function Button({ variant, size }: ButtonProps) {
    return <button className={`${variant} ${size}`}>Click me</button>;
}

// Usage:
<Button variant="primary" size="large" />
<Button variant="danger" size="small" />
```

### 2. Function Props

```typescript
interface ButtonProps {
    text: string;
    onClick: () => void;  // Function that takes no params and returns nothing
}

function Button({ text, onClick }: ButtonProps) {
    return <button onClick={onClick}>{text}</button>;
}

// Usage:
<Button 
    text="Click me" 
    onClick={() => console.log("Clicked!")} 
/>
```

### 3. Children with Specific Types

```typescript
interface CardProps {
    title: string;
    children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <div className="content">
                {children}
            </div>
        </div>
    );
}

// Usage:
<Card title="My Card">
    <p>This is the card content</p>
    <button>Action Button</button>
</Card>
```

## 🎯 Best Practices

### 1. Always Use Interfaces for Props

```typescript
// ✅ Good
interface ButtonProps {
    text: string;
    onClick: () => void;
}

// ❌ Avoid
function Button(props: { text: string; onClick: () => void }) {
    // ...
}
```

### 2. Use Descriptive Interface Names

```typescript
// ✅ Good
interface UserProfileProps {
    name: string;
    email: string;
}

// ❌ Avoid
interface Props {
    name: string;
    email: string;
}
```

### 3. Use Optional Props When Appropriate

```typescript
interface InputProps {
    label: string;
    placeholder?: string;  // Not always needed
    required?: boolean;    // Not always needed
    value: string;         // Always needed
    onChange: (value: string) => void; // Always needed
}
```

## 🧠 Memory Tips

1. **`:` means "type of"** - `name: string` = "name is of type string"
2. **`{}` in parameters = destructuring** - `{ name }` = "take name out of the object"
3. **`React.ReactNode` = "anything React can render"**
4. **Interfaces define shapes** - they describe what an object looks like
5. **Optional props use `?`** - `name?: string` = "name might not be provided"

## 🎉 Practice Exercises

1. **Create a UserCard component** with props for name, age, and email
2. **Create a Button component** with text, variant, and onClick props
3. **Create a Card component** that accepts a title and children
4. **Create a FormInput component** with label, type, and onChange props

TypeScript takes time to learn, but it will save you from many bugs and make your code more maintainable! 🚀