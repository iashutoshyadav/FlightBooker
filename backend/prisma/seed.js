import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const flights = [
  {
    flightId: 'AI202',
    airline: 'Air India',
    departureCity: 'Delhi',
    arrivalCity: 'Mumbai',
    departureTime: new Date('2026-02-15T06:00:00'),
    arrivalTime: new Date('2026-02-15T08:30:00'),
    basePrice: 2500,
  },
  {
    flightId: 'SG305',
    airline: 'SpiceJet',
    departureCity: 'Mumbai',
    arrivalCity: 'Bangalore',
    departureTime: new Date('2026-02-15T09:00:00'),
    arrivalTime: new Date('2026-02-15T11:00:00'),
    basePrice: 2200,
  },
  {
    flightId: 'UK891',
    airline: 'Vistara',
    departureCity: 'Delhi',
    arrivalCity: 'Bangalore',
    departureTime: new Date('2026-02-15T10:30:00'),
    arrivalTime: new Date('2026-02-15T13:00:00'),
    basePrice: 2800,
  },
  {
    flightId: '6E427',
    airline: 'IndiGo',
    departureCity: 'Bangalore',
    arrivalCity: 'Chennai',
    departureTime: new Date('2026-02-15T14:00:00'),
    arrivalTime: new Date('2026-02-15T15:30:00'),
    basePrice: 2100,
  },
  {
    flightId: 'AI540',
    airline: 'Air India',
    departureCity: 'Chennai',
    arrivalCity: 'Kolkata',
    departureTime: new Date('2026-02-15T16:00:00'),
    arrivalTime: new Date('2026-02-15T18:30:00'),
    basePrice: 2600,
  },
  {
    flightId: 'SG512',
    airline: 'SpiceJet',
    departureCity: 'Kolkata',
    arrivalCity: 'Hyderabad',
    departureTime: new Date('2026-02-16T07:00:00'),
    arrivalTime: new Date('2026-02-16T09:30:00'),
    basePrice: 2400,
  },
  {
    flightId: 'UK764',
    airline: 'Vistara',
    departureCity: 'Hyderabad',
    arrivalCity: 'Pune',
    departureTime: new Date('2026-02-16T11:00:00'),
    arrivalTime: new Date('2026-02-16T12:45:00'),
    basePrice: 2300,
  },
  {
    flightId: '6E128',
    airline: 'IndiGo',
    departureCity: 'Pune',
    arrivalCity: 'Goa',
    departureTime: new Date('2026-02-16T13:30:00'),
    arrivalTime: new Date('2026-02-16T15:00:00'),
    basePrice: 2000,
  },
  {
    flightId: 'AI845',
    airline: 'Air India',
    departureCity: 'Goa',
    arrivalCity: 'Delhi',
    departureTime: new Date('2026-02-16T17:00:00'),
    arrivalTime: new Date('2026-02-16T19:30:00'),
    basePrice: 2900,
  },
  {
    flightId: 'SG239',
    airline: 'SpiceJet',
    departureCity: 'Delhi',
    arrivalCity: 'Jaipur',
    departureTime: new Date('2026-02-17T08:00:00'),
    arrivalTime: new Date('2026-02-17T09:15:00'),
    basePrice: 2050,
  },
  {
    flightId: 'UK419',
    airline: 'Vistara',
    departureCity: 'Jaipur',
    arrivalCity: 'Mumbai',
    departureTime: new Date('2026-02-17T10:00:00'),
    arrivalTime: new Date('2026-02-17T12:00:00'),
    basePrice: 2350,
  },
  {
    flightId: '6E785',
    airline: 'IndiGo',
    departureCity: 'Mumbai',
    arrivalCity: 'Kochi',
    departureTime: new Date('2026-02-17T14:30:00'),
    arrivalTime: new Date('2026-02-17T17:00:00'),
    basePrice: 2700,
  },
  {
    flightId: 'AI316',
    airline: 'Air India',
    departureCity: 'Kochi',
    arrivalCity: 'Bangalore',
    departureTime: new Date('2026-02-18T06:30:00'),
    arrivalTime: new Date('2026-02-18T07:45:00'),
    basePrice: 2150,
  },
  {
    flightId: 'SG678',
    airline: 'SpiceJet',
    departureCity: 'Bangalore',
    arrivalCity: 'Ahmedabad',
    departureTime: new Date('2026-02-18T09:00:00'),
    arrivalTime: new Date('2026-02-18T11:30:00'),
    basePrice: 2450,
  },
  {
    flightId: 'UK952',
    airline: 'Vistara',
    departureCity: 'Ahmedabad',
    arrivalCity: 'Delhi',
    departureTime: new Date('2026-02-18T15:00:00'),
    arrivalTime: new Date('2026-02-18T17:00:00'),
    basePrice: 2550,
  },
];

async function main() {
  console.log('Starting database seed...');

  await prisma.bookingAttempt.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  for (const flight of flights) {
    await prisma.flight.create({
      data: flight,
    });
  }

  console.log(` Created ${flights.length} flights`);
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });