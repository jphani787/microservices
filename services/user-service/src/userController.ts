import { Request, Response } from "express";
import { UserService } from "./userService";
import { asyncHandler } from "@sharedmiddleware";
import { createServiceError, createSuccessResponse } from "@sharedutils";

const userService = new UserService();

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res
      .status(401)
      .json(createServiceError("User not authenticated", 401));
  }

  const profile = await userService.getProfile(userId);
  return res
    .status(201)
    .json(
      createSuccessResponse(profile, "User profile retrieved successfully"),
    );
});
