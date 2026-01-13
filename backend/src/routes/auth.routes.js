import express from 'express';
import { register,login,getProfile } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

router.post('/register',authLimiter,register);
router.post('/login',authLimiter,login);
router.post('/profile',authenticate,getProfile);

export default router;