import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateAccessToken = async (user: {
  id: number;
  role: string;
}) => {
  return await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(secret);
};

export const generateRefreshToken = async (userId: number) => {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
};

// Security best practices
// 	•	✅ Always hash refresh tokens before saving to DB (like passwords).
// 	•	✅ Use short-lived access tokens.
// 	•	✅ Rotate refresh tokens on every refresh.
// 	•	✅ Use HttpOnly + Secure cookies for tokens if possible (better than headers for web apps).
// 	•	✅ Always check token expiration on server.
// 	•	✅ Log out by deleting refresh token from DB
