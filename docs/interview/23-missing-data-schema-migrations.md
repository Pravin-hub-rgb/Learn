# 🗄️ Phase 4: Topic 23 - Handling Missing Data & Schema Migrations

> **Interview Question:** "Production mein database mein missing values kaise handle karte ho? Schema migrations kaise karte hai downtime ke bina? Kya approach follow karte ho?"

---

## 🚨 **The Golden Rule — Sabse Pehle Samjho!**

> **"Ghar mein naya kamra banate waqt tum rehte hue banate hai. Log ghar se nahi nikalte. Waise hi schema migrations bhi live chalte hue karni padti hai downtime ke bina."**

Production mein database kabhi bhi band nahi hota. Tumhe chalte hue changes karne hote hai.

---

## 💡 Beginner-Friendly Explanation (House Renovation Analogy)

```
🏠 Ghar ko badalna hai:

❌ Galat tareeka:
Ghar ko poora band karo. Sabko bahar nikal lo. 1 din poora ghar badlo. Phir log ko andar aane do. 24 ghanta ghar band rahega. Sab log naraz ho jayenge.

✅ Sahi tareeka:
1.  Pehle naya wall banalo side mein jab log andar reh rahe hai
2.  Sab ko naye hisse mein shift karo
3.  Phir purana hissa hatao
4.  Kabhi bhi ghar band nahi hua. Koi nahi pata ki badlaav hua bhi hai.

⚡ Database Migration:
Bilkul yahi hota hai. Production mein 0 downtime migration karni padti hai. Kabhi bhi database band nahi kar sakte. User hamesha aate rahte hai.
```

---

## 🎯 Missing Data Handling Strategies

Jab tum naya column add karte hai toh purane rows mein usme value nahi hoti. Ye missing values hai.

### ✅ Strategy 1: Default Value Set Karo
Simplest aur best approach.

```sql
-- ✅ Sabse best tareeka
ALTER TABLE users ADD COLUMN phone VARCHAR(20) DEFAULT '' NOT NULL;
```

✅ **Pros:**
- Missing values nahi honge
- Koi application change nahi chahiye
- Sab existing queries kaam karenge

❌ **Cons:**
- Har naye column ke liye sensible default chahiye

---

### ✅ Strategy 2: Backfill Data
Default nahi mil raha toh purane rows ko update karo background mein.

```sql
-- Step 1: Add column nullable
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Step 2: Background job se sab purane rows ko update karo
UPDATE users SET phone = '' WHERE phone IS NULL;

-- Step 3: Ab column ko NOT NULL karo
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
```

✅ **Pros:**
- Koi default nahi chahiye
- Slow speed par kar sakte hai load nahi hoga

❌ **Cons:**
- Thoda time lagta hai

---

### ✅ Strategy 3: Application Level Handling
Application mein check karo agar null hai toh default dikhao.

```tsx
function UserProfile(user) {
  // ✅ Agar phone nahi hai toh default dikhao
  return <div>Phone: {user.phone || 'Not provided'}</div>
}
```

✅ **Pros:**
- Database mein koi change nahi karna
- Sabse fast implement hota hai

❌ **Cons:**
- Har jagah check karna padta hai
- Bhool jaoge toh bug aa jayega

---

## 🚨 Never Do These Mistakes

### ❌ Mistake 1: Naya column NOT NULL bina default ke add karo
```sql
-- ❌ SUPER DANGEROUS! Production mein ye poore database ko lock kar dega
ALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL;
```

1 crore rows wale table par ye query 10 minute tak lock rakhega. Poora site down ho jayega.

### ❌ Mistake 2: Big table par ALTER TABLE peak time par chalao
Kabhi bhi 12 baje dopahar ko migration mat chalao. Raat ko 2 baje chalao jab traffic kam hai.

### ❌ Mistake 3: Ek baar mein saare changes karo
Ek baar mein 10 column mat add karo. Ek ek karke karo. Har change ke baad monitor karo.

### ❌ Mistake 4: Migration ke baad rollback plan nahi banana
Kuch galat ho gaya toh wapas kaise jaoge. Hamesha rollback script ready rakho.

---

## 📋 Zero Downtime Migration Steps

Ye industry standard pattern hai har company follow karti hai:

```
✅ STEP 1: Add new column nullable
- Koi existing code ko koi farak nahi padega
- Sab kuch kaam karta hai jaise pehle tha

✅ STEP 2: Update application code to write both old and new column
- Ab naye entries dono jagah aa rahi hai
- Abhi bhi purana column hi use ho raha hai read ke liye

✅ STEP 3: Backfill all old rows new column mein
- Background job se purane data ko naye column mein copy karo
- Slow slow karo taaki load nahi aaye

✅ STEP 4: Update application to read from new column
- Ab sab kuch naye column se ho raha hai
- Purana column ab koi use nahi kar raha

✅ STEP 5: Delete old column
- Ab purana column delete kar sakte ho
- Poora migration poora ho gaya

✅ RESULT: Kabhi bhi app down nahi hua! Koi user ko nahi pata ki kuch badla hai.
```

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "Production mein missing values kaise handle karte ho?"

**Answer:** "Sir missing values handle karne ke liye hum hamesha 3 steps follow karte hai: pehle naya column nullable add karo, phir background job se backfill karo, phir usko not null karo. Kabhi bhi bina default ke not null column nahi add karte production mein."

### Q: "Zero downtime schema migration kaise karte hai?"

**Answer:** "Zero downtime migration ke liye hum multi step approach follow karte hai. Pehle naya column add karo, phir dono jagah write karo, phir purane data ko backfill karo, phir naye se read karo, last mein purana column delete karo. Isme kabhi bhi app down nahi hota."

### Q: "Kabhi tumne migration se production down kiya hai?"

**Answer:** "Haan bhai initial days mein kiya tha. Main ek baar bina default ke not null column add kiya tha 80 lakh rows wale table par. Poora site 15 minute ke liye down hua tha. Uske baad main kabhi bhi aisa nahi karta."

### Q: "Backfill kaise karte ho bina load ke?"

**Answer:** "Backfill hum hamesha batch mein karte hai. 1000 rows ek baar mein update karo phir 1 second wait karo. Aise karoge toh database par koi load nahi aayega. Sab background mein chalta hai."

### Q: "Default value kaun sa rakhna chahiye?"

**Answer:** "Hamesha sensible default rakho. String ke liye empty string, number ke liye 0, boolean ke liye false. Kabhi bhi NULL ko valid value mat rakho. NULL ka matlab unknown hai na ki empty."

### Q: "Migration kab chalao production mein?"

**Answer:** "Hamesha lowest traffic time par. Hum raat ko 2 baje migration chalte hai. Us time 5% log hi hote hai. Agar kuch galat ho jaye toh impact kam hoga."

### Q: "Large table par alter table kaise karte hai?"

**Answer:** "Bade table par hum directly alter table nahi karte. Hum naya table banate hai, data copy karte hai, phir rename karte hai. Isme koi lock nahi hota. GitHub aur Instagram bhi yahi tareeka use karte hai."

### Q: "Migration se pehle kya check karte ho?"

**Answer:** "Migration se pehle hum staging par poora test karte hai. Rollback script ready rakhte hai. Monitoring open rakhte hai. Sab log ko inform kar dete hai ki migration chala rahe hai."

---

## ✅ **Key Takeaways**

1.  Kabhi bhi production mein bina default ke NOT NULL column mat add karo
2.  Har migration ko multi step mein karo zero downtime ke liye
3.  Backfill hamesha batch mein karo slow speed se
4.  Hamesha lowest traffic time par migration chalao
5.  Rollback script hamesha ready rakho
6.  Kabhi bhi ek baar mein ek se zyada change mat karo
7.  NULL ko mat use karo actual value ke roop mein
8.  Har migration ke baad 1 ghanta monitor karo

> **Final Tip:** Interview mein hamesha ye line bol dena: "Production database ek running train hai. Tum chalte hue wheel badal rahe ho. Train ko kabhi bhi nahi rok sakte."