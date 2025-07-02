import React from 'react';

import Arrow from '../../assets/svgs/arrow.svg';

import classes from './ArrowButton.module.css';
import { transform } from 'lodash';
const ArrowButton = ({ children, direction, onClick, className }) => {
 const returnDirection = () => {
  if (direction === 'right') return 'rotate(180deg)';
  if (direction === 'top') return 'rotate(90deg)';
  if (direction === 'bottom') return 'rotate(-90deg)';
  else return;
 };
 return (
  <button className={`${classes.main} ${className}`} onClick={onClick}>
   <img
    src={Arrow}
    style={{ transform: returnDirection() }}
    width={30}
    height={30}
   />
  </button>
 );
};

export default ArrowButton;
