import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Wallet, X } from "lucide-react";
import styles from "./PurchaseMethodModal.module.css";

const PurchaseMethodModal = ({ open, onCancel, onSelect }) => {
  if (!open) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.modalOverlay}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onCancel}
        >
          <motion.div
            className={styles.modalContent}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="purchase-method-title"
          >
            <div className={styles.header}>
              <h2 id="purchase-method-title" className={styles.title}>
                انتخاب روش خرید
              </h2>
              <button
                className={styles.closeButton}
                onClick={onCancel}
                aria-label="بستن"
              >
                <X size={20} />
              </button>
            </div>
            <p className={styles.subtitle}>
              چگونه می‌خواهید این محصول را خریداری کنید؟
            </p>
            <div className={styles.optionsContainer}>
              <motion.button
                className={styles.optionButton}
                onClick={() => onSelect("cash")}
                whileHover={{ y: -5, boxShadow: "0 10px 20px -5px #e2e8f0" }}
                whileTap={{ scale: 0.98 }}
              >
                <Wallet size={24} className={styles.optionIcon} />
                <span className={styles.optionText}>پرداخت نقدی</span>
                <span className={styles.optionSubtext}>
                  پرداخت کامل مبلغ با کارت بانکی
                </span>
              </motion.button>
              <motion.button
                className={styles.optionButton}
                onClick={() => onSelect("installment")}
                whileHover={{ y: -5, boxShadow: "0 10px 20px -5px #e2e8f0" }}
                whileTap={{ scale: 0.98 }}
              >
                <CreditCard size={24} className={styles.optionIcon} />
                <span className={styles.optionText}>خرید اقساطی</span>
                <span className={styles.optionSubtext}>
                  پرداخت در چند قسط با درگاه‌های معتبر
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")
  );
};

export default PurchaseMethodModal;
