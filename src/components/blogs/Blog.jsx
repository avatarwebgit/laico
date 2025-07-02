import React from 'react';

import img1 from '../../assets/images/photo_2025-04-13_11-44-04.jpg';

import classes from './Blog.module.css';
const Blog = () => {
 return (
  <div className={classes.blog}>
   <div className={classes['img-wrapper']}>
    <img src={img1} alt='' />
   </div>
   <div className={classes['content']}>
    <h4 className={classes['title']}>تایل تستی</h4>
    <h4 className={classes['caption']}>
     متن تستی با جملات خیل خیل ی خیلی خیلی زیاد
    </h4>
   </div>
  </div>
 );
};

export default Blog;
