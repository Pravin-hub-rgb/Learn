# 43 — Accessibility: Sab Ke Liye Kaam Karo

> Performance complete hua.
> Ab daswa umbrella — **Accessibility**.
> App sirf mouse users ke liye nahi — sab ke liye accessible honi chahiye.

---

## Accessibility Kya Hai

**Accessibility (a11y)** = app itni design karo ki har koi use kar sake — chahe:
- Keyboard se navigate kare (mouse nahi)
- Screen reader use kare (aankhon ki problem)
- Color blind ho
- Slow internet pe ho

---

## Kyun Zaroori Hai

1. **Users** — India mein crores log disabilities ke saath hain
2. **Legal** — Kai deshon mein accessibility required hai
3. **SEO** — Accessible HTML → Better search ranking
4. **Everyone benefits** — Keyboard shortcuts, clear labels — sab ko fayda

---

## Basics — ShopKaro Mein Kya Karna Hai

### 1. Semantic HTML — Sahi Tags Use Karo

```jsx
// ❌ Sab kuch div mein
<div onClick={handleLogin}>Login</div>
<div className="heading">Products</div>

// ✓ Sahi tags
<button onClick={handleLogin}>Login</button>  // Keyboard accessible, screen reader samjhega
<h1>Products</h1>                              // Screen reader announce karega
```

---

### 2. Alt Text — Images Ke Liye

```jsx
// ❌ Alt text nahi
<Image src={product.imageUrl} alt="" />

// ✓ Descriptive alt text
<Image src={product.imageUrl} alt={`${product.name} - ${product.category.name}`} />

// Decorative images ke liye — empty string (screen reader skip karega)
<Image src="/decoration.svg" alt="" />
```

---

### 3. ARIA Labels — Jab HTML Kaafi Na Ho

```jsx
// Icon-only button — screen reader kya padhega?
// ❌
<button><CartIcon /></button>

// ✓ aria-label add karo
<button aria-label="Cart mein daalo">
  <CartIcon />
</button>

// Cart count ke liye
<button aria-label={`Cart, ${count} items`}>
  <CartIcon />
  <span>{count}</span>
</button>
```

---

### 4. Keyboard Navigation

```jsx
// ✓ Buttons aur links automatically keyboard accessible hain
<button onClick={handleAdd}>Add</button>  // Tab se focus, Enter se click

// ✓ Custom components ke liye tabIndex add karo agar zaroorat ho
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Custom Button
</div>
```

---

### 5. Focus Visible

```css
/* Default focus outline mat hataao — keyboard users ke liye zaroori hai */

/* ❌ */
button:focus { outline: none; }

/* ✓ Custom but visible */
button:focus-visible {
  outline: 2px solid #0070f3;
  outline-offset: 2px;
}
```

---

### 6. Color Contrast

Text aur background mein kaafi contrast hona chahiye — color blind users ke liye.

```
Minimum ratio: 4.5:1 (normal text)
Large text: 3:1

Light gray text on white → Poor contrast ❌
Dark gray text on white → Good contrast ✓
```

Free tool: `webaim.org/resources/contrastchecker`

---

## ShopKaro Mein Quick Checklist

```
✓ Sab buttons aur links keyboard se accessible
✓ Saari images mein alt text
✓ Headings proper order mein (h1 → h2 → h3)
✓ Form inputs mein labels
✓ Error messages clearly describe karein
✓ Focus visible hai
✓ Color sirf information convey nahi karta
  (e.g., "Red = out of stock" ke saath "Out of Stock" text bhi)
```

---

## Accessibility Umbrella — Complete Hua

```
ACCESSIBILITY
│
└── Basics → Doc 43 ✓ (YEH)
```

---

## Agla Doc

`44-deployment-what-is-it.md` — Gyarawa umbrella — **Deployment**. App banai — ab duniya ko dikhao. Vercel pe deploy karna, environment variables — sab samjhenge.
