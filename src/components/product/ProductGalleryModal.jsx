import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ProductGalleryModal.module.css";

const ProductGalleryModal = ({ images, isOpen, onClose, initialSlide = 0 }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const modalRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // This effect runs to set up responsive behavior when the modal is opened.
  useEffect(() => {
    if (isOpen) {
      const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
      checkDesktop(); // Initial check
      window.addEventListener("resize", checkDesktop);
      return () => window.removeEventListener("resize", checkDesktop);
    }
  }, [isOpen]);

  // This effect handles the 'Escape' key to close the modal.
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleFullscreenToggle = () => {
    const elem = modalRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Use a key to force Swiper to re-initialize when its direction changes.
  const thumbSwiperKey = isDesktop ? "vertical" : "horizontal";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className={styles.modalContent}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <span className={styles.counter}>
                {activeIndex + 1} / {images.length}
              </span>
              <div className={styles.actions}>
                <button
                  className={styles.actionButton}
                  onClick={handleFullscreenToggle}
                  title="تمام صفحه"
                >
                  <Expand size={20} />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={onClose}
                  title="بستن"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div
              className={`${styles.galleryLayout} ${
                isDesktop ? styles.desktop : ""
              }`}
            >
              <Swiper
                modules={[Navigation, Zoom, Thumbs]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                zoom={true}
                initialSlide={initialSlide}
                className={styles.swiperContainer}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              >
                {images.map((src, index) => (
                  <SwiperSlide
                    key={`main-${index}`}
                    className={styles.swiperSlide}
                  >
                    <div className="swiper-zoom-container">
                      <img src={src} alt={`Product image ${index + 1}`} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                key={thumbSwiperKey}
                onSwiper={setThumbsSwiper}
                direction={isDesktop ? "vertical" : "horizontal"}
                spaceBetween={10}
                slidesPerView={"auto"}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className={styles.thumbsContainer}
              >
                {images.map((src, index) => (
                  <SwiperSlide
                    key={`thumb-${index}`}
                    className={styles.thumbSlide}
                  >
                    <img src={src} alt={`Thumbnail ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductGalleryModal;
