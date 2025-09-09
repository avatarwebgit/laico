import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Content from "../components/common/Content";
import { removeFromCompare } from "../redux/compare/compareActions";
import styles from "./Compare.module.css";

const Compare = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.compare);

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
    const value = item[key] || (item.product ? item.product[key] : undefined);

    if (value === undefined || value === null) return "-";

    switch (key) {
      case "price":
        const price = item.finalPrice || item.price;
        return price ? `${price.toLocaleString("fa-IR")} تومان` : "-";
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

  return (
    <div className={styles.pageWrapper}>
      <Content sectionClassname={styles.container}>
        <h1 className={styles.title}>مقایسه محصولات</h1>
        <div className={styles.tableWrapper}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th className={`${styles.stickyColumn} ${styles.headerCell}`}>
                  ویژگی
                </th>
                {items.map((item) => (
                  <th key={item.id} className={styles.headerCell}>
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
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attributes.map((attr) => (
                <tr key={attr.key}>
                  <th
                    scope="row"
                    className={`${styles.attributeCell} ${styles.stickyColumn}`}
                  >
                    {attr.name}
                  </th>
                  {items.map((item) => (
                    <td key={`${item.id}-${attr.key}`}>
                      {formatValue(item, attr.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Content>
    </div>
  );
};

export default Compare;
