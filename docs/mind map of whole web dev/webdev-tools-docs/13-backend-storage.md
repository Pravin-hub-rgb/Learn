# 13 — File Storage: Cloudinary, S3, Uploadthing, Supabase Storage

> Umbrella: Backend → File Upload / Storage
> Kaam: Images, documents, videos store karna — database mein nahi, dedicated storage mein
> Example: ShopKaro product images, Swiggy restaurant photos

---

## Database Mein Image Kyun Nahi Store Karte

```
Database: Structured data ke liye — text, numbers, relationships
File storage: Binary files ke liye — images, PDFs, videos

Database mein image store karo:
  → Database slow ho jaata hai
  → Backup complex
  → CDN serve nahi kar sakta

File storage mein:
  → Database mein sirf URL store karo: "https://cdn.shopkaro.com/products/shoes.jpg"
  → File storage pe actual file
  → CDN se fast serve
```

---

## Tools

---

### Cloudinary
**Tag: 🟢 Images + Video | Transform | Most Popular for media**

```
Kya hai: Media management platform — store + transform + deliver
Kab use karo:
  → Image/video heavy app
  → On-the-fly image transformation chahiye
  → E-commerce product images

Special — On-the-fly transforms:
  URL se hi image resize, crop, format change:
  Original: https://res.cloudinary.com/demo/image/upload/shoes.jpg
  Resized:  https://res.cloudinary.com/demo/image/upload/w_300,h_300,c_fill/shoes.jpg
  WebP:     https://res.cloudinary.com/demo/image/upload/f_auto/shoes.jpg

Real app example:
  → Swiggy: Restaurant photos — different sizes for listing vs detail page
  → Zomato: Food photos — thumbnail, full size from same image
  → ShopKaro: Product images — main image, thumbnail, zoom

Code feel (upload):
  import { v2 as cloudinary } from 'cloudinary'

  const result = await cloudinary.uploader.upload(file, {
    folder: 'products',
    transformation: [{ width: 800, height: 800, crop: 'fill' }]
  })
  // result.secure_url → Database mein store karo

Free tier: 25GB storage, 25GB bandwidth/month — kaafi for starting

Cons:
  → Vendor lock-in
  → Large scale pe expensive

India mein: E-commerce, food delivery, media apps mein popular
```

---

### AWS S3
**Tag: 🟢 Enterprise Standard | Cheapest at Scale**

```
Kya hai: Amazon ka object storage — industry standard
Kab use karo:
  → AWS ecosystem already use kar rahe ho
  → Very high scale
  → Any file type — images, PDFs, videos, backups, code

S3 + CloudFront (CDN):
  → S3: Store karo (cheap)
  → CloudFront: Globally fast serve karo
  → Yeh combo enterprise standard hai

Real app example:
  → Flipkart, Amazon India: Product images (S3 + CloudFront)
  → Zomato, Swiggy at scale
  → IRCTC: Ticket PDFs

Code feel:
  import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

  await s3.send(new PutObjectCommand({
    Bucket: 'shopkaro-images',
    Key: `products/${filename}`,
    Body: fileBuffer,
    ContentType: 'image/jpeg'
  }))
  // URL: https://shopkaro-images.s3.amazonaws.com/products/shoes.jpg

Cons:
  → Setup complex — IAM roles, policies, CORS sab manually
  → No built-in image transformation (CloudFront + Lambda@Edge chahiye)

India mein: Large companies jo AWS pe hain
```

---

### Uploadthing
**Tag: 🟢 Next.js friendly | Simple | Growing**

```
Kya hai: File upload service — specifically Next.js ke liye simple
Kab use karo:
  → Next.js project
  → S3 setup complexity nahi chahiye
  → Simple file upload chahiye quickly

Code feel:
  // Route handler
  const ourFileRouter = {
    productImage: f({ image: { maxFileSize: "4MB" } })
      .onUploadComplete(async ({ file }) => {
        await prisma.product.update({
          data: { imageUrl: file.url }
        })
      })
  }

  // Frontend — drag and drop ready
  <UploadButton endpoint="productImage" />

Cloudinary se fark:
  → Uploadthing: Simple upload, no transformations
  → Cloudinary: Upload + transform + optimize

Free tier: 2GB storage — chhote projects ke liye kaafi

India mein: Growing — Next.js community mein popular
```

---

### Supabase Storage
**Tag: 🟢 Supabase users | Simple**

```
Kya hai: Supabase ka file storage — S3 compatible
Kab use karo:
  → Already Supabase use kar rahe ho (database, auth)
  → Sab ek platform pe rakhna hai

Supabase = PostgreSQL + Auth + Storage + Realtime — sab ek mein
Agar Supabase use karte ho → Storage bhi wahan raho

Free tier: 1GB storage
```

---

### Cloudflare R2
**Tag: 🟢 S3 Alternative | No egress fees | Cheap**

```
Kya hai: S3 jaisa storage — lekin egress fees nahi (data download free)
Kab use karo:
  → S3 ka bada bill aa raha hai egress se
  → Cloudflare ecosystem
  → Cost optimize karna hai

S3 se fark:
  → R2: Zero egress fees — data download karo, pay nahi karo
  → S3: Egress fees — data download pe pay karo (expensive at scale)
  → R2: S3-compatible API — same code kaam karta hai

Real app example:
  → High-traffic sites jo images serve karte hain
  → Video streaming platforms

India mein: Growing — especially cost-conscious startups
```

---

## Quick Decision

```
Image-heavy app, transformation chahiye?
  → Cloudinary

Next.js, simple upload quickly?
  → Uploadthing

Enterprise, AWS ecosystem?
  → S3 + CloudFront

Already Supabase use kar rahe ho?
  → Supabase Storage

Cost optimize karna hai, S3 se migrate?
  → Cloudflare R2
```

---

## ShopKaro Mein

```
V1: Uploadthing ya Cloudinary (simpler setup)
V2 (more users): Cloudinary (image optimization important)
Enterprise: S3 + CloudFront
```

---

## Agla Doc

`14-database-sql.md` — SQL Databases — PostgreSQL, MySQL, SQLite, Neon, Supabase — kaunsa database kab, hosted vs managed, India mein kya popular hai.
