import { useState } from 'react';
import PropTypes from 'prop-types';
import { User } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateRequired, getErrorMessage } from '../../utils/validators';

const BookingForm = ({ onSubmit, loading, flight }) => {
  const [formData, setFormData] = useState({
    passengerName: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!validateRequired(formData.passengerName)) {
      newErrors.passengerName = getErrorMessage('Passenger Name', formData.passengerName);
    } else if (formData.passengerName.trim().length < 2) {
      newErrors.passengerName = 'Name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Passenger Details
        </h3>
        <Input
          label="Passenger Name"
          type="text"
          name="passengerName"
          value={formData.passengerName}
          onChange={handleChange}
          placeholder="Enter passenger full name"
          required
          error={errors.passengerName}
          icon={User}
        />
        <p className="mt-2 text-sm text-gray-500">
          Please enter the name as it appears on your government-issued ID
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure passenger name matches ID proof exactly</li>
          <li>• Carry a valid government-issued photo ID</li>
          <li>• Arrive at airport at least 2 hours before departure</li>
          <li>• Web check-in opens 48 hours before departure</li>
        </ul>
      </div>

      <Button
        type="submit"
        fullWidth
        loading={loading}
        disabled={!formData.passengerName.trim()}
      >
        {loading ? 'Processing...' : 'Confirm Booking'}
      </Button>
    </form>
  );
};

BookingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  flight: PropTypes.object,
};

export default BookingForm;