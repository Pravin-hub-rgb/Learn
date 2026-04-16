# 00 — Poora Map: Web Dev Ki Duniya

> Yeh doc ek **master index** hai.
> Koi bhi tool ka naam suno — yahan se uska bucket aur category pata chalega.
> Detail mein har tool ke aage wali docs mein jaana.

---

## Buckets — Web Dev Ki Duniya

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND        │  BACKEND         │  DATABASE         │
│  Jo user dekhta  │  Server logic    │  Data store       │
├─────────────────────────────────────────────────────────┤
│  AUTH            │  TESTING         │  DEVOPS / INFRA   │
│  Identity        │  Quality check   │  Deploy + Monitor │
├─────────────────────────────────────────────────────────┤
│  META TOOLS                                             │
│  Type safety, validation, monorepos                     │
└─────────────────────────────────────────────────────────┘
```

---

## FRONTEND

### State Management
| Tool | Tag | Doc |
|------|-----|-----|
| Zustand | 🟢 Most Popular 2024 | 01 |
| Redux Toolkit | 🟡 Enterprise / Legacy | 01 |
| Jotai | 🔵 Lightweight / Atomic | 01 |
| MobX | 🟠 Reactive / OOP | 01 |
| Recoil | 🔴 Deprecated | 01 |
| XState | 🔵 Complex Logic / Niche | 01 |
| React Context | 🟢 Built-in / Simple | 01 |
| Valtio | 🔵 Proxy-based | 01 |

### Styling
| Tool | Tag | Doc |
|------|-----|-----|
| Tailwind CSS | 🟢 Most Popular 2024 | 02 |
| CSS Modules | 🟢 Built-in / Safe | 02 |
| Styled Components | 🟡 Legacy CSS-in-JS | 02 |
| Emotion | 🟡 CSS-in-JS | 02 |
| Sass/SCSS | 🟢 Classic | 02 |
| Vanilla CSS | 🟢 Always valid | 02 |

### Component Libraries (UI Kits)
| Tool | Tag | Doc |
|------|-----|-----|
| shadcn/ui | 🟢 Most Popular 2024 | 03 |
| Radix UI | 🟢 Headless / Accessible | 03 |
| Material UI (MUI) | 🟡 Enterprise / Google Style | 03 |
| Ant Design | 🟡 Enterprise / Admin panels | 03 |
| Chakra UI | 🟡 Developer Friendly | 03 |
| Mantine | 🟢 Growing | 03 |
| DaisyUI | 🟢 Tailwind-based | 03 |
| Headless UI | 🟢 Tailwind team | 03 |

### Form Handling + Validation
| Tool | Tag | Doc |
|------|-----|-----|
| React Hook Form | 🟢 Most Popular | 04 |
| Zod | 🟢 Most Popular Validator | 04 |
| Yup | 🟡 Older, still common | 04 |
| Formik | 🟡 Legacy | 04 |
| Valibot | 🔵 Lightweight / New | 04 |
| Joi | 🟡 Backend-first validator | 04 |

### HTTP Client (API Calls)
| Tool | Tag | Doc |
|------|-----|-----|
| fetch (native) | 🟢 Built-in | 05 |
| Axios | 🟢 Most Popular | 05 |
| React Query / TanStack | 🟢 Server State Standard | 05 |
| SWR | 🟢 Vercel / Lightweight | 05 |
| ky | 🔵 Fetch wrapper / Lightweight | 05 |

### Animation
| Tool | Tag | Doc |
|------|-----|-----|
| Framer Motion | 🟢 Most Popular React | 06 |
| GSAP | 🟢 Complex Animations | 06 |
| CSS Animations | 🟢 Simple cases | 06 |
| React Spring | 🟡 Physics-based | 06 |
| Lottie | 🔵 After Effects files | 06 |

### Meta Frameworks (Full Stack)
| Tool | Tag | Doc |
|------|-----|-----|
| Next.js | 🟢 Industry Standard | 07 |
| Remix | 🟢 Growing / Web standards | 07 |
| Nuxt.js | 🟢 Vue ecosystem | 07 |
| SvelteKit | 🔵 Svelte ecosystem | 07 |
| Astro | 🟢 Content sites | 07 |
| TanStack Start | 🔵 New / Growing | 07 |

---

## BACKEND

### Frameworks
| Tool | Tag | Doc |
|------|-----|-----|
| Express.js | 🟡 Legacy / Most Known | 08 |
| Fastify | 🟢 Express alternative, fast | 08 |
| Hono | 🟢 Modern / Edge ready | 08 |
| NestJS | 🟢 Enterprise / TypeScript | 08 |
| Elysia | 🔵 Bun runtime | 08 |
| Koa | 🟡 Express-like, older | 08 |

### ORM (Database se baat karna)
| Tool | Tag | Doc |
|------|-----|-----|
| Prisma | 🟢 Most Popular / TypeScript | 09 |
| Drizzle | 🟢 Growing / Lightweight | 09 |
| Sequelize | 🟡 Legacy | 09 |
| TypeORM | 🟡 Legacy / NestJS common | 09 |
| Mongoose | 🟢 MongoDB standard | 09 |
| Kysely | 🔵 SQL query builder | 09 |

### Real-time
| Tool | Tag | Doc |
|------|-----|-----|
| Socket.io | 🟢 Most Popular WebSocket | 10 |
| Pusher | 🟢 Managed / Easy | 10 |
| Ably | 🟢 Enterprise real-time | 10 |
| WebSocket (native) | 🟢 Built-in | 10 |
| SSE (Server-Sent Events) | 🟢 One-way, simple | 10 |
| Partykit | 🔵 New / Cloudflare | 10 |

### Email
| Tool | Tag | Doc |
|------|-----|-----|
| Resend | 🟢 Most Popular 2024 | 11 |
| Nodemailer | 🟡 Classic / Self-hosted | 11 |
| SendGrid | 🟢 Enterprise | 11 |
| Postmark | 🟢 Transactional | 11 |
| AWS SES | 🟢 Cheap at scale | 11 |

### Background Jobs / Queues
| Tool | Tag | Doc |
|------|-----|-----|
| BullMQ | 🟢 Most Popular (Redis-based) | 12 |
| Inngest | 🟢 Managed / Serverless friendly | 12 |
| Trigger.dev | 🟢 Modern / TypeScript | 12 |
| Agenda | 🟡 MongoDB-based | 12 |
| node-cron | 🟢 Simple cron jobs | 12 |

### File Upload / Storage
| Tool | Tag | Doc |
|------|-----|-----|
| Cloudinary | 🟢 Images / Video / Transform | 13 |
| AWS S3 | 🟢 Enterprise standard | 13 |
| Uploadthing | 🟢 Next.js friendly | 13 |
| Supabase Storage | 🟢 Supabase users | 13 |
| Cloudflare R2 | 🟢 Cheap S3 alternative | 13 |

---

## DATABASE

### SQL (Relational)
| Tool | Tag | Doc |
|------|-----|-----|
| PostgreSQL | 🟢 Industry Standard | 14 |
| MySQL | 🟢 Legacy / WordPress | 14 |
| SQLite | 🟢 Local / Small apps | 14 |
| PlanetScale | 🟡 MySQL serverless | 14 |
| Neon | 🟢 PostgreSQL serverless | 14 |
| Supabase | 🟢 PostgreSQL + extras | 14 |
| Turso | 🔵 SQLite at edge | 14 |

### NoSQL
| Tool | Tag | Doc |
|------|-----|-----|
| MongoDB | 🟢 Most Popular NoSQL | 15 |
| Redis | 🟢 Cache / Sessions / Queues | 15 |
| DynamoDB | 🟢 AWS / Enterprise | 15 |
| Firestore | 🟢 Firebase / Google | 15 |
| Cassandra | 🟡 Large scale / Complex | 15 |

### Search
| Tool | Tag | Doc |
|------|-----|-----|
| Algolia | 🟢 Managed / Fast | 16 |
| Elasticsearch | 🟡 Self-hosted / Powerful | 16 |
| Typesense | 🟢 Open source Algolia | 16 |
| MeiliSearch | 🟢 Easy self-host | 16 |
| Postgres Full Text | 🟢 Already have Postgres | 16 |

---

## AUTH

| Tool | Tag | Doc |
|------|-----|-----|
| NextAuth / Auth.js | 🟢 Next.js standard | 17 |
| Clerk | 🟢 Fastest setup / UI included | 17 |
| Lucia | 🟢 Lightweight / DIY | 17 |
| Passport.js | 🟡 Express classic | 17 |
| Supabase Auth | 🟢 Supabase users | 17 |
| Firebase Auth | 🟢 Google ecosystem | 17 |
| Auth0 | 🟢 Enterprise | 17 |
| Kinde | 🟢 Growing / Simple | 17 |
| Better Auth | 🟢 New / TypeScript-first | 17 |

---

## TESTING

| Tool | Tag | Doc |
|------|-----|-----|
| Vitest | 🟢 Unit / Most Popular 2024 | 18 |
| Jest | 🟡 Unit / Legacy standard | 18 |
| React Testing Library | 🟢 Component testing | 18 |
| Playwright | 🟢 E2E / Industry standard | 18 |
| Cypress | 🟡 E2E / Older | 18 |
| MSW (Mock Service Worker) | 🟢 API mocking | 18 |
| Storybook | 🟢 Component development | 18 |

---

## DEVOPS / INFRA

### Hosting / Deploy
| Tool | Tag | Doc |
|------|-----|-----|
| Vercel | 🟢 Next.js standard | 19 |
| Netlify | 🟢 Frontend / JAMstack | 19 |
| Railway | 🟢 Full stack / Simple | 19 |
| Render | 🟢 Heroku alternative | 19 |
| AWS | 🟢 Enterprise standard | 19 |
| Fly.io | 🟢 Containers / Global | 19 |
| Cloudflare Pages | 🟢 Edge / Fast | 19 |
| Digital Ocean | 🟢 Simple VPS | 19 |

### CI/CD
| Tool | Tag | Doc |
|------|-----|-----|
| GitHub Actions | 🟢 Most Popular | 20 |
| GitLab CI | 🟢 GitLab users | 20 |
| CircleCI | 🟡 Older | 20 |

### Monitoring / Logging
| Tool | Tag | Doc |
|------|-----|-----|
| Sentry | 🟢 Error tracking standard | 20 |
| DataDog | 🟡 Enterprise APM | 20 |
| LogRocket | 🟢 Frontend sessions | 20 |
| PostHog | 🟢 Analytics + Feature flags | 20 |
| Axiom | 🟢 Logs / Vercel friendly | 20 |

---

## META TOOLS

### Type Safety + Validation
| Tool | Tag | Doc |
|------|-----|-----|
| TypeScript | 🟢 Industry Standard | 21 |
| Zod | 🟢 Runtime validation | 21 |
| Yup | 🟡 Older validator | 21 |
| Valibot | 🔵 Tiny / Growing | 21 |

### Full Stack Type Safety
| Tool | Tag | Doc |
|------|-----|-----|
| tRPC | 🟢 End-to-end type safe API | 21 |
| OpenAPI / Swagger | 🟢 API documentation | 21 |
| GraphQL Codegen | 🟢 GraphQL + TypeScript | 21 |

### Monorepo
| Tool | Tag | Doc |
|------|-----|-----|
| Turborepo | 🟢 Most Popular | 22 |
| Nx | 🟢 Enterprise | 22 |
| pnpm workspaces | 🟢 Simple monorepo | 22 |

### Package Managers
| Tool | Tag | Doc |
|------|-----|-----|
| npm | 🟢 Default | 22 |
| pnpm | 🟢 Faster / Disk efficient | 22 |
| yarn | 🟡 Older alternative | 22 |
| bun | 🟢 Fastest / New | 22 |

---

## Tags Ka Matlab

```
🟢 Recommended / Popular / Use karo
🟡 Legacy / Purana / Existing projects mein milega
🔵 Niche / Specific use case / Explore karo
🔴 Avoid / Deprecated
```

---

---

## 🎬 **Poora Flow — Ek Website Ki Kahani**

> Yeh section samjhata hai ki **saare tools milkar kaise kaam karte hain** — ek real user journey ke through.

### **Scene: User ne "Add to Cart" button dabaya**

```
┌─────────────────────────────────────────────────────────────────────┐
│  1. USER INTERFACE (Frontend - React/Next.js)                       │
│     └─ User ne "Add to Cart" click kiya                             │
│     └─ onClick handler → Zustand store update hua                   │
│     └─ Cart state change → UI re-render (React.memo optimize)       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  2. STATE MANAGEMENT (Zustand/Context)                              │
│     └─ Cart items array update hui                                  │
│     └─ Global state change → Navbar, Cart page, sab update hue      │
│     └─ LocalStorage mein persist (Zustand middleware)               │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  3. SERVER STATE (React Query)                                      │
│     └─ Cart data server se sync karna                               │
│     └─ Optimistic update → turant UI update                         │
│     └─ Background mein API call → Server pe save                    │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  4. API CALL (Axios/fetch + tRPC)                                   │
│     └─ POST /api/cart { productId, quantity }                       │
│     └─ tRPC → End-to-end type safety                                │
│     └─ Zod validation → Input validate hua                          │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  5. AUTH CHECK (NextAuth/JWT/Cookie)                                │
│     └─ Request ke saath cookie bheji                                │
│     └─ JWT verify hua → User authenticated                          │
│     └─ Session data nikala → User ID mila                           │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  6. BACKEND LOGIC (Express/Next.js API)                             │
│     └─ Controller: addToCart(userId, productId, quantity)           │
│     └─ Business logic: Stock check, price calculate                 │
│     └─ Prisma: Database query build ki                              │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  7. DATABASE (PostgreSQL/MongoDB)                                   │
│     └─ Prisma: INSERT INTO cart_items (user_id, product_id, qty)    │
│     └─ Transaction: Stock update + Cart insert (atomic)             │
│     └─ Response: { success: true, cart: [...] }                     │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  8. CACHE (Redis)                                                   │
│     └─ Cart count cache update hua                                  │
│     └─ Next request ke liye ready                                   │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  9. RESPONSE BACK TO FRONTEND                                       │
│     └─ React Query: Cache update, components re-render              │
│     └─ Zustand: Cart state final update                             │
│     └─ UI: Cart badge count update, toast notification              │
└─────────────────────────────────────────────────────────────────────┘
```

---

### **Har Concept Ka Matlab — Real Example Ke Saath**

#### **1. State Management (Zustand/Context)**
```
Matlab: App ka "yaad rakhne" wala system.

Example:
- Cart mein 3 items hain → Yeh STATE hai
- User logged in hai → Yeh STATE hai
- Modal open hai → Yeh STATE hai

Zustand: Global state manager — poori app mein accessible
Context: Simple global state — built-in React feature

ShopKaro mein:
- Zustand: Cart items, user info, theme
- Context: Theme, language
- useState: Search input, modal open/close
```

#### **2. Server State (React Query)**
```
Matlab: Server se aaya data — jo kabhi bhi change ho sakta hai.

Example:
- Products list → Server se aayi (kabhi bhi change ho sakti hai)
- User profile → Server se aaya (user update kar sakta hai)
- Order history → Server se aayi (naye orders aa sakte hain)

React Query:
- Data fetch karta hai
- Cache karta hai
- Auto revalidate karta hai (window focus pe)
- Optimistic updates deta hai

ShopKaro mein:
- Products list → React Query se
- User profile → React Query se
- Cart data → React Query + Zustand (hybrid)
```

#### **3. API (REST/tRPC/GraphQL)**
```
Matlab: Frontend aur Backend ke beech baat karne ka tarika.

Example:
- GET /api/products → Products laao
- POST /api/cart → Cart mein add karo
- PUT /api/user → User update karo

REST: Standard HTTP methods (GET, POST, PUT, DELETE)
tRPC: End-to-end type safe — TypeScript functions jaise
GraphQL: Exact data maango — no over/under fetching

ShopKaro mein:
- Products: REST API
- Cart: tRPC (type safety ke liye)
- Search: GraphQL (complex queries ke liye)
```

#### **4. Database (PostgreSQL/MongoDB)**
```
Matlab: Data permanently store karne ki jagah.

Example:
- Users table: id, name, email, password
- Products table: id, name, price, stock
- Orders table: id, user_id, total, status

PostgreSQL: SQL database — structured data, relations
MongoDB: NoSQL database — flexible schema, documents

ShopKaro mein:
- PostgreSQL: Users, orders, products (structured)
- Redis: Cart count cache, sessions (fast access)
```

#### **5. ORM (Prisma/Drizzle)**
```
Matlab: Database se baat karne ka easy tarika — raw SQL likhne ki zaroorat nahi.

Example:
// Raw SQL:
SELECT * FROM users WHERE id = 1;

// Prisma:
const user = await prisma.user.findUnique({ where: { id: 1 } });

Prisma: Type-safe, auto-complete, migrations
Drizzle: Lightweight, SQL-like, fast

ShopKaro mein:
- Prisma: Main ORM — users, products, orders
- Drizzle: Simple queries — cache, logs
```

#### **6. Auth (NextAuth/JWT/Cookie)**
```
Matlab: User kaun hai — verify karna.

Example:
- User ne login kiya → Password verify hua
- JWT token bana → Cookie mein store hua
- Har request pe token verify hota hai

NextAuth: Complete auth solution — Google, GitHub, email
JWT: Token-based auth — stateless
Cookie: Browser mein store — automatic bhejta hai

ShopKaro mein:
- NextAuth: Google, email login
- JWT: API authentication
- Cookie: Session maintain karne ke liye
```

#### **7. Caching (Browser/CDN/Server)**
```
Matlab: Baar baar same kaam na karna — time bachana.

Example:
- Browser cache: Images, CSS, JS files
- CDN cache: Static assets (images, videos)
- Server cache: Database query results (Redis)

ShopKaro mein:
- Browser: Product images cache
- CDN: Product images, videos
- Redis: Cart count, popular products
```

#### **8. Testing (Vitest/Playwright)**
```
Matlab: Code sahi kaam kar raha hai — verify karna.

Example:
- Unit test: Function sahi return kar raha hai?
- Integration test: API sahi response de raha hai?
- E2E test: User flow sahi kaam kar raha hai?

Vitest: Unit tests — fast, TypeScript support
Playwright: E2E tests — browser automation

ShopKaro mein:
- Vitest: Utility functions, hooks
- React Testing Library: Components
- Playwright: Checkout flow, login flow
```

#### **9. DevOps (Vercel/GitHub Actions)**
```
Matlab: Code ko live karna aur maintain karna.

Example:
- GitHub push → Build → Deploy → Live
- Error aaya → Sentry alert → Fix

Vercel: Hosting — automatic deploy
GitHub Actions: CI/CD — tests, build, deploy
Sentry: Error tracking — real-time alerts

ShopKaro mein:
- Vercel: Frontend hosting
- Railway: Backend hosting
- GitHub Actions: Tests + Deploy pipeline
- Sentry: Error tracking
```

---

### **Quick Reference — Kaunsa Tool Kahan**

```
┌─────────────────────────────────────────────────────────────────────┐
│  USER NE CLICK KIYA                                                 │
│  ↓                                                                  │
│  React Component (onClick handler)                                  │
│  ↓                                                                  │
│  Zustand Store Update (cart state)                                  │
│  ↓                                                                  │
│  UI Re-render (React.memo optimize)                                 │
│  ↓                                                                  │
│  React Query (optimistic update)                                    │
│  ↓                                                                  │
│  API Call (tRPC/REST)                                               │
│  ↓                                                                  │
│  Auth Check (JWT/Cookie verify)                                     │
│  ↓                                                                  │
│  Backend Controller (business logic)                                │
│  ↓                                                                  │
│  Prisma (database query)                                            │
│  ↓                                                                  │
│  PostgreSQL (data save)                                             │
│  ↓                                                                  │
│  Redis (cache update)                                               │
│  ↓                                                                  │
│  Response back to frontend                                          │
│  ↓                                                                  │
│  React Query (cache update)                                         │
│  ↓                                                                  │
│  Zustand (state sync)                                               │
│  ↓                                                                  │
│  UI Update (toast, badge count)                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 Web Servers (Apache / Nginx)

Ye traditional web servers hai jo overview mein nahi aaye kyunki aaj kal managed hosting inko automatically handle karte hai. Lekin ye bahut important hai interview ke liye.

| Apache HTTP Server | Nginx |
|--------------------|-------|
| 🟡 Legacy / 1995 se hai | 🟢 Modern / 2004 |
| Process based architecture | Event driven architecture |
| High load par slow ho jata hai | 10x faster hai high concurrency mein |
| .htaccess support hai | Nahi hai |
| Configure karna aasan hai | Thoda tricky hai |
| WordPress, PHP ke liye sabse popular | Ab industry standard hai har jagah |

✅ **Actual mein ye kya karte hai:**
- Port 80 / 443 pe request accept karte hai
- Reverse proxy ka kaam karte hai apne application tak request bhejte hai
- SSL Certificate handle karte hai
- Static files serve karte hai
- Load balancing, Rate limiting, Gzip compression sab karte hai

✅ **Aaj kal kyun nahi dikhte:**
Vercel, Railway, Netlify, Render, Fly.io sab ke peeche Nginx hi chalta hai lekin wo tumhe kabhi nahi dikhta. Sab automatically manage hota hai.

✅ **Industry Standard 2024:**
Koi bhi naya developer ab manually Nginx setup nahi karta. Sab managed hosting use karte hai. Lekin interview mein ye poochte hi hai isliye basic idea hona chahiye.

---

## Agla Doc

`01-frontend-state.md` — State Management ke saare tools deep mein — Redux, Zustand, Jotai, MobX — Zomato, Amazon, Swiggy jaisi apps ke examples ke saath.
