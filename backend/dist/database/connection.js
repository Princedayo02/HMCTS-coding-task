"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config();
const port = Number(process.env.DB_PORT);
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    port: port,
    host: process.env.DB_HOST || "",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    models: [(0, path_1.join)(__dirname, "models")],
    logging: false,
    // dialectOptions: { ssl: { required: true } },
});
exports.default = sequelize;
