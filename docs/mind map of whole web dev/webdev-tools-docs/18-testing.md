# 18 — Testing: Vitest, Jest, Playwright, Cypress, RTL

> Umbrella: Testing
> Kaam: Code sahi kaam karta hai ensure karna — automatically
> Note: Beginners ke liye — testing baad mein seekhna theek hai, but concept pata hona chahiye

---

## Teen Types Ki Testing

```
UNIT TEST:        Ek function sahi kaam karta hai?
  → bcrypt.hash kaam kar raha hai?
  → Cart total sahi calculate ho raha hai?

INTEGRATION TEST: Do cheezein saath sahi kaam karti hain?
  → Login API → Database → Session → Sab theek?

E2E TEST (End-to-End): User ka poora flow kaam karta hai?
  → Priya signup karti hai → Login karti hai → Product add karti hai → Pay karti hai
  → Real browser mein, real app pe

↑ Jitna upar, utna fast aur cheap
↓ Jitna neeche, utna slow aur expensive lekin realistic
```

---

## Tools

---

### Vitest
**Tag: 🟢 Most Popular 2024 | Fast | Vite-based**

```
Kya hai: Modern unit testing framework — Vite ecosystem
Kab use karo:
  → Naye projects — almost always unit testing ke liye
  → Next.js, Vite projects

Jest se fark:
  → Vitest: Vite-based — much faster, ESM native
  → Jest: Older, slower, CommonJS-first
  → Almost same API — Jest jaanta hai → Vitest aata hai

Code feel:
  import { describe, it, expect } from 'vitest'
  import { calculateCartTotal } from './cart'

  describe('Cart', () => {
    it('total sahi calculate kare', () => {
      const items = [
        { price: 999, quantity: 2 },
        { price: 2999, quantity: 1 }
      ]
      expect(calculateCartTotal(items)).toBe(4997)
    })
  })

Real app example:
  → ShopKaro: Cart total, discount calculation, password validation — unit test
  → Zomato: Delivery fee calculation logic — unit test

India mein: 2023 ke baad Jest se shift ho raha hai
```

---

### Jest
**Tag: 🟡 Legacy Standard | Still widely used**

```
Kya hai: Most popular unit testing framework — React Testing Library ke saath common
Kab use karo:
  → Existing Jest codebase
  → Create React App projects (Jest default tha)

Vitest se fark: Slower, older — naye projects mein Vitest prefer
Status: Maintained lekin Vitest ne momentum le li
```

---

### React Testing Library (RTL)
**Tag: 🟢 Component Testing Standard**

```
Kya hai: React components test karna — user perspective se
Kab use karo:
  → React components test karne hain
  → "User ne button dabaya → kya hua?" type tests

Code feel:
  import { render, screen, fireEvent } from '@testing-library/react'
  import AddToCartButton from './AddToCartButton'

  test('add to cart button kaam kare', () => {
    render(<AddToCartButton product={mockProduct} />)
    fireEvent.click(screen.getByText('Cart Mein Daalo'))
    expect(screen.getByText('Added!')).toBeInTheDocument()
  })

Vitest/Jest ke saath: RTL akela nahi use hota — Vitest + RTL common combo
```

---

### Playwright
**Tag: 🟢 E2E Standard 2024 | Microsoft | Multi-browser**

```
Kya hai: End-to-end testing — real browser mein real user actions simulate karo
Kab use karo:
  → Critical user flows test karne hain
  → Checkout, login, payment flow
  → Cross-browser testing (Chrome, Firefox, Safari)

Real app example:
  → Swiggy: "User restaurant search kare → Add to cart → Checkout" — E2E test
  → ShopKaro: "Signup → Login → Buy product → Order confirmation" — E2E

Code feel:
  import { test, expect } from '@playwright/test'

  test('user login kar sake', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.fill('[name="email"]', 'priya@gmail.com')
    await page.fill('[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })

Cypress se fark:
  → Playwright: Multi-browser (Chrome, Firefox, Safari, Mobile)
  → Cypress: Chrome-first, older, JavaScript only
  → 2024: Playwright recommended over Cypress

India mein: Growing — critical apps mein E2E tests
```

---

### Cypress
**Tag: 🟡 E2E | Was popular 2019-2022 | Declining vs Playwright**

```
Kya hai: E2E testing framework
Kab use karo: Existing Cypress codebase
Playwright se kya kharab: Slower, single browser mostly, no mobile

Status: Maintained lekin Playwright ne lead le li
```

---

### MSW (Mock Service Worker)
**Tag: 🟢 API Mocking | Testing + Development**

```
Kya hai: API calls ko intercept karke mock responses dena
Kab use karo:
  → Testing mein real API call nahi karna
  → Backend ready nahi — frontend test karna hai

Code feel:
  const handlers = [
    http.get('/api/products', () => {
      return HttpResponse.json([
        { id: 1, name: 'Nike Shoes', price: 2999 }
      ])
    })
  ]
  // Ab /api/products call hogi → Real server nahi, mock response milega
```

---

### Storybook
**Tag: 🟢 Component Development | Design System**

```
Kya hai: Components ko isolation mein develop aur document karo
Kab use karo:
  → Design system banana hai
  → Components visually test karne hain
  → Team ke saath component library share karna hai

Real app example:
  → Razorpay ki UI component library
  → Large companies ki design systems

Code feel:
  // Button.stories.jsx
  export const Primary = {
    args: { label: 'Add to Cart', variant: 'primary' }
  }
  export const Disabled = {
    args: { label: 'Out of Stock', disabled: true }
  }
  // Storybook mein visual browser milta hai sab stories ka
```

---

## Quick Decision

```
Unit tests (functions, utils)?
  → Vitest

React component tests?
  → Vitest + React Testing Library

E2E tests (full user flows)?
  → Playwright

API mocking?
  → MSW

Component documentation/development?
  → Storybook

Existing Jest/Cypress codebase?
  → Rehne do — rewrite nahi
```

---

## Beginner Ke Liye

```
Priority order:
1. Pehle app banao
2. Phir unit tests seekho (Vitest)
3. Phir E2E (Playwright)

Testing mat chhodo completely — lekin priority last rakhna shuru mein theek hai
```

---

## India Mein Reality

```
Startups (small): Testing almost nahi — move fast
Mid-size:         Kuch unit tests, E2E critical flows
Enterprise:       Full testing — unit + integration + E2E
Product companies: Testing culture growing
```

---

## Agla Doc

`19-devops.md` — DevOps — Hosting, CI/CD, Monitoring — Vercel, Railway, GitHub Actions, Sentry — app deploy karna, errors track karna.
