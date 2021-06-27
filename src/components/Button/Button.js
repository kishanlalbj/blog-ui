import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ variant, label, size, onClick }) => {
  return (
    <button
      className={`button-custom button-${variant} button-${size}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired
};

Button.defaultProps = {
  size: 'md'
};

export default Button;
