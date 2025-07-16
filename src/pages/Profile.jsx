import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import Breadcrumbs from '../components/common/Breadcrumbs';
import Card from '../components/common/Card';
import Content from '../components/common/Content';
import Sidebar from '../components/profile/Sidebar';

import Addresses from '../components/profile/Addresses';
import Dashboard from '../components/profile/Dashboard';
import Favorites from '../components/profile/Favorites';
import Orders from '../components/profile/Orders';
import Tickets from '../components/profile/Ticket';

import Wallet from '../components/profile/Wallet';
import classes from './Profile.module.css';

const Profile = () => {
 const { t } = useTranslation();
 const location = useLocation();
 const [activeComponent, setActiveComponent] = useState(null);

 const navigate = useNavigate()

 useEffect(() => {
  const pathSegments = location.pathname.split('/');
  const slug = pathSegments[pathSegments.length - 1]; 
  setActiveComponent(slug || 'dashboard'); 
 }, [location]);

 const renderProfileContent = () => {
  switch (activeComponent) {
   case '':
   case 'dashboard':
    return <Dashboard />;
   case 'orders':
    return <Orders />;
   case 'tickets':
    return <Tickets />;
   case 'wishlist':
    return <Favorites />;
   case 'addresses':
    return <Addresses />;
   case 'wallet':
    return <Wallet />;
   default:
    return navigate('/profile/dashboard');
  }
 };

  return (
    <main className={classes['profile-main'] }>
   <Content contentClassname={classes.content}>
    <Breadcrumbs
     linkDataProp={[
      { pathname: t('home'), url: '/' },
      { pathname: t('profile.profile'), url: '/profile' },
     ]}
    />
    <div className={classes['bottom-wrapper']}>
     <div className={classes['sidebar-wrapper']}>
      <Sidebar />
     </div>
     <div className={classes['content-wrapper']}>
      <Card>{renderProfileContent()}</Card>
     </div>
    </div>
   </Content>
  </main>
 );
};

export default Profile;
