# Next.js CSS Setup Guide: Learning from Real Problems

**Author:** Pravin  
**Date:** February 22, 2026  
**Level:** Beginner  
**Topic:** CSS Setup and Troubleshooting in Next.js

## 🎯 Overview

This guide documents the complete journey of setting up CSS in a Next.js project, including common problems and their solutions. It's based on real troubleshooting experience.

## 📋 Prerequisites

- Basic understanding of React
- Familiarity with TypeScript syntax
- Next.js project setup complete

## 🚀 The Complete CSS Setup Journey

### Phase 1: Understanding CSS Options in Next.js

When you want to add CSS to your Next.js project, you have several options:

#### Option 1: Tailwind CSS (Recommended)
- Already configured in most Next.js projects
- Utility-first CSS framework
- Classes like `bg-blue-500`, `flex`, `p-4`

#### Option 2: Global CSS
- Add styles to `globals.css`
- Automatically included in every page
- Traditional CSS approach

#### Option 3: CSS Modules
- Component-specific styles
- File naming: `page.module.css`
- Import required: `import styles from './page.module.css'`

#### Option 4: Inline Styles
- Direct style objects in JSX
- Limited but simple for basic styling

### Phase 2: The Problem Discovery

**Initial Issue:** CSS styles weren't working despite having Tailwind configured.

**Project Analysis:**
- ✅ Tailwind installed in `package.json`
- ✅ `globals.css` existed with `@import "tailwindcss"`
- ❌ Tailwind classes not working in components

### Phase 3: The Root Cause

**The Problem:** Your Next.js project had broken auto-inclusion of `globals.css`.

**Evidence:**
- Default Next.js projects work out of the box
- Your project had the same structure but CSS didn't work
- Manual import fixed the issue

### Phase 4: The Solution

**Working Fix:** Manual import of `globals.css` in `layout.tsx`

```tsx
// learning_project/next/app/layout.tsx
import './globals.css';  // ✅ This fixes the issue

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>My Simple Page</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

**Additional Fix:** Typo in page.tsx
```tsx
// Before (❌ Wrong)
className="bg-blue-500 border-2x flex"

// After (✅ Correct)
className="bg-blue-500 border-2 flex"
```

## 🎨 Working CSS Examples

### Basic Styling
```tsx
// learning_project/next/app/page.tsx
export default function Home() {
    return (
        <div className="bg-blue-500 border-2 flex p-8 m-8">
            <div className="bg-white p-4 border-2 border-black">Image</div>
            <div className="bg-white p-4 border-2 border-black">Detail</div>
        </div>
    )
}
```

### Advanced Styling
```tsx
export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                <h1 className="text-4xl font-bold text-white text-center mb-4">
                    Welcome to My Homepage
                </h1>
                <p className="text-white text-center text-lg">
                    This is styled with Tailwind CSS!
                </p>
            </div>
        </div>
    )
}
```

## 🔧 Configuration Details

### globals.css Setup
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

### package.json Dependencies
```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19"
  }
}
```

## 🚨 Common Problems & Solutions

### Problem 1: CSS Not Working at All
**Symptoms:** Tailwind classes have no effect
**Solution:** Add manual import to layout.tsx
```tsx
import './globals.css';
```

### Problem 2: Typo in Tailwind Classes
**Symptoms:** Some classes work, others don't
**Solution:** Check for typos like `border-2x` → `border-2`

### Problem 3: Missing Tailwind Directives
**Symptoms:** Custom classes work, Tailwind doesn't
**Solution:** Ensure globals.css has proper Tailwind setup

### Problem 4: Auto-inclusion Not Working
**Symptoms:** CSS works in some projects, not others
**Solution:** Manual import is the fallback when auto-inclusion fails

## 💡 Key Learnings

### 1. Default Next.js Projects Work Out of the Box
- Fresh Next.js projects include Tailwind properly
- No manual configuration needed
- CSS auto-inclusion works automatically

### 2. Manual Import is a Valid Fallback
- When auto-inclusion fails, manual import works
- `import './globals.css';` in layout.tsx fixes most issues
- This is a legitimate solution, not a hack

### 3. File Structure Matters
- `globals.css` should be in `app/` directory
- Import path: `./globals.css` (same directory as layout.tsx)
- Both files are in the same `app/` folder

### 4. Debugging Approach
1. Check if Tailwind is installed
2. Verify globals.css exists
3. Try manual import as a test
4. Fix any typos in class names
5. Test with simple styles first

## 🔄 Next Steps After CSS Setup

Once CSS is working, you can:

1. **Create Additional Pages**
   ```tsx
   // app/about/page.tsx
   export default function About() {
     return (
       <div className="p-8">
         <h1 className="text-3xl font-bold">About Us</h1>
         <p className="mt-4">Learn more about our story</p>
       </div>
     )
   }
   ```

2. **Add Navigation**
   ```tsx
   // Add to layout.tsx
   <nav className="bg-gray-800 text-white p-4">
     <ul className="flex space-x-4">
       <li><a href="/">Home</a></li>
       <li><a href="/about">About</a></li>
     </ul>
   </nav>
   ```

3. **Use CSS Modules for Component-Specific Styles**
   ```css
   /* page.module.css */
   .container {
     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
   }
   ```

4. **Explore Advanced Tailwind Features**
   - Responsive design
   - Dark mode
   - Custom themes
   - Animations

## 📚 Additional Notes

### Why Manual Import Works
- Next.js should auto-include `globals.css`
- Sometimes the auto-configuration gets broken
- Manual import bypasses the broken auto-inclusion
- This is a common workaround in the Next.js community

### When to Use Each CSS Method
- **Tailwind:** For rapid development and utility classes
- **Global CSS:** For base styles and custom properties
- **CSS Modules:** For component isolation
- **Inline Styles:** For dynamic styles based on props/state

### Best Practices
1. **Start Simple:** Use basic Tailwind classes first
2. **Test Incrementally:** Add one class at a time
3. **Use Manual Import:** If auto-inclusion fails, don't fight it
4. **Keep It Organized:** Use consistent naming and structure

## 🎯 Summary

This guide documents the complete journey of setting up CSS in Next.js, including:
- Multiple CSS options available
- Common problems and their solutions
- Working code examples
- Configuration details
- Best practices and next steps

The key takeaway: **When in doubt, try manual import of globals.css**. It's a simple, effective solution that works when the auto-configuration fails.

Remember: Next.js is designed to work out of the box. If it doesn't, manual import is a perfectly valid solution!