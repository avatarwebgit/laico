import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Favorites.module.css';

const initialWishlistItems = [
 {
  id: 'wish1',
  name: 'تلسکوپ هوشمند کهکشانی',
  price: 499000,
  imageUrl:
   'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  category: 'ابزار رصد',
  link: '/product/galaxy-scope',
 },
 {
  id: 'wish2',
  name: 'پوستر سحابی چشم گربه',
  price: 75000,
  imageUrl:
   'https://images.unsplash.com/photo-1614726365949-9273435a25e8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  category: 'دکوراسیون',
  link: '/product/cat-eye-nebula-poster',
 },
 {
  id: 'wish3',
  name: 'ماگ با طرح فضانورد',
  price: 120000,
  imageUrl:
   'https://images.unsplash.com/photo-1589254066007-898d52d910d3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  category: 'لوازم شخصی',
  link: '/product/astronaut-mug',
 },
 {
  id: 'wish3',
  name: 'ماگ با طرح فضانورد',
  price: 120000,
  imageUrl:
   'https://images.unsplash.com/photo-1589254066007-898d52d910d3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  category: 'لوازم شخصی',
  link: '/product/astronaut-mug',
 },
 {
  id: 'wish3',
  name: 'ماگ با طرح فضانورد',
  price: 120000,
  imageUrl:
   'https://images.unsplash.com/photo-1589254066007-898d52d910d3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  category: 'لوازم شخصی',
  link: '/product/astronaut-mug',
 },
 {
  id: 'wish4',
  name: 'کتاب راهنمای ستارگان',
  price: 210000,
  imageUrl:
   'https://images.unsplash.com/photo-1506880018603-3a594d78a85f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  category: 'کتاب‌ها',
  link: '/product/star-guide-book',
 },
];

const WishlistItem = ({ item, onRemove, index }) => {
 const navigate = useNavigate();

 return (
  <motion.div
   layout
   initial={{ opacity: 0, y: 50, scale: 0.9 }}
   animate={{ opacity: 1, y: 0, scale: 1 }}
   exit={{ opacity: 0, y: -30, scale: 0.9 }}
   transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
   className={styles.itemCard}>
   <div
    className={styles.clickableArea}
    onClick={() => navigate(item.link)}
    aria-label={`View details for ${item.name}`}>
    <div className={styles.imageWrapper}>
     <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
     <div className={styles.categoryBadge}>{item.category}</div>
    </div>
    <div className={styles.itemDetails}>
     <h3 className={styles.itemName}>{item.name}</h3>
     <p className={styles.itemPrice}>
      {item.price.toLocaleString('fa-IR')} تومان
     </p>
    </div>
   </div>
   <div className={styles.itemActions}>
    <motion.button
     whileHover={{ scale: 1.05 }}
     whileTap={{ scale: 0.95 }}
     className={`${styles.actionButton} ${styles.removeButton}`}
     onClick={() => onRemove(item.id)}
     aria-label={`حذف ${item.name} از لیست علاقه‌مندی‌ها`}>
     <Trash2 size={16} />
     <span>حذف</span>
    </motion.button>
    <motion.button
     whileHover={{ scale: 1.05 }}
     whileTap={{ scale: 0.95 }}
     className={`${styles.actionButton} ${styles.addButton}`}
     aria-label={`افزودن ${item.name} به سبد خرید`}>
     <ShoppingCart size={16} />
     <span>افزودن به سبد</span>
    </motion.button>
   </div>
  </motion.div>
 );
};

const Favorites = () => {
 const [items, setItems] = useState(initialWishlistItems);

 const handleRemoveItem = id => {
  setItems(prevItems => prevItems.filter(item => item.id !== id));
 };

 return (
  <div className={styles.container}>
   <header className={styles.header}>
    <h1 className={styles.title}>لیست علاقه‌مندی‌ها</h1>
    <p className={styles.subtitle}>
     محصولاتی که دوست دارید را اینجا ذخیره و مدیریت کنید.
    </p>
   </header>

   <div className={styles.content}>
    {items.length > 0 ? (
     <div className={styles.wishlistGrid}>
      <AnimatePresence>
       {items.map((item, index) => (
        <WishlistItem
         key={item.id}
         item={item}
         onRemove={handleRemoveItem}
         index={index}
        />
       ))}
      </AnimatePresence>
     </div>
    ) : (
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.emptyState}>
      <Heart size={48} className={styles.emptyStateIcon} />
      <h2 className={styles.emptyStateTitle}>
       لیست علاقه‌مندی‌های شما خالی است.
      </h2>
      <p className={styles.emptyStateText}>
       محصولاتی که دوست دارید را با کلیک روی آیکون قلب به اینجا اضافه کنید.
      </p>
     </motion.div>
    )}
   </div>
  </div>
 );
};

export default Favorites;
