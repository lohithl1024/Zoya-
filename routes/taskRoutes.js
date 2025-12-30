// routes/taskRoutes.js

const express = require("express");
const router = express.Router();

const {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

// CREATE
router.post("/", addTask);

// READ
router.get("/", getTasks);

// UPDATE
router.put("/:id", updateTask);

// DELETE
router.delete("/:id", deleteTask);

module.exports = router;