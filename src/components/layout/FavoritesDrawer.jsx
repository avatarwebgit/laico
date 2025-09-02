import { AnimatePresence, motion } from "framer-motion";
import { Lock, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { drawerActions } from "../../store/drawer/drawerSlice";

import FavoriteItem from "./FavoriteItem";
import classes from "./FavoritesDrawer.module.css";

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

const dummyFavorites = [
  {
    id: 4,
    variation_id: 404,
    name: "Stylish Leather Jacket",
    alias: "stylish-leather-jacket",
    primary_image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
    color: "Brown",
    size: "L",
    sale_price: 250,
    selected_quantity: 1,
  },
  {
    id: 5,
    variation_id: 505,
    name: "Cozy Wool Scarf",
    alias: "cozy-wool-scarf",
    primary_image:
      "https://images.unsplash.com/photo-1542489441-336c54093c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    color: "Grey",
    size: "One Size",
    sale_price: 45,
    selected_quantity: 1,
  },
];

const FavoritesDrawer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const drawerState = useSelector((state) => state.drawer.favoritesDrawer);

  const products = dummyFavorites;

  const { token } = useSelector((state) => state.user);

  const lng = "fsa";

  const drawerVariants = {
    open: (lng) => ({
      x: 0,
      transition: { type: "spring", stiffness: 350, damping: 40 },
    }),
    closed: (lng) => ({
      x: lng === "fa" ? "-100%" : "100%",
      transition: { type: "spring", stiffness: 350, damping: 40 },
    }),
  };
  const [isLoadingData, setIsLoadingData] = useState(false);

  const toggleDrawer = () => {
    dispatch(drawerActions.favoritesClose());
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
          {[...Array(3)].map((_, i) => (
            <div key={i} className={classes.skeletonItem} />
          ))}
        </div>
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
          <ShoppingCart size={64} className={classes.emptyStateIcon} />
          <h3 className={classes.emptyStateTitle}>
            {t("shopping_cart.empty")}
          </h3>
          <p className={classes.emptyStateText}>
            {t(
              "shopping_cart.empty_message",
              "Looks like you haven't added anything yet."
            )}
          </p>
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
              key={item.variation_id}
              layout
              variants={listItemVariants}
              exit={listItemVariants.exit}
            >
              <FavoriteItem data={item} />
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
              <h2 className={classes.title}>{t("profile.favorites")}</h2>
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
