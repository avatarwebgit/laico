import { IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { Info, Minus, Plus, Trash2 } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./CartItem.module.css";
import placeholder from "../../assets/images/Logo.png";

const CartItem = ({ data: productData, onQuantityUpdate, onRemoveItem }) => {
  const [quantity, setQuantity] = useState(productData.quantity || 1);
  const { t } = useTranslation();
  const lng = "fa";
  const euro = 1000;

  useEffect(() => {
    setQuantity(productData.quantity);
  }, [productData.quantity]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }

    setQuantity(newQuantity);

    if (onQuantityUpdate) {
      onQuantityUpdate(
        productData.id,
        newQuantity,
        productData.product_variant_id,
        productData.product_id
      );
    }
  };

  const handleRemoveItem = () => {
    if (onRemoveItem) {
      onRemoveItem(productData.id);
    }
  };

  if (!productData) {
    return null;
  }

  const productName =
    productData.product?.name || `${t("Product")} ${productData.id}`;
  const productLink = `/${lng}/products/${productData.product?.slug}/${productData.product_variant_id}`;
  const imageUrl = productData.product?.image || placeholder;

  return (
    <div
      className={classes.main}
      style={{ direction: lng === "fa" ? "rtl" : "ltr" }}
    >
      <div className={classes.imageWrapper}>
        <Link to={productLink} target="_blank">
          <img src={imageUrl} alt={productName} loading="lazy" />
        </Link>
      </div>

      <div className={classes.detailsWrapper}>
        <Link
          to={productLink}
          target="_blank"
          className={classes.productNameLink}
        >
          <h3 className={classes.productName}>{productName}</h3>
        </Link>
        <p className={classes.itemPrice}>
          {Math.round(productData.pricing?.final_price * euro).toLocaleString()}{" "}
          {t("m_unit")}
        </p>
      </div>

      <div className={classes.actionsWrapper}>
        <p className={classes.totalPrice}>
          {Math.round(productData.pricing?.total_price * euro).toLocaleString()}{" "}
          {t("m_unit")}
        </p>
        <div className={`${classes.quantityChanger}`}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={classes.quantityButton}
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </motion.button>
          <span className={classes.quantityDisplay}>{quantity}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={classes.quantityButton}
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus size={16} />
          </motion.button>
        </div>
      </div>

      <motion.div whileTap={{ scale: 0.9 }} className={classes.deleteAction}>
        <Tooltip title={t("remove_item")} placement="top" arrow>
          <IconButton
            onClick={handleRemoveItem}
            className={classes.deleteButton}
            size="small"
          >
            <Trash2 size={16} />
          </IconButton>
        </Tooltip>
      </motion.div>
    </div>
  );
};

export default memo(CartItem);
