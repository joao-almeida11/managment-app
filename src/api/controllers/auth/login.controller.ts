// import { generateToken } from "@api/lib/token.js";
// import { prisma } from "@lib/prisma.js";
// import { loginSchema } from "@lib/validation.js";
// import bcrypt from "bcrypt";
// import type { Request, Response } from "express";
// import { z } from "zod";

// type loginBody = z.infer<typeof loginSchema>;

// const login = async (
//   req: Request<unknown, unknown, loginBody>,
//   res: Response,
// ) => {
//   req.log.info("Login started");
//   try {
//     const { email, password } = loginSchema.parse(req.body);

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(401).json({
//         message: "Invalid email or password",
//       });
//     }

//     const isValid = await bcrypt.compare(password, user.password);

//     if (!isValid) {
//       return res.status(401).json({
//         message: "Invalid email or password",
//       });
//     }

//     // JWT
//     const accessToken = await signAccessToken(payload);
//     const refreshToken = await signRefreshToken(payload);
//     await prisma.user.update({
//       where: { id: user.id },
//       data: { refreshToken },
//     });

//     return res.status(200).json({
//       accessToken,
//       refreshToken,
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         role: user.role,
//         image: user.image,
//       },
//     });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({
//         message: "Validation error",
//         errors: error.issues,
//       });
//     }

//     console.error(error);
//     res.status(500).json({ message: "Error logging in" });
//   }
// };

// export default login;
