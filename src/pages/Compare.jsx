import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Content from "../components/common/Content";
import { removeFromCompare } from "../redux/compare/compareActions";
import styles from "./Compare.module.css";

const Compare = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.compare);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const attributes = [
    { key: "price", name: "قیمت" },
    { key: "rating", name: "امتیاز" },
    { key: "caption", name: "توضیحات کوتاه" },
    { key: "category", name: "دسته بندی" },
    { key: "sales", name: "تعداد فروش" },
    { key: "deliveryTime", name: "زمان تحویل (روز)" },
    { key: "isFeatured", name: "محصول ویژه" },
    { key: "isOutOfStock", name: "وضعیت موجودی" },
    { key: "totalViews", name: "تعداد بازدید" },
  ];

  const formatValue = (item, key) => {
    if (key === "price") {
      const finalPrice = item.finalPrice || item.price;
      const originalPrice = item.originalPrice;

      if (finalPrice === undefined || finalPrice === null) return "-";

      const hasDiscount = originalPrice && finalPrice < originalPrice;
      const discountValue = hasDiscount ? originalPrice - finalPrice : 0;
      const discountPercent = hasDiscount
        ? Math.round((discountValue / originalPrice) * 100)
        : 0;

      return (
        <div className={styles.priceCell}>
          {hasDiscount && (
            <>
              <del className={styles.originalPrice}>
                {originalPrice.toLocaleString("fa-IR")} تومان
              </del>
              <div className={styles.discountBadge}>
                {discountPercent > 0 ? discountPercent : ""}% تخفیف
              </div>
            </>
          )}
          <div className={styles.finalPrice}>
            {finalPrice.toLocaleString("fa-IR")} تومان
          </div>
          {hasDiscount && (
            <div className={styles.profitBadge}>
              سود شما: {discountValue.toLocaleString("fa-IR")} تومان
            </div>
          )}
        </div>
      );
    }

    const value = item[key] || (item.product ? item.product[key] : undefined);

    if (value === undefined || value === null) return "-";

    switch (key) {
      case "isFeatured":
        return value ? "بله" : "خیر";
      case "isOutOfStock":
        return value ? "ناموجود" : "موجود";
      case "rating":
      case "sales":
      case "deliveryTime":
      case "totalViews":
        return value.toLocaleString("fa-IR");
      default:
        return value;
    }
  };

  if (items.length === 0) {
    return (
      <Content sectionClassname={styles.container}>
        <div className={styles.emptyState}>
          <h2>هیچ محصولی برای مقایسه انتخاب نشده است.</h2>
          <p>
            برای شروع، محصولات مورد نظر خود را از صفحات فروشگاه به لیست مقایسه
            اضافه کنید.
          </p>
          <Link to="/category" className={styles.backButton}>
            <ShoppingCart size={18} />
            <span>بازگشت به فروشگاه</span>
          </Link>
        </div>
      </Content>
    );
  }

  // The number of columns is the number of items + 1 for the attribute names
  const gridColumns = {
    gridTemplateColumns: `auto repeat(${items.length}, 1fr)`,
  };

  return (
    <div className={styles.pageWrapper}>
      <Content sectionClassname={styles.container}>
        <h1 className={styles.title}>مقایسه محصولات</h1>
        <div className={styles.compareWrapper}>
          <div className={styles.compareGrid} style={gridColumns}>
            {/* Sticky Header Row */}
            <div
              className={`${styles.headerCell} ${styles.stickyHeader} ${styles.stickyColumn}`}
            >
              ویژگی
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className={`${styles.headerCell} ${styles.stickyHeader}`}
              >
                <div className={styles.productHeader}>
                  <img
                    src={item.imageUrl || item.primary_image}
                    alt={item.name}
                  />
                  <h3>{item.name}</h3>
                  <button
                    className={styles.removeButton}
                    onClick={() => dispatch(removeFromCompare(item.id))}
                    aria-label={`حذف ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Scrollable Attribute Rows */}
            {attributes.map((attr) => (
              <React.Fragment key={attr.key}>
                <div
                  className={`${styles.attributeCell} ${styles.stickyColumn}`}
                >
                  {attr.name}
                </div>
                {items.map((item) => (
                  <div
                    key={`${item.id}-${attr.key}`}
                    className={styles.valueCell}
                  >
                    {formatValue(item, attr.key)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Compare;
