import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search as MUISearch, Menu } from '@mui/icons-material';
import { Box, Drawer as MuiDrawer, IconButton, Input } from '@mui/material';

import close from '../../../assets/svgs/close.svg';

// import Search from '../components/Search';
import MobileDrawerList from './MobileDrawerList';
import Logo from '../../../assets/images/Logo.png';

import classes from './Header.module.css';
const MobileHeader = () => {
 const [drawerOpen, setDrawerOpen] = useState(false);
 const isHomePage = true;
 const closeDrawer = v => {
  setDrawerOpen(v);
 };
 return (
  <div className={classes.main}>
   <motion.span
    className={`${classes.search_container}`}
    transition={{ type: 'spring', damping: 100, stiffness: 1000 }}>
    <div className={classes.mobile_actions_wrapper}>
     <IconButton onClick={() => closeDrawer(true)}>
      <Menu
       className={classes.card_icons}
       sx={{
        width: '25px',
        height: '25px',
        color: isHomePage ? '#000000 !important' : '#ffffff !important',
       }}
      />
     </IconButton>
     <MuiDrawer
      anchor={'right'}
      open={drawerOpen}
      onClose={() => closeDrawer(false)}>
      <Box
       sx={{
        width: '90vw',
        height: '100%',
       }}>
       <div className={classes.drawer_content}>
        <button
         className={classes.drawer_close}
         onClick={() => closeDrawer(false)}>
         <img className={classes.drawer_close_img} src={close} alt='' />
        </button>
        <Input
         className={classes.menu_input}
         endAdornment={
          <>
           <MUISearch sx={{ color: 'white' }} />
          </>
         }
        />
        <MobileDrawerList />
       </div>
      </Box>
     </MuiDrawer>
    </div>
   </motion.span>
   <img src={Logo} alt='' width={70} height={70} />
   <div>O</div>
  </div>
 );
};

export default MobileHeader;
