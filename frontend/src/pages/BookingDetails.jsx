import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, Download } from "lucide-react";

import bookingService from "../services/bookingService";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import Alert from "../components/common/Alert";

const BookingDetails = () => {
  const { id: pnr } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await bookingService.getBookingByPNR(pnr, token);
        setBooking(res.data);
      } catch {
        setError("Failed to load booking");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [pnr, token]);

  const downloadTicket = async () => {
    const blob = await bookingService.downloadTicket(pnr, token);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ticket_${pnr}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="max-w-3xl mx-auto py-10">
        <Alert type="error" message={error} />
        <Button onClick={() => navigate("/history")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <h2 className="text-xl font-bold mb-4">Booking Confirmed</h2>
          <p>PNR: {booking.pnr}</p>
          <p>Passenger: {booking.passengerName}</p>

          <Button onClick={downloadTicket} className="mt-4">
            <Download className="w-4 h-4 mr-2" />
            Download Ticket
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default BookingDetails;
