import bookingService from "../services/bookingService.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBooking = async (req, res, next) => {
  try {
    const flightId = req.body.flightId?.trim();
    const passengerName = req.body.passengerName?.trim();

    if (!flightId || !passengerName) {
      return res.status(400).json({
        success: false,
        message: "Flight ID and passenger name are required",
      });
    }

    if (passengerName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Passenger name must be at least 2 characters",
      });
    }

    const booking = await bookingService.createBooking({
      userId: req.user.id,
      flightId,
      passengerName,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    if (error.message.includes("Insufficient balance")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (error.message.includes("Flight not found")) {
      return res.status(404).json({ success: false, message: "Flight not found" });
    }
    next(error);
  }
};

export const getBookingHistory = async (req, res, next) => {
  try {
    const bookings = await bookingService.getBookingHistory(req.user.id);
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingByPNR = async (req, res, next) => {
  try {
    const { pnr } = req.params;
    if (!pnr) {
      return res.status(400).json({
        success: false,
        message: "Valid PNR is required",
      });
    }

    const booking = await bookingService.getBookingByPNR(pnr, req.user.id);
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const downloadTicket = async (req, res, next) => {
  try {
    const { pnr } = req.params;
    const booking = await bookingService.getBookingByPNR(
      pnr,
      req.user.id
    );

    if (!booking.pdfPath) {
      return res.status(404).json({
        success: false,
        message: "Ticket PDF not found",
      });
    }
    const filePath = path.join(
      process.cwd(),
      "tickets",
      path.basename(booking.pdfPath)
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "Ticket file not found on server",
      });
    }

    res.download(filePath, `ticket_${pnr}.pdf`);
  } catch (error) {
    next(error);
  }
};

