# ⚙️ Phase 3: Topic 17 - App Router vs Pages Router

> **Interview Question:** "Next.js ke App Router aur Pages Router mein kya difference hai? layout.js, page.js, loading.js, error.js kaise kaam karte hai? Abhi naye projects mein Pages Router use karna chahiye ya App Router?"

---

## 🚨 **The Golden Rule — Sabse Pehle Samjho!**

> **"Pages Router = Old Next.js, App Router = New Next.js. App Router ne React ko server par full power di hai, Pages Router sirf client side React ke upar ek wrapper tha."**

Maano tumhare paas 2 gadi hai:
- **Pages Router = 2015 ka Maruti Swift** → Reliable hai, chalta hai, par latest features nahi hai
- **App Router = 2025 ka Tesla** → Sab latest technology hai, RSC, Streaming, Server Components, par thoda naya hai

---

## 💡 Beginner-Friendly Explanation (Real World Analogy)

```
🏠 Pages Router (Old Way):
Tum apne ghar ke har kamre ke liye alag alag entrance bana lo. Har kamre mein sab kuch alag hoga. Agar tumhe har kamre mein same header chahiye toh har file mein copy paste karo. Har kamre mein ghusane se pehle poora load hona padta hai.

🏢 App Router (New Way):
Tum apne ghar ka ek proper structure banao. Sab se pehle ek common entrance hai (Root Layout), uske andar hall hai, uske andar bedrooms hai. Sab cheezein nested hai. Har level par apna apna header, loader, error handling hai. Tum har cheez ko apne jagah pe rehte hue customize kar sakte ho.
```

✅ **Pages Router Problem:**
- Sab files pages folder mein hote hai
- Common layouts ke liye _app.js aur _document.js
- Server side logic alag files mein
- No proper nesting
- Sab page level par hi chalta hai

✅ **App Router Solution:**
- Folders based routing
- Proper nested layouts
- Har level par apna page, loader, error
- First class Server Components support
- Component level granularity

---

## 📊 Side by Side Comparison

| 🕰️ Pages Router | ✅ App Router |
|----------------|---------------|
| File based routing | Folder based routing |
| `pages/index.js` = `/` | `app/page.js` = `/` |
| `pages/about.js` = `/about` | `app/about/page.js` = `/about` |
| `_app.js` = Single global layout | `layout.js` = Nested layouts at any level |
| `_document.js` = HTML structure | `root layout` = Custom HTML |
| `getStaticProps`, `getServerSideProps` | Async components, direct fetch |
| Client side only by default | Server components by default |
| No streaming | Built in streaming |
| No partial hydration | Selective Hydration |
| Pages Router architecture | App Router architecture |
| 2016 se hai | 2023 mein release hua |
| Deprecated nahi hai, par maintenance mode | Ab ye official default hai |

---

## 📁 App Router File Structure Deep Dive

Ye sabse important part hai. App Router mein tum har folder mein ye files rakh sakte hai, aur woh automatically us level par apply ho jata hai:

| File Name | Purpose | Kaha kaam karta hai |
|-----------|---------|----------------------|
| `page.js` | Actual page content | Sirf us route ke liye |
| `layout.js` | Common wrapper for all child routes | Us route aur uske saare child routes |
| `loading.js` | Loading state jab page load ho raha hai | Us route aur child routes |
| `error.js` | Error boundary agar koi error aaye | Us route aur child routes |
| `not-found.js` | 404 page agar route nahi mila | Us route aur child routes |
| `route.js` | API endpoint for this route | Sirf API ke liye |
| `template.js` | Same as layout par har navigation pe re-render hota hai | Special cases |
| `default.js` | Parallel routes ke liye fallback | Advanced |

### 📐 Nested Layout Example

```
app/
├── layout.js      ✅ Root Layout - Sab pages par apply hoga
├── page.js        ✅ Home Page /
├── loading.js     ✅ Home page loading
├── error.js       ✅ Home page error
│
├── about/
│   ├── layout.js  ✅ Only about page aur uske children par apply hoga
│   ├── page.js    ✅ /about page
│   └── loading.js ✅ Only about page ka loader
│
└── dashboard/
    ├── layout.js  ✅ Dashboard layout
    ├── page.js    ✅ /dashboard
    ├── loading.js ✅ Dashboard loader
    ├── error.js   ✅ Dashboard errors
    │
    └── settings/
        ├── page.js ✅ /dashboard/settings
        └── layout.js ✅ Settings ka apna layout
```

✅ **Ye sabse super power hai App Router ki:**
- Har level par tum apna apna layout, loader, error bana sakte ho
- Koi parent ka change child ko nahi padega
- Koi child ka change parent ko nahi padega
- Sab kuch properly nested aur organized rehta hai

---

## 🔄 Layout.js Deep Dive

Layout woh component hai jo har child page ke upar wrap hota hai.

```tsx
// ✅ app/layout.js - Root Layout (Sab page par apply hoga)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* ✅ Sab pages par header dikhega */}
        {children}   {/* ✅ Yaha actual page content aayega */}
        <Footer /> {/* ✅ Sab pages par footer dikhega */}
      </body>
    </html>
  );
}
```

✅ **Layout ke properties:**
1.  Layout navigation par **re-render nahi hota** hai
2.  State preserve rehta hai layout mein
3.  Har level par alag alag layout ho sakte hai
4.  Layout server component by default hota hai
5.  Tum isme directly data fetch kar sakte ho

Pages Router mein tum sirf 1 hi global layout bana sakte the _app.js mein. App Router mein tum har route ke liye alag alag layout bana sakte ho.

---

## ⏳ Loading.js Deep Dive

Loading.js automatically Suspense boundary bana deta hai. Jab page load ho raha hai tab ye dikhta hai.

```tsx
// ✅ app/dashboard/loading.js
export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-64 bg-gray-200 rounded mb-4"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
```

✅ **Automatic features:**
- Jab bhi us route ya uske child route load honge ye automatically dikhega
- Tumhe koi state manage nahi karni padti
- Streaming ke saath properly kaam karta hai
- Parent route load ho raha hai toh sirf parent ka loader dikhta hai, child ka nahi

Pages Router mein tumhe manually loading state manage karni padti thi har page par.

---

## ❌ Error.js Deep Dive

Error.js automatically React Error Boundary bana deta hai. Agar us route mein koi bhi error aaye toh ye page dikhta hai.

```tsx
'use client'; // ✅ Error component hamesha client hota hai

export default function DashboardError({ error, reset }) {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold mb-4">Kuch galat ho gaya 😕</h2>
      <p className="text-gray-600 mb-8">{error.message}</p>
      <button 
        onClick={() => reset()} 
        className="px-6 py-3 bg-blue-500 text-white rounded"
      >
        Phir se try karo
      </button>
    </div>
  );
}
```

✅ **Automatic features:**
- Sirf us route aur uske children ko hi affect karega
- Baaki poora app kaam karega sirf yahi part error dikhayega
- Tumhe manually error boundaries nahi banane padte
- `reset()` function se automatically retry kar sakte ho

Pages Router mein tumhe manually error boundaries banane padte the.

---

## 🔀 Routing Differences

| Action | Pages Router | App Router |
|--------|--------------|------------|
| Navigation | `import Link from 'next/link'` | Same, no change |
| Programmatic | `router.push('/about')` | `useRouter()` hook app/navigation se aata hai |
| Dynamic Routes | `pages/post/[id].js` | `app/post/[id]/page.js` |
| Catch All | `pages/[...slug].js` | `app/[...slug]/page.js` |
| Optional Catch All | `pages/[[...slug]].js` | `app/[[...slug]]/page.js` |
| Parallel Routes | Not supported | `@dashboard/page.js` |
| Intercepting Routes | Not supported | `(.)photo/page.js` |
| Route Groups | Not supported | `(auth)/login/page.js` |

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Har folder mein layout.js mat banao
Sirf tab hi layout banao jab tumhe actually common chiz chahiye. Har folder mein empty layout mat banaya karo.

### ❌ Mistake 2: Layout mein `use client` lagana
Layout by default server component hota hai. Jab tak na chahiye interactivity tab tak server hi rakho.

### ❌ Mistake 3: Root layout mein conditional render karo mat
Root layout hamesha render hona chahiye. Isme tum kabhi bhi unmount nahi kar sakte.

### ❌ Mistake 4: Page aur Layout ko confusion mein rakhna
- **page.js = Sirf us page ka content**
- **layout.js = Sab child pages ka wrapper**

> **Rule:** Jo cheez saare child pages mein common hai woh layout mein daalo, baaki sab page mein.

---

## 🎯 Kab kaunsa use karna chahiye?

| Scenario | Pages Router | App Router |
|----------|--------------|-------------|
| **Naya Project abhi start kar rahe ho** | ❌ Avoid | ✅ Definitely |
| **Existing project Pages Router par hai** | ✅ Chalte raho | ⚠️ Migration socho par abhi mat todo |
| **Server Components chahiye** | ❌ Nahi hai | ✅ Full support |
| **Streaming aur Suspense chahiye** | ❌ Limited | ✅ Built in |
| **SEO important hai** | ✅ Dono accha hai | ✅ Dono accha hai |
| **Client heavy app hai, server nahi use karoge** | ✅ Ok hai | ✅ Dono chalega |
| **Enterprise project hai, stability chahiye** | ✅ Abhi ke liye | ⚠️ Next 15 ke baad |
| **Learning Next.js abhi** | ❌ Mat sikho | ✅ App Router hi sikho |

> **Interview Answer:** "Ab ke time mein naye projects mein hum App Router hi use karte hai. Pages Router ab sirf existing projects ke liye hai. New features sirf App Router mein hi aa rahe hai."

---

## 📊 Migration Strategy

Agar tum Pages Router se App Router migrate kar rahe ho toh ye order follow karo:

```
1.  ✅ First step: Next.js 13 ya upar update karo
2.  ✅ `app/` folder banao
3.  ✅ Pehle sirf ek page migrate karo
4.  ✅ Phir slow slow har page migrate karo
5.  ✅ Dono router ek saath chalte hai koi problem nahi hai
6.  ✅ Jab sab pages migrate ho jaye tab pages folder delete karo
```

✅ **Important:** Dono router ek saath chala sakte ho. Koi page app mein hai woh app router se serve hoga, nahi toh pages router se.

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "App Router aur Pages Router mein main kya difference hai?"

**Answer:** "Sir, Pages Router Next.js ka purana routing system hai. App Router naya hai jo 2023 mein release hua hai. Sabse bada difference ye hai ki App Router mein React Server Components first class support hai, Server Components by default hote hai, nested layouts, streaming, selective hydration jaise features hai. Pages Router mein sirf page level par hi routing hoti thi, App Router mein folder based proper nested routing hai."

### Q: "layout.js kya kaam karta hai?"

**Answer:** "Layout.js ek wrapper component hai jo us route aur uske saare child routes ke upar apply hota hai. Pages Router mein _app.js jaise hi hai par farak ye hai ki har level par alag alag layout bana sakte hai. Layout navigation par re-render nahi hota hai, state preserve rehta hai."

### Q: "loading.js kaise kaam karta hai?"

**Answer:** "Loading.js automatically React Suspense boundary bana deta hai. Jab us route ya uske koi bhi child route load ho rahe hai toh ye loading state automatically dikhta hai. Hume manually loading state manage nahi karni padti, ye out of the box milta hai."

### Q: "error.js kya hota hai?"

**Answer:** "Error.js automatically React Error Boundary bana deta hai. Agar us route mein koi bhi runtime error aaye toh yeh error page dikhta hai. Baaki poora app kaam karta rahta hai sirf woh particular part hi error dikhayega. Isme ek reset function bhi hota hai jisse user phir se try kar sakta hai."

### Q: "Abhi naye project mein Pages Router use karna chahiye?"

**Answer:** "Nahi sir, ab naye projects mein hum App Router hi use karte hai. Pages Router ab maintenance mode mein hai, naye features sirf App Router mein hi aa rahe hai. Abhi agar koi existing project Pages Router par chala raha hai toh thik hai, par naya project shuru karte waqt App Router hi choose karte hai."

### Q: "App Router ke kis cheez se tumhe sabse zyada faida milta hai?"

**Answer:** "Sabse bada faida nested layouts hai. Har route ke liye alag alag layout, alag loader, alag error handling. Har cheez apne jagah par rehti hai. Dusra faida Server Components hai jo by default hote hai, bundle size bahut kam ho jaata hai."

### Q: "App Router mein koi disadvantages hai kya?"

**Answer:** "Hai thode se:
1.  Thoda naya hai toh abhi bhi chote chote bugs rehte hai
2.  Learning curve thoda zyada hai
3.  Kuch third party libraries abhi properly support nahi kar rahe
4.  Server Components ke patterns abhi log properly nahi samajh rahe

Par ye sab time ke saath thik ho jaayega."

### Q: "Migration kab karna chahiye Pages se App Router?"

**Answer:** "Migration karo par rush mat karo. Pehle thoda App Router seekho, phir ek ek page migrate karo. Dono router ek saath chalte hai koi problem nahi hai. Jab tumhe koi naya feature chahiye jo sirf App Router mein hai tab hi karo."

---

## ✅ **Key Takeaways**

1.  App Router Next.js ka naya default hai, Pages Router ab old hai
2.  Folder based routing, har level par page, layout, loading, error
3.  Server Components by default hote hai
4.  Streaming, Suspense, Selective Hydration built in
5.  Existing projects Pages Router par chalao, naye projects App Router
6.  Migration slow slow karo, dono ek saath chala sakte ho

> **Final Tip:** Interview mein hamesha ye line bol dena: "App Router ne Next.js ko ek proper full stack framework bana diya hai, pehle woh sirf frontend framework tha."
