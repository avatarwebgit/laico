import { AnimatePresence, motion } from 'framer-motion';
import {
 CheckCircle,
 Eye,
 EyeOff,
 Lock,
 Mail,
 Phone,
 User,
 XCircle,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BackgroundContext } from '../context/BackgroundContent';
import styles from './Signup.module.css';

import logo from '../assets/images/Logo.png';
import img from '../assets/images/photo_2025-04-13_11-44-04.jpg';

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
  opacity: 1,
  transition: { staggerChildren: 0.08, delayChildren: 0.2 },
 },
};

const itemVariants = {
 hidden: { y: 20, opacity: 0 },
 visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const Signup = () => {
 const navigate = useNavigate();
 const { setBackgroundImage } = useContext(BackgroundContext);

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [error, setError] = useState('');

 const [isPasswordFocused, setIsPasswordFocused] = useState(false);
 const [passwordsMatch, setPasswordsMatch] = useState(true);
 const [passwordCriteria, setPasswordCriteria] = useState({
  length: false,
  // uppercase: false,
  // lowercase: false,
  // number: false,
  // specialChar: false,
 });

 const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);

 useEffect(() => {
  setBackgroundImage(img);
  return () => setBackgroundImage(null);
 }, [setBackgroundImage]);

 const validatePassword = value => {
  const length = value.length >= 8;
  // const uppercase = /[A-Z]/.test(value);
  // const lowercase = /[a-z]/.test(value);
  // const number = /[0-9]/.test(value);
  // const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  // setPasswordCriteria({ length, uppercase, lowercase, number, specialChar });
  setPasswordCriteria({ length });
  return length;
 };

 useEffect(() => {
  if (confirmPassword.length > 0) {
   setPasswordsMatch(password === confirmPassword);
  } else {
   setPasswordsMatch(true);
  }
 }, [password, confirmPassword]);

 const handlePasswordChange = e => {
  const newPassword = e.target.value;
  setPassword(newPassword);
  validatePassword(newPassword);
 };

 const handleSubmit = e => {
  e.preventDefault();
  setError('');

  if (!allCriteriaMet) {
   setError('رمز عبور باید تمام شرایط را داشته باشد.');
   return;
  }

  if (!passwordsMatch) {
   setError('رمزهای عبور مطابقت ندارند.');
   return;
  }

  // Handle registration logic here, then navigate to OTP page
  navigate('/otp');
 };

 const validationItems = [
  { key: 'length', text: 'حداقل ۸ کاراکتر' },
  // { key: 'uppercase', text: 'یک حرف بزرگ (A-Z)' },
  // { key: 'lowercase', text: 'یک حرف کوچک (a-z)' },
  // { key: 'number', text: 'یک عدد (0-9)' },
  // { key: 'specialChar', text: 'یک کاراکتر خاص (@, #, $...)' },
 ];

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
        <img src={logo} alt='' />
       </Link>
      </div>
      <h1 className={styles.title}>ایجاد حساب کاربری</h1>
      <p className={styles.subtitle}>
       برای خرید و استفاده از امکانات، ثبت نام کنید
      </p>
     </motion.div>
     <motion.form
      onSubmit={handleSubmit}
      className={styles.form}
      variants={containerVariants}>
      <motion.div variants={itemVariants} className={styles.inputGroup}>
       <User className={styles.icon} size={20} />
       <input
        type='text'
        placeholder='نام و نام خانوادگی'
        required
        className={styles.input}
       />
      </motion.div>
      <motion.div variants={itemVariants} className={styles.inputGroup}>
       <Mail className={styles.icon} size={20} />
       <input
        type='email'
        placeholder='ایمیل'
        required
        className={styles.input}
        value={email}
        onChange={e => setEmail(e.target.value)}
       />
      </motion.div>
      <motion.div variants={itemVariants} className={styles.inputGroup}>
       <Phone className={styles.icon} size={20} />
       <input
        type='tel'
        placeholder='شماره موبایل'
        required
        className={styles.input}
       />
      </motion.div>
      <motion.div variants={itemVariants} className={styles.inputGroup}>
       <Lock className={styles.icon} size={20} />
       <input
        type={showPassword ? 'text' : 'password'}
        placeholder='رمز عبور'
        required
        className={styles.input}
        value={password}
        onChange={handlePasswordChange}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
       />
       <div
        className={styles.passwordToggleIcon}
        onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
       </div>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.inputGroup}>
       <Lock className={styles.icon} size={20} />
       <input
        type={showConfirmPassword ? 'text' : 'password'}
        placeholder='تکرار رمز عبور'
        required
        className={`${styles.input} ${
         !passwordsMatch && confirmPassword.length > 0 ? styles.errorInput : ''
        }`}
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
       />
       <div
        className={styles.passwordToggleIcon}
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
       </div>
      </motion.div>

      <AnimatePresence>
       {(isPasswordFocused || password.length > 0) && (
        <motion.div
         className={styles.validationContainer}
         layout
         initial={{ opacity: 0, height: 0, marginTop: 0 }}
         animate={{
          opacity: 1,
          height: 'auto',
          marginTop: '0.5rem',
          marginBottom: '1rem',
         }}
         exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
         transition={{ duration: 0.3, ease: 'easeInOut' }}>
         <h4 className={styles.validationHeader}>الزامات رمز عبور</h4>
         <div className={styles.validationGrid}>
          {validationItems.map(item => (
           <div
            key={item.key}
            className={`${styles.validationItem} ${
             passwordCriteria[item.key] ? styles.valid : styles.invalid
            }`}>
            {passwordCriteria[item.key] ? (
             <CheckCircle size={16} />
            ) : (
             <XCircle size={16} />
            )}
            <span>{item.text}</span>
           </div>
          ))}
          <div
           className={`${styles.validationItem} ${
            passwordsMatch && confirmPassword.length > 0
             ? styles.valid
             : confirmPassword.length > 0
             ? styles.invalid
             : styles.neutral
           }`}>
           {passwordsMatch && confirmPassword.length > 0 ? (
            <CheckCircle size={16} />
           ) : confirmPassword.length > 0 ? (
            <XCircle size={16} />
           ) : (
            <XCircle size={16} />
           )}
           <span>تکرار رمز عبور مطابقت ندارد</span>
          </div>
         </div>
        </motion.div>
       )}
      </AnimatePresence>

      <AnimatePresence>
       {error && (
        <motion.p
         className={styles.errorText}
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -10 }}>
         {error}
        </motion.p>
       )}
      </AnimatePresence>

      <motion.button
       type='submit'
       className={styles.submitButton}
       variants={itemVariants}
       whileHover={{
        scale: 1.03,
        boxShadow: '0px 8px 20px rgba(59, 130, 246, 0.4)',
       }}
       whileTap={{ scale: 0.98 }}>
       ثبت نام و دریافت کد تایید
      </motion.button>
     </motion.form>
     <motion.div variants={itemVariants} className={styles.footer}>
      <p>
       قبلا ثبت نام کرده اید؟{' '}
       <Link to='/login' className={styles.link}>
        وارد شوید
       </Link>
      </p>
     </motion.div>
    </motion.div>
   </motion.div>
  </div>
 );
};

export default Signup;
