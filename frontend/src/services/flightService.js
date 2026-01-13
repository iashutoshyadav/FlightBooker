import api from "./api";

export const flightService = {
  searchFlights: async (params) => {
    const response = await api.get("/flights/search", { params });
    return response.data;
  },

  getAllFlights: async () => {
    const response = await api.get("/flights/all");
    return response.data;
  },

  getFlightPrice: async (flightId) => {
    const response = await api.get(`/flights/${flightId}/price`);
    return response.data;
  },

  getFlightById: async (flightId, token) => {
    const response = await api.get(`/flights/${flightId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  },
};

export default flightService;
