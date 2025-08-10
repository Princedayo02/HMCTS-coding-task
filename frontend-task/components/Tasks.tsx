"use client";
import React, { useEffect, useState } from "react";
import { axiosClientConfig } from "@/axiosCofig";

type Status = "todo" | "in_progress" | "completed";
type Task = {
	id: string;
	title: string;
	description?: string;
	status: Status;
	dueDate?: string;
	createdAt?: string;
};
const STATUS_LABELS: Record<Status, string> = {
	todo: "To do",
	in_progress: "In progress",
	completed: "Completed",
};
function uid(prefix = "t") {
	return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
export default function TaskManager() {
	useEffect(() => {
		getAllTasks();
	}, []);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState<Status>("todo");
	const [due, setDue] = useState<string>("");
	const [searchId, setSearchId] = useState("");
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	async function createTask() {
		if (!title.trim()) return alert("Title is required");
		const newTask: Task = {
			id: uid(),
			title: title.trim(),
			description: description.trim() || undefined,
			status,
			dueDate: due || undefined,
			createdAt: new Date().toISOString(),
		};
		await axiosClientConfig().post("/task", { ...newTask });

		setTasks((s) => [newTask, ...s]);
		setTitle("");
		setDescription("");
		setStatus("todo");
		setDue("");
	}
	async function getTaskById(id: string): Promise<Task | undefined> {
		const response = await axiosClientConfig().get(`/task/${id}`);
		console.log(response.data.task);
		setSearchId(response.data.task.id);
		return tasks.find((t) => t.id === id);
	}
	async function getAllTasks() {
		const response = await axiosClientConfig().get("/task");
		console.log(response.data.newTasks);
		setTasks(response.data.newTasks);
		return tasks;
	}
	async function updateTaskStatus(id: string, next: Status) {
		const response = await axiosClientConfig().put(`task/${id}`, { status: next });
		setSelectedTask(response.data.updateStatus);
		setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: next } : t)));
		if (selectedTask?.id === id) setSelectedTask((s) => (s ? { ...s, status: next } : s));
	}
	async function deleteTask(id: string) {
		const response = await axiosClientConfig().delete(`task/${id}`);
		setSelectedTask(response.data);
		if (!confirm("Delete this task?")) return;
		setTasks((prev) => prev.filter((t) => t.id !== id));
		if (selectedTask?.id === id) setSelectedTask(null);
	}
	const grouped = {
		todo: tasks.filter((t) => t.status === "todo"),
		in_progress: tasks.filter((t) => t.status === "in_progress"),
		completed: tasks.filter((t) => t.status === "completed"),
	};
	return (
		<div className="p-6 max-w-5xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Task Manager</h1>
			<div className="bg-white shadow rounded-lg p-4 mb-6">
				<h2 className="font-semibold mb-2">Create Task</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
					<input
						className="border rounded p-2 col-span-1 md:col-span-2"
						placeholder="Title (required)"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<select className="border rounded p-2" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
						<option value="todo">To do</option>
						<option value="in-progress">In progress</option>
						<option value="completed">Completed</option>
					</select>
					<textarea
						className="border rounded p-2 md:col-span-3"
						placeholder="Description (optional)"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={3}
					/>
					<input
						type="datetime-local"
						className="border rounded p-2"
						value={due}
						onChange={(e) => setDue(e.target.value)}
					/>
					<div className="md:col-span-3 flex gap-2">
						<button
							onClick={createTask}
							className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700">
							Create Task
						</button>
						<button
							onClick={() => {
								setTitle("");
								setDescription("");
								setStatus("todo");
								setDue("");
							}}
							className="px-4 py-2 border rounded">
							Reset
						</button>
						<div className="ml-auto text-sm text-gray-500 self-center">
							{tasks.length} task{tasks.length !== 1 ? "s" : ""}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white shadow rounded-lg p-4 mb-6">
				<h2 className="font-semibold mb-2">Retrieve</h2>
				<div className="flex gap-2 flex-col md:flex-row">
					<div className="flex gap-2">
						<input
							placeholder="Search by ID"
							className="border rounded p-2 w-64"
							value={searchId}
							onChange={(e) => setSearchId(e.target.value)}
						/>
						<button
							onClick={async () => {
								const t = await getTaskById(searchId.trim());
								if (!t) {
									alert("Task not found");
									setSelectedTask(null);
								} else setSelectedTask(t);
							}}
							className="px-3 py-2 border rounded">
							Get by ID
						</button>
						<button
							onClick={async () => {
								const all = await getAllTasks();
								alert(
									`There are ${all.length} task${
										all.length !== 1 ? "s" : ""
									}. Check the list below.`
								);
							}}
							className="px-3 py-2 border rounded">
							Get All
						</button>
					</div>
					<div className="flex-1 text-sm text-gray-600">
						Tip: Click a task below to select it and operate on it (update status / delete).
					</div>
				</div>
				{selectedTask && (
					<div className="mt-4 border rounded p-3 bg-gray-50">
						<div className="flex items-start gap-4">
							<div>
								<div className="text-lg font-medium">{selectedTask.title}</div>
								<div className="text-xs text-gray-500">ID: {selectedTask.id}</div>
								<div className="text-sm mt-2">
									{selectedTask.description || (
										<em className="text-gray-400">No description</em>
									)}
								</div>
								<div className="text-sm mt-2">
									Status: <strong>{STATUS_LABELS[selectedTask.status]}</strong>
								</div>
								<div className="text-sm text-gray-600">Due: {selectedTask.dueDate ?? "—"}</div>
							</div>
							<div className="ml-auto flex gap-2">
								<select
									value={selectedTask.status}
									onChange={(e) => updateTaskStatus(selectedTask.id, e.target.value as Status)}
									className="border rounded p-2">
									<option value="todo">To do</option>
									<option value="in_progress">In progress</option>
									<option value="completed">Completed</option>
								</select>
								<button
									onClick={() => deleteTask(selectedTask.id)}
									className="px-3 py-2 bg-red-600 text-white rounded">
									Delete
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{(["todo", "in_progress", "completed"] as Status[]).map((s) => (
					<div key={s} className="bg-white shadow rounded-lg p-4">
						<h3 className="font-semibold mb-2">{STATUS_LABELS[s]}</h3>
						<div className="space-y-3">
							{grouped[s].length === 0 ? (
								<div className="text-sm text-gray-500">No tasks</div>
							) : (
								grouped[s].map((t: Task) => (
									<div
										key={t.id}
										onClick={() => setSelectedTask(t)}
										className="border rounded p-3 hover:bg-gray-50 cursor-pointer">
										<div className="flex items-start gap-2">
											<div className="flex-1">
												<div className="font-medium">{t.title}</div>
												<div className="text-xs text-gray-500">
													ID: {t.id}
												</div>
												<div className="text-sm text-gray-700 mt-1 truncate">
													{t.description}
												</div>
											</div>
											<div className="text-right text-xs text-gray-500">
												<div>Due</div>
												<div className="text-sm">{t.dueDate ?? "—"}</div>
											</div>
										</div>
										<div className="mt-2 flex gap-2">
											<select
												value={t.status}
												onChange={(e) =>
													updateTaskStatus(
														t.id,
														e.target.value as Status
													)
												}
												className="border rounded p-1 text-sm">
												<option value="todo">To do</option>
												<option value="in_progress">In progress</option>
												<option value="completed">Completed</option>
											</select>
											<button
												onClick={() => deleteTask(t.id)}
												className="px-2 py-1 text-sm border rounded">
												Delete
											</button>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
