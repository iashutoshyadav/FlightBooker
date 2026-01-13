import prisma from "../config/database.js";
import pricingService from "./pricingService.js";
import pdfService from "./pdfService.js";

class BookingService {
  async generateUniquePNR() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    while (true) {
      let pnr = "";
      for (let i = 0; i < 6; i++) {
        pnr += chars[Math.floor(Math.random() * chars.length)];
      }
      const exists = await prisma.booking.findUnique({ where: { pnr } });
      if (!exists) return pnr;
    }
  }

  async createBooking({ userId, flightId, passengerName }) {
    const pricing = await pricingService.calculatePrice(userId, flightId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletBalance: true },
    });
    if (!user) throw new Error("User not found");

    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    });
    if (!flight) throw new Error("Flight not found");

    const finalPrice = Number(pricing.finalPrice);
    if (Number(user.walletBalance) < finalPrice) {
      throw new Error(`Insufficient balance. Required ₹${finalPrice}`);
    }

    const pnr = await this.generateUniquePNR();

    // ✅ TRANSACTION
    const booking = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { walletBalance: { decrement: finalPrice } },
      });

      const newBooking = await tx.booking.create({
        data: {
          pnr,
          userId,
          flightId,
          passengerName,
          finalPrice,
        },
        include: {
          flight: true,
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });

      return newBooking;
    });

    // ✅ PDF GENERATION NEEDS user.email
    const pdfPath = await pdfService.generateTicket(booking);

    return prisma.booking.update({
      where: { id: booking.id },
      data: { pdfPath },
      include: {
        flight: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async getBookingHistory(userId) {
    return prisma.booking.findMany({
      where: { userId },
      include: { flight: true },
      orderBy: { bookingDate: "desc" },
    });
  }

  async getBookingByPNR(pnr, userId) {
    const booking = await prisma.booking.findFirst({
      where: { pnr, userId },
      include: { flight: true },
    });
    if (!booking) throw new Error("Booking not found");
    return booking;
  }
}

export default new BookingService();
