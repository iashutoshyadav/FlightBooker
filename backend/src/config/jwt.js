import config from './environment.js';

export const jwtConfig = {
  secret: config.jwtSecret,
  expiresIn: config.jwtExpiresIn || '1d',
  issuer: 'flight-booking-system',
};
