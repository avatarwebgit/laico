import Blog from '../blogs/Blog';
import Content from '../common/Content';
import Slider from '../common/Slider';

import classes from './HomeBlogs.module.css';

const breakpoints = {
 320: {
  slidesPerView: 1,
 },
 640: {
  slidesPerView: 2,
 },
 768: {
  slidesPerView: 3,
 },
 1024: {
  slidesPerView: 3,
 },
};

const items = [<Blog />, <Blog />, <Blog />];

const HomeBlogs = () => {
 return (
  <Content sectionClassname={classes.section}>
         <Slider
             title={'جدیدترین اخبار و مقالات'}
    items={items}
    breakpoints={breakpoints}
    slidesPerView={3}
    spaceBetween={70}
    navigation={false}
   />
  </Content>
 );
};

export default HomeBlogs;
