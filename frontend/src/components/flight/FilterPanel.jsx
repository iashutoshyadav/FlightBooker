import { useState } from 'react';
import PropTypes from 'prop-types';
import { Filter, X } from 'lucide-react';
import { AIRLINES } from '../../utils/constants';
import Button from '../common/Button';
import Card from '../common/Card';

const FilterPanel = ({ onFilterChange, onClearFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    airlines: [],
    priceRange: { min: 2000, max: 3000 },
  });

  const handleAirlineToggle = (airline) => {
    setFilters((prev) => {
      const newAirlines = prev.airlines.includes(airline)
        ? prev.airlines.filter((a) => a !== airline)
        : [...prev.airlines, airline];
      
      const newFilters = { ...prev, airlines: newAirlines };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        priceRange: { ...prev.priceRange, [name]: parseInt(value) },
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleClear = () => {
    const clearedFilters = {
      airlines: [],
      priceRange: { min: 2000, max: 3000 },
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <div className="mb-6">
      {/* Mobile Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-md mb-4"
      >
        <span className="flex items-center gap-2 font-medium">
          <Filter className="w-5 h-5" />
          Filters
        </span>
        {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
      </button>

      {/* Filter Panel */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h3>
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear All
            </Button>
          </div>

          {/* Airlines */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Airlines</h4>
            <div className="space-y-2">
              {AIRLINES.map((airline) => (
                <label key={airline} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.airlines.includes(airline)}
                    onChange={() => handleAirlineToggle(airline)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{airline}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Min: ₹{filters.priceRange.min}</label>
                <input
                  type="range"
                  name="min"
                  min="2000"
                  max="3000"
                  step="100"
                  value={filters.priceRange.min}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Max: ₹{filters.priceRange.max}</label>
                <input
                  type="range"
                  name="max"
                  min="2000"
                  max="3000"
                  step="100"
                  value={filters.priceRange.max}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default FilterPanel;