import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import flightService from '../../services/flightService';

const initialState = {
  flights: [],
  selectedFlight: null,
  searchParams: {
    departureCity: '',
    arrivalCity: '',
  },
  loading: false,
  error: null,
};

export const searchFlights = createAsyncThunk(
  'flights/search',
  async (params, { rejectWithValue }) => {
    try {
      const response = await flightService.searchFlights(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

export const fetchAllFlights = createAsyncThunk(
  'flights/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await flightService.getAllFlights();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch flights');
    }
  }
);

export const checkFlightPrice = createAsyncThunk(
  'flights/checkPrice',
  async (flightId, { rejectWithValue }) => {
    try {
      const response = await flightService.getFlightPrice(flightId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check price');
    }
  }
);

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    selectFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    clearSelectedFlight: (state) => {
      state.selectedFlight = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search Flights
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload.flights;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Flights
      .addCase(fetchAllFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload.flights;
      })
      .addCase(fetchAllFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check Flight Price
      .addCase(checkFlightPrice.fulfilled, (state, action) => {
        if (state.selectedFlight && state.selectedFlight.id === action.payload.flight.id) {
          state.selectedFlight = {
            ...state.selectedFlight,
            ...action.payload.flight,
            pricing: action.payload.pricing,
          };
        }
      });
  },
});

export const { setSearchParams, selectFlight, clearSelectedFlight, clearError } = flightSlice.actions;
export default flightSlice.reducer;