import express from "express";
import { getAllUsers,getAllSubscriptions,getSubscriptionById } from "../controllers/adminController.js";
import {protect} from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";


const router=express.Router();

router.get("/users",protect,isAdmin,getAllUsers);
router.get("/subscriptions",protect,isAdmin,getAllSubscriptions)
router.get("/subscriptions/:id",protect,isAdmin,getSubscriptionById)
export default router;