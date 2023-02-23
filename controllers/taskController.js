const Task = require("../models/Task");
const User = require("../models/User");

module.exports = {
  addTask: async (req, res, next) => {
    try {
      const { userId } = req;
      const task = req.body;
      const user = await User.findById(userId);
      if (!user) return next(createError(400, "Wrong credentials!"));
      const newTask = new Task({
        ...task,
        userId,
      });
      await newTask.save();
      return res.status(200).json({ task: newTask, success: false });
    } catch (err) {
      next(err);
    }
  },

  deleteTask: async (req, res, next) => {
    const { id } = req.params;
    if (!id) return res.json({ message: "Id required", success: false });
    try {
      await Task.findByIdAndDelete(id);
      console.log(id);
      res.json({ message: "Successfully deleted task", success: true });
    } catch (err) {
      next(err);
    }
  },

  getTasksForUser: async (req, res, next) => {
    try {
      const { userId } = req;
      const tasks = await Task.find({ userId });
      return res.status(200).json({ tasks });
    } catch (err) {
      next(err);
    }
  },
  changeStatusOfSubtask: async (req, res, next) => {
    try {
      const { userId } = req;
      const { id } = req.params;
      const { value, taskId } = req.body;
      const task = await Task.findById(taskId);
      if (!task) return next(createError(404, "Wrong credentials!"));
      const index = task.subtasks.findIndex((subtask) => subtask._id == id);
      if (index < 0) return next(createError(404, "Wrong credentials!"));
      task.subtasks[index].done = value;
      task.save();
      console.log(task);
      res.status(200).json({ task });
    } catch (err) {
      next(err);
    }
  },
  changeStatusOfTask: async (req, res, next) => {
    try {
      const { userId } = req;
      const { taskId } = req.params;
      const { task } = req.body;
      const newTask = await Task.findByIdAndUpdate(taskId, task);
      if (!task) return next(createError(404, "Wrong credentials!"));
      const index = task.subtasks.findIndex(
        (subtask) => subtask._id == subtaskId
      );
      if (index < 0) return next(createError(404, "Wrong credentials!"));
      task.subtasks[index].done = value;
      res
        .status(200)
        .json({ message: "Successfully updated subtask", success: true });
    } catch (err) {
      next(err);
    }
  },
  deleteTask: async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await Task.findByIdAndDelete(id);
      if (!response) return next(createError(404, "Wrong credentials!"));
      res.status(404).json({ success: true, message: response });
    } catch (error) {
      return res.status(404);
    }
  },
};
