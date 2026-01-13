import express from 'express';
import { getWalletBalance,getTransactionHistory,addMoney } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);
router.get('/wallet/balance', getWalletBalance);
router.get('/wallet/transactions', getTransactionHistory);
router.post('/wallet/add', addMoney);

export default router;