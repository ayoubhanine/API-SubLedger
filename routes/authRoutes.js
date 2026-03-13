import express from "express";
import { register,login } from "../controllers/authController.js";
import { registerValidation } from "../validators/userValidator.js";
import { validate } from "../middleware/validationMiddleware.js";
import { ValidateRole } from "../middleware/roleMiddleware.js";
const router=express.Router()
router.post("/register",registerValidation,ValidateRole,validate,register);
router.post("/login",login);

export default router;