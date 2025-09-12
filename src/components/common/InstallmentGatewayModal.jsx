import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstallmentGatewaysRequest } from "../../redux/general/generalActions";
import Spinner from "./Spinner";
import styles from "./InstallmentGatewayModal.module.css";


const InstallmentGatewayModal = ({ open, onCancel, onSelect }) => {
    
  const [selectedValue, setSelectedValue] = useState(null);
  const dispatch = useDispatch();
  const {
    gateways,
    loading: isLoading,
    error: isError,
  } = useSelector((state) => state.general);

  useEffect(() => {
    if (open) {
      dispatch(fetchInstallmentGatewaysRequest());
      setSelectedValue(null); 
    }
  }, [open, dispatch]);

  const handleOk = () => {
    if (selectedValue) {
      onSelect(selectedValue);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "flex" },
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.stateContainer}>
          <Spinner />
        </div>
      );
    }
    if (isError) {
      return (
        <p className={styles.stateContainer}>
          خطا در دریافت لیست درگاه‌ها. لطفا دوباره تلاش کنید.
        </p>
      );
    }
    return (
      <div className={styles.gatewaysList}>
        {gateways.map((gateway) => (
          <div
            key={gateway.id}
            className={`${styles.gatewayItem} ${
              selectedValue === gateway.id ? styles.selected : ""
            }`}
            onClick={() => setSelectedValue(gateway.id)}
          >
            <img
              src={gateway.icon}
              alt={gateway.name}
              className={styles.gatewayIcon}
            />
            <div className={styles.gatewayInfo}>
              <strong className={styles.gatewayName}>{gateway.name}</strong>
              <span className={styles.gatewayDescription}>
                {gateway.description}
              </span>
            </div>
            <AnimatePresence>
              {selectedValue === gateway.id && (
                <motion.div
                  className={styles.checkIcon}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <CheckCircle size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    );
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
            aria-labelledby="gateway-modal-title"
          >
            <div className={styles.header}>
              <h2 id="gateway-modal-title" className={styles.title}>
                انتخاب درگاه پرداخت اقساطی
              </h2>
              <button
                className={styles.closeButton}
                onClick={onCancel}
                aria-label="بستن"
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>{renderContent()}</div>
            <div className={styles.footer}>
              <motion.button
                className={`${styles.actionButton} ${styles.cancelButton}`}
                onClick={onCancel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                انصراف
              </motion.button>
              <motion.button
                className={`${styles.actionButton} ${styles.confirmButton}`}
                onClick={handleOk}
                disabled={!selectedValue}
                whileHover={!selectedValue ? {} : { scale: 1.05 }}
                whileTap={!selectedValue ? {} : { scale: 0.95 }}
              >
                تایید و افزودن به سبد
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")
  );
};

export default InstallmentGatewayModal;
