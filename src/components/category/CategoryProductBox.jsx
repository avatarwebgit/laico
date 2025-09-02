import { Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Star } from "lucide-react";
import React, { useCallback } from "react";
import { ReactComponent as Eye } from "../../assets/svgs/eye.svg";
import ImagePixelated from "../common/ImagePixelated";
import classes from "./CategoryProductBox.module.css";

const CategoryProductBox = ({ product }) => {
  const {
    imageUrl,
    name,
    caption,
    price,
    colors = [],
    id,
    isOutOfStock,
    rating = 0,
    totalViews = 0,
    originalPrice,
  } = product;

  const discount =
    originalPrice && price < originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

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

  const renderColors = useCallback(() => {
    return colors.slice(0, 4).map((option) => (
      <Tooltip
        key={option.id}
        title={option.color}
        arrow
        placement="top"
        slotProps={{
          tooltip: { sx: { fontSize: "10px" } },
          arrow: { sx: { fontSize: "10px" } },
        }}
      >
        <div className={`${classes["color-wrapper"]}`}>
          <div className={`${classes["color-input-wrapper"]} ${classes.rtl}`}>
            <input
              type="color"
              name={`color-${option.id}`}
              id={`color-${option.id}`}
              readOnly
              hidden
            />
            <div
              className={`${classes["custom-color"]}`}
              style={{
                background: option.image ? `url(${option.image})` : option.hex,
                backgroundColor: option.hex,
              }}
            />
          </div>
        </div>
      </Tooltip>
    ));
  }, [colors]);

  return (
    <a
      className={`${classes["product-box"]} ${
        isOutOfStock ? classes.outOfStock : ""
      }`}
      href={isOutOfStock ? "#" : `/product/${id}/${id}`}
    >
      <div className={classes["img-wrapper"]}>
        <ImagePixelated src={imageUrl} alt={name} />
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
        <div className={classes.title}>{name}</div>
        <div className={classes.caption}>{caption}</div>

        {isOutOfStock ? (
          <div className={classes.outOfStockText}>ناموجود</div>
        ) : (
          <div className={classes.priceSection}>
            {discount > 0 && originalPrice && (
              <div className={classes.profitBadge}>
                سود شما: {(originalPrice - price).toLocaleString("fa-IR")} تومان
              </div>
            )}
            <div className={classes.priceWrapper}>
              <div className={classes.pricing}>
                {discount > 0 && originalPrice && (
                  <del className={classes.originalPrice}>
                    {originalPrice.toLocaleString("fa-IR")}
                  </del>
                )}
                <p className={classes.finalPrice}>
                  {price.toLocaleString("fa-IR")}
                  <span>تومان</span>
                </p>
              </div>
              {discount > 0 && (
                <div className={classes.discountBadge}>-{discount}%</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={classes["color-wrapper-main"]}>
        {renderColors()}
        {colors.length > 5 && (
          <Tooltip
            title={"مشاهده همه رنگ ها"}
            arrow
            placement="top"
            slotProps={{
              tooltip: { sx: { fontSize: "10px" } },
              arrow: { sx: { fontSize: "10px" } },
            }}
          >
            <div className={`${classes["color-input-wrapper"]} ${classes.rtl}`}>
              <div
                className={`${classes["more-wrapper"]}`}
                style={{
                  backgroundColor: "#fff",
                }}
              >
                <MoreVertIcon sx={{ fontSize: "20px" }} />
              </div>
            </div>
          </Tooltip>
        )}
      </div>
    </a>
  );
};

export default CategoryProductBox;
