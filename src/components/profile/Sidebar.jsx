import React from 'react';
import classes from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';

const profileMenuItems = [
 {
  id: 'account',
  title: 'حساب کاربری',
  url: '/profile',
 },
 {
  id: 'orders',
  title: 'سفارش های ثبت شده',
  url: '/profile/orders',
 },
 {
  id: 'cart',
  title: 'سبد خرید',
  url: '/profile/cart',
 },
 {
  id: 'wishlist',
  title: 'محصولات مورد علاقه',
  url: '/profile/wishlist',
 },
 {
  id: 'addresses',
  title: 'آدرس های من',
  url: '/profile/addresses',
 },
];

const Sidebar = () => {
 const navigate = useNavigate();
 return (
  <aside className={classes['side-bar']}>
   <ul>
    {profileMenuItems.map(menu => {
     return (
      <li
       onClick={() => {
        navigate(`${menu.url}`);
       }}>
       {menu.title}
      </li>
     );
    })}
    <li>خروج</li>
   </ul>
  </aside>
 );
};

export default Sidebar;
