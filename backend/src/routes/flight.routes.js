import express from 'express';
import {
  searchFlights,
  getFlightPrice,
  getAllFlights,
  getFlightById
} from '../controllers/flightController.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/search', searchFlights);
router.get('/all', getAllFlights);
router.get('/:flightId/price', getFlightPrice);
router.get('/:flightId', getFlightById);

export default router;
