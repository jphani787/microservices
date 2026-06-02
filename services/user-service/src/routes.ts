import { Router } from "express";
import * as userController from "./userController";
import { authenticateToken, validateRequest } from "../../../shared/middleware";
import { createProfileSchema, updateProfileSchema } from "./validation";

const router = Router();

router.get("/profile", authenticateToken, userController.getProfile);
router.put(
  "/profile",
  authenticateToken,
  validateRequest(updateProfileSchema),
  userController.updateProfile,
);
router.delete("/profile", authenticateToken, userController.deleteProfile);
router.post(
  "/profile",
  authenticateToken,
  validateRequest(createProfileSchema),
  userController.createProfile,
);

export default router;
