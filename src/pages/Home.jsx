import Carusel from '../components/home/Carousel';

import Slider from '../components/common/Slider';
import Banner from '../components/home/Banner';
import Tabs from '../components/home/Tabs';

import ProductBox from '../components/common/ProductBox';
import Brands from '../components/home/Brands';

import 'swiper/css';
import HeroBanner from '../components/home/HeroBanner';
import HomeBlogs from '../components/home/HomeBlogs';
import classes from './Home.module.css';
import { useEffect } from 'react';

const mainBreakpoints = {
 320: {
  slidesPerView: 1,
 },
 640: {
  slidesPerView: 2,
 },
 768: {
  slidesPerView: 3,
 },
 1023: {
  slidesPerView: 3,
 },
};
const breakpoints = {
 320: {
  slidesPerView: 1,
 },
 640: {
  slidesPerView: 2,
 },
 768: {
  slidesPerView: 4,
 },
 1024: {
  slidesPerView: 4,
 },
};

const items = [
 {
  key: '1',
  label: 'تخت‌خواب', // Bed
  children: (
   <Slider
    items={[<ProductBox />, <ProductBox />]}
    slidesPerView={4}
    breakpoints={breakpoints}
    spaceBetween={30}
    autoplay={false}
   />
  ),
 },
 {
  key: '2',
  label: 'کمد', // Wardrobe
  children: (
   <Slider
    items={[
     <ProductBox />,
     <ProductBox />,
     <ProductBox />,
     <ProductBox />,
     <ProductBox />,
    ]}
    slidesPerView={4}
    breakpoints={breakpoints}
    spaceBetween={30}
    autoplay={false}
   />
  ),
 },
 {
  key: '3',
  label: 'پاتختی', // Nightstand
  children: (
   <Slider
    items={[<ProductBox />]}
    slidesPerView={4}
    breakpoints={breakpoints}
    spaceBetween={30}
    autoplay={false}
   />
  ),
 },
 {
  key: '4',
  label: 'آینه', // Mirror
  children: (
   <Slider
    items={[<ProductBox />]}
    slidesPerView={4}
    breakpoints={breakpoints}
    spaceBetween={30}
    autoplay={false}
   />
  ),
 },
 {
  key: '5',
  label: 'فرش', // Carpet/Rug
  children: (
   <Slider
    items={[<ProductBox />]}
    slidesPerView={4}
    breakpoints={breakpoints}
    spaceBetween={30}
    autoplay={false}
   />
  ),
 },
 {
  key: '6',
  label: 'پرده', // Curtain
  children: (
   <Slider
    items={[<ProductBox />]}
    slidesPerView={4}
    breakpoints={breakpoints}
    spaceBetween={30}
    autoplay={false}
   />
  ),
 },
 {
  key: '7',
  label: 'چراغ خواب', // Bedside lamp
  children: (
   <Slider
    items={[<ProductBox />]}
    slidesPerView={4}
    breakpoints={breakpoints}
    spaceBetween={30}
    autoplay={false}
   />
  ),
 },
 {
  key: '8',
  label: 'میز آرایش', // Dressing table
  children: (
   <Slider
    items={[<ProductBox />]}
    slidesPerView={4}
    breakpoints={breakpoints}
    spaceBetween={30}
    autoplay={false}
   />
  ),
 },
];

const Home = () => {
 // useEffect(() => {
 //   document.body.style.backgroundColor = '#1a1a2e';

 //   return () => {
 //     document.body.style.backgroundColor = '';
 //   };
 // }, []);
 return (
  <div className={classes.main}>
   <Carusel />
   <div className={classes['most-viwed-wrapper']}>
    <Slider
     items={[
      <ProductBox />,
      <ProductBox />,
      <ProductBox />,
      <ProductBox />,
      <ProductBox />,
     ]}
     slidesPerView={3}
     breakpoints={mainBreakpoints}
     spaceBetween={60}
     autoplay={false}
    />
   </div>

   <Banner />
   <Tabs items={items} title={' همه محصولات'} />
   <Brands />
   <HeroBanner />
   <HomeBlogs />
  </div>
 );
};

export default Home;
