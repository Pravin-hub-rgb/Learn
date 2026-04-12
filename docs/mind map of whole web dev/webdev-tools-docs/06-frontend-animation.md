# 06 — Animation: Framer Motion, GSAP, CSS Animations

> Umbrella: Frontend → Animation
> Kaam: Motion, transitions, interactions — app feel smooth aur alive

---

## Yeh Category Kya Solve Karti Hai

Animation sirf "nice to have" nahi — yeh **UX communicate karta hai**:
- Button click → Loading animation → Done
- Modal open/close → Smooth transition
- Page change → Fade in
- Cart item add → Bounce animation

Bina animation → App lifeless lagti hai. Too much animation → Annoying.

---

## Tools

---

### CSS Animations / Transitions
**Tag: 🟢 Built-in | Simple Cases | No Install**

```
Kab use karo:
  → Simple hover effects
  → Fade in/out
  → Loading spinners
  → Button states

Code feel:
  /* Tailwind se */
  <button className="transition-colors duration-200 hover:bg-blue-600">
  <div className="animate-spin">  /* Built-in spinner */
  <div className="animate-pulse">  /* Skeleton loading */

  /* Plain CSS */
  .card { transition: transform 0.2s; }
  .card:hover { transform: translateY(-4px); }

Real app example:
  → ShopKaro: Button hover effects, skeleton loading → CSS animations kaafi
  → Swiggy: Simple hover cards → CSS transitions

Kab kaafi nahi:
  → Complex sequences
  → Gesture-based (drag, swipe)
  → Scroll-triggered animations
  → Page transitions
```

---

### Framer Motion
**Tag: 🟢 Most Popular React Animation | Recommended**

```
Kya hai: React ke liye animation library — declarative, powerful
Kab use karo:
  → React/Next.js project
  → Page transitions, modal animations
  → Drag and drop
  → Scroll-triggered animations
  → List item add/remove animations

Real app example:
  → Swiggy: Cart item add hone pe bounce animation
  → Zomato: Restaurant card hover — lift effect
  → CRED: Premium feel — buttery smooth transitions
  → Razorpay checkout: Payment success animation

Code feel:
  import { motion, AnimatePresence } from 'framer-motion'

  // Simple fade in
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    Content
  </motion.div>

  // List items — animate on add/remove
  <AnimatePresence>
    {items.map(item => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
      >
        {item.name}
      </motion.div>
    ))}
  </AnimatePresence>

Pros:
  → Declarative — HTML attributes se animation
  → Gesture support (drag, pan, hover)
  → AnimatePresence — exit animations (jab element remove ho tab bhi animate)
  → Layout animations — element reposition smoothly

Cons:
  → Bundle size: ~45KB
  → Complex cases mein learning curve

India mein: Premium feel wali apps mein standard
```

---

### GSAP (GreenSock Animation Platform)
**Tag: 🟢 Complex Animations | Marketing Sites | Industry Pro**

```
Kya hai: Most powerful JavaScript animation library — framework-agnostic
Kab use karo:
  → Complex scroll-based storytelling (landing pages)
  → SVG animations
  → Timeline-based animations (sequence)
  → Marketing/portfolio sites
  → Animations jo Framer Motion se nahi hoti

Real app example:
  → Apple ka website (iPhone launch pages)
  → Stripe ka landing page
  → Indian ed-tech companies ki marketing sites (fancy animations)

Framer Motion se fark:
  → GSAP: More powerful, complex timelines, framework-agnostic
  → Framer Motion: React-specific, declarative, easier for UI animations

Code feel:
  gsap.fromTo('.hero-text',
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  )

  // Timeline — sequence
  const tl = gsap.timeline()
  tl.from('.logo', { opacity: 0 })
    .from('.nav', { y: -50 })
    .from('.hero', { scale: 0.8 })

Kab mat use karo:
  → Simple UI animations — Framer Motion better
  → Next.js SSR apps mein setup complex

India mein: Agency work, marketing sites, ed-tech landing pages
```

---

### React Spring
**Tag: 🟡 Physics-based | Was popular 2020-21**

```
Kya hai: Physics-based animations — spring (bouncy) feel
Kab use karo:
  → Existing React Spring codebase
  → Physics-based feel chahiye specifically

Status: Framer Motion ne zyada popularity le li
Framer Motion mein bhi spring animations hain
```

---

### Lottie
**Tag: 🔵 After Effects files | Specific use case**

```
Kya hai: Adobe After Effects animations → Web/Mobile pe play karo
Kab use karo:
  → Designer ne After Effects mein complex animation banaya
  → Onboarding illustrations animate karne hain
  → Success/Error animations (check mark, X mark)

Real app example:
  → Phonepe ka payment success animation (spinning coin)
  → CRED ka reward animation
  → Swiggy ka "Order Placed" animation

Workflow:
  Designer → After Effects → Lottie export (.json) → Developer → lottie-react

Code feel:
  import Lottie from 'lottie-react'
  import successAnimation from './success.json'

  <Lottie animationData={successAnimation} loop={false} />

Kab useful nahi:
  → Designer nahi hai ya After Effects nahi
  → Simple animations — CSS ya Framer Motion better
```

---

## Quick Decision

```
Simple hover, transitions?
  → CSS / Tailwind (animate-*, transition-)

React app, UI animations (modals, lists, page transitions)?
  → Framer Motion

Complex scroll storytelling, marketing site?
  → GSAP

Designer ne After Effects mein banaya?
  → Lottie

Physics/bouncy feel?
  → Framer Motion (spring option hai)
```

---

## India Mein Reality

```
Startup apps:        Framer Motion (premium feel)
Marketing sites:     GSAP (agency work)
Simple apps:         CSS animations kaafi
Fintech/Payments:    Lottie (success animations) + Framer Motion
```

---

## Agla Doc

`07-frontend-frameworks.md` — Meta Frameworks — Next.js, Remix, Astro, Nuxt — kab Next.js, kab Astro, kab Remix — industry mein kya chal raha hai.
