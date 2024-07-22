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
exports.handleResetPassword = exports.handleForgotPassword = exports.handleSignIn = exports.handleSignUp = void 0;
const db_1 = __importDefault(require("../db")); // Ensure that db.ts is correctly located in the parent directory
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Setup your email transporter
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const handleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, username, password, country } = req.body;
    try {
        const [existingUsers] = yield db_1.default.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existingUsers.length > 0) {
            if (existingUsers[0].email === email) {
                return res.status(400).json({ success: false, message: 'Email already exists.' });
            }
            if (existingUsers[0].username === username) {
                return res.status(400).json({ success: false, message: 'Username already exists.' });
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const [result] = yield db_1.default.query('INSERT INTO users (fullname, email, username, password, country) VALUES (?, ?, ?, ?, ?)', [fullname, email, username, hashedPassword, country]);
        console.log('Sign up successful:', result);
        res.status(201).json({ success: true, message: 'Sign up successful' });
    }
    catch (error) {
        console.error('Error during sign up:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.handleSignUp = handleSignUp;
const handleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        console.log(`Attempting sign-in for email: ${email}`);
        // Find the user by email
        const [users] = yield db_1.default.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email]);
        console.log(`Users found: ${users.length}`);
        if (users.length === 0) {
            console.log('User not found');
            return res.status(400).json({ success: false, message: 'User not found.' });
        }
        const user = users[0];
        console.log(`User found: ${JSON.stringify(user)}`);
        // Compare the password
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        console.log(`Password match status: ${isPasswordMatch}`);
        if (!isPasswordMatch) {
            console.log('Incorrect password');
            return res.status(400).json({ success: false, message: 'Incorrect password.' });
        }
        console.log('Sign in successful');
        res.status(200).json({ success: true, message: 'Sign in successful' });
    }
    catch (error) {
        console.error('Error during sign in:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.handleSignIn = handleSignIn;
const handleForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        // Check if the email exists
        const [users] = yield db_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ success: false, message: 'Email not found.' });
        }
        const user = users[0];
        const resetToken = generateResetToken(); // Implement this function
        const resetUrl = `http://yourdomain.com/reset-password?token=${resetToken}`;
        // Store the reset token in the database (you should implement this)
        yield db_1.default.query('UPDATE users SET reset_token = ? WHERE email = ?', [resetToken, email]);
        // Send reset email
        yield transporter.sendMail({
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`
        });
        res.json({ success: true, message: 'Password reset link sent to your email.' });
    }
    catch (error) {
        console.error('Error during forgot password request:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.handleForgotPassword = handleForgotPassword;
// Function to generate a reset token
const generateResetToken = () => {
    // Implement a secure token generation
    return Math.random().toString(36).substr(2);
};
const handleResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    try {
        // Find the user with the reset token
        const [users] = yield db_1.default.query('SELECT * FROM users WHERE reset_token = ?', [token]);
        if (users.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
        }
        const user = users[0];
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        // Update the user's password and clear the reset token
        yield db_1.default.query('UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?', [hashedPassword, token]);
        res.json({ success: true, message: 'Password reset successfully.' });
    }
    catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.handleResetPassword = handleResetPassword;
