import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchBlogsRequest } from "../redux/blogs/blogActions";
import Loader from "../components/common/Loader";
import Content from "../components/common/Content";
import Blog from "../components/blogs/Blog";
import styles from "./Blogs.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const Blogs = () => {
  const dispatch = useDispatch();
  const { list: blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogsRequest());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>Error loading blogs: {error}</div>;
  }

  return (
    <Content sectionClassname={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>اخبار و مقالات</h1>
        <p className={styles.pageSubtitle}>
          آخرین اخبار، مقالات و داستان‌های شگفت‌انگیز از دنیای اطراف ما.
        </p>
      </div>
      <motion.div
        className={styles.blogsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {blogs.map((blog) => (
          <motion.div key={blog.id} variants={itemVariants}>
            <Blog blog={blog} />
          </motion.div>
        ))}
      </motion.div>
    </Content>
  );
};

export default Blogs;
