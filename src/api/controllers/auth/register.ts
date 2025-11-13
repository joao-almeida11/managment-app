import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import {
  emailValidation,
  passwordValidation,
  imageUrlValidation,
} from "../../lib/validation";

export const registerSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
  name: z.string().min(2, "Name must be at least 2 characters long"),
  image: imageUrlValidation,
});

type registerBody = z.infer<typeof registerSchema>;

const register = async (req: Request<{}, {}, registerBody>, res: Response) => {
  try {
    const { email, password, name, image } = registerSchema.parse(req.body);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

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
      if (error.code === "P2002") {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    console.error(error);
    res.status(500).json({ message: "Error creating task" });
  }
};

export default register;
