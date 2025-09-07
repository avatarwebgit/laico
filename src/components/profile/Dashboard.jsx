import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Smartphone,
  Edit3,
  X,
  Check,
  CheckCircle,
  XCircle,
} from "lucide-react";
import styles from "./Dashboard.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("نام الزامی است"),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  phone: Yup.string().required("شماره تلفن الزامی است"),
});

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "کازمو",
    lastName: "استارلایت",
    email: "cosmo.starlight@galaxy.net",
    phone: "+1-234-567-8900",
  });

  const formik = useFormik({
    initialValues: userData,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setUserData(values);
      setIsEditing(false);
      // API call to save data would go here
    },
  });

  const isSubmitted = formik.submitCount > 0;

  const handleEdit = () => {
    formik.resetForm({ values: userData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    formik.resetForm({ values: userData });
    setIsEditing(false);
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>اطلاعات حساب کاربری</h1>
        <p className={styles.subtitle}>مشاهده و ویرایش اطلاعات شخصی خود.</p>
      </header>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>جزئیات شخصی</h2>
          {!isEditing && (
            <motion.button
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={handleEdit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit3 size={16} style={{ marginLeft: "8px" }} />
              ویرایش
            </motion.button>
          )}
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.cardContent}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  نام
                </label>
                <div className={styles.inputWrapper}>
                  <User size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    {...formik.getFieldProps("firstName")}
                    disabled={!isEditing}
                    className={`${styles.input} ${
                      formik.touched.firstName && formik.errors.firstName
                        ? styles.inputError
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className={styles.formError}>
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  نام خانوادگی
                </label>
                <div className={styles.inputWrapper}>
                  <User size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    {...formik.getFieldProps("lastName")}
                    disabled={!isEditing}
                    className={`${styles.input} ${
                      formik.touched.lastName && formik.errors.lastName
                        ? styles.inputError
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className={styles.formError}>
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="email" className={styles.label}>
                  آدرس ایمیل
                </label>
                <div className={styles.inputWrapper}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...formik.getFieldProps("email")}
                    disabled={!isEditing}
                    className={`${styles.input} ${
                      formik.touched.email && formik.errors.email
                        ? styles.inputError
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className={styles.formError}>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="phone" className={styles.label}>
                  شماره تلفن
                </label>
                <div className={styles.inputWrapper}>
                  <Smartphone size={18} className={styles.inputIcon} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    {...formik.getFieldProps("phone")}
                    disabled={!isEditing}
                    className={`${styles.input} ${
                      formik.touched.phone && formik.errors.phone
                        ? styles.inputError
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.phone && formik.errors.phone ? (
                  <div className={styles.formError}>{formik.errors.phone}</div>
                ) : null}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isEditing && isSubmitted && (
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

          <AnimatePresence>
            {isEditing && (
              <motion.div
                className={styles.actions}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  type="button"
                  className={`${styles.button} ${styles.secondaryButton}`}
                  onClick={handleCancel}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} style={{ marginLeft: "8px" }} />
                  انصراف
                </motion.button>
                <motion.button
                  type="submit"
                  className={`${styles.button} ${styles.primaryButton}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Check size={16} style={{ marginLeft: "8px" }} />
                  ذخیره تغییرات
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

export default Dashboard;
