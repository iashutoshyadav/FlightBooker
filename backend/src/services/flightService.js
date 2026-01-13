import prisma from '../config/database.js';

export class FlightService {
  async searchFlights({ departureCity, arrivalCity }) {
    const where = {};
    if (departureCity) {
      where.departureCity = {
        contains: departureCity,
        mode: 'insensitive',
      };
    }
    if (arrivalCity) {
      where.arrivalCity = {
        contains: arrivalCity,
        mode: 'insensitive',
      };
    }
    const flights = await prisma.flight.findMany({
      where,
      take: 10,
      orderBy: {
        departureTime: 'asc',
      },
    });
    return flights.map(flight => ({
      ...flight,
      basePrice: parseFloat(flight.basePrice.toString()),
    }));
  }
  async getFlightById(flightId) {
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    });
    if (!flight) {
      throw new Error('Flight not found');
    }
    return {
      ...flight,
      basePrice: parseFloat(flight.basePrice.toString()),
    };
  }

  async getAllFlights() {
    const flights = await prisma.flight.findMany({
      orderBy: {
        departureTime: 'asc',
      },
    });
    return flights.map(flight => ({
      ...flight,
      basePrice: parseFloat(flight.basePrice.toString()),
    }));
  }
}

export default new FlightService();