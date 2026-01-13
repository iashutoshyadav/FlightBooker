import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import BookingForm from './BookingForm';
import BookingSummary from './BookingSummary';

const BookingModal = ({ isOpen, onClose, flight, pricing, onSubmit, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Your Booking" size="lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BookingForm onSubmit={onSubmit} loading={loading} flight={flight} />
        </div>
        <div>
          <BookingSummary flight={flight} pricing={pricing} />
        </div>
      </div>
    </Modal>
  );
};

BookingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  flight: PropTypes.object.isRequired,
  pricing: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default BookingModal;