import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, Lock, ShoppingCart, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { drawerActions } from '../../store/drawer/drawerSlice';

import CartItem from './CartItem';
import classes from './CartDrawer.module.css';
import { formatNumber } from '../../utils/helperFucntions';

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

const dummyProducts = [
 {
  id: 1,
  variation_id: 101,
  name: 'Classic Black T-Shirt',
  alias: 'classic-black-t-shirt',
  primary_image:
   'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  color: 'Black',
  size: 'M',
  sale_price: 25,
  selected_quantity: 1,
 },
 {
  id: 2,
  variation_id: 202,
  name: 'Comfortable Blue Jeans',
  alias: 'comfortable-blue-jeans',
  primary_image:
   'https://images.unsplash.com/photo-1602293589930-45a9de87944e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  color: 'Blue Denim',
  size: '32/32',
  sale_price: 70,
  selected_quantity: 1,
 },
 {
  id: 3,
  variation_id: 303,
  name: 'White Canvas Sneakers',
  alias: 'white-canvas-sneakers',
  primary_image:
   'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  color: 'White',
  size: '10',
  sale_price: 55,
  selected_quantity: 2,
 },
 {
  id: 4,
  variation_id: 303,
  name: 'White Canvas Sneakers',
  alias: 'white-canvas-sneakers',
  primary_image:
   'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  color: 'White',
  size: '10',
  sale_price: 55,
  selected_quantity: 2,
 },
 {
  id: 5,
  variation_id: 303,
  name: 'White Canvas Sneakers',
  alias: 'white-canvas-sneakers',
  primary_image:
   'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  color: 'White',
  size: '10',
  sale_price: 55,
  selected_quantity: 2,
 },
];

const CartDrawer = () => {
 const dispatch = useDispatch();

 const { t } = useTranslation();

 const [products, setProducts] = useState(dummyProducts);
 const drawerState = useSelector(state => state.drawerStore.cartDrawer);
 const token = useSelector(state => state.userStore.token);

 const lng = 'fa';

 const drawerVariants = {
  open: lng => ({
   x: 0,
   transition: { type: 'spring', stiffness: 350, damping: 40 },
  }),
  closed: lng => ({
   x: lng === 'fa' ? '100%' : '100%',
   transition: { type: 'spring', stiffness: 350, damping: 40 },
  }),
 };
 const [isLoadingData, setIsLoadingData] = useState(false);

 const handleQuantityUpdate = (itemId, newQuantity) => {
  setProducts(currentProducts =>
   currentProducts.map(p =>
    p.id === itemId ? { ...p, selected_quantity: newQuantity } : p,
   ),
  );
 };

 const handleRemoveItem = itemId => {
  setProducts(currentProducts => currentProducts.filter(p => p.id !== itemId));
 };

 const euro = 1000;

 const { totalPrice, grandTotal } = useMemo(() => {
  const total = products.reduce(
   (acc, item) => acc + item.sale_price * item.selected_quantity,
   0,
  );
  const calculatedPrice = Math.round(total * euro);
  return {
   totalPrice: calculatedPrice,
   grandTotal: calculatedPrice, // Assuming no discounts/taxes for now
  };
 }, [products]);

 const toggleDrawer = () => {
  dispatch(drawerActions.cartClose());
 };

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
     <h3 className={classes.emptyStateTitle}>{t('drawer.empty')}</h3>
     <p className={classes.emptyStateText}>{t('drawer.empty_message')}</p>
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
       <CartItem
        data={item}
        onQuantityUpdate={handleQuantityUpdate}
        onRemoveItem={handleRemoveItem}
       />
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

      {products?.length > 0 && (
       <footer className={classes.footer}>
        <div className={classes.summary}>
         <div className={classes.summaryRow}>
          <span>{t('subtotal')}</span>
          <span>{formatNumber(totalPrice)}</span>
         </div>
         <div className={`${classes.summaryRow} ${classes.grandTotal}`}>
          <span>{t('shopping_cart.total', 'Total')}</span>
          <span>{formatNumber(grandTotal)}</span>
         </div>
        </div>
        {token ? (
         <Link
          to='/checkout'
          className={classes.checkoutButton}
          onClick={toggleDrawer}>
          <CreditCard size={18} />
          {t('drawer.checkout')}
         </Link>
        ) : (
         <Link
          to='/login'
          className={classes.checkoutButton}
          onClick={toggleDrawer}>
          <CreditCard size={18} />
          {t('drawer.checkout')}
         </Link>
        )}
       </footer>
      )}

      {/* {!token && (
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
         {t('drawer.login_to_continue')}
        </motion.button>
       </footer>
      )} */}
     </motion.div>
    </div>
   )}
  </AnimatePresence>
 );
};

export default CartDrawer;
