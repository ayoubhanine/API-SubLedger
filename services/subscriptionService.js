import Subscription from "../models/Subscription.js";

export const createSubscriptionService = async (
  { name, price, billingCycle },
  userId
) => {

  if (price <= 0) {
    throw new Error("Le prix doit être supérieur à 0");
  }

  const subscription = new Subscription({
    name,
    price,
    billingCycle,
    userId,
  });

  return await subscription.save();
};

export const getSubscriptionsService = async (userId) => {
  return await Subscription.find({ userId });
};

export const getSubscriptionByIdService = async (id, userId) => {

  const subscription = await Subscription.findById(id);

  if (!subscription) {
    throw new Error("Abonnement introuvable");
  }

  if (subscription.userId.toString() !== userId) {
    throw new Error("Accès refusé");
  }

  return subscription;
};

export const updateSubscriptionService = async (
  id,
  data,
  userId
) => {

  const subscription = await Subscription.findById(id);

  if (!subscription) {
    throw new Error("Abonnement introuvable");
  }

  if (subscription.userId.toString() !== userId) {
    throw new Error("Accès refusé");
  }

  return await Subscription.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};

export const deleteSubscriptionService = async (
  id,
  userId
) => {

  const subscription = await Subscription.findById(id);

  if (!subscription) {
    throw new Error("Abonnement introuvable");
  }

  if (subscription.userId.toString() !== userId) {
    throw new Error("Accès refusé");
  }

  await Subscription.findByIdAndDelete(id);

  return {
    message: "Abonnement supprimé",
  };
};