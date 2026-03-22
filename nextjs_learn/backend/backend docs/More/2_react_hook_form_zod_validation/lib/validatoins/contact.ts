import { z } from "zod";
export const ContactSchema = z.object({
  naam: z.string().min(1, "Naam Zaroori hai"),
  email: z.email("Email sahi format mein nahi hai"),
  city: z.string().min(1, "City select karo"),
  gender: z.enum(["male", "female"], {
    error: "Gender select karo",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Terms accept karne zaroori hain",
  }),
});
