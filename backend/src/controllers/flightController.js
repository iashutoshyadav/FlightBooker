import flightService from "../services/flightService.js";
import pricingService from "../services/pricingService.js";

/**
 * 🔍 SEARCH FLIGHTS
 * GET /api/flights/search
 */
export const searchFlights = async (req, res, next) => {
  try {
    const departureCity = req.query.departureCity?.trim();
    const arrivalCity = req.query.arrivalCity?.trim();

    if (!departureCity || !arrivalCity) {
      return res.status(400).json({
        success: false,
        message: "Departure city and arrival city are required",
      });
    }

    if (departureCity.toLowerCase() === arrivalCity.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: "Departure and arrival city cannot be the same",
      });
    }

    const flights = await flightService.searchFlights({
      departureCity,
      arrivalCity,
    });

    if (!flights || flights.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: { flights: [] },
        message: "No flights found matching your criteria",
      });
    }

    // Apply dynamic pricing
    const flightsWithPricing = await Promise.all(
      flights.map(async (flight) => {
        const pricing = await pricingService.calculatePrice(
          req.user.id,
          flight.id
        );

        return {
          ...flight,
          currentPrice: pricing.finalPrice,
          surgeApplied: pricing.surgeApplied,
          surgePercentage: pricing.surgePercentage,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: flightsWithPricing.length,
      data: { flights: flightsWithPricing },
    });
  } catch (error) {
    next(error);
  }
};

export const getFlightById = async (req, res, next) => {
  try {
    const flightId = req.params.flightId?.trim();

    if (!flightId) {
      return res.status(400).json({
        success: false,
        message: "Valid flight ID is required",
      });
    }

    const flight = await flightService.getFlightById(flightId);

    res.status(200).json({
      success: true,
      data: flight,
    });
  } catch (error) {
    if (error.message === "Flight not found") {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }
    next(error);
  }
};

/**
 * 💰 GET FLIGHT PRICE (SURGE + BASE)
 * GET /api/flights/:flightId/price
 */
export const getFlightPrice = async (req, res, next) => {
  try {
    const flightId = req.params.flightId?.trim();

    if (!flightId) {
      return res.status(400).json({
        success: false,
        message: "Valid flight ID is required",
      });
    }

    // Ensure flight exists
    await flightService.getFlightById(flightId);

    // Record booking attempt
    await pricingService.recordAttempt(req.user.id, flightId);

    // Calculate dynamic pricing
    const pricing = await pricingService.calculatePrice(
      req.user.id,
      flightId
    );

    res.status(200).json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    if (error.message === "Flight not found") {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }
    next(error);
  }
};

export const getAllFlights = async (req, res, next) => {
  try {
    const flights = await flightService.getAllFlights();

    res.status(200).json({
      success: true,
      count: flights.length,
      data: { flights },
    });
  } catch (error) {
    next(error);
  }
};
