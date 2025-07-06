import React from 'react';

import classes from './CategoryProductBox.module.css';
import Img from '../common/Img';
const CategoryProductBox = ({ src, alt }) => {
 return (
  <a
   className={classes['product-box']}
   href='http://localhost:3000/product/1736236632/378'>
   <Img src={src} alt={alt} className={classes.img} />
   <div className={classes.title}>
    لپ تاپ 15.6 اینچی ایسوس مدل Vivobook 15 X1504VA-NJ107-i7 1355U-16GB DDR4-1TB
    SSD-TFT
   </div>
   <div className={classes.price}>
    <span>۵۶,۸۰۰,۰۰۰</span>
    <span>تومان</span>
   </div>
  </a>
 );
};

export default CategoryProductBox;
