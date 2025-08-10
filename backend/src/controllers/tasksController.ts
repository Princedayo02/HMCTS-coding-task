import { Request, Response } from "express";
import Tasks from "../database/models/tasks";

export const createTask = async (req: Request, res: Response) => {
	const { title, description, status, dueDate } = req.body;
	try {
		console.log(title, "task title");
		console.log(description, "task description");
		console.log(status, "task status");
		console.log(dueDate, "task due date");
		// console.log(userId, "user id");
		const createdTask = await Tasks.create({
			title,
			status,
			dueDate,
			description,
		});
		res.status(201).json({ message: "task successfully created" });
	} catch (error) {
		console.log(error);
		res.status(501).json({ message: "Error creating task", error });
	}
};

export const retrieveAllTasks = async (req: Request, res: Response) => {
	try {
		const newTasks = await Tasks.findAll({
			attributes: ["id", "title", "status", "description", "user_id"],
		});
		res.status(200).json({ message: "Tasks", newTasks });
	} catch (error) {
		res.status(500).json({ message: "error finding tasks", error });
	}
};

export const retrieveTaskById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		console.log(id);
		const task = await Tasks.findOne({ where: { id } });
		res.status(200).json({ message: "Tasks by id", task });
	} catch (err) {
		res.status(500).json({ message: "Error geting tasks by id", err });
	}
};

export const updateTaskStatus = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		console.log(id, status);
		const updateStatus = await Tasks.findOne({ where: { id } });
		if (updateStatus !== null) {
			updateStatus.status = status;
			updateStatus.save();
			res.status(200).json({ updateStatus, message: "Updated Status" });
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Error updating status", err });
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const deletedTask = await Tasks.destroy({ where: { id: id } });
		res.status(200).json({ deletedTask, message: "Task successfully deleted." });
	} catch (error) {
		res.status(500).json({ message: "Error deleting task", error });
	}
};
