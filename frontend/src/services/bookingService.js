import api from "./api";

const bookingService = {
  createBooking: async (data, token) => {
    const res = await api.post(
      "/bookings",
      {
        flightId: data.flightId,
        passengerName: data.passengerName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  getBookingHistory: async (token) => {
    const res = await api.get("/bookings/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  getBookingByPNR: async (pnr, token) => {
    const res = await api.get(`/bookings/${pnr}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  downloadTicket: async (pnr, token) => {
    const res = await api.get(`/bookings/${pnr}/download`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });
    return res.data;
  },
};

export default bookingService;
