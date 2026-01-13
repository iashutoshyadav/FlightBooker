import PropTypes from 'prop-types';
import { CheckCircle, Download, Calendar, Plane, User } from 'lucide-react';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import Card from '../common/Card';
import Button from '../common/Button';

const ConfirmationCard = ({ booking, onDownloadTicket }) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-gray-600">
          Your flight has been successfully booked
        </p>
      </div>

      {/* PNR */}
      <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary-700 font-medium mb-1">Booking Reference (PNR)</p>
        <p className="text-3xl font-bold text-primary-900 tracking-wider">
          {booking.pnr}
        </p>
      </div>

      {/* Booking Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <Plane className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">Flight</p>
            <p className="font-semibold text-gray-900">
              {booking.flight.flightId} - {booking.flight.airline}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">Route</p>
            <p className="font-semibold text-gray-900">
              {booking.flight.departureCity} → {booking.flight.arrivalCity}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">Passenger</p>
            <p className="font-semibold text-gray-900">{booking.passengerName}</p>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Amount Paid</span>
          <span className="text-xl font-bold text-gray-900">
            {formatCurrency(booking.finalPrice)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Booking Date</span>
          <span className="text-gray-900">{formatDateTime(booking.bookingDate)}</span>
        </div>
      </div>

      {/* Download Ticket */}
      <Button
        fullWidth
        onClick={() => onDownloadTicket(booking.pnr)}
        className="mb-4"
      >
        <Download className="w-5 h-5" />
        Download E-Ticket
      </Button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Next Steps:</strong>
        </p>
        <ul className="text-sm text-blue-700 mt-2 space-y-1">
          <li>• Your e-ticket has been emailed to you</li>
          <li>• Web check-in opens 48 hours before departure</li>
          <li>• Carry a valid government-issued photo ID</li>
          <li>• Reach airport 2 hours before departure</li>
        </ul>
      </div>
    </Card>
  );
};

ConfirmationCard.propTypes = {
  booking: PropTypes.shape({
    pnr: PropTypes.string.isRequired,
    passengerName: PropTypes.string.isRequired,
    finalPrice: PropTypes.number.isRequired,
    bookingDate: PropTypes.string.isRequired,
    flight: PropTypes.shape({
      flightId: PropTypes.string.isRequired,
      airline: PropTypes.string.isRequired,
      departureCity: PropTypes.string.isRequired,
      arrivalCity: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onDownloadTicket: PropTypes.func.isRequired,
};

export default ConfirmationCard;