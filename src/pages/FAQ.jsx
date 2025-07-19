import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import styles from './FAQ.module.css';

const faqData = [
 {
  question: 'چگونه می‌توانم سفارش خود را ثبت کنم؟',
  answer:
   'برای ثبت سفارش، ابتدا محصول مورد نظر خود را به سبد خرید اضافه کنید. سپس به صفحه سبد خرید رفته و روی دکمه "تکمیل سفارش" کلیک کنید. در نهایت، اطلاعات ارسال و پرداخت را وارد کرده و سفارش خود را نهایی کنید.',
 },
 {
  question: 'روش‌های ارسال سفارش به چه صورت است؟',
  answer:
   'سفارشات از طریق پست پیشتاز و یا پیک موتوری (برای شهرهای منتخب) ارسال می‌شوند. زمان و هزینه ارسال بسته به آدرس شما و روش انتخابی، در مرحله تکمیل سفارش محاسبه و نمایش داده می‌شود.',
 },
 {
  question: 'آیا امکان بازگشت کالا وجود دارد؟',
  answer:
   'بله، شما می‌توانید تا ۷ روز پس از دریافت کالا، در صورت عدم رضایت یا وجود هرگونه مشکل، کالای خود را طبق شرایط و ضوابط بازگشت کالا، مرجوع نمایید. لطفاً برای اطلاعات بیشتر به صفحه "شرایط بازگشت کالا" مراجعه کنید.',
 },
 {
  question: 'چگونه می‌توانم وضعیت سفارش خود را پیگیری کنم؟',
  answer:
   'پس از ارسال سفارش، کد رهگیری پستی برای شما از طریق پیامک ارسال خواهد شد. همچنین می‌توانید با مراجعه به بخش "تاریخچه سفارشات" در پروفایل کاربری خود، از آخرین وضعیت سفارش مطلع شوید.',
 },
 {
  question: 'آیا پرداخت در محل امکان‌پذیر است؟',
  answer:
   'در حال حاضر، گزینه پرداخت در محل فعال نمی‌باشد. پرداخت‌ها تنها به صورت آنلاین از طریق درگاه‌های امن بانکی انجام می‌شود. این روش سریع‌ترین و امن‌ترین راه برای پردازش سفارش شما است.',
 },
 {
  question: 'چگونه می‌توانم از کد تخفیف استفاده کنم؟',
  answer:
   'در صفحه سبد خرید و یا در مرحله نهایی پرداخت، قسمتی برای وارد کردن "کد تخفیف" وجود دارد. کد خود را در کادر مربوطه وارد کرده و دکمه "اعمال" را فشار دهید تا تخفیف روی مبلغ نهایی سفارش شما محاسبه شود.',
 },
];

const FaqItem = ({ faq, isOpen, onClick }) => {
 const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
 };

 return (
  <motion.div className={styles.faqItem} variants={itemVariants}>
   <div
    className={styles.questionWrapper}
    onClick={onClick}
    role='button'
    aria-expanded={isOpen}
    tabIndex={0}
    onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && onClick()}>
    <h3 className={styles.questionText}>{faq.question}</h3>
    <motion.div
     className={styles.iconWrapper}
     animate={{ rotate: isOpen ? 180 : 0 }}
     transition={{ duration: 0.3 }}>
     <ChevronDown size={22} />
    </motion.div>
   </div>
   <AnimatePresence>
    {isOpen && (
     <motion.div
      initial={{ height: 0, opacity: 0, marginTop: 0 }}
      animate={{
       height: 'auto',
       opacity: 1,
       marginTop: '1rem',
       transition: {
        height: { duration: 0.4, ease: 'easeInOut' },
        opacity: { duration: 0.3, delay: 0.1 },
       },
      }}
      exit={{
       height: 0,
       opacity: 0,
       marginTop: 0,
       transition: {
        height: { duration: 0.4, ease: 'easeInOut' },
        opacity: { duration: 0.2 },
       },
      }}
      className={styles.answerWrapper}>
      <p className={styles.answerText}>{faq.answer}</p>
     </motion.div>
    )}
   </AnimatePresence>
  </motion.div>
 );
};

const FAQ = () => {
 const [openIndex, setOpenIndex] = useState(null);

 const handleToggle = index => {
  setOpenIndex(openIndex === index ? null : index);
 };

 const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
   opacity: 1,
   transition: {
    staggerChildren: 0.1,
   },
  },
 };

 return (
  <motion.div
   className={styles.container}
   initial={{ opacity: 0, y: -20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.5 }}>
   <header className={styles.header}>
    <HelpCircle size={36} className={styles.headerIcon} />
    <h1 className={styles.title}>سوالات متداول</h1>
    <p className={styles.subtitle}>پاسخ به پرسش‌های شما</p>
   </header>
   <motion.div
    className={styles.faqList}
    variants={containerVariants}
    initial='hidden'
    animate='visible'>
    {faqData.map((faq, index) => (
     <FaqItem
      key={index}
      faq={faq}
      isOpen={openIndex === index}
      onClick={() => handleToggle(index)}
     />
    ))}
   </motion.div>
  </motion.div>
 );
};

export default FAQ;
