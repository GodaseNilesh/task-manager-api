const taskService = require("../services/task.service");
const { validateTask } = require("../validators/task.validator");

const createTask = async (req, res, next) => {
  try {
    const error = validateTask(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const task = await taskService.createTask(req.body, req.user.userId);
    res.status(201).json({
      message: "Task created successfully",
      data: task,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks(req.user, req.query);
    res.json({
      data: tasks,
      success: true,
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await await taskService.getTaskById(req.params.id, req.user);
    res.json({
      data: task,
      success: true,
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskById = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskById(
      req.params.id,
      req.body,
      req.user,
    );

    res.json({
      message: "Task updated successfully",
      data: task,
      success: true
    });
  } catch (error) {
    next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  try {
    const result = await taskService.deleteTaskById(req.params.id, req.user);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
