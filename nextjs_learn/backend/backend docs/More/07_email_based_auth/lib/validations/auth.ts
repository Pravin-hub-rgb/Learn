import {z} from "zod";

export const registrationSchema = z.object({
email: z.email().min(1, "Email is required"),
password: z
.string()
.min(1, "Password is required")
.min(6, "Password must be at least 6 characters"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>