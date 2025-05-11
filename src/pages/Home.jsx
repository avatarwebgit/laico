import React, { useRef, useState } from 'react';

import Carusel from '../components/home/Carousel';

import Content from '../components/common/Content';
import ProductBox from '../components/common/ProductBox';
import Loader from '../components/common/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import classes from './Home.module.css';
import ArrowButton from '../components/common/ArrowButton';
import { Navigation } from 'swiper/modules';
import Banner from '../components/home/Banner';
import Tabs from '../components/common/Tabs';
const Home = () => {
 const [activeIndex, setActiveIndex] = useState(0);

 const swiperRef = useRef(null);

 const goNext = () => {
  if (swiperRef.current && swiperRef.current.swiper) {
   swiperRef.current.swiper.slideNext();
  }
 };

 const goPrev = () => {
  if (swiperRef.current && swiperRef.current.swiper) {
   swiperRef.current.swiper.slidePrev();
  }
 };
 return (
  <div className={classes.main}>
   <Carusel />
   <Content
    sectionClassname={classes.section}
    contentClassname={classes.content}>
    <h2>پر فروش ترین ها</h2>
    <Swiper
     spaceBetween={20}
     slidesPerView={4}
     modules={[Navigation]}
     className={classes['most-sales-swiper']}
     ref={swiperRef}
     navigation={false}
     onSlideChange={swiper => {
      setActiveIndex(swiper.realIndex);
     }}
     onSwiper={swiper => {
      setActiveIndex(swiper.realIndex);
     }}
     autoplay={{
      delay: 7000,
      disableOnInteraction: false,
      reverseDirection: true,
     }}
     loop={true}
     breakpoints={{
      320: {
       slidesPerView: 1,
       spaceBetween: 10,
      },
      640: {
       slidesPerView: 2,
       spaceBetween: 10,
      },
      768: {
       slidesPerView: 3,
       spaceBetween: 10,
      },
      1024: {
       slidesPerView: 4,
       spaceBetween: 10,
      },
     }}>
     <SwiperSlide>
      <ProductBox />
     </SwiperSlide>
     <SwiperSlide>
      <ProductBox />
     </SwiperSlide>
     <SwiperSlide>
      <ProductBox />
     </SwiperSlide>
     <SwiperSlide>
      <ProductBox />
     </SwiperSlide>
     <SwiperSlide>
      <ProductBox />
     </SwiperSlide>
    </Swiper>
    <div className={classes['navigation-wrapper']}>
     <ArrowButton onClick={goNext} />
     <ArrowButton onClick={goPrev} direction={'right'} />
    </div>
   </Content>
   <Banner />
   <Content>
    {/* <Tabs tabs={[{}, {}, {}]} /> */}
   </Content>
  </div>
 );
};

export default Home;
