# Doc 09.2 — Toggle: Checkbox Banao Aur Logic Test Karo ✅
### (Sirf frontend — UI se toggle verify karna)

---

## Pehle Yaad Karte Hain

Doc 09.1 mein:
- Toggle ke liye `PUT` method use karenge
- Same `[id]/route.ts` file mein PUT add hoga — kyunki same ID chahiye URL mein
- Abhi file waise hi hai — backend is doc mein nahi, aage banayenge

**Pehle frontend mein checkbox banate hain — step by step.**

---

## Step 1 — Pehle Sirf Checkbox Banao

List item mein checkbox add karo — `onChange` pe abhi sirf `console.log`:

```typescript
{todos.map((todo) => (
  <li
    key={todo._id}
    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
  >
    {/* Naya — Checkbox */}
    <input
      type="checkbox"
      checked={todo.done}
      onChange={() => console.log("Clicked! done abhi hai:", todo.done)}
      className="w-4 h-4 accent-blue-500 cursor-pointer"
    />

    <span className="flex-1 text-base text-gray-700">
      {todo.title}
    </span>

    <button
      onClick={() => deleteTodo(todo._id)}
      className="text-red-400 hover:text-red-600 transition-colors
                 text-sm px-2 py-1 rounded hover:bg-red-50"
    >
      Delete
    </button>
  </li>
))}
```

**`checked={todo.done}` kyun?**

React mein checkbox `checked` prop se control hota hai — state se sync rehta hai. `todo.done` `false` hai toh unchecked, `true` hai toh checked dikhega.

---

## ✅ Pehla Test

Browser mein dekho — har todo pe checkbox dikhna chahiye.

Console kholo (F12 → Console) — checkbox click karo:

```
Clicked! done abhi hai: false
```

**ID nahi — sirf current `done` value dikhegi.** Yeh expected hai. 🎉

---

## Step 2 — `!` Operator — Toggle Logic Samjho

Backend ko kya bhejenge? Agar todo abhi `false` hai — `true` bhejo. Agar `true` hai — `false` bhejo. **Ulta kar do.**

JavaScript mein `!` operator boolean ulta karta hai:

```javascript
!false  // → true
!true   // → false
```

Toh toggle logic:
```javascript
!todo.done
// todo.done = false  →  !false = true   ← "done true kar do"
// todo.done = true   →  !true  = false  ← "done false kar do"
```

---

## Step 3 — `toggleDone` Function Banao — Sirf Log Karo

Ab `console.log` ki jagah proper function banao. Abhi bas toggle logic verify karenge — fetch nahi karenge abhi:

```typescript
async function toggleDone(id: string, currentDone: boolean) {
  console.log("ID:", id)
  console.log("Abhi done hai:", currentDone)
  console.log("Update karenge:", !currentDone)
}
```

Checkbox update karo:

```typescript
<input
  type="checkbox"
  checked={todo.done}
  onChange={() => toggleDone(todo._id, todo.done)}
  className="w-4 h-4 accent-blue-500 cursor-pointer"
/>
```

---

## ✅ Doosra Test — Yahan Ek Cheez Dhyan Rakho

Checkbox click karo — console mein dekhna chahiye:

```
ID: 65a1b2c3...
Abhi done hai: false
Update karenge: true
```

**Lekin!** — Agar dobara click karo — console mein phir bhi:
```
Abhi done hai: false
Update karenge: true
```

Hamesha `false` → `true` dikhta hai — kabhi `true` → `false` nahi hota!

**Kyun?**

Kyunki `todo.done` state se aa raha hai — aur state update nahi ho rahi abhi. Humne abhi sirf `console.log` kiya, `setTodos` nahi kiya. Toh React ko pata hi nahi ki kuch badla — `todo.done` hamesha `false` hi rehta hai.

**Yeh bug nahi hai** — yeh expected hai is step pe. State update backend ke baad karenge — tab sahi hoga.

Abhi sirf confirm karo ki function call ho raha hai aur `!currentDone` sahi value de raha hai pehli call pe.

---

## Summary — Doc 09.2 Mein Kya Kiya

✅ **Checkbox add kiya** — `checked={todo.done}` se controlled

✅ **`!` operator** — boolean toggle logic

✅ **`toggleDone` skeleton** — sirf log kiya, fetch nahi

✅ **Yeh samjha** — state update nahi hogi tab tak jab tak backend na ho

---

## Agla Step — Doc 09.3

**Doc 09.3: Fetch Call + Backend PUT Handler**

Ab actual PUT request bhejenge — 404 aayega — tab backend banayenge. 🚀
