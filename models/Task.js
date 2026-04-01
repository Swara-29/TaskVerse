import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Priority is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "OnHold", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);