import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../store/cart/cartSlice';
import { drawerActions } from '../store/drawer/drawerSlice';

import Checkout from '../components/checkout/Checkout';
import Payment from '../components/checkout/Payment';
import ShoppingCart from '../components/checkout/ShoppingCart';
import Card from '../components/common/Card';
import CustomStepper from '../components/common/CustomStepper';

import { getOrderStatusDetail, getPayments } from '../services/api';

import { Button } from '@mui/material';
import PaymentMethod from '../components/checkout/PaymentMethod';
import { formatNumber, notify } from '../utils/helperFucntions';

import classes from './PreCheckout.module.css';
import Content from '../components/common/Content';
const PreCheckout = () => {
 const [step, setStep] = useState(0);
 const [isDataValid, setIsDataValid] = useState(true);
 const [paymentMethods, setPaymentMethods] = useState([]);
 const [detailsData, setDetailsData] = useState([]);

 const { t } = useTranslation();

 const card = useSelector(state => state.cartStore);
 const lng = 'fa';
 const token = useSelector(state => state.userStore.token);
 const cart = useSelector(state => state.cartStore);

 const dispatch = useDispatch();

 const p = async () => {
  const serverRes = await getPayments();
  if (serverRes.response.ok) {
   setPaymentMethods(serverRes.result.data);
  }
 };

 const handleGetdetails = async orderId => {
  if (orderId) {
   const serverRes = await getOrderStatusDetail(token, orderId);

   if (serverRes.response.ok) {
    setDetailsData(serverRes.result.orders);
   } else {
    notify(t('trylater'));
   }
  }
 };

 useEffect(() => {
  document.title = t('precheckout');
  dispatch(drawerActions.close());
  p();
  handleGetdetails();
 }, []);

 const handleGotoNextStep = () => {
  if (step === 0) {
   const products = card.products.filter(el => el.selected_quantity !== 0);
   dispatch(cartActions.setFinalCart(products));
   setStep(step < 2 ? step + 1 : 2);
  }
  if (step === 1 && isDataValid) {
   setStep(step < 2 ? step + 1 : 2);
  }
 };

 return (
  <div className={classes.main}>
   <CustomStepper activeStep={step} className={classes.stepper} />
   <Content className={classes.card}>
    {step === 0 && <ShoppingCart />}
    {step === 1 && <Checkout isDataValid={setIsDataValid} />}
    {step === 2 && <Payment />}
    <div className={classes.action_wrapper}>
     <div
      className={classes.total_wrapper}
      style={{ direction: lng === 'fa' ? 'rtl' : 'ltr' }}>
      <span className={classes.title}>{t('pc.payment')}</span>
      {card && (
       <>
        {step !== 2 ? (
         <span className={classes.amont}>
          {lng !== 'fa'
           ? card?.totalPrice?.toFixed(2)
           : formatNumber(+card?.totalPrice * card.euro)}
          &nbsp;{t('m_unit')}
         </span>
        ) : (
         <span className={classes.amont}>
          {lng !== 'fa'
           ? card?.finalPayment.toFixed(2)
           : formatNumber(+card?.finalPayment * card.euro)}
          &nbsp;{t('m_unit')}
         </span>
        )}
       </>
      )}
     </div>

     {step < 2 && (
      <Button
       className={classes.step_btn}
       onClick={handleGotoNextStep}
       variant='contained'
       size='large'
       disabled={step === 1 && !isDataValid}>
       {t('pc.nstep')}
      </Button>
     )}
     {step === 2 && <PaymentMethod dataProps={paymentMethods} />}
     {0 < step && step <= 2 && (
      <Button
       className={classes.step_btn_back}
       onClick={() => setStep(step > 0 ? step - 1 : 0)}
       variant='text'
       size='large'>
       {t('pc.pstep')}
      </Button>
     )}
    </div>
   </Content>
  </div>
 );
};

export default PreCheckout;
