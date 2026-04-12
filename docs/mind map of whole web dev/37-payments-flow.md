# 37 — Payment Flow: Razorpay ShopKaro Mein

> Pichle doc mein payment umbrella overview hua.
> Ab **Razorpay integration** — step by step.

---

## Poora Payment Flow

```
1. Priya "Place Order" dabati hai

2. ShopKaro Backend → Razorpay ko batata hai:
   "₹2999 ka payment create karo"
   Razorpay → "Okay, yeh lo order_id: rzp_order_abc123"

3. ShopKaro Frontend → Razorpay checkout open karta hai
   (Razorpay ka apna UI — card/UPI/netbanking)

4. Priya pay karti hai Razorpay ke UI mein

5. Razorpay → ShopKaro Frontend ko batata hai:
   "Payment hua — payment_id: pay_xyz789"

6. ShopKaro Frontend → ShopKaro Backend ko bhejta hai:
   { orderId, paymentId, signature }

7. ShopKaro Backend → Verify karta hai signature
   (Confirm karo yeh genuinely Razorpay se aaya, fake nahi)

8. Verified → Order status "PAID" → Done
```

---

## Step 2 — Backend: Razorpay Order Banao

```javascript
// /app/api/orders/route.js
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(req) {
  const session = await getSession()
  if (!session) return Response.json({ error: "Login karo" }, { status: 401 })

  // Cart items lo
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.userId },
    include: { product: true }
  })

  // Total calculate karo
  const total = cartItems.reduce((sum, item) =>
    sum + (item.product.price * item.quantity), 0
  )

  // Razorpay order banao
  const razorpayOrder = await razorpay.orders.create({
    amount: total * 100,  // Razorpay paise mein chahiye (100 = ₹1)
    currency: 'INR',
    receipt: `order_${Date.now()}`
  })

  // DB mein order save karo (status: PENDING)
  const order = await prisma.order.create({
    data: {
      userId: session.userId,
      total,
      status: 'PENDING',
      paymentId: razorpayOrder.id,
      address: "...",  // req.body se lena
    }
  })

  return Response.json({
    orderId: order.id,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: 'INR',
    keyId: process.env.RAZORPAY_KEY_ID  // Frontend ko chahiye
  })
}
```

---

## Step 3-5 — Frontend: Razorpay Checkout

```jsx
// /components/CheckoutButton.jsx
'use client'

import Script from 'next/script'

export default function CheckoutButton() {
  async function handlePayment() {
    // Backend se order banao
    const { razorpayOrderId, amount, keyId, orderId } =
      await fetch('/api/orders', { method: 'POST', ... }).then(r => r.json())

    // Razorpay checkout open karo
    const options = {
      key: keyId,
      amount,
      currency: 'INR',
      order_id: razorpayOrderId,
      name: 'ShopKaro',
      description: 'Order Payment',

      handler: async function(response) {
        // Payment ho gayi — verify karo backend se
        await fetch('/api/payments/verify', {
          method: 'POST',
          body: JSON.stringify({
            orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          })
        })

        // Order confirmation page pe jaao
        window.location.href = `/orders/${orderId}`
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button onClick={handlePayment}>Pay Now</button>
    </>
  )
}
```

---

## Step 7 — Backend: Verify Karo

```javascript
// /app/api/payments/verify/route.js
import crypto from 'crypto'

export async function POST(req) {
  const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
    await req.json()

  // Signature verify karo
  const body = razorpayOrderId + "|" + razorpayPaymentId
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex')

  if (expectedSignature !== razorpaySignature) {
    return Response.json({ error: "Invalid payment" }, { status: 400 })
  }

  // Verified! Order update karo
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'PAID',
      paymentId: razorpayPaymentId
    }
  })

  // Cart clear karo
  await prisma.cartItem.deleteMany({
    where: { userId: session.userId }
  })

  return Response.json({ message: "Payment successful!" })
}
```

---

## Agla Doc

`38-payments-webhooks.md` — **Webhooks** — agar Priya ne pay kiya lekin browser band ho gaya verify hone se pehle? Webhook backup ke taur pe kaam karta hai. Zaroori concept.
