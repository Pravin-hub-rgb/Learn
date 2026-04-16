# 🚀 Project 3 — TalkSpace: Real-time Team Chat
### Slack ka Chhota Bhai — Rooms, Messages, Online Status

---

## 💬 The Brief — Client Ne Kya Kaha

> *"Ek simple chat app chahiye — teams ke liye. Alag alag rooms/channels honge.
> Messages real-time dikhne chahiye — WhatsApp jaisi feel. Online/offline status bhi.
> File sharing baad mein add karenge. Abhi sirf text messaging."*

Okay. Ye pehle do projects se fundamentally different hai. Yahan **real-time** ka element hai — jo architecture ko completely change karta hai. HTTP request-response model yahan kaam nahi karta. Persistent connection chahiye.

---

## 📋 Step 1 — PRD Lite

```
PROJECT NAME  : TalkSpace
TYPE          : Real-time Web Application
ONE LINE      : "Ye ek real-time team chat app hai jisme channels
                 aur direct messages hain."

TARGET USER:
  Primary   → Small to mid-size teams (5-50 people)
              Technical ya semi-technical users
  Use case  → Internal team communication

CORE FEATURES (MVP):
  [ ] Auth (login/signup)
  [ ] Create / join rooms (channels)
  [ ] Send & receive messages in real-time
  [ ] Online / offline / away status
  [ ] Message history (last 50 messages on load)
  [ ] Direct Messages (1-on-1)

STRETCH (V2):
  [ ] File/image sharing
  [ ] Message reactions (emoji)
  [ ] Read receipts
  [ ] Push notifications
  [ ] Search messages

OUT OF SCOPE:
  ❌ Voice / video calls
  ❌ End-to-end encryption (basic auth security enough for V1)
  ❌ Mobile app
  ❌ Bots / integrations
```

---

## 🏗️ Step 2 — Architecture Decisions

Yahan sabse pehle **real-time** question solve karna hai — baaki sab uspe depend karta hai.

---

**Real-time Solution → Socket.io ✅**

```
Problem: HTTP request-response ek baar kaam karta hai.
Chat mein server ko CLIENT ko push karna hota hai bina request ke.

Options evaluate kiye:

Option A: Polling (React Query refetchInterval)
→ Har 2 seconds mein server se pucho "koi naya message?"
→ Pros: Simple setup, HTTP hi use hota hai
→ Cons: Delay hai (2 sec), server pe unnecessary load,
        "real-time feel" nahi aata
→ Verdict: Task manager mein theek tha, chat ke liye nahi

Option B: Server-Sent Events (SSE)
→ Server ek baar connection open karta hai, continuously push karta hai
→ Pros: One-directional real-time, simple
→ Cons: Sirf server → client direction, client → server ke liye
        separate HTTP request chahiye. Chat mein dono direction chahiye.
→ Verdict: Notifications ke liye perfect, chat ke liye half-solution

Option C: WebSockets (native)
→ Bidirectional persistent connection
→ Pros: True real-time, full duplex
→ Cons: Manual reconnection logic, room management, scaling complex

Option D: Socket.io ✅ (WebSocket wrapper)
→ WebSocket pe built, with fallbacks
→ Automatic reconnection built-in
→ Room/channel concept built-in (socket.join('room-id'))
→ Broadcast to specific rooms easy hai
→ Scaling: Redis adapter se multiple servers pe scale kar sakte hain

Decision: Socket.io — real-time chat ke liye industry standard hai.
```

---

**Database → MongoDB ✅ (PostgreSQL nahi)**

```
Ye important decision hai — pehle do projects mein PostgreSQL tha.

Kyun MongoDB yahan?
→ Messages ka structure fluid hai:
  Basic message: { text, sender, room, timestamp }
  Kal file attach karna ho: { text, sender, room, timestamp, file: { url, type, size } }
  Kal reactions add karne ho: { ..., reactions: [{ emoji, users: [] }] }

→ MongoDB mein ye schema changes migration-free hain
→ PostgreSQL mein har change ke liye ALTER TABLE + migration

→ Messages DOCUMENT format mein naturally fit hote hain
→ Queries mostly: "Ek room ke last 50 messages" — simple, document-based

→ Volume bhi zyada hoga messages ka — NoSQL horizontally scale karta hai easily

Kyun Redis bhi?
→ Redis = Online status store karne ke liye PERFECT
→ "User X online hai" — ye temporary data hai
→ Database mein permanently save karna wasteful hai
→ Redis ka TTL (time-to-live) feature: user ka socket disconnect hone pe
   automatically status expire ho jaata hai
→ Redis Pub/Sub: Multiple server instances ke beech messages broadcast karna
   (Socket.io Redis adapter use karta hai)
```

---

**Rendering → CSR (Almost Entirely)**

```
Kyun CSR?
→ Chat app SEO ke liye nahi hai — yahan index nahi karna
→ Highly interactive — real-time updates, typing indicators, online status
→ Dashboard-like interface — user logged in hona zaroori hai

SSR yahan mismatch kyun?
→ Chat room content user-specific hai — public nahi
→ Real-time updates SSR se handle nahi hote (page reload nahi ho sakta)
→ Socket.io client-side browser mein run karta hai

Next.js still use karunga kyunki:
→ Auth handling easy hai
→ API routes Socket.io server ke liye (ya separate Express server)
→ Deployment Vercel pe (par Socket.io ke liye Railway better hai)
```

---

**Hosting → Railway ✅ (Vercel nahi)**

```
Ye important point hai — mostly Vercel use karte hain.
Par Socket.io yahan kaam nahi karega Vercel pe. Kyun?

Vercel = Serverless functions
→ Har request ek alag function call hai
→ Persistent connections possible nahi hain serverless mein
→ WebSocket connection = persistent connection chahiye
→ Socket.io Vercel pe work nahi karta properly

Railway = Traditional server (always-on)
→ Node.js server continuously run karta rehta hai
→ WebSocket connections persist kar sakte hain
→ Redis bhi Railway pe host kar sakte hain
→ Easy deployment, reasonable pricing
```

---

**Auth → NextAuth (JWT strategy)**

```
JWT strategy kyun (session nahi)?
→ Socket.io connection pe bhi auth verify karna hoga
→ JWT token socket handshake mein pass kar sakte hain
→ Session-based auth socket ke saath complex ho jaata hai

Flow:
→ User login karta hai → JWT token milta hai
→ Browser mein httpOnly cookie mein store
→ Socket.io connection pe cookie se token read hoga
→ Server verify karega → connection allow
```

---

**State Management → Zustand ✅**

```
Chat app mein complex client state hai:
→ Active room/channel
→ Online users list
→ Draft messages (type kar rahe hain, send nahi kiya)
→ Unread message counts per room

React Query yahan less relevant kyunki:
→ Messages real-time socket se aate hain, HTTP fetch se nahi
→ Socket events directly Zustand store update karenge

Architecture:
Socket.io event → Zustand store update → React re-render
```

---

## 🗄️ Step 3 — Data Model

```
MongoDB Collections:

USER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_id         ObjectId
name        String
email       String    unique, indexed
password    String    hashed
avatar_url  String    nullable
created_at  Date

ROOM (Channel)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_id         ObjectId
name        String
description String    nullable
type        String    'public' | 'private' | 'direct'
members     [ObjectId]  ← Array of User IDs
created_by  ObjectId   FK → User
created_at  Date

INDEX: members (user ke rooms dhundhne ke liye)

MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_id         ObjectId
room_id     ObjectId  indexed  ← FK → Room
sender_id   ObjectId  indexed  ← FK → User
text        String
type        String    'text' | 'system'  ← system = "X joined the room"
created_at  Date      indexed

INDEX: { room_id: 1, created_at: -1 }  ← Room ke latest messages fast fetch

Redis Keys:

online_status:{userId}   → "online" | "away"   TTL: 5 minutes
                           (heartbeat se refresh hota rehta hai)
typing:{roomId}          → Set of userIds who are currently typing
room_members:{roomId}    → Cached member list
```

---

## 📋 Step 4 — Feature Breakdown

```
PHASE 1 — MVP:

  Auth
  ├── [ ] Signup / Login
  ├── [ ] JWT-based auth
  └── [ ] Socket.io handshake auth middleware

  Real-time Core
  ├── [ ] Socket.io server setup
  ├── [ ] Join room event
  ├── [ ] Send message event
  ├── [ ] Receive message event (broadcast to room)
  └── [ ] Disconnect handler (status update)

  Rooms
  ├── [ ] Create room
  ├── [ ] List public rooms
  ├── [ ] Join room
  └── [ ] Room member list

  Messages
  ├── [ ] Send message
  ├── [ ] Real-time delivery
  ├── [ ] Message history (last 50 on load)
  └── [ ] Auto-scroll to latest

  Online Status
  ├── [ ] Set online on connect (Redis)
  ├── [ ] Set offline on disconnect
  ├── [ ] Show online indicator in member list
  └── [ ] Heartbeat (every 4 min refresh TTL)

  Edge Cases
  ├── [ ] Reconnection handling
  ├── [ ] Empty room state
  └── [ ] Message sending failed (network error)

PHASE 2:
  [ ] Typing indicators (X is typing...)
  [ ] Direct Messages (1-on-1)
  [ ] Unread message count badges
  [ ] File/image sharing (Uploadthing)
```

---

## 🎙️ Interview Script — STAR Format

```
SITUATION:
"Maine TalkSpace banaya — ye ek real-time team chat application hai.
Problem ye thi ki teams ko ek simple, fast internal communication tool chahiye tha
jo WhatsApp jaisi real-time feel de, bina WhatsApp ke mixing personal/professional messages."

TASK:
"Core challenge technical tha — real-time bidirectional communication implement karna.
Standard HTTP request-response model yahan kaam nahi karta."

ACTION:
"Teen major technical decisions the —

Pehla: Real-time ke liye Socket.io choose kiya.
Maine pehle polling evaluate kiya — React Query ke refetchInterval se.
Task manager mein ye theek tha, par chat ke liye 2-second delay aur server load acceptable nahi tha.
SSE evaluate kiya — par wo sirf server-to-client direction hai, chat mein dono direction chahiye.
Socket.io choose kiya — WebSocket wrapper with automatic reconnection,
built-in room management, aur Redis adapter se future scaling possible hai.

Doosra: Database ke liye MongoDB choose kiya — pehle projects mein PostgreSQL use kiya tha.
Message schema future mein change hoga — reactions, files, replies.
MongoDB ka flexible schema yahan better fit tha.
Redis bhi use kiya online status ke liye —
user ka status temporary hai, database mein permanently store karna wasteful hota.
Redis ka TTL feature perfect tha — disconnect pe automatically expire.

Teesra: Hosting Railway pe ki, Vercel pe nahi.
Ye important tha — Socket.io persistent connections maangta hai.
Vercel serverless hai — persistent connections support nahi karta.
Railway traditional Node.js server run karta hai — WebSocket ke liye correct choice."

RESULT:
"App mein real-time messaging tha, room management tha, online/offline status tha.
Sub-100ms message delivery latency tha local testing mein.
Learning: Socket.io aur Next.js ka integration thoda tricky tha —
Socket.io server alag Express server pe run karna pada,
Next.js sirf frontend aur API routes ke liye use kiya.
Ye separation pehle plan karta toh time bachta."
```

---

**Next →** `project-04-ecommerce.md` — ShopKaro: E-Commerce Store
