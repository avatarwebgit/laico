
import { ChevronDown, HelpCircle, Send } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ProductQA.module.css';

const mockQA = [
  {
    id: 1,
    question: 'آیا این محصول در رنگ‌های دیگری هم موجود است؟',
    answer: 'بله، این محصول در رنگ‌های آبی کهکشانی و نقره‌ای ستاره‌ای نیز موجود است. می‌توانید از بخش انتخاب رنگ، گزینه مورد نظر خود را انتخاب کنید.',
  },
  {
    id: 2,
    question: 'محتویات جعبه شامل چه مواردی است؟',
    answer: 'محتویات جعبه شامل خود محصول، کابل شارژ، دفترچه راهنما و کارت گارانتی می‌باشد.',
  },
];

const QAItem = ({ qa }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.qaItem}>
      <button className={styles.question} onClick={() => setIsOpen(!isOpen)}>
        <span>{qa.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={20} />
        </motion.div>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          className={styles.answer}
        >
          {qa.answer}
        </motion.div>
      )}
    </div>
  );
};

const ProductQA = () => {
  return (
    <div className={styles.container}>
      <div className={styles.askQuestionForm}>
        <HelpCircle size={24} className={styles.formIcon} />
        <input type="text" placeholder="پرسش خود را اینجا بنویسید..." />
        <button>
          <Send size={18} />
          <span>ارسال</span>
        </button>
      </div>

      <div className={styles.qaList}>
        {mockQA.map((qa) => (
          <QAItem key={qa.id} qa={qa} />
        ))}
      </div>
    </div>
  );
};

export default ProductQA;
