import { NextRequest, NextResponse } from "next/server";

const requestCounts: Record<string, { count: number; resetTime: number }> = {};
const WINDOW_MS = 60 * 1000;
const rateLimit = 10;

export function proxy(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  if (!requestCounts[ip]) {
    requestCounts[ip] = {
      count: 1, // Count shuru karo 1 se
      resetTime: now + WINDOW_MS, // 1 minute baad reset hoga
    };
  } else {
    // Pehle se record hai — count badhao
    requestCounts[ip].count++;
  }
  if (requestCounts[ip].count > rateLimit) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }
  console.log(`IP: ${ip} — Count: ${requestCounts[ip].count}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
};
