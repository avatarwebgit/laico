import React from 'react';

import classes from './Color.module.css';
import { Tooltip } from '@mui/material';
const Color = ({ color, setColor, selectedColor }) => {
 return (
  <div className={classes.color}>
   <Tooltip
    title={color.name}
    arrow
    placement='top'
    slotProps={{
     tooltip: {
      sx: {
       fontSize: '10px',
      },
     },
     arrow: {
      sx: {
       fontSize: '10px',
      },
     },
    }}>
    <div
     onClick={() => setColor(color.id)}
     style={{ backgroundColor: color.color }}
     className={`${selectedColor === color.id ? classes.selected : ''}`}></div>
   </Tooltip>
  </div>
 );
};

export default Color;
