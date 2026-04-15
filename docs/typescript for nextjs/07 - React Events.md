# 07 ✅ React Events - FULL PRACTICAL

---

## 🧠 SOCH:
✅ Hum is file mein React ke events ko TypeScript ke saath properly type karna sikh rahe hai
✅ Ye actual project mein jo tum karoge wahi exact cheez hai
✅ Transcript ke 30:50 se 39:23 tak ke poore hisse ko cover karega
✅ Sabse pehle problem dikhayenge phir solution
✅ Har cheez step by step, practical working example
✅ Iske baad hum useState Hook par jayenge

---

## 🚀 Pehle Kya Problem Hai?

Maan lo tumhare pas ek button hai:
```tsx
export default function Home() {

  function handleClick() {
    console.log("Button clicked");
  }

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  )
}
```

✅ Ye chalega lekin agar tumhe `event` parameter chahiye?

```tsx
function handleClick(event) {
  event.preventDefault();
  // ❌ Problem: event ka type `any` hai
  // TypeScript kuch nahi batayega ki isme kya kya properties hai
}
```

❌ **PROBLEM KYA HAI?**
Tumhe nahi pata ki event mein kya kya hai
Intellisense nahi chalega
Tum koi bhi galat property use karoge toh error nahi milega

Yeh problem solve karne ke liye tumhe event ko proper type dena padta hai.

---

## 🔹 React Events Kaise Type Karte Hai?

---

### 🧠 SOCH:
✅ Ye tumhe pehle hi samajhna chahiye
✅ Ye jo `<HTMLButtonElement>` hai yeh GENERIC hai
✅ Humne pehle Generics sikh tha na, yahi use ho raha hai idhar
✅ Isme tum batate ho ki ye event kis html element par aaya hai

✅ Sabse pehle ye yaad rakh: Har event ka alag type hota hai. Aur har event ke saath tumhe element ka naam bhi batana padta hai.

| Event | Type | Kya hai |
|---|---|---|
| Button Click | `React.MouseEvent<HTMLButtonElement>` | Button par click kiya gaya hai |
| Input Change | `React.ChangeEvent<HTMLInputElement>` | Input field mein type kiya gaya hai |
| Form Submit | `React.SubmitEvent<HTMLFormElement>` | Form submit kiya gaya hai |

✅ Tum ab samajh rahe ho?
Ye jo `< >` mein element ka naam hai woh hum Generics mein pass kar rahe hai.
Hum TypeScript ko bata rahe hai ki "ye event button par aaya hai".

Agar tum nahi batayoge toh TypeScript ko nahi pata hoga ki is event mein kya kya properties hai.

---

## 🎯 Step 1: Mouse Event (Button Click)

Sabse common event hai button click:

```tsx
export default function Home() {

  // ✅ Event ka proper type de diya hai
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    
    console.log("Button clicked");
    console.log(event.currentTarget); // ✅ Ab intellisense chalega
  }

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  )
}
```

✅ Ab tum `event.` type karoge toh VS Code sab kuch dikhayega.
✅ Koi bhi galat property use karoge toh code likhte hi error milega.

---

## 🎯 Step 2: Change Event (Input Field)

Input field mein jab tum text type karo tab ye event aata hai:

```tsx
export default function Home() {
  const [search, setSearch] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    
    console.log("Input value: ", event.target.value);
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={handleChange} 
        value={search}
      />
    </div>
  )
}
```

✅ Ab tum directly `event.target.value` le sakte ho koi problem nahi.

---

## 🎯 Step 3: Form Submit Event

Form submit karte waqt ye event aata hai:

✅ **LATEST 2026 VERSION**:
```tsx
export default function LoginPage() {

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); // ✅ Ye most important hai
    
    console.log("Form submitted");
    
    // Form data yaha se lo
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    console.log({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  )
}
```

✅ Ye actual project mein tum har form mein karoge.

⚠️ NOTE: Old React mein `React.FormEvent` use karte the lekin ab wo deprecated hai. Ab `React.SubmitEvent` use karo.

---

## 🔹 Golden Rule For Events:

✅ Agar tumhe event ka type nahi pata toh bas us event par hover karo VS Code mein. Woh tumhe automatically batayega ki kaunsa type hai.

Bas tumhe woh type copy karke apne function mein paste karna hai. Itna hi.

---

## ✅ Ab Tum Kya Samajh Gaye?

1.  ✅ Har React event ka alag type hota hai
2.  ✅ MouseEvent, ChangeEvent, FormEvent ye sab alag alag hai
3.  ✅ Har event mein tumhe element ka type bhi batana padta hai `<HTMLButtonElement>`
4.  ✅ Agar type nahi pata toh VS Code mein hover karo woh bata dega
5.  ✅ Ab tumhe kabhi bhi `any` use karne ki jarurat nahi hai events mein

---

## 🎯 Important Note:

✅ **Sach mein 2026 mein kaunsa type use karna hai?**

| Old Type | New Type | Status |
|---|---|---|
| `React.FormEvent` | ❌ Deprecated hai ab |
| `React.SyntheticEvent` | ❌ Purana hai |
| `React.SubmitEvent<HTMLFormElement>` | ✅ Ab yeh use karo |

✅ Latest React 19 mein `React.FormEvent` deprecated hai. Ab naya `SubmitEvent` aaya hai.

✅ Lekin original video mein `React.FormEvent` hi use kar rahe hai. 2025 ke time pe ye hi standard tha.

✅ Sabse best: Tum VS Code mein hover karo woh tumhe automatically latest type bata dega. Usse copy karo bas.

> Tum internet mein log ko `any` lagate hue dekhoge. Mat karo yeh galat hai.
>
> Har event ka proper type hai, hamesha woh hi use karo.

---

## 🚀 Next Step:

Ab humne React Events 100% samajh liye hai. Ab hum React ke sabse famous hook useState ko TypeScript ke saath type karna sikhange.

👉 Next File: `08 - useState Hook.md`