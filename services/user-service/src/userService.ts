import { createServiceError, sanitizeInput } from "../../../shared/utils";
import { UpdateUserProfile, UserProfile } from "../../../shared/types";
import { AuthClient } from "./authClient";
import prisma from "./database";

export class UserService {
  private authClient: AuthClient;

  constructor() {
    this.authClient = new AuthClient();
  }

  async createProfile(
    userId: string,
    profileData: Partial<UpdateUserProfile>,
  ): Promise<UserProfile> {
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      throw createServiceError("User profile already exists", 409);
    }
  }

  private sanitizeProfileData(
    data: Partial<UpdateUserProfile>,
  ): Partial<UpdateUserProfile> {
    const sanitized: Partial<UpdateUserProfile> = {};

    if (data.firstName !== undefined) {
      sanitized.firstName = data.firstName
        ? sanitizeInput(data.firstName)
        : null;
    }

    if (data.lastName !== undefined) {
      sanitized.lastName = data.lastName ? sanitizeInput(data.lastName) : null;
    }

    if (data.bio !== undefined) {
      sanitized.bio = data.bio ? sanitizeInput(data.bio) : null;
    }

    if (data.prefrences !== undefined) {
      sanitized.prefrences = data.prefrences ? data.prefrences : null;
    }
    return sanitized;
  }
}
