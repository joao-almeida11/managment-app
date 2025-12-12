import { JWT_REFRESH_SECRET, JWT_SECRET } from "@config/env.js";
import { jwtVerify, SignJWT } from "jose";

const accessSecret = new TextEncoder().encode(JWT_SECRET);
const refreshSecret = new TextEncoder().encode(JWT_REFRESH_SECRET);

export interface JwtPayload {
  userId: number;
  role: string;
}

const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

export async function signAccessToken(payload: JwtPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(ACCESS_EXPIRES_IN)
    .setIssuedAt()
    .sign(accessSecret);
}

export async function signRefreshToken(payload: JwtPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(REFRESH_EXPIRES_IN)
    .setIssuedAt()
    .sign(refreshSecret);
}

export async function verifyAccessToken(
  token: string,
): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, accessSecret);
    return payload as JwtPayload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(
  token: string,
): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, refreshSecret);
    return payload as JwtPayload;
  } catch {
    return null;
  }
}
