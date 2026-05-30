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
import { resetAllMocks } from "./setup";

describe("AuthService", () => {
  let authService: any;

  beforeAll(() => {
    resetAllMocks();
    authService = new AuthService();
  });

  describe("constructor", () => {
    it("should initialize with environment variables", () => {
      expect(authService).toBeInstanceOf(AuthService);
    });
  });
});
