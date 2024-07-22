<<<<<<< HEAD
=======
import express from 'express';
import path from 'path';
import userRoutes from './api/user';
import reviewRoutes from './api/review';
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838

import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
