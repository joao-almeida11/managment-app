import register from "@api/controllers/auth/register.controller.js";
import { Router } from "express";
// import { auth as authMiddleware } from "../middlewares/auth";

const router = Router();

// Public routes
router.post("/register", register);
// router.post("/login", login);
// router.post("/verify-email", verifyEmail);
// router.post("/refresh-token", refreshToken);
// router.post("/forgot-password", auth, forgotPassword);
// router.post("/send-verification-code", sendVerificationCode); // email/2FA verification

// Protected routes
// router.post("/logout", authMiddleware, logout);
// router.post("/change-password", authMiddleware, changePassword);

export default router;
