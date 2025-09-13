import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Flag from "react-world-flags";

import { BackgroundContext } from "../context/BackgroundContent";
import * as authActions from "../redux/auth/authActions";
import img from "../assets/images/photo_2025-04-26_14-50-46.jpg";
import logo from "../assets/images/Logo.png";

import styles from "./PhoneLogin.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const PhoneLogin = () => {
  const BASE_CODE = "+98";
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { setBackgroundImage } = useContext(BackgroundContext);
  const { loading, error } = useSelector((state) => state.auth);
  const wasLoading = useRef(false);

  const mobileInputRef = useRef();

  const formik = useFormik({
    initialValues: {
      cellphone: "",
    },
    validationSchema: Yup.object({
      cellphone: Yup.string()
        .matches(/^9\d{9}$/, "شماره موبایل باید 10 رقمی و با 9 شروع شود")
        .required("وارد کردن شماره موبایل الزامی است"),
    }),
    onSubmit: (values) => {
      const mobile = BASE_CODE + values.cellphone;
      dispatch(authActions.sendOtpRequest({ mobile }));
    },
  });

  useEffect(() => {
    if (wasLoading.current && !loading && !error) {
      navigate("/otp", {
        state: {
          cellphone: formik.values.cellphone,
          from: location.state?.from,
        },
      });
    }
    wasLoading.current = loading;
  }, [loading, error, navigate, formik.values.cellphone, location.state]);

  useEffect(() => {
    setBackgroundImage(img);
    mobileInputRef.current.focus();
    return () => setBackgroundImage(null);
  }, [setBackgroundImage]);

  const handlePhoneInputChange = (e) => {
    let { value } = e.target;

    // Remove leading '+' or '0'
    if (value.startsWith("+") || value.startsWith("0")) {
      value = value.substring(1);
    }

    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, "");

    formik.setFieldValue("cellphone", numericValue);
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.formContainer}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className={styles.formWrapper}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className={styles.header}>
            <div className={styles.logo}>
              <Link to="/" className={styles.logoLink}>
                <img src={logo} alt="فروشگاه" />
              </Link>
            </div>
            <h1 className={styles.title}>ورود یا ثبت‌نام</h1>
            <p className={styles.subtitle}>شماره موبایل خود را وارد کنید</p>
          </motion.div>
          <motion.form
            onSubmit={formik.handleSubmit}
            className={styles.form}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className={styles.phoneInputContainer}
              dir="ltr"
            >
              <div className={styles.countryCode}>
                <Flag code="IR" className={styles.flagIcon} />
                <div>+۹۸</div>
              </div>
              <input
                id="cellphone"
                name="cellphone"
                type="tel"
                placeholder="۹۱۲۳۴۵۶۷۸۹"
                className={styles.phoneInput}
                ref={mobileInputRef}
                value={formik.values.cellphone}
                onChange={handlePhoneInputChange}
                onBlur={formik.handleBlur}
              />
            </motion.div>

            {formik.touched.cellphone && formik.errors.cellphone ? (
              <motion.div
                className={styles.errorText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertCircle size={16} />
                {formik.errors.cellphone}
              </motion.div>
            ) : null}

            {error && (
              <motion.div
                className={styles.errorText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className={styles.submitButton}
              variants={itemVariants}
              disabled={loading}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "در حال ارسال..." : "ادامه"}
            </motion.button>
          </motion.form>

          <motion.div variants={itemVariants} className={styles.footer}>
            <p>
              ورود با ایمیل و رمزعبور{" "}
              <Link to="/login" className={styles.link}>
                کلیک کنید
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PhoneLogin;
