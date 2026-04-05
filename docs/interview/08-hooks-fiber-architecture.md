# ⚛️ Phase 2: Topic 8 - Rules of Hooks & Fiber Architecture

> **Interview Question:** "Hooks top-level pe hi kyun? Loop/condition ke andar kyun nahi? React ka internal linked-list system kaise kaam karta hai?"

---

## 🚨 **The Golden Rule — Sabse Pehle Samjho!**

> **"Hooks ko hamesha top-level pe call karo — kabhi bhi loops, conditions, ya nested functions ke andar mat call karo."**

### **Sabse Important Baat — Kyun?**

```
React ko HAR RENDER SE PEHLE ye pata hona chahiye ki:
- Kitne hooks hain?
- Kaunse hooks hain?
- Kaunsa hook kahan hai?

Kyun? Kyunki React ko:
1. Pehle render pe hooks create karne hain
2. Baad ke renders pe same hooks ko reuse karna hai

Agar hooks ki count ya order change hua, toh:
- React galat hook se state match kar dega
- State galat jagah chali jayegi
- Bug fix karna mushkil ho jayega

Isliye React ko HAR RENDER PE SAME HOOKS, SAME ORDER mein chahiye!
```

---

## 💡 **Beginner-Friendly Explanation**

### 🎒 **Hooks — Backpack System**

```
Socho tumhare paas ek backpack hai jisme tum items rakhte ho:

Render 1:
┌─────────────────────────────────────┐
│ Backpack (State)                    │
│ 1. useState → [count, setCount]     │
│ 2. useState → [name, setName]       │
│ 3. useEffect → (effect function)    │
└─────────────────────────────────────┘

React ko pata hai:
- Pehla item = count state
- Dusra item = name state
- Teesra item = effect

Agar tum condition ke andar hook call karoge:
- React confuse ho jayega
- "Kaunsa item kaunsa hai?" pata nahi chalega
- State galat hook se match ho jayegi!
```

### 🔗 **Linked-List — Chain System**

```
React hooks ek chain (linked-list) ki tarah connected hain:

┌──────────┐    ┌──────────┐    ┌──────────┐
│ Hook 1   │───▶│ Hook 2   │───▶│ Hook 3   │
│ useState │    │ useState │    │ useEffect│
└──────────┘    └──────────┘    └──────────┘
   (count)         (name)        (effect)

Har render pe:
- React same order mein hooks ko traverse karta hai
- Agar order change hua → chain toot gayi!
- State galat jagah match ho jayegi!
```

---

## 🤔 **"Call" ka Matlab Kya Hai? — Important Clarification**

```
Jab hum kehte hain "hook call karna", toh matlab hai:

const [count, setCount] = useState(0);  // ← Yeh HAI "call"

Yahan `useState(0)` ek function call hai.
Jab React component render hota hai, toh:
1. Component function execute hota hai (top to bottom)
2. Har line execute hoti hai
3. Jab `useState()` aata hai, toh woh CALL (execute) hota hai

"Call" = Function ko execute karna
"Define" = Variable ko declare karna

Yahan dono ho raha hai:
- `useState(0)` CALL ho raha hai (function execute)
- `count` aur `setCount` DEFINE ho rahe hain (variables declare)

Problem tab hoti hai jab `useState()` CALL hi nahi hota!
```

---

## ⚠️ **Condition ke Andar Hook — Exact Problem**

```javascript
function Counter({ showCount }) {
  const [count, setCount] = useState(0);  // Hook 1 - HAMESHA call hoga
  
  if (showCount) {
    const [name, setName] = useState('');  // Hook 2 - SIRF tab call hoga jab showCount = true
  }
  
  const [age, setAge] = useState(0);  // Hook 2 or 3?
}

// RENDER 1: showCount = true
// Line 1 execute: useState(0) CALL hua → Hook 1 (count)
// Line 2 execute: if (true) → ANDAR GAYE
// Line 3 execute: useState('') CALL hua → Hook 2 (name)
// Line 4 execute: useState(0) CALL hua → Hook 3 (age)
// Result: count=Hook1, name=Hook2, age=Hook3 ✅

// RENDER 2: showCount = false
// Line 1 execute: useState(0) CALL hua → Hook 1 (count)
// Line 2 execute: if (false) → ANDAR NAHI GAYE
// Line 3 execute: useState(0) CALL hua → Hook 2 (age) ← PROBLEM!
// Result: count=Hook1, age=Hook2 ❌

// React sochta hai: "Hook 2 toh name tha, ab age kaise ho gaya?"
// State mismatch! name ki state age ko chali gayi!
```

**Reason:** Condition ke andar code **execute hi nahi hota** jab condition false hoti hai. Toh `useState()` **call hi nahi hota**. React ko pata hi nahi chalta ki wahan hook tha.

---

## ⚠️ **Loop ke Andar Hook — Exact Problem**

```javascript
function List({ items }) {
  const [count, setCount] = useState(0);  // Hook 1 - HAMESHA 1 baar call
  
  for (let i = 0; i < items.length; i++) {
    const [item, setItem] = useState('');  // Hook 2 - items.length BAAR call!
  }
}

// RENDER 1: items = ['a', 'b', 'c'] (length = 3)
// Line 1 execute: useState(0) CALL hua → Hook 1 (count)
// Loop execute:
//   i=0: useState('') CALL hua → Hook 2
//   i=1: useState('') CALL hua → Hook 3
//   i=2: useState('') CALL hua → Hook 4
// Total: 4 hooks ✅

// RENDER 2: items = ['a', 'b', 'c', 'd', 'e'] (length = 5)
// Line 1 execute: useState(0) CALL hua → Hook 1 (count)
// Loop execute:
//   i=0: useState('') CALL hua → Hook 2
//   i=1: useState('') CALL hua → Hook 3
//   i=2: useState('') CALL hua → Hook 4
//   i=3: useState('') CALL hua → Hook 5 ← NAYA!
//   i=4: useState('') CALL hua → Hook 6 ← NAYA!
// Total: 6 hooks ❌

// React sochta hai: "Pehle 4 hooks the, ab 6 kaise ho gaye?"
// Purane hooks ki state naye hooks se mismatch!
```

**Reason:** Loop ke andar hook **multiple baar call** hota hai. Har iteration mein naya hook add hota hai. Agar items ki length change hui, toh hooks ki count bhi change ho jati hai.

---

## 🔄 **Why Top-Level Only? — The Technical Reason**

### **React ka Internal System:**

```javascript
// React internally hooks ko store karta hai:
const fiberNode = {
  memoizedState: null,  // Linked-list head
  
  // Linked-list structure:
  // {
  //   memoizedState: hook1,
  //   next: {
  //     memoizedState: hook2,
  //     next: {
  //       memoizedState: hook3,
  //       next: null
  //     }
  //   }
  // }
};
```

### **How React Tracks Hooks:**

```javascript
// React internally:
let currentHook = null;
let hookIndex = 0;

function useState(initialValue) {
  // React current index se hook dhundta hai
  const hook = getCurrentHook(hookIndex);
  
  // Agar hook nahi mila (pehli render), toh create karo
  if (!hook) {
    const newHook = {
      memoizedState: initialValue,
      queue: [],
      next: null
    };
    // Linked-list mein add karo
    addHook(newHook);
    return [newHook.memoizedState, setState];
  }
  
  // Agar hook mila (subsequent renders), toh use karo
  hookIndex++;  // Next hook pe jao
  return [hook.memoizedState, setState];
}
```

---

## ❌ **Wrong Examples — Jo Kabhi Nahi Karna**

### **Example 1: Hook Inside Condition**

```javascript
// ❌ GALAT — Hook condition ke andar
function Counter({ showCount }) {
  const [count, setCount] = useState(0);  // Hook 1
  
  if (showCount) {
    const [name, setName] = useState('');  // ❌ Hook 2 (kabhi kabhi call hoga)
  }
  
  const [age, setAge] = useState(0);  // Hook 2 or 3? Confusion!
  
  return <div>{count}</div>;
}

// Problem:
// Render 1 (showCount = true):
//   Hook 1: count
//   Hook 2: name (condition ke andar)
//   Hook 3: age
//
// Render 2 (showCount = false):
//   Hook 1: count
//   Hook 2: age (kyunki name wala hook call hi nahi hua!)
//   ❌ State mismatch!
```

### **Example 2: Hook Inside Loop**

```javascript
// ❌ GALAT — Hook loop ke andar
function List({ items }) {
  const [count, setCount] = useState(0);
  
  for (let i = 0; i < items.length; i++) {
    const [itemState, setItemState] = useState('');  // ❌ Har iteration mein naya hook!
  }
  
  return <div>{count}</div>;
}

// Problem:
// Agar items.length = 3:
//   Hook 1: count
//   Hook 2: itemState (i=0)
//   Hook 3: itemState (i=1)
//   Hook 4: itemState (i=2)
//
// Next render (items.length = 5):
//   Hook 1: count
//   Hook 2: itemState (i=0)
//   Hook 3: itemState (i=1)
//   Hook 4: itemState (i=2)
//   Hook 5: itemState (i=3)  ← Naya hook!
//   Hook 6: itemState (i=4)  ← Naya hook!
// ❌ State mismatch!
```

### **Example 3: Hook Inside Nested Function**

```javascript
// ❌ GALAT — Hook nested function ke andar
function Form() {
  const [count, setCount] = useState(0);
  
  const handleSubmit = () => {
    const [name, setName] = useState('');  // ❌ Nested function ke andar!
  };
  
  return <form onSubmit={handleSubmit}>{count}</form>;
}

// Problem:
// Render 1: Hook 1: count (handleSubmit call nahi hua, toh name wala hook call hi nahi hua)
// Render 2: Hook 1: count (ab handleSubmit call hua, toh name wala hook call hua)
// ❌ Hook order change ho gaya!
```

---

## ✅ **Right Examples — Jo Hamesha Karna Hai**

### **Example 1: Hook at Top-Level**

```javascript
// ✅ SAHI — Sab hooks top-level pe
function Counter({ showCount }) {
  const [count, setCount] = useState(0);  // Hook 1
  const [name, setName] = useState('');   // Hook 2
  const [age, setAge] = useState(0);      // Hook 3
  
  // Condition ke andar state use karo, hook nahi
  const displayName = showCount ? name : 'Hidden';
  
  return <div>{count} - {displayName}</div>;
}

// Har render pe same order:
// Hook 1: count
// Hook 2: name
// Hook 3: age
// ✅ Consistent!
```

### **Example 2: Conditional Hook Usage (Custom Hook)**

```javascript
// ✅ SAHI — Custom hook ke andar condition, lekin hook top-level
function useConditionalEffect(condition, effect) {
  // Hook top-level pe
  useEffect(() => {
    // Condition ke andar effect run karo
    if (condition) {
      effect();
    }
  }, [condition, effect]);  // Dependencies
}

// Usage:
function Component({ showNotification }) {
  useConditionalEffect(showNotification, () => {
    alert('Notification!');
  });
  
  return <div>...</div>;
}

// Hook top-level pe call hua, condition ke andar sirf logic hai
// ✅ Consistent!
```

### **Example 3: Dynamic Hooks (useMemo/useCallback)**

```javascript
// ✅ SAHI — useMemo/useCallback ke andar dynamic values
function List({ items }) {
  const [count, setCount] = useState(0);
  
  // useMemo top-level pe, dynamic calculation ke liye
  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: true
    }));
  }, [items]);
  
  return <div>{count}</div>;
}

// Hook top-level pe, calculation dynamic
// ✅ Consistent!
```

---

## 🔧 **Fiber Architecture — React ka Internal System**

### **Why Are We Talking About Fiber Here?**

```
Pehle humne samjha ki hooks top-level pe kyun hone chahiye.
Ab sawal ye hai — React internally hooks ko track kaise karta hai?

Jawab hai: **Fiber Architecture**

React har component ke liye ek Fiber node banata hai,
aur usi Fiber node ke andar hooks ki linked-list store hoti hai.

Toh hooks ko samajhne ke liye, Fiber ko samajhna zaroori hai.
```

### **What is Fiber? — The Complete Picture**

```
Fiber React 16+ ka internal data structure hai jo:

1. **Component Tree ko Represent Karta Hai**
   - Har component ke liye ek Fiber node
   - Parent-child relationships maintain karta hai
   - Sibling components ko link karta hai

2. **Hooks ko Store Karta Hai**
   - `memoizedState` property mein hooks ki linked-list
   - useState, useEffect, etc. sab yahan store hote hain
   - Har render pe same hooks access karne ke liye

3. **Reconciliation (Diffing) Karta Hai**
   - Previous render vs current render compare karta hai
   - `alternate` property mein do versions store karta hai
   - Kya change hua, kya update karna hai — ye decide karta hai

4. **Priority-Based Rendering Karta Hai**
   - `lanes` property se priority track karta hai
   - Important updates (user interaction) pehle
   - Kam important updates (data fetching) baad mein
```

### **Fiber Analogy — Restaurant Management**

```
🍽️ **Restaurant Scenario:**

🏗️ **Component Tree = Restaurant ka Layout**
   - Kitchen, dining area, counter (components)
   - Kaun kahan baitha hai (component hierarchy)

📋 **Fiber = Har Table ka Order Ticket**
   - Table number (component type)
   - Order details (props)
   - Special requests (state/hooks)
   - Order status (rendered, pending, updated)

🔄 **Reconciliation = Kitchen ka Process**
   - Pehle kya order tha? (previous render)
   - Ab kya order hai? (current render)
   - Kya change hua? (new items, removed items)
   - Kya banana hai? (re-render)

⚡ **Priority-Based Rendering = Waiter ka Kaam**
   - VIP customer → High priority (turant serve)
   - Regular customer → Normal priority (baad mein serve)
   - Takeaway order → Low priority (sabse baad mein)
```

### **Fiber Node Structure — Detailed Explanation**

```javascript
// React internally har component ke liye ek Fiber node banata hai:
const fiberNode = {
  // ==================== COMPONENT INFO ====================
  type: 'function',           // Component type (function/class/HostComponent)
  elementType: Counter,       // Component function reference
  key: null,                  // React key (lists mein use hoti hai)
  
  // ==================== STATE & EFFECTS ====================
  memoizedState: null,        // Linked-list head (hooks store hote hain)
  memoizedProps: null,        // Last rendered props (comparison ke liye)
  stateNode: null,            // Class component instance ya DOM element
  
  // ==================== TREE STRUCTURE ====================
  return: null,               // Parent fiber (upar wala component)
  child: null,                // First child fiber (pehla child component)
  sibling: null,              // Next sibling fiber (agla sibling component)
  
  // ==================== RECONCILIATION ====================
  pendingProps: null,         // New props (abhi aaye hain)
  alternate: null,            // Work-in-progress vs current (do versions)
                              // React do trees maintain karta hai:
                              // - Current tree (screen pe dikh raha hai)
                              // - Work-in-progress tree (next render)
  
  // ==================== PRIORITY ====================
  lanes: null,                // Priority lanes (kaunsa work priority)
  childLanes: null,           // Children priority (bachon ka priority)
  
  // ==================== SIDE EFFECTS ====================
  flags: null,                // Kya changes hain? (placement, update, deletion)
  subtreeFlags: null,         // Children ke changes
  deletions: null,            // Kaunse children delete honge
};
```

### **Why Fiber? — Problem & Solution**

```
❌ **Purana System (Stack Reconciler - React 15 aur pehle):**
   
   Problem:
   - React ek hi saath pura component tree render karta tha
   - Render synchronous tha — ek baar shuru hua toh khatam hone tak nahi rukta tha
   - Agar tree bada tha (1000+ components), toh UI freeze ho jata tha
   - User interaction respond nahi kar pata tha
   - Example: 1000 components render karte waqt, user ne click kiya → freeze!
   
   Technical Issue:
   - JavaScript call stack recursion pe depend karta tha
   - Recursion ko pause/resume nahi kar sakte
   - Ek baar render shuru hua → poora complete hona zaroori tha

✅ **Naya System (Fiber Reconciler - React 16+):**
   
   Solution:
   - React thoda thoda render karta hai (incremental rendering)
   - Fiber nodes ko linked-list ki tarah traverse karta hai
   - Beech mein pause/resume kar sakta hai
   - User interaction handle kar sakta hai
   - Important updates pehle process karta hai
   
   Technical Implementation:
   - Linked-list structure (recursion ki zaroorat nahi)
   - `alternate` property se do trees maintain karta hai
   - Work loop se pause/resume capability
   - `lanes` property se priority management
```

### **Fiber ka Work Loop — How React Renders**

```javascript
// React ka rendering process do phases mein hota hai:

// ==================== PHASE 1: RENDER PHASE ====================
// (Can be paused, resumed, and deprioritized)

// 1. React work loop start karta hai
while (thereIsWork) {
  // 2. Next priority work uthata hai
  const nextUnit = getNextUnitOfWork();
  
  // 3. Check karta hai — koi higher priority work toh nahi?
  if (higherPriorityWork) {
    // 4. Current work pause karo, higher priority pe jao
    yield; // Pause here!
    continue;
  }
  
  // 5. Current unit process karo
  const completed = performUnitOfWork(nextUnit);
  
  // 6. Next unit decide karo
  scheduleWork(completed);
}

// ==================== PHASE 2: COMMIT PHASE ====================
// (Cannot be interrupted — must complete)

// 1. Render phase complete hua
// 2. Ab DOM updates apply karo
commitRoot();

// Example Scenario:
// User ne click kiya → High priority update
// Data fetch complete hua → Low priority update
// React pehle click handle karega (render phase pause karke)
// Phir data update karega (baad mein resume karke)
```

### **Fiber aur Hooks — The Connection**

```javascript
// Fiber node ke andar hooks kaise store hote hain:
fiberNode.memoizedState = {
  // Hook 1: useState
  memoizedState: 0,           // State value (count)
  baseState: 0,               // Base state (update queue se pehle)
  queue: null,                // Update queue (setState calls)
  next: {                     // Linked-list ka next node
    // Hook 2: useState
    memoizedState: '',        // State value (name)
    baseState: '',
    queue: null,
    next: {
      // Hook 3: useEffect
      memoizedState: {        // Effect object
        create: () => { /* ... */ },
        destroy: undefined,
        deps: []
      },
      baseState: null,
      queue: null,
      next: null              // End of list
    }
  }
};

// Har render pe:
// 1. React first hook se start karta hai
// 2. Linked-list traverse karta hai
// 3. Har hook ka state update karta hai
// 4. Next hook pe jata hai (hookIndex++)
// 5. End tak pahunch ke stop karta hai
```

---

## 🎯 **Rules of Hooks — Complete List**

### **Rule 1: Only Call Hooks at the Top Level**

```javascript
// ✅ SAHI
function Component() {
  const [state, setState] = useState(0);  // Top-level
  useEffect(() => { /* ... */ });         // Top-level
  return <div>{state}</div>;
}

// ❌ GALAT
function Component() {
  if (condition) {
    const [state, setState] = useState(0);  // ❌ Inside condition
  }
  return <div>{state}</div>;
}
```

### **Rule 2: Only Call Hooks from React Functions**

```javascript
// ✅ SAHI
function Component() {
  const [state, setState] = useState(0);  // React function
  return <div>{state}</div>;
}

// ✅ SAHI (Custom Hook)
function useCustomHook() {
  const [state, setState] = useState(0);  // Custom hook (starts with "use")
  return state;
}

// ❌ GALAT
function regularFunction() {
  const [state, setState] = useState(0);  // ❌ Regular JavaScript function
  return state;
}
```

---

## 🎙️ **Interview Articulation**

### **Q: "Hooks top-level pe hi kyun? Loop/condition ke andar kyun nahi?"**

**Answer:** "React hooks ko **linked-list** mein store karta hai. Har render pe React same order mein hooks ko traverse karta hai. Agar tum hook ko condition ya loop ke andar call karoge, toh order change ho jayega — React confuse ho jayega ki kaunsa state kaunse hook se match karna hai.

Example:
- Render 1: Hook 1 (count), Hook 2 (name - condition ke andar), Hook 3 (age)
- Render 2: Hook 1 (count), Hook 2 (age - kyunki name wala hook call hi nahi hua!)
- ❌ State mismatch!

Isliye hooks ko hamesha top-level pe call karna chahiye — taaki har render pe same order maintain rahe."

### **Q: "React ka internal linked-list system kaise kaam karta hai?"**

**Answer:** "React internally har component ke liye ek **Fiber node** banata hai. Fiber node ke andar `memoizedState` property hoti hai jo hooks ki linked-list ka head hoti hai.

Jab tum hook call karte ho:
1. React current index se linked-list traverse karta hai
2. Agar hook nahi mila (pehli render), toh naya hook create karke linked-list mein add karta hai
3. Agar hook mila (subsequent renders), toh existing hook use karta hai
4. Hook index increment hota hai, aur next hook pe jata hai

Isliye order maintain rehna zaroori hai — agar order change hua, toh React galat hook se state match kar dega."

### **Q: "Fiber architecture kya hai?"**

**Answer:** "Fiber React ka internal data structure hai jo:
1. **Component tree** ko represent karta hai (parent-child-sibling relationships)
2. **Hooks** ko store karta hai (linked-list mein `memoizedState` property mein)
3. **Reconciliation** karta hai (`alternate` property se previous vs current compare karta hai)
4. **Priority-based rendering** karta hai (`lanes` property se priority track karta hai)

Fiber architecture React ko allow karta hai:
- **Incremental rendering** — thoda thoda render karna (pause/resume capability)
- **Priority-based updates** — important updates pehle (user interaction > data fetching)
- **Concurrent mode** — multiple updates ek saath manage karna

Example:
- User ne click kiya → High priority → React render pause karke click handle karega
- Data fetch complete hua → Low priority → React baad mein update karega"

### **Q: "Custom hooks banate waqt kya dhyan rakhna chahiye?"**

**Answer:** "Custom hooks banate waqt:
1. **Naam 'use' se start hona chahiye** — taaki React samajh sake ki ye hook hai
2. **Hooks top-level pe call karo** — custom hook ke andar bhi same rules apply
3. **Dependencies array sahi se do** — `useEffect`, `useMemo`, `useCallback` mein
4. **State encapsulate karo** — custom hook ke andar state manage karo
5. **Return values properly structure karo** — object ya array return karo

Example:
```javascript
function useCounter(initialValue = 0) {
  // Hooks top-level pe
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  // Properly structured return
  return {
    count,
    increment,
    decrement
  };
}
```

---

## 📝 **Quick Reference**

### **Rules of Hooks:**

```
✅ DO:
- Hooks ko top-level pe call karo
- React functions ya custom hooks ke andar call karo
- Same order maintain rakho har render pe

❌ DON'T:
- Loops ke andar call karo
- Conditions ke andar call karo
- Nested functions ke andar call karo
- Regular JavaScript functions ke andar call karo
```

### **Fiber Node Key Properties:**

```
Fiber Node:
- type: Component type
- memoizedState: Hooks linked-list
- return: Parent
- child: First child
- sibling: Next sibling
- pendingProps: New props
- memoizedProps: Old props
- alternate: WIP vs current
- lanes: Priority
```

### **Hooks Linked-List:**

```
memoizedState:
├─ Hook 1: useState (count)
│  ├─ memoizedState: 0
│  ├─ queue: []
│  └─ next: Hook 2
│
├─ Hook 2: useState (name)
│  ├─ memoizedState: ''
│  ├─ queue: []
│  └─ next: Hook 3
│
└─ Hook 3: useEffect
   ├─ memoizedState: { effect }
   ├─ queue: null
   └─ next: null
```

### **Fiber Benefits:**

```
✅ Incremental Rendering — thoda thoda render
✅ Priority-Based Updates — important kaam pehle
✅ Concurrent Mode — multiple updates manage
✅ Pause/Resume — beech mein user interaction handle
```

---

> **Pro Tip:** Interview mein jab bhi hooks discuss ho, **linked-list** zaroor mention karna. Ye demonstrate karta hai ki tum sirf hooks use nahi karte, balki unke internal implementation bhi samajhte ho! 🎯