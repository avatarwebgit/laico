import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { closeFavoritesDrawer } from "../../redux/drawer/drawerActions";
import {
  fetchFavoritesRequest,
  removeFromFavoritesRequest,
} from "../../redux/favorites/favoritesActions";

import FavoriteItem from "./FavoriteItem";
import classes from "./FavoritesDrawer.module.css";
import Spinner from "../common/Spinner";

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const listItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const FavoritesDrawer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const drawerState = useSelector((state) => state.drawer.favoritesDrawerOpen);
  const {
    items: products,
    loading: isLoadingData,
    count,
    error: error,
  } = useSelector((state) => state.favorites);
  const { token } = useSelector((state) => state.auth);
  const lng = "fa";

  const drawerVariants = {
    open: (lng) => ({
      x: 0,
      transition: { type: "spring", stiffness: 350, damping: 40 },
    }),
    closed: (lng) => ({
      x: lng === "fa" ? "100%" : "-100%",
      transition: { type: "spring", stiffness: 350, damping: 40 },
    }),
  };

  useEffect(() => {
    if (drawerState && token) {
      dispatch(fetchFavoritesRequest());
    }
  }, [drawerState, dispatch, token]);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromFavoritesRequest(productId));
  };

  const toggleDrawer = () => {
    dispatch(closeFavoritesDrawer());
  };

  useEffect(() => {
    if (drawerState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerState]);

  const renderContent = () => {
    if (isLoadingData) {
      return (
        <div className={classes.loadingState}>
          <Spinner />
        </div>
      );
    }

    if (error) {
      return (
        <motion.div className={classes.emptyState}>
          <p>{error}</p>
        </motion.div>
      );
    }

    if (!products || products.length === 0) {
      return (
        <motion.div
          className={classes.emptyState}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, ease: "easeOut" }}
        >
          <Heart size={64} className={classes.emptyStateIcon} />
          <h3 className={classes.emptyStateTitle}>{t("drawer.empty")}</h3>
          <p className={classes.emptyStateText}>{t("drawer.empty_message")}</p>
        </motion.div>
      );
    }

    return (
      <motion.div
        className={classes.productList}
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {products.map((item) => (
            <motion.div
              key={item.id}
              layout
              variants={listItemVariants}
              exit={listItemVariants.exit}
            >
              <FavoriteItem data={item} onRemove={handleRemoveItem} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {drawerState && (
        <div
          className={classes.container}
          role="dialog"
          aria-modal="true"
          dir={lng === "fa" ? "rtl" : "ltr"}
        >
          <motion.div
            className={classes.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleDrawer}
          />
          <motion.div
            className={classes.drawerContent}
            custom={lng}
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <header className={classes.header}>
              <h2 className={classes.title}>
                {t("profile.favorites")}
                <span>({count}مورد)</span>
              </h2>
              <motion.button
                className={classes.closeButton}
                onClick={toggleDrawer}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close cart"
              >
                <X size={20} />
              </motion.button>
            </header>

            <main className={classes.body}>{renderContent()}</main>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FavoritesDrawer;
