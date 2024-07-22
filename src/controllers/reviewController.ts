<<<<<<< HEAD
// myapp/src/controllers/reviewController.ts
import { Request, Response } from 'express';
import pool from '../db'; // Ensure that db.ts is correctly located in the parent directory

export const getReviews = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reviews');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching reviews:', error); // Log the error
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

export const addReview = async (req: Request, res: Response) => {
  const { username, comment, rating } = req.body;
  try {
    await pool.query('INSERT INTO reviews (username, comment, rating) VALUES (?, ?, ?)', [username, comment, rating]);
    console.log('Review added successfully'); // Log the success message
    res.json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error); // Log the error
    res.status(500).json({ success: false, message: 'Error adding review' });
  }
=======
import { VercelRequest, VercelResponse } from '@vercel/node';
import { addReview, getReviews, Review } from '../models/reviewModel';

export const handleAddReview = (req: VercelRequest, res: VercelResponse) => {
    console.log('Received add review request');
    const { username, productId, rating, comment } = req.body;
    const newReview: Review = { username, productId, rating: Number(rating), comment, date: new Date() };

    addReview(newReview);
    res.send('Review submitted successfully!');
};

export const handleGetReviews = (req: VercelRequest, res: VercelResponse) => {
    console.log('Received get reviews request');
    const reviews = getReviews();
    res.json(reviews);
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
};

