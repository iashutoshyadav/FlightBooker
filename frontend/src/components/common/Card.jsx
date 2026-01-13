import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false,
  onClick,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClass = hover ? 'hover:shadow-xl cursor-pointer transform hover:-translate-y-1' : '';
  const clickClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-md transition-all duration-300
        ${paddingClasses[padding]}
        ${hoverClass}
        ${clickClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;