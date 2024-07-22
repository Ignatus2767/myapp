"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
=======
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("./api/user"));
const review_1 = __importDefault(require("./api/review"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/users', user_1.default);
app.use('/api/reviews', review_1.default); // Ensure this is correct
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/kojo.html'));
});
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
