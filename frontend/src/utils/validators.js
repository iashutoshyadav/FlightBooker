export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const getErrorMessage = (field, value) => {
  if (!validateRequired(value)) {
    return `${field} is required`;
  }
  
  if (field === 'Email' && !validateEmail(value)) {
    return 'Please enter a valid email address';
  }
  
  if (field === 'Password' && !validatePassword(value)) {
    return 'Password must be at least 6 characters';
  }
  
  if (field === 'Name' && !validateName(value)) {
    return 'Name must be at least 2 characters';
  }
  
  return '';
};