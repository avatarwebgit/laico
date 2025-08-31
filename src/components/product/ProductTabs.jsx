
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styles from './ProductTabs.module.css';

const ProductTabs = ({ tabs }) => {
 const [activeTab, setActiveTab] = useState(0);

 if (!tabs || tabs.length === 0) {
  return null;
 }

 return (
  <div className={styles.tabsContainer}>
   <div className={styles.tabHeaders}>
    {tabs.map((tab, index) => (
     <button
      key={index}
      className={`${styles.tabHeader} ${activeTab === index ? styles.active : ''}`}
      onClick={() => setActiveTab(index)}>
      {tab.title}
      {activeTab === index && (
       <motion.div className={styles.activeLine} layoutId='activeTabLine' />
      )}
     </button>
    ))}
   </div>
   <div className={styles.tabContentWrapper}>
    <AnimatePresence mode='wait'>
     <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}>
      {tabs[activeTab].content}
     </motion.div>
    </AnimatePresence>
   </div>
  </div>
 );
};

export default ProductTabs;
