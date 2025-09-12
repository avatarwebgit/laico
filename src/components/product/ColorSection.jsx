import Color from './Color';

import classes from './ColorSection.module.css';
const ColorSection = ({ colors, setColor, selectedColor }) => {
 return (
  <div className={classes['color-section-main']}>
   <div className={classes.title}>رنگ های موجود</div>
   <div className={classes['colors-wrapper']}>
    {colors.map(colorData => (
     <Color
      color={colorData}
      selectedColor={selectedColor}
      setColor={setColor}
     />
    ))}
   </div>
  </div>
 );
};

export default ColorSection;
