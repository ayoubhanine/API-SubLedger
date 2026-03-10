import mongoose from "mongoose";
import { type } from "os";

const subscriptionSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    billingCycle:{
        type:String,
        enum:["monthly","yearly"],
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});

export default mongoose.model("Subscription",subscriptionSchema);