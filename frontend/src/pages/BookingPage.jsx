import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { flightService } from "../services/flightService";
import bookingService from "../services/bookingService";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Alert from "../components/common/Alert";
import Loader from "../components/common/Loader";

const BookingPage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [passengerName, setPassengerName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const flightData = await flightService.getFlightById(flightId, token);
        setFlight(flightData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch flight details");
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [flightId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!passengerName.trim()) {
      setError("Passenger name is required");
      return;
    }
    try {
      setBookingLoading(true);
      const res = await bookingService.createBooking(
        {
          flightId,
          passengerName: passengerName.trim(),
        },
        token
      );

      navigate(`/booking-details/${res.data.pnr}`);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!flight) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <Alert type="error" message={error} />
        <Button onClick={() => navigate("/search")} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => navigate("/search")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Card>
          <h2 className="text-xl font-bold mb-4">Passenger Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Passenger Name"
              name="passengerName"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required
            />
            {error && <Alert type="error" message={error} />}
            <Button
              type="submit"
              loading={bookingLoading}
              disabled={bookingLoading}
              className="w-full"
            >
              Confirm Booking
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;
