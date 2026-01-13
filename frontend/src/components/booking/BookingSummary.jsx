import PropTypes from 'prop-types';
import { Plane, Calendar, Clock, CreditCard, TrendingUp } from 'lucide-react';
import { formatCurrency, formatDate, formatTime, calculateDuration } from '../../utils/formatters';
import Card from '../common/Card';

const BookingSummary = ({ flight, pricing }) => {
  const finalPrice = pricing?.finalPrice || flight.currentPrice || flight.basePrice;
  const isSurge = pricing?.surgeApplied || flight.surgeApplied;

  return (
    <Card className="sticky top-20">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>

      {/* Flight Info */}
      <div className="space-y-3 mb-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 p-2 rounded-lg">
            <Plane className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{flight.airline}</p>
            <p className="text-sm text-gray-600">{flight.flightId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(flight.departureTime)}</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-lg font-bold text-gray-900">
                {formatTime(flight.departureTime)}
              </p>
              <p className="text-sm text-gray-600">{flight.departureCity}</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="flex items-center gap-2">
                <div className="h-px bg-gray-300 flex-1"></div>
                <Clock className="w-4 h-4 text-gray-400" />
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-1">
                {calculateDuration(flight.departureTime, flight.arrivalTime)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {formatTime(flight.arrivalTime)}
              </p>
              <p className="text-sm text-gray-600">{flight.arrivalCity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4 pb-4 border-b">
        <h4 className="font-semibold text-gray-900">Price Details</h4>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Fare</span>
          <span className="font-medium text-gray-900">
            {formatCurrency(flight.basePrice)}
          </span>
        </div>

        {isSurge && (
          <div className="flex justify-between text-sm">
            <span className="text-orange-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Surge Pricing ({pricing?.surgePercentage || 10}%)
            </span>
            <span className="font-medium text-orange-600">
              +{formatCurrency(finalPrice - flight.basePrice)}
            </span>
          </div>
        )}

        {isSurge && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-xs text-orange-800">
              <strong>High demand alert:</strong> Prices increased due to multiple booking attempts
            </p>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-gray-900">Total Amount</span>
        <span className="text-2xl font-bold text-primary-600">
          {formatCurrency(finalPrice)}
        </span>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-gray-600" />
        <div>
          <p className="text-sm font-medium text-gray-900">Payment Method</p>
          <p className="text-xs text-gray-600">Wallet Balance</p>
        </div>
      </div>
    </Card>
  );
};

BookingSummary.propTypes = {
  flight: PropTypes.shape({
    flightId: PropTypes.string.isRequired,
    airline: PropTypes.string.isRequired,
    departureCity: PropTypes.string.isRequired,
    arrivalCity: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    arrivalTime: PropTypes.string.isRequired,
    basePrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number,
    surgeApplied: PropTypes.bool,
  }).isRequired,
  pricing: PropTypes.shape({
    finalPrice: PropTypes.number,
    surgeApplied: PropTypes.bool,
    surgePercentage: PropTypes.number,
  }),
};

export default BookingSummary;