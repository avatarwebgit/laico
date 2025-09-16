import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Send as Telegram,
  MessageSquare as WhatsApp,
  CreditCard,
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import styles from "./Footer.module.css";
import logo from "../../../assets/images/Logo.png";
import { useSelector } from "react-redux";

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

const socialIconMap = {
  instagram: <Instagram />,
  telegram: <Telegram />,
  whatsapp: <WhatsApp />,
};

export const Footer = () => {
  const { settings } = useSelector((state) => state.initialState);
  const currentYear = new Date().getFullYear();
  const categories = megaMenuChildren.map((item) => ({
    name: item.category,
    href: "/category",
  }));

  const dayMap = {
    saturday: "شنبه",
    sunday: "یکشنبه",
    monday: "دوشنبه",
    tuesday: "سه‌شنبه",
    wednesday: "چهارشنبه",
    thursday: "پنج‌شنبه",
    friday: "جمعه",
  };

  console.log(settings);

  const renderWorkingHours = () => {
    if (!settings || !settings.working_hours) {
      return <li>اطلاعاتی موجود نیست</li>;
    }
    const workingHours = settings.working_hours;
    const activeDays = Object.entries(workingHours)
      .filter(([, value]) => value.active)
      .map(([day, value]) => ({
        day: dayMap[value.day.toLowerCase()],
        from: value.from,
        till: value.till,
      }));

    if (activeDays.length === 0) {
      return <li>تمام روزها تعطیل است</li>;
    }

    return activeDays.map((d) => {
      if (d.till.trim() === "" || d.from.trim() === "") return;
      return (
        <li key={d.day}>
          <span>{d.day}&nbsp;:</span>
          <span>
            {d.till} - {d.from}
          </span>
        </li>
      );
    });
  };

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
                <Telegram size={20} />
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

          {/* Column 4: Contact Info */}
          <motion.div className={styles.column} variants={itemVariants}>
            <h3 className={styles.columnTitle}>اطلاعات تماس</h3>
            <ul className={`${styles.linkList} ${styles.contactList}`}>
              {settings.main_address && (
                <li>
                  <MapPin size={16} />
                  <span>{settings.main_address}</span>
                </li>
              )}
              {settings.primary_phone && (
                <li>
                  <Phone size={16} />
                  <span>{settings.primary_phone}</span>
                </li>
              )}
              {settings.primary_email && (
                <li>
                  <Mail size={16} />
                  <span>{settings.primary_email}</span>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Column 5: Working Hours */}

          <motion.div className={styles.column} variants={itemVariants}>
            {settings && settings.working_hours && (
              <>
                <h3 className={styles.columnTitle}>ساعت کاری</h3>
                <ul className={`${styles.linkList} ${styles.workingHoursList}`}>
                  {renderWorkingHours()}
                </ul>
              </>
            )}
          </motion.div>

          {/* Column 6: Brand */}
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
              {settings.social_links &&
                Object.entries(settings.social_links).map(([key, value]) =>
                  value.url && socialIconMap[key] ? (
                    <motion.a
                      key={key}
                      href={value.url}
                      aria-label={key}
                      whileHover={{ y: -3, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {socialIconMap[key]}
                    </motion.a>
                  ) : null
                )}
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
            {settings.copy_right ||
              `© ${currentYear} Laico تمام حقوق محفوظ است.`}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
