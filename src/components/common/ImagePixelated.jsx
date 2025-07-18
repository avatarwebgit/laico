import { motion } from 'framer-motion';
import { memo, useRef, useEffect, useState } from 'react';
import styles from './ImagePixelated.module.css';

const ImagePixelated = memo(
 ({
  src,
  alt,
  className = '',
  imageClassName = '',
  columns = 10,
  animationDelay = 0.04,
  blockSize = 'auto',
  loadingBg = '#f0f0f0',
  isActive = true,
 }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [calculatedColumns, setCalculatedColumns] = useState(columns);
  const [calculatedRows, setCalculatedRows] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
   setImageLoaded(true);
   updateDimensions();
  };

  const updateDimensions = () => {
   if (containerRef.current) {
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });

    if (blockSize === 'auto') {
     const newColumns = Math.max(5, Math.floor(width / 30));
     setCalculatedColumns(newColumns);
     const newRows = Math.max(5, Math.floor(height / 30));
     setCalculatedRows(newRows);
    } else {
     const blockSizePx = parseInt(blockSize);
     const newColumns = Math.max(5, Math.floor(width / blockSizePx));
     const newRows = Math.max(5, Math.floor(height / blockSizePx));
     setCalculatedColumns(newColumns);
     setCalculatedRows(newRows);
    }
   }
  };

  useEffect(() => {
   updateDimensions();

   const resizeObserver = new ResizeObserver(updateDimensions);
   if (containerRef.current) {
    resizeObserver.observe(containerRef.current);
   }

   return () => resizeObserver.disconnect();
  }, [blockSize, columns]);

  useEffect(() => {
   if (imgRef.current?.complete) handleImageLoad();
  }, []);

  const totalBlocks = calculatedColumns * calculatedRows;

  const blockVariants = {
   hidden: { opacity: 1, transition: { duration: 0.3 } },
   visible: i => ({
    opacity: 0,
    transition: {
     delay: imageLoaded
      ? Math.floor(i / calculatedColumns) * animationDelay
      : 0,
     duration: 0.4,
    },
   }),
  };

  return (
   <div
    ref={containerRef}
    className={`${styles.wrapper} ${className}`}
    style={
     blockSize !== 'auto'
      ? {
         '--block-size': `${blockSize}px`,
         '--loading-bg': loadingBg,
        }
      : { '--loading-bg': loadingBg }
    }>
    <img
     ref={imgRef}
     src={src}
     alt={alt}
     className={`${styles.image} ${imageClassName}`}
     loading='lazy'
     onLoad={handleImageLoad}
     style={{ opacity: imageLoaded ? 1 : 0 }}
    />

    {!imageLoaded && <div className={styles.loadingPlaceholder} />}

    {dimensions.width > 0 && dimensions.height > 0 && imageLoaded && (
     <div
      className={
       blockSize === 'auto' ? styles.overlayGrid : styles.fixedBlockSize
      }
      style={{
       gridTemplateColumns: `repeat(${calculatedColumns}, 1fr)`,
       gridTemplateRows: `repeat(${calculatedRows}, 1fr)`,
      }}>
      {Array.from({ length: totalBlocks }).map((_, index) => (
       <motion.div
        key={index}
        className={styles.block}
        custom={index}
        initial='hidden'
        animate={imageLoaded && isActive ? 'visible' : 'hidden'}
        variants={blockVariants}
       />
      ))}
     </div>
    )}
   </div>
  );
 },
);

export default ImagePixelated;
