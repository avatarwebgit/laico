import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader,
  Check,
  AlertTriangle,
} from "lucide-react";
import styles from "./Contact.module.css";
import { useSelector } from "react-redux";

const Contact = () => {
  const { settings } = useSelector((state) => state.initialState);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    setTimeout(() => {
      // 70% chance of success for demo
      const success = Math.random() < 0.7;
      if (success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className={styles.pageWrapper}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>تماس با ما</h1>
          <p className={styles.subtitle}>
            سوالی دارید یا می‌خواهید همکاری کنید؟ ما مشتاقانه منتظر شنیدن نظرات
            شما هستیم.
          </p>
        </div>

        <div className={styles.contentGrid}>
          <motion.div
            className={styles.contactForm}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">نام شما</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">ایمیل شما</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">موضوع</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">پیام شما</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className={styles.formFooter}>
                <AnimatePresence mode="wait">
                  {submitStatus && (
                    <motion.div
                      key={submitStatus}
                      className={`${styles.statusMessage} ${styles[submitStatus]}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {submitStatus === "success" ? (
                        <>
                          <Check size={18} />
                          <span>پیام شما با موفقیت ارسال شد!</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={18} />
                          <span>خطا در ارسال. لطفا دوباره تلاش کنید.</span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader size={20} className={styles.loaderIcon} />
                  ) : (
                    <Send size={18} />
                  )}
                  <span>{isSubmitting ? "در حال ارسال..." : "ارسال پیام"}</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className={styles.infoTitle}>راه های ارتباطی</h3>
            <ul>
              {settings.primary_email && (
                <li>
                  <Mail size={20} />
                  <span>{settings.primary_email}</span>
                </li>
              )}
              {settings.primary_phone && (
                <li>
                  <Phone size={20} />
                  <span>{settings.primary_phone}</span>
                </li>
              )}
              {settings.main_address && (
                <li>
                  <MapPin size={20} />
                  <span>{settings.main_address}</span>
                </li>
              )}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className={styles.mapContainer}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13227.13437542241!2d-118.36393081105152!3d34.02495333116345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b987b7a1c7c9%3A0x6b14285ab28a49a8!2sGriffith%20Observatory!5e0!3m2!1sen!2sus!4v1689886599123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
