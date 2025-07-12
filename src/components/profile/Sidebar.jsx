import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
 User,
 Heart,
 Home,
 Settings,
 LogOut,
 MapPin,
 ShoppingBag,
 Ticket,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
 const navigate = useNavigate();
 const location = useLocation();

 const menuItems = [
  {
   id: 'account',
   title: 'حساب کاربری',
   url: '/profile/account',
   icon: <User />,
  },
  {
   id: 'orders',
   title: 'سفارش ها',
   url: '/profile/orders',
   icon: <ShoppingBag />,
  },
  {
   id: 'addresses',
   title: 'آدرس ها',
   url: '/profile/addresses',
   icon: <MapPin />,
  },
  {
   id: 'wishlist',
   title: 'لیست علاقه',
   url: '/profile/wishlist',
   icon: <Heart />,
  },
  {
   id: 'tickets',
   title: 'تیکت ها',
   url: '/profile/tickets',
   icon: <Ticket />,
  },
 ];

 const springConfig = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.5,
 };

 return (
  <>
   {/* --- Desktop Sidebar --- */}
   <motion.aside
    className={styles.desktopContainer}
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}>
  

    <motion.div
     className={styles.menu}
     initial='hidden'
     animate='visible'
     variants={{
      hidden: { opacity: 0 },
      visible: {
       opacity: 1,
       transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
       },
      },
     }}>
     {menuItems.map(item => {
      const isActive = location.pathname === item.url;
      return (
       <motion.div
        key={item.id}
        className={styles.itemContainer}
        variants={{
         hidden: { y: 20, opacity: 0 },
         visible: { y: 0, opacity: 1 },
        }}>
        <motion.div
         className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
         onClick={() => navigate(item.url)}
         whileTap={{ scale: 0.98 }}>
         <div className={styles.itemIcon}>{item.icon}</div>
         <span className={styles.itemText}>{item.title}</span>
         {isActive && (
          <motion.div
           className={styles.indicator}
           layoutId='desktop-indicator'
           initial={false}
           transition={springConfig}
          />
         )}
        </motion.div>
       </motion.div>
      );
     })}
    </motion.div>

    <motion.div
     className={styles.footer}
     whileHover={{ scale: 1.03 }}
     whileTap={{ scale: 0.97 }}
     onClick={() => navigate('/logout')}>
     <LogOut className={styles.itemIcon} />
     <span>خروج از حساب</span>
    </motion.div>
   </motion.aside>

   {/* --- Mobile Bottom Navigation --- */}
   <motion.nav
    className={styles.mobileNav}
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}>
    <div className={styles.mobileNavMenu}>
     {menuItems.map(item => {
      const isActive = location.pathname === item.url;
      return (
       <motion.div
        key={item.id}
        className={`${styles.mobileNavItem} ${
         isActive ? styles.mobileNavItemActive : ''
        }`}
        onClick={() => navigate(item.url)}
        whileTap={{ scale: 0.95 }}
        layout // Animate layout changes (size, position)
        transition={{ type: 'spring', stiffness: 600, damping: 35 }}>
        {isActive && (
         <motion.div
          className={styles.mobileNavIndicator}
          layoutId='mobile-indicator'
          initial={false}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
         />
        )}
        <motion.div layout='position' className={styles.mobileNavIcon}>
         {item.icon}
        </motion.div>
        <AnimatePresence>
         {isActive && (
          <motion.span
           className={styles.mobileNavText}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
           exit={{ opacity: 0, y: 5 }}
           transition={{ duration: 0.2 }}>
           {item.title}
          </motion.span>
         )}
        </AnimatePresence>
       </motion.div>
      );
     })}
    </div>
   </motion.nav>
  </>
 );
};

export default Sidebar;
