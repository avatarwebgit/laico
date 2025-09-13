import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BackgroundContext } from "../context/BackgroundContent";
import * as authActions from "../redux/auth/authActions";

import logo from "../assets/images/Logo.png";
import img from "../assets/images/photo_2025-04-13_11-44-04.jpg";

import styles from "./Otp.module.css";

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

const Otp = () => {
  const OPT_LENGTH = 4;
  const BASE_CODE = "+98";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, otpExpiration } = useSelector((state) => state.auth);
  const { cellphone, from } = location.state || {};

  const [otp, setOtp] = useState(new Array(OPT_LENGTH).fill(""));
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  const { setBackgroundImage } = useContext(BackgroundContext);

  useEffect(() => {
    if (!cellphone) {
      navigate("/login-with-mobile");
    }
    if (isAuthenticated) {
      const redirectUrl = localStorage.getItem("redirectAfterLogin");
      // localStorage.removeItem("redirectAfterLogin");
      // navigate(redirectUrl || from || "/");
    }
  }, [isAuthenticated, navigate, from, cellphone]);

  useEffect(() => {
    if (otpExpiration) {
      const remaining = Math.round((otpExpiration - Date.now()) / 1000);
      setTimer(Math.max(0, remaining));
    }
  }, [otpExpiration]);

  useEffect(() => {
    if (timer > 0) {
      setCanResend(false);
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    if (canResend) {
      dispatch(authActions.sendOtpRequest(cellphone));
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length === OPT_LENGTH) {
      const mobile = BASE_CODE + cellphone;
      dispatch(authActions.verifyOtpRequest(mobile, fullOtp));
    }
  };

  useEffect(() => {
    setBackgroundImage(img);
    if (inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }
    return () => setBackgroundImage(null);
  }, [setBackgroundImage]);

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
                <img src={logo} alt="" />
              </Link>
            </div>
            <h1 className={styles.title}>کد تایید را وارد کنید</h1>
            <p className={styles.subtitle}>
              کد تایید به شماره موبایل شما ارسال شد.
            </p>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            className={styles.form}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className={styles.otpInputContainer}
            >
              {otp.map((data, index) => {
                return (
                  <input
                    className={styles.otpInput}
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                );
              })}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={styles.resendContainer}
            >
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className={styles.linkButton}
                >
                  ارسال مجدد کد
                </button>
              ) : (
                <p>ارسال مجدد تا {timer} ثانیه دیگر</p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className={styles.submitButton}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              تایید و ادامه
            </motion.button>
          </motion.form>
          <motion.div
            variants={itemVariants}
            className={styles.linkContainer}
          >
            <p>شماره موبایل را اشتباه وارد کردید؟</p>
            <Link to={"/login-with-mobile"}>تصحیح کنید</Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className={styles.footer}
          ></motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Otp;
