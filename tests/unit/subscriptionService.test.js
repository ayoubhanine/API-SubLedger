import { jest } from "@jest/globals";

const saveMock = jest.fn();

jest.unstable_mockModule("../../models/Subscription.js", () => ({
  default: class Subscription {
    constructor(data) {
      Object.assign(this, data);
      this.save = saveMock;
    }

    static find = jest.fn();
    static findById = jest.fn();
    static findByIdAndUpdate = jest.fn();
    static findByIdAndDelete = jest.fn();
  },
}));

const {
  createSubscriptionService,
  getSubscriptionsService,
  getSubscriptionByIdService,
  updateSubscriptionService,
  deleteSubscriptionService,
} = await import("../../services/subscriptionService.js");

const { default: Subscription } = await import(
  "../../models/Subscription.js"
);

describe("Subscription Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createSubscriptionService", () => {

    test("crée un abonnement", async () => {

      saveMock.mockResolvedValue({
        name: "Netflix",
        price: 100,
      });

      const result = await createSubscriptionService(
        {
          name: "Netflix",
          price: 100,
          billingCycle: "monthly",
        },
        "user123"
      );

      expect(result.name).toBe("Netflix");
    });

    test("prix invalide", async () => {

      await expect(
        createSubscriptionService(
          {
            name: "Netflix",
            price: -10,
            billingCycle: "monthly",
          },
          "user123"
        )
      ).rejects.toThrow(
        "Le prix doit être supérieur à 0"
      );

    });

  });

  describe("getSubscriptionsService", () => {

    test("retourne les abonnements", async () => {

      Subscription.find.mockResolvedValue([
        { name: "Netflix" },
      ]);

      const result =
        await getSubscriptionsService("user123");

      expect(result).toHaveLength(1);

    });

  });

  describe("getSubscriptionByIdService", () => {

    test("abonnement introuvable", async () => {

      Subscription.findById.mockResolvedValue(null);

      await expect(
        getSubscriptionByIdService(
          "1",
          "user123"
        )
      ).rejects.toThrow(
        "Abonnement introuvable"
      );

    });

  });

  describe("updateSubscriptionService", () => {

    test("met à jour un abonnement", async () => {

      Subscription.findById.mockResolvedValue({
        userId: {
          toString: () => "user123",
        },
      });

      Subscription.findByIdAndUpdate.mockResolvedValue({
        name: "Spotify",
      });

      const result =
        await updateSubscriptionService(
          "1",
          {
            name: "Spotify",
          },
          "user123"
        );

      expect(result.name).toBe("Spotify");

    });

  });

  describe("deleteSubscriptionService", () => {

    test("supprime un abonnement", async () => {

      Subscription.findById.mockResolvedValue({
        userId: {
          toString: () => "user123",
        },
      });

      Subscription.findByIdAndDelete.mockResolvedValue();

      const result =
        await deleteSubscriptionService(
          "1",
          "user123"
        );

      expect(result.message).toBe(
        "Abonnement supprimé"
      );

    });

  });

});