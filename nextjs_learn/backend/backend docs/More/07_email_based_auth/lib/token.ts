import { randomBytes } from "crypto";
import prisma from "./prisma";

export async function generateVerificationToken(userId: string) {
  try {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await prisma.verificationToken.deleteMany({
      where: {
        userId,
      },
    });
    await prisma.verificationToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
    return token;
  } catch (error) {
    console.error("Error generating verification token:", error);
    throw new Error("Failed to generate verification token");
  }
}

export async function generatePasswordResetToken(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  const passwordResetToken = await prisma.passwordResetToken.upsert({
    where: {userId},
    update: {
      token, expiresAt,
    }, 
    create: {
      userId,
      token,
      expiresAt,
    }
  })
}