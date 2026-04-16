# Intermediate — Full-Stack Next.js Roadmap
> You can build basic React apps and know Next.js exists. Now go deep on the framework, backend, auth, and styling systems.

---

## TypeScript — Going Deeper

- [ ] Generics — `function identity<T>(arg: T): T`
- [ ] Generic components in React — `function List<T>({ items }: { items: T[] })`
- [ ] Utility types — `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>`
- [ ] `ReturnType<typeof fn>` — extracting return type of a function
- [ ] `typeof` and `keyof` operators in TypeScript
- [ ] Enums — `enum Direction { Up, Down }`
- [ ] Type assertions — `value as string`
- [ ] Type guards — `typeof`, `instanceof`, custom `is` guards
- [ ] Discriminated unions — pattern for exhaustive type checking
- [ ] Typing React props — `React.FC`, inline prop types
- [ ] Typing `useState` — `useState<User | null>(null)`
- [ ] Typing `useRef` — `useRef<HTMLInputElement>(null)`
- [ ] Typing event handlers — `React.ChangeEvent<HTMLInputElement>`
- [ ] Typing `children` — `React.ReactNode`, `React.ReactElement`
- [ ] Typing context — creating typed context with `createContext`
- [ ] `tsconfig.json` — `paths` for absolute imports, `moduleResolution`
- [ ] Declaration files — `.d.ts` basics

---

## React — Advanced Hooks & Patterns

- [ ] `useContext` — creating context, providing, consuming
- [ ] Context performance pitfalls — unnecessary re-renders
- [ ] `useRef` — accessing DOM elements directly
- [ ] `useRef` for mutable values that don't trigger re-render
- [ ] `useReducer` — complex state logic, action/reducer pattern
- [ ] `useMemo` — memoizing expensive computations
- [ ] `useCallback` — memoizing functions passed as props
- [ ] When to use `useMemo` / `useCallback` — don't over-optimize
- [ ] Custom hooks — extracting reusable logic into `useXxx` functions
- [ ] `useId` hook — generating unique IDs
- [ ] `useTransition` — marking updates as non-urgent
- [ ] `useDeferredValue` — deferring a value update
- [ ] Controlled vs uncontrolled components — when to use each
- [ ] `React.forwardRef` — forwarding refs to child components
- [ ] `React.memo` — preventing unnecessary re-renders
- [ ] Error boundaries — class component to catch render errors
- [ ] `React.lazy` and `Suspense` — code splitting components
- [ ] Compound components pattern
- [ ] Render props pattern — awareness

---

## Next.js — App Router Deep Dive

- [ ] App Router vs Pages Router — key differences, why App Router
- [ ] `page.tsx` — the actual page component
- [ ] `layout.tsx` — persistent UI, nested layouts
- [ ] `loading.tsx` — automatic loading UI with Suspense
- [ ] `error.tsx` — error boundary for a route segment
- [ ] `not-found.tsx` — custom 404 page
- [ ] `template.tsx` — like layout but re-mounts on navigation
- [ ] Dynamic routes — `app/posts/[id]/page.tsx`
- [ ] Catch-all routes — `app/docs/[...slug]/page.tsx`
- [ ] Optional catch-all — `app/docs/[[...slug]]/page.tsx`
- [ ] Route groups — `(marketing)/about/page.tsx` — grouping without affecting URL
- [ ] Parallel routes — `@modal` slots
- [ ] Intercepting routes — `(.)`, `(..)` syntax
- [ ] `useRouter` hook — programmatic navigation
- [ ] `usePathname` hook — current URL path
- [ ] `useSearchParams` hook — reading query params
- [ ] `useParams` hook — reading dynamic route params
- [ ] Middleware — `middleware.ts`, `NextRequest`, `NextResponse`
- [ ] Middleware — redirects, rewrites, setting headers
- [ ] Middleware — matcher config

---

## Next.js — Server vs Client Components

- [ ] Server Components — default in App Router, no hooks, no browser APIs
- [ ] Client Components — `'use client'` directive
- [ ] When to use server vs client — the decision framework
- [ ] Composing server and client — server wraps client, not reverse
- [ ] Passing data from server to client via props
- [ ] Avoiding `'use client'` sprawl — push it to the leaves
- [ ] Server-only code — `server-only` package
- [ ] `cookies()` and `headers()` from `next/headers`
- [ ] `redirect()` and `notFound()` from `next/navigation`

---

## Next.js — Data Fetching

- [ ] `fetch()` in server components — async/await directly in component
- [ ] `fetch()` caching — `cache: 'force-cache'` vs `cache: 'no-store'`
- [ ] `revalidate` option — ISR per fetch call
- [ ] `generateStaticParams` — pre-rendering dynamic routes at build time
- [ ] Static generation vs dynamic rendering — how Next.js decides
- [ ] `dynamic = 'force-dynamic'` — opting into dynamic rendering
- [ ] Server Actions — `'use server'` directive
- [ ] Server Actions in forms — `action={serverAction}`
- [ ] Server Actions for mutations — calling from client components
- [ ] `useFormState` — form state with server actions
- [ ] `useFormStatus` — pending state for form submissions
- [ ] `revalidatePath()` and `revalidateTag()` — manual cache invalidation
- [ ] SWR — `useSWR`, revalidation, mutation
- [ ] TanStack Query (React Query) basics — `useQuery`, `useMutation`
- [ ] When to use React Query vs Next.js fetch cache

---

## Next.js — APIs & Built-in Features

- [ ] Route Handlers — `app/api/route.ts`
- [ ] Route Handler methods — `GET`, `POST`, `PUT`, `DELETE`, `PATCH`
- [ ] `NextRequest` and `NextResponse`
- [ ] Reading request body — `request.json()`
- [ ] Reading query params in route handlers
- [ ] Dynamic route handlers — `app/api/users/[id]/route.ts`
- [ ] `next/image` — `fill` prop, `sizes`, `priority`, `placeholder="blur"`
- [ ] `next/font` — `Inter`, Google Fonts, local fonts, variable fonts
- [ ] Metadata API — `export const metadata` in page files
- [ ] Dynamic metadata — `generateMetadata` function
- [ ] OG image generation — `opengraph-image.tsx`
- [ ] `next.config.js` — `images.remotePatterns`, `redirects`, `rewrites`, `headers`
- [ ] `NEXT_PUBLIC_` env vars — exposed to browser
- [ ] Server-only env vars — only in server components / route handlers

---

## Rendering Strategies

- [ ] SSR — server-side rendering on every request
- [ ] SSG — static site generation at build time
- [ ] ISR — incremental static regeneration with `revalidate`
- [ ] PPR — partial pre-rendering (Next.js 14+), static shell + dynamic holes
- [ ] Streaming — `Suspense` boundaries, progressive page loading
- [ ] Edge runtime vs Node.js runtime — tradeoffs
- [ ] `generateStaticParams` + `dynamicParams = false` — fully static dynamic routes

---

## Styling in Next.js

- [ ] CSS Modules — `styles.module.css`, scoped class names
- [ ] CSS Modules composition — `composes` keyword
- [ ] Global styles — `app/globals.css`, where to import
- [ ] Tailwind CSS setup in Next.js — `tailwind.config.ts`, `postcss.config.js`
- [ ] Tailwind utility classes — spacing, typography, colors, sizing
- [ ] Tailwind responsive prefixes — `sm:`, `md:`, `lg:`, `xl:`
- [ ] Tailwind state variants — `hover:`, `focus:`, `active:`, `disabled:`
- [ ] Tailwind dark mode — `dark:` variant, `darkMode: 'class'`
- [ ] Tailwind config — extending theme, custom colors, custom fonts
- [ ] Tailwind plugins — `@tailwindcss/forms`, `@tailwindcss/typography`
- [ ] `clsx` / `cn` utility — conditional class names
- [ ] shadcn/ui — what it is, installing components, customizing
- [ ] Radix UI primitives — accessible headless components
- [ ] Design tokens — colors, spacing, typography scale in config
- [ ] Framer Motion basics — `motion.div`, `animate`, `initial`, `exit`
- [ ] `AnimatePresence` — animating components on unmount
- [ ] Styled-components / Emotion — SSR tradeoffs awareness
- [ ] Accessibility in styling — color contrast, focus rings, screen reader support

---

## Databases & SQL

- [ ] Relational database concepts — tables, rows, columns, keys
- [ ] Primary keys and foreign keys
- [ ] SQL — `SELECT`, `FROM`, `WHERE`, `ORDER BY`, `LIMIT`
- [ ] SQL — `INSERT INTO`, `UPDATE`, `DELETE`
- [ ] SQL — `JOIN` types — `INNER`, `LEFT`, `RIGHT`
- [ ] SQL — `GROUP BY`, `HAVING`, `COUNT`, `SUM`, `AVG`
- [ ] SQL — indexes — what they are and why they speed up queries
- [ ] Database normalization — 1NF, 2NF, 3NF — basic concept
- [ ] Relationships — one-to-one, one-to-many, many-to-many
- [ ] Junction tables for many-to-many
- [ ] PostgreSQL — installing locally, `psql` CLI basics
- [ ] PostgreSQL data types — `text`, `integer`, `boolean`, `timestamp`, `uuid`, `jsonb`
- [ ] NoSQL concepts — document model, when MongoDB makes sense
- [ ] Connection pooling — why you need it in serverless environments

---

## Prisma ORM

- [ ] What is an ORM and why use one
- [ ] Installing Prisma — `prisma init`
- [ ] `schema.prisma` — datasource, generator, models
- [ ] Prisma model syntax — fields, types, attributes (`@id`, `@default`, `@unique`)
- [ ] Relations in Prisma — `@relation`, one-to-many, many-to-many
- [ ] `prisma migrate dev` — creating and running migrations
- [ ] `prisma db push` — quick schema sync for development
- [ ] `prisma generate` — generating the Prisma Client
- [ ] Prisma Client — `prisma.user.findMany()`, `findUnique()`, `create()`, `update()`, `delete()`
- [ ] Nested writes — creating related records in one query
- [ ] `include` vs `select` — controlling what data comes back
- [ ] Transactions — `prisma.$transaction([])`
- [ ] Database seeding — `prisma/seed.ts`
- [ ] Drizzle ORM — schema-first alternative to Prisma, type-safe queries awareness

---

## API Design

- [ ] REST principles — resources, HTTP methods, status codes
- [ ] HTTP status codes — 200, 201, 400, 401, 403, 404, 409, 422, 500
- [ ] Request validation with Zod — `z.object({})`, `.parse()`, `.safeParse()`
- [ ] Zod schemas — strings, numbers, enums, optional, arrays, nested objects
- [ ] Error handling in route handlers — try/catch, returning error responses
- [ ] API response structure — consistent shape `{ data, error, message }`
- [ ] GraphQL basics — schema, types, queries, mutations, resolvers
- [ ] tRPC — end-to-end type-safe APIs, procedures, routers, client integration

---

## Authentication

- [ ] Auth concepts — what is a session, what is a JWT
- [ ] OAuth 2.0 — authorization code flow, what happens behind the scenes
- [ ] PKCE — why it matters for public clients
- [ ] Cookies vs localStorage for storing tokens — security tradeoffs
- [ ] NextAuth.js (Auth.js v5) — installation, configuration
- [ ] NextAuth providers — GitHub, Google, credentials
- [ ] NextAuth session — `useSession`, `getServerSession`, `auth()`
- [ ] NextAuth callbacks — `jwt`, `session`, `signIn`
- [ ] Protecting routes with middleware — redirecting unauthenticated users
- [ ] Server-side auth checks — checking session in server components
- [ ] Role-based access control (RBAC) — roles in session, checking on routes
- [ ] Credentials provider — custom email/password auth
- [ ] Clerk — managed auth alternative, `<ClerkProvider>`, middleware integration
- [ ] Protecting API routes — checking session in route handlers

---

## State Management

- [ ] `useState` + `useReducer` for local and moderate complexity state
- [ ] Context API — when appropriate, performance pitfalls
- [ ] Zustand — `create()`, store slices, selectors, devtools middleware
- [ ] Jotai — atoms, `useAtom`, derived atoms
- [ ] Redux Toolkit — `createSlice`, `configureStore`, `useSelector`, `useDispatch` (enterprise awareness)
- [ ] Server state vs client state — knowing the difference
- [ ] TanStack Query — `useQuery`, `useMutation`, `queryClient.invalidateQueries()`
- [ ] SWR — `useSWR`, `mutate`, revalidation strategies
- [ ] Optimistic updates — updating UI before server confirms
- [ ] Next.js fetch cache vs React Query — choosing the right tool
