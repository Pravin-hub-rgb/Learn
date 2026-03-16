# Doc 1.1 — Project Setup (Next.js + Prisma + PostgreSQL) 🚀

## Pehle Problem Samjho — Bina Proper Setup Ke Kya Hoga?

Chalo ek scenario socho.

Tumne decide kiya ki "Server Actions seekhna hai." Tumne ek Next.js project create kiya, aur socha "Bas, shuru karte hain code likhna."

Ab **database kaun handle karega?**
**Prisma kaun setup karega?**
**PostgreSQL kaun connect karega?**

Sab kuch manually karna padega — aur yeh bahut time waste karega.

---

Yeh sirf tumhara problem nahi hai. Socho:

- **WhatsApp** — agar database setup nahi hota, messages kahan store honge?
- **Instagram** — agar backend nahi hota, likes aur comments kaun manage karega?
- **Amazon** - agar database nahi hota, cart items kahan save honge?

---

## Proper Setup Kya Hota Hai? (Real Life Analogy)

Setup ek **construction site** jaisa hai:

| Construction Site | App Development |
|-------------------|-----------------|
| Foundation        | Database        |
| Building Plan     | Project Structure |
| Construction Team | Tools & Libraries |
| Raw Materials     | Dependencies |

Agar foundation weak hai, building gir jayega. Isliye pehle proper setup karte hain.

---

## Hum Kya Setup Karenge?

Hum ek complete Next.js project setup karenge jisme:

1. **Next.js** - Framework (building)
2. **Prisma** - Database ORM (foundation)
3. **PostgreSQL** - Database (raw materials)
4. **Tailwind** - Styling (design)

---

## Step 1: Next.js Project Create Karo

Pehle Next.js project create karte hain:

```bash
npx create-next-app@latest server-actions-project
cd server-actions-project
```

**Kyun Next.js?**
- Server Actions ke liye perfect
- Built-in API routes
- Easy deployment

---

## Step 2: Dependencies Install Karo

Ab zaroori dependencies install karte hain:

```bash
npm install prisma @prisma/client
npm install pg
npm install tailwindcss postcss autoprefixer
```

**Kyun yeh dependencies?**
- **Prisma** - Database ko easily manage karta hai
- **@prisma/client** - Database se interact karne ke liye
- **pg** - PostgreSQL ke liye driver
- **Tailwind** - Styling ke liye

---

## Step 3: Prisma Initialize Karo

Ab Prisma setup karte hain:

```bash
npx prisma init
```

Yeh command kya karta hai:
- Creates `prisma/` folder
- Creates `schema.prisma` file
- Creates `.env` file

---

## Step 4: Database URL Setup

Ab database URL set karte hain:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
```

**Kyun yeh URL?**
- Database ko connect karne ke liye
- Username, password, host, port, database name

---

## Step 5: Tailwind Setup

Ab Tailwind setup karte hain:

```bash
npx tailwindcss init -p
```

Yeh command styling ke liye Tailwind ready karta hai.

---

## Summary — Doc 1.1 Mein Kya Sikha

✅ **Problem** - Bina proper setup ke time waste hoga
✅ **Setup ka importance** - Construction site jaisa, foundation important hai
✅ **Dependencies** - Prisma, PostgreSQL, Tailwind kyun zaroori hain
✅ **Commands** - Project create, dependencies install, Prisma init
✅ **Database URL** - Kaise database se connect karte hain

---

## Agla Step — Doc 1.2

**Doc 1.2: Database Schema Design (Todo Model)**

Abhi humne project setup kiya. Lekin database mein kya store hoga? Kaise structure hoga? Woh samjhenge agle doc mein. 🚀