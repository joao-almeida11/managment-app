// // controllers/refresh.ts
// import { prisma } from "@lib/prisma.js";
// import {
//   signAccessToken,
//   signRefreshToken,
//   verifyRefreshToken,
// } from "@lib/token.js";
// import type { Request, Response } from "express";

// const refreshToken = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken)
//     return res.status(401).json({ message: "Missing refresh token" });

//   const payload = await verifyRefreshToken(refreshToken);
//   if (!payload)
//     return res.status(401).json({ message: "Invalid refresh token" });

//   const user = await prisma.user.findUnique({ where: { id: payload.userId } });
//   if (!user || user.refreshToken !== refreshToken) {
//     return res.status(401).json({ message: "Refresh token revoked" });
//   }

//   // rotate
//   const newPayload = { userId: user.id, role: user.role };
//   const newAccess = await signAccessToken(newPayload);
//   const newRefresh = await signRefreshToken(newPayload);

//   await prisma.user.update({
//     where: { id: user.id },
//     data: { refreshToken: newRefresh },
//   });

//   return res.json({
//     accessToken: newAccess,
//     refreshToken: newRefresh,
//   });
// };

// export default refreshToken;
