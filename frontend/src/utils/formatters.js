import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'dd MMM yyyy');
  } catch (error) {
    return 'Invalid Date';
  }
};

export const formatTime = (dateString) => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'HH:mm');
  } catch (error) {
    return 'Invalid Time';
  }
};

export const formatDateTime = (dateString) => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'dd MMM yyyy, HH:mm');
  } catch (error) {
    return 'Invalid DateTime';
  }
};

export const calculateDuration = (departureTime, arrivalTime) => {
  try {
    const start = typeof departureTime === 'string' ? parseISO(departureTime) : departureTime;
    const end = typeof arrivalTime === 'string' ? parseISO(arrivalTime) : arrivalTime;
    const diffMs = end - start;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  } catch (error) {
    return 'N/A';
  }
};