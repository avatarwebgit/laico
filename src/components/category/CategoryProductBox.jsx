import React, { useCallback, useState } from "react";
import { Tooltip } from "@mui/material";
import Img from "../common/Img";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import classes from "./CategoryProductBox.module.css";
import ImagePixelated from "../common/ImagePixelated";

const CategoryProductBox = ({ product }) => {
  const { imageUrl, name, caption, price, colors, id, isOutOfStock } = product;
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
        {isOutOfStock && (
          <div className={classes.outOfStockOverlay}>
            <span>ناموجود</span>
          </div>
        )}
        <ImagePixelated src={imageUrl} alt={name} />
      </div>
      <div className={classes.title}>{name}</div>
      <div className={classes.caption}>{caption}</div>
      {isOutOfStock ? (
        <div className={classes.outOfStockText}>ناموجود</div>
      ) : (
        <div className={classes.price}>
          <span>{price.toLocaleString("fa-IR")}</span>
          <span>تومان</span>
        </div>
      )}
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
