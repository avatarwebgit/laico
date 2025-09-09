import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  removeFromCompare,
  clearCompare,
} from "../../redux/compare/compareActions";
import styles from "./CompareBar.module.css";

const CompareBar = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.compare);

  if (items.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.compareBar}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        style={{ x: "-50%" }}
      >
        <div className={styles.itemsContainer}>
          {items.map((item) => (
            <motion.div key={item.id} className={styles.item} layout>
              <img
                src={item.imageUrl || item.primary_image}
                alt={item.name}
                className={styles.itemImage}
              />
              <span className={styles.itemName}>{item.name}</span>
              <button
                className={styles.removeItemButton}
                onClick={() => dispatch(removeFromCompare(item.id))}
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
          {[...Array(4 - items.length)].map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className={`${styles.item} ${styles.placeholder}`}
            >
              +
            </div>
          ))}
        </div>
        <div className={styles.actionsContainer}>
          <button
            className={`${styles.actionButton} ${styles.clearButton}`}
            onClick={() => dispatch(clearCompare())}
          >
            <Trash2 size={18} />
            <span>پاک کردن همه</span>
          </button>
          <Link
            to="/compare"
            className={`${styles.actionButton} ${styles.compareButton}`}
          >
            <span>مقایسه ({items.length})</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareBar;
