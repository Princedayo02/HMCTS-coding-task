import { Router } from "express";
import express from "express";
import { createTask, retrieveAllTasks, retrieveTaskById, deleteTask, updateTaskStatus } from "../controllers/tasksController";
import "dotenv/config";

const router = Router();

//Tasks routes
router.post("/task", createTask);
router.get("/task", retrieveAllTasks);
router.get("/task/:id", retrieveTaskById);
router.put("/task/:id", updateTaskStatus);
router.delete("/task/:id", deleteTask);

export default router;
