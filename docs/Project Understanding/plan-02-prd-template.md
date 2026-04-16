# 📋 Plan Phase — Doc 2: PRD Template (Blank)
### Har Naye Project Ke Liye — Copy Karo, Fill Karo

---

> Ye template hai jo har project shuru karne se pehle fill karna hai.
> Copy karo, rename karo `prd-[project-name].md`, aur fill karo.
> 20-30 minute lagao isme — baad mein ghanton ka confusion bachega.

---

## 🏷️ Project Identity

```
PROJECT NAME     : ___________________________________

TYPE             : [ ] Web App   [ ] SaaS   [ ] Tool   [ ] Dashboard
                   [ ] E-commerce   [ ] Portfolio   [ ] Other: _______

ONE LINE         : "Ye ek _______ hai jo _______ ke liye _______ karta hai."

DEADLINE         : ___________________________________

SOLO / TEAM      : [ ] Solo   [ ] Team (size: ___)
```

---

## 👤 Target User

```
PRIMARY USER     : ___________________________________
  Kaun hai?      : ___________________________________
  Technical?     : [ ] Yes   [ ] No   [ ] Mixed
  Use case?      : ___________________________________

SECONDARY USER   : ___________________________________ (agar hai)
  Kaun hai?      : ___________________________________
```

**Example:**
```
PRIMARY USER     : Small business owners
  Kaun hai?      : Kirana shop, boutique — 1-5 employees
  Technical?     : No
  Use case?      : Apni inventory track karna, sales dekhna

SECONDARY USER   : Shop ka manager
  Kaun hai?      : Owner ka trusted employee
```

---

## ✅ Core Features — MVP (Must Have)

> Rule: Agar ye nahi hai toh app kaam nahi karta.

```
FEATURE 1: ___________________________________
  Description  : ___________________________________
  Who uses it  : ___________________________________

FEATURE 2: ___________________________________
  Description  : ___________________________________
  Who uses it  : ___________________________________

FEATURE 3: ___________________________________
  Description  : ___________________________________
  Who uses it  : ___________________________________

FEATURE 4: ___________________________________
  Description  : ___________________________________
  Who uses it  : ___________________________________

FEATURE 5: ___________________________________
  Description  : ___________________________________
  Who uses it  : ___________________________________
```

---

## 🔮 Stretch Features — V2 (Nice to Have)

> Rule: App inke bina bhi deliver kiya ja sakta hai.

```
[ ] ___________________________________
[ ] ___________________________________
[ ] ___________________________________
[ ] ___________________________________
```

---

## 🚫 Out of Scope

> Rule: Explicitly likho kya NAHI banana. Ye scope creep rokta hai.

```
❌ ___________________________________
❌ ___________________________________
❌ ___________________________________
```

---

## 🏗️ Architecture Decisions

> Har decision ke saath **reason** likho — sirf tool naam nahi.

```
FRAMEWORK        : ___________________________________
  Why?           : ___________________________________

RENDERING        : [ ] CSR  [ ] SSR  [ ] SSG  [ ] ISR  [ ] Mixed
  Why?           : ___________________________________

STATE MGMT       : ___________________________________
  Why?           : ___________________________________

DATABASE         : ___________________________________
  Why?           : ___________________________________

ORM              : ___________________________________
  Why?           : ___________________________________

AUTH             : ___________________________________
  Why?           : ___________________________________

API STYLE        : [ ] REST  [ ] Server Actions  [ ] tRPC  [ ] GraphQL
  Why?           : ___________________________________

FILE UPLOADS     : [ ] Yes → _____________   [ ] No
EMAILS           : [ ] Yes → _____________   [ ] No
REAL-TIME        : [ ] Yes → _____________   [ ] No
BACKGROUND JOBS  : [ ] Yes → _____________   [ ] No

HOSTING          : ___________________________________
  Why?           : ___________________________________
```

---

## 🗄️ Data Model

```
ENTITY 1: _______________
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field         | Type              | Notes
______________|___________________|_______________________
id            | UUID / SERIAL     | Primary Key
______________|___________________|_______________________
              |                   |
              |                   |
              |                   |
              |                   |
created_at    | TIMESTAMP         | Auto
updated_at    | TIMESTAMP         | Auto

ENTITY 2: _______________
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field         | Type              | Notes
______________|___________________|_______________________
id            | UUID / SERIAL     | Primary Key
______________|___________________|_______________________
              |                   |
              |                   |
created_at    | TIMESTAMP         | Auto

RELATIONS:
→ ___________ has many ___________
→ ___________ belongs to ___________
→ ___________ and ___________ → Many-to-Many (via ___________ table)

INDEXES:
→ ___________ (reason: ___________)
→ ___________ (reason: ___________)
```

---

## 🔐 Auth & Roles

```
AUTH REQUIRED    : [ ] Yes   [ ] No

ROLES:
  Role 1: _____________ → Can: _________________ | Cannot: _________________
  Role 2: _____________ → Can: _________________ | Cannot: _________________
  Role 3: _____________ → Can: _________________ | Cannot: _________________

PUBLIC ROUTES    : (login na hone pe bhi accessible)
  → ___________________________________
  → ___________________________________

PROTECTED ROUTES : (login zaroor)
  → ___________________________________
  → ___________________________________
```

---

## 📋 Feature Breakdown

```
PHASE 1 — CORE MVP:

  [ ] Auth
      [ ] Signup
      [ ] Login
      [ ] Logout
      [ ] Protected route middleware

  [ ] [Main Feature Name]
      [ ] List / Read
      [ ] Create
      [ ] Edit
      [ ] Delete

  [ ] Edge Cases
      [ ] Empty state UI
      [ ] Loading state
      [ ] Error handling
      [ ] Form validation (client + server)

PHASE 2 — POLISH:
  [ ] ___________________________________
  [ ] ___________________________________
  [ ] ___________________________________

PHASE 3 — STRETCH:
  [ ] ___________________________________
  [ ] ___________________________________
```

---

## 🎯 Success Criteria

```
Project complete hoga jab:
[ ] ___________________________________
[ ] ___________________________________
[ ] ___________________________________

Performance targets (optional):
[ ] Page load: ___ seconds
[ ] Lighthouse score: ___
[ ] Mobile responsive: Yes / No
```

---

## 🎙️ Interview Prep (STAR Method — Fill After Building)

> Ye section project build hone ke BAAD fill karo.
> Interview mein direct use karo.

```
SITUATION:
"Maine [project type] banaya — [one line description].
 Problem ye tha ki [target user] ko [pain point] face karna padta tha."

TASK:
"Mujhe ek [solution] banana tha jo [requirements] fulfill kare.
 Scope mein ye features the: [MVP features].
 Maine consciously [X] out of scope rakha kyunki [reason]."

ACTION (Technical Decisions):
"Maine [framework] choose kiya kyunki [reason].
 State management ke liye [tool] use kiya kyunki [reason].
 Ek interesting challenge tha [describe challenge] —
 maine [approach A] aur [approach B] evaluate kiya,
 aur [approach A] choose kiya kyunki [reason]."

RESULT:
"Final app mein [key features] the.
 [Specific metric ya outcome] achieve kiya.
 Agar dobara karta toh [reflection] differently karta."
```

---

**Next Doc →** `plan-03-architecture-cheatsheet.md` — Quick reference: kaunsi situation mein kaunsa tool.
