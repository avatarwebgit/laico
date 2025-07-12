import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import Breadcrumbs from '../components/common/Breadcrumbs';
import Content from '../components/common/Content';
import Sidebar from '../components/profile/Sidebar';

import classes from './Profile.module.css';
import { useLocation } from 'react-router-dom';
const Profile = () => {
 const [slug, setSlug] = useState('');

 const { t } = useTranslation();

 const location = useLocation();

 useEffect(() => {
  if (location) {
   const slug = location.pathname.split('/').at(1);
   setSlug(slug);
  }
 }, [location]);

 return (
  <main>
   <Content contentClassname={classes.content}>
    <Breadcrumbs
     linkDataProp={[
      { pathname: t('home'), url: ' ' },
      { pathname: t('profile.profile'), url: 'profile' },
     ]}
    />
    <div className={classes['sidebar-wrapper']}>
     <Sidebar />
    </div>
    <div className={classes['content-wrapper']}></div>
   </Content>
  </main>
 );
};

export default Profile;

