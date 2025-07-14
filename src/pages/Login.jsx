import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BackgroundContext } from '../context/BackgroundContent';
import styles from './Login.module.css';

import img from '../assets/images/photo_2025-04-26_14-50-41.jpg'

const Login = () => {
 const { setBackgroundImage } = useContext(BackgroundContext);
 const navigate = useNavigate();

 const handleSubmit = e => {
  e.preventDefault();
  // Handle login logic here
  navigate('/profile/dashboard');
 };

 useEffect(() => {
  setBackgroundImage(img);
  return () => setBackgroundImage(null);
 }, [setBackgroundImage]);

 return (
  <div className={styles.container}>
   <motion.div
    className={styles.formContainer}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}>
    <div className={styles.header}>
     <div className={styles.logo}>
      <Link to='/' className={styles.logoLink}>
       فروشگاه
      </Link>
     </div>
     <h1 className={styles.title}>ورود به حساب کاربری</h1>
     <p className={styles.subtitle}>برای ادامه وارد حساب کاربری خود شوید</p>
    </div>
    <form onSubmit={handleSubmit} className={styles.form}>
     <div className={styles.inputGroup}>
      <Mail className={styles.icon} size={20} />
      <input
       type='email'
       placeholder='ایمیل یا شماره موبایل'
       required
       className={styles.input}
      />
     </div>
     <div className={styles.inputGroup}>
      <Lock className={styles.icon} size={20} />
      <input
       type='password'
       placeholder='رمز عبور'
       required
       className={styles.input}
      />
     </div>
     <div className={styles.actions}>
      <Link to='#' className={styles.link}>
       فراموشی رمز عبور؟
      </Link>
     </div>
     <button type='submit' className={styles.submitButton}>
      ورود
     </button>
    </form>
    <div className={styles.footer}>
     <p>
      حساب کاربری ندارید؟{' '}
      <Link to='/register' className={styles.link}>
       ثبت نام کنید
      </Link>
     </p>
    </div>
   </motion.div>
  </div>
 );
};

export default Login;
