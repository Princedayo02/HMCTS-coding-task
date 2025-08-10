"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasksController_1 = require("../controllers/tasksController");
require("dotenv/config");
const router = (0, express_1.Router)();
//Tasks routes
router.post("/task", tasksController_1.createTask);
router.get("/task", tasksController_1.retrieveAllTasks);
router.get("/task/:id", tasksController_1.retrieveTaskById);
router.put("/task/:id", tasksController_1.updateTaskStatus);
router.delete("/task/:id", tasksController_1.deleteTask);
exports.default = router;
