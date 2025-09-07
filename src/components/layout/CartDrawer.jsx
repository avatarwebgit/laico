import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Lock, ShoppingCart, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { closeCartDrawer } from "../../redux/drawer/drawerActions";
import * as cartActions from "../../redux/cart/cartActions";

import CartItem from "./CartItem";
import classes from "./CartDrawer.module.css";
import { formatNumber } from "../../utils/helperFucntions";
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

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const drawerState = useSelector((state) => state.drawer.cartDrawer);
  const {
    products,
    loading: isLoadingData,
    euro,
    totalPrice,
  } = useSelector((state) => state.cart);
  const token = useSelector((state) => state.user.token);
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
    if (drawerState && token && products.length === 0) {
      dispatch(cartActions.fetchCartRequest());
    }
  }, [drawerState, dispatch, token, products.length]);

  const handleQuantityUpdate = (
    itemId,
    newQuantity,
    variationId,
    productId
  ) => {
    dispatch(
      cartActions.updateCartItemRequest({
        product_id: productId,
        variation_id: variationId,
        quantity: newQuantity,
      })
    );
  };

  const handleRemoveItem = (cartId) => {
    dispatch(cartActions.removeFromCartRequest(cartId));
  };

  const grandTotal = useMemo(() => {
    return totalPrice; // Assuming no discounts/taxes for now
  }, [totalPrice]);

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
                    <span>{t("subtotal")}</span>
                    <span>{formatNumber(totalPrice * euro)}</span>
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
                    <CreditCard size={18} />
                    {t("drawer.checkout")}
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
