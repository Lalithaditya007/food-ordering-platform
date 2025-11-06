import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Auth Service running on port ${PORT}`));
