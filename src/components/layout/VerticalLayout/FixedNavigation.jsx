import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { drawerActions, accesModalActions } from '../store/store';

import { ReactComponent as Heart } from '../../../assets/svgs/heart-white.svg';
import { ReactComponent as Basket } from '../../../assets/svgs/add_basket-white.svg';
import { ReactComponent as Login } from '../../../assets/svgs/user.svg';

import classes from './FixedNavigation.module.css';
import { Avatar, Badge, IconButton } from '@mui/material';
const FixedNavigation = () => {
 const [ModalOpen, setModalOpen] = useState(false);

 const dispatch = useDispatch();

 const token = useSelector(state => state.userStore.token);
 const cart = useSelector(state => state.cartStore);
 const favorits = useSelector(state => state.favoriteStore.products);

 const handleOpenCart = () => {
  //   dispatch(drawerActions.open());
 };

 const handleOpenLogin = () => {
  setModalOpen(true);
  //   dispatch(accesModalActions.login());
 };

 const handleCloseModal = () => {
  //   dispatch(accesModalActions.close());
 };

 return (
  <div className={classes.main}>
   <>
    {token ? (
     <IconButton>
      <Avatar className={classes.avatar} />
     </IconButton>
    ) : (
     <IconButton onClick={handleOpenLogin}>
      <Login width={'20px'} height={'20px'} className={classes.svg} />
     </IconButton>
    )}
   </>

   <IconButton>
    <Badge
     badgeContent={favorits?.length || 0}
     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
     <Heart width={'35px'} height={'35px'} className={classes.svg} />
    </Badge>
   </IconButton>
   <IconButton onClick={handleOpenCart}>
    <Badge
     badgeContent={cart?.products.length || 0}
     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
     <Basket width={'35px'} height={'35px'} className={classes.svg} />
    </Badge>
   </IconButton>
  </div>
 );
};

export default FixedNavigation;
