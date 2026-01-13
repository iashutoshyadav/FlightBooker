import prisma from '../config/database.js';
import config from '../config/environment.js';

export class PricingService {
  async calculatePrice(userId, flightId) {
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
      select: { basePrice: true },
    });
    if (!flight) {
      throw new Error('Flight not found');
    }

    const basePrice = parseFloat(flight.basePrice.toString());
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentAttempts = await prisma.bookingAttempt.count({
      where: {
        userId,
        flightId,
        attemptedAt: {
          gte: fiveMinutesAgo,
        },
      },
    });

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const attemptsInTenMin = await prisma.bookingAttempt.count({
      where: {
        userId,
        flightId,
        attemptedAt: {
          gte: tenMinutesAgo,
        },
      },
    });

    let surgeApplied = false;
    let surgePercentage = 0;
    let finalPrice = basePrice;

    if (attemptsInTenMin > 0 && recentAttempts >= config.surgePricingThreshold) {
      surgePercentage = config.surgePricingPercentage;
      surgeApplied = true;
      finalPrice = basePrice * (1 + surgePercentage / 100);
    }
    return {
      basePrice,
      finalPrice: Math.round(finalPrice * 100) / 100,
      surgeApplied,
      surgePercentage,
      attemptsInWindow: recentAttempts,
    };
  }

  async recordAttempt(userId, flightId) {
    await prisma.bookingAttempt.create({
      data: {
        userId,
        flightId,
      },
    });
  }

  async cleanupOldAttempts() {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const result = await prisma.bookingAttempt.deleteMany({
      where: {
        attemptedAt: {
          lt: tenMinutesAgo,
        },
      },
    });

    return result.count;
  }
}

export default new PricingService();