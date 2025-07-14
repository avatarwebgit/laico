import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Otp.module.css';

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
  opacity: 1,
  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
 },
};

const itemVariants = {
 hidden: { y: 20, opacity: 0 },
 visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const Otp = () => {
 const navigate = useNavigate();
 const [otp, setOtp] = useState(new Array(6).fill(''));
 const [timer, setTimer] = useState(60);
 const [canResend, setCanResend] = useState(false);
 const inputRefs = useRef([]);

 useEffect(() => {
  if (timer > 0) {
   const countdown = setTimeout(() => setTimer(timer - 1), 1000);
   return () => clearTimeout(countdown);
  } else {
   setCanResend(true);
  }
 }, [timer]);

 const handleResend = () => {
  if (canResend) {
   setTimer(60);
   setCanResend(false);
   // Add logic to resend OTP
   console.log('Resending OTP...');
  }
 };

 const handleChange = (element, index) => {
  if (isNaN(element.value)) return false;

  setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

  // Focus next input
  if (element.nextSibling) {
   element.nextSibling.focus();
  }
 };

 const handleKeyDown = (e, index) => {
  // Move focus to the previous input field on backspace
  if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) {
   e.target.previousSibling.focus();
  }
 };

 const handleSubmit = e => {
  e.preventDefault();
  // Handle OTP verification
  console.log('Verifying OTP:', otp.join(''));
  navigate('/profile/dashboard');
 };

 return (
  <div className={styles.container}>
   <motion.div
    className={styles.formContainer}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}>
    <motion.div
     className={styles.formWrapper}
     variants={containerVariants}
     initial='hidden'
     animate='visible'>
     <motion.div variants={itemVariants} className={styles.header}>
      <div className={styles.logo}>
       <Link to='/' className={styles.logoLink}>
        فروشگاه
       </Link>
      </div>
      <h1 className={styles.title}>کد تایید را وارد کنید</h1>
      <p className={styles.subtitle}>کد تایید به شماره موبایل شما ارسال شد.</p>
     </motion.div>
     <motion.form
      onSubmit={handleSubmit}
      className={styles.form}
      variants={containerVariants}>
      <motion.div variants={itemVariants} className={styles.otpInputContainer}>
       {otp.map((data, index) => {
        return (
         <input
          className={styles.otpInput}
          type='text'
          name='otp'
          maxLength='1'
          key={index}
          value={data}
          onChange={e => handleChange(e.target, index)}
          onFocus={e => e.target.select()}
          onKeyDown={e => handleKeyDown(e, index)}
          ref={el => (inputRefs.current[index] = el)}
         />
        );
       })}
      </motion.div>

      <motion.div variants={itemVariants} className={styles.resendContainer}>
       {canResend ? (
        <button
         type='button'
         onClick={handleResend}
         className={styles.linkButton}>
         ارسال مجدد کد
        </button>
       ) : (
        <p>ارسال مجدد تا {timer} ثانیه دیگر</p>
       )}
      </motion.div>

      <motion.button
       type='submit'
       className={styles.submitButton}
       variants={itemVariants}
       whileHover={{
        scale: 1.03,
        boxShadow: '0px 8px 20px rgba(59, 130, 246, 0.4)',
       }}
       whileTap={{ scale: 0.98 }}>
       تایید و ادامه
      </motion.button>
     </motion.form>
     <motion.div variants={itemVariants} className={styles.footer}>
      <Link to='/login' className={styles.link}>
       بازگشت به صفحه ورود
      </Link>
     </motion.div>
    </motion.div>
   </motion.div>
  </div>
 );
};

export default Otp;
