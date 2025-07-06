import { useEffect, useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

import classes from './DropDown.module.css';
import { Button, Space, Switch } from 'antd';

const DropDown = ({
 title,
 type,
 checkBoxOptions,
 priceOptions,
 colorsOptions,
 radioOptions,
}) => {
 const [isExpaned, setIsExpaned] = useState(false);
 const [checkedItems, setCheckedItems] = useState([]);
 const [selectedColors, setSelectedColors] = useState([]);
 const [switchActive, setSwitchActive] = useState(false);

 const lng = 'fa';

 const intialWrapper = {
  height: isExpaned ? 'auto' : 0,
  margin: isExpaned ? '10px 0' : 0,
 };

 const animateWrapper = {
  height: isExpaned ? 'auto' : 0,
  margin: isExpaned ? '10px 0' : 0,
 };

 const handleCheckboxClick = id => {
  if (checkedItems.includes(id)) {
   const items = checkedItems.filter(el => el !== id);
   setCheckedItems(items);
  } else {
   setCheckedItems(prev => [...prev, id]);
  }
 };

 const handleColorClick = id => {
  if (selectedColors.includes(id)) {
   const items = selectedColors.filter(el => el !== id);
   setSelectedColors(items);
  } else {
   setSelectedColors(prev => [...prev, id]);
  }
 };

 const toggleSwitch = () => setSwitchActive(!switchActive);

 const renderCheckBoxOptions = () => {
  if (type === 'checkbox') {
   return (
    <div className={classes['checkbox-wrapper']}>
     {checkBoxOptions.map(option => {
      return (
       <div
        key={option.id}
        className={`${classes['checkbox-input-wrapper']} ${classes.rtl}`}>
        <label htmlFor={`checkbox-${option.id}`}>{option.name}</label>
        <input
         type='checkbox'
         name={`checkbox-${option.id}`}
         id={`checkbox-${option.id}`}
         checked={checkedItems.includes(option.id) || false}
         onChange={() => handleCheckboxClick(option.id)}
         hidden
        />
        <div
         className={`${classes['custom-checkbox']} ${
          checkedItems.includes(option.id) ? classes.checked : ''
         }`}
         onClick={() => handleCheckboxClick(option.id)}
        />
       </div>
      );
     })}
    </div>
   );
  }
 };
 const renderPriceOptions = () => {
  if (type === 'price') {
   return <div className={classes['checkbox-price']}>{}</div>;
  }
 };

 const renderColorOptions = () => {
  if (type === 'color') {
   return (
    <div className={classes['checkbox-color']}>
     {colorsOptions.map(option => {
      return (
       <Tooltip
        title={option.color}
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
         className={`${classes['color-wrapper']} ${
          selectedColors.includes(option.id) ? classes['color-active'] : ''
         }`}>
         <div
          key={option.id}
          className={`${classes['color-input-wrapper']} ${classes.rtl}`}>
          <input
           type='color'
           name={`color-${option.id}`}
           id={`color-${option.id}`}
           checked={selectedColors.includes(option.id) || false}
           onChange={() => handleColorClick(option.id)}
           hidden
          />
          <div
           className={`${classes['custom-color']} `}
           style={{ backgroundColor: option.hex }}
           onClick={() => handleColorClick(option.id)}
          />
         </div>
        </div>
       </Tooltip>
      );
     })}
    </div>
   );
  }
 };

 return (
  <div className={classes['drop-down-main']} dir={lng === 'fa' ? 'rtl' : 'ltr'}>
   <div className={`${classes['drop-down-header']}`}>
    <span>{title}</span>
    {type !== 'switch' ? (
     <IconButton
      onClick={() => setIsExpaned(!isExpaned)}
      size='small'
      disableRipple={true}>
      {isExpaned ? <ExpandMore /> : <ExpandLess />}
     </IconButton>
    ) : (
     <Switch onClick={toggleSwitch} size='small' className={classes.switch} />
    )}
   </div>
   <motion.div
    className={`${classes['drop-down-options_wrapper']}`}
    initial={intialWrapper}
    animate={animateWrapper}>
    {checkBoxOptions && renderCheckBoxOptions()}
    {colorsOptions && renderColorOptions()}
   </motion.div>
  </div>
 );
};

export default DropDown;
