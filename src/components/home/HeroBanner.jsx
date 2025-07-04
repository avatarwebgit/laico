
import img1 from '../../assets/images/1_2.png';
import img2 from '../../assets/images/best-product-01.png';

import RoundButton from '../common/RoundButton';
import classes from './HeroBanner.module.css';
const HeroBanner = () => {
 return (
  <div className={classes['hero-banner']}>
   <div className={classes['content']}>
    <figure className={classes['main-image']}>
     <img src={img2} alt='' />
    </figure>
    <div className={classes['hero-content']}>
     <h3 className={classes['shadow-text']}>تفیف های مارا ببینید</h3>
     <h3 className={classes['title']}>تفیف های مارا ببینید</h3>
     <p className={classes['caption']}>
      این یک حقیقت ثابت‌شده است که خواننده با محتوای قابل خواندن حواس‌اش پرت
      می‌شود.
     </p>
     <RoundButton className={classes['rounded-btn']} text={'خرید کنید'} />
    </div>
    <figure className={classes['secondary-image']}>
     <img src={img1} alt='' />
    </figure>
   </div>
  </div>
 );
};

export default HeroBanner;
