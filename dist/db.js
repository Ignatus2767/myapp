"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// myapp/src/db.ts
const promise_1 = __importDefault(require("mysql2/promise"));
<<<<<<< HEAD
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
=======
// Use environment variables for sensitive information
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = pool;
