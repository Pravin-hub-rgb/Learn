# Doc 5.3 — AUTH_SECRET + Environment Variables + Security

## Abhi Tak Kya Hua

5.1 aur 5.2 mein humne session strategies ke concepts aur implementation samjhe. Ab hum seekhenge ki production ke liye security kaise setup karna hai.

## Broad Goal — Yeh Doc Mein Kya Karenge

Security aur environment variables ke bare mein seekhenge:

1. **AUTH_SECRET kyu zaroori hai** - Theory aur importance
2. **Environment variables setup** - Proper configuration
3. **Security best practices** - Production ready security
4. **Common security issues** - Problems aur unke solutions

## Problem — Security Setup ki Zaroorat

Abhi tak humne basic auth setup kiya hai, lekin production mein security ka khayal rakhna zaroori hai:

- **JWT tokens** ko secure karna
- **Environment variables** ko safe rakhna
- **Session management** ko secure karna
- **Common vulnerabilities** se bachna

## Step 1 — AUTH_SECRET kyu zaroori hai?

AUTH_SECRET Next-Auth ke liye ek critical security component hai.

**Kyu chahiye:**
- JWT tokens ko sign karne ke liye
- Session cookies ko encrypt karne ke liye
- CSRF attacks se bachav ke liye
- Token tampering se bachav ke liye

**Bina AUTH_SECRET ke problems:**
- JWT tokens easily tampered ho sakte hain
- Session hijacking ho sakta hai
- CSRF attacks possible hote hain
- Production mein security risk hota hai

## Step 2 — AUTH_SECRET generate karna

**Method 1: OpenSSL command**
```bash
openssl rand -base64 32
```

**Method 2: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Method 3: Online generators**
- Use trusted sources only
- Never share the secret

**Generated secret example:**
```
cX8v7K9mN2pR4sT6vY1zA3bC5dE7fG9hJ2kL4mN6pQ8rS0tU2vW4xZ6aB8cD0eF2
```

## Step 3 — Environment variables setup karna

**.env.local file create karna:**
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/myapp"

# Next-Auth
AUTH_SECRET="your-generated-secret-here"
AUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Other providers
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
```

**Environment validation:**
```ts
// lib/env.ts
export function getEnvVar(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Environment variable ${name} is required`)
  }
  return value
}

export const env = {
  AUTH_SECRET: getEnvVar("AUTH_SECRET"),
  DATABASE_URL: getEnvVar("DATABASE_URL"),
  GITHUB_ID: getEnvVar("GITHUB_ID"),
  GITHUB_SECRET: getEnvVar("GITHUB_SECRET"),
}
```

**Usage in auth.ts:**
```ts
import { env } from "@/lib/env"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  secret: env.AUTH_SECRET,
  // ... other config
})
```

## Step 4 — Security best practices

### 1. Secret management
```ts
// ❌ Don't do this
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: "hardcoded-secret", // Never hardcode secrets
})

// ✅ Do this
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
})
```

### 2. HTTPS in production
```ts
// auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  // ... other config
  trustHost: true, // Trust the host in production
  useSecureCookies: process.env.NODE_ENV === "production",
})
```

### 3. Cookie security
```ts
// auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
})
```

### 4. CSRF protection
```ts
// Already handled by Next-Auth, but ensure:
// - AUTH_SECRET is set
// - useSecureCookies in production
// - SameSite cookies
```

## Step 5 — Common security issues aur unke solutions

### Issue 1: Weak secrets
```ts
// ❌ Weak secret
AUTH_SECRET="123456"

// ✅ Strong secret
AUTH_SECRET="cX8v7K9mN2pR4sT6vY1zA3bC5dE7fG9hJ2kL4mN6pQ8rS0tU2vW4xZ6aB8cD0eF2"
```

### Issue 2: Exposed environment variables
```ts
// ❌ Don't log secrets
console.log("AUTH_SECRET:", process.env.AUTH_SECRET)

// ✅ Don't expose secrets anywhere
```

### Issue 3: Insecure cookies
```ts
// ❌ Insecure cookies
cookies: {
  sessionToken: {
    options: {
      secure: false, // Never set to false in production
      httpOnly: false, // Never set to false
    },
  },
}

// ✅ Secure cookies
cookies: {
  sessionToken: {
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  },
}
```

### Issue 4: Missing validation
```ts
// ❌ No validation
const secret = process.env.AUTH_SECRET

// ✅ With validation
const secret = process.env.AUTH_SECRET
if (!secret) {
  throw new Error("AUTH_SECRET is required")
}
if (secret.length < 32) {
  throw new Error("AUTH_SECRET must be at least 32 characters long")
}
```

## Step 6 — Production deployment security

### 1. Environment variables in production
```bash
# Vercel environment variables
vercel env add AUTH_SECRET production
vercel env add DATABASE_URL production
vercel env add GITHUB_ID production
vercel env add GITHUB_SECRET production
```

### 2. Database security
```env
# Use strong database credentials
DATABASE_URL="postgresql://username:strong-password@host:port/database?sslmode=require"
```

### 3. Provider security
```ts
// GitHub OAuth security
export const github = GitHub({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  allowDangerousEmailAccountLinking: false, // Keep false
})
```

### 4. Session security
```ts
// auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,   // Update every 24 hours
  },
  // ... other config
})
```

## Step 7 — Security monitoring

### 1. Failed login attempts
```ts
// lib/security.ts
export function logSecurityEvent(event: string, data: any) {
  console.log(`[SECURITY] ${event}:`, {
    timestamp: new Date().toISOString(),
    ...data,
  })
}

// auth.ts
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    logSecurityEvent("SIGN_IN_ATTEMPT", {
      email: user.email,
      provider: account?.provider,
    })
    return true
  },
  
  async jwt({ token, user }) {
    if (user) {
      logSecurityEvent("JWT_CREATED", {
        userId: user.id,
        email: user.email,
      })
    }
    return token
  },
}
```

### 2. Suspicious activity detection
```ts
// lib/security.ts
export function detectSuspiciousActivity(ip: string, userAgent: string) {
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
  ]
  
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    logSecurityEvent("SUSPICIOUS_ACTIVITY", {
      ip,
      userAgent,
      reason: "Bot-like user agent",
    })
    return true
  }
  
  return false
}
```

## Step 8 — Security headers

**Next.js middleware for security headers:**
```ts
// middleware.ts
import { NextResponse } from "next/server"

export function middleware(request) {
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  
  return response
}
```

## Step 9 — Regular security audits

### 1. Dependency checking
```bash
# Check for vulnerabilities
npm audit
npm audit fix

# Update dependencies regularly
npm update
```

### 2. Secret rotation
```bash
# Rotate secrets periodically
# 1. Generate new AUTH_SECRET
# 2. Update environment variables
# 3. Restart application
# 4. Monitor for issues
```

### 3. Access logging
```ts
// lib/audit.ts
export function auditLog(action: string, userId: string, details: any) {
  console.log(`[AUDIT] ${action}`, {
    userId,
    timestamp: new Date().toISOString(),
    details,
  })
}
```

## Summary

**Security setup checklist:**
- ✅ AUTH_SECRET generate kiya
- ✅ Environment variables properly set
- ✅ HTTPS enabled in production
- ✅ Secure cookies configured
- ✅ CSRF protection enabled
- ✅ Security headers added
- ✅ Monitoring aur logging setup
- ✅ Regular security audits

**Key security principles:**
- Never hardcode secrets
- Use strong, unique secrets
- Enable HTTPS in production
- Configure secure cookies
- Monitor security events
- Regular dependency updates
- Access logging aur auditing

## Agla Step

**Phase 5 complete!** Ab hum production-ready auth setup kar sakte hain. Agla phase shuru karna hai ya kuch aur specific topics cover karna hai?