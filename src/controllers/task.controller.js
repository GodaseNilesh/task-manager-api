const taskService = require("../services/task.service");
const { validateTask } = require("../validators/task.validator");

const createTask = async (req, res) => {
  try {
    const error = validateTask(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const task = await taskService.createTask(req.body, req.user.userId);
    res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks(req.user);

    res.json({ data: tasks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await await taskService.getTaskById(req.params.id, req.user);
    res.json({ data: task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const task = await taskService.updateTaskById(req.params.id, req.body, req.user);

    res.json({
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const result = await taskService.deleteTaskById(req.params.id, req.user);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
