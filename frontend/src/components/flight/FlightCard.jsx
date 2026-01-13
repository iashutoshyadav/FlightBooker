import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Plane, Clock, Calendar, TrendingUp } from 'lucide-react';
import { formatCurrency, formatTime, formatDate, calculateDuration } from '../../utils/formatters';
import Card from '../common/Card';
import Button from '../common/Button';
import PriceIndicator from './PriceIndicator';

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${flight.id}`, { state: { flight } });
  };

  const isSurge = flight.surgeApplied || flight.currentPrice > flight.basePrice;
  return (
    <Card hover className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Flight Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Plane className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{flight.airline}</h3>
              <p className="text-sm text-gray-500">{flight.flightId}</p>
            </div>
          </div>

          {/* Route */}
          <div className="flex items-center gap-4 mb-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {formatTime(flight.departureTime)}
              </p>
              <p className="text-sm text-gray-600">{flight.departureCity}</p>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center gap-2 w-full">
                <div className="h-px bg-gray-300 flex-1"></div>
                <Clock className="w-4 h-4 text-gray-400" />
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {calculateDuration(flight.departureTime, flight.arrivalTime)}
              </p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {formatTime(flight.arrivalTime)}
              </p>
              <p className="text-sm text-gray-600">{flight.arrivalCity}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(flight.departureTime)}</span>
          </div>
        </div>

        {/* Pricing & Booking */}
        <div className="flex flex-col items-end gap-3 md:border-l md:pl-6">
          <div className="text-right">
            {isSurge && (
              <div className="flex items-center gap-1 text-orange-600 text-sm font-medium mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>+{flight.surgePercentage || 10}% Surge</span>
              </div>
            )}
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(flight.currentPrice || flight.basePrice)}
            </p>
            {isSurge && (
              <p className="text-sm text-gray-500 line-through">
                {formatCurrency(flight.basePrice)}
              </p>
            )}
          </div>

          {isSurge && <PriceIndicator surge={true} />}

          <Button onClick={handleBookNow} className="w-full md:w-auto px-8">
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

FlightCard.propTypes = {
  flight: PropTypes.shape({
    id: PropTypes.string.isRequired,
    flightId: PropTypes.string.isRequired,
    airline: PropTypes.string.isRequired,
    departureCity: PropTypes.string.isRequired,
    arrivalCity: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    arrivalTime: PropTypes.string.isRequired,
    basePrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number,
    surgeApplied: PropTypes.bool,
    surgePercentage: PropTypes.number,
  }).isRequired,
};

export default FlightCard;