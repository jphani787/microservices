import { Request, Response } from "express";
import { UserService } from "./userService";
import { asyncHandler } from "../../../shared/middleware";
import {
  createServiceError,
  createSuccessResponse,
} from "../../../shared/utils";

const userService = new UserService();

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
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

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(401)
        .json(createServiceError("User not authenticated", 401));
    }

    const profile = await userService.updateProfile(userId, req.body);
    return res
      .status(201)
      .json(
        createSuccessResponse(profile, "User profile updated successfully"),
      );
  },
);

export const deleteProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(401)
        .json(createServiceError("User not authenticated", 401));
    }

    await userService.deleteProfile(userId);
    return res
      .status(200)
      .json(createSuccessResponse(null, "User profile deleted successfully"));
  },
);

export const createProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(401)
        .json(createServiceError("User not authenticated", 401));
    }
    const profile = await userService.createProfile(userId, req.body);
    return res
      .status(201)
      .json(
        createSuccessResponse(profile, "User profile created successfully"),
      );
  },
);
