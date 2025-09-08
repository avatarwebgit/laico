import { lazy } from "react";
import Authmiddleware from "./authMiddleware";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Otp = lazy(() => import("../pages/Otp"));
const PhoneLogin = lazy(() => import("../pages/PhoneLogin"));
const Product = lazy(() => import("../pages/Product"));
const Blogs = lazy(() => import("../pages/Blogs"));
const CheckoutSuccess = lazy(() => import("../pages/CheckoutSuccess"));
const CheckoutFailure = lazy(() => import("../pages/CheckoutFailure"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const Category = lazy(() => import("../pages/Category"));
const Profile = lazy(() => import("../pages/Profile"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Contact = lazy(() => import("../pages/Contact"));
const About = lazy(() => import("../pages/About"));
const FAQ = lazy(() => import("../pages/FAQ"));
const NotFound = lazy(() => import("../pages/404"));

export const publicRoutes = [
  { path: "/", element: <Home />, name: "صفحه اصلی" },

  { path: "/product/:slug", element: <Product />, name: "محصول" },
  { path: "/blogs", element: <Blogs />, name: "وبلاگ" },
  { path: "/blogs/:slug", element: <BlogPost />, name: "مقاله" },
  { path: "/category", element: <Category />, name: "دسته بندی" },
  { path: "/about-us", element: <About />, name: "درباره ما" },
  { path: "/contact-us", element: <Contact />, name: "تماس با ما" },
  { path: "/FAQ", element: <FAQ />, name: "سوالات متداول" },
  { path: "/*", element: <NotFound />, name: "صفحه پیدا نشد" },
];

export const authRoutes = [
  { path: "/login", element: <Login />, name: "ورود" },
  { path: "/register", element: <Signup />, name: "ثبت نام" },
  { path: "/otp", element: <Otp />, name: "کد تأیید" },
  {
    path: "/login-with-mobile",
    element: <PhoneLogin />,
    name: "ورود با موبایل",
  },
  {
    path: "/checkout",
    element: <Checkout />,
    name: "پرداخت",
  },
  {
    path: "/checkout-success",
    element: <CheckoutSuccess />,
    name: "پرداخت موفق",
  },
  {
    path: "/checkout-failure",
    element: <CheckoutFailure />,
    name: "پرداخت ناموفق",
  },
  {
    path: "/profile/*",
    element: <Profile />,
    name: "پروفایل",
  },
];
