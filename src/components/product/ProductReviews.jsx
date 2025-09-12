import { MessageSquare, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import styles from "./ProductReviews.module.css";

const StarRating = ({ rating }) => (
  <div className={styles.starRating}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? styles.filledStar : styles.emptyStar}
      />
    ))}
  </div>
);

const ProductReviews = ({ reviews = [] }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.summary}>
          <p>هنوز نظری برای این محصول ثبت نشده است.</p>
          <button className={styles.writeReviewBtn}>
            <MessageSquare size={18} />
            <span>اولین نظر را ثبت کنید</span>
          </button>
        </div>
      </div>
    );
  }

  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <div className={styles.summaryRating}>
          <span className={styles.averageRating}>
            {averageRating.toLocaleString("fa-IR")}
          </span>
          <StarRating rating={averageRating} />
          <span className={styles.reviewCount}>
            (بر اساس {reviews.length.toLocaleString("fa-IR")} نظر)
          </span>
        </div>
        <button className={styles.writeReviewBtn}>
          <MessageSquare size={18} />
          <span>ثبت نظر</span>
        </button>
      </div>

      <div className={styles.reviewList}>
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className={styles.reviewCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.reviewHeader}>
              <div className={styles.authorInfo}>
                <div className={styles.avatar}>{review.author.charAt(0)}</div>
                <div>
                  <span className={styles.authorName}>{review.author}</span>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <h4 className={styles.reviewTitle}>{review.title}</h4>
            <p className={styles.reviewText}>{review.text}</p>
            <div className={styles.reviewActions}>
              <span>آیا این نظر مفید بود؟</span>
              <div className={styles.actionButtons}>
                <button>
                  <ThumbsUp size={16} />
                  <span>{review.likes || 0}</span>
                </button>
                <button>
                  <ThumbsDown size={16} />
                  <span>{review.dislikes || 0}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
