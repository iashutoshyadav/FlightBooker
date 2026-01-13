import PropTypes from 'prop-types';
import { TrendingUp, AlertCircle } from 'lucide-react';

const PriceIndicator = ({ surge }) => {
  if (!surge) return null;

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 flex items-center gap-2">
      <AlertCircle className="w-4 h-4 text-orange-600" />
      <div className="flex-1">
        <p className="text-xs font-medium text-orange-800">High Demand</p>
        <p className="text-xs text-orange-600">Prices increased due to surge</p>
      </div>
      <TrendingUp className="w-5 h-5 text-orange-600" />
    </div>
  );
};

PriceIndicator.propTypes = {
  surge: PropTypes.bool.isRequired,
};

export default PriceIndicator;