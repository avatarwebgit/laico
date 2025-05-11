import React from 'react';
import Content from '../common/Content';

import image from '../../assets/images/banner.png';

import classes from './Banner.module.css';
const Banner = () => {
 return (
  <Content>
   <div className={classes['wrapper']}>
    <div className={classes['content']}>
     <p ># استایل جدید</p>
     <h3 >نرمه</h3>
     <a >بخر</a>
    </div>
    <figure className={classes['image']}>
     <img src={image} alt='' />
    </figure>
   </div>
  </Content>
 );
};

export default Banner;
