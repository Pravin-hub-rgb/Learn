# 11 — Deployment
### Putting Your React App on the Internet

---

## 🚀 What is Deployment?

You've built your React app. It runs perfectly on `localhost:5173` on your computer. But right now, only YOU can see it. **Deployment** means putting your app on a server so anyone in the world can visit it via a URL.

---

## 🏗️ Step 1 — Build Your App for Production

When you're developing, Vite runs a dev server with lots of extra debugging tools. Before deploying, you need to create an optimized **production build**:

```bash
npm run build
```

This creates a `dist/` folder in your project. That folder contains your entire app compiled into efficient HTML, CSS, and JavaScript files — ready to be served to the world.

The `dist/` folder is what you actually deploy. Not your `src/` folder, not your whole project — just `dist/`.

---

## 🌐 Option 1 — Vercel (Easiest, Most Popular)

**Vercel** is what most React developers use. It's free, fast, and incredibly simple.

### Deploy in 3 steps:

**1. Push your project to GitHub**

Make sure your React project is on GitHub. If you haven't set up Git:
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

**2. Sign up at [vercel.com](https://vercel.com)** with your GitHub account.

**3. Import your project**
- Click "New Project"
- Select your GitHub repository
- Vercel auto-detects it's a Vite + React project
- Click "Deploy"

That's it. In about 60 seconds, your app is live at `https://your-project-name.vercel.app`! 🎉

### The best part — automatic updates:

Every time you push new code to GitHub, Vercel automatically re-deploys. So your live site always stays up to date.

---

## 🌐 Option 2 — Netlify

Very similar to Vercel. Also free and popular.

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → "New site from Git"
3. Connect GitHub → select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy!

---

## 🌐 Option 3 — GitHub Pages (Free, Good for Simple Apps)

If your app doesn't use React Router (or uses hash routing), GitHub Pages is a free option directly from GitHub.

### Setup:

```bash
npm install gh-pages --save-dev
```

In `package.json`, add:
```json
"homepage": "https://yourusername.github.io/your-repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Then deploy:
```bash
npm run deploy
```

> ⚠️ **Important for React Router users:** GitHub Pages doesn't handle React Router's URL paths well. If you're using React Router, stick with Vercel or Netlify — they handle this automatically.

---

## ⚙️ Environment Variables — Hiding API Keys

If your app uses API keys (like for weather APIs, payment systems, etc.), **never hardcode them in your code**. Anyone can see your source code!

Instead, use environment variables:

### Create a `.env` file in your project root:
```
VITE_API_KEY=your_secret_key_here
VITE_API_URL=https://api.example.com
```

### In your React code:
```js
const apiKey = import.meta.env.VITE_API_KEY  // access env variable
```

> 💡 Vite requires all env variables to start with `VITE_`. Variables without this prefix are ignored.

### Add `.env` to `.gitignore`:
```
# .gitignore
.env
.env.local
```

This stops your secret keys from being uploaded to GitHub.

### On Vercel/Netlify — add env variables in their dashboard:
Both platforms have a section in project settings where you add your environment variables. They inject them during the build process.

---

## 🔍 Pre-Deployment Checklist

Before you deploy, quickly check:

- [ ] `npm run build` runs without errors
- [ ] API keys are in `.env`, not hardcoded
- [ ] `.env` is in `.gitignore`
- [ ] App works on all the routes you've set up
- [ ] Console has no major errors
- [ ] Images and assets load correctly

---

## 📁 What NOT to Push to GitHub

These should be in your `.gitignore`:
```
node_modules/    ← huge folder, not needed (npm install recreates it)
dist/            ← generated build, not needed
.env             ← contains secrets
```

A standard `.gitignore` for Vite already includes these — Vite sets this up when you create the project.

---

## 🔄 The Full Development → Deployment Flow

Here's the complete picture of how development and deployment work together:

```
1. Write code in src/ (npm run dev → localhost:5173)
         ↓
2. Test everything locally
         ↓
3. git add . → git commit → git push (push to GitHub)
         ↓
4. Vercel/Netlify detects the push
         ↓
5. They run npm run build (creates dist/)
         ↓
6. They serve dist/ to the world
         ↓
7. Your app is live at your-app.vercel.app 🌍
```

Every time you push new code, steps 4-7 repeat automatically!

---

## ✅ Quick Summary

| Platform | Best For |
|----------|---------|
| Vercel | React apps, best default choice, free |
| Netlify | Similar to Vercel, also great |
| GitHub Pages | Simple apps without React Router |

| Command | What it does |
|---------|-------------|
| `npm run build` | Create production-ready `dist/` folder |
| `npm run deploy` | Deploy to GitHub Pages (if set up) |
| `VITE_` prefix | Required for env variables in Vite |
| `import.meta.env.VITE_KEY` | Access env variables in Vite code |

---

## 🎉 You Made It!

That's the complete React journey — from zero to deployed. Here's everything you've covered:

1. ✅ What React is and why it exists
2. ✅ Setting up with Vite
3. ✅ How the DOM and Virtual DOM work
4. ✅ JSX and writing components
5. ✅ useState for reactive data
6. ✅ Events, forms, and two-way binding
7. ✅ Styling with CSS and Tailwind
8. ✅ Components and Props
9. ✅ Rendering JSON data with .map()
10. ✅ Fetching real API data with Axios
11. ✅ Navigation with React Router DOM
12. ✅ useEffect, useRef, and Toastify
13. ✅ Context API for global state
14. ✅ Redux Toolkit basics
15. ✅ Framer Motion basics
16. ✅ Deploying your app

**What's next?**
- Build projects! That's the fastest way to get good.
- Learn TypeScript with React
- Explore Next.js (React framework with server-side rendering)
- Get comfortable with Redux in real projects
- Practice API integration with different public APIs

Good luck! 🚀
