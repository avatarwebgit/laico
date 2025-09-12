import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import styles from './404.module.css';

const NotFound = () => {
 const navigate = useNavigate();

 const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
   opacity: 1,
   transition: {
    staggerChildren: 0.3,
    delayChildren: 0.2,
   },
  },
 };

 const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
   y: 0,
   opacity: 1,
   transition: {
    type: 'spring',
    stiffness: 100,
   },
  },
 };

 const numberVariants = {
  initial: { y: 0 },
  animate: {
   y: [-8, 8, -8],
   transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
   },
  },
 };

 return (
  <div className={styles.container}>
   <div className={styles.stars}></div>
   <div className={styles.stars2}></div>
   <div className={styles.stars3}></div>

   <motion.div
    className={styles.content}
    variants={containerVariants}
    initial='hidden'
    animate='visible'>
    <motion.div className={styles.titleWrapper}>
     <motion.h1
      className={styles.title404}
      variants={numberVariants}
      initial='initial'
      animate='animate'>
      4
     </motion.h1>
     <motion.h1
      className={styles.title404}
      variants={numberVariants}
      initial='initial'
      animate='animate'
      style={{ animationDelay: '-2s' }}>
      0
     </motion.h1>
     <motion.h1
      className={styles.title404}
      variants={numberVariants}
      initial='initial'
      animate='animate'
      style={{ animationDelay: '-4s' }}>
      4
     </motion.h1>
    </motion.div>

    <motion.h2 variants={itemVariants} className={styles.heading}>
     اوپس! در فضا گم شدید.
    </motion.h2>
    <motion.p variants={itemVariants} className={styles.subheading}>
     صفحه‌ای که به دنبال آن بودید پیدا نشد. شاید به یک سیاهچاله کشیده شده باشد.
    </motion.p>
    <motion.div variants={itemVariants}>
     <motion.button
      className={styles.homeButton}
      onClick={() => navigate('/')}
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px #98ded950' }}
      whileTap={{ scale: 0.95 }}>
      <Home size={18} />
      <span>بازگشت به صفحه اصلی</span>
     </motion.button>
    </motion.div>
   </motion.div>
  </div>
 );
};

export default NotFound;
