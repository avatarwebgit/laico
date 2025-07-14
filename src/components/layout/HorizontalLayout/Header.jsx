import { Badge, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Content from '../../common/Content';

import logo from '../../../assets/images/Logo.png';
import { ReactComponent as Basket } from '../../../assets/svgs/add_basket.svg';
import { ReactComponent as Heart } from '../../../assets/svgs/heart-svg.svg';
import { ReactComponent as Login } from '../../../assets/svgs/login.svg';
import { ReactComponent as Avatar } from '../../../assets/svgs/user.svg';

import { useNavigation } from '../../../utils/helperFucntions';

import '../../../styles/common.css';
import Search from '../../common/Search';
import classes from './Header.module.css';
import { drawerActions } from '../../../store/drawer/drawerSlice';
const Header = () => {
 const [scrollY, setScrollY] = useState(0);
 const token = useSelector(state => state.userStore.token);

 const dispatch = useDispatch();

 let height,
  width = '20px';

 const { navigateTo } = useNavigation();

 const handleGoToLogin = () => {
  navigateTo('/login', { state: {} });
 };

 useEffect(() => {
  window.addEventListener('load', () => setScrollY(window.scrollY));
  window.addEventListener('scroll', () => setScrollY(window.scrollY));

  return () => {
   window.removeEventListener('load', () => setScrollY(window.scrollY));
   window.removeEventListener('scroll', () => setScrollY(window.scrollY));
  };
 }, []);

 useEffect(() => {
  if (scrollY) {
   console.log(scrollY > 100);
  }
 }, [scrollY]);

 return (
  <div>
   <header>
    <Content sectionClassname={classes['wrapper-top']}>
     <div className={classes['top-wrapper']}>
      <div className={classes.right}>
       <p>شماره تماس : 09127070700</p>
       <hr />
       <p>ایمیل : test@gmail.com</p>
      </div>
      <div className={classes.left}>
       <Badge
        badgeContent={5}
        anchorOrigin={{
         vertical: 'top',
         horizontal: 'right',
        }}>
        <IconButton
         disableRipple={true}
         onClick={() => dispatch(drawerActions.cartOpen())}>
         <Basket className='icon-normal' />
        </IconButton>
       </Badge>
       <Badge
        badgeContent={5}
        anchorOrigin={{
         vertical: 'top',
         horizontal: 'right',
        }}>
        <IconButton
         disableRipple={true}
         onClick={() => dispatch(drawerActions.favoritesOpen())}>
         <Heart className='icon-normal' />
        </IconButton>
       </Badge>
       <IconButton
        disableRipple={true}
        onClick={() => navigateTo('/profile/dashboard')}>
        <Avatar className='icon-normal' />
       </IconButton>
       <IconButton disableRipple={true} onClick={handleGoToLogin}>
        <Login className='icon-normal' />
       </IconButton>
      </div>
     </div>
    </Content>
    <div className={classes['middle-wrapper']}>
     <a href='/'>
      <img src={logo} alt='' width={95} height={80} />
     </a>
    </div>
    <Content contentClassname={classes['bottom-wrapper']}>
     <ul className={classes['buttom-wrapper']}>
      <div>
       <li>خانه</li>
       <div className={classes['mega-paper']}></div>
      </div>
      <div>
       <li>فروشگاه</li>
       <div className={classes['mega-paper']}></div>
      </div>
      <div>
       <li>صفحات</li>
       <div className={classes['mega-paper']}></div>
      </div>
      <div>
       <li>تماس با ما</li>
       <div className={classes['mega-paper']}></div>
      </div>
     </ul>
     <Search />
    </Content>
   </header>
   <motion.div
    initial={{ top: 0 }}
    animate={{ top: scrollY < 100 ? -250 : 0 }}
    className={classes['fixed-header']}>
    <Content contentClassname={`${classes['bottom-wrapper']} `}>
     <ul className={classes['buttom-wrapper']}>
      <li style={{ zIndex: '10' }}>
       <a href='/'>
        <img src={logo} alt='' width={80} height={80} />
       </a>
      </li>
      <div>
       <li>خانه</li>
       <div className={classes['mega-paper']}></div>
      </div>
      <div>
       <li>فروشگاه</li>
       <div className={classes['mega-paper']}></div>
      </div>
      <div>
       <li>صفحات</li>
       <div className={classes['mega-paper']}></div>
      </div>
      <div>
       <li>تماس با ما</li>
       <div className={classes['mega-paper']}></div>
      </div>
     </ul>
     <Search />
    </Content>
   </motion.div>
  </div>
 );
};

export default Header;
