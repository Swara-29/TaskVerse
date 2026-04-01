import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion
} from "../controllers/taskController.js";

const router = express.Router();

// Task routes
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/toggle/:id", toggleTaskCompletion); // Toggle completion

export default router;