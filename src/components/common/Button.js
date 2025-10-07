import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  icon: Icon,
  ...props 
}) => {
  const baseClasses = 'button';
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    danger: 'button-danger'
  };
  const sizeClasses = {
    small: 'button-small',
    medium: 'button-medium',
    large: 'button-large'
  };

  const className = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'button-disabled' : '',
    props.className || ''
  ].join(' ').trim();

  return (
    <button {...props} className={className} disabled={disabled || loading}>
      {loading && <div className="button-spinner"></div>}
      {Icon && <Icon size={size === 'small' ? 16 : 20} />}
      {children}
    </button>
  );
};

export default Button;