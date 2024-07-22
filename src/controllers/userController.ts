<<<<<<< HEAD
// myapp/src/controllers/userController.ts
import { Request, Response } from 'express';
import pool from '../db'; // Ensure that db.ts is correctly located in the parent directory
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
=======
import bcrypt from 'bcrypt';
import pool from '../db';
import { VercelRequest, VercelResponse } from '@vercel/node';

export const handleSignUp = async (req: VercelRequest, res: VercelResponse) => {
  const { fullname, email, username, password, country } = req.body;
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838

// Setup your email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  }
});

export const handleSignUp = async (req: Request, res: Response) => {
    const { fullname, email, username, password, country } = req.body;
  
    try {
      const [existingUsers] = await pool.query<any[]>(
        'SELECT * FROM users WHERE email = ? OR username = ?',
        [email, username]
      );
  
      if (existingUsers.length > 0) {
        if (existingUsers[0].email === email) {
          return res.status(400).json({ success: false, message: 'Email already exists.' });
        }
        if (existingUsers[0].username === username) {
          return res.status(400).json({ success: false, message: 'Username already exists.' });
        }
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const [result] = await pool.query(
        'INSERT INTO users (fullname, email, username, password, country) VALUES (?, ?, ?, ?, ?)',
        [fullname, email, username, hashedPassword, country]
      );
  
      console.log('Sign up successful:', result);
      res.status(201).json({ success: true, message: 'Sign up successful' });
    } catch (error) {
      console.error('Error during sign up:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
<<<<<<< HEAD
  
export const handleSignIn = async (req: Request, res: Response) => {
=======

export const handleSignIn = async (req: VercelRequest, res: VercelResponse) => {
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
  const { email, password } = req.body;

  try {

    console.log(`Attempting sign-in for email: ${email}`);

    // Find the user by email
    const [users] = await pool.query<any[]>(
      'SELECT * FROM users WHERE LOWER(email) = LOWER(?)',
      [email]
    );

    console.log(`Users found: ${users.length}`);

    if (users.length === 0) {
      console.log('User not found');
      return res.status(400).json({ success: false, message: 'User not found.' });
    }

    const user = users[0];

    console.log(`User found: ${JSON.stringify(user)}`);

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match status: ${isPasswordMatch}`);

    if (!isPasswordMatch) {
      console.log('Incorrect password');
      return res.status(400).json({ success: false, message: 'Incorrect password.' });
    }

    console.log('Sign in successful');
    res.status(200).json({ success: true, message: 'Sign in successful' });
  } catch (error) {
    console.error('Error during sign in:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
<<<<<<< HEAD

export const handleForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
      // Check if the email exists
      const [users] = await pool.query<any[]>(
          'SELECT * FROM users WHERE email = ?',
          [email]
      );

      if (users.length === 0) {
          return res.status(400).json({ success: false, message: 'Email not found.' });
      }

      const user = users[0];
      const resetToken = generateResetToken(); // Implement this function
      const resetUrl = `http://yourdomain.com/reset-password?token=${resetToken}`;

      // Store the reset token in the database (you should implement this)
      await pool.query('UPDATE users SET reset_token = ? WHERE email = ?', [resetToken, email]);

      // Send reset email
      await transporter.sendMail({
          to: email,
          subject: 'Password Reset Request',
          text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`
      });

      res.json({ success: true, message: 'Password reset link sent to your email.' });
  } catch (error) {
      console.error('Error during forgot password request:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Function to generate a reset token
const generateResetToken = () => {
  // Implement a secure token generation
  return Math.random().toString(36).substr(2);
};

export const handleResetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
      // Find the user with the reset token
      const [users] = await pool.query<any[]>(
          'SELECT * FROM users WHERE reset_token = ?',
          [token]
      );

      if (users.length === 0) {
          return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
      }

      const user = users[0];
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password and clear the reset token
      await pool.query('UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?', [hashedPassword, token]);

      res.json({ success: true, message: 'Password reset successfully.' });
  } catch (error) {
      console.error('Error during password reset:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
=======
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
