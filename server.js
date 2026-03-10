import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

dotenv.config();
const app=express();
app.use(express.json());
app.use("/auth",authRoutes);
// app.use("/subscriptions",subscriptionRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongoDB connecté"))
.catch(err=>console.log(err));

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server runnig on port${PORT}`)
})
