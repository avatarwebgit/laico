import React from 'react';

import classes from './Content.module.css';
const Content = ({ children, sectionClassname, contentClassname }) => {
 return (
  <section className={`${classes.main} ${classes.sectionClassname}`}>
   <div className={`${classes.content} ${classes.contentClassname}`}>
    {children}
   </div>
  </section>
 );
};

export default Content;
