import { useTranslation } from 'react-i18next';

import Breadcrumbs from '../components/common/Breadcrumbs';
import Content from '../components/common/Content';
import DesktopFilters from '../components/category/DesktopFilters';

import classes from './Category.module.css';
const Category = () => {
 const { t } = useTranslation();

 const lng = 'fa';
 return (
  <main className={`${classes.category} main`}>
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

     <div className={classes['product-list-wrapper']}></div>
    </div>
   </Content>
  </main>
 );
};

export default Category;
