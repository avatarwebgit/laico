import { useTranslation } from 'react-i18next';

import Breadcrumbs from '../components/common/Breadcrumbs';
import Content from '../components/common/Content';
import DesktopFilters from '../components/category/DesktopFilters';
import CategoryProductBox from '../components/category/CategoryProductBox';

import classes from './Category.module.css';
import { Sort } from '@mui/icons-material';
const Category = () => {
 const { t } = useTranslation();

 const lng = 'fa';
 return (
  <main
   className={`${classes.category} main`}
   dir={lng === 'fa' ? 'rtl' : 'ltr'}>
   <Content contentClassname={classes.content}>
    <Breadcrumbs
     linkDataProp={[
      { pathname: t('home'), url: ' ' },
      { pathname: t('categories'), url: 'category' },
      { pathname: ' دسته بندی' },
     ]}
    />
    <div className={classes['wrapper']} dir={lng === 'fa' ? 'rtl' : 'ltr'}>
     <div className={classes['filter-list-wrapper']}>
      <DesktopFilters />
     </div>

     <div className={classes['list-wrapper']}>
      <div className={classes['sort-wrapper']}>
       <ul dir='rtl'>
        <li>
          <Sort fontSize='10' />
          <span>مرتب سازی:</span>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='most-relevant' hidden />
          <span>مرتبط‌ترین</span>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='most-viewed' hidden />
          <span>پربازدیدترین</span>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='newest' hidden />
          <span>جدیدترین</span>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='best-selling' hidden />
          <span>پرفروش‌ترین‌</span>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='cheapest' hidden />
          <span>ارزان‌ترین</span>
         </label>
        </li>
        <li>
         <label>
          <input
           type='radio'
           name='sort-option'
           value='most-expensive'
           hidden
          />
          <span>گران‌ترین</span>
         </label>
        </li>
        <li>
         <label>
          <input
           type='radio'
           name='sort-option'
           value='fastest-delivery'
           hidden
          />
          <span>سریع‌ترین ارسال</span>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='buyers-choice' hidden />
          <span>پیشنهاد خریداران</span>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='featured' hidden />
          <span>منتخب</span>
         </label>
        </li>
       </ul>
      </div>
      <div className={classes['product-list-wrapper']}>
       {Array.from({ length: 10 }, (_, i) => {
        return (
         <CategoryProductBox src={'https://picsum.photos/id/237/500/500'} />
        );
       })}
      </div>
     </div>
    </div>
   </Content>
  </main>
 );
};

export default Category;
