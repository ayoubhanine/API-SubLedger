import Subscription from "../models/Subscription.js";

export const createSubscription = async (req, res) => {
  try {

    const { name, price, billingCycle } = req.body;

    if (price <= 0) {
      return res.status(400).json({ message: "Le prix doit être supérieur à 0" });
    }

    const subscription = new Subscription({
      name,
      price,
      billingCycle,
      userId: req.user.id
    });

    const savedSubscription = await subscription.save();

    res.status(201).json(savedSubscription);

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
export const getSubscriptions = async (req, res) => {
  try {

    const subscriptions = await Subscription.find({
      userId: req.user.id
    });

    res.json(subscriptions);

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
export const getSubscriptionById = async (req, res) => {
  try {

    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: "Abonnement introuvable" });
    }

    if (subscription.userId.toString() !== req.user.id) {  //Cela vérifie que l'utilisateur est le propriétaire.
      return res.status(403).json({ message: "Accès refusé" });
    }

    res.json(subscription);

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
export const updateSubscription = async (req, res) => {
  try {

    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: "Abonnement introuvable" });
    }

    if (subscription.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedSubscription);

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
export const deleteSubscription = async (req, res) => {
  try {

    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: "Abonnement introuvable" });
    }

    if (subscription.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.json({ message: "Abonnement supprimé" });

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};