import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, User, Eye, Star } from "lucide-react";

import Breadcrumbs from "../components/common/Breadcrumbs";
import Content from "../components/common/Content";
import Loader from "../components/common/Loader";

import classes from "./BlogPost.module.css";
import { fetchSingleBlogRequest } from "../redux/blogs/blogActions";

const BlogPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    single: blogData,
    loading,
    error,
  } = useSelector((state) => state.blogs);

  useEffect(() => {
    // dispatch(fetchSingleBlogRequest(id));
  }, [dispatch, id]);

  const lng = "fa";

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (blogData) {
      setComments(blogData.comments || []);
    }
  }, [blogData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "شما",
        text: newComment,
        avatar: "https://i.pravatar.cc/150?img=12",
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !blogData) {
    return (
      <div className={classes.error}>
        خطا: مقاله مورد نظر یافت نشد یا در بارگذاری آن مشکلی پیش آمد.
      </div>
    );
  }

  const title = lng === "fa" ? blogData.title : blogData.title_en;
  const description =
    lng === "fa" ? blogData.description : blogData.description_en;

  return (
    <motion.div
      className={classes.pageWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className={classes.progressBar} style={{ scaleX }} />
      <motion.header
        className={classes.header}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div
          className={classes.headerImage}
          style={{ backgroundImage: `url(${blogData.image})` }}
        />
        <div className={classes.headerOverlay} />
        <Content contentClassname={classes.headerContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Breadcrumbs
              linkDataProp={[
                { pathname: "صفحه اصلی", url: "/" },
                { pathname: "اخبار و مقالات", url: "/blogs" },
                {
                  pathname: title,
                  url: `/blogs/${blogData.alias}`,
                },
              ]}
            />
            <h1 className={classes.mainTitle}>{title}</h1>
            <div className={classes.meta}>
              <div className={classes.metaItem}>
                <User size={16} />
                <span>{blogData.author.name}</span>
              </div>
              <div className={classes.metaItem}>
                <Calendar size={16} />
                <span>{blogData.date}</span>
              </div>
              <div className={classes.metaItem}>
                <Eye size={16} />
                <span>{blogData.views.toLocaleString("fa-IR")} بازدید</span>
              </div>
              <div className={classes.metaItem}>
                <Star size={16} className={classes.starIcon} />
                <span>{blogData.rating.toLocaleString("fa-IR")}</span>
              </div>
            </div>
          </motion.div>
        </Content>
      </motion.header>

      <Content sectionClassname={classes.articleContainer}>
        <motion.article
          className={classes.articleBody}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </Content>
      <Content sectionClassname={classes.commentsContainer}>
        <h2 className={classes.sectionTitle}>نظرات ({comments.length})</h2>
        <form className={classes.commentForm} onSubmit={handleCommentSubmit}>
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="آواتار شما"
            className={classes.commentAvatar}
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className={classes.commentInput}
            rows="3"
          />
          <button
            type="submit"
            className={classes.commentSubmit}
            disabled={!newComment.trim()}
          >
            ارسال
          </button>
        </form>
        <div className={classes.commentsList}>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              className={classes.comment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={comment.avatar}
                alt={comment.author}
                className={classes.commentAvatar}
              />
              <div className={classes.commentContent}>
                <p className={classes.commentAuthor}>{comment.author}</p>
                <p className={classes.commentText}>{comment.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Content>
    </motion.div>
  );
};

export default BlogPost;
