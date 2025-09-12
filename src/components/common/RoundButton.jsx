import React from 'react';

import classes from './RoundButton.module.css';
const RoundButton = ({ text, href, className }) => {
 return (
  <a className={`${classes['round-button']} ${className}`} href={href}>
   {text}
  </a>
 );
};

export default RoundButton;
