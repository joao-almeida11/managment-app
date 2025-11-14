import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

import env from "../../config/env";

export interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string };
}

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    req.user = {
      id: payload.userId as number,
      role: payload.role as string,
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// role guards
export const authorize =
  (...roles: string[]) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };

//   example usage
// router.delete("/admin/task/:id", auth, authorize("ADMIN"), deleteTask);

// Basically:
// 	•	You validate the access token on each request.
// 	•	When it expires, the refresh token is used to generate a new one.
// 	•	If the refresh token is missing, expired, or revoked — the user must log in again.
