import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
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
    { key: "isFeatured", name: "ویژه" },
    { key: "isOutOfStock", name: "وضعیت موجودی" },
  ];

  const formatValue = (item, key) => {
    const value = item[key];
    switch (key) {
      case "price":
        const price = item.finalPrice || item.price;
        return `${price.toLocaleString("fa-IR")} تومان`;
      case "originalPrice":
        return `${value.toLocaleString("fa-IR")} تومان`;
      case "isFeatured":
      case "isOutOfStock":
        return value ? "خیر" : "بله";
      case "rating":
      case "sales":
      case "deliveryTime":
      case "views":
        return value ? value.toLocaleString("fa-IR") : "-";
      default:
        return value || "-";
    }
  };

  if (items.length === 0) {
    return (
      <Content>
        <div className={styles.emptyState}>
          <h2>هیچ محصولی برای مقایسه انتخاب نشده است.</h2>
          <Link to="/category" className={styles.backButton}>
            بازگشت به فروشگاه
          </Link>
        </div>
      </Content>
    );
  }

  return (
    <Content sectionClassname={styles.container}>
      <h1 className={styles.title}>مقایسه محصولات</h1>
      <div className={styles.tableContainer}>
        <table className={styles.compareTable}>
          <thead>
            <tr>
              <th>ویژگی</th>
              {items.map((item) => (
                <th key={item.id}>
                  <div className={styles.productHeader}>
                    <img
                      src={item.imageUrl || item.primary_image}
                      alt={item.name}
                    />
                    <h3>{item.name}</h3>
                    <button
                      onClick={() => dispatch(removeFromCompare(item.id))}
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
                <td>{attr.name}</td>
                {items.map((item) => (
                  <td key={item.id}>{formatValue(item, attr.key)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Content>
  );
};

export default Compare;
