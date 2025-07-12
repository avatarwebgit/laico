import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Github, Rocket } from 'lucide-react';
import styles from './Footer.module.css';

const footerVariants = {
 hidden: { opacity: 0, y: 50 },
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   duration: 0.8,
   ease: 'easeOut',
   delay: 0.2,
   staggerChildren: 0.2,
  },
 },
};

const itemVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Footer = () => {
 const currentYear = new Date().getFullYear();

 return (
  <motion.footer
   className={styles.footer}
   variants={footerVariants}
   initial='hidden'
   animate='visible'
   viewport={{ once: true }}>
   <div className={styles.container}>
    <div className={styles.grid}>
     <motion.div className={styles.brandSection} variants={itemVariants}>
      <div className={styles.logo}>
       <Rocket size={32} />
       <h2 className={styles.brandName}>قصه‌گوی کیهانی</h2>
      </div>
      <p className={styles.tagline}>
       خلق داستان‌های بی‌نهایت از غبار ستارگان خیال.
      </p>
     </motion.div>

     <motion.div className={styles.linksSection} variants={itemVariants}>
      <h3 className={styles.linksTitle}>کاوش</h3>
      <ul>
       <li>
        <a href='/'>مولد داستان</a>
       </li>
       <li>
        <a href='#'>درباره ما</a>
       </li>
       <li>
        <a href='#'>نمونه کارها</a>
       </li>
       <li>
        <a href='#'>سوالات متداول</a>
       </li>
      </ul>
     </motion.div>

     <motion.div className={styles.linksSection} variants={itemVariants}>
      <h3 className={styles.linksTitle}>حقوقی</h3>
      <ul>
       <li>
        <a href='#'>شرایط خدمات</a>
       </li>
       <li>
        <a href='#'>سیاست حفظ حریم خصوصی</a>
       </li>
       <li>
        <a href='#'>سیاست کوکی</a>
       </li>
      </ul>
     </motion.div>

     <motion.div className={styles.socialsSection} variants={itemVariants}>
      <h3 className={styles.linksTitle}>به کیهان بپیوندید</h3>
      <div className={styles.socialIcons}>
       <motion.a
        href='#'
        aria-label='Twitter'
        whileHover={{ y: -3, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}>
        <Twitter />
       </motion.a>
       <motion.a
        href='#'
        aria-label='Instagram'
        whileHover={{ y: -3, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}>
        <Instagram />
       </motion.a>
       <motion.a
        href='#'
        aria-label='GitHub'
        whileHover={{ y: -3, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}>
        <Github />
       </motion.a>
      </div>
     </motion.div>
    </div>

    <motion.div
     className={styles.copyright}
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.5, delay: 0.8 }}>
     &copy; {currentYear} قصه‌گوی کیهانی. تمام حقوق محفوظ است.
    </motion.div>
   </div>
  </motion.footer>
 );
};

export default Footer;
