    # 11 — Email: Resend, Nodemailer, SendGrid, Postmark

> Umbrella: Backend → Email
> Kaam: Transactional emails bhejhna — OTP, order confirmation, password reset
> Note: Marketing emails (newsletter) alag category hai — yahan transactional emails

---

## Seedha Gmail Se Kyun Nahi Bhejte

```
Gmail se seedha:
  → Spam mein jaayega
  → Rate limits hain (500/day)
  → Deliverability poor

Professional email service:
  → Inbox mein aayega
  → High deliverability
  → Analytics, tracking
  → Unsubscribe handling
```

---

## Do Types — Transactional vs Marketing

```
TRANSACTIONAL: User action pe trigger
  → OTP, password reset, order confirmation, invoice
  → Yeh docs isi ke baare mein hain

MARKETING: Company ki taraf se bulk
  → Newsletter, offers, announcements
  → Tools: Mailchimp, SendGrid Marketing, Klaviyo
```

---

## Tools

---

### Resend
**Tag: 🟢 Most Popular 2024 | Developer-first | Recommended**

```
Kya hai: Modern email API — developers ke liye, React Email ke saath perfect
Kab use karo:
  → Naya project — almost always
  → Next.js / React project
  → React se email templates banana ho

Special feature — React Email:
  → Email templates React components se banta hain
  → JSX mein email likhna — HTML email nahi

Real app example:
  → Vercel ki notification emails (Resend use karte hain)
  → Naye Indian startups
  → ShopKaro ka password reset, order confirmation

Code feel:
  import { Resend } from 'resend'
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'ShopKaro <orders@shopkaro.com>',
    to: user.email,
    subject: 'Order Confirmed!',
    react: <OrderConfirmationEmail order={order} />  // React component!
  })

React Email template:
  export function OrderConfirmationEmail({ order }) {
    return (
      <Html>
        <Body>
          <Heading>Order #{order.id} Confirmed!</Heading>
          <Text>Your order total: ₹{order.total}</Text>
        </Body>
      </Html>
    )
  }

Free tier: 3000 emails/month — kaafi hai starting ke liye
Cons: Newer service — less track record than SendGrid

India mein: 2023 ke baad rapidly adopted
```

---

### Nodemailer
**Tag: 🟡 Classic | Self-configured | Free**

```
Kya hai: Node.js library — Gmail, SMTP, any mail server se email bhejo
Kab use karo:
  → Free solution chahiye
  → Apna SMTP server hai
  → Chhota project, emails bahut kam

Gmail ke saath:
  → Free lekin limits hain
  → App Password setup karna padta hai
  → Production mein reliable nahi (spam, limits)

Code feel:
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL, pass: process.env.APP_PASSWORD }
  })

  await transporter.sendMail({
    from: 'ShopKaro <noreply@gmail.com>',
    to: user.email,
    subject: 'Password Reset',
    html: '<p>Click <a href="...">here</a> to reset</p>'
  })

Real app example:
  → Personal projects, learning
  → Internal tools with low email volume

Cons:
  → Production ke liye unreliable (Gmail limits)
  → HTML templates manually likhna
  → No analytics

India mein: Bootcamp projects, personal apps
```

---

### SendGrid
**Tag: 🟢 Enterprise Standard | Twilio owns it**

```
Kya hai: Established email service — both transactional + marketing
Kab use karo:
  → Large scale (lakhs emails/month)
  → Marketing + transactional dono chahiye
  → Enterprise compliance chahiye

Resend se fark:
  → SendGrid: Older, more features, complex setup
  → Resend: Developer-friendly, simpler API, newer

Free tier: 100 emails/day

Real app example:
  → Flipkart, Amazon India type scale
  → Enterprise SaaS

India mein: Established companies mein zyada
```

---

### Postmark
**Tag: 🟢 Transactional Specialist | High Deliverability**

```
Kya hai: Transactional email specialist — only transactional, no marketing
Kab use karo:
  → Highest deliverability chahiye
  → Transactional emails critical hain (bank OTPs, payment receipts)
  → Marketing emails nahi bhejne

Resend se fark:
  → Postmark: Older, more proven deliverability, expensive
  → Resend: Newer, developer-friendly, cheaper

Real app example:
  → Fintech apps (payment confirmations)
  → B2B SaaS (critical notifications)

India mein: Fintech, banking type apps
```

---

### AWS SES (Simple Email Service)
**Tag: 🟢 Cheapest at Scale | AWS ecosystem**

```
Kya hai: AWS ka email service — bahut sasta at scale
Kab use karo:
  → AWS already use kar rahe ho
  → Very high volume (lakhs emails)
  → Cost critical hai

Pricing: $0.10 per 1000 emails — bahut sasta

Cons:
  → Setup complex
  → Sandbox mode se bahar nikalna — AWS approval chahiye
  → Developer experience poor compared to Resend

India mein: Large companies jo AWS pe hain (Zomato, Swiggy type scale)
```

---

## Quick Decision

```
Naya project?
  → Resend (best DX, React Email support)

Free, learning project?
  → Nodemailer + Gmail (limits samajh ke)

Enterprise, high volume?
  → SendGrid ya AWS SES

Fintech, critical emails?
  → Postmark (highest deliverability)

AWS ecosystem pehle se?
  → AWS SES
```

---

## India Mein Reality

```
Startups (2024):          Resend
Learning / personal:      Nodemailer
Enterprise / funded:      SendGrid ya Postmark
AWS shops:                AWS SES
```

---

## Agla Doc

`12-backend-queues.md` — Background Jobs + Queues — BullMQ, Inngest, Trigger.dev — Swiggy ka "order placed" ke baad email bhejhna, invoice generate karna — yeh sab queue mein hota hai.
