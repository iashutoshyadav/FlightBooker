import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "../../services/bookingService";

const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
};

// CREATE BOOKING
export const createBooking = createAsyncThunk(
  "bookings/create",
  async (bookingData, { rejectWithValue }) => {
    try {
      // bookingService returns res.data
      return await bookingService.createBooking(bookingData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Booking failed"
      );
    }
  }
);

// FETCH BOOKING HISTORY
export const fetchBookingHistory = createAsyncThunk(
  "bookings/fetchHistory",
  async (token, { rejectWithValue }) => {
    try {
      return await bookingService.getBookingHistory(token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

// FETCH BOOKING BY PNR
export const fetchBookingByPNR = createAsyncThunk(
  "bookings/fetchByPNR",
  async (pnr, { rejectWithValue }) => {
    try {
      return await bookingService.getBookingByPNR(pnr);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Booking not found"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload.data;
        state.bookings.unshift(action.payload.data);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBookingHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.data;
      })
      .addCase(fetchBookingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBookingByPNR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingByPNR.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload.data;
      })
      .addCase(fetchBookingByPNR.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentBooking, clearError } = bookingSlice.actions;
export default bookingSlice.reducer;
