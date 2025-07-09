import React from 'react';
import Content from '../common/Content';

import image from '../../assets/images/banner.png';

import classes from './Banner.module.css';
import RoundButton from '../common/RoundButton';
const Banner = () => {
 return (
  <Content>
   <div className={classes.wrapper}>
    <div className={classes.content}>
     <p># استایل جدید</p>
     {/* <h3 className={classes['shadow-text']}>تفیف</h3> */}
     <h3>این یکی نرمه </h3>
     <RoundButton className={classes['rounded-btn']} text={'خرید کنید'} />
    </div>
    <figure className={classes['image']}>
     <img src={image} alt='' />
    </figure>
   </div>
  </Content>
 );
};

export default Banner;
