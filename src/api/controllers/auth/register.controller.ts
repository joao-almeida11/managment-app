import { BCRYPT_ENCRYPTION_SALT_ROUNDS } from "@config/env.js";
import { prisma } from "@lib/prisma.js";
import {
  emailValidation,
  imageUrlValidation,
  passwordValidation,
} from "@lib/validation.js";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { z } from "zod";

export const registerSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: passwordValidation,
    name: z.string().min(2, {
      message: "Name must be at least 2 characters long",
    }),
    image: imageUrlValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type registerBody = z.infer<typeof registerSchema>;

const register = async (
  req: Request<unknown, unknown, registerBody>,
  res: Response,
) => {
  try {
    const { email, password, name, image } = registerSchema.parse(req.body);

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      (BCRYPT_ENCRYPTION_SALT_ROUNDS as string) || 12,
    );

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        image,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues,
      });
    }

    // Handle Prisma errors
    if (error && typeof error === "object" && "code" in error) {
      // Unique constraint broken (email)
      if (error.code === "P2002") {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    // bcrypt or env errors (e.g. invalid salt rounds type)
    if (error instanceof TypeError || error instanceof RangeError) {
      return res.status(500).json({
        message: "Internal configuration error",
      });
    }

    console.error("Unhandled register error:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export default register;
