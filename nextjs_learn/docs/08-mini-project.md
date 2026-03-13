# 08 — Mini Project: TechBlog Website 🚀

## Congratulations! 🎉

Tu yahan tak pahuncha — iska matlab tu ab yeh sab jaanta hai:

✅ TypeScript basics — types, interfaces, generics  
✅ Components — reusable UI pieces  
✅ Props — typed data pass karna  
✅ useState — typed state  
✅ useEffect — API calls  
✅ Lists & Keys — `.map()` with typed arrays  
✅ Conditional Rendering — loading/error/data pattern  

Ab inhe **ek real project** mein jodenge — poora TypeScript ke saath!

---

## Project: TechBlog 📰

Ek simple blog website:
- API se posts fetch hongi
- Search karne ki facility hogi
- Har post ki detail dikh sakti hai
- Loading aur error states properly handle honge

---

## Project Structure

```
app/
├── page.tsx                   ← Homepage
├── components/
│   ├── Navbar.tsx             ← Navigation
│   ├── PostCard.tsx           ← Ek post ka card
│   ├── SearchBar.tsx          ← Search input
│   └── PostDetail.tsx         ← Post ki poori detail
```

---

## Step 1: Types File — Sab Interfaces Ek Jagah

Bade projects mein sab types ek alag file mein rakhte hain:

```tsx
// app/types.ts  ← naya file banao

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}
```

Ab import karke anywhere use kar sakte ho:

```tsx
import { Post } from '../types'
// ya app ke andar ho toh
import { Post } from './types'
```

---

## Step 2: Navbar Component

```tsx
// app/components/Navbar.tsx

interface NavbarProps {
  onHomeClick: () => void
}

export default function Navbar({ onHomeClick }: NavbarProps) {
  return (
    <nav style={{
      background: '#1a1a2e',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1
        onClick={onHomeClick}
        style={{ color: '#e94560', margin: 0, cursor: 'pointer', fontSize: '22px' }}
      >
        📰 TechBlog
      </h1>
      <span style={{ color: '#aaa', fontSize: '14px' }}>
        Next.js + TypeScript se bana! 🚀
      </span>
    </nav>
  )
}
```

---

## Step 3: SearchBar Component

```tsx
// app/components/SearchBar.tsx

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍 Posts mein search karo..."
        style={{
          padding: '12px 20px',
          width: '400px',
          maxWidth: '90%',
          borderRadius: '25px',
          border: '2px solid #e94560',
          fontSize: '16px',
          outline: 'none'
        }}
      />
    </div>
  )
}
```

---

## Step 4: PostCard Component

```tsx
// app/components/PostCard.tsx

import { Post } from '../types'

interface PostCardProps {
  post: Post                      // ← typed prop — Post interface se
  onReadMore: (post: Post) => void  // ← function prop with Post type
}

export default function PostCard({ post, onReadMore }: PostCardProps) {
  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: '12px',
        padding: '20px',
        margin: '15px',
        width: '280px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <span style={{
        background: '#e94560',
        color: 'white',
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        #{post.id}
      </span>

      <h3 style={{
        margin: '12px 0 8px',
        fontSize: '16px',
        color: '#1a1a2e',
        textTransform: 'capitalize'
      }}>
        {post.title}
      </h3>

      <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>
        {post.body.slice(0, 80)}...
      </p>

      <button
        onClick={() => onReadMore(post)}
        style={{
          background: '#1a1a2e',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px'
        }}
      >
        Poora Padho →
      </button>
    </div>
  )
}
```

---

## Step 5: PostDetail Component

```tsx
// app/components/PostDetail.tsx

import { Post } from '../types'

interface PostDetailProps {
  post: Post
  onBack: () => void
}

export default function PostDetail({ post, onBack }: PostDetailProps) {
  return (
    <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: '1px solid #ddd',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Wapas Jao
      </button>

      <span style={{
        background: '#e94560',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '13px'
      }}>
        Post #{post.id}
      </span>

      <h1 style={{
        marginTop: '15px',
        color: '#1a1a2e',
        textTransform: 'capitalize',
        lineHeight: '1.3'
      }}>
        {post.title}
      </h1>

      <div style={{
        padding: '20px',
        background: '#f9f9f9',
        borderRadius: '10px',
        marginTop: '20px',
        lineHeight: '1.8',
        color: '#444'
      }}>
        <p>{post.body}</p>
        <p>Yeh ek demo blog hai jo Next.js + TypeScript se bana hai. Tu bhi aise hi projects bana sakta hai! 🎉</p>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#e8f4fd',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#555'
      }}>
        👤 <strong>Author ID:</strong> {post.userId} &nbsp;&nbsp;
        📄 <strong>Post ID:</strong> {post.id}
      </div>
    </div>
  )
}
```

---

## Step 6: Main Page — Sab Jodo!

```tsx
// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Post } from './types'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import PostCard from './components/PostCard'
import PostDetail from './components/PostDetail'

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=12')
      .then((r) => r.json())
      .then((data: Post[]) => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Posts nahi aa rahi! Internet check karo. 😅')
        setLoading(false)
      })
  }, [])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  // Agar koi post select ki — detail dikhao
  if (selectedPost) {
    return (
      <>
        <Navbar onHomeClick={() => setSelectedPost(null)} />
        <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
      </>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Navbar onHomeClick={() => setSelectedPost(null)} />

      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h2 style={{ color: '#1a1a2e' }}>Latest Posts 📚</h2>
        <SearchBar value={search} onChange={setSearch} />

        {/* Loading */}
        {loading && (
          <div style={{ marginTop: '40px' }}>
            <p style={{ fontSize: '40px' }}>⏳</p>
            <p>Posts aa rahi hain...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ color: 'red', marginTop: '40px' }}>
            <p style={{ fontSize: '40px' }}>😵</p>
            <p>{error}</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && (
          <>
            {filteredPosts.length === 0 ? (
              <p style={{ color: '#aaa', marginTop: '40px' }}>
                🔍 "{search}" ke liye koi post nahi mili!
              </p>
            ) : (
              <>
                <p style={{ color: '#888', fontSize: '14px' }}>
                  {filteredPosts.length} posts mili
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onReadMore={setSelectedPost}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
```

---

## Sab Concepts Kahan Use Hue?

| Concept | Kahan |
|---------|-------|
| **TypeScript Interfaces** | `Post`, `NavbarProps`, `PostCardProps`, sab jagah |
| **Components** | Navbar, SearchBar, PostCard, PostDetail |
| **Props (typed)** | `post: Post`, `onReadMore: (post: Post) => void` |
| **useState (typed)** | `useState<Post[]>`, `useState<Post \| null>` |
| **useEffect** | API se posts fetch karna |
| **Lists & Keys** | `.map()` with `key={post.id}` |
| **Conditional Rendering** | Loading, Error, PostDetail vs List |
| **Function Types** | `onBack: () => void`, `onChange: (value: string) => void` |

---

## Tu Kya Seekh Gaya? 🏆

Agar tu yahaan tak pahuncha toh tu ab confidently keh sakta hai:

✅ TypeScript ke saath Next.js project setup karna aata hai  
✅ Interfaces se props properly type kar sakta hai  
✅ `useState<Type>` se typed state manage kar sakta hai  
✅ API se data fetch karke TypeScript ke saath handle kar sakta hai  
✅ Reusable typed components bana sakta hai  
✅ **Ek full working TypeScript web app bana sakta hai!** 🚀

---

## Aage Kya Seekho?

Ab jo Next.js + TypeScript basics strong ho gaye —

**Next.js specific cheezein:**
- Next.js Routing — `app/about/page.tsx` se multiple pages
- `<Link>` component — page reload nahi hota
- Server Components deeply — kab client kab server

**Styling:**
- Tailwind CSS — class names se styling, CSS likhna nahi padta

**Database & Backend:**
- Next.js API Routes — apna khud ka backend same project mein
- Prisma + PostgreSQL — database se data

**Auth:**
- NextAuth.js — Google/GitHub se login

---

## Final Baat 💬

> **Concepts sirf tab pakke hote hain jab khud type karo, tod-phod karo, galtiyan karo.**

Yeh project copy mat karna — khud likho. Koi TS error aaye toh ghabrao mat — woh toh TypeScript ka kaam hai, tujhe bachana! 😄

Ab ja aur kuch naya banao! 💪
