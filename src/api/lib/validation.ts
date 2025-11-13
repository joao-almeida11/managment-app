// src/lib/validation.ts
import { z } from "zod";

// --- Reusable regex patterns ---
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const IMAGE_URL_REGEX = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;

// --- Password validation rules ---
export const passwordValidation = z
  .string()
  .min(12, "Password must be at least 12 characters long")
  .refine(
    (val) =>
      /[A-Z]/.test(val) && // uppercase
      /[a-z]/.test(val) && // lowercase
      /\d/.test(val) && // number
      /[^A-Za-z0-9]/.test(val), // special char
    {
      message:
        "Password must include at least one uppercase, lowercase, number, and symbol",
    },
  );

// --- Email validation ---
export const emailValidation = z
  .string()
  .min(3, "Email is required")
  .refine((val) => EMAIL_REGEX.test(val), {
    message: "Invalid email address",
  });

// --- Image URL validation ---
export const imageUrlValidation = z
  .string()
  .optional()
  .refine((val) => !val || IMAGE_URL_REGEX.test(val), {
    message: "Image URL must be valid and point to an image file",
  });

// --- Example combined schemas ---
export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, "Password is required"),
});
