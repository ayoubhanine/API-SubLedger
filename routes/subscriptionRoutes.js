import express, { Router } from "express";
import { createSubscription,
    getSubscriptionById,
    getSubscriptions,
    updateSubscription,
    deleteSubscription } from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router=express.Router()
router.post("/",protect,createSubscription);
router.get("/",protect,getSubscriptions);
router.get("/:id",protect,getSubscriptionById);
router.put("/:id",protect,updateSubscription);
router.delete("/:id",protect,deleteSubscription);

export default router;
