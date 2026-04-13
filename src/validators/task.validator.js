const validateTask = (data) => {
  const { title, status, priority } = data;

  if (!title) return "Title is required";

  const validStatus = ["todo", "in-progress", "done"];
  if (status && !validStatus.includes(status)) {
    return "Invalid status value";
  }

  const validPriority = ["low", "medium", "high"];
  if (priority && !validPriority.includes(priority)) {
    return "Invalid priority value";
  }

  return null;
};

module.exports = { validateTask };
