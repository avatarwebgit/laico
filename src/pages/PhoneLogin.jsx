import { Phone } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PhoneLogin.module.css';

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

const PhoneLogin = () => {
 const navigate = useNavigate();

 const handleSubmit = e => {
  e.preventDefault();
  // Handle phone registration logic here
  navigate('/otp');
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
      <h1 className={styles.title}>ورود یا ثبت‌نام</h1>
      <p className={styles.subtitle}>شماره موبایل خود را وارد کنید</p>
     </motion.div>
     <motion.form
      onSubmit={handleSubmit}
      className={styles.form}
      variants={containerVariants}>
      <motion.div variants={itemVariants} className={styles.inputGroup}>
       <Phone className={styles.icon} size={20} />
       <input
        type='tel'
        placeholder='مثال: ۰۹۱۲۳۴۵۶۷۸۹'
        required
        className={styles.input}
       />
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
       ادامه
      </motion.button>
     </motion.form>

     <motion.div variants={itemVariants} className={styles.footer}>
      <p>
       ورود با ایمیل و رمزعبور{' '}
       <Link to='/login' className={styles.link}>
        کلیک کنید
       </Link>
      </p>
     </motion.div>
    </motion.div>
   </motion.div>
  </div>
 );
};

export default PhoneLogin;
