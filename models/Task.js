// backend/models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  status: { type: String, enum: ["Pending", "On Hold", "Completed"], default: "Pending" }, // ✅ add this
});

export default mongoose.model("Task", taskSchema);