import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutSuccess.module.css';

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
  opacity: 1,
  transition: {
   staggerChildren: 0.2,
   delayChildren: 0.3,
  },
 },
};

const itemVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: {
  opacity: 1,
  y: 0,
  transition: { type: 'spring', stiffness: 100, damping: 12 },
 },
};

const ConfettiPiece = ({ x, y, rotation, color }) => {
 return (
  <motion.div
   className={styles.confetti}
   style={{ '--piece-bg': color }}
   initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
   animate={{
    x: x,
    y: y,
    rotate: rotation,
    opacity: [1, 1, 0],
   }}
   transition={{
    duration: Math.random() * 2 + 2,
    ease: 'easeOut',
   }}
  />
 );
};

const CheckoutSuccess = () => {
 const navigate = useNavigate();
 const [orderId] = useState(`ORD-${Date.now().toString().slice(-6)}`);
 const [showConfetti, setShowConfetti] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => setShowConfetti(true), 800);
  return () => clearTimeout(timer);
 }, []);

 const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 800,
  y: (Math.random() - 0.5) * 800,
  rotation: Math.random() * 360,
  color: ['var(--main-color-3)', 'var(--main-color-4)', '#ffc700', '#0b2f9f'][
   Math.floor(Math.random() * 4)
  ],
 }));

 return (
  <div className={styles.pageWrapper}>
   <motion.div
    className={styles.container}
    variants={containerVariants}
    initial='hidden'
    animate='visible'>
    <motion.div className={styles.iconWrapper}>
     <svg className={styles.checkmarkSvg} viewBox='0 0 52 52'>
      <motion.circle
       cx='26'
       cy='26'
       r='25'
       fill='none'
       stroke={getComputedStyle(document.documentElement).getPropertyValue(
        '--status-delivered-bg',
       )}
       strokeWidth='2'
      />
      <motion.path
       d='M14 27l5.5 5.5L38 18'
       fill='none'
       strokeWidth='4'
       strokeLinecap='round'
       strokeLinejoin='round'
       stroke={getComputedStyle(document.documentElement).getPropertyValue(
        '--status-delivered-text',
       )}
       initial={{ pathLength: 0, opacity: 0 }}
       animate={{ pathLength: 1, opacity: 1 }}
       transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      />
     </svg>
     <AnimatePresence>
      {showConfetti &&
       confettiPieces.map(p => <ConfettiPiece key={p.id} {...p} />)}
     </AnimatePresence>
    </motion.div>

    <motion.h1 className={styles.title} variants={itemVariants}>
     پرداخت موفق بود!
    </motion.h1>
    <motion.p className={styles.subtitle} variants={itemVariants}>
     از خرید شما سپاسگزاریم. خلاصه‌ی سفارش شما اینجاست.
    </motion.p>

    <motion.div className={styles.orderDetails} variants={itemVariants}>
     <div className={styles.detailItem}>
      <span>شناسه سفارش</span>
      <strong>{orderId}</strong>
     </div>
     <div className={styles.detailItem}>
      <span>تاریخ سفارش</span>
      <strong>{new Date().toLocaleDateString('fa-IR')}</strong>
     </div>
     <div className={styles.detailItem}>
      <span>مبلغ کل</span>
      <strong>۲۴۵,۰۰۰ تومان</strong>
     </div>
    </motion.div>

    <motion.div className={styles.actions} variants={itemVariants}>
     <motion.button
      className={`${styles.button} ${styles.primary}`}
      onClick={() => navigate('/profile/orders')}
      whileHover={{
       scale: 1.05,
       boxShadow: '0 8px 25px -5px var(--main-color-2)',
      }}
      whileTap={{ scale: 0.95 }}>
      <Package size={18} />
      پیگیری سفارش
     </motion.button>
     <motion.button
      className={styles.button}
      onClick={() => navigate('/')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      <ShoppingBag size={18} />
      بازگشت به فروشگاه
     </motion.button>
    </motion.div>
   </motion.div>
  </div>
 );
};

export default CheckoutSuccess;
