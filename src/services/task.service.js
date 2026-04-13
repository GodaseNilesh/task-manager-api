const Task = require("../models/task.model");

const createTask = async (DataTransfer, userId) => {
  const existingTask = await Task.findOne({
    title: DataTransfer.title,
    createdBy: userId,
  });

  if (existingTask) {
    throw new Error("Task with same title already exists");
  }
  const task = await Task.create({
    ...DataTransfer,
    createdBy: userId,
  });

  return task;
};

const getAllTasks = async (user, query) => {
  const { page = 1, limit = 5, status } = query;
  const filter = {};

  // Role-based filter
  if (user.role !== "admin") {
    filter.$or = [{ createdBy: user.userId }, { assignedTo: user.userId }];
  }

  // Status filter
  if (status) {
    filter.status = status;
  }

  const tasks = await Task.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  return tasks;
};

const getTaskById = async (taskId, user) => {
  const task = await Task.findById(taskId);

  if (!task) throw new Error("Task not found");

  // Admin → allow
  if (user.role !== "admin") {
    const isOwner = task.createdBy.toString() === user.userId;
    const isAssigned =
      task.assignedTo && task.assignedTo.toString() === user.userId;

    if (!isOwner && !isAssigned) {
      throw new Error("Access denied");
    }
  }

  return task;
};

const updateTaskById = async (taskId, data, user) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");

  // Admin → full access
  if (user.role !== "admin") {
    const isCreator = task.createdBy.toString() === user.userId;
    const isAssigned =
      task.assignedTo && task.assignedTo.toString() === user.userId;

    if (!isCreator && !isAssigned) {
      throw new Error("You are not allowed to update this task");
    }

    // Assigned user → only status
    if (!isCreator) {
      if (!isCreator) {
        const allowedFields = ["status"];

        const attemptedFields = Object.keys(data);

        const invalidFields = attemptedFields.filter(
          (field) => !allowedFields.includes(field),
        );

        if (invalidFields.length > 0) {
          throw new Error(
            `Assigned users can only update status. Invalid fields: ${invalidFields.join(", ")}`,
          );
        }
      }
      data = { status: data.status };
    }
  }

  return Task.findByIdAndUpdate(taskId, data, { new: true });
};

const deleteTaskById = async (taskId, user) => {
  const task = await Task.findById(taskId);

  if (!task) throw new Error("Task not found");

  // Admin → allow
  if (user.role !== "admin") {
    // Only creator can delete
    if (task.createdBy.toString() !== user.userId) {
      throw new Error("You can delete only your own tasks");
    }
  }

  await Task.findByIdAndDelete(taskId);
  return { message: "Task deleted successfully" };
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
