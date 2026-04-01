import Task from "../models/Task.js";

// Get all tasks (with optional filtering)
export const getTasks = async (req, res) => {
  try {
    const { priority, completed } = req.query;

    const filter = {};

    if (priority) filter.priority = priority;

    // ✅ FIX: proper boolean handling (important for mobile requests)
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task (status, priority, title etc.)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after", // ✅ correct
        runValidators: true,     // ✅ ensures proper schema validation
      }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// Create task
export const createTask = async (req, res) => {
  try {
    const { title, priority } = req.body;

    if (!title || !priority) {
      return res.status(400).json({ message: "Title and priority required" });
    }

    const task = new Task({
      title,
      priority,
      status: "Pending", // ✅ consistent default
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle completion using status
export const toggleTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ safer toggle logic
    if (task.status === "Completed") {
      task.status = "Pending";
    } else {
      task.status = "Completed";
    }

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};