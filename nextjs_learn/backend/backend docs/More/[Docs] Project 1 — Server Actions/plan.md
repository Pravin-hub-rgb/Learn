Code ek hi jagah se shuru hoga aur **wahi code dheere dheere badhta rahega** — naya UI aayega tabhi jab naya feature chahiye hoga.

---

**Soch aise — ek beginner ka natural flow:**

> "Mujhe todo app banana hai... toh pehle kuch type karke add toh kar sakun... bas itna kafi hai abhi"

> "Add ho gaya — ab dikhna chahiye na screen pe... chalo list banaata hoon"

> "List dikh rahi hai — ab complete karna chahiye... checkbox lagaata hoon"

> "Checkbox hai — ab delete bhi chahiye... button lagaata hoon"

Har step pe **wahi purana code upgrade hota hai** — naya nahi likhte from scratch.

---

**Doc 1 — Why Server Actions**
- 1.1 — Pehle API routes tha, problem kya thi, Server Actions kyun

**Doc 2 — Why Prisma + Database**
- 2.1 — Data store kahan karein, raw SQL ki dikkat, Prisma kyun, Neon kyun

**Doc 3 — Setup**
- 3.1 — Next.js project + folder structure samjho
- 3.2 — Neon pe PostgreSQL setup
- 3.3 — Prisma install karo
- 3.4 — lib/prisma.ts banao
- 3.5 — Hot reload — sirf samjho, implement nahi karna
- 3.6 — Todo model banao + migrate karo

**Doc 4 — Pehla Kaam: Todo Add Karna**
- 4.1 — Sirf UI — input aur button
- 4.2 — TodoForm.tsx mein hi Server Action — onClick se shuru, naturally form action tak, FormData samjho
- 4.3 — Database mein save karo — prisma.todo.create()

**Doc 5 — Ab Dikhao: Todos Read Karna + Organize Karo**
- 5.1 — Add ho raha hai par dikh nahi raha — list UI banao
- 5.2 — Database se fetch karo — wahi page pe dikhao
- 5.3 — TodoForm mein UI + action dono hain — actions.ts mein move karo
         (wahi code move hua — naya nahi likha — organize kiya sirf)

**Doc 6 — Wahi List Upgrade: Complete Toggle**
- 6.1 — Har todo ke saath checkbox add karo (wahi `<li>` upgrade hogi)
- 6.2 — actions.ts mein updateTodo action likho

**Doc 7 — Wahi List Upgrade: Delete**
- 7.1 — Delete button add karo wahi `<li>` mein
- 7.2 — actions.ts mein deleteTodo action likho

**Doc 8 — Ab Polish Karo: Loading + Errors**
- 8.1 — Kuch ho raha hai user ko pata nahi — loading states
- 8.2 — Kuch galat ho gaya — error handle karo

---

**Flow yaad rakho:**

- Doc 4 mein sirf input + button hai
- Doc 5 mein uske neeche list aati hai — aur actions.ts organize hoti hai
- Doc 6 mein wahi list ki `<li>` mein checkbox aata hai
- Doc 7 mein wahi `<li>` mein delete button aata hai

**Wahi ek code file dheere dheere badhti ja rahi hai.**