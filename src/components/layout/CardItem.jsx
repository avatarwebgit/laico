import { Add, Delete, Info, Remove } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetailsWithId, sendShoppingCart } from '../../services/api';

import { Link } from 'react-router-dom';
import classes from './CartItem.module.css';

const CartItem = ({ data: productData }) => {
 const [quantity, setQuantity] = useState(1);
 const [variation, setVariation] = useState(null);
 const [isMoreThanQuantity, setIsMoreThanQuantity] = useState(false);

 const abortControllerRef = useRef(new AbortController());

 const { t } = useTranslation();
 const lng = useSelector(state => state.localeStore.lng);
 const euro = useSelector(state => state.cartStore.euro);
 const token = useSelector(state => state.userStore.token);
 const dispatch = useDispatch();

 useEffect(() => {
  const getVariationDetails = async () => {
   if (productData) {
    setQuantity(productData.selected_quantity);
    const serverRes = await getProductDetailsWithId(productData.variation_id);
    if (serverRes.response.ok) {
     setVariation(serverRes.result);
    }
   }
  };
  getVariationDetails();

  return () => {
   abortControllerRef.current.abort();
  };
 }, [productData]);

 const handleUpdateCart = useCallback(
  async newQuantity => {
   try {
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    const serverRes = await sendShoppingCart(
     token,
     productData.id,
     productData.variation_id,
     +newQuantity,
     abortControllerRef.current.signal,
    );

    if (serverRes.response.ok && serverRes.result.total_price) {
    }
   } catch (err) {
    if (err.name !== 'AbortError') {
     console.error('Failed to update cart:', err);
    }
   }
  },
  [token, productData, dispatch, t],
 );

 const handleQuantityChange = newQuantity => {
  if (!variation) return;

  const availableQuantity = variation.product?.variation?.quantity;
  const isByOrder =
   variation.product?.variation?.is_not_available !== 0 ||
   availableQuantity === 0;

  if (newQuantity < 1) {
   newQuantity = 1;
  }

  if (!isByOrder && newQuantity > availableQuantity) {
   setQuantity(availableQuantity);
   handleUpdateCart(availableQuantity);
   setIsMoreThanQuantity(true);
  } else {
   setQuantity(newQuantity);
   handleUpdateCart(newQuantity);
   setIsMoreThanQuantity(false);
  }
 };

 const handleRemoveItem = async () => {
  if (true) {
  } else {
  }
 };

 if (!productData) {
  return null;
 }

 const productName = productData.name || `${t('Product')} ${productData.id}`;
 const productLink = `/${lng}/products/${productData.alias}/${productData.variation_id}`;
 const isByOrderProduct =
  variation?.product?.variation?.quantity === 0 &&
  variation?.product?.variation?.is_not_available === 0;

 return (
  <div
   className={classes.main}
   style={{ direction: lng === 'fa' ? 'rtl' : 'ltr' }}>
   <div className={classes.imageWrapper}>
    <Link to={productLink} target='_blank'>
     <img src={productData.primary_image} alt={productName} loading='lazy' />
    </Link>
   </div>

   <div className={classes.detailsWrapper}>
    <Link to={productLink} target='_blank' className={classes.productNameLink}>
     <h3 className={classes.productName}>{productName}</h3>
    </Link>
    <p className={classes.productAttributes}>
     {t('color')}: {productData.color} | {t('size')}: {productData.size}
    </p>
    <p className={classes.itemPrice}>
     {Math.round(productData.sale_price * euro)} {t('m_unit')}
    </p>
   </div>

   <div className={classes.actionsWrapper}>
    <div
     className={`${classes.quantityChanger} ${
      isMoreThanQuantity ? classes.error : ''
     }`}>
     <motion.button
      whileTap={{ scale: 0.9 }}
      className={classes.quantityButton}
      onClick={() => handleQuantityChange(quantity - 1)}
      disabled={quantity <= 1}>
      <Remove fontSize='small' />
     </motion.button>
     <span className={classes.quantityDisplay}>{quantity}</span>
     <motion.button
      whileTap={{ scale: 0.9 }}
      className={classes.quantityButton}
      onClick={() => handleQuantityChange(quantity + 1)}>
      <Add fontSize='small' />
     </motion.button>
    </div>

    <p className={classes.totalPrice}>
     {Math.round(quantity * productData.sale_price * euro)} {t('m_unit')}
    </p>

    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
     <Tooltip title={t('remove_item')} placement='top'>
      <IconButton
       onClick={handleRemoveItem}
       className={classes.deleteButton}
       size='small'>
       <Delete fontSize='small' />
      </IconButton>
     </Tooltip>
    </motion.div>
   </div>

   {isByOrderProduct && (
    <Tooltip
     title={t('byorder')}
     className={classes.tooltip}
     arrow
     placement={lng === 'fa' ? 'right' : 'left'}>
     <Info className={classes.infoIcon} />
    </Tooltip>
   )}
   {isMoreThanQuantity && (
    <div className={classes.outOfStockMessage}>
     {t('availableQuantity')}: {variation.product.variation.quantity}
    </div>
   )}
  </div>
 );
};

export default memo(CartItem);
