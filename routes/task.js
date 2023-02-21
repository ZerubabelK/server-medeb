const express = require("express");
const {
  getTasksForUser,
  addTask,
  deleteTask,
} = require("../controllers/taskController");
const authentication = require("../middleware/authentication");

const router = express.Router();

router
  .get("/tasks", authentication, getTasksForUser)
  .post("/tasks/add", authentication, addTask)
  .delete("/tasks/:id", authentication, deleteTask);

module.exports = router;
