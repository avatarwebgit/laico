import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, TriangleAlert } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DeleteModal.module.css";
import Spinner from "./Spinner";
import {
  closeDeleteModal,
  confirmDeleteAction,
} from "../../redux/modal/modalActions";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const { isOpen, title, message, isLoading } = useSelector(
    (state) => state.modal
  );

  const handleClose = () => {
    if (!isLoading) {
      dispatch(closeDeleteModal());
    }
  };

  const handleConfirm = () => {
    dispatch(confirmDeleteAction());
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-message"
          >
            <div className={styles.iconWrapper}>
              <TriangleAlert size={48} className={styles.icon} />
            </div>
            <h2 id="delete-modal-title" className={styles.title}>
              {title}
            </h2>
            <p id="delete-modal-message" className={styles.message}>
              {message}
            </p>
            <div className={styles.actions}>
              <motion.button
                onClick={handleClose}
                className={`${styles.button} ${styles.cancelButton}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                انصراف
              </motion.button>
              <motion.button
                onClick={handleConfirm}
                className={`${styles.button} ${styles.confirmButton}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "بله، حذف کن"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
