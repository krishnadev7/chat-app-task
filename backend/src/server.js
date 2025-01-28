import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectMongoDb } from "./lib/db.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT || 8000, () => {
  console.log(`Server started on port ${PORT}`);
  connectMongoDb();
});
