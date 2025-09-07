import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import img from "../../assets/images/photo_2025-04-26_14-50-50.jpg";
import { ReactComponent as Basket } from "../../assets/svgs/add_basket.svg";
import { ReactComponent as Chart } from "../../assets/svgs/chart.svg";
import { ReactComponent as Eye } from "../../assets/svgs/eye.svg";
import { ReactComponent as Heart } from "../../assets/svgs/heart.svg";
import { ReactComponent as RedHeart } from "../../assets/svgs/red-heart.svg";

import classes from "./ProductBox.module.css";

const mockProduct = {
  id: "1736236632",
  variationId: "378",
  name: "محصول نمونه زیبا",
  imageUrl: img,
  hasDiscount: false,
  finalPrice: 12000000,
  originalPrice: 15000000,
  discountPercent: 0,
  isLiked: false,
  rating: 4.5,
  totalViews: 1800,
  isOutOfStock: false,
};

const ProductBox = ({ product = mockProduct, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    variationId,
    name,
    imageUrl,
    finalPrice,
    originalPrice,
    isLiked,
    rating,
    totalViews,
    isOutOfStock,
  } = product;

  const discount =
    originalPrice && finalPrice < originalPrice
      ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
      : 0;

  const buttonVariants = {
    containerHover: { x: 0 },
    shopButton: { y: -75 },
  };

  const renderStars = () => {
    if (typeof rating !== "number" || rating < 0) return null;
    const percentage = (rating / 5) * 100;

    return (
      <div className={classes.ratingWrapper}>
        <div className={classes.starsOuter}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={`empty-${i}`}
              size={16}
              className={classes.starOutline}
            />
          ))}
          <div
            className={classes.starsInner}
            style={{ width: `${percentage}%` }}
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={`filled-${i}`}
                size={16}
                className={classes.starFilled}
              />
            ))}
          </div>
        </div>
        <span className={classes.ratingValue}>
          {rating.toLocaleString("fa-IR")}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`${classes.main} ${isOutOfStock ? classes.outOfStock : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {discount > 0 && (
        <div className={classes.discountBadge}>-{discount}%</div>
      )}

      <div className={classes["image-wrapper"]}>
        <Link to={`/product/${id}/${variationId}`}>
          <img src={imageUrl} alt={name} />
        </Link>
        <div className={classes["button-wrapper"]}>
          <motion.div
            initial={{ x: -100 }}
            variants={buttonVariants}
            animate={isHovered ? "containerHover" : "visible"}
            transition={{ type: "tween", duration: 0.25, delay: 0 }}
          >
            <IconButton className={classes["icon-button"]} disableRipple>
              <Eye />
            </IconButton>
          </motion.div>

          <motion.div
            initial={{ x: -100 }}
            variants={buttonVariants}
            animate={isHovered ? "containerHover" : "visible"}
            transition={{ type: "tween", duration: 0.25, delay: 0.1 }}
          >
            <IconButton className={classes["icon-button"]} disableRipple>
              {isLiked ? <RedHeart /> : <Heart />}
            </IconButton>
          </motion.div>

          <motion.div
            initial={{ x: -100 }}
            variants={buttonVariants}
            animate={isHovered ? "containerHover" : "visible"}
            transition={{ type: "tween", duration: 0.25, delay: 0.2 }}
          >
            <IconButton className={classes["icon-button"]} disableRipple>
              <Chart />
            </IconButton>
          </motion.div>
        </div>
      </div>
      <div className={classes["content-wrapper"]}>
        <div className={classes.metaWrapper}>
          {renderStars()}
          {totalViews > 0 && (
            <div className={classes.viewsWrapper}>
              <Eye className={classes.viewsIcon} />
              <span>{totalViews.toLocaleString("fa-IR")}</span>
            </div>
          )}
        </div>
        <h5 className={classes.productTitle}>{name}</h5>

        {isOutOfStock ? (
          <div className={classes.outOfStockText}>ناموجود</div>
        ) : (
          <div className={classes.priceSection}>
            <p className={classes["previous-finalPrice"]}>
              {discount > 0 && originalPrice && (
                <del className={classes.originalPrice}>
                  {originalPrice.toLocaleString("fa-IR")} <span>تومان</span>
                </del>
              )}
            </p>
            <p className={classes.finalPrice}>
              {finalPrice.toLocaleString("fa-IR")}
              <span>تومان</span>
            </p>
            <div className={classes.priceWrapper}>
              <div className={classes.pricing}>
                {discount > 0 && originalPrice && (
                  <div className={classes.profitBadge}>
                    سود شما:{" "}
                    {(originalPrice - finalPrice).toLocaleString("fa-IR")} تومان
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {!isOutOfStock && (
        <motion.div
          className={classes.shopButtonContainer}
          initial={{ y: 0 }}
          variants={buttonVariants}
          animate={isHovered ? "shopButton" : "visible"}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <button
            className={classes["shop-button"]}
            onClick={onAddToCart ? () => onAddToCart(product) : undefined}
          >
            <Basket className={classes.basketIcon} />
            <span>افزودن به سبد</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProductBox;
