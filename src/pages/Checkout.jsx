import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  CreditCard,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  Truck
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import CountUp from 'react-countup';
import { formatNumber } from '../utils/helperFucntions';
import styles from './Checkout.module.css';

const initialCartItems = [
 {
  id: 'wish1',
  name: 'تلسکوپ هوشمند کهکشانی',
  price: 499000,
  imageUrl:
   'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  quantity: 1,
 },
 {
  id: 'wish2',
  name: 'پوستر سحابی چشم گربه',
  price: 75000,
  imageUrl:
   'https://images.unsplash.com/photo-1614726365949-9273435a25e8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  quantity: 2,
 },
 {
  id: 'wish3',
  name: 'ماگ با طرح فضانورد',
  price: 120000,
  imageUrl:
   'https://images.unsplash.com/photo-1589254066007-898d52d910d3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  quantity: 1,
 },
];

const initialAddresses = [
 {
  id: 'addr1',
  firstName: 'کازمو',
  lastName: 'استارلایت',
  address: '123 خیابان سحابی، شهر ستاره‌ای، کد پستی ۹۸۷۶۵',
  isDefault: true,
 },
 {
  id: 'addr2',
  firstName: 'گالیله',
  lastName: 'کوازار',
  address: '456 مسیر دنباله‌دار، سیاره سبز، کد پستی ۵۴۳۲۱',
  isDefault: false,
 },
];

const shippingCost = 25000;

const Stepper = ({ currentStep }) => {
 const steps = [
  { id: 1, name: 'سبد خرید', icon: <ShoppingCart size={24} /> },
  { id: 2, name: 'آدرس و ارسال', icon: <MapPin size={24} /> },
  { id: 3, name: 'پرداخت', icon: <CreditCard size={24} /> },
 ];

 return (
  <div className={styles.stepperContainer}>
   <div className={styles.stepperProgress}>
    <motion.div
     className={styles.stepperProgressBar}
     initial={{ width: '0%' }}
     animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
     transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    />
   </div>
   {steps.map(step => (
    <div
     key={step.id}
     className={`${styles.step} ${
      currentStep >= step.id ? styles.active : ''
     }`}>
     <motion.div
      className={styles.stepIcon}
      animate={currentStep >= step.id ? { scale: 1.1 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
      {step.icon}
     </motion.div>
     <div className={styles.stepName}>{step.name}</div>
    </div>
   ))}
  </div>
 );
};

const Checkout = () => {
 const [step, setStep] = useState(1);
 const [currentPrice, setCurrentPrice] = useState(0);
 const [prevPrice, setPrevPrice] = useState(0);
 const [cartItems, setCartItems] = useState(initialCartItems);
 const [selectedAddressId, setSelectedAddressId] = useState(
  initialAddresses.find(a => a.isDefault)?.id || null,
 );
 const [selectedPayment, setSelectedPayment] = useState('online');

 const handleQuantityChange = (id, delta) => {
  setCartItems(
   cartItems
    .map(item =>
     item.id === id ? { ...item, quantity: item.quantity + delta } : item,
    )
    .filter(item => item.quantity > 0),
  );
 };

 const subtotal = useMemo(
  () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  [cartItems],
 );

 const total = useMemo(
  () => (step > 1 ? subtotal + shippingCost : subtotal),
  [subtotal, step],
 );

 useEffect(() => {
  setPrevPrice(currentPrice / 10);
  setCurrentPrice(total / 10);
 }, [total]);

 const handleNext = () => setStep(s => Math.min(s + 1, 3));
 const handleBack = () => setStep(s => Math.max(s - 1, 1));

 const containerVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
   opacity: 1,
   x: 0,
   transition: {
    type: 'spring',
    stiffness: 250,
    damping: 30,
    staggerChildren: 0.1,
   },
  },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
 };

 const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
 };

 const OrderSummary = () => (
  <motion.div layout className={styles.summaryCard}>
   <h2 className={styles.summaryTitle}>خلاصه سفارش</h2>
   <div className={styles.summaryItemsList}>
    <AnimatePresence>
     {cartItems.map(item => (
      <motion.div
       layout
       key={item.id}
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0, x: -20 }}
       className={styles.summaryItem}>
       <img
        src={item.imageUrl}
        alt={item.name}
        className={styles.summaryItemImage}
       />
       <div className={styles.summaryItemDetails}>
        <span className={styles.summaryItemName}>{item.name}</span>
        <span className={styles.summaryItemQuantity}>{item.quantity} عدد</span>
       </div>
       <span className={styles.summaryItemPrice}>
        {formatNumber(item.price * item.quantity)}
       </span>
      </motion.div>
     ))}
    </AnimatePresence>
   </div>
   <div className={styles.summaryTotals}>
    <div className={styles.summaryTotalRow}>
     <span>جمع کل</span>
     <span>{formatNumber(subtotal)}</span>
    </div>
    <AnimatePresence>
     {step > 1 && (
      <motion.div
       className={styles.summaryTotalRow}
       initial={{ opacity: 0, height: 0 }}
       animate={{ opacity: 1, height: 'auto' }}
       exit={{ opacity: 0, height: 0 }}>
       <span>هزینه ارسال</span>
       <span>{formatNumber(shippingCost)}</span>
      </motion.div>
     )}
    </AnimatePresence>
    <div className={`${styles.summaryTotalRow} ${styles.grandTotal}`}>
     <span>قابل پرداخت</span>
     <span>
      <CountUp
       className='account-balance'
       start={prevPrice}
       end={currentPrice}
       duration={0.5}
       useEasing={true}
       separator=','
       formattingFn={value => value.toLocaleString('fa-IR')}
      />
      &nbsp; تومان
     </span>
    </div>
   </div>
  </motion.div>
 );

 return (
  <div className={styles.container}>
   <div className={styles.mainContent}>
    <Stepper currentStep={step} />
    <AnimatePresence mode='wait'>
     <motion.div
      key={step}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'>
      {step === 1 && (
       <motion.div variants={itemVariants}>
        <h2 className={styles.stepTitle}>سبد خرید شما</h2>
        <div className={styles.cartItemsContainer}>
         <AnimatePresence>
          {cartItems.map(item => (
           <motion.div
            layout
            key={item.id}
            className={styles.cartItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}>
            <img
             src={item.imageUrl}
             alt={item.name}
             className={styles.cartItemImage}
            />
            <div className={styles.cartItemInfo}>
             <h3 className={styles.cartItemName}>{item.name}</h3>
             <p className={styles.cartItemPrice}>{formatNumber(item.price)}</p>
            </div>
            <div className={styles.cartItemQuantity}>
             <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(item.id, 1)}>
              <Plus size={16} />
             </motion.button>
             <span className={styles.quantityText}>{item.quantity}</span>
             <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(item.id, -1)}>
              {item.quantity > 1 ? (
               <Minus size={16} />
              ) : (
               <Trash2 size={16} color='#ef4444' />
              )}
             </motion.button>
            </div>
            <div className={styles.cartItemTotal}>
             {formatNumber(item.price * item.quantity)}
            </div>
           </motion.div>
          ))}
         </AnimatePresence>
        </div>
       </motion.div>
      )}

      {step === 2 && (
       <motion.div variants={itemVariants}>
        <h2 className={styles.stepTitle}>آدرس و نحوه ارسال</h2>
        <div className={styles.addressList}>
         {initialAddresses.map(addr => (
          <motion.div
           layout
           key={addr.id}
           className={`${styles.selectableCard} ${
            selectedAddressId === addr.id ? styles.selected : ''
           }`}
           onClick={() => setSelectedAddressId(addr.id)}
           whileHover={{ scale: 1.02 }}>
           <MapPin size={24} className={styles.cardIcon} />
           <div className={styles.cardDetails}>
            <p className={styles.cardName}>
             {addr.firstName} {addr.lastName}
            </p>
            <p className={styles.cardText}>{addr.address}</p>
           </div>
           <AnimatePresence>
            {selectedAddressId === addr.id && (
             <motion.div
              className={styles.checkIndicator}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}>
              <Check size={16} />
             </motion.div>
            )}
           </AnimatePresence>
          </motion.div>
         ))}
        </div>
        <div className={styles.shippingMethod}>
         <Truck size={24} className={styles.cardIcon} />
         <div className={styles.cardDetails}>
          <p className={styles.cardName}>پست پیشتاز</p>
          <p className={styles.cardText}>تحویل بین ۳ تا ۵ روز کاری</p>
         </div>
         <span className={styles.shippingPrice}>
          {formatNumber(shippingCost)}
         </span>
        </div>
       </motion.div>
      )}

      {step === 3 && (
       <motion.div variants={itemVariants}>
        <h2 className={styles.stepTitle}>روش پرداخت</h2>
        <div className={styles.paymentOptions}>
         <motion.div
          layout
          className={`${styles.selectableCard} ${
           selectedPayment === 'online' ? styles.selected : ''
          }`}
          onClick={() => setSelectedPayment('online')}
          whileHover={{ scale: 1.02 }}>
          <CreditCard size={24} className={styles.cardIcon} />
          <div className={styles.cardDetails}>
           <p className={styles.cardName}>پرداخت آنلاین (درگاه امن)</p>
           <p className={styles.cardText}>
            پرداخت از طریق کلیه کارت‌های عضو شتاب
           </p>
          </div>
          <AnimatePresence>
           {selectedPayment === 'online' && (
            <motion.div
             className={styles.checkIndicator}
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}>
             <Check size={16} />
            </motion.div>
           )}
          </AnimatePresence>
         </motion.div>
        </div>
       </motion.div>
      )}

      <div className={styles.stepActions}>
       <motion.button
        onClick={handleBack}
        className={`${styles.button} ${styles.secondary}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ visibility: step > 1 ? 'visible' : 'hidden' }}>
        بازگشت
       </motion.button>
       {step < 3 ? (
        <motion.button
         onClick={handleNext}
         className={`${styles.button} ${styles.primary}`}
         whileHover={{
          scale: 1.05,
          y: -2,
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
         }}
         whileTap={{ scale: 0.95 }}
         disabled={
          (step === 1 && cartItems.length === 0) ||
          (step === 2 && !selectedAddressId)
         }>
         <span>ادامه</span>
         <ChevronLeft size={20} />
        </motion.button>
       ) : (
        <motion.button
         onClick={() => alert('سفارش شما با موفقیت ثبت شد!')}
         className={`${styles.button} ${styles.primary}`}
         whileHover={{
          scale: 1.05,
          y: -2,
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
         }}
         whileTap={{ scale: 0.95 }}>
         پرداخت و ثبت نهایی
        </motion.button>
       )}
      </div>
     </motion.div>
    </AnimatePresence>
   </div>
   <aside className={styles.sidebar}>
    <OrderSummary />
   </aside>
  </div>
 );
};

export default Checkout;
