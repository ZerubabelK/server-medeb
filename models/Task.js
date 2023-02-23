const mongoose = require("mongoose");
const Subtask = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  done: {
    type: Boolean,
    default: false,
  },
});
const task = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  subtasks: [Subtask],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  done: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Task", task);
