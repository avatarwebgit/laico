import { IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import classes from "./FavoriteItem.module.css";

const FavoriteItem = ({ data: productData, onRemove }) => {
  const { t } = useTranslation();
  const lng = "fa";
  const euro = 1000;

  const handleRemoveItem = () => {
    if (onRemove) {
      onRemove(productData.id);
    }
  };

  if (!productData) {
    return null;
  }

  const productName = productData.name || `${t("Product")} ${productData.id}`;
  const productLink = `/product/${productData.id}`;

  return (
    <div
      className={classes.main}
      style={{ direction: lng === "fa" ? "rtl" : "ltr" }}
    >
      <div className={classes.imageWrapper}>
        <Link to={productLink} target="_blank">
          <img
            src={productData.primary_image || productData.imageUrl}
            alt={productName}
            loading="lazy"
          />
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
        <p className={classes.productAttributes}>
          {t("color")}: {productData.color} | {t("size")}: {productData.size}
        </p>
        <p className={classes.itemPrice}>
          {Math.round(
            (productData.sale_price || productData.price) * euro
          ).toLocaleString()}{" "}
          {t("m_unit")}
        </p>
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

export default memo(FavoriteItem);
