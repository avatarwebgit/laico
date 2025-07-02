import { AnimatePresence, motion } from 'framer-motion';
import classes from './Loader.module.css';

const Loader = () => {
 return (
  <AnimatePresence>
   <motion.div
    className={classes['loader-wrapper']}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}>
    <div className={classes.loader} />
   </motion.div>
  </AnimatePresence>
 );
};

export default Loader;
