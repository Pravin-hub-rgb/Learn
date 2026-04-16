# 🗄️ Phase 4: Topic 20 - Authentication & Authorization

> **Interview Question:** "Authentication aur Authorization mein kya difference hai? JWT vs Sessions kaunsa better hai? httpOnly cookies kyun safer hai? NextAuth kaise kaam karta hai?"

---

## 🚨 **The Golden Rule — Sabse Pehle Samjho!**

> **"Authentication = Tum kaun ho? Authorization = Tum kya kar sakte ho?"**

Pehle tum apna identity prove karo, phir tumhe dekh ke decide karo ki tum kya kya access kar sakte ho.

---

## 💡 Beginner-Friendly Explanation (Office Analogy)

```
🏢 Office Scene:

🔐 Authentication:
Tum office gate par aaye. Guard tumhe rokta hai. Tum apna ID card dikhao. Guard check karta hai ki tum is company ke employee ho ya nahi. Agar hai toh andar jane deta hai.

✅ Ye hai Authentication - Tum kon ho ye verify karna.

🔑 Authorization:
Ab tum andar aa gaye. Tum HR room ja rahe ho. Waha guard tumhe rokta hai. Tum employee ho lekin tumhe HR room jaane ki permission nahi hai. Tum sirf apne cubicle tak hi jaa sakte ho.

✅ Ye hai Authorization - Tum kya kar sakte ho ye check karna.

🍪 httpOnly Cookie:
Tumhara ID card guard ke paas hai. Tum usko apne paas nahi rakhte. Jab bhi tum kahi jao guard tumhe pehchaan leta hai. Tum apne aap usko modify nahi kar sakte. Chori bhi nahi ho sakta.
```

---

## 📊 JWT vs Sessions

| 🍪 Session Based Authentication | 🎫 JWT Token Based Authentication |
|---------------------------------|-----------------------------------|
| Server par session store hota hai database ya memory mein | Server par kuch store nahi hota. Sab data token mein encoded hota hai |
| User ke pass sirf session id rehta hai | User ke pass poora token rehta hai |
| Har request par server database check karta hai | Har request par server sirf signature verify karta hai |
| Logout easy hai - bas session delete karo | Logout mushkil hai - token expire hone tak chalta hai |
| Scale karna mushkil hai | Scale karna aasan hai |
| Old way | Modern way |
| Most secure | Secure hai par proper implement karna zaroori hai |

---

## 🔒 httpOnly Cookies Kyun Safer Hai?

Ye security ka sabse important point hai.

```
❌ Normal Cookie / LocalStorage:
Javascript access kar sakta hai.
Agar site par XSS attack hua toh hacker poora token chura sakta hai.
Uske baad woh tumhare poore account ka access le sakta hai.

✅ httpOnly Cookie:
Javascript bilkul bhi access nahi kar sakta.
Sirf browser hi inhe request ke saath automatically bhejta hai.
XSS attack hua bhi token chura nahi sakta.
Koi bhi JS code ise nahi dekh sakta, nahi modify kar sakta.
```

✅ **Security Level:**
1.  ✅ httpOnly Secure SameSite Cookie = 99% safe
2.  ⚠️ Normal Cookie = Medium safe
3.  ❌ LocalStorage = 0% safe

> **Interview Tip:** Hamesha bolo ki hum hamesha httpOnly cookies use karte hai token store karne ke liye. LocalStorage kabhi nahi.

---

## 🚨 Common Authentication Mistakes

### ❌ Mistake 1: JWT ko localStorage mein store karna
```tsx
// ❌ SUPER DANGEROUS! Aaj tak ye kar rahe ho toh abhi band karo
localStorage.setItem('token', token)
```
XSS attack se poora account hack ho jayega.

### ❌ Mistake 2: JWT mein sensitive data store karna
```tsx
// ❌ GALAT! JWT encode hota hai encrypted nahi
const token = jwt.sign({ email: 'a@b.com', password: '123456' }, secret)
```
Koi bhi token ko dekh kar poora data nikal sakta hai. Koi bhi secret JWT mein mat rakho.

### ❌ Mistake 3: JWT ka expiry time nahi lagana
```tsx
// ❌ GALAT! Ye token kabhi expire nahi hoga
const token = jwt.sign({ id: user.id }, secret)
```
Hamesha 15 minute se zyada ka expiry mat lagao. Refresh token use karo.

### ❌ Mistake 4: Authorization nahi karna
Sirf user login hai ye check karo mat. Ye bhi check karo ki usko ye resource access karne ki permission hai ya nahi.

---

## ⚡ NextAuth / Auth.js Deep Dive

NextAuth (Ab Auth.js bolte hai) Next.js ke liye most popular authentication library hai.

### ✅ NextAuth kya karta hai automatically:
1.  httpOnly cookies set karta hai
2.  CSRF protection hai
3.  JWT ya session dono option hai
4.  1000+ providers (Google, Github, Facebook etc)
5.  Automatic refresh token rotation
6.  Secure by default
7.  Edge Runtime support

### 📝 Basic NextAuth Example

```tsx
// ✅ auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Database se user find karo
        const user = await db.user.findUnique({ where: { email: credentials.email } })
        
        if (!user) return null
        
        // Password verify karo
        const valid = await bcrypt.compare(credentials.password, user.password)
        
        return valid ? user : null
      }
    })
  ]
})
```

Server Component mein directly use karo:
```tsx
// ✅ Server Component
export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return <div>Welcome {session.user.name}</div>
}
```

Middleware mein bhi use karo:
```tsx
// ✅ middleware.ts
export { auth as middleware } from "@/auth"

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
```

✅ **Sab kuch automatic hai.** Tumhe kabhi bhi cookie manually set nahi karni padti, kabhi JWT generate nahi karna padta, kabhi security ke baare mein nahi sochna padta.

---

## 🎭 Common Authorization Patterns

### 1. Role Based Access Control (RBAC)
Sabse common pattern. User ko role assign karo: user, admin, superadmin.

```tsx
async function DashboardPage() {
  const session = await auth()

  if (session.user.role !== 'admin') {
    return <div>You are not authorized to view this page</div>
  }

  return <div>Admin Dashboard</div>
}
```

### 2. Resource Ownership Check
Sirf woh hi apna data edit kar sakta hai.

```tsx
async function EditPostPage({ params }) {
  const session = await auth()
  const post = await db.post.findUnique({ where: { id: params.id } })

  if (post.authorId !== session.user.id) {
    return <div>You can only edit your own posts</div>
  }

  return <EditPostForm post={post} />
}
```

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "Authentication aur Authorization mein kya difference hai?"

**Answer:** "Sir Authentication ye confirm karta hai ki tum kon ho. Authorization ye confirm karta hai ki tum kya kar sakte ho. Pehle authentication hota hai phir authorization. Bina authentication ke authorization ka koi matlab nahi hai."

### Q: "JWT aur Sessions mein kaunsa better hai?"

**Answer:** "Dono apne apne jagah better hai. Session sab secure hai par scale karna mushkil hai. JWT scale karna aasan hai par proper implement karna zaroori hai. Aaj ke time mein mostly JWT hi use karte hai par hamesha httpOnly cookie mein store karte hai."

### Q: "httpOnly cookies kyun itne safe hai?"

**Answer:** "httpOnly cookies ko javascript kabhi bhi access nahi kar sakta. Sirf browser hi inhe request ke saath bhejta hai. Agar XSS attack bhi ho jaye toh hacker token ko nahi chura sakta. Ye authentication ke liye sabse safe tareeka hai."

### Q: "LocalStorage mein token store karna kyun galat hai?"

**Answer:** "LocalStorage ko koi bhi javascript code access kar sakta hai. Agar site par koi bhi XSS vulnerability hai toh hacker poora token chura sakta hai. Uske baad woh poore account ka control le sakta hai. Isliye kabhi bhi localStorage mein token mat store karo."

### Q: "JWT mein kya store karna chahiye kya nahi?"

**Answer:** "JWT mein sirf user id, email, role jaise public data store karo. Kabhi bhi password, api keys ya koi secret JWT mein mat store karo. JWT encode hota hai encrypted nahi. Koi bhi usko decode kar ke poora data dekh sakta hai."

### Q: "NextAuth kya advantages deta hai?"

**Answer:** "NextAuth sab kuch automatically karta hai. Wo hamesha httpOnly cookies use karta hai, CSRF protection hai, refresh token automatically rotate karta hai, 1000+ providers hai. Humhe security ke bare mein kabhi nahi sochna padta. Wo sab kuch sahi tareeke se karta hai."

### Q: "JWT ka expiry time kitna hona chahiye?"

**Answer:** "Access token ka expiry time hamesha kam rakho 15 minute se zyada nahi. Refresh token ka thoda zyada 7 days rakh sakte hai. Agar access token expire ho jaye toh refresh token se naya access token le lo."

### Q: "Logout kaise karte hai JWT mein?"

**Answer:** "JWT stateless hota hai isliye logout thoda tricky hai. Best way hai ki server par ek blacklist maintain karo. Ya fir refresh token ko database mein store karo jab logout karo toh usko delete kar do."

---

## ✅ **Key Takeaways**

1.  Authentication = Who are you? Authorization = What can you do?
2.  Always use httpOnly secure sameSite cookies for storing tokens
3.  Never ever store tokens in localStorage
4.  JWT is not encrypted, it is only encoded
5.  Keep access token expiry short (15 min)
6.  Use NextAuth / Auth.js don't roll your own auth
7.  Always do authorization check after authentication
8.  Never trust client side validation always recheck on server

> **Final Tip:** Interview mein hamesha ye line bol dena: "Authentication is the most common place where developers mess up security. 90% hacks are due to bad auth implementation. Isliye kabhi bhi khud ka auth mat banao, standard library use karo."