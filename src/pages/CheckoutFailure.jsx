import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutFailure.module.css';

const containerVariants = {
 hidden: { opacity: 0, scale: 0.95 },
 visible: {
  opacity: 1,
  scale: 1,
  transition: {
   staggerChildren: 0.15,
   delayChildren: 0.2,
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

const CheckoutFailure = () => {
 const navigate = useNavigate();
 const [errorCode] = useState(`ERR-${Date.now().toString().slice(-6)}`);

 return (
  <div className={styles.pageWrapper}>
   <motion.div
    className={styles.container}
    variants={containerVariants}
    initial='hidden'
    animate='visible'>
    <motion.div className={styles.iconWrapper} variants={itemVariants}>
     <svg className={styles.crossSvg} viewBox='0 0 52 52'>
      <motion.circle
       className={styles.circleBg}
       cx='26'
       cy='26'
       r='25'
       initial={{ strokeDashoffset: 157 }}
       animate={{ strokeDashoffset: 0 }}
       transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      />
      <motion.path
       className={styles.crossPath}
       d='M16 16 36 36'
       initial={{ pathLength: 0, opacity: 0 }}
       animate={{ pathLength: 1, opacity: 1 }}
       transition={{ duration: 0.4, ease: 'easeOut', delay: 0.7 }}
      />
      <motion.path
       className={styles.crossPath}
       d='M36 16 16 36'
       initial={{ pathLength: 0, opacity: 0 }}
       animate={{ pathLength: 1, opacity: 1 }}
       transition={{ duration: 0.4, ease: 'easeOut', delay: 0.7 }}
      />
     </svg>
    </motion.div>

    <motion.h1 className={styles.title} variants={itemVariants}>
     پرداخت ناموفق بود
    </motion.h1>
    <motion.p className={styles.subtitle} variants={itemVariants}>
     متاسفانه در پردازش پرداخت شما مشکلی پیش آمده. لطفاً دوباره تلاش کنید یا با
     پشتیبانی تماس بگیرید.
    </motion.p>

    <motion.div className={styles.errorDetails} variants={itemVariants}>
     <div className={styles.detailItem}>
      <span>کد خطا</span>
      <strong>{errorCode}</strong>
     </div>
     <div className={styles.detailItem}>
      <span>وضعیت</span>
      <strong className={styles.statusFail}>ناموفق</strong>
     </div>
    </motion.div>

    <motion.div className={styles.actions} variants={itemVariants}>
     <motion.button
      className={`${styles.button} ${styles.primary}`}
      onClick={() => navigate('/contact-us')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      <MessageSquare size={18} />
      تماس با پشتیبانی
     </motion.button>
     <motion.button
      className={styles.button}
      onClick={() => navigate('/profile/tickets')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      <Ticket size={18} />
      تیکت های من
     </motion.button>
    </motion.div>
   </motion.div>
  </div>
 );
};

export default CheckoutFailure;
