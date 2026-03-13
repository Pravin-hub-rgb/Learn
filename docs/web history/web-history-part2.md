# The Whole Picture of the Web
## Part 2 of 5 — Things Get Wild: Browser Wars & Web 2.0

---

Okay so in Part 1 we saw how the web started as this quiet, academic, "hey let's share documents" kind of thing. By the mid-90s though? The world had caught on. Money started flowing in. Companies started fighting over the web. And the whole thing transformed from a digital library into something far more alive and chaotic.

Buckle up — this era is genuinely dramatic.

---

### 💥 The Web Goes Mainstream (Mid-90s)

By 1994–1995, ordinary people — not just scientists — were getting online. A few things made this happen:

**Cheaper computers** started reaching regular households. **Internet Service Providers (ISPs)** like AOL were mailing floppy disks and later CDs to literally everyone, offering them hours of free internet access. If you grew up in the 90s, you probably remember those AOL disks showing up in cereal boxes.

Suddenly the web wasn't just for researchers. It was for everyone. And where there are millions of people? There's money.

The **dot-com boom** kicked off — companies were racing to get online, investors were throwing money at anything with ".com" in the name, and startups were being valued at billions of dollars before they'd made a single cent of profit. It was absolute madness. (And we'll see how that ended in a second.)

---

### ⚔️ The Browser Wars (1995–2001)

Remember Netscape from Part 1? By 1995 it was the most popular browser in the world. Then Microsoft looked at the web and thought — *we need a piece of this.*

Microsoft built **Internet Explorer** and — here's the key move — they *bundled it with Windows.* Every computer running Windows (which was basically every computer) automatically had Internet Explorer installed. You didn't have to download anything. It was just... there.

This was a massive strategic play. Netscape couldn't compete with "free and pre-installed." Internet Explorer's market share skyrocketed and by the late 90s it had basically crushed Netscape.

But here's where it gets interesting for web developers — during this war, both companies were *racing to add new features to their browsers.* They were trying to outdo each other. And in doing so, they each implemented features *differently.*

A web page might look great in Netscape but totally broken in Internet Explorer, or vice versa. Developers had to write separate code for different browsers. It was a nightmare that actually planted the seeds for why we have **web standards** today — the idea that browsers should all follow the same rules so developers don't lose their minds.

The Browser Wars eventually cooled down when Internet Explorer "won" — but the damage to the web ecosystem took years to heal.

---

### 💀 The Dot-Com Crash (2000–2001)

All that investment money pouring into internet companies? A lot of it was going into businesses with no real revenue model. Companies were spending millions on advertising and infrastructure while making basically nothing.

In 2000, the bubble burst. Stock prices collapsed. Hundreds of companies went bankrupt overnight. Billions of dollars evaporated. It was one of the biggest financial crashes in tech history.

But here's the thing — the *web itself* didn't die. The *bad companies* died. What survived were the businesses with real value: Google (founded 1998), Amazon, and a scrappy little company called PayPal. The crash actually cleaned up the web and left the genuinely useful stuff standing.

And then, from the ashes, something new started to emerge...

---

### 🚀 JavaScript Wakes Up — AJAX Changes Everything

Let's talk about JavaScript for a second because this is crucial for you as a web dev.

**JavaScript** was created in 1995 by a guy named Brendan Eich at Netscape. Famously, he wrote the first version in just *10 days.* It was originally designed to add small bits of interactivity to web pages — like making a button change color when you hover over it.

For years, JavaScript was kind of looked down on. Serious developers didn't take it seriously. It was buggy, inconsistent across browsers, and used mostly for annoying popups.

Then around **2005**, something changed. A technique called **AJAX** (Asynchronous JavaScript and XML) started getting real attention after Google used it in **Google Maps** and **Gmail**.

Here's why AJAX was a big deal: before it, every time you did anything on a web page — clicked a button, submitted a form — the *entire page* had to reload. The browser would send a request to the server, the server would send back a whole new HTML page, and the browser would re-render everything from scratch. Slow and clunky.

AJAX changed that. With AJAX, your page could send a request to the server *in the background*, get just the data it needed, and update only *part* of the page — without a full reload.

When you drag Google Maps and new map tiles load in seamlessly? That's AJAX. When you send a Gmail message and the page doesn't reload? AJAX. Suddenly web pages could *behave* more like desktop applications. This was genuinely revolutionary.

---

### 🌍 Web 2.0 — The Participatory Web (Mid 2000s–2010s)

The term **Web 2.0** was popularized around 2004–2005, and it described a fundamental shift in what the web *was.*

Web 1.0 = you read what companies put there.
Web 2.0 = *you* create the content too.

This era gave us:

**Blogs** — platforms like Blogger and WordPress made it so anyone could publish their thoughts online without knowing how to code. Millions of people became publishers.

**Wikipedia** (2001) — the entire encyclopedia written and maintained by regular people. Nobody thought this would work. It worked.

**MySpace and Facebook** — social networks where your profile *was* the content. You didn't just visit a website, you *lived* on it. Facebook launched in 2004 and within a few years had hundreds of millions of users.

**YouTube** (2005) — anyone could upload a video and the whole world could watch it. Before YouTube, getting video online was technically complex and expensive. Suddenly your bedroom could be a broadcast studio.

**Twitter** (2006) — 140 characters. That's it. And yet it changed how information spread around the world.

The common thread? **User-generated content.** The web wasn't a library anymore — it was a conversation. Everyone had a voice. Everyone was both consumer and creator.

---

### 🛠️ The Tech Behind Web 2.0

All this new interactivity needed better tools. This is where the web development world really started to grow up.

**CSS** (Cascading Style Sheets) had existed since 1996 but started getting taken seriously in the Web 2.0 era. CSS is what makes web pages *look good* — it controls colors, fonts, layouts, spacing. Before CSS, styling was done with messy HTML attributes. CSS separated the *content* (HTML) from the *presentation* (CSS), which was a much cleaner way to build things.

**JavaScript libraries** started appearing to smooth over the browser inconsistency problems. **jQuery** (2006) became insanely popular — it let you write one line of JavaScript that would work in all browsers, instead of writing separate code for each one. For years, jQuery was basically the default tool every web developer reached for.

**Server-side languages** like **PHP**, **Ruby**, and **Python** were powering the backend — the part of the web you don't see. When you log into Facebook, a server running code is checking your username and password, fetching your friends' posts from a database, and assembling a custom HTML page just for you. That's backend work.

The split between **frontend** (what users see — HTML, CSS, JS) and **backend** (servers, databases, logic) became a real thing during this era. We'll go deep on that in Part 4.

---

### 🔜 Why This Era Still Matters

A lot of what was invented during the Web 2.0 era is still the backbone of how the web works today. The concept of dynamic, interactive pages. The importance of JavaScript. Frontend vs backend. APIs (Application Programming Interfaces) — a way for different web services to talk to each other, which powered mashups and integrations everywhere.

When you learn React or Vue or any modern JavaScript framework today, you're building on the shoulders of everything that happened in this wild, messy, creative Web 2.0 era.

---

### 🔜 What's Next

In **Part 3** we're going under the hood. Forget history for a second — we're going to answer the question: *what actually happens when you type a URL into your browser and hit enter?* DNS, servers, HTTP requests, responses, how browsers render pages. This is the technical heart of the whole thing, explained in plain English.

*See you in Part 3! 👋*

---
*Part 2 of 5 — The Web History Series*
