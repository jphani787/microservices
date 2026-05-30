import { Router } from "express";
import * as authController from "./authController";
import { validateRequest } from "../../../shared/middleware";
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
router.get("/profile", authController.getProfile);
router.delete("/profile", authController.deleteUser);

export default router;
