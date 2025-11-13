import { z } from "zod";

// --- Password validation rules ---
export const passwordValidation = z
  .string()
  .min(12, {
    message: "Password must be at least 12 characters long",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Must include an uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Must include a lowercase letter",
  })
  .refine((val) => /\d/.test(val), { message: "Must include a number" })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: "Must include a special character",
  });

// --- Email validation ---
export const emailValidation = z.email("Invalid email address");

// --- Image URL validation ---
export const imageUrlValidation = z.url();

// --- Example combined schemas ---
export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
