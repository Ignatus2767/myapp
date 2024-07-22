// myapp/src/routes/userRoutes.ts
import { Router } from 'express';
import { handleSignUp, handleSignIn } from '../controllers/userController'; // Ensure the path is correct

const router = Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);

export default router;

