// // controllers/logout.ts
// import { prisma } from "@lib/prisma.js";
// import type { Request, Response } from "express";

// const logout = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body;

//   await prisma.user.updateMany({
//     where: { refreshToken },
//     data: { refreshToken: null },
//   });

//   return res.status(200).json({ message: "Logged out" });
// };

// export default logout;
