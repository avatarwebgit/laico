import React from 'react';

import classes from './Card.module.css';

const Card = React.forwardRef(({ children, className, ...props }, ref) => {
 return (
  <div ref={ref} className={`${classes.main} ${className}`} {...props}>
   {children}
  </div>
 );
});

export default Card;
