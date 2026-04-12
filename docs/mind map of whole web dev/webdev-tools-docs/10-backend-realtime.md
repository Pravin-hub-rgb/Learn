j# 10 — Real-time: Socket.io, Pusher, SSE, Ably

> Umbrella: Backend → Real-time
> Kaam: Server → Client ko instantly update karna — bina page refresh
> Example: Swiggy ka "Order picked up", Ola ka driver location

---

## Real-time Kyun Alag Hai

Normal HTTP:
```
Client → Request → Server → Response → Done
(Client ne maanga tabhi server ne diya)
```

Real-time:
```
Server → Client ko khud data bhejta hai jab kuch change ho
(Client ne nahi maanga — server ne push kiya)
```

---

## Teen Approaches

```
1. WebSocket:   Two-way — client aur server dono bhej sakte hain
2. SSE:         One-way — sirf server → client
3. Polling:     Client baar baar poochhe (fake real-time)
```

---

## Tools

---

### Socket.io
**Tag: 🟢 Most Popular WebSocket | Battle-tested**

```
Kya hai: WebSocket library — client aur server dono ke liye
Kab use karo:
  → Two-way communication chahiye
  → Chat apps
  → Multiplayer games
  → Collaborative tools (Google Docs jaisa)
  → Ola/Uber driver tracking (location update dono taraf)

Real app example:
  → Ola: Driver location update → User dekhe
  → Chat apps (WhatsApp Web type)
  → Collaborative editors
  → Live auction sites (BidBazaar type)

Code feel:
  // Server
  io.on('connection', (socket) => {
    socket.on('driver-location', (location) => {
      io.to(rideId).emit('location-update', location)
    })
  })

  // Client
  socket.emit('driver-location', { lat: 28.6, lng: 77.2 })
  socket.on('location-update', (location) => updateMap(location))

Fallback:
  → WebSocket nahi chala → Socket.io automatically polling pe switch karta hai
  → Isliye reliable hai

Cons:
  → Serverless pe nahi chalta (Vercel) — dedicated server chahiye
  → Scaling complex (multiple servers → Redis adapter chahiye)

India mein: Chat, logistics, ride-sharing apps mein standard
```

---

### Pusher
**Tag: 🟢 Managed | Easy | Serverless-friendly**

```
Kya hai: Managed WebSocket service — khud server nahi chalana
Kab use karo:
  → Vercel pe deploy kar rahe ho (serverless)
  → Socket.io ka infrastructure manage nahi karna
  → Quick real-time feature add karna ho

Socket.io se fark:
  → Socket.io: Self-hosted — tumhara server
  → Pusher: Managed service — Pusher ka server
  → Pusher: Serverless-friendly, pay per connection
  → Socket.io: Free, but infra manage karo

Real app example:
  → Notification systems
  → Live activity feeds
  → Collaboration features in SaaS apps

Code feel:
  // Server
  await pusher.trigger('order-updates', 'status-change', {
    orderId: 123, status: 'picked-up'
  })

  // Client
  const channel = pusher.subscribe('order-updates')
  channel.bind('status-change', (data) => updateUI(data))

Cons:
  → Paid service — free tier limited (100 connections)
  → Vendor lock-in

India mein: Startups jo Vercel + Pusher use karte hain
```

---

### SSE (Server-Sent Events)
**Tag: 🟢 Built-in | One-way | Simple**

```
Kya hai: Browser ka built-in one-way streaming — server → client only
Kab use karo:
  → Sirf server → client updates chahiye (client server ko nahi bhejega)
  → Live notifications
  → Progress updates (file upload, long processing)
  → AI streaming responses (ChatGPT jaisa)

Socket.io se fark:
  → SSE: One-way only, HTTP pe chalta, simpler
  → Socket.io: Two-way, WebSocket protocol, complex

Real app example:
  → ChatGPT ka streaming response (text word by word aata hai) — SSE
  → Order status updates (server push karta hai)
  → Live sports scores

Next.js mein:
  // API route — SSE response
  export async function GET() {
    const stream = new ReadableStream({
      start(controller) {
        const send = (data) => {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
        }
        // Send updates
        send({ status: 'processing' })
        setTimeout(() => send({ status: 'done' }), 2000)
      }
    })
    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream' }
    })
  }

Pros:
  → No extra library
  → HTTP pe chalta — Vercel pe bhi
  → Auto-reconnect built-in browser mein

Kab mat use karo:
  → Client bhi server ko data bhejega → WebSocket chahiye
```

---

### Ably
**Tag: 🟢 Enterprise Real-time | Managed | Global**

```
Kya hai: Enterprise-grade managed real-time — Pusher ka competitor
Kab use karo:
  → High scale real-time chahiye
  → Global presence chahiye (low latency worldwide)
  → Enterprise SLA chahiye

Pusher se fark:
  → Ably: More features, better scaling, zyada expensive
  → Pusher: Simpler, cheaper, good for startups

Real app example:
  → Trading platforms (real-time price updates)
  → Large-scale notification systems

India mein: Enterprise / fintech companies mein
```

---

### Partykit
**Tag: 🔵 New | Cloudflare-based | Collaborative apps**

```
Kya hai: Cloudflare Durable Objects pe built — collaborative real-time
Kab use karo:
  → Figma jaisa collaborative tool banana hai
  → Edge pe real-time chahiye

Status: New — interesting but niche
```

---

## Quick Decision

```
Two-way communication (chat, games, collaborative)?
  → Socket.io (self-hosted) ya Ably (managed)

Serverless (Vercel), one-way updates?
  → SSE (free) ya Pusher (easy managed)

Quick real-time feature, no infra?
  → Pusher

AI streaming responses?
  → SSE

Enterprise, high scale?
  → Ably
```

---

## India Mein Reality

```
Ride-sharing / Logistics:  Socket.io (two-way location)
Notification systems:      Pusher ya SSE
Chat apps:                 Socket.io
AI features:               SSE (streaming)
Enterprise:                Ably
```

---

## Agla Doc

`11-backend-email.md` — Email tools — Resend, Nodemailer, SendGrid — Swiggy ka order confirmation email, OTP email kaise bhejte hain.
