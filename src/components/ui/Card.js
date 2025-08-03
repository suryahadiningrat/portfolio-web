import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'p-6',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-100';
  const hoverClasses = hover ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-300' : '';
  
  const classes = `${baseClasses} ${hoverClasses} ${padding} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
