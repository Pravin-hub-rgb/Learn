# ⚛️ Phase 2: Topic 11 - useMemo & useCallback

> **Interview Question:** "useMemo aur useCallback mein kya difference hai? 'Expensive calculation' ka matlab kya hai? React ko nahi pata ki calculation expensive hai? Kab use karna chahiye, kab nahi?"

---

## 🚨 **The Golden Rule — Sabse Pehle Samjho!**

> **"useMemo values ko memoize karta hai, useCallback functions ko memoize karta hai. Dono sirf performance optimization ke liye hain — zaroori nahi ki har jagah use karo."**

### **Sabse Important Baat — Kyun Zaroori Hain?**

```
React mein har render pe:
1. Component function dobara execute hota hai
2. Saare variables dobara create hote hain
3. Saare functions dobara create hote hain

Problem:
- Expensive calculations har render pe hote hain (performance issue)
- Functions har render pe naye hote hain (child components re-render)

Solution:
- useMemo → Expensive calculations ko cache karo
- useCallback → Functions ko cache karo

Par ye sab React ko internally pata NAHI chalta — humein manually batana padta hai!
```

---

## 💡 **Beginner-Friendly Explanation**

### 🧮 **useMemo = Calculator ka Result Yaad Rakhna**

```
Socho tum ek complex math problem solve kar rahe ho:

❌ **Bina useMemo:**
   - Har baar same problem solve karo
   - 2 + 2 = 4 (pehli baar)
   - 2 + 2 = 4 (dusri baar) — SAME calculation again!
   - 2 + 2 = 4 (teesri baar) — SAME calculation again!
   - Time waste!

✅ **useMemo ke saath:**
   - Pehli baar solve karo → Result yaad rakho
   - Dusri baar → Yaad se result nikaalo (no calculation)
   - Teesri baar → Yaad se result nikaalo (no calculation)
   - Time bacha!

Par dhyan rahe:
- Sirf tab yaad rakho jab numbers change hon
- Agar numbers change hue, toh dobara solve karo
```

### 📦 **useCallback = Function ka Reference Yaad Rakhna**

```
Socho tumhare paas ek tool hai:

❌ **Bina useCallback:**
   - Har baar naya tool khareedo
   - Pehle din: Hammer khareeda (₹500)
   - Dusre din: Hammer khareeda (₹500) — SAME tool!
   - Teesre din: Hammer khareeda (₹500) — SAME tool!
   - Paise waste!

✅ **useCallback ke saath:**
   - Pehli baar: Hammer khareeda → Yaad rakho
   - Dusri baar: Wahi purana hammer use karo
   - Teesri baar: Wahi purana hammer use karo
   - Paise bacha!

Par dhyan rahe:
- Sirf tab yaad rakho jab tool ki zaroorat change na ho
- Agar zaroorat change hui, toh naya tool khareedo
```

---

## 🔄 **useMemo — Values ko Memoize Karna**

### **Syntax:**
```javascript
const memoizedValue = useMemo(() => {
  // Expensive calculation
  return result;
}, [dependencies]);
```

### **Example 1: Expensive Calculation**
```javascript
// ❌ GALAT — Har render pe expensive calculation
function UserList({ users }) {
  // Har render pe ye calculation hoga!
  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
  const filteredUsers = users.filter(user => user.isActive);

  return (
    <div>
      {filteredUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// Problem:
// 1. users array same hai, lekin calculation har render pe ho rahi hai
// 2. sort() aur filter() expensive operations hain (O(n log n) + O(n))
// 3. Agar 1000 users hain, toh har render pe ~1500 operations!
// 4. Performance issue!
```

### **Example 2: useMemo ke Saath**

```javascript
// ✅ SAHI — Calculation ko memoize karo
function UserList({ users }) {
  const sortedUsers = useMemo(() => {
    console.log("Sorting users...");  // Sirf jab users change honge
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);  // ← Sirf jab users array change hoga

  const filteredUsers = useMemo(() => {
    console.log("Filtering users...");  // Sirf jab users change honge
    return users.filter(user => user.isActive);
  }, [users]);  // ← Sirf jab users array change hoga

  return (
    <div>
      {filteredUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// How it works:
// 1. Pehle render pe: sort() + filter() execute honge
// 2. Dusre render pe (agar users same hain): Cached result use hoga
// 3. Teesre render pe (agar users same hain): Cached result use hoga
// 4. Jab users change honge: Dobara sort() + filter() execute honge
```

### **Example 3: Derived State**

```javascript
// ✅ SAHI — Derived state calculate karna
function ShoppingCart({ items }) {
  const [quantity, setQuantity] = useState(1);

  // ❌ GALAT — Har render pe calculation
  // const totalPrice = items.reduce((sum, item) => sum + (item.price * quantity), 0);

  // ✅ SAHI — useMemo ke saath
  const totalPrice = useMemo(() => {
    console.log("Calculating total...");
    return items.reduce((sum, item) => sum + (item.price * quantity), 0);
  }, [items, quantity]);  // ← Jab items YA quantity change hoga

  return (
    <div>
      <p>Total: ${totalPrice}</p>
      <button onClick={() => setQuantity(quantity + 1)}>Increase</button>
    </div>
  );
}
```

---

## 🔄 **useCallback — Functions ko Memoize Karna**

### **Syntax:**

```javascript
const memoizedFunction = useCallback(() => {
  // Function logic
}, [dependencies]);
```

### **Example 1: Child Component Re-render Problem**

```javascript
// ❌ GALAT — Function har render pe naya hota hai
function Parent() {
  const [count, setCount] = useState(0);

  // Har render pe NAYA function create hota hai!
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />  // ← Har render pe naya function!
    </div>
  );
}

function Child({ onClick }) {
  console.log("Child rendered!");
  return <button onClick={onClick}>Click me</button>;
}

// Problem:
// 1. Parent render hota hai → handleClick NAYA function hai
// 2. Child ko naya function prop milta hai → Child re-render hota hai
// 3. Parent dobara render hota hai → handleClick NAYA function hai
// 4. Child ko naya function prop milta hai → Child re-render hota hai
// 5. Infinite re-renders! (agar Child bhi setState kare)
```

### **Example 2: useCallback ke Saath**

```javascript
// ✅ SAHI — Function ko memoize karo
function Parent() {
  const [count, setCount] = useState(0);

  // ✅ useCallback ke saath — Function reference SAME rehta hai
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);  // ← Empty array — function kabhi change nahi hoga

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />  // ← Same function reference!
    </div>
  );
}

// React.memo ke saath Child:
const Child = React.memo(({ onClick }) => {
  console.log("Child rendered!");
  return <button onClick={onClick}>Click me</button>;
});

// How it works:
// 1. Parent render hota hai → handleClick SAME function reference
// 2. Child ko same function prop milta hai → Child re-render NAHI hota
// 3. Parent dobara render hota hai → handleClick SAME function reference
// 4. Child ko same function prop milta hai → Child re-render NAHI hota
// ✅ Performance optimize!
```

### **Example 3: useCallback with Dependencies**

```javascript
// ✅ SAHI — Dependencies ke saath
function SearchResults({ searchTerm }) {
  const [results, setResults] = useState([]);

  // ✅ useCallback — jab searchTerm change hoga, tab naya function
  const fetchResults = useCallback(async () => {
    const data = await searchAPI(searchTerm);
    setResults(data);
  }, [searchTerm]);  // ← jab searchTerm change hoga

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <div>
      {results.map(result => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}

// How it works:
// 1. Pehle render pe: fetchResults create hua (searchTerm = "")
// 2. searchTerm change hua: fetchResults dobara create hua (searchTerm = "React")
// 3. searchTerm change hua: fetchResults dobara create hua (searchTerm = "Vue")
// 4. searchTerm same raha: fetchResults SAME function reference use hua
```

---

## ⚖️ **useMemo vs useCallback — Difference Kya Hai?**

### **Comparison Table:**

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│                     │      useMemo        │    useCallback      │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ Kya memoize karta   │    VALUES           │    FUNCTIONS        │
│ hai?                │   (calculation)     │   (function ref)    │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ Return karta hai    │   memoizedValue     │   memoizedFunction  │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ Use case            │   Expensive         │   Function          │
│                     │   calculations      │   references        │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ Example             │   sort(), filter(), │   onClick handlers, │
│                     │   reduce()          │   API call functions│
└─────────────────────┴─────────────────────┴─────────────────────┘
```

### **Code Comparison:**

```javascript
// useMemo — VALUE ko memoize karta hai
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);  // ← VALUE return karna hai
}, [data]);

// useCallback — FUNCTION ko memoize karta hai
const handleClick = useCallback(() => {
  heavyCalculation(data);  // ← Function logic, return nahi karna
}, [data]);

// Equivalent hai:
// useCallback(fn, deps) === useMemo(() => fn, deps)
```

### **Real Example:**

```javascript
function Dashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  // useMemo — VALUE calculate karo
  const userStats = useMemo(() => {
    return calculateStats(user);  // ← VALUE return hui
  }, [user]);

  // useCallback — FUNCTION memoize karo
  const fetchUserStats = useCallback(() => {
    const stats = calculateStats(user);  // ← Function logic
    setStats(stats);
  }, [user]);

  return (
    <div>
      <p>Stats: {JSON.stringify(userStats)}</p>
      <button onClick={fetchUserStats}>Refresh Stats</button>
    </div>
  );
}
```

---

## 🤔 **"Expensive Calculation" Ka Matlab Kya Hai?**

### **React Ko Nahi Pata Ki Calculation Expensive Hai!**

```
React internally:
- Sirf reference comparison karta hai (===)
- React ko NAHI pata ki tum kya calculation kar rahe ho
- React ko NAHI pata ki tumhara function expensive hai ya cheap

Humari zimmedari hai:
- Hum khud decide karte hain ki kaunsi calculation expensive hai
- Hum khud decide karte hain ki kaunsi calculation memoize karni hai
```

### **Kaunsi Calculations Expensive Hain?**

```javascript
// ✅ Expensive Calculations (memoize karo):

// 1. Array sorting (O(n log n))
const sorted = useMemo(() => {
  return items.sort((a, b) => a.value - b.value);
}, [items]);

// 2. Array filtering + mapping (O(n) + O(n))
const filtered = useMemo(() => {
  return items.filter(item => item.active).map(item => item.name);
}, [items]);

// 3. Array reducing (O(n))
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);

// 4. String operations (O(n))
const formatted = useMemo(() => {
  return items.map(item => item.name.toUpperCase()).join(", ");
}, [items]);

// 5. Complex object transformations
const transformed = useMemo(() => {
  return items.map(item => ({
    ...item,
    processed: true,
    timestamp: new Date().toISOString()
  }));
}, [items]);

// 6. API data processing
const processedData = useMemo(() => {
  return apiResponse.data.map(item => transformItem(item));
}, [apiResponse]);
```

```javascript
// ❌ Cheap Calculations (memoize MAT karo):

// 1. Simple arithmetic
const sum = a + b;  // No need to memoize!

// 2. Simple string concatenation
const fullName = firstName + " " + lastName;  // No need to memoize!

// 3. Simple object creation
const config = { theme: "dark", lang: "en" };  // No need to memoize!

// 4. Simple array access
const firstItem = items[0];  // No need to memoize!

// 5. Simple boolean checks
const isActive = user.status === "active";  // No need to memoize!
```

### **Rule of Thumb:**

```
Memoize karo agar:
1. Calculation O(n) ya zyada complex hai (sort, filter, reduce, map)
2. Data bada hai (100+ items)
3. Calculation har render pe ho rahi hai
4. Performance issue dikh raha hai

Mat karo agar:
1. Calculation O(1) hai (simple arithmetic, string concat)
2. Data chota hai (< 10 items)
3. Calculation sirf kabhi kabhi ho rahi hai
4. Performance issue nahi hai

Remember:
- Memoization ka bhi overhead hota hai (memory + dependency tracking)
- Har jagah useMemo/useCallback use karna performance WORSEN kar sakta hai!
```

---

## ⚠️ **Kab Use Karna Chahiye, Kab Nahi?**

### **✅ Use Karna Chahiye:**

```javascript
// 1. Expensive calculations
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);

// 2. Functions passed to optimized child components
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);
return <MemoizedButton onClick={handleClick} />;

// 3. Functions in dependency arrays
const fetchData = useCallback(async () => {
  const data = await api.get();
  setData(data);
}, []);
useEffect(() => {
  fetchData();
}, [fetchData]);

// 4. Objects/Arrays passed as props
const config = useMemo(() => ({
  theme: "dark",
  language: "en"
}), []);
return <Child config={config} />;
```

### **❌ Use Nahi Karna Chahiye:**

```javascript
// 1. Simple calculations
const sum = useMemo(() => a + b, [a, b]);  // ❌ Overkill!
const sum = a + b;  // ✅ Sahi

// 2. Functions jo kabhi child ko nahi jaate
const handleClick = useCallback(() => {  // ❌ Overkill!
  console.log("Clicked!");
}, []);
// ✅ Bina useCallback ke bhi chalega

// 3. Har render pe naye values ke saath
const result = useMemo(() => {
  return Math.random();  // ❌ Har render pe naya value!
}, []);

// 4. Jahan performance issue hi nahi hai
const items = useMemo(() => [1, 2, 3], []);  // ❌ Chota array!
const items = [1, 2, 3];  // ✅ Sahi
```

---

## 🎯 **Common Patterns — Best Practices**

### **Pattern 1: Expensive List Processing**

```javascript
// ✅ SAHI — List ko process karna
function UserList({ users, filter, sortBy }) {
  const processedUsers = useMemo(() => {
    let result = users;

    // Filter
    if (filter) {
      result = result.filter(user => user.role === filter);
    }

    // Sort
    if (sortBy) {
      result = result.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }

    return result;
  }, [users, filter, sortBy]);

  return (
    <div>
      {processedUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### **Pattern 2: Event Handlers with Dependencies**

```javascript
// ✅ SAHI — Event handlers ko memoize karna
function Form({ onSubmit, initialValues }) {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = useCallback(() => {
    onSubmit(values);
  }, [values, onSubmit]);

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### **Pattern 3: API Call Functions**

```javascript
// ✅ SAHI — API call functions ko memoize karna
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    const data = await fetchUserAPI(userId);
    setUser(data);
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <div>{user?.name}</div>;
}
```

### **Pattern 4: Derived State from Props**

```javascript
// ✅ SAHI — Props se derived state calculate karna
function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const totalPrice = useMemo(() => {
    return product.price * quantity * (1 - product.discount);
  }, [product.price, quantity, product.discount]);

  return (
    <div>
      <p>Price: ${totalPrice}</p>
      <input
        type="number"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      />
    </div>
  );
}
```

---

## 🎙️ **Interview Articulation**

### **Q: "useMemo aur useCallback mein kya difference hai?"**

**Answer:** "useMemo aur useCallback dono memoization hooks hain, lekin alag cheezo ko memoize karte hain:

- **useMemo** VALUES ko memoize karta hai — expensive calculations ka result cache karta hai
- **useCallback** FUNCTIONS ko memoize karta hai — function references cache karta hai

Example:
```javascript
// useMemo — VALUE return karta hai
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// useCallback — FUNCTION return karta hai
const handleClick = useCallback(() => {
  heavyCalculation(data);
}, [data]);

// Technically equivalent:
// useCallback(fn, deps) === useMemo(() => fn, deps)
```

useMemo tab use karte hain jab expensive calculation ka result cache karna ho. useCallback tab use karte hain jab function reference same rakhna ho (jaise child components ko pass karte waqt)."

### **Q: "'Expensive calculation' ka matlab kya hai? React ko nahi pata ki calculation expensive hai?"**

**Answer:** "React ko internally NAHI pata ki calculation expensive hai. React sirf reference comparison karta hai (`===`), calculation complexity nahi dekhta. Humari zimmedari hai ki hum khud decide karein ki kaunsi calculation expensive hai.

Expensive calculations hain:
- Array sorting (O(n log n))
- Array filtering + mapping (O(n) + O(n))
- Array reducing (O(n))
- Complex object transformations
- String operations on large data

Cheap calculations hain:
- Simple arithmetic (a + b)
- Simple string concatenation
- Simple object/array access

React ko manually batana padta hai ki kaunsi calculation memoize karni hai. Isliye hum useMemo/useCallback use karte hain."

### **Q: "Kab useMemo/useCallback use karna chahiye, kab nahi?"**

**Answer:** "useMemo/useCallback use karna chahiye:

1. **Expensive calculations** — sort(), filter(), reduce(), map() on large data
2. **Functions passed to optimized child components** — React.memo ke saath
3. **Functions in dependency arrays** — useEffect mein
4. **Objects/Arrays passed as props** — Taaki child components re-render na hon

Use nahi karna chahiye:

1. **Simple calculations** — a + b, string concat
2. **Functions jo kabhi child ko nahi jaate**
3. **Har render pe naye values** — Math.random()
4. **Jahan performance issue hi nahi hai**

Remember: Memoization ka bhi overhead hota hai (memory + dependency tracking). Har jagah use karna performance WORSEN kar sakta hai. Sirf wahan use karo jahan actual performance benefit ho."

### **Q: "useCallback kyun zaroori hai? Sirf useMemo use kar sakte hain?"**

**Answer:** "useCallback zaroori hai kyunki functions har render pe naye create hote hain. Agar function ko child component ko pass karte hain, toh child har baar re-render hoga kyunki naya function reference milega.

useCallback function reference ko cache karta hai, taaki child component ko same reference mile aur child re-render na ho.

Technically, useMemo use kar sakte hain:
```javascript
// useCallback:
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);

// Equivalent with useMemo:
const handleClick = useMemo(() => () => {
  console.log("Clicked!");
}, []);
```

Lekin useCallback zyada readable hai aur specifically functions ke liye designed hai. Isliye functions ke liye useCallback use karna better hai."

---

## 📝 **Quick Reference**

### **useMemo vs useCallback:**

```javascript
// useMemo — VALUE ko memoize karta hai
const value = useMemo(() => calculation(), [deps]);

// useCallback — FUNCTION ko memoize karta hai
const fn = useCallback(() => { /* logic */ }, [deps]);

// Equivalent:
// useCallback(fn, deps) === useMemo(() => fn, deps)
```

### **When to Use:**

```
✅ USE:
- Expensive calculations (sort, filter, reduce, map)
- Functions passed to React.memo child components
- Functions in dependency arrays
- Objects/Arrays passed as props

❌ DON'T USE:
- Simple calculations (a + b)
- Functions jo child ko nahi jaate
- Har render pe naye values
- Jahan performance issue hi nahi
```

### **Expensive Calculations:**

```javascript
// ✅ Memoize karo:
- items.sort()
- items.filter()
- items.reduce()
- items.map()
- Complex object transformations
- API data processing

// ❌ Mat karo:
- a + b
- firstName + " " + lastName
- items[0]
- user.status === "active"
```

### **Best Practices:**

```
1. Pehle profile karo, phir optimize karo
2. Memoization ka bhi overhead hota hai
3. Sirf wahan use karo jahan actual benefit ho
4. Dependencies array sahi se define karo
5. Stale closures se bacho (sahi dependencies do)
```

---

> **Pro Tip:** Interview mein useMemo/useCallback discuss karte waqt **"React ko internally nahi pata"** zaroor mention karna. Ye demonstrate karta hai ki tum sirf hooks use nahi karte, balki unke internal workings bhi samajhte ho! 🎯