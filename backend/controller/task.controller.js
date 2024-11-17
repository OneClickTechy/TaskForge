import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    if (!userId) {
      return res.status(404).json({ error: "userId not found" });
    }
    const {
      name,
      description,
      duedate,
      priority,
      label,
      completed,
    } = req.body;
    if (!name || !description || !duedate) {
      return res.status(400).json({ error: "please fill all fields" });
    }
    
    const existTask = await Task.findOne({ name, userId });

    if (existTask) {
      return res
        .status(400)
        .json({ error: "task with same name already exist" });
    }

    const newTask = new Task({
      name,
      description,
      duedate,
      priority,
      label,
      completed,
      userId,
    });

    const savedTask = await newTask.save();

    res.status(201).json({message: "Task Saved",
      savedTask});
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

export const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user; //current user id

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "Access denied. Not authorized to view this task." });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: ` Internal server error: ${error}` });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    if (!userId) {
      return res.status(404).json({ error: "userId not found" });
    }
    const userTasks = await Task.find({ userId });

    res.status(200).json(userTasks);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: ` Internal server error: ${error}` });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; //current task id

    const { _id: currentUserId } = req.user; //current user id

    const {
      name,
      description,
      duedate,
      priority,
      label,
      completed,
      _id, //req task id
    } = req.body;
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ error: "No field provided for update" });
    }
    const existTask = await Task.findById(id);
    if (
      !existTask ||
      existTask.userId.toString() !== currentUserId.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Access denied. Not authorized to update this task." });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, description, duedate, priority, label, completed },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: ` Internal server error: ${error}` });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "Access denied. Not authorized to update this task." });
    }
    await task.deleteOne();
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" + error.message });
  }
};
