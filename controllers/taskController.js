const Task = require("../models/Task");
const User = require("../models/User");

module.exports = {
  addTask: async (req, res, next) => {
    try {
      const { userId } = req;
      const task = req.body;
      const user = await User.findById(userId);
      console.log(req.body);
      if (!user) return next(createError(400, "Wrong credentials!"));

      const newTask = new Task({ ...task, userId });
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
      console.log(tasks);
      return res.status(200).json({ tasks });
    } catch (err) {
      next(err);
    }
  },
};
