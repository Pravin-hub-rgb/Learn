# 25 — GraphQL: REST Ka Alternative

> Pichle doc mein REST dekha — ShopKaro mein yahi use karenge.
> Ab **GraphQL** — concept jaanna zaroori hai, kaafi jagah milega.

---

## GraphQL Kya Solve Karta Hai

REST mein ek problem thi — over-fetching aur under-fetching.

GraphQL mein **frontend decide karta hai** ki exactly kya chahiye:

```graphql
# REST mein: GET /api/products/123
# Poora product milta hai — chahe chahiye na chahiye

# GraphQL mein: Sirf jo chahiye woh maango
query {
  product(id: 123) {
    name
    price
  }
}

# Response — sirf yeh, kuch extra nahi:
{
  "data": {
    "product": {
      "name": "Nike Shoes",
      "price": 2999
    }
  }
}
```

---

## REST vs GraphQL — Quick Comparison

| | REST | GraphQL |
|--|------|---------|
| Endpoints | Kai alag endpoints | Ek endpoint (`/api/graphql`) |
| Data control | Server decide karta hai | Client decide karta hai |
| Over-fetching | Haan | Nahi |
| Learning curve | Low | High |
| Caching | Easy (HTTP cache) | Complex |
| Best for | Simple CRUD apps | Complex, data-heavy apps |

---

## GraphQL Ek Request Mein Kai Cheezein

```graphql
# Ek request mein: User + unke orders + har order ke products
query {
  user(id: 1) {
    name
    email
    orders {
      id
      status
      items {
        product {
          name
          price
        }
        quantity
      }
    }
  }
}
```

REST mein yeh 3 alag requests hoti:
1. `GET /api/users/1`
2. `GET /api/orders?userId=1`
3. `GET /api/orders/1/items`

---

## ShopKaro Mein GraphQL Use Karein?

**Nahi — ShopKaro v1 mein REST kaafi hai.**

GraphQL useful hai jab:
- Bahut complex data relationships hain
- Multiple clients (web, mobile) alag alag data maangte hain
- Team badi hai, frontend/backend alag work karte hain

ShopKaro ke liye:
- Simple CRUD operations hain
- Ek hi client (web app)
- Sikhna maksad hai — REST pehle master karo

GraphQL ka **concept** jaanna zaroori tha — kyunki job interviews mein poochha jaata hai aur doosre projects mein milega.

---

## Agla Doc

`26-api-shopkaro.md` — ShopKaro ke **saare endpoints ek jagah** — complete reference. Har endpoint ka method, URL, request body, aur response.
