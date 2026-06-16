import "./config.js";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Stripe from "stripe";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { profile } from "./controller/authController.js";

const app = express();
app.use(cors());
app.use(express.json());


//authentication routes
app.use("/auth", authRoutes);

// Payment routes
app.use("/payment", paymentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));