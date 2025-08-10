import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import CORS from "cors";
import sequelize from "./database/connection";
import router from "./routes";

// export function setRoutes(app: any) {
// 	app.get("/", (req: Request, res: Response) => {
// 		res.send("Hello, World!");
// 	});
// }

dotenv.config();
sequelize
	.sync({ force: false })
	.then(() => console.log("db connected successfully"))
	.catch((error) => console.log("error connecting database", error));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(CORS({ origin: ["http://localhost:3000"] }));
app.use(express.json());
app.use(router);
app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "App running perfectly" });
});

app.listen(PORT, () => {
	console.log(`App running perfectly on port ${PORT} `);
});
