import React, { useEffect, useRef, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import {
 Navigation,
 Pagination,
 Scrollbar,
 A11y,
 Thumbs,
 Autoplay,
} from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@mui/material';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';

import classes from './Carousel.module.css';
import ImagePixelated from '../common/ImagePixelated';
import ArrowButton from '../common/ArrowButton';

const mockSwiperData = [
 {
  image:
   'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  image_2:
   'https://cdn.pixabay.com/photo/2022/06/20/13/38/background-7273789_1280.png',
  title: 'Vibrant Velocity',
  text: 'Experience the rush of color and speed.',
 },
 {
  image: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
  image_2:
   'https://cdn.pixabay.com/photo/2022/06/20/13/38/background-7273789_1280.png',
  title: 'Urban Explorer',
  text: 'Navigate the city in style and comfort.',
 },
 {
  image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
  image_2:
   'https://cdn.pixabay.com/photo/2022/06/20/13/38/background-7273789_1280.png',
  title: 'Classic Comfort',
  text: 'Timeless design for everyday wear.',
 },
];

const Carusel = ({ windowSize }) => {
 const [thumbsSwiper, setThumbsSwiper] = useState(null);
 const [activeIndex, setActiveIndex] = useState(0);
 const [isSmallSize, setIsSmallSize] = useState(false);
 const [swiperData, setSwiperData] = useState(mockSwiperData);

 const swiperRef = useRef(null);

 useEffect(() => {
  if (windowSize === 'xs' || windowSize === 's') {
   setIsSmallSize(true);
  } else {
   setIsSmallSize(false);
  }
 }, [windowSize]);

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
  <section>
   {swiperData ? (
    <div>
     {/* ________________ MAIN SLIDER  ________________*/}
     <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
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
      thumbs={{
       swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
      }}
      loop={true}
      ref={swiperRef}>
      {swiperData.map((slide, index) => (
       <SwiperSlide key={index} className={classes.slide}>
        <div className={classes.slider_image_wrapper}>
         <ImagePixelated
          src={slide.image}
          alt={`Background for ${slide.title}`}
          isActive={index === activeIndex}
         />

         <AnimatePresence>
          {index === activeIndex && (
           <>
            <motion.span
             key={`product-img-${index}`}
             className={classes.product_img_wrapper}
             initial={{ scale: 0.5, opacity: 0 }}
             animate={{
              scale: 1,
              opacity: 1,
              transition: {
               duration: 0.8,
               delay: 1.5,
               type: 'spring',
               stiffness: 100,
              },
             }}
             exit={{
              scale: 0.5,
              opacity: 0,
              transition: { duration: 0.3 },
             }}>
             <img
              className={classes.product_img}
              src={slide.image_2}
              alt={slide.title}
             />
            </motion.span>

            <motion.div
             key={`about-${index}`}
             className={classes.about_product}
             initial='initial'
             animate='animate'
             exit='exit'
             variants={{
              initial: { opacity: 0 },
              animate: {
               opacity: 1,
               transition: {
                delay: 0.4,
                staggerChildren: 0.2,
               },
              },
              exit: {
               opacity: 0,
               transition: { duration: 0.3 },
              },
             }}>
             <motion.p
              className={classes.title}
              variants={{
               initial: { y: -50, opacity: 0 },
               animate: {
                y: 0,
                opacity: 1,
                transition: {
                 duration: 1,
                 ease: 'easeOut',
                 delay: 1.5,
                },
               },
              }}>
              {slide.title}
             </motion.p>
             <motion.p
              className={classes.caption}
              variants={{
               initial: { y: 50, opacity: 0 },
               animate: {
                y: 0,
                opacity: 1,
                transition: {
                 duration: 1,
                 ease: 'easeOut',
                 delay: 1.5,
                },
               },
              }}>
              {slide.text}
             </motion.p>
            </motion.div>
           </>
          )}
         </AnimatePresence>
        </div>
       </SwiperSlide>
      ))}
      <div className={classes['navigation-wrapper']}>
       <ArrowButton
        className={classes.navButton}
        onClick={goPrev}></ArrowButton>
       <ArrowButton
        className={classes.navButton}
        onClick={goNext}
        direction='right'></ArrowButton>
      </div>
     </Swiper>
    </div>
   ) : (
    <Skeleton
     variant='rectangular'
     className={classes.skeleton_main}
     animation='wave'
    />
   )}
  </section>
 );
};

export default Carusel;
