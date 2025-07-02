import { useRef, useState } from 'react';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowButton from './ArrowButton';
import Content from './Content';

import classes from './Slider.module.css';

const Slider = ({
 title,
 items = [],
 slidesPerView = 3,
 spaceBetween = 70,
 sectionClassName = classes.section,
 contentClassName = classes.content,
 swiperClassName,
 navigation = true,
 autoplay = {
  delay: 5000,
  disableOnInteraction: false,
  reverseDirection: true,
 },
 loop = true,
 breakpoints = {
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
   slidesPerView: 3,
   spaceBetween: 10,
  },
 },
}) => {
 const swiperRef = useRef(null);
 const nextButtonRef = useRef(null);
 const prevButtonRef = useRef(null);

 const [activeIndex, setActiveIndex] = useState(0);

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
  <Content
   contentClassname={contentClassName}
   sectionClassname={sectionClassName}>
   <div>
    <h2>{title}</h2>
    <Swiper
     spaceBetween={spaceBetween}
     slidesPerView={slidesPerView}
     modules={[Navigation, Autoplay]}
     className={swiperClassName}
     ref={swiperRef}
     navigation={{
      nextEl: nextButtonRef.current,
      prevEl: prevButtonRef.current,
     }}
     onSlideChange={swiper => {
      setActiveIndex(swiper.realIndex);
     }}
     onSwiper={swiper => {
      setActiveIndex(swiper.realIndex);
     }}
     autoplay={autoplay}
     loop={loop}
     breakpoints={breakpoints}>
     {items.map((ItemComponent, index) => (
      <SwiperSlide key={index}>
       <div className={classes['swiper-slide-wrapper']}>
        {typeof ItemComponent === 'function' ? (
         <ItemComponent />
        ) : (
         ItemComponent
        )}
       </div>
      </SwiperSlide>
     ))}
    </Swiper>
    {items.length > slidesPerView && navigation && (
     <div className={classes['navigation-wrapper']}>
      <ArrowButton onClick={goPrev} className={classes.nextEl} />
      <ArrowButton
       onClick={goNext}
       direction={'right'}
       className={classes.prevEl}
      />
     </div>
    )}
   </div>
  </Content>
 );
};

export default Slider;
