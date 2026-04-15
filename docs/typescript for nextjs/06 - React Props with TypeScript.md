# 06 ✅ React Props with TypeScript - FULL PROJECT

---

## 🧠 SOCH:
✅ Hum is file mein React ke components mein Props ko TypeScript ke saath properly type karna sikh rahe hai
✅ Ye actual project mein jo tum karoge wahi exact cheez hai
✅ Transcript ke 25:24 se 30:50 tak ke poore hisse ko cover karega
✅ Poora ek actual mini project banayenge step by step
✅ Koi back and forth nahi hoga, poora depth mein cover karunga
✅ Iske baad hum React Events par jayenge

---

## 🎯 Pehle Revision Karte Hai

> **Props kya hai?**
> Jab tum ek component se dusre component mein data bhejte ho usko Props bolte hai.
> 
> Component ek function ki tarah hota hai, Props uske parameters hote hai.
> 
> Jaise function mein parameter pass karte hai usi tarah component mein props pass karte hai.

---

## 🚀 Project Setup

Hum aaj ek Post Card component banayenge.
- Hum first post ka type banayenge
- Phir PostCard component banayenge
- Phir usme post ko as a prop pass karenge
- Phir usko page pe list karenge

Sab step by step karenge.

---

### Step 1: Pehle hum Post ka type banate hai

Apne `types.ts` file mein yeh likho:
```typescript
// types/post.ts
export type Post = {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
}
```

✅ Ye humara base type hai. Hum isko har jagah use karenge.

---

### Step 2: Ab hum PostCard component banate hai - GRADUALLY

---

#### 🧠 SOCH:
✅ Ab main component banaunga
✅ Pehle sabse basic version banata hu
✅ Phir usko improve karunga step by step
✅ Nahi toh tumhe nahi pata ki aise kyun likha hai

---

#### Step 2.1: Sabse basic version (Sabse pehle aise hi likhte hai log)
```tsx
// components/PostCard.tsx

export default function PostCard(props) {
  // ❌ Yaha problem kya hai?
  // props ka type `any` hai
  // Tumhe nahi pata ki isme kya kya hai
  // VS Code kuch nahi dikhayega

  return (
    <div>
      <h3>{props.post.title}</h3>
    </div>
  )
}
```

✅ Ab tum yaha `props.` type karoge toh kuch nahi dikhega. Koi bhi galat naam doge toh bhi error nahi milega. BAHUT BURA HAI.

---

#### Step 2.2: Pehle improvement - Type define karo
```tsx
// components/PostCard.tsx
import { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
}

export default function PostCard(props: PostCardProps) {
  // ✅ Ab thik hai
  // Ab tum `props.post.` type karoge toh saare properties dikhenge
  // Agar koi galat property doge toh error milega

  return (
    <div>
      <h3>{props.post.title}</h3>
    </div>
  )
}
```

Ab thik hai lekin ab bhi ek problem hai. Har baar `props.post.` likhna pad raha hai.

---

#### Step 2.3: Second improvement - Object Destructure karo
```tsx
// components/PostCard.tsx
import { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // ✅ Ab perfect hai!
  // Ab direct `post.` use kar sakte ho
  // Baar baar props. nahi likhna padta

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-xl font-bold">{post.title}</h3>
      <p className="text-gray-600 mt-2">{post.body}</p>
      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <span>By {post.author}</span>
        <span>{post.createdAt}</span>
      </div>
    </div>
  )
}
```

✅ Ab yeh final version hai. Aise hi har professional developer likhta hai.

Ab tum samajh rahe ho ki step by step kaise aaya yeh final code? Main poora final code ek baar mein nahi diya. Main tumhe dikhaya ki kaise ek line se start karke aaya yaha tak.

---

### Step 3: Ab tum is component ko kahi bhi use kar sakte ho

```tsx
// app/page.tsx
import PostCard from "@/components/PostCard";
import { Post } from "@/types/post";

export default function Home() {

  // Ye actual data hai jo tum API se laoge
  const posts: Post[] = [
    {
      id: 1,
      title: "First Post",
      body: "This is my first post content",
      author: "Pravin",
      createdAt: "12/04/2026"
    },
    {
      id: 2,
      title: "Second Post",
      body: "This is my second post content",
      author: "Ram",
      createdAt: "12/04/2026"
    }
  ]

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-8">All Posts</h1>

      {/* Map karo har post par */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

---

## 🔹 Ab Kya Fayda Hua TypeScript Se?

✅ Jab tum `post.` type karoge toh VS Code automatically saare properties dikhayega
✅ Agar tum koi property galat daloge toh error milega code likhte hi
✅ Agar tum Post type mein naya property add karoge toh saare jagah automatically aa jayega
✅ Koi bhi typo nahi hoga ab

---

## 🔹 Optional Props

Agar tumhe koi prop optional rakhna hai toh `?` lagao:

```typescript
type PostCardProps = {
  post: Post;
  showAuthor?: boolean; // ✅ Optional hai
}
```

✅ Ab tum ye prop pass kar sakte ho nahi bhi toh koi problem nahi.

---

## 🔹 Default Value Optional Props Ka

```tsx
export default function PostCard({ 
  post, 
  showAuthor = true // ✅ Default value set kar diya
}: PostCardProps) {

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-xl font-bold">{post.title}</h3>
      <p className="text-gray-600 mt-2">{post.body}</p>
      {showAuthor && (
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>By {post.author}</span>
          <span>{post.createdAt}</span>
        </div>
      )}
    </div>
  )
}
```

---

## 🔹 Children Props - PRACTICAL EXAMPLE

Ye tumhare project mein sabse zyada use hone wala pattern hai.

### Step 1: Card component create karo
```tsx
// components/Card.tsx
type CardProps = {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="border p-4 rounded-lg shadow">
      {children}
    </div>
  )
}
```

✅ `React.ReactNode` matlab iske andar tum kuch bhi daal sakte ho: text, html, dusre component, array, number, boolean kuch bhi.

---

### Step 2: Ab tum is Card ko har jagah use kar sakte ho

```tsx
// app/page.tsx
import { Card } from "@/components/Card";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      
      {/* Card mein sirf text */}
      <Card>
        Ye sirf text hai
      </Card>

      {/* Card mein html elements */}
      <Card>
        <h3 className="text-xl font-bold">Title</h3>
        <p className="mt-2">Description text here</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Click Me</button>
      </Card>

      {/* Card mein dusra component bhi daal sakte ho */}
      <Card>
        <PostCard post={posts[0]} />
      </Card>

    </div>
  )
}
```

✅ Ab tum samajh rahe ho? Ye Card tum uske andar kya bhi daalo chalega. Ye reusable component banane ka standard tareeka hai.

✅ Sabse bada fayda: Tum Card ka design ek baar change karo, poore project mein har jagah automatically change ho jayega.

---

## ✅ Ab Tum Kya Samajh Gaye?

1.  ✅ Har component ke liye alag props type banao
2.  ✅ Type define karo ek baar har jagah use karo
3.  ✅ Optional props ke liye `?` use karo
4.  ✅ Children props ke liye `React.ReactNode` use karo
5.  ✅ Ab tumhe kabhi bhi props ke liye koi documentation nahi dekhni padegi, VS Code sab bata dega

---

## 🎯 Golden Rule:

> Har component ke liye pehle uske props ka type banao, phir component banao.
>
> Kabhi bhi inline props mat likho, hamesha alag type banao.

---

## 🚀 Next Step:

Ab humne React Props 100% samajh liye hai. Ab hum React Events ko TypeScript ke saath type karna sikhange.

👉 Next File: `07 - React Events.md`