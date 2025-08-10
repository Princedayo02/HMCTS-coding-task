import { Model, Column, Table, DataType, PrimaryKey, BelongsTo } from "sequelize-typescript";

@Table({ timestamps: true })
class Tasks extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, allowNull: false })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare title: string;

	@Column({ type: DataType.STRING })
	declare description: string;

	@Column({ type: DataType.ENUM("todo", "in_progress", "completed"), allowNull: true, defaultValue: "not_started" })
	declare status: "todo" | "in_progress" | "completed";

	@Column({ type: DataType.STRING })
	declare dueDate: string;
}

export default Tasks;
