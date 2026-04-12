# 38 — Webhooks: Payment Confirmation Ka Backup

> Pichle doc mein Razorpay payment flow dekha.
> Ab **Webhooks** — ek important safety net.

---

## Problem — Agar Browser Band Ho Jaaye?

Priya ne Razorpay pe pay kiya. Payment successful.

Lekin payment ke baad — **internet cut gaya ya browser close ho gaya.**

Frontend ne kabhi `/api/payments/verify` call nahi ki. Order PENDING hi raha.

Priya ka paisa gaya — order confirm nahi hua. Problem!

---

## Solution — Webhook

**Webhook** = Razorpay khud tumhare server ko batata hai jab payment hoti hai.

```
Normal flow (frontend se):
Payment → Frontend → /api/payments/verify → Order PAID

Webhook flow (Razorpay se directly):
Payment → Razorpay → /api/webhooks/razorpay → Order PAID
```

Webhook **backup** hai — agar frontend fail bhi ho, Razorpay directly server ko batayega.

---

## Webhook Kaise Kaam Karta Hai

1. Razorpay Dashboard mein webhook URL set karo: `https://shopkaro.com/api/webhooks/razorpay`
2. Koi bhi payment ho → Razorpay us URL pe POST request bhejta hai automatically
3. Tumhara server receive karta hai, order update karta hai

---

## Webhook Handler — ShopKaro

```javascript
// /app/api/webhooks/razorpay/route.js

import crypto from 'crypto'

export async function POST(req) {
  const body = await req.text()  // Raw body chahiye signature verify ke liye
  const signature = req.headers.get('x-razorpay-signature')

  // Verify karo yeh genuinely Razorpay se aaya
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex')

  if (expectedSignature !== signature) {
    return Response.json({ error: "Invalid webhook" }, { status: 400 })
  }

  const event = JSON.parse(body)

  // Payment success event
  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity
    const razorpayOrderId = payment.order_id

    // Order dhundo aur update karo
    const order = await prisma.order.findFirst({
      where: { paymentId: razorpayOrderId }
    })

    if (order && order.status === 'PENDING') {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'PAID', paymentId: payment.id }
      })
    }
  }

  return Response.json({ received: true })
}
```

---

## Idempotency — Double Update Mat Karo

Webhook aur frontend dono `verify` call karein — order do baar PAID na ho.

```javascript
// Check karo pehle se PAID toh nahi
if (order && order.status === 'PENDING') {  // Sirf PENDING ko update karo
  await prisma.order.update(...)
}
// Agar already PAID hai → Skip karo — no problem
```

Yeh **idempotency** hai — same operation kai baar karo toh same result mile.

---

## Payments Umbrella — Complete Hua

```
PAYMENTS
│
├── Payment Flow (Razorpay) → Doc 37 ✓
└── Webhooks                → Doc 38 ✓ (YEH)
```

---

## Agla Doc

`39-performance-what-is-it.md` — Nawa umbrella — **Performance**. App fast kaise karo — images, lazy loading, pagination. ShopKaro ko smooth banane ke techniques.
