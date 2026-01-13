import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "../store/slices/bookingSlice";
import { Download } from "lucide-react";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import bookingService from "../services/bookingService";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookings);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchBookingHistory(token));
    }
  }, [dispatch, token]);

  const downloadTicket = async (pnr) => {
    const blob = await bookingService.downloadTicket(pnr, token);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ticket_${pnr}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <Loader />;

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No bookings found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {bookings.map((b) => (
          <Card key={b.id}>
            <p><strong>PNR:</strong> {b.pnr}</p>
            <p><strong>Passenger:</strong> {b.passengerName}</p>
            <p>
              <strong>Route:</strong>{" "}
              {b.flight?.departureCity} → {b.flight?.arrivalCity}
            </p>

            <Button onClick={() => downloadTicket(b.pnr)}>
              <Download className="w-4 h-4 mr-2" />
              Download Ticket
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
