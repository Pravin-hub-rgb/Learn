# 07 — Meta Frameworks: Next.js, Remix, Astro aur Baaki

> Umbrella: Frontend → Meta Frameworks
> Kaam: React/Vue/Svelte ke upar full-stack framework — routing, SSR, API routes
> Tum Next.js jaante ho — yeh doc alternatives ka context dega

---

## Meta Framework Kya Hota Hai

Plain React sirf UI banata hai — routing, SSR, API routes nahi.

Meta framework = React + Routing + SSR + API + Build tools — sab ek package mein.

```
Plain React: Sirf UI
Meta Framework: UI + Server + Routing + Build — complete solution
```

---

## Tools

---

### Next.js
**Tag: 🟢 Industry Standard | Most Popular | You know this**

```
Kya hai: React ka most popular meta framework — Vercel ne banaya
Kab use karo:
  → Almost always React project mein
  → E-commerce, SaaS, blogs, dashboards — sab kuch

Real app example:
  → Notion ka marketing site
  → Twitch ka web app
  → Razorpay ka website
  → Indian startups ki majority

Kyun popular:
  → SSR + SSG + CSR — sab ek mein
  → API routes — backend bhi same project
  → App Router (new) — powerful
  → Vercel pe deploy → Seamless
  → Largest ecosystem

App Router vs Pages Router:
  → Pages Router: Purana (/pages/index.jsx)
  → App Router: Naya (/app/page.jsx) — recommended
  → Naye projects: App Router use karo

India mein: Almost default choice for React projects
```

---

### Remix
**Tag: 🟢 Growing | Web Standards | Different Philosophy**

```
Kya hai: React meta framework — web fundamentals pe focus (forms, HTTP)
Kab use karo:
  → Web standards prefer karte ho
  → Progressive enhancement chahiye (JS band ho toh bhi kaam kare)
  → Forms-heavy apps
  → Shopify use karta hai — enterprise credibility hai

Next.js se fark:
  → Remix: Web platform pe rely karta hai (native form actions, HTTP caching)
  → Next.js: Custom solutions zyada (Server Actions, custom caching)
  → Remix: Nested layouts better (ek page ke multiple loading states)
  → Next.js: Ecosystem zyada bada

Real app example:
  → Shopify Hydrogen (headless commerce)
  → Remix.run ka apna site

India mein: Growing — lekin Next.js dominant
Kab consider: Already Next.js seekha → Explore Remix for different perspective
```

---

### Astro
**Tag: 🟢 Content Sites | Blogs | Zero JS by default**

```
Kya hai: Content-first framework — HTML bhejta hai, JavaScript sirf jahan chahiye
Kab use karo:
  → Blog, documentation site, marketing site, portfolio
  → Content heavy, interactivity kam
  → SEO critical, maximum performance chahiye

Unique concept — Islands Architecture:
  → Pura page static HTML
  → Sirf interactive parts mein React/Vue/Svelte "islands" embed karo
  → Result: Bahut fast — minimal JS

Real app example:
  → dev.to type blog
  → Documentation sites (Starlight — Astro's doc template)
  → Company marketing sites
  → Indian developer portfolios

Next.js se fark:
  → Astro: Content sites, static-first, framework agnostic
  → Next.js: Apps, dynamic data, React-specific

Code feel:
  --- (Astro frontmatter)
  const posts = await fetchPosts()
  ---
  {posts.map(post => <PostCard {post} />)}  <!-- Zero JS unless needed -->

Kab mat use karo:
  → Complex web app (dashboard, e-commerce with lots of interactions)
  → Next.js better tab
```

---

### Nuxt.js
**Tag: 🟢 Vue Ecosystem | Vue ka Next.js**

```
Kya hai: Vue.js ka meta framework — Next.js jaisa lekin Vue mein
Kab use karo:
  → Vue.js use kar rahe ho
  → React nahi chahiye

React ke saath irrelevant — lekin naam suno toh: "Vue ka Next.js" yaad rakho

Real app example:
  → Vue-based Indian projects (some fintech companies)
  → GitLab ka frontend (historically)
```

---

### SvelteKit
**Tag: 🔵 Svelte Ecosystem | Interesting | Niche**

```
Kya hai: Svelte ka meta framework
Svelte kya hai: React alternative — compile time framework, no virtual DOM

Kab use karo:
  → Svelte seekhna chahte ho
  → Performance-critical apps

React/Next.js jaante ho → SvelteKit different mental model hai
India mein: Very niche — mostly experimental projects
```

---

### TanStack Start
**Tag: 🔵 New | Growing | Worth watching**

```
Kya hai: TanStack (React Query ke creators) ka meta framework
Status: 2024 mein beta — production ready nahi abhi
Interesting because: TanStack Router + TanStack Query = seamless integration
Watch karo — future mein relevant ho sakta hai
```

---

## Quick Decision

```
React project, almost anything?
  → Next.js

Blog, documentation, marketing site?
  → Astro (static-first, fast)

Vue project?
  → Nuxt.js

Want different philosophy from Next.js?
  → Remix (worth learning)

Want to explore?
  → SvelteKit (completely different paradigm)
```

---

## India Mein Reality

```
Startups / Product companies:  Next.js (90%+)
Marketing / Blog sites:        Next.js ya Astro
Agency work:                   Next.js (familiarity)
Experimental:                  Remix ya SvelteKit
```

---

## Agla Doc

`08-backend-frameworks.md` — Backend Frameworks — Express, Fastify, Hono, NestJS — Zomato ka order service kaunse framework pe hoga, kab Express kab NestJS.
