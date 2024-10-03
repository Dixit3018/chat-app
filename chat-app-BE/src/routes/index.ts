import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import messageRoutes from "./messages.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("", messageRoutes);

export default router;
