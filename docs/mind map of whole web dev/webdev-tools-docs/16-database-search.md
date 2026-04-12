# 16 — Search: Algolia, Typesense, Elasticsearch, MeiliSearch

> Umbrella: Database → Search
> Kaam: Fast full-text search — "Nike shoes size 10" → Relevant results instantly

---

## Normal Database Search Ki Problem

```sql
-- PostgreSQL mein:
SELECT * FROM products WHERE name LIKE '%nike shoes%'
-- Slow on large data, no relevance ranking, no typo tolerance
```

Search engines:
- Typo tolerance ("nkie shoes" → "nike shoes")
- Relevance ranking
- Faceted search (filter by brand, price, size simultaneously)
- Fast — milliseconds

---

### Algolia
**Tag: 🟢 Most Popular Managed Search | Best DX | Expensive**

```
Kya hai: Managed search — fast, feature-rich, easy setup
Kab use karo:
  → E-commerce search (most common use case)
  → Infra manage nahi karna
  → Instant search results chahiye

Real app example:
  → Nykaa: Product search with facets (brand, price, rating)
  → Myntra: Fashion search
  → Zomato: Restaurant + dish search

Code feel:
  const { hits } = await algolia.search('nike shoes', {
    filters: 'category:footwear AND price < 5000',
    hitsPerPage: 12
  })

Cons: Expensive at scale — per search pay karo
India mein: E-commerce mein standard
```

---

### Typesense
**Tag: 🟢 Open-source Algolia | Self-host | Growing**

```
Kya hai: Algolia jaisa — lekin open-source, self-host
Kab use karo:
  → Algolia ka bill bahut aa raha hai
  → Self-host kar sakte ho

Algolia se fark: Open-source, cheaper, slightly less features
```

---

### Elasticsearch
**Tag: 🟡 Powerful | Complex | Enterprise**

```
Kya hai: Most powerful search engine — logs, analytics, search
Kab use karo:
  → Complex search requirements
  → Log analytics (ELK stack)
  → Large scale, dedicated team

Complex setup — small teams ke liye Algolia ya Typesense better
India mein: Large enterprises, log analytics
```

---

### MeiliSearch
**Tag: 🟢 Easy Self-host | Growing**

```
Kya hai: Simple, fast self-hosted search
Kab use karo:
  → Typesense jaisa — easy self-host
  → Internal tools, docs search
```

---

### PostgreSQL Full-Text Search
**Tag: 🟢 Already have it | Good enough for many cases**

```
Kab use karo:
  → Already PostgreSQL use kar rahe ho
  → Search requirements basic hain
  → Extra infra nahi chahiye

ShopKaro V1: PostgreSQL full-text search kaafi hai
ShopKaro V2 (zyada products): Algolia ya Typesense

Code feel:
  -- PostgreSQL
  SELECT * FROM products
  WHERE to_tsvector('english', name || ' ' || description)
    @@ plainto_tsquery('nike shoes')
```

---

## Agla Doc

`17-auth-libraries.md` — Auth Libraries — NextAuth, Clerk, Lucia, Auth0, Better Auth.