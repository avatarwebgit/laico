import React, { forwardRef } from 'react';
import Arrow from '../../assets/svgs/arrow.svg';
import classes from './ArrowButton.module.css';

const ArrowButton = forwardRef(
 ({ children, direction, onClick, className }, ref) => {
  const getTransform = () => {
   if (direction === 'right') return 'rotate(180deg)';
   if (direction === 'top') return 'rotate(90deg)';
   if (direction === 'bottom') return 'rotate(-90deg)';
   return '';
  };

  return (
   <button
    ref={ref}
    className={`${classes.main} ${className}`}
    onClick={onClick}>
    <img
     src={Arrow}
     style={{ transform: getTransform() }}
     width={30}
     height={30}
     alt='Arrow button'
    />
    {children}
   </button>
  );
 },
);

export default ArrowButton;
