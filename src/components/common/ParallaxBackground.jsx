import React, { useState, useEffect, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundContext } from '../../context/BackgroundContent';
import styles from './ParallaxBackground.module.css';

const ParallaxBackground = () => {
 const { backgroundImage } = useContext(BackgroundContext);
 const [transform, setTransform] = useState('');

 useEffect(() => {
  const handleMouseMove = e => {
   const { clientX, clientY } = e;
   const { innerWidth, innerHeight } = window;

   // --- MOUSE POSITIONING & PARALLAX TRANSLATION ---
   // moveX and moveY will be between -1 and 1 (from center to edge)
   const moveX = (clientX - innerWidth / 2) / (innerWidth / 2);
   const moveY = (clientY - innerHeight / 2) / (innerHeight / 2);

   const parallaxFactor = 5;
   const finalX = moveX * parallaxFactor;
   const finalY = moveY * parallaxFactor;

   // --- 3D ROTATION ---
   const rotateY = moveX * 2;
   const rotateX = -moveY * 2;

   // --- DYNAMIC SCALING ---
   // Calculate the normalized distance from the center (0 at center, 1 at edge)
   const normalizedDistX = Math.abs(moveX);
   const normalizedDistY = Math.abs(moveY);
   // Use the largest of the two distances to determine how far from center we are
   const distanceFromCenter = Math.max(normalizedDistX, normalizedDistY);

   // Define min and max scales for the zoom effect
   const maxScale = 1.05; // Zoomed IN at the center of the screen
   const minScale = 1.00; // Zoomed OUT at the edges of the screen

   // Interpolate scale based on distance from center.
   // When distanceFromCenter is 0 (center), scale is maxScale.
   // When distanceFromCenter is 1 (edge), scale is minScale.
   const scale = maxScale - distanceFromCenter * (maxScale - minScale);

   // --- COMBINE TRANSFORMS ---
   setTransform(
    `perspective(1200px) scale(${scale}) translate(${finalX}px, ${finalY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
   );
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
   window.removeEventListener('mousemove', handleMouseMove);
  };
 }, []);

 return (
  <div className={styles.container}>
   <AnimatePresence>
    {backgroundImage && (
     <motion.div
      key={backgroundImage}
      className={styles.backgroundImage}
      style={{
       backgroundImage: `url(${backgroundImage})`,
       transform: transform,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
     />
    )}
   </AnimatePresence>
  </div>
 );
};

export default ParallaxBackground;
