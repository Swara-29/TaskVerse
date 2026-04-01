import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => res.send("Backend is running 🚀"));

app.use((err, req, res, next) => {
  console.error("UNHANDLED ERROR:", err.message);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);

  // ✅ Keep alive — pings every 14 mins so Render never sleeps
  setInterval(() => {
    https.get("https://taskverse-lggn.onrender.com/", (res) => {
      console.log(`Keep alive: ${res.statusCode}`);
    }).on("error", (err) => {
      console.error("Keep alive error:", err.message);
    });
  }, 14 * 60 * 1000);
});