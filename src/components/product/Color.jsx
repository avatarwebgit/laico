import React from 'react';

import classes from './Color.module.css';
import { Tooltip } from '@mui/material';
const Color = ({ color, setColor, selectedColor }) => {
 return (
  <div className={classes.color}>
   <Tooltip title={color.name} arrow placement='top'>
    <div
     onClick={() => setColor(color.id)}
     style={{ backgroundColor: color.color }}
     className={`${selectedColor === color.id ? classes.selected : ''}`}></div>
   </Tooltip>
  </div>
 );
};

export default Color;
