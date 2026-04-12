import { z } from "zod";

export const registrationSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const LoginSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;


export const ForgotPasswordSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .min(1, "Password is required"),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters")
    .min(1, "Confirm Password is required"),
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;