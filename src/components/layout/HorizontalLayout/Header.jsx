import { Badge, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Content from '../../common/Content';

import logo from '../../../assets/images/Logo.png';
import { ReactComponent as Basket } from '../../../assets/svgs/add_basket.svg';
import { ReactComponent as Heart } from '../../../assets/svgs/heart-svg.svg';
import { ReactComponent as Login } from '../../../assets/svgs/login.svg';
import { ReactComponent as Avatar } from '../../../assets/svgs/user.svg';

import { useNavigation } from '../../../utils/helperFucntions';

import '../../../styles/common.css';
import Search from '../../common/Search';
import classes from './Header.module.css';
import { drawerActions } from '../../../store/drawer/drawerSlice';
import { Mail, Phone } from 'lucide-react';

const listVariants = {
 hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
 visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const itemVariants = {
 hidden: { y: -10, opacity: 0 },
 visible: { y: 0, opacity: 1, transition: { ease: 'easeOut' } },
};

const megaMenuData = [
 {
  category: 'کالای دیجیتال',
  image:
   'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  items: [
   'گوشی موبایل',
   'گوشی سامسونگ',
   'گوشی شیائومی',
   'گوشی هواوی',
   'گوشی نوکیا',
   'لوازم جانبی موبایل',
   'لپ‌تاپ و الترابوک',
   'مک‌بوک',
   'لپ‌تاپ گیمینگ',
   'لپ‌تاپ ایسوس',
   'لپ‌تاپ لنوو',
   'قطعات لپ‌تاپ',
   'تبلت',
   'دوربین',
   'کنسول بازی',
   'ساعت هوشمند',
   'هدفون و اسپیکر',
   'پاوربانک',
   'تجهیزات ذخیره‌سازی',
   'هارد اکسترنال',
   'فلش مموری',
   'کارت حافظه',
   'لوازم جانبی کامپیوتر',
   'تجهیزات شبکه',
   'قطعات کامپیوتر',
   'حافظه و هارد',
   'مودم و روتر',
   'مانیتور',
   'پرینتر',
   'کیبورد و ماوس',
   'اسپیکر دسکتاپ',
  ],
 },
 {
  category: 'پوشاک مردانه',
  image:
   'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
  items: [
   'تیشرت و پولوشرت',
   'پیراهن',
   'شلوار جین',
   'شلوار کتان',
   'لباس زیر',
   'پلیور و ژاکت',
   'هودی و سویشرت',
   'کاپشن و پالتو',
   'لباس ورزشی',
   'کت و شلوار',
   'لباس راحتی',
   'کفش ورزشی',
   'کفش رسمی',
   'دمپایی',
   'بوت',
   'کفش روزمره',
   'صندل',
   'اکسسوری مردانه',
   'کمربند',
   'کیف پول',
   'عینک آفتابی',
   'ساعت مچی',
  ],
 },
 {
  category: 'پوشاک زنانه',
  image:
   'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  items: [
   'مانتو و رویه',
   'شومیز و بلوز',
   'شلوار و دامن',
   'لباس مجلسی',
   'سرهمی',
   'لباس راحتی',
   'پالتو و بارانی',
   'لباس ورزشی',
   'تاپ و تیشرت',
   'سارافون',
   'تونیک',
   'کفش پاشنه بلند',
   'صندل',
   'بوت و نیم بوت',
   'کفش روزمره',
   'کتانی',
   'اکسسوری زنانه',
   'کیف و کوله',
   'شال و روسری',
   'عینک آفتابی',
   'جواهرات',
  ],
 },
 {
  category: 'اکسسوری',
  image:
   'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  items: [
   'ساعت مچی مردانه',
   'ساعت مچی زنانه',
   'کیف پول چرم',
   'کمربند',
   'عینک آفتابی',
   'جواهرات',
   'انگشتر',
   'دستبند',
   'شال و روسری',
   'کلاه و دستکش',
   'ست هدیه',
   'کراوات و پاپیون',
   'دکمه سرآستین',
   'زیورآلات مو',
   'سنجاق سینه',
  ],
 },
 {
  category: 'آرایشی و بهداشتی',
  image:
   'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  items: [
   'لوازم آرایش صورت',
   'کرم پودر',
   'پنکک',
   'رژگونه',
   'لوازم آرایش چشم',
   'ریمل',
   'خط چشم',
   'سایه چشم',
   'لوازم آرایش لب',
   'رژ لب',
   'خط لب',
   'مراقبت پوست',
   'کرم مرطوب کننده',
   'کرم ضد چروک',
   'ماسک صورت',
   'شامپو و مراقبت مو',
   'کرم ضد آفتاب',
   'عطر و ادکلن',
   'محصولات بهداشتی',
   'اصلاح و پیرایش',
   'لوازم برقی شخصی',
   'محصولات مراقبت از ناخن',
  ],
 },
 {
  category: 'کتاب و لوازم تحریر',
  image:
   'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  items: [
   'کتاب‌های عمومی',
   'رمان و داستان',
   'کتاب‌های روانشناسی',
   'کتاب‌های تاریخی',
   'کتاب‌های درسی',
   'کتاب‌های کودک',
   'مجله',
   'لوازم نوشتاری',
   'خودکار و روان‌نویس',
   'مداد و اتود',
   'دفتر و کاغذ',
   'دفترچه یادداشت',
   'کلاسور',
   'لوازم اداری',
   'ابزار نقاشی',
   'بازی فکری',
   'هدایای فرهنگی',
   'تقویم و سررسید',
  ],
 },
 {
  category: 'ورزش و سفر',
  image:
   'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  items: [
   'لباس ورزشی مردانه',
   'لباس ورزشی زنانه',
   'تجهیزات بدن‌سازی',
   'دمبل و وزنه',
   'کش ورزشی',
   'ورزش‌های توپی',
   'توپ فوتبال',
   'توپ والیبال',
   'کوهنوردی و کمپینگ',
   'کوله پشتی',
   'چادر مسافرتی',
   'کیسه خواب',
   'کفش رانینگ',
   'کفش فوتبال',
   'چمدان و ساک',
   'لوازم سفر',
   'دوچرخه و اسکیت',
  ],
 },
 {
  category: 'اسباب بازی و کودک',
  image:
   'https://images.unsplash.com/photo-1608889825103-eb5dc5f01a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  items: [
   'اسباب بازی پسرانه',
   'اسباب بازی دخترانه',
   'لگو و ساختنی',
   'ماشین و قطار',
   'عروسک و فیگور',
   'بازی‌های فکری',
   'پازل',
   'پوشاک نوزاد و کودک',
   'لباس نوزاد',
   'لباس کودک',
   'کفش کودک',
   'بهداشت و حمام کودک',
   'تغذیه کودک',
   'کالسکه و کریر',
   'اتاق خواب کودک',
  ],
 },
 {
  category: 'خانه و آشپزخانه',
  image:
   'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  items: [
   'لوازم پخت و پز',
   'قابلمه و تابه',
   'زودپز',
   'ظروف سرو و پذیرایی',
   'قاشق و چنگال',
   'لوازم برقی آشپزخانه',
   'یخچال و فریزر',
   'اجاق گاز',
   'مایکروویو',
   'غذاساز و مخلوط کن',
   'چای‌ساز و قهوه‌ساز',
   'دکوراسیون منزل',
   'فرش و گلیم',
   'ماشین لباسشویی',
   'مبلمان و اتاق خواب',
   'سرویس خواب',
   'میز و صندلی',
   'روشنایی و نورپردازی',
   'لوستر و آباژور',
   'ابزار نظافت',
   'حمام و سرویس بهداشتی',
   'لوازم شستشو',
  ],
 },
 {
  category: 'ابزار و تجهیزات',
  image:
   'https://images.unsplash.com/photo-1581093450025-c7d5a593b7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  items: [
   'ابزار برقی',
   'دریل و پیچ‌گوشتی',
   'فرز و مینی فرز',
   'ابزار دستی',
   'آچار و انبر',
   'پیچ‌گوشتی',
   'ابزار باغبانی',
   'تجهیزات ایمنی',
   'کفش کار',
   'دستکش ایمنی',
   'عینک محافظ',
   'جعبه ابزار',
   'نردبان',
   'چسب و مواد شیمیایی',
   'تجهیزات اندازه‌گیری',
   'یراق‌آلات',
   'لوازم جانبی ابزار',
  ],
 },
 {
  category: 'خودرو و موتورسیکلت',
  image:
   'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  items: [
   'لوازم یدکی خودرو',
   'دیسک و صفحه کلاچ',
   'لنت ترمز',
   'شمع و وایر',
   'فیلترها',
   'لوازم تزئینی خودرو',
   'سیستم صوتی و تصویری',
   'روغن و مایعات',
   'لاستیک و رینگ',
   'لوازم جانبی موتورسیکلت',
   'کلاه کاسکت و لباس',
   'لوازم مصرفی موتور',
   'روغن موتور',
   'فیلتر روغن',
   'ابزار و آچار خودرو',
  ],
 },
 {
  category: 'هنر و صنایع دستی',
  image:
   'https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  items: [
   'محصولات خاتم کاری',
   'میناکاری',
   'فرش دستباف',
   'گلیم و جاجیم',
   'سفال و سرامیک',
   'ظروف سفالی',
   'سازهای سنتی',
   'تار و سه‌تار',
   'سنتور',
   'دف',
   'تابلوهای هنری',
   'نقاشی و خطاطی',
   'محصولات چوبی',
   'زیورآلات دست‌ساز',
   'مجسمه و تندیس',
  ],
 },
];

const ImagePixelated = memo(({ src, alt }) => {
 const blocks = Array.from({ length: 100 }, (_, i) => i);

 const blockVariants = {
  hidden: {
   opacity: 1,
  },
  visible: i => ({
   opacity: 0,
   transition: {
    delay: Math.floor(i / 10) * 0.04,
    duration: 0.4,
   },
  }),
 };

 return (
  <div className={classes.pixelatedImageWrapper}>
   <img src={src} alt={alt} className={classes.megaImage} loading='lazy' />
   <div className={classes.pixelatedOverlayGrid}>
    {blocks.map(blockIndex => (
     <motion.div
      key={blockIndex}
      className={classes.pixelatedBlock}
      custom={blockIndex}
      initial='hidden'
      animate='visible'
      variants={blockVariants}
     />
    ))}
   </div>
  </div>
 );
});

const Header = () => {
 const [scrollY, setScrollY] = useState(0);
 const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
 const token = useSelector(state => state.userStore.token);

 const dispatch = useDispatch();

 let height,
  width = '20px';

 const { navigateTo } = useNavigation();

 const handleGoToLogin = () => {
  navigateTo('/login', { state: {} });
 };

 useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener('load', handleScroll);
  window.addEventListener('scroll', handleScroll);

  return () => {
   window.removeEventListener('load', handleScroll);
   window.removeEventListener('scroll', handleScroll);
  };
 }, []);

 const activeCategory = megaMenuData[activeCategoryIndex];

 return (
  <div>
   <header>
    <Content sectionClassname={classes['wrapper-top']}>
     <div className={classes['top-wrapper']}>
      <div className={classes.right}>
       <p>
        شماره تماس : 09127070700
        <Phone className={classes['top-icon']} />
       </p>
       <p>
        ایمیل : test@gmail.com <Mail className={classes['top-icon']} />
       </p>
      </div>
      <div className={classes.left}>
       <Badge
        badgeContent={5}
        anchorOrigin={{
         vertical: 'top',
         horizontal: 'right',
        }}>
        <IconButton
         disableRipple={true}
         onClick={() => dispatch(drawerActions.cartOpen())}>
         <Basket className={`${classes['icon-normal']}`} />
        </IconButton>
       </Badge>
       <Badge
        badgeContent={5}
        anchorOrigin={{
         vertical: 'top',
         horizontal: 'right',
        }}>
        <IconButton
         disableRipple={true}
         onClick={() => dispatch(drawerActions.favoritesOpen())}>
         <Heart className={`${classes['icon-normal']}`} />
        </IconButton>
       </Badge>
       <IconButton
        disableRipple={true}
        onClick={() => navigateTo('/profile/dashboard')}>
        <Avatar className={`${classes['icon-normal']}`} />
       </IconButton>
       <IconButton disableRipple={true} onClick={handleGoToLogin}>
        <Login className={`${classes['icon-normal']}`} />
       </IconButton>
      </div>
     </div>
    </Content>
    <div className={classes['middle-wrapper']}>
     <a href='/'>
      <img src={logo} alt='' width={95} height={80} />
     </a>
    </div>
    <Content contentClassname={classes['bottom-wrapper']}>
     <ul className={classes['buttom-wrapper']}>
      <div>
       <li>خانه</li>
      </div>
      <div>
       <li>فروشگاه</li>
       <div className={classes['mega-paper']}>
        {/* Column 1: Categories */}
        <div className={classes.categoryColumn} dir='ltr'>
         <ul className={classes.categoryList}>
          {megaMenuData.map((item, index) => (
           <li
            key={item.category}
            className={classes.categoryItem}
            onMouseEnter={() => setActiveCategoryIndex(index)}>
            {item.category}
            {index === activeCategoryIndex && (
             <motion.div
              className={classes.activeCategoryIndicator}
              layoutId='activeCategoryIndicator'
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
             />
            )}
           </li>
          ))}
         </ul>
        </div>

        {/* Columns 2, 3, 4 & 5: Content Area (Menus + Image) */}
        <AnimatePresence mode='wait'>
         <motion.div
          key={activeCategory.category}
          className={classes.megaContentGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}>
          {/* Menu Items Area */}
          <div className={classes.menuItemsFlow}>
           <motion.ul
            className={classes.menuList}
            variants={listVariants}
            initial='hidden'
            animate='visible'>
            {activeCategory.items.map(item => (
             <motion.li
              key={item}
              className={classes.menuItem}
              variants={itemVariants}>
              {item}
             </motion.li>
            ))}
           </motion.ul>
          </div>

          {/* Image Area */}
          <div className={classes.megaImageColumn}>
           <ImagePixelated
            key={activeCategory.image}
            src={activeCategory.image}
            alt={activeCategory.category}
           />
          </div>
         </motion.div>
        </AnimatePresence>
       </div>
      </div>
      <div>
       <li>صفحات</li>
      </div>
      <div>
       <li>تماس با ما</li>
      </div>
     </ul>
     <Search />
    </Content>
   </header>
   <motion.div
    initial={{ top: 0 }}
    animate={{ top: scrollY < 100 ? -250 : 0 }}
    className={classes['fixed-header']}>
    <Content contentClassname={`${classes['bottom-wrapper']} `}>
     <ul className={classes['buttom-wrapper']}>
      <li style={{ zIndex: '10' }}>
       <a href='/'>
        <img src={logo} alt='' width={80} height={80} />
       </a>
      </li>
      <div>
       <li>خانه</li>
      </div>
      <div>
       <li>فروشگاه</li>
       <div className={classes['mega-paper']}></div>
      </div>
      <div>
       <li>صفحات</li>
      </div>
      <div>
       <li>تماس با ما</li>
      </div>
     </ul>
     <Search />
    </Content>
   </motion.div>
  </div>
 );
};

export default Header;
