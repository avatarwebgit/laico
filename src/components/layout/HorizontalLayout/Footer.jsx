import React from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Instagram,
  Github,
  Send,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import styles from "./Footer.module.css";
import logo from "../../../assets/images/Logo.png";

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const megaMenuChildren = [
  { category: "کالای دیجیتال" },
  { category: "پوشاک مردانه" },
  { category: "پوشاک زنانه" },
  { category: "اکسسوری" },
  { category: "آرایشی و بهداشتی" },
  { category: "کتاب و لوازم تحریر" },
];

const supportLinks = [
  { name: "سوالات متداول", href: "/FAQ" },
  { name: "تماس با ما", href: "/contact-us" },
  { name: "قوانین و مقررات", href: "#" },
  { name: "حریم خصوصی", href: "#" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const categories = megaMenuChildren.map((item) => ({
    name: item.category,
    href: "/category",
  }));

  return (
    <motion.footer
      className={styles.footer}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Newsletter */}
          <motion.div className={styles.column} variants={itemVariants}>
            <h3 className={styles.columnTitle}>به ما بپیوندید</h3>
            <p className={styles.newsletterText}>
              اولین کسی باشید که از جدیدترین محصولات و تخفیف‌های ویژه ما با خبر
              می‌شوید.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                required
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                <Send size={20} />
              </button>
            </form>
          </motion.div>

          {/* Column 2: Support */}
          <motion.div className={styles.column} variants={itemVariants}>
            <h3 className={styles.columnTitle}>پشتیبانی</h3>
            <ul className={styles.linkList}>
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Shop */}
          <motion.div className={styles.column} variants={itemVariants}>
            <h3 className={styles.columnTitle}>فروشگاه</h3>
            <ul className={styles.linkList}>
              {categories.map((cat) => (
                <li key={cat.name}>
                  <a href={cat.href}>{cat.name}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Brand */}
          <motion.div
            className={`${styles.column} ${styles.brandColumn}`}
            variants={itemVariants}
          >
            <a href="/" className={styles.logoLink}>
              <img
                src={logo}
                alt="AI Story Weaver Logo"
                className={styles.logo}
              />
            </a>
            <p className={styles.aboutText}>
              فروشگاه ما بهترین محصولات را با بالاترین کیفیت و قیمت مناسب به شما
              ارائه می‌دهد.
            </p>
            <div className={styles.socialIcons}>
              <motion.a
                href="#"
                aria-label="Twitter"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Twitter />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Instagram"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Instagram />
              </motion.a>
              <motion.a
                href="#"
                aria-label="GitHub"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Github />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className={styles.divider}></div>

        <motion.div
          className={styles.bottomBar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className={styles.paymentMethods}>
            <div className={styles.symbolPlaceholder}>
              <ShieldCheck size={24} />
            </div>
            <div className={styles.symbolPlaceholder}>
              <CreditCard size={24} />
            </div>
          </div>
          <div className={styles.copyright}>
            &copy; {currentYear} Laico تمام حقوق محفوظ است.
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
