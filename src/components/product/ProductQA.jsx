import { ChevronDown, HelpCircle, Send } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ProductQA.module.css";

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
          animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          className={styles.answer}
        >
          {qa.answer}
        </motion.div>
      )}
    </div>
  );
};

const ProductQA = ({ qas = [] }) => {
  if (!qas || qas.length === 0) {
    return (
      <>
        <div className={styles.askQuestionForm}>
          <HelpCircle size={24} className={styles.formIcon} />
          <input type="text" placeholder="پرسش خود را اینجا بنویسید..." />
          <button>
            <Send size={18} />
            <span>ارسال</span>
          </button>
        </div>
        <p>هنوز پرسش و پاسخی برای این محصول ثبت نشده است. اولین نفر باشید!</p>
      </>
    );
  }
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
        {qas.map((qa, index) => (
          <QAItem key={index} qa={qa} />
        ))}
      </div>
    </div>
  );
};

export default ProductQA;
