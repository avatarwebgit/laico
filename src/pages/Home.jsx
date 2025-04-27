import React from 'react';
import Swiper from 'swiper';

import Carusel from '../components/home/Carousel';

import classes from './Home.module.css';
import Content from '../components/common/Content';
const Home = () => {
 return (
  <div className={classes.main}>
   <Carusel />
   <Content
    sectionClassname={classes.section}
    contentClassname={classes.content}></Content>
  </div>
 );
};

export default Home;
