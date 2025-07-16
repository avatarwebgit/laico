import React, { useMemo } from 'react';
import Content from '../common/Content';
import styles from './CategoryGrid.module.css';
import { motion } from 'framer-motion';
const categories = [
 {
  name: 'روتختی',
  image: 'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa',
 },
 {
  name: 'حوله',
  image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
 },
 {
  name: 'کالای خواب',
  image: 'https://images.unsplash.com/photo-1616627561839-074385245ff6',
 },
 {
  name: 'پتو و بالش',
  image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg',
 },
 {
  name: 'دکوری',
  image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6',
 },
 {
  name: 'فرش',
  image: 'https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg',
 },
 {
  name: 'مبلمان',
  image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6',
 },
 {
  name: 'روکش لحاف',
  image: 'https://images.pexels.com/photos/6353757/pexels-photo-6353757.jpeg',
 },
 {
  name: 'روبالشی',
  image: 'https://images.unsplash.com/photo-1616486338811-3d65e4971250',
 },
 {
  name: 'ملحفه',
  image: 'https://images.pexels.com/photos/6311394/pexels-photo-6311394.jpeg',
 },
 {
  name: 'لحاف',
  image: 'https://images.unsplash.com/photo-1616627561956-6a5664154f36',
 },
];



// Framer Motion Variants
const gridContainerVariants = {
 hidden: { opacity: 0 },
 show: {
  opacity: 1,
  transition: {
   staggerChildren: 0.08,
  },
 },
};

const gridItemVariants = {
 hidden: { y: 20, opacity: 0 },
 show: {
  y: 0,
  opacity: 1,
  transition: {
   duration: 0.6,
   ease: [0.16, 1, 0.3, 1],
  },
 },
 
};

const CategoryCard = ({ category }) => (
 <motion.a
  href='#'
  className={styles.card}
  aria-label={`View category: ${category.name}`}
  whileHover={{
   y: -8,
   boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
  <img src={category.image} alt={category.name} className={styles.cardImage} />
  <div className={styles.cardOverlay} />
  <div className={styles.cardContent}>
   <h3 className={styles.cardTitle}>{category.name}</h3>
  </div>
 </motion.a>
);

const CategoryGrid = () => {
 if (!categories || categories.length === 0) {
  return null;
 }

 const featuredCategories = categories.slice(0, 3);
 const standardCategories = categories.slice(3);

 return (
  <Content>
   <section className={styles.section} aria-labelledby='category-grid-title'>
    <h2 id='category-grid-title' className='sr-only'>
     Product Categories
    </h2>

    {featuredCategories.length > 0 && (
     <motion.div
      className={`${styles.grid} ${styles.featuredGrid}`}
      variants={gridContainerVariants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.2 }}>
      {featuredCategories.map(category => (
       <motion.div
        key={category.name}
        className={styles.gridItem}
        variants={gridItemVariants}>
        <CategoryCard category={category} />
       </motion.div>
      ))}
     </motion.div>
    )}

    {standardCategories.length > 0 && (
     <motion.div
      className={`${styles.grid} ${styles.standardGrid}`}
      variants={gridContainerVariants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.2 }}>
      {standardCategories.map(category => (
       <motion.div
        key={category.name}
        className={styles.gridItem}
        variants={gridItemVariants}>
        <CategoryCard category={category} />
       </motion.div>
      ))}
     </motion.div>
    )}
   </section>
  </Content>
 );
};

export default CategoryGrid;
