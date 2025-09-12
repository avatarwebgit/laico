import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, Trash2, Layers2, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  removeFromCompare,
  clearCompare,
} from "../../redux/compare/compareActions";
import styles from "./CompareBar.module.css";

const CompareBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { items } = useSelector((state) => state.compare);
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (items.length === 0) {
    return null;
  }

  const barClasses = `${styles.compareBar} ${
    isCollapsed ? styles.collapsed : ""
  }`;
  const chevronClasses = `${styles.chevron} ${
    isCollapsed ? styles.collapsed : ""
  }`;
  const itemsContainerClasses = `${styles.itemsContainerWrapper} ${
    isCollapsed ? styles.collapsed : ""
  }`;

  return (
    <div className={barClasses}>
      <div className={styles.header}>
        <div className={styles.actionsContainer}>
          <Link
            to="/compare"
            className={`${styles.actionButton} ${styles.compareButton}`}
          >
            <Layers2 size={18} />
            <span>مقایسه ({items.length})</span>
          </Link>
          <button
            className={`${styles.actionButton} ${styles.clearButton}`}
            onClick={() => dispatch(clearCompare())}
          >
            <Trash2 size={18} />
            <span className={styles.clearText}>پاک کردن همه</span>
          </button>
        </div>
      </div>
      <div className={itemsContainerClasses}>
        <div className={styles.itemsContainer}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <img
                src={item.imageUrl || item.primary_image}
                alt={item.name}
                className={styles.itemImage}
              />
              <span className={styles.itemName}>{item.name}</span>
              <button
                className={styles.removeItemButton}
                onClick={() => dispatch(removeFromCompare(item.id))}
                aria-label={`حذف ${item.name}`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {[...Array(6 - items.length)].map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className={`${styles.item} ${styles.placeholder}`}
            >
              +
            </div>
          ))}
        </div>
      </div>{" "}
      <button
        className={styles.collapseButton}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "باز کردن" : "بستن"}
      >
        <div className={chevronClasses}>
          <ChevronDown size={24} />
        </div>
      </button>
    </div>
  );
};

export default CompareBar;
