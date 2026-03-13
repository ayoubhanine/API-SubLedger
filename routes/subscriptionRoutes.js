import express, { Router } from "express";
import { createSubscription,
    getSubscriptionById,
    getSubscriptions,
    updateSubscription,
    deleteSubscription } from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { subscriptionValidation } from "../validators/subscriptionValidator.js";
import { validate } from "../middleware/validationMiddleware.js";

const router=express.Router()
router.post("/",subscriptionValidation,validate,protect,createSubscription);
router.get("/",protect,getSubscriptions);
router.get("/:id",protect,getSubscriptionById);
router.put("/:id",subscriptionValidation,validate,protect,updateSubscription);
router.delete("/:id",protect,deleteSubscription);

export default router;
