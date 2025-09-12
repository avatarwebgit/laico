import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Lock, ShoppingCart, X } from "lucide-react";
import { useEffect, useMemo, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import { Minus, Plus, Trash2 } from "lucide-react";
import placeholder from "../../assets/images/Logo.png";

import * as installmentCartActions from "../../redux/installmentCart/installmentCartActions";
import { closeInstallmentCartDrawer } from "../../redux/drawer/drawerActions";
import { fetchInstallmentGatewaysRequest } from "../../redux/general/generalActions";

import Spinner from "../common/Spinner";
import { formatNumber } from "../../utils/helperFucntions";
import classes from "./InstallmentCartDrawer.module.css";
import itemClasses from "./CartItem.module.css";

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

const InstallmentCartItem = memo(
  ({ data: productData, onQuantityUpdate, onRemoveItem }) => {
    const [quantity, setQuantity] = useState(productData.quantity || 1);
    const { t } = useTranslation();
    const lng = "fa";

    useEffect(() => {
      setQuantity(productData.quantity);
    }, [productData.quantity]);

    const handleQuantityChange = (newQuantity) => {
      if (newQuantity < 1) newQuantity = 1;
      setQuantity(newQuantity);
      if (onQuantityUpdate) {
        onQuantityUpdate(productData.id, newQuantity);
      }
    };

    const handleRemoveItem = () => {
      if (onRemoveItem) {
        onRemoveItem(productData.id);
      }
    };

    if (!productData || !productData.pricing) return null;

    const { pricing } = productData;
    const finalPrice = pricing.final_price;

    return (
      <div
        className={itemClasses.main}
        style={{ direction: lng === "fa" ? "rtl" : "ltr" }}
      >
        <div className={itemClasses.imageWrapper}>
          <Link to={`/product/${productData.product.slug}`} target="_blank">
            <img
              src={productData.product?.image || placeholder}
              alt={productData.product.name}
              loading="lazy"
            />
          </Link>
        </div>

        <div className={itemClasses.detailsWrapper}>
          <Link
            to={`/product/${productData.product.slug}`}
            target="_blank"
            className={itemClasses.productNameLink}
          >
            <h3 className={itemClasses.productName}>
              {productData.product.name}
            </h3>
          </Link>
          <div className={itemClasses.priceContainer}>
            <p className={itemClasses.itemPrice}>
              {finalPrice.toLocaleString("fa-IR")}
              <span className={itemClasses.currency}> تومان </span>
            </p>
          </div>
        </div>

        <div className={itemClasses.actionsWrapper}>
          <p className={itemClasses.totalPrice}>
            {(finalPrice * quantity).toLocaleString("fa-IR")}
            <span className={itemClasses.currency}>تومان</span>
          </p>
          <div className={`${itemClasses.quantityChanger}`}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={itemClasses.quantityButton}
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </motion.button>
            <span className={itemClasses.quantityDisplay}>{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={itemClasses.quantityButton}
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus size={16} />
            </motion.button>
          </div>
        </div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          className={itemClasses.deleteAction}
        >
          <Tooltip title={t("remove_item")} placement="top" arrow>
            <IconButton
              onClick={handleRemoveItem}
              className={itemClasses.deleteButton}
              size="small"
            >
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>
        </motion.div>
      </div>
    );
  }
);

const InstallmentCartDrawer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const drawerState = useSelector(
    (state) => state.drawer.installmentCartDrawerOpen
  );
  const token = useSelector((state) => state.auth.token);
  const {
    products,
    summary,
    loading: isLoadingData,
  } = useSelector((state) => state.installmentCart);

  const { gateways, loading: isLoadingGateways } = useSelector(
    (state) => state.general
  );

  useEffect(() => {
    if (drawerState) {
      dispatch(fetchInstallmentGatewaysRequest());
    }
  }, [drawerState, dispatch]);

  const gatewayMap = useMemo(() => {
    if (!gateways) return {};
    return gateways.reduce((acc, gw) => {
      acc[gw.id] = gw;
      return acc;
    }, {});
  }, [gateways]);

  const groupedItems = useMemo(() => {
    return products.reduce((acc, item) => {
      const gatewayKey = item.gateway || "unknown";
      if (!acc[gatewayKey]) {
        acc[gatewayKey] = {
          info: gatewayMap[gatewayKey] || { name: "متفرقه", icon: "" },
          items: [],
        };
      }
      acc[gatewayKey].items.push(item);
      return acc;
    }, {});
  }, [products, gatewayMap]);

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

  const handleQuantityUpdate = (itemId, newQuantity) => {
    dispatch(
      installmentCartActions.updateInstallmentCartItemRequest({
        cartId: itemId,
        quantity: newQuantity,
      })
    );
  };

  const handleRemoveItem = (cartId) => {
    dispatch(installmentCartActions.removeFromInstallmentCartRequest(cartId));
  };

  const grandTotal = useMemo(() => {
    return summary?.subtotal || 0;
  }, [summary]);

  const toggleDrawer = () => {
    dispatch(closeInstallmentCartDrawer());
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
    if (isLoadingData || isLoadingGateways) {
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
          <CreditCard size={64} className={classes.emptyStateIcon} />
          <h3 className={classes.emptyStateTitle}>سبد اقساطی خالی است</h3>
          <p className={classes.emptyStateText}>
            محصولات خرید اقساطی شما اینجا نمایش داده می‌شوند.
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
          {Object.entries(groupedItems).map(([gatewayId, group]) => (
            <div key={gatewayId} className={classes.gatewayGroup}>
              <header className={classes.gatewayHeader}>
                {group.info.icon && (
                  <img
                    src={group.info.icon}
                    alt={group.info.name}
                    className={classes.gatewayIcon}
                  />
                )}
                <h4>{group.info.name}</h4>
              </header>
              {group.items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={listItemVariants}
                  exit={listItemVariants.exit}
                >
                  <InstallmentCartItem
                    data={item}
                    onQuantityUpdate={handleQuantityUpdate}
                    onRemoveItem={handleRemoveItem}
                  />
                </motion.div>
              ))}
            </div>
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
              <h2 className={classes.title}>سبد خرید اقساطی</h2>
              <motion.button
                className={classes.closeButton}
                onClick={toggleDrawer}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="بستن سبد خرید"
              >
                <X size={20} />
              </motion.button>
            </header>

            <main className={classes.body}>{renderContent()}</main>

            {products?.length > 0 && (
              <footer className={classes.footer}>
                <div className={classes.summary}>
                  <div
                    className={`${classes.summaryRow} ${classes.grandTotal}`}
                  >
                    <span>{t("shopping_cart.total", "Total")}</span>
                    <span>{formatNumber(grandTotal)}</span>
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

export default InstallmentCartDrawer;
