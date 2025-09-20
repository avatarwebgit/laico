import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BackgroundContext } from "../context/BackgroundContent";
import * as authActions from "../redux/auth/authActions";

import logo from "../assets/images/Logo.png";
import img from "../assets/images/photo_2025-04-26_14-50-46.jpg";

import styles from "./Login.module.css";

const validationSchema = Yup.object({
  mobile: Yup.string().required("وارد کردن ایمیل یا شماره موبایل الزامی است"),
  password: Yup.string().required("وارد کردن رمز عبور الزامی است"),
});

const Login = () => {
  const BASE_CODE = "+98";
  const { setBackgroundImage } = useContext(BackgroundContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      const redirectUrl = localStorage.getItem("redirectAfterLogin");
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectUrl || from || "/profile/dashboard");
    }
  }, [isAuthenticated, navigate, from]);

  const formik = useFormik({
    initialValues: {
      mobile: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const mobile = BASE_CODE + values.mobile;
      const payload = { mobile, password: values.password };
      console.log(payload);
      dispatch(authActions.loginRequest({ ...payload }));
    },
  });

  useEffect(() => {
    setBackgroundImage(img);
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
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <h1 className={styles.title}>ورود به حساب کاربری</h1>
          <p className={styles.subtitle}>
            برای ادامه وارد حساب کاربری خود شوید
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <Mail className={styles.icon} size={20} />
            <input
              id="mobile"
              name="mobile"
              type="text"
              placeholder="ایمیل یا شماره موبایل"
              className={`${styles.input} ${
                formik.touched.mobile && formik.errors.mobile
                  ? styles.errorInput
                  : ""
              }`}
              {...formik.getFieldProps("mobile")}
            />
          </div>
          {formik.touched.mobile && formik.errors.mobile ? (
            <motion.div
              className={styles.errorText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle size={16} />
              {formik.errors.mobile}
            </motion.div>
          ) : null}

          <div className={styles.inputGroup}>
            <Lock className={styles.icon} size={20} />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              className={`${styles.input} ${styles.passwordInput} ${
                formik.touched.password && formik.errors.password
                  ? styles.errorInput
                  : ""
              }`}
              {...formik.getFieldProps("password")}
            />
            <div
              className={styles.passwordToggleIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <motion.div
              className={styles.errorText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle size={16} />
              {formik.errors.password}
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

          <div className={styles.actions}>
            <Link to="#" className={styles.link}>
              فراموشی رمز عبور؟
            </Link>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
        <Link
          to={"/login-with-mobile"}
          type="button"
          className={styles.submitButton}
        >
          ورود با رمز یکبار مصرف
        </Link>
        <div className={styles.footer}>
          <p>
            حساب کاربری ندارید؟
            <Link to="/register" className={styles.link}>
              ثبت نام کنید
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
