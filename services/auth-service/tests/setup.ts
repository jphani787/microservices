import { JWTPayload } from "../../../shared/types";

process.env.JWT_SECRET = "test_your_jwt_secret_key";
process.env.JWT_REFRESH_SECRET = "test_your_jwt_refresh_secret_key";
process.env.JWT_EXPIRES_IN = "15m";
process.env.JWT_REFRESH_EXPIRES_IN = "7d";
process.env.BCRYPT_ROUNDS = "4";
process.env.NODE_ENV = "test";

const mockPrismaClient = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  refreshToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    deleteMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  $disconnect: jest.fn(),
  $connect: jest.fn(),
};

jest.mock("../src/database", () => mockPrismaClient);

global.mockPrisma = mockPrismaClient;

export const testUser = {
  id: "test-user-id",
  email: "testuser123@domain.com",
  password: "$2a$04$testhashedpassword",
  createdAt: new Date("2026-01-01T00:00:00Z"),
  updatedAt: new Date("2026-01-01T00:00:00Z"),
};

export const testRefreshToken = {
  id: "test-refresh-token-id",
  userId: testUser.id,
  token: "test-refresh-token",
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  createdAt: new Date("2026-01-01T00:00:00Z"),
};

export const testJwtPayload: JWTPayload = {
  userId: "test-user-id",
  email: testUser.email,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 15 * 60,
};

export function resetAllMocks() {
  Object.values(mockPrismaClient.user).forEach((mock) => {
    if (jest.isMockFunction(mock)) {
      mock.mockReset();
    }
  });

  Object.values(mockPrismaClient.refreshToken).forEach((mock) => {
    if (jest.isMockFunction(mock)) {
      mock.mockReset();
    }
  });
}

declare global {
  var mockPrisma: typeof mockPrismaClient;
}
