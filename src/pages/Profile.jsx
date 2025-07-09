// import { useTranslation } from 'react-i18next';
// import { useEffect, useState } from 'react';

// import Breadcrumbs from '../components/common/Breadcrumbs';
// import Content from '../components/common/Content';
// import Sidebar from '../components/profile/Sidebar';

// import classes from './Profile.module.css';
// import { useLocation } from 'react-router-dom';
// const Profile = () => {
//  const [slug, setSlug] = useState('');

//  const { t } = useTranslation();

//  const location = useLocation();

//  useEffect(() => {
//   if (location) {
//    const slug = location.pathname.split('/').at(1);
//    setSlug(slug);
//   }
//  }, [location]);

//  return (
//   <main>
//    <Content contentClassname={classes.content}>
//     <Breadcrumbs
//      linkDataProp={[
//       { pathname: t('home'), url: ' ' },
//       { pathname: t('profile.profile'), url: 'profile' },
//      ]}
//     />
//     <div className={classes['sidebar-wrapper']}>
//      <Sidebar />
//     </div>
//     <div className={classes['content-wrapper']}></div>
//    </Content>
//   </main>
//  );
// };

// export default Profile;

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Content from '../components/common/Content';

const getInitials = name => {
 const names = name.split(' ');
 if (names.length > 1) {
  return `${names[0][0]}${names[1][0]}`.toUpperCase();
 }
 return names[0].substring(0, 2).toUpperCase();
};

const PlayIcon = () => (
 <svg
  width='24'
  height='24'
  viewBox='0 0 24 24'
  fill='none'
  xmlns='http://www.w3.org/2000/svg'>
  <path d='M8 5V19L19 12L8 5Z' fill='white' />
 </svg>
);
const StatIcon = () => (
 <svg
  width='20'
  height='20'
  viewBox='0 0 24 24'
  fill='currentColor'
  xmlns='http://www.w3.org/2000/svg'>
  <path d='M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z'></path>
 </svg>
);
const FilterIcon = () => (
 <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
  <path d='M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z'></path>
 </svg>
);
const DropdownIcon = () => (
 <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
  <path d='M7 10l5 5 5-5z'></path>
 </svg>
);

const MenuIcon = () => (
 <svg
  className='w-6 h-6'
  fill='none'
  stroke='currentColor'
  viewBox='0 0 24 24'
  xmlns='http://www.w3.org/2000/svg'>
  <path
   strokeLinecap='round'
   strokeLinejoin='round'
   strokeWidth='2'
   d='M4 6h16M4 12h16m-7 6h7'></path>
 </svg>
);
const CloseIcon = () => (
 <svg
  className='w-6 h-6'
  fill='none'
  stroke='currentColor'
  viewBox='0 0 24 24'
  xmlns='http://www.w3.org/2000/svg'>
  <path
   strokeLinecap='round'
   strokeLinejoin='round'
   strokeWidth='2'
   d='M6 18L18 6M6 6l12 12'></path>
 </svg>
);
const DashboardIcon = () => (
 <svg
  className='w-6 h-6'
  fill='none'
  stroke='currentColor'
  viewBox='0 0 24 24'
  xmlns='http://www.w3.org/2000/svg'>
  <path
   strokeLinecap='round'
   strokeLinejoin='round'
   strokeWidth='2'
   d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'></path>
 </svg>
);
const WalletIcon = () => (
 <svg
  className='w-6 h-6'
  fill='none'
  stroke='currentColor'
  viewBox='0 0 24 24'
  xmlns='http://www.w3.org/2000/svg'>
  <path
   strokeLinecap='round'
   strokeLinejoin='round'
   strokeWidth='2'
   d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'></path>
 </svg>
);
const OrdersIcon = () => (
 <svg
  className='w-6 h-6'
  fill='none'
  stroke='currentColor'
  viewBox='0 0 24 24'
  xmlns='http://www.w3.org/2000/svg'>
  <path
   strokeLinecap='round'
   strokeLinejoin='round'
   strokeWidth='2'
   d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'></path>
 </svg>
);
const TicketIcon = () => (
 <svg
  className='w-6 h-6'
  fill='none'
  stroke='currentColor'
  viewBox='0 0 24 24'
  xmlns='http://www.w3.org/2000/svg'>
  <path
   strokeLinecap='round'
   strokeLinejoin='round'
   strokeWidth='2'
   d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z'></path>
 </svg>
);
const LogoutIcon = () => (
 <svg
  className='w-6 h-6'
  fill='none'
  stroke='currentColor'
  viewBox='0 0 24 24'
  xmlns='http://www.w3.org/2000/svg'>
  <path
   strokeLinecap='round'
   strokeLinejoin='round'
   strokeWidth='2'
   d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'></path>
 </svg>
);

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
 const menuItems = [
  { icon: <DashboardIcon />, name: 'داشبورد' },
  { icon: <WalletIcon />, name: 'کیف پول' },
  { icon: <OrdersIcon />, name: 'سفارشات' },
  { icon: <TicketIcon />, name: 'تیکت‌ها' },
 ];
 const activeItem = 'داشبورد';

 return (
  <>
   <div
    className={`relative inset-0 bg-black/60 z-30 md:hidden transition-opacity duration-300 ${
     isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    onClick={() => setSidebarOpen(false)}
    aria-hidden='true'></div>
   <aside
    className={` top-0 right-0 h-full bg-[#1a1b2f] text-white w-64 p-4 flex flex-col z-40 transform transition-transform duration-500 ease-in-out ${
     isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
    } md:translate-x-0`}>
    <div className='flex items-center justify-between md:justify-center p-2 mb-8'>
     <div className='flex items-center gap-2'>
      <div className='p-3 bg-indigo-600 rounded-lg'>
       <PlayIcon />
      </div>
      <span className='text-xl font-bold'>نام برند</span>
     </div>
     <button
      onClick={() => setSidebarOpen(false)}
      className='md:hidden text-gray-400 hover:text-white'
      aria-label='بستن منو'>
      <CloseIcon />
     </button>
    </div>

    <nav className='flex-grow'>
     <ul>
      {menuItems.map(item => (
       <li key={item.name} className='relative'>
        <a
         href='#'
         className={`flex items-center gap-4 px-4 py-3 my-1 rounded-lg transition-all duration-300 transform hover:scale-105 ${
          activeItem === item.name
           ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
           : 'hover:bg-[#2c2d42] text-gray-400 hover:text-white'
         }`}>
         {activeItem === item.name && (
          <span className='absolute right-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-full animate-pulse'></span>
         )}
         {item.icon}
         <span>{item.name}</span>
        </a>
       </li>
      ))}
     </ul>
    </nav>

    <div className='mt-auto'>
     <a
      href='#'
      className='flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2c2d42] hover:text-white transition-all duration-300 transform hover:scale-105'>
      <LogoutIcon />
      <span>خروج</span>
     </a>
    </div>
   </aside>
  </>
 );
};

const TopBar = ({ setSidebarOpen }) => (
 <header className='flex items-center justify-between w-full mb-6'>
  <div className='flex items-center'>
   <button
    onClick={() => setSidebarOpen(true)}
    className='md:hidden text-white me-4 p-2 rounded-md hover:bg-[#2c2d42] transition-colors'
    aria-label='باز کردن منو'>
    <MenuIcon />
   </button>
   <div className='text-gray-400 text-xl hidden md:flex items-center'>
    <span>وابستگان</span>
    <svg className='w-5 h-5 mx-2' fill='currentColor' viewBox='0 0 20 20'>
     <path
      fillRule='evenodd'
      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
      clipRule='evenodd'></path>
    </svg>
    <span className='text-white'>دیویس بوتوش</span>
   </div>
  </div>
  <div className='flex items-center space-x-4 space-x-reverse'>
   <div className='relative'>
    <input
     type='text'
     placeholder='جستجو...'
     className='bg-[#1a1b2f] text-white placeholder-gray-400 rounded-lg py-2 px-4 pe-10 w-32 sm:w-40 md:w-auto transition-all duration-300 focus:ring-2 focus:ring-indigo-500'
    />
    <svg
     className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400'
     fill='none'
     viewBox='0 0 24 24'
     stroke='currentColor'>
     <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
    </svg>
   </div>
   <button className='hidden md:inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-transform duration-300 hover:scale-105'>
    + دعوت از وابسته
   </button>
   <img
    src='https://i.pravatar.cc/40?u=davisbotosh'
    alt='User Avatar'
    className='w-10 h-10 rounded-full border-2 border-indigo-500 transition-transform duration-300 hover:scale-110'
   />
  </div>
 </header>
);

const AffiliateInfo = () => (
 <div className='flex flex-col lg:flex-row items-stretch justify-between mb-6 gap-6'>
  <div className='w-full lg:w-2/3 bg-[#1a1b2f] rounded-xl p-6 flex items-start space-x-6 space-x-reverse relative overflow-hidden'>
   <div
    className='absolute top-0 left-0 w-48 h-full bg-no-repeat bg-left opacity-10'
    style={{
     backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M83 132c-2.5 0-4.9.4-7.2 1.2A50.2 50.2 0 0 1 1 83c0-2.5.4-4.9 1.2-7.2A50.2 50.2 0 0 1 52.4 1c2.3.8 4.7 1.2 7.2 1.2A50.2 50.2 0 0 1 117 52.4c.8 2.3 1.2 4.7 1.2 7.2A50.2 50.2 0 0 1 68 117c-2.3.8-4.7 1.2-7.2 1.2zM150 150c-2.5 0-4.9.4-7.2 1.2A50.2 50.2 0 0 1 83 199.2c-2.5 0-4.9-.4-7.2-1.2A50.2 50.2 0 0 1 23.4 150c2.3-.8 4.7-1.2 7.2-1.2a50.2 50.2 0 0 1 57.6-57.6c2.3-.8 4.7-1.2 7.2-1.2 27.6 0 50 22.4 50 50z'/%3E%3C/g%3E%3C/svg%3E")`,
    }}></div>
   <img
    src='https://i.pravatar.cc/80?u=juanita'
    alt='Juanita Flores'
    className='w-20 h-20 rounded-full border-4 border-[#2c2d42] flex-shrink-0'
   />
   <div className='flex-grow'>
    <h2 className='text-2xl font-bold text-white'>فلورس، جوانیتا</h2>
    <p className='text-gray-400 mb-3'>flores@juanitagmail.com</p>
    <div className='flex items-center space-x-2 space-x-reverse text-sm'>
     <span className='bg-green-500 bg-opacity-20 text-green-300 px-3 py-1 rounded-full'>
      درآمد: ۳۲۵.۶$
     </span>
     <span className='bg-gray-700 bg-opacity-50 text-gray-300 px-3 py-1 rounded-full'>
      روش پرداخت: پی‌پال
     </span>
    </div>
   </div>
  </div>
  <div className='w-full lg:w-1/3 flex flex-col space-y-4'>
   <div className='bg-[#1a1b2f] rounded-xl p-4 flex items-center justify-between text-gray-300 hover:bg-[#2c2d42] cursor-pointer h-full transition-colors duration-300'>
    <span>www.faxquote.com</span>
    <svg
     xmlns='http://www.w3.org/2000/svg'
     className='h-5 w-5'
     fill='none'
     viewBox='0 0 24 24'
     stroke='currentColor'>
     <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'></path>
    </svg>
   </div>
   <div className='bg-[#1a1b2f] rounded-xl p-4 flex items-center justify-between text-red-400 hover:bg-[#2c2d42] cursor-pointer h-full transition-colors duration-300'>
    <span>حذف وابستگان</span>
    <svg
     xmlns='http://www.w3.org/2000/svg'
     className='h-5 w-5'
     fill='none'
     viewBox='0 0 24 24'
     stroke='currentColor'>
     <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'></path>
    </svg>
   </div>
  </div>
 </div>
);

const StatCard = ({ icon, title, amount, month, progress, avatars }) => (
 <div className='bg-[#1a1b2f] p-5 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1'>
  <div className='flex items-center text-gray-400 mb-4'>
   {icon}
   <span className='mr-2 text-sm'>{title}</span>
  </div>
  <div className='text-white text-3xl font-bold mb-2'>{amount}</div>
  <p className='text-gray-500 text-sm mb-4'>{month}</p>
  <div className='w-full bg-[#2c2d42] rounded-full h-2 mb-4'>
   <div
    className='bg-green-500 h-2 rounded-full'
    style={{ width: `${progress}%` }}></div>
  </div>
  <div className='flex items-center'>
   {avatars.map((avatar, index) => (
    <img
     key={index}
     src={avatar.src}
     alt={avatar.alt}
     className='w-8 h-8 rounded-full border-2 border-[#1a1b2f] -mr-2'
    />
   ))}
   <div className='w-8 h-8 rounded-full bg-[#2c2d42] flex items-center justify-center text-white text-sm -mr-2'>
    +
   </div>
  </div>
 </div>
);

const PaymentsTable = () => {
 const payments = [
  {
   name: 'گوستاو هرویتز',
   email: 'gustavoherwitz@gmail.com',
   referredBy: 'امرسون لوبین',
   method: 'پی‌پال',
   payment: '۸۰.۵۰$',
   status: 'تکمیل شده',
  },
  {
   name: 'لیندزی استنتون',
   email: 'lindseystanton@gmail.com',
   referredBy: 'آنجل اشلفر',
   method: 'استرایپ',
   payment: '۸۵.۴۵$',
   status: 'در انتظار',
  },
  {
   name: 'گوستاو هرویتز',
   email: 'gustavoherwitz@gmail.com',
   referredBy: 'امرسون لوبین',
   method: 'پی‌پال',
   payment: '۸۰.۵۰$',
   status: 'تکمیل شده',
  },
  {
   name: 'هرویتز گوستاو',
   email: 'herwitzgustavo@gmail.com',
   referredBy: 'لوبین امرسون',
   method: 'پایونیر',
   payment: '۷۰.۵۰$',
   status: 'تکمیل شده',
  },
 ];

 const getStatusChip = status => {
  switch (status) {
   case 'تکمیل شده':
    return 'bg-green-500/20 text-green-300';
   case 'در انتظار':
    return 'bg-yellow-500/20 text-yellow-300';
   default:
    return 'bg-gray-500/20 text-gray-300';
  }
 };

 return (
  <div className='bg-[#1a1b2f] p-6 rounded-2xl'>
   <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
    <div>
     <h3 className='text-xl text-white font-bold'>پرداخت‌ها</h3>
     <p className='text-gray-400 text-sm'>شما در این دوره ۲۰ فروش داشته‌اید</p>
    </div>
    <div className='flex items-center space-x-2 space-x-reverse mt-4 md:mt-0 flex-wrap justify-center gap-2'>
     <button className='flex items-center bg-[#2c2d42] px-3 py-2 rounded-lg text-sm text-gray-300 transition-colors hover:bg-[#3c3d52]'>
      <FilterIcon />
      <span className='mr-2'>مرتب‌سازی</span>
      <DropdownIcon />
     </button>
     <button className='flex items-center bg-[#2c2d42] px-3 py-2 rounded-lg text-sm text-gray-300 transition-colors hover:bg-[#3c3d52]'>
      <FilterIcon />
      <span className='mr-2'>فیلتر</span>
     </button>
     <button className='flex items-center bg-[#2c2d42] px-3 py-2 rounded-lg text-sm text-gray-300 transition-colors hover:bg-[#3c3d52]'>
      <span className='mr-2'>ماهانه</span>
      <DropdownIcon />
     </button>
     <div className='relative hidden md:block'>
      <input
       type='text'
       placeholder='جستجو...'
       className='bg-[#2c2d42] text-white placeholder-gray-400 rounded-lg py-2 px-4 pe-10 w-32'
      />
      <svg
       className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400'
       fill='none'
       viewBox='0 0 24 24'
       stroke='currentColor'>
       <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
      </svg>
     </div>
    </div>
   </div>
   <div className='overflow-x-auto'>
    <table className='w-full text-sm text-right text-gray-400 min-w-[700px]'>
     <thead className='border-b border-gray-700'>
      <tr>
       <th scope='col' className='px-6 py-3 font-normal'>
        نام وابسته
       </th>
       <th scope='col' className='px-6 py-3 font-normal'>
        ایمیل پرداخت
       </th>
       <th scope='col' className='px-6 py-3 font-normal'>
        معرفی شده توسط
       </th>
       <th scope='col' className='px-6 py-3 font-normal'>
        روش
       </th>
       <th scope='col' className='px-6 py-3 font-normal'>
        پرداخت
       </th>
       <th scope='col' className='px-6 py-3 font-normal'>
        وضعیت
       </th>
      </tr>
     </thead>
     <tbody>
      {payments.map((payment, index) => (
       <tr
        key={index}
        className='border-b border-gray-800 hover:bg-[#2c2d42]/50'>
        <td className='px-6 py-4 font-medium text-white whitespace-nowrap'>
         {payment.name}
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>{payment.email}</td>
        <td className='px-6 py-4 whitespace-nowrap'>
         <div className='flex items-center'>
          <div className='w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-800 font-bold ml-3 flex-shrink-0'>
           {getInitials(payment.referredBy)}
          </div>
          <span>{payment.referredBy}</span>
         </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>{payment.method}</td>
        <td className='px-6 py-4 text-white whitespace-nowrap'>
         {payment.payment}
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
         <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusChip(
           payment.status,
          )}`}>
          {payment.status}
         </span>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

const Profile = () => {
 const [isSidebarOpen, setSidebarOpen] = useState(false);
 const stats = [
  {
   title: 'مجموع پرداخت شده',
   amount: '۱۴۰.۰$',
   month: 'ژانویه',
   progress: 65,
   avatars: [
    { src: 'https://i.pravatar.cc/32?u=a' },
    { src: 'https://i.pravatar.cc/32?u=b' },
   ],
  },
  {
   title: 'مجموع پرداخت نشده',
   amount: '۳۴۱.۰$',
   month: 'فوریه',
   progress: 40,
   avatars: [
    { src: 'https://i.pravatar.cc/32?u=c' },
    { src: 'https://i.pravatar.cc/32?u=d' },
   ],
  },
  {
   title: 'درآمد ناخالص',
   amount: '۸۹,۲۳۱$',
   month: 'مارس',
   progress: 80,
   avatars: [
    { src: 'https://i.pravatar.cc/32?u=e' },
    { src: 'https://i.pravatar.cc/32?u=f' },
    { src: 'https://i.pravatar.cc/32?u=g' },
    { src: 'https://i.pravatar.cc/32?u=h' },
   ],
  },
  {
   title: 'درآمد خالص',
   amount: '۳۲۵.۰۰$',
   month: 'مارس',
   progress: 55,
   avatars: [
    { src: 'https://i.pravatar.cc/32?u=i' },
    { src: 'https://i.pravatar.cc/32?u=j' },
   ],
  },
 ];

 return (
  <Content>
   <div className='min-h-screen text-white flex'>
    <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

    <div className='flex-1 flex flex-col w-full'>
     <div className='p-4 sm:p-6 lg:p-8 w-full max-w-screen-2xl mx-auto'>
      <TopBar setSidebarOpen={setSidebarOpen} />

      <main>
       <div className='flex md:hidden items-center text-gray-400 mb-6 text-lg'>
        <span>وابستگان</span>
        <svg className='w-5 h-5 mx-2' fill='currentColor' viewBox='0 0 20 20'>
         <path
          fillRule='evenodd'
          d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
          clipRule='evenodd'></path>
        </svg>
        <span className='text-white'>دیویس بوتوش</span>
       </div>

       <AffiliateInfo />

       <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6'>
        {stats.map((stat, index) => (
         <StatCard
          key={index}
          icon={<StatIcon />}
          title={stat.title}
          amount={stat.amount}
          month={stat.month}
          progress={stat.progress}
          avatars={stat.avatars}
         />
        ))}
       </div>

       <PaymentsTable />
      </main>
     </div>
    </div>
   </div>
  </Content>
 );
};

export default Profile;
