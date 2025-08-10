"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTaskStatus = exports.retrieveTaskById = exports.retrieveAllTasks = exports.createTask = void 0;
const tasks_1 = __importDefault(require("../database/models/tasks"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, dueDate } = req.body;
    try {
        console.log(title, "task title");
        console.log(description, "task description");
        console.log(status, "task status");
        console.log(dueDate, "task due date");
        // console.log(userId, "user id");
        const createdTask = yield tasks_1.default.create({
            title,
            status,
            dueDate,
            description,
        });
        res.status(201).json({ message: "task successfully created" });
    }
    catch (error) {
        console.log(error);
        res.status(501).json({ message: "Error creating task", error });
    }
});
exports.createTask = createTask;
const retrieveAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTasks = yield tasks_1.default.findAll({
            attributes: ["id", "title", "status", "description", "user_id"],
        });
        res.status(200).json({ message: "Tasks", newTasks });
    }
    catch (error) {
        res.status(500).json({ message: "error finding tasks", error });
    }
});
exports.retrieveAllTasks = retrieveAllTasks;
const retrieveTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const task = yield tasks_1.default.findOne({ where: { id } });
        res.status(200).json({ message: "Tasks by id", task });
    }
    catch (err) {
        res.status(500).json({ message: "Error geting tasks by id", err });
    }
});
exports.retrieveTaskById = retrieveTaskById;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log(id, status);
        const updateStatus = yield tasks_1.default.findOne({ where: { id } });
        if (updateStatus !== null) {
            updateStatus.status = status;
            updateStatus.save();
            res.status(200).json({ updateStatus, message: "Updated Status" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error updating status", err });
    }
});
exports.updateTaskStatus = updateTaskStatus;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedTask = yield tasks_1.default.destroy({ where: { id: id } });
        res.status(200).json({ deletedTask, message: "Task successfully deleted." });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});
exports.deleteTask = deleteTask;
