"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// myapp/src/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController"); // Ensure the path is correct
const router = (0, express_1.Router)();
router.post('/signup', userController_1.handleSignUp);
router.post('/signin', userController_1.handleSignIn);
exports.default = router;
