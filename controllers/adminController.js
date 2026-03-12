import User from"../models/User.js";
export const getAllUsers=async(req,res)=>{
    try{

        const users=await User.find().select("-password");
        res.json(users)
    }
    catch(error){
        res.status(500).json({message:"Erreur serveur"})
    }
}
import Subscription from "../models/Subscription.js";
export const getAllSubscriptions=async(req,res)=>{
    try{
        const subscriptions=await Subscription
        .find().
        populate("userId", "name email");
        res.json(subscriptions)
    }
    catch(error){
        res.status(500).json({message:"erreur serveur"})
    }
};
export const getSubscriptionById=async(req,res)=>{
    try{
        const subscriptions= await Subscription
        .findById(req.params.id)
        .populate("userId","name email");
        if(!subscriptions){
            return res.status(404).json({message:"subscription non trouvé"})
        }
        res.json(subscriptions)
    }
    catch(error){
        res.status(500).json({message:"erreur serveur"})
    }

}