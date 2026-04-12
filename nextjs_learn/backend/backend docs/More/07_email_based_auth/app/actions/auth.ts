"use server";

import prisma from "@/lib/prisma";
import {
  ForgotPasswordSchema,
  LoginSchema,
  registrationSchema,
  ResetPasswordSchema,
} from "@/lib/validations/auth";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "@/lib/token";
import { sendEmail, sendPasswordResetEmail } from "@/lib/email";
import { comparePasswords, hashPassword } from "@/lib/password";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { success } from "zod";

type RegistrationResult = {
  error?: string;
  success?: boolean;
  message?: string;
};

export async function registerUser(
  state: RegistrationResult,
  formData: FormData,
): Promise<RegistrationResult> {
  console.log("Registration attempt");
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = registrationSchema.safeParse(rawData);
  if (!result.success) {
    // Pehla error message return karo
    return {
      error: result.error.issues[0].message,
    };
  }
  // FormData se values nikalo
  const { email, password } = result.data;

  try {
    // Password hash karo
    const hashedPassword = await hashPassword(password);
    console.log("Password hashed successfully");

    // User database mein save karo
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isVerified: false,
      },
    });

    const token = await generateVerificationToken(newUser.id);
    const verificationLink = `http://localhost:3000/verify?token=${token}`;
    await sendEmail({
      to: newUser.email,
      subject: "Verify your email",
      html: `
      <h1>Welcome!</h1>
      <p>Thanks for registering. Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
      <p>Yeh link 24 ghante ke andar valid rahega.</p>
      `,
    });
    return {
      success: true,
      message:
        "Registration successful! Please check your email to verify your account.",
    };
  } catch (error) {
    // TypeScript safe type guard
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      console.log("Error: Email already exists");
      return { error: "Email already exists" };
    }
    console.log("Error occurred:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function verifyEmail(token: string) {
  const verficationRecord = await prisma.verificationToken.findUnique({
    where: {
      token,
    },
    include: { User: true },
  });
  if (!verficationRecord) {
    return { error: "Invalid or expired token" };
  }
  if (verficationRecord.expiresAt < new Date()) {
    await prisma.verificationToken.delete({
      where: { id: verficationRecord.id },
    });
    return { error: "Verification token expired. Please register again." };
  }
  await prisma.user.update({
    where: { id: verficationRecord.userId },
    data: { isVerified: true },
  });
  await prisma.verificationToken.delete({
    where: { id: verficationRecord.id },
  });
  return { success: true };
}

export async function loginUser(
  prevState: { error: string; success: boolean },
  formData: FormData,
): Promise<{ error: string; success: boolean }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const result = LoginSchema.safeParse({ email, password });
  if (!result.success) {
    return { error: result.error.issues[0].message, success: false };
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return { error: "Invalid credentials", success: false };
  }

  if (!user.isVerified) {
    return {
      error: "Please verify your email before logging in",
      success: false,
    };
  }

  const passwordMatch = await comparePasswords(password, user.password);
  if (!passwordMatch) {
    return { error: "Invalid credentials", success: false };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logoutUser() {
  await deleteSession();
  redirect("/login");
}

export async function forgotPassword(
  prevState: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: boolean; message?: string }> {
  const email = formData.get("email") as string;
  console.log("email", email);

  const validated = ForgotPasswordSchema.safeParse({ email });
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user && !user.isVerified) {
    return {
      error: "Please verify your email first",
    };
  }
  if (!user) {
    return {
      success: false,
      error: "Create an account first",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(user.id);
  await sendPasswordResetEmail(user.email, passwordResetToken);
  console.log("Password reset token generated:", passwordResetToken);

  return {
    success: true,
    message: "Check your email for password reset link",
  };
}

export async function resetPassword(
  prevState: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: boolean; message?: string }> {
  const validated = ResetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!validated.success) {
    return { error: validated.error.issues[0].message, success: false };
  }

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const token = formData.get("token") as string;
  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });
  console.log("passwordResetToken", passwordResetToken);
  if (!passwordResetToken) {
    return {
      error: "Invalid reset token",
      success: false,
    };
  }
  if (passwordResetToken.expiresAt < new Date()) {
    return {
      error: "Reset token has expired",
      success: false,
    };
  }
  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
      success: false,
    };
  }
  const hashedPassword = await hashPassword(password);
  await prisma.user.update({
    where: { id: passwordResetToken.userId },
    data: { password: hashedPassword },
  });
  await prisma.passwordResetToken.delete({
    where: { id: passwordResetToken.id },
  });

  // Invalidate all sessions for this user
  await prisma.session.deleteMany({
    where: { userId: passwordResetToken.id },
  });

  // Delete token so it can't be used again
  await prisma.passwordResetToken.delete({
    where: { id: passwordResetToken.id },
  });

  return {
    success: true,
    message:
      "Password reset successful! You can now log in with your new password.",
  };
}
