import express from "express";
import {createBooking,getBookingHistory,getBookingByPNR,downloadTicket } from "../controllers/bookingController.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { bookingLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

router.use(authenticate);
router.post("/", bookingLimiter, createBooking);
router.get("/history", getBookingHistory);
router.get("/:pnr/download", downloadTicket);
router.get("/:pnr", getBookingByPNR);

export default router;
