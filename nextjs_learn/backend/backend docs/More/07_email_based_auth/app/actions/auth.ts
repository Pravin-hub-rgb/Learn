"use server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { registrationSchema } from "@/lib/validations/auth";

type RegistrationResult = {
  error?: string;
  success?: boolean;
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
const {email, password } = result.data;

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

    console.log("User created successfully:", newUser.id);
    return { success: true }; // void return
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
