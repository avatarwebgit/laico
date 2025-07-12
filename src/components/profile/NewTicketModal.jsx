import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './NewTicketModal.module.css';

const NewTicketModal = ({ isOpen, onClose, onSave }) => {
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const formId = useId();

 const handleSubmit = e => {
  e.preventDefault();
  if (!title.trim() || !description.trim()) return;
  onSave({ title, description });
  setTitle('');
  setDescription('');
 };

 if (!isOpen) return null;

 return (
  <AnimatePresence>
   <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={styles.modalOverlay}
    onClick={onClose}>
    <motion.div
     initial={{ scale: 0.9, opacity: 0, y: 30 }}
     animate={{ scale: 1, opacity: 1, y: 0 }}
     exit={{ scale: 0.9, opacity: 0, y: 30 }}
     transition={{ type: 'spring', stiffness: 300, damping: 30 }}
     className={styles.modalContent}
     onClick={e => e.stopPropagation()}>
     <div className={styles.modalHeader}>
      <h2 className={styles.modalTitle}>ایجاد تیکت جدید</h2>
      <button onClick={onClose} className={styles.closeButton}>
       <X size={20} />
      </button>
     </div>

     <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
       <label htmlFor={`${formId}-title`} className={styles.formLabel}>
        موضوع
       </label>
       <input
        type='text'
        id={`${formId}-title`}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className={styles.formInput}
        placeholder='خلاصه ای از مشکل خود را بنویسید...'
       />
      </div>
      <div className={styles.formGroup}>
       <label htmlFor={`${formId}-description`} className={styles.formLabel}>
        توضیحات
       </label>
       <textarea
        id={`${formId}-description`}
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        rows='5'
        className={styles.formTextarea}
        placeholder='مشکل خود را با جزئیات کامل شرح دهید...'></textarea>
      </div>

      <div className={styles.formActions}>
       <motion.button
        type='button'
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${styles.formButton} ${styles.cancel}`}>
        انصراف
       </motion.button>
       <motion.button
        type='submit'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${styles.formButton} ${styles.save}`}>
        ارسال تیکت
       </motion.button>
      </div>
     </form>
    </motion.div>
   </motion.div>
  </AnimatePresence>
 );
};

export default NewTicketModal;
