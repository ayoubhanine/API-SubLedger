import {
  createSubscriptionService,
  getSubscriptionsService,
  getSubscriptionByIdService,
  updateSubscriptionService,
  deleteSubscriptionService,
} from "../services/subscriptionService.js";

export const createSubscription = async (req, res) => {
  try {
    const subscription = await createSubscriptionService(
      req.body,
      req.user.id
    );

    res.status(201).json(subscription);
  } catch (error) {
    if (error.message === "Le prix doit être supérieur à 0") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await getSubscriptionsService(req.user.id);

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

export const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await getSubscriptionByIdService(
      req.params.id,
      req.user.id
    );

    res.json(subscription);
  } catch (error) {
    if (error.message === "Abonnement introuvable") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "Accès refusé") {
      return res.status(403).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

export const updateSubscription = async (req, res) => {
  try {
    const updatedSubscription = await updateSubscriptionService(
      req.params.id,
      req.body,
      req.user.id
    );

    res.json(updatedSubscription);
  } catch (error) {
    if (error.message === "Abonnement introuvable") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "Accès refusé") {
      return res.status(403).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

export const deleteSubscription = async (req, res) => {
  try {
    const result = await deleteSubscriptionService(
      req.params.id,
      req.user.id
    );

    res.json(result);
  } catch (error) {
    if (error.message === "Abonnement introuvable") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "Accès refusé") {
      return res.status(403).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};