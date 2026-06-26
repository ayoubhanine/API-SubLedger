import { registerUser,loginUser } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    await registerUser(req.body);

    res.status(201).json({
      message: "Utilisateur créé",
    });
  } catch (error) {
    if (
      error.message === "Email déjà utilisé"
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      error: "Erreur serveur",
    });
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginUser(req.body);

    res.json({ token });
  } catch (error) {
    if (
      error.message === "Email invalide" ||
      error.message === "Mot de passe incorrect"
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      error: "Erreur serveur",
    });
  }
};