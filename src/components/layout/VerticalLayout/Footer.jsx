import React from 'react';

import Content from '../../common/Content';

import classes from './Footer.module.css';
const Footer = () => {
 return (
  <footer className={classes.footer} dir='rtl'>
    <div className={classes['links-section']}>
     <ul>
      <li>شرکت</li>
      <li>
       <a href=''>درباره ما</a>
      </li>
      <li>
       <a href=''>بلاگز</a>
      </li>
      <li>
       <a href=''>موقعیت های شغلی</a>
      </li>
      <li>
       <a href=''>تماس</a>
      </li>
     </ul>
     <ul>
      <li>شرکت</li>
      <li>
       <a href=''>درباره ما</a>
      </li>
      <li>
       <a href=''>بلاگز</a>
      </li>
      <li>
       <a href=''>موقعیت های شغلی</a>
      </li>
      <li>
       <a href=''>تماس</a>
      </li>
     </ul>
     <ul>
      <li>شرکت</li>
      <li>
       <a href=''>درباره ما</a>
      </li>
      <li>
       <a href=''>بلاگز</a>
      </li>
      <li>
       <a href=''>موقعیت های شغلی</a>
      </li>
      <li>
       <a href=''>تماس</a>
      </li>
     </ul>
     <ul>
      <li>نماد ها و اعتبارات</li>
      <li>
       <a href=''>
        <img src='' alt='' />
       </a>
      </li>
     </ul>
    </div>
    <div className={classes['social-section']}>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
    </div>
    <div className={classes['copyright']}>
     طراحی و توسعه <a href='https://www.avatarweb.net/'>آواتار وب</a>
    </div>
  </footer>
 );
};

export default Footer;
