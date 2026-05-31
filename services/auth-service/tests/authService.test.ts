import { AuthService } from "../src/authService";

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  resetAllMocks,
  testJwtPayload,
  testRefreshToken,
  testUser,
} from "./setup";
import { ServiceError } from "../../../shared/types";

const mockedUuidv4 = uuidv4 as unknown as jest.Mock<string, []>;
const mockedBycrypt = bycrypt as jest.Mocked<typeof bycrypt>;
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

async function expectServiceError(
  asyncFn: () => Promise<any>,
  expectedMessage: string,
  expectedStatusCode: number,
) {
  try {
    await asyncFn();
    fail("Expected function to throw ServiceError");
  } catch (error) {
    expect(error).toBeInstanceOf(ServiceError);
    expect((error as any).message).toBe(expectedMessage);
    expect((error as any).statusCode).toBe(expectedStatusCode);
  }
}

describe("AuthService", () => {
  let authService: any;

  beforeAll(() => {
    resetAllMocks();
    authService = new AuthService();

    mockedUuidv4.mockReturnValue("test-uuid");
    (mockedBycrypt.hash as jest.Mock).mockResolvedValue(
      "$2a$10$testhashedpassword",
    );
    (mockedBycrypt.compare as jest.Mock).mockResolvedValue(true);
    (mockedJwt.sign as jest.Mock).mockReturnValue("test-jwt-token");
    (mockedJwt.verify as jest.Mock).mockReturnValue(testJwtPayload);
  });

  describe("constructor", () => {
    it("should initialize with environment variables", () => {
      expect(authService).toBeInstanceOf(AuthService);
    });

    it("should throw an error if JWT_SECRET is not configured", () => {
      delete process.env.JWT_SECRET;
      expect(() => new AuthService()).toThrow(
        "JWT secrets are not defined in the environment variables",
      );
      process.env.JWT_SECRET = "test_your_jwt_secret_key";
    });

    it("should throw an error if JWT_REFRESH_SECRET is not configured", () => {
      delete process.env.JWT_REFRESH_SECRET;
      expect(() => new AuthService()).toThrow(
        "JWT secrets are not defined in the environment variables",
      );
      process.env.JWT_REFRESH_SECRET = "test_your_jwt_refresh_secret_key";
    });
  });

  describe("register", () => {
    const email = "singgggggma@user.com";
    const password = "password123";
    it("should successfully register a new user", async () => {
      global.mockPrisma.user.findUnique.mockResolvedValue(null);
      global.mockPrisma.user.create.mockResolvedValue(testUser);
      global.mockPrisma.refreshToken.create.mockResolvedValue(testRefreshToken);

      const result = await authService.register(email, password);
      expect(global.mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(mockedBycrypt.hash).toHaveBeenCalledWith(password, 4);
      expect(global.mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email,
          password: "$2a$10$testhashedpassword",
        },
      });
      expect(result).toEqual({
        accessToken: "test-jwt-token",
        refreshToken: "test-jwt-token",
      });
    });

    it("should throw an error if user already exists", async () => {
      global.mockPrisma.user.findUnique.mockResolvedValue(testUser);
      await expectServiceError(
        () => authService.register(email, password),
        "User already exists",
        409,
      );
      expect(global.mockPrisma.user.create).not.toHaveBeenCalled();
    });

    it("should handle database errors during creation", async () => {
      global.mockPrisma.user.findUnique.mockResolvedValue(null);
      global.mockPrisma.user.create.mockRejectedValue(new Error("DB error"));

      await expect(authService.register(email, password)).rejects.toThrow(
        "DB error",
      );
    });
  });
});
