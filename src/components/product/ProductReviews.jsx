
import { MessageSquare, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProductReviews.module.css';

const mockReviews = [
  {
    id: 1,
    author: 'آریا ستوده‌نیا',
    date: '۲ روز پیش',
    rating: 5,
    title: 'فوق‌العاده و بی‌نظیر!',
    text: 'واقعاً از کیفیت این محصول شگفت‌زده شدم. طراحی زیبا و دقیقی داره و جزئیاتش فوق‌العاده‌ست. قطعاً خریدش رو توصیه می‌کنم.',
    likes: 12,
    dislikes: 0,
  },
  {
    id: 2,
    author: 'زهرا احمدی',
    date: '۱ هفته پیش',
    rating: 4,
    title: 'کیفیت خوب، اما...',
    text: 'محصول خوبیه و کیفیت ساخت بالایی داره. تنها نکته منفی اینه که رنگش کمی با عکس متفاوت بود. در کل راضی هستم.',
    likes: 5,
    dislikes: 1,
  },
];

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

const ProductReviews = () => {
  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <div className={styles.summaryRating}>
          <span className={styles.averageRating}>۴.۵</span>
          <StarRating rating={4.5} />
          <span className={styles.reviewCount}>(بر اساس ۲ نظر)</span>
        </div>
        <button className={styles.writeReviewBtn}>
          <MessageSquare size={18} />
          <span>ثبت نظر</span>
        </button>
      </div>

      <div className={styles.reviewList}>
        {mockReviews.map((review) => (
          <motion.div
            key={review.id}
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
                  <span>{review.likes}</span>
                </button>
                <button>
                  <ThumbsDown size={16} />
                  <span>{review.dislikes}</span>
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
