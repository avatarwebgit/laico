import { useTranslation } from 'react-i18next';

import { Sort } from '@mui/icons-material';

import CategoryProductBox from '../components/category/CategoryProductBox';
import DesktopFilters from '../components/category/DesktopFilters';
import MobileFilters from '../components/category/MobileFilters';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Content from '../components/common/Content';

import classes from './Category.module.css';
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
         <div>مرتب سازی:</div>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='most-relevant' hidden />
          <div>مرتبط‌ترین</div>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='most-viewed' hidden />
          <div>پربازدیدترین</div>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='newest' hidden />
          <div>جدیدترین</div>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='best-selling' hidden />
          <div>پرفروش‌ترین‌</div>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='cheapest' hidden />
          <div>ارزان‌ترین</div>
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
          <div>گران‌ترین</div>
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
          <div>سریع‌ترین ارسال</div>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='buyers-choice' hidden />
          <div>پیشنهاد خریداران</div>
         </label>
        </li>
        <li>
         <label>
          <input type='radio' name='sort-option' value='featured' hidden />
          <div>منتخب</div>
         </label>
        </li>
       </ul>
      </div>
      <div className={classes['mobile-filter-wrapper']}>
       <MobileFilters />
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
