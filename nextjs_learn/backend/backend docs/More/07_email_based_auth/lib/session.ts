import { cookies } from "next/headers";
import prisma from "./prisma";

export async function createSession(userId: string) {
  // In a real application, you would generate a secure session token and store it in a database or in-memory store.
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt,
    },
  });
  const cookieStore = await cookies();
  cookieStore.set("sessionId", session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  });
  return session;
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    return null;
  }
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });
  if (!session) {
    return null;
  }
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({
      where: { id: sessionId },
    });
    return null;
  }
  return session.user;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (sessionId) {
    await prisma.session.delete({
      where: { id: sessionId },
    }).catch(() => {/* Ignore errors if session already deleted */});
    cookieStore.delete("sessionId");
  }
}