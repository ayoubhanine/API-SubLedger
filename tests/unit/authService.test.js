import { jest } from "@jest/globals";

// Mock qbel imports
const findOne = jest.fn();
const save = jest.fn();
const hash = jest.fn();
const compare = jest.fn();
const sign = jest.fn();

jest.unstable_mockModule("../../models/User.js", () => ({
  default: class User {
    static findOne = findOne;

    constructor(data) {
      Object.assign(this, data);
    }

    save = save;
  },
}));

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash,
    compare,
  },
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign,
  },
}));

const { registerUser, loginUser } = await import(
  "../../services/authService.js"
);

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    test("crée un utilisateur", async () => {
      findOne.mockResolvedValue(null);
      hash.mockResolvedValue("hashedPassword");
      save.mockResolvedValue(true);

      const user = await registerUser({
        name: "Ayoub",
        email: "ayoub@test.com",
        password: "123456",
        role: "user",
      });

      expect(findOne).toHaveBeenCalled();
      expect(hash).toHaveBeenCalledWith("123456", 10);
      expect(save).toHaveBeenCalled();
      expect(user.email).toBe("ayoub@test.com");
    });

    test("email déjà utilisé", async () => {
      findOne.mockResolvedValue({
        email: "ayoub@test.com",
      });

      await expect(
        registerUser({
          name: "Ayoub",
          email: "ayoub@test.com",
          password: "123456",
          role: "user",
        })
      ).rejects.toThrow("Email déjà utilisé");
    });
  });

  describe("loginUser", () => {
    test("login réussi", async () => {
      findOne.mockResolvedValue({
        _id: "1",
        role: "user",
        password: "hashedPassword",
      });

      compare.mockResolvedValue(true);
      sign.mockReturnValue("fake-jwt");

      const token = await loginUser({
        email: "ayoub@test.com",
        password: "123456",
      });

      expect(compare).toHaveBeenCalled();
      expect(sign).toHaveBeenCalled();
      expect(token).toBe("fake-jwt");
    });

    test("email invalide", async () => {
      findOne.mockResolvedValue(null);

      await expect(
        loginUser({
          email: "x@test.com",
          password: "123456",
        })
      ).rejects.toThrow("Email invalide");
    });

    test("mot de passe incorrect", async () => {
      findOne.mockResolvedValue({
        password: "hashed",
      });

      compare.mockResolvedValue(false);

      await expect(
        loginUser({
          email: "x@test.com",
          password: "123456",
        })
      ).rejects.toThrow("Mot de passe incorrect");
    });
  });
});