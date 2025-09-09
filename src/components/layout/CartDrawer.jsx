import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Lock, ShoppingCart, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import * as cartActions from "../../redux/cart/cartActions";
import { closeCartDrawer } from "../../redux/drawer/drawerActions";

import Spinner from "../common/Spinner";
import { formatNumber } from "../../utils/helperFucntions";
import classes from "./CartDrawer.module.css";
import CartItem from "./CartItem";

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

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const drawerState = useSelector((state) => state.drawer.cartDrawer);
  const token = useSelector((state) => state.auth.token);
  const {
    products,
    summary,
    loading: isLoadingData,
    euro,
  } = useSelector((state) => state.cart);

  const lng = "fa";

  const drawerVariants = {
    open: (lng) => ({
      x: 0,
      transition: { type: "spring", stiffness: 350, damping: 40 },
    }),
    closed: (lng) => ({
      x: lng === "fa" ? "100%" : "100%",
      transition: { type: "spring", stiffness: 350, damping: 40 },
    }),
  };

  useEffect(() => {
    const cartToken = localStorage.getItem("cartToken");
    if (drawerState && (token || cartToken)) {
      dispatch(cartActions.fetchCartRequest());
    }
  }, [drawerState, dispatch, token]);

  const handleQuantityUpdate = (itemId, newQuantity) => {
    dispatch(
      cartActions.updateCartItemRequest({
        cartId: itemId,
        quantity: newQuantity,
      })
    );
  };

  const handleRemoveItem = (cartId) => {
    dispatch(cartActions.removeFromCartRequest(cartId));
  };

  const grandTotal = useMemo(() => {
    return summary?.subtotal || 0;
  }, [summary]);

  const toggleDrawer = () => {
    dispatch(closeCartDrawer());
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

    if (!products || products.length === 0) {
      return (
        <motion.div
          className={classes.emptyState}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, ease: "easeOut" }}
        >
          <ShoppingCart size={64} className={classes.emptyStateIcon} />
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
              <CartItem
                data={item}
                onQuantityUpdate={handleQuantityUpdate}
                onRemoveItem={handleRemoveItem}
              />
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
              <h2 className={classes.title}>{t("shopping_cart.cart")}</h2>
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

            {products?.length > 0 && (
              <footer className={classes.footer}>
                <div className={classes.summary}>
                  <div className={classes.summaryRow}>
                    <span>{t("drawer.subtotal")}</span>
                    <span>{formatNumber((summary?.subtotal || 0) * euro)}</span>
                  </div>
                  <div
                    className={`${classes.summaryRow} ${classes.grandTotal}`}
                  >
                    <span>{t("shopping_cart.total", "Total")}</span>
                    <span>{formatNumber(grandTotal * euro)}</span>
                  </div>
                </div>
                {token ? (
                  <Link
                    to="/checkout"
                    className={classes.checkoutButton}
                    onClick={toggleDrawer}
                  >
                    <CreditCard size={18} />
                    {t("drawer.checkout")}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className={classes.checkoutButton}
                    onClick={toggleDrawer}
                  >
                    <Lock size={18} />
                    {t("drawer.login_to_continue")}
                  </Link>
                )}
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
