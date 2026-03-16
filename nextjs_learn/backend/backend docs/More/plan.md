Bhai ab bilkul samjha.

Code ek hi jagah se shuru hoga aur **wahi code dheere dheere badhta rahega** — naya UI aayega tabhi jab naya feature chahiye hoga.

---

**Soch aise — ek beginner ka natural flow:**

> "Mujhe todo app banana hai... toh pehle kuch type karke add toh kar sakun... bas itna kafi hai abhi"

> "Add ho gaya — ab dikhna chahiye na screen pe... chalol list banaata hoon"

> "List dikh rahi hai — ab complete karna chahiye... checkbox lagaata hoon"

> "Checkbox hai — ab delete bhi chahiye... button lagaata hoon"

Har step pe **wahi purana code upgrade hota hai** — naya nahi likhte from scratch.

---

**Revised Structure:**

**Doc 1 — Why Server Actions**
- 1.1 — Pehle se API routes tha, problem kya thi, Server Actions kyun

**Doc 2 — Why Prisma + Database**
- 2.1 — Data store kahan karein, raw SQL ki dikkat, Prisma kyun, Neon kyun

**Doc 3 — Setup**
- 3.1 — Next.js project + folder structure samjho
- 3.2 — Neon pe PostgreSQL setup
- 3.3 — Prisma install + Neon se connect
- 3.4 — Todo model banao + migrate karo

**Doc 4 — Pehla Kaam: Todo Add Karna**
- 4.1 — Sirf ek input aur button — bas itna UI
- 4.2 — Yeh button kuch kare — Server Action banao
- 4.3 — Action ko form se jodo — ab actually add ho

**Doc 5 — Ab Dikhao: Todos Read Karna**
- 5.1 — Add toh ho raha hai par dikh nahi raha — list UI banao
- 5.2 — Database se fetch karo — wahi page pe dikhao

**Doc 6 — Wahi List Upgrade: Complete Toggle**
- 6.1 — Har todo ke saath checkbox add karo (wahi `<li>` upgrade hogi)
- 6.2 — Checkbox click pe Server Action — update karo DB mein

**Doc 7 — Wahi List Upgrade: Delete**
- 7.1 — Har todo ke saath delete button add karo (wahi `<li>` aur upgrade)
- 7.2 — Button click pe Server Action — delete karo DB se

**Doc 8 — Ab Polish Karo: Loading + Errors**
- 8.1 — Kuch ho raha hai user ko pata nahi — loading states
- 8.2 — Kuch galat ho gaya — error handle karo

---

Dekho — Doc 4 mein sirf input + button hai. Doc 5 mein uske neeche list aati hai. Doc 6 mein wahi list ki `<li>` mein checkbox aata hai. Doc 7 mein wahi `<li>` mein delete button aata hai.

**Wahi ek code file dheere dheere badhti ja rahi hai.**

Yeh theek hai ab?