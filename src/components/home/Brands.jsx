import Content from '../common/Content';
import Slider from '../common/Slider';

import classes from './Brands.module.css';

import img1 from '../../assets/images/brand-02.png';
import img2 from '../../assets/images/brand-03.png';
import img3 from '../../assets/images/brand-04.png';
import img4 from '../../assets/images/brand-05.png';
import img20 from '../../assets/images/brand-03.png';
import img30 from '../../assets/images/brand-04.png';
import img40 from '../../assets/images/brand-05.png';

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
 <div>
  <img src={img1} alt='' />
 </div>,
 <div>
  <img src={img2} alt='' />
 </div>,
 <div>
  <img src={img3} alt='' />
 </div>,
 <div>
  <img src={img4} alt='' />
 </div>,
 <div>
  <img src={img20} alt='' />
 </div>,
 <div>
  <img src={img30} alt='' />
 </div>,
 <div>
  <img src={img40} alt='' />
 </div>,
];

const Brands = () => {
 return (
  <Content>
   <div className={classes.wrapper}>
    <div className={classes.content}>
     <Slider
      items={items}
      breakpoints={breakpoints}
      slidesPerView={5}
      spaceBetween={'50'}
      navigation={false}
     />
    </div>
   </div>
  </Content>
 );
};

export default Brands;
