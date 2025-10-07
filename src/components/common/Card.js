import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'medium',
  hover = false,
  ...props 
}) => {
  const paddingClasses = {
    small: 'card-padding-small',
    medium: 'card-padding-medium',
    large: 'card-padding-large'
  };

  const cardClass = [
    'card',
    paddingClasses[padding],
    hover ? 'card-hover' : '',
    className
  ].join(' ').trim();

  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
};

export default Card;