import express from 'express';
import cors from 'cors';
import config from './config/environment.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import { apiLimiter } from './middleware/rateLimiter.middleware.js';
import logger from './utils/logger.js';

const app = express();

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiLimiter);

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

app.use('/api', routes);
app.use('/tickets', express.static('tickets'));
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Flight Booking API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      flights: '/api/flights',
      bookings: '/api/bookings',
      user: '/api/user',
    },
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;