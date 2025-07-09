import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { ReactComponent as Chart } from '../../assets/svgs/chart.svg';
import { ReactComponent as Eye } from '../../assets/svgs/eye.svg';
import { ReactComponent as Heart } from '../../assets/svgs/heart.svg';
import { ReactComponent as RedHeart } from '../../assets/svgs/red-heart.svg';

import img from '../../assets/images/photo_2025-04-26_14-50-50.jpg';

import { Link } from 'react-router-dom';
import classes from './ProductBox.module.css';
const ProductBox = ({ src, alt, title, isLiked, isInWishlist }) => {
 const [isHovered, setIsHovered] = useState(false);

 const buttonVariants = {
  containerHover: {
   x: 0,
  },
  shopButton: {
   y: -110,
  },
 };
 return (
  <div
   className={classes.main}
   onMouseEnter={() => setIsHovered(true)}
   onMouseLeave={() => setIsHovered(false)}>
   <div className={classes['image-wrapper']}>
    <Link to={'/product/1736236632/378'}>
     <img src={img} alt={alt} />
    </Link>
    <div className={classes['button-wrapper']}>
     <motion.div
      initial={{ x: -100 }}
      variants={buttonVariants}
      animate={isHovered ? 'containerHover' : 'visible'}
      transition={{ type: 'tween', duration: 0.25, delay: 0 }}>
      <IconButton className={classes['icon-button']} disableRipple>
       <Eye width={'1vw'} height={'1vw'} />
      </IconButton>
     </motion.div>
     {isLiked ? (
      <motion.div
       initial={{ x: -100 }}
       variants={buttonVariants}
       animate={isHovered ? 'containerHover' : 'visible'}
       transition={{ type: 'tween', duration: 0.25, delay: 0.1 }}>
       <IconButton className={classes['icon-button']} disableRipple>
        <RedHeart width={'1vw'} height={'1vw'} />
       </IconButton>
      </motion.div>
     ) : (
      <motion.div
       initial={{ x: -100 }}
       variants={buttonVariants}
       animate={isHovered ? 'containerHover' : 'visible'}
       transition={{ type: 'tween', duration: 0.25, delay: 0.1 }}>
       <IconButton className={classes['icon-button']} disableRipple>
        <Heart width={'1vw'} height={'1vw'} />
       </IconButton>
      </motion.div>
     )}
     <motion.div
      initial={{ x: -100 }}
      variants={buttonVariants}
      animate={isHovered ? 'containerHover' : 'visible'}
      transition={{ type: 'tween', duration: 0.25, delay: 0.2 }}>
      <IconButton className={classes['icon-button']} disableRipple>
       <Chart width={'1vw'} height={'1vw'} />
      </IconButton>
     </motion.div>
    </div>
   </div>
   <div className={classes['content-wrapper']}>
    <h5>تایتل تستی</h5>
    <p>15,000,000 تومان</p>
   </div>

   <motion.div
    initial={{ y: 0 }}
    variants={buttonVariants}
    animate={isHovered ? 'shopButton' : 'visible'}
    transition={{ type: 'tween', duration: 0.5, delay: 0 }}>
    <IconButton className={classes['shop-button']} disableRipple>
     افزودن به سبد خرید
    </IconButton>
   </motion.div>
  </div>
 );
};

export default ProductBox;
