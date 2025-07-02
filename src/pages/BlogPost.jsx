import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSingleArticles } from '../services/api';

import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/common/Breadcrumbs';

import { useParams } from 'react-router-dom';
import Content from '../components/common/Content';
import classes from './BlogPost.module.css';
const BlogPost = () => {
 const [blogData, setblogData] = useState(null);

 const lng = 'fa';

 const { t } = useTranslation();
 const { id } = useParams();

 const getArticle = async () => {
  const serverRes = await getSingleArticles(id);
  setblogData(serverRes.result.data.article);
 };

 useEffect(() => {
  getArticle();
 }, [id]);

 return (
  <section className={classes.home}>
   {blogData && (
    <div dir={`${lng === 'fa' ? 'rtl' : 'ltr'}`}>
     <Content>
      <Breadcrumbs
       linkDataProp={[
        { pathname: 'صفحه اصلی', url: ' ' },
        { pathname: 'اخبار و مقالات', url: 'blog' },
        { pathname: id, url: 'blog' },
       ]}
      />
      <div className={classes.top_wrapper}>
       <div className={classes.img_wrapper}>
        <img src={blogData.image} alt={blogData.alt} />
       </div>
       <div className={classes.close_caption}>
        <h2>{lng === 'fa' ? blogData.title : blogData.title_en}</h2>
        <p>
         {lng === 'fa'
          ? blogData.shortDescription
          : blogData.shortDescription_en}
        </p>
       </div>
      </div>

      <div
       className={classes.text}
       style={{ textAlign: lng === 'fa' ? 'right' : 'left' }}
       dangerouslySetInnerHTML={{
        __html: lng === 'fa' ? blogData.description : blogData.description_en,
       }}></div>
     </Content>
    </div>
   )}
  </section>
 );
};

export default BlogPost;
