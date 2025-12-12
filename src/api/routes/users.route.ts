// TODO user routes
// import {
//     deleteUser,
//     editUser,
//     getUser,
// } from '../controllers/user/index.js';
// import { auth, imageUpload } from '../middlewares/index.js';
import { getUserTasksByUserId } from "@api/controllers/user/index.js";
import { auth as authMiddleware } from "@api/middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

// EDIT
// router.put('/', auth, imageUpload, editUser);

// router.get('/', auth, getUser);
// router.delete('/', auth, deleteUser);

router.get("/:userId/tasks", authMiddleware, getUserTasksByUserId);

export default router;
