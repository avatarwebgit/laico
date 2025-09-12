import { IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { Star, Eye, Layers2, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as cartActions from "../../redux/cart/cartActions";
import * as installmentCartActions from "../../redux/installmentCart/installmentCartActions";

import img from "../../assets/images/photo_2025-04-26_14-50-50.jpg";

import { toggleCompare } from "../../redux/compare/compareActions";
import {
  addFavoriteRequest,
  removeFromFavoritesRequest,
} from "../../redux/favorites/favoritesActions";

import classes from "./ProductBox.module.css";
import InstallmentGatewayModal from "./InstallmentGatewayModal";
import PurchaseMethodModal from "./PurchaseMethodModal";

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

const ProductBox = ({ product = mockProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [gatewayModalVisible, setGatewayModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: favorites } = useSelector((state) => state.favorites);
  const { token } = useSelector((state) => state.auth);
  const { items: compareItems } = useSelector((state) => state.compare);
  const isInCompare = compareItems.some((item) => item.id === product.id);

  const {
    id,
    variationId,
    name,
    imageUrl,
    final_price,
    original_price,
    rating,
    totalViews,
    isOutOfStock,
  } = product;

  const finalPrice = final_price;
  const originalPrice = original_price;

  const isLiked = favorites.some((fav) => fav.id === id);

  const discount =
    originalPrice && finalPrice < originalPrice
      ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
      : 0;

  const buttonVariants = {
    containerHover: { x: 0 },
    shopButton: { y: -75 },
  };

  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    // dispatch(
    //   cartActions.addToCartRequest({ product_id: product.id, quantity: 1 })
    // );
    setPurchaseModalVisible(true);
  };

  const handlePurchaseMethodSelect = (method) => {
    setPurchaseModalVisible(false);
    if (method === "cash") {
      dispatch(
        cartActions.addToCartRequest({ product_id: product.id, quantity: 1 })
      );
    } else if (method === "installment") {
      setGatewayModalVisible(true);
    }
  };

  const handleGatewaySelect = (gatewayId) => {
    setGatewayModalVisible(false);
    dispatch(
      installmentCartActions.addToInstallmentCartRequest({
        product_id: product.id,
        quantity: 1,
        gateway: gatewayId,
      })
    );
  };

  const handleToggleCompare = () => {
    dispatch(toggleCompare(product));
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      navigate("/login");
      return;
    }
    if (isLiked) {
      dispatch(removeFromFavoritesRequest(product.id));
    } else {
      dispatch(addFavoriteRequest(product));
    }
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
    <>
      <div
        className={`${classes.main} ${isOutOfStock ? classes.outOfStock : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {discount > 0 && (
          <div className={classes.discountBadge}>-{discount}%</div>
        )}

        <div className={classes["image-wrapper"]}>
          <Link to={`/product/${product.id}`}>
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
                <Eye size={16} />
              </IconButton>
            </motion.div>

            <motion.div
              initial={{ x: -100 }}
              variants={buttonVariants}
              animate={isHovered ? "containerHover" : "visible"}
              transition={{ type: "tween", duration: 0.25, delay: 0.1 }}
            >
              <IconButton
                className={classes["icon-button"]}
                disableRipple
                onClick={handleToggleFavorite}
              >
                {isLiked ? (
                  <Heart size={16} fill="red" color="red" />
                ) : (
                  <Heart size={16} />
                )}
              </IconButton>
            </motion.div>

            <motion.div
              initial={{ x: -100 }}
              variants={buttonVariants}
              animate={isHovered ? "containerHover" : "visible"}
              transition={{ type: "tween", duration: 0.25, delay: 0.2 }}
            >
              <Tooltip title={isInCompare ? "حذف از مقایسه" : "مقایسه"}>
                <IconButton
                  className={classes["icon-button"]}
                  disableRipple
                  onClick={handleToggleCompare}
                >
                  <Layers2 size={16} fill={isInCompare ? "black" : "none"} />
                </IconButton>
              </Tooltip>
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
                {finalPrice && finalPrice.toLocaleString("fa-IR")}
                <span>تومان</span>
              </p>
              <div className={classes.priceWrapper}>
                <div className={classes.pricing}>
                  {discount > 0 && originalPrice && (
                    <div className={classes.profitBadge}>
                      سود شما:{" "}
                      {(originalPrice - finalPrice).toLocaleString("fa-IR")}{" "}
                      تومان
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
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20} color="white" />
              <span>افزودن به سبد</span>
            </button>
          </motion.div>
        )}
      </div>

      <PurchaseMethodModal
        open={purchaseModalVisible}
        onCancel={() => setPurchaseModalVisible(false)}
        onSelect={handlePurchaseMethodSelect}
      />

      <InstallmentGatewayModal
        open={gatewayModalVisible}
        onCancel={() => setGatewayModalVisible(false)}
        onSelect={handleGatewaySelect}
        product={product}
      />
    </>
  );
};

export default ProductBox;
