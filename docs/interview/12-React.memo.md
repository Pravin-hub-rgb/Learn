# ⚛️ Phase 2: Topic 12 - React.memo

> **Interview Question:** "React.memo aur useMemo mein kya difference hai? Component-level memoization kaise kaam karta hai? Kab React.memo use karna chahiye, kab nahi?"

---

## 🚨 **The Golden Rule — Sabse Pehle Samjho!**

> **"React.memo component-level memoization ke liye use hota hai, useMemo se alag hai kyunki useMemo values ko memoize karta hai, jabki React.memo pura component memoize karta hai. Dono sirf performance optimization ke liye hain — zaroori nahi ki har jagah use karo."**

### **Sabse Important Baat — Kyun Zaroori Hain?**

```
React mein har render pe:
1. Component function dobara execute hota hai
2. Saare child components dobara render hote hain
3. Saare props dobara evaluate hote hain

Problem:
- Expensive components har render pe re-render hote hain (performance issue)
- Child components unnecessary re-render hote hain (performance issue)
- Props same hain, lekin components dobara render hote hain

Solution:
- React.memo → Components ko cache karo
- useMemo → Values ko cache karo
- useCallback → Functions ko cache karo

Par ye sab React ko internally pata NAHI chalta — humein manually batana padta hai!
```

---

## 💡 **Beginner-Friendly Explanation**

### 🎨 **React.memo = Expensive Painting ko Avoid Karna**

```
Socho tum ek expensive painting bana rahe ho:

❌ **Bina React.memo:**
   - Har baar naya painting banao
   - Pehle din: Expensive painting banaya (₹5000)
   - Dusre din: Expensive painting banaya (₹5000) — SAME painting!
   - Teesre din: Expensive painting banaya (₹5000) — SAME painting!
   - Paise waste!

✅ **React.memo ke saath:**
   - Pehli baar: Expensive painting banaya → Yaad rakho
   - Dusri baar: Wahi purana painting dikhao (no new painting)
   - Teesri baar: Wahi purana painting dikhao (no new painting)
   - Paise bacha!

Par dhyan rahe:
- Sirf tab painting yaad rakho jab colors change hon
- Agar colors change hue, toh naya painting banayo
```

### 📦 **useMemo vs React.memo — Difference Kya Hai?**

```
useMemo = Calculator ka Result Yaad Rakhna
React.memo = Expensive Painting ko Avoid Karna

useMemo: "Ye calculation expensive hai, result yaad rakho"
React.memo: "Ye component expensive hai, re-render avoid karo"
```

---

## 🔄 **React.memo — Components ko Memoize Karna**

### **Syntax:**

```javascript
const MemoizedComponent = React.memo(Component, areEqual);
```

### **Example 1: Simple React.memo Usage**

```javascript
// ❌ GALAT — Har render pe expensive component re-render hoga
function Parent() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState