import React from 'react';
import { useSelector } from 'react-redux';
import { Badge, IconButton } from '@mui/material';

import Content from '../../common/Content';

import { ReactComponent as Avatar } from '../../../assets/svgs/user-circle-svgrepo-com.svg';
import { ReactComponent as Heart } from '../../../assets/svgs/heart-svgrepo-com.svg';
import { ReactComponent as Login } from '../../../assets/svgs/login-2-svgrepo-com.svg';

import classes from './Header.module.css';
const Header = () => {
 const token = useSelector(state => state.tokenStore.token);

 return (
  <header>
   <Content sectionClassname={classes['wrapper-top']}>
    <div className={classes['top-wrapper']}>
     <div className={classes.right}>
      <p>شماره تماس : 09127070700</p>
      <hr />
      <p>ایمیل : test@gmail.com</p>
     </div>
     <div className={classes.left}>
      <IconButton disableRipple={true}>
       <Login width={20} height={20} />
      </IconButton>
      <Badge
       badgeContent={5}
       anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
       }}>
       <IconButton disableRipple={true}>
        <Avatar width={20} height={20} />
       </IconButton>
      </Badge>
      <Badge
       badgeContent={5}
       anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
       }}>
       <IconButton disableRipple={true}>
        <Heart width={20} height={20} />
       </IconButton>
      </Badge>
     </div>
    </div>
   </Content>
   <div className={classes['middle-wrapper']}></div>
   <div className={classes['bottom-wrapper']}></div>
  </header>
 );
};

export default Header;
