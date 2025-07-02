import Carusel from '../components/home/Carousel';

import Slider from '../components/common/Slider';
import Banner from '../components/home/Banner';
import Tabs from '../components/home/Tabs';

import ProductBox from '../components/common/ProductBox';
import Brands from '../components/home/Brands';

import classes from './Home.module.css';
import 'swiper/css';
import HeroBanner from '../components/home/HeroBanner';

const mainBreakpoints = {
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
 1023: {
  slidesPerView: 3,
  spaceBetween: 10,
 },
};
const breakpoints = {
 320: {
  slidesPerView: 1,
  spaceBetween: 10,
 },
 640: {
  slidesPerView: 2,
  spaceBetween: 10,
 },
 768: {
  slidesPerView: 4,
  spaceBetween: 10,
 },
 1024: {
  slidesPerView: 4,
  spaceBetween: 10,
 },
};

const items = [
 {
  key: '1',
  label: 'Tab 1',
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
  label: 'Tab 2',
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
  label: 'Tab 3',
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
  label: 'Tab 4',
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
  label: 'Tab 5',
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
 return (
  <div className={classes.main}>
   <Carusel />
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
   <Banner />
   <Tabs items={items} title={' همه محصولات'} />
   <Brands />
   <HeroBanner />
  </div>
 );
};

export default Home;
