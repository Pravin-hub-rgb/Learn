# 36 — Payments: Umbrella Kya Hai

> Caching complete hua.
> Ab aathwa umbrella — **Payments**.
> E-commerce ka core — Priya pay karti hai, yeh exactly kaise hota hai?

---

## Payments Khud Handle Karna Dangerous Hai

Kisi ka credit card number tumhare server se guzre → Tum zimmedaar ho uski security ke liye. Yeh **PCI DSS compliance** hai — bahut strict rules.

Isliye koi bhi khud payment handle nahi karta. **Payment Gateway** use karte hain — Razorpay, Stripe, Paytm — jo sab handle karte hain.

---

## Payment Gateway Kya Karta Hai

```
Tumhara app ← → Razorpay ← → Bank
```

Tumhara app sirf Razorpay ko batata hai — "Is user se itne paise lo." Razorpay baaki sab handle karta hai — card details, bank communication, security.

Tumhare server pe kabhi card number nahi aata.

---

## Payments Umbrella Ke Andar Kya Kya

```
PAYMENTS
│
├── Payment Flow (Razorpay kaise integrate karein)  → Doc 37
└── Webhooks (Payment confirmation kaise milti hai) → Doc 38
```

---

## Razorpay vs Stripe — ShopKaro Ke Liye

| | Razorpay | Stripe |
|--|----------|--------|
| India ke liye | ✓ Best | Works, lekin complex |
| UPI support | ✓ | ✗ |
| INR | ✓ Native | ✓ |
| International | Limited | ✓ Best |
| Documentation | Hindi/English | English |

**ShopKaro (India) → Razorpay.**

---

## Agla Doc

`37-payments-flow.md` — Poora payment flow step by step — Razorpay ke saath ShopKaro mein integration kaise hogi.
