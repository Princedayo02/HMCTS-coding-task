"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./database/connection"));
const routes_1 = __importDefault(require("./routes"));
// export function setRoutes(app: any) {
// 	app.get("/", (req: Request, res: Response) => {
// 		res.send("Hello, World!");
// 	});
// }
dotenv_1.default.config();
connection_1.default
    .sync({ force: false })
    .then(() => console.log("db connected successfully"))
    .catch((error) => console.log("error connecting database", error));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)({ origin: ["http://localhost:3000"] }));
app.use(express_1.default.json());
app.use(routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ message: "App running perfectly" });
});
app.listen(PORT, () => {
    console.log(`App running perfectly on port ${PORT} `);
});
