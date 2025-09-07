import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchFavoritesRequest,
  removeFavoriteRequest,
} from "../../redux/user/userActions";
import Spinner from "../common/Spinner";
import styles from "./Favorites.module.css";

const WishlistItem = ({ item, onRemove, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className={styles.itemCard}
    >
      <div
        className={styles.clickableArea}
        onClick={() => navigate(item.link)}
        aria-label={`View details for ${item.name}`}
      >
        <div className={styles.imageWrapper}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className={styles.itemImage}
          />
          <div className={styles.categoryBadge}>{item.category}</div>
        </div>
        <div className={styles.itemDetails}>
          <h3 className={styles.itemName}>{item.name}</h3>
          <p className={styles.itemPrice}>
            {item.price.toLocaleString("fa-IR")} تومان
          </p>
        </div>
      </div>
      <div className={styles.itemActions}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${styles.actionButton} ${styles.removeButton}`}
          onClick={() => onRemove(item.id)}
          aria-label={`حذف ${item.name} از لیست علاقه‌مندی‌ها`}
        >
          <Trash2 size={16} />
          <span>حذف</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${styles.actionButton} ${styles.addButton}`}
          aria-label={`افزودن ${item.name} به سبد خرید`}
        >
          <ShoppingCart size={16} />
          <span>افزودن به سبد</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Favorites = () => {
  const dispatch = useDispatch();
  const {
    favorites: items,
    favoritesLoading,
    favoritesError,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchFavoritesRequest());
    }
  }, [dispatch, items.length]);

  const handleRemoveItem = (id) => {
    dispatch(removeFavoriteRequest(id));
  };

  const renderContent = () => {
    if (favoritesLoading) {
      return (
        <div className={styles.stateContainer}>
          <Spinner />
        </div>
      );
    }

    if (favoritesError) {
      return (
        <div className={styles.stateContainer}>
          <p className={styles.errorText}>خطا: {favoritesError}</p>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.emptyState}
        >
          <Heart size={48} className={styles.emptyStateIcon} />
          <h2 className={styles.emptyStateTitle}>
            لیست علاقه‌مندی‌های شما خالی است.
          </h2>
          <p className={styles.emptyStateText}>
            محصولاتی که دوست دارید را با کلیک روی آیکون قلب به اینجا اضافه کنید.
          </p>
        </motion.div>
      );
    }

    return (
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
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>لیست علاقه‌مندی‌ها</h1>
        <p className={styles.subtitle}>
          محصولاتی که دوست دارید را اینجا ذخیره و مدیریت کنید.
        </p>
      </header>

      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default Favorites;
