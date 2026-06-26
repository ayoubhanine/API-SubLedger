import express from "express";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/admin", adminRoutes);

export default app;