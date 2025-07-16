import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Otp = lazy(() => import('../pages/Otp'));
const PhoneLogin = lazy(() => import('../pages/PhoneLogin'));
const Product = lazy(() => import('../pages/Product'));
const Blogs = lazy(() => import('../pages/Blogs'));
const CheckoutSuccess = lazy(() => import('../pages/CheckoutSuccess'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const Category = lazy(() => import('../pages/Category'));
const Profile = lazy(() => import('../pages/Profile'));
const Checkout = lazy(() => import('../pages/Checkout'));
const Contact = lazy(() => import('../pages/Contact'));
const About = lazy(() => import('../pages/About'));
const NotFound = lazy(() => import('../pages/404'));

export const publicRoutes = [
 { path: '/', element: <Home /> },
 { path: '/login', element: <Login /> },
 { path: '/register', element: <Signup /> },
 { path: '/otp', element: <Otp /> },
 { path: '/login-with-phone', element: <PhoneLogin /> },
 { path: '/product/:id/:variation', element: <Product /> },
 { path: '/blogs', element: <Blogs /> },
 { path: '/blogs/:id', element: <BlogPost /> },
 { path: '/category', element: <Category /> },
 { path: '/checkout', element: <Checkout /> },
 { path: '/checkout-success', element: <CheckoutSuccess /> },
 { path: '/profile/*', element: <Profile /> },
 { path: '/about-us', element: <About /> },
 { path: '/contact-us', element: <Contact /> },
 { path: '/*', element: <NotFound /> },
];

export const authRoutes = [
 //  { path: '/checkout', element: <PreCheckout /> },
 { path: '/profile', element: <Profile /> },
];
