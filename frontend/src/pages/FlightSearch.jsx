import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchFlights, fetchAllFlights, setSearchParams } from '../store/slices/flightSlice';
import { fetchProfile } from '../store/slices/authSlice';
import SearchBar from '../components/flight/SearchBar';
import FlightList from '../components/flight/FlightList';
import FilterPanel from '../components/flight/FilterPanel';
import WalletBalance from '../components/wallet/WalletBalance';
import Alert from '../components/common/Alert';

const FlightSearch = () => {
  const dispatch = useDispatch();
  const { flights, loading, error, searchParams } = useSelector((state) => state.flights);
  const { user } = useSelector((state) => state.auth);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    airlines: [],
    priceRange: { min: 2000, max: 3000 },
  });

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchAllFlights());
  }, [dispatch]);
  useEffect(() => {
    applyFilters();
  }, [flights, activeFilters]);
  const handleSearch = async (params) => {
    dispatch(setSearchParams(params));
    if (params.departureCity || params.arrivalCity) {
      await dispatch(searchFlights(params));
    } else {
      await dispatch(fetchAllFlights());
    }
  };

  const applyFilters = () => {
    let filtered = [...flights];
    if (activeFilters.airlines.length > 0) {
      filtered = filtered.filter((flight) =>
        activeFilters.airlines.includes(flight.airline)
      );
    }
    filtered = filtered.filter((flight) => {
      const price = flight.currentPrice || flight.basePrice;
      return price >= activeFilters.priceRange.min && price <= activeFilters.priceRange.max;
    });

    setFilteredFlights(filtered);
  };
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters({
      airlines: [],
      priceRange: { min: 2000, max: 3000 },
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Flights</h1>
            <p className="text-gray-600">
              {searchParams.departureCity && searchParams.arrivalCity
                ? `${searchParams.departureCity} → ${searchParams.arrivalCity}`
                : 'Showing all available flights'}
            </p>
          </div>
          {user && <WalletBalance balance={user.walletBalance} />}
        </div>
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
        {error && (
          <Alert type="error" message={error} className="mb-6" />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
          <div className="lg:col-span-3">
            <FlightList flights={filteredFlights} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;