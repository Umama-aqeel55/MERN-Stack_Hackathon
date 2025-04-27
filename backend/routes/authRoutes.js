// routes/authRoutes.js
import { Router } from 'express';
import { login } from '../controllers/authController.js'; // Adjusted for ES Modules
const router = Router();

router.post('/login', login);

export default router;
