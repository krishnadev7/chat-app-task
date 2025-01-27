import express from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
