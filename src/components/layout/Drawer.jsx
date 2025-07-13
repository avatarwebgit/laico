import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Lock, ShoppingCart, X } from 'lucide-react';

import { FormControlLabel, FormGroup, styled, Switch } from '@mui/material';

import { cartActions, drawerActions, walletActions } from '../../store/store';
import { getShoppingCart } from '../../services/api';
import { formatNumber } from '../../utils/helperFunctions';

import CartProduct from './CartProduct';
import classes from './Drawer.module.css';

const IOSSwitch = styled(props => (
 <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
 width: 42,
 height: 26,
 padding: 0,
 display: 'flex',
 '& .MuiSwitch-switchBase': {
  padding: 0,
  margin: 2,
  transitionDuration: '300ms',
  '&.Mui-checked': {
   transform: 'translateX(16px)',
   color: '#fff',
   '& + .MuiSwitch-track': {
    backgroundColor: '#2d3748',
    opacity: 1,
    border: 0,
   },
   '&.Mui-disabled + .MuiSwitch-track': {
    opacity: 0.5,
   },
  },
 },
 '& .MuiSwitch-thumb': {
  boxSizing: 'border-box',
  width: 22,
  height: 22,
 },
 '& .MuiSwitch-track': {
  borderRadius: 26 / 2,
  backgroundColor: '#E9E9EA',
  opacity: 1,
  transition: theme.transitions.create(['background-color'], {
   duration: 500,
  }),
 },
}));

const drawerVariants = {
 open: lng => ({
  x: 0,
  transition: { type: 'spring', stiffness: 350, damping: 40 },
 }),
 closed: lng => ({
  x: lng === 'fa' ? '-100%' : '100%',
  transition: { type: 'spring', stiffness: 350, damping: 40 },
 }),
};

const listContainerVariants = {
 hidden: { opacity: 0 },
 visible: {
  opacity: 1,
  transition: {
   staggerChildren: 0.08,
   delayChildren: 0.2,
  },
 },
};

const listItemVariants = {
 hidden: { y: 20, opacity: 0 },
 visible: { y: 0, opacity: 1, transition: { type: 'spring' } },
 exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const Drawer = () => {
 const dispatch = useDispatch();
 const { t } = useTranslation();
 const {
  isOpen: drawerState,
  products,
  totalPrice,
  euro,
  totalPriceAfterDiscount,
 } = useSelector(state => state.cartStore);
 const { token } = useSelector(state => state.userStore);
 const { balance: walletBalance, useWallet: walletStatus } = useSelector(
  state => state.walletStore,
 );
 const lng = useSelector(state => state.localeStore.lng) || 'fa';

 const [isLoadingData, setIsLoadingData] = useState(true);

 const toggleDrawer = () => {
  dispatch(drawerActions.close());
 };

 useEffect(() => {
  const handleGetShoppingCart = async () => {
   setIsLoadingData(true);
   try {
    const serverRes = await getShoppingCart(token);
    if (serverRes.response.ok) {
     dispatch(cartActions.set(serverRes.result.cart));
     dispatch(walletActions.setBalance(serverRes.result.wallet_balance));
    }
   } catch (error) {
    console.error('Failed to get shopping cart:', error);
   } finally {
    setIsLoadingData(false);
   }
  };

  if (drawerState && token) {
   handleGetShoppingCart();
  } else if (!token) {
   setIsLoadingData(false);
  }
 }, [drawerState, token, dispatch]);

 useEffect(() => {
  if (drawerState) {
   document.body.style.overflow = 'hidden';
  } else {
   document.body.style.overflow = '';
  }

  return () => {
   document.body.style.overflow = '';
  };
 }, [drawerState]);

 useEffect(() => {
  if (walletBalance > 0) {
   if (walletStatus) {
    dispatch(
     cartActions.setTotalPriceAfterDiscout(
      Math.max(totalPrice - walletBalance, 0),
     ),
    );
   } else {
    dispatch(cartActions.setTotalPriceAfterDiscout(totalPrice));
   }
  } else {
   dispatch(walletActions.setWalletUse(false));
  }
 }, [totalPrice, walletBalance, walletStatus, dispatch]);

 const renderContent = () => {
  if (isLoadingData) {
   return (
    <div className={classes.loadingState}>
     {[...Array(3)].map((_, i) => (
      <div key={i} className={classes.skeletonItem} />
     ))}
    </div>
   );
  }

  if (!products || products.length === 0) {
   return (
    <motion.div
     className={classes.emptyState}
     initial={{ opacity: 0, scale: 0.9 }}
     animate={{ opacity: 1, scale: 1 }}
     transition={{ delay: 0.2, ease: 'easeOut' }}>
     <ShoppingCart size={64} className={classes.emptyStateIcon} />
     <h3 className={classes.emptyStateTitle}>{t('shopping_cart.empty')}</h3>
     <p className={classes.emptyStateText}>
      {t(
       'shopping_cart.empty_message',
       "Looks like you haven't added anything yet.",
      )}
     </p>
    </motion.div>
   );
  }

  return (
   <motion.div
    className={classes.productList}
    variants={listContainerVariants}
    initial='hidden'
    animate='visible'>
    <AnimatePresence>
     {products.map(item => (
      <motion.div
       key={item.variation_id}
       layout
       variants={listItemVariants}
       exit={listItemVariants.exit}>
       <CartProduct data={item} />
      </motion.div>
     ))}
    </AnimatePresence>
   </motion.div>
  );
 };

 return (
  <AnimatePresence>
   {drawerState && (
    <div
     className={classes.container}
     role='dialog'
     aria-modal='true'
     dir={lng === 'fa' ? 'rtl' : 'ltr'}>
     <motion.div
      className={classes.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={toggleDrawer}
     />
     <motion.div
      className={classes.drawerContent}
      custom={lng}
      variants={drawerVariants}
      initial='closed'
      animate='open'
      exit='closed'>
      <header className={classes.header}>
       <h2 className={classes.title}>{t('shopping_cart.cart')}</h2>
       <motion.button
        className={classes.closeButton}
        onClick={toggleDrawer}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        aria-label='Close cart'>
        <X size={20} />
       </motion.button>
      </header>

      <main className={classes.body}>{renderContent()}</main>

      {token && products?.length > 0 && (
       <footer className={classes.footer}>
        <div className={classes.summary}>
         <div className={classes.walletControl}>
          <div className={classes.walletInfo}>
           <span className={classes.walletLabel}>{t('wallet')}</span>
           <span className={classes.walletBalance}>
            {formatNumber(Math.round(walletBalance * euro))} {t('m_unit')}
           </span>
          </div>
          <FormControlLabel
           disabled={walletBalance <= 0}
           control={
            <IOSSwitch
             checked={walletStatus}
             onChange={e => {
              dispatch(walletActions.setWalletUse(e.target.checked));
              dispatch(walletActions.setUserIntraction());
             }}
            />
           }
           labelPlacement='start'
           label={
            <span className={classes.switchLabel}>{t('use_wallet')}</span>
           }
           sx={{ m: 0 }}
          />
         </div>

         <div className={classes.summaryRow}>
          <span>{t('shopping_cart.total')}</span>
          <span>
           {formatNumber(Math.round(totalPrice * euro))} {t('m_unit')}
          </span>
         </div>
         {walletStatus && walletBalance > 0 && (
          <div className={`${classes.summaryRow} ${classes.discount}`}>
           <span>{t('wallet_discount', 'Wallet Discount')}</span>
           <span>
            -{' '}
            {formatNumber(
             Math.round(Math.min(totalPrice, walletBalance) * euro),
            )}{' '}
            {t('m_unit')}
           </span>
          </div>
         )}
         <div className={`${classes.summaryRow} ${classes.grandTotal}`}>
          <span>{t('payment')}</span>
          <span>
           {formatNumber(Math.round(totalPriceAfterDiscount * euro))}{' '}
           {t('m_unit')}
          </span>
         </div>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
         <Link
          to={`/${lng}/precheckout`}
          target='_blank'
          className={classes.checkoutButton}
          onClick={toggleDrawer}>
          {t('shopping_cart.pay')}
         </Link>
        </motion.div>
       </footer>
      )}

      {!token && products?.length > 0 && (
       <footer className={`${classes.footer} ${classes.loginFooter}`}>
        <motion.button
         className={classes.checkoutButton}
         onClick={() => {
          // This should trigger a login modal
          toggleDrawer();
          // dispatch(accesModalActions.login());
         }}
         whileHover={{ scale: 1.03 }}
         whileTap={{ scale: 0.98 }}>
         <Lock size={16} />
         {t('login_to_continue', 'Login to Continue')}
        </motion.button>
       </footer>
      )}
     </motion.div>
    </div>
   )}
  </AnimatePresence>
 );
};

export default Drawer;
