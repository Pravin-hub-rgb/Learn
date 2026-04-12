# 04 — Forms + Validation: React Hook Form, Zod, Yup aur Baaki

> Umbrella: Frontend → Form Handling + Validation
> Kaam: User input lena, validate karna, errors dikhana
> Note: Zod frontend + backend dono mein use hota hai

---

## Yeh Category Kya Solve Karti Hai

Forms mein yeh sab handle karna padta hai:
- Input values track karna
- Validation (email format sahi hai? password 8 chars ka hai?)
- Error messages dikhana
- Submit handling
- Loading states

Scratch se karo toh bahut code — yeh tools simplify karte hain.

---

## Do Alag Cheezein Hain — Form Library + Validator

```
FORM LIBRARY:    Form state manage karo, submit handle karo
  → React Hook Form, Formik

VALIDATOR:       Data sahi format mein hai? Check karo
  → Zod, Yup, Valibot

Dono saath use hote hain:
  → React Hook Form + Zod → Most popular combo 2024
```

---

## Form Libraries

---

### React Hook Form
**Tag: 🟢 Most Popular 2024 | Recommended | Performance**

```
Kya hai: Hooks-based form library — minimal re-renders, great performance
Kab use karo:
  → Almost always — naye projects mein default choice

Real app example:
  → Swiggy ka address form: Name, phone, house no, landmark — sab validate
  → Razorpay onboarding: Business details form (bahut fields)
  → ShopKaro signup/login forms

Pros:
  → Uncontrolled inputs — minimal re-renders (fast)
  → Zod ke saath perfect integration
  → TypeScript support excellent

Code feel:
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)  // Zod validation
  })

  <input {...register("email")} />
  {errors.email && <span>{errors.email.message}</span>}

Formik se fark:
  → React Hook Form: Uncontrolled (refs) → Fast
  → Formik: Controlled (state) → More re-renders → Slower

India mein: Standard ban gaya hai naye projects mein
```

---

### Formik
**Tag: 🟡 Legacy | Was standard 2019-2022**

```
Kya hai: Form state management with controlled inputs
Kab use karo:
  → Existing Formik codebase
  → Naye projects mein avoid — React Hook Form better

React Hook Form se fark:
  → Controlled inputs → Har keystroke pe re-render
  → React Hook Form se slow
  → Zyada boilerplate

Status: Still maintained — lekin React Hook Form ne le li popularity
```

---

## Validators

---

### Zod
**Tag: 🟢 Most Popular 2024 | TypeScript-first | Frontend + Backend**

```
Kya hai: TypeScript-first schema validation — frontend + backend dono mein use hota hai
Kab use karo:
  → TypeScript project hai
  → Form validation
  → API request/response validate karna (backend pe bhi)
  → Environment variables validate karna

IMPORTANT: Zod sirf frontend nahi — backend pe bhi:
  → API route mein aaya request body → Zod se validate karo
  → Database se aaya data → Zod se parse karo
  → .env variables → Zod se validate karo (popular pattern)

Real app example:
  → Swiggy: Address form — pincode 6 digits? phone 10 digits?
  → ShopKaro signup: Email format? Password min 8 chars?
  → Backend: POST /api/orders ka body validate karo

Code feel:
  const signupSchema = z.object({
    email: z.string().email("Valid email daalo"),
    password: z.string().min(8, "8 characters minimum"),
    name: z.string().min(2, "Naam bahut chhota hai")
  })

  // TypeScript type automatically milta hai:
  type SignupData = z.infer<typeof signupSchema>

  // Backend mein bhi same schema use karo:
  const body = signupSchema.parse(await req.json())
  // Agar invalid → Automatically error throw

Pros:
  → TypeScript types automatically generate hoti hain schema se
  → Frontend aur backend same schema share kar sakte hain
  → Excellent error messages
  → Composable — schemas combine kar sakte ho

India mein: 2022 ke baad rapidly adopted
tRPC ke saath: Perfect pair — end-to-end type safety
```

---

### Yup
**Tag: 🟡 Older | Was standard before Zod | Still used**

```
Kya hai: Schema-based validation — JavaScript-first (TypeScript support hai lekin secondary)
Kab use karo:
  → Existing Yup codebase
  → Formik ke saath (Formik + Yup classic combo)
  → JavaScript project (no TypeScript)

Zod se fark:
  → Yup: JavaScript-first, promise-based async
  → Zod: TypeScript-first, sync by default
  → Zod mein TypeScript integration better

Status: Still maintained, still popular — lekin Zod ne lead le li

Code feel:
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
```

---

### Valibot
**Tag: 🔵 Lightweight | Tiny bundle | Growing**

```
Kya hai: Zod jaisi validation — lekin bahut chhota bundle size
Kab use karo:
  → Bundle size critical hai (edge functions, serverless)
  → Zod bahut bada lag raha hai

Zod se fark:
  → Valibot: ~8KB | Zod: ~50KB
  → API thodi alag hai
  → Ecosystem chhota hai abhi

Status: Growing — lekin Zod ka ecosystem zyada mature
```

---

### Joi
**Tag: 🟡 Backend-first | Node.js classic**

```
Kya hai: Schema validation — originally Node.js/Express ke liye
Kab use karo:
  → Express.js backend with existing Joi
  → Browser mein avoid — Zod better

Express classic pattern:
  → Joi + Express → Request validation
  → Ab: Zod + Hono/Fastify → Better TypeScript

Status: Purane Express projects mein milega
```

---

## Best Combos

```
2024 Standard:
  React Hook Form + Zod + shadcn/ui inputs
  → Most common combo in production

Legacy (still working):
  Formik + Yup
  → Purane projects

Backend validation:
  Zod (same library, frontend se share kar sakte ho schema)
```

---

## ShopKaro Example — Login Form

```tsx
// Zod schema — frontend + backend share kar sakte ho
const loginSchema = z.object({
  email: z.string().email("Valid email daalo"),
  password: z.string().min(1, "Password daalo")
})

// React Hook Form + Zod
function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("password")} type="password" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Login</button>
    </form>
  )
}

// Backend mein bhi same schema
// /app/api/auth/login/route.js
const body = loginSchema.parse(await req.json())
// Agar invalid → 400 error automatic
```

---

## Quick Decision

```
Form library:
  → React Hook Form (almost always)
  → Existing Formik? Rehne do

Validator:
  → Zod (TypeScript project)
  → Yup (existing codebase ya plain JS)
  → Valibot (bundle size critical)

Backend validation:
  → Zod (same as frontend — share schemas)
```

---

## Agla Doc

`05-frontend-http.md` — HTTP Clients — fetch, Axios, React Query, SWR — API calls kaise karte hain, Zomato ki product listing kaise fetch hoti hogi.
