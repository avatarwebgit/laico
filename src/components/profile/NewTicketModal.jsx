import React, { useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./NewTicketModal.module.css";

const validationSchema = Yup.object({
  title: Yup.string().required("موضوع الزامی است"),
  description: Yup.string().required("توضیحات الزامی است"),
});

const NewTicketModal = ({ isOpen, onClose, onSave }) => {
  const formId = useId();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSave(values);
      resetForm();
    },
  });

  const isSubmitted = formik.submitCount > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.modalOverlay}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>ایجاد تیکت جدید</h2>
            <button onClick={onClose} className={styles.closeButton}>
              <X size={20} />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor={`${formId}-title`} className={styles.formLabel}>
                موضوع
              </label>
              <input
                type="text"
                id={`${formId}-title`}
                name="title"
                {...formik.getFieldProps("title")}
                className={`${styles.formInput} ${
                  formik.touched.title && formik.errors.title
                    ? styles.inputError
                    : ""
                }`}
                placeholder="خلاصه ای از مشکل خود را بنویسید..."
              />
              {formik.touched.title && formik.errors.title ? (
                <div className={styles.formError}>{formik.errors.title}</div>
              ) : null}
            </div>
            <div className={styles.formGroup}>
              <label
                htmlFor={`${formId}-description`}
                className={styles.formLabel}
              >
                توضیحات
              </label>
              <textarea
                id={`${formId}-description`}
                name="description"
                {...formik.getFieldProps("description")}
                rows="5"
                className={`${styles.formTextarea} ${
                  formik.touched.description && formik.errors.description
                    ? styles.inputError
                    : ""
                }`}
                placeholder="مشکل خود را با جزئیات کامل شرح دهید..."
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <div className={styles.formError}>
                  {formik.errors.description}
                </div>
              ) : null}
            </div>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  key={formik.isValid ? "success" : "error"}
                  className={`${styles.statusContainer} ${
                    formik.isValid ? styles.success : styles.error
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {formik.isValid ? (
                    <CheckCircle size={18} />
                  ) : (
                    <XCircle size={18} />
                  )}
                  <span>
                    {formik.isValid
                      ? "تمام فیلدها معتبر هستند."
                      : "لطفا خطاهای فرم را برطرف کنید."}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.formActions}>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.formButton} ${styles.cancel}`}
              >
                انصراف
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.formButton} ${styles.save}`}
              >
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
