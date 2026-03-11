import express from "express";
import { register,login } from "../controllers/authController.js";
import { registerValidation } from "../validators/userValidator.js";
import { validate } from "../middleware/validationMiddleware.js";
const router=express.Router()
router.post("/register",registerValidation,validate,register);
router.post("/login",login);

export default router;