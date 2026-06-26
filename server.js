// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import subscriptionRoutes from "./routes/subscriptionRoutes.js";

// dotenv.config();
// const app=express();
// app.use(express.json());
// app.use("/auth",authRoutes);
// app.use("/subscriptions",subscriptionRoutes)
// app.use("/admin",adminRoutes)

// mongoose.connect(process.env.MONGO_URI)
// .then(()=>console.log("mongoDB connecté"))
// .catch(err=>console.log(err));

// const PORT=process.env.PORT || 5000;

// app.listen(PORT,()=>{
//     console.log(`server runnig on port ${PORT}`)
// })
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// import app from "./app.js";

// dotenv.config();

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("mongoDB connecté");

//     const PORT = process.env.PORT || 5000;

//     app.listen(PORT, () => {
//       console.log(`server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("mongoDB connecté");

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch(console.error);