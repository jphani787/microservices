import { Router } from "express";
import * as authController from "./authController";
import { validateRequest, authenticateToken } from "../../../shared/middleware";
import { loginSchema, registerSchema, refreshTokenSchema } from "./validation";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register,
);

router.post("/login", validateRequest(loginSchema), authController.login);

router.post(
  "/refresh",
  validateRequest(refreshTokenSchema),
  authController.refreshTokens,
);

router.post(
  "/logout",
  validateRequest(refreshTokenSchema),
  authController.logout,
);

router.post("/validate", authController.validateToken);

router.get("/profile", authenticateToken, authController.getProfile);
router.delete("/profile", authenticateToken, authController.deleteUser);

export default router;
