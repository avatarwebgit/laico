// src/components/TitleManager.js
import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";

const DEFAULT_TITLE = "لایکو";
const TITLE_SEPARATOR = " | ";

const routeTitles = {
  "/": "صفحه اصلی",
  "/login": "ورود به حساب کاربری",
  "/register": "ثبت نام",
  "/otp": "تایید کد یکبار مصرف",
  "/login-with-mobile": "ورود با موبایل",
  "/product/:id": (params) => `محصول ${params.id}`,
  "/blogs": "مقالات و بلاگ",
  "/blogs/:id": (params) => `مقاله ${params.id}`,
  "/category": "دسته بندی محصولات",
  "/checkout": "تکمیل سفارش",
  "/checkout-success": "سفارش با موفقیت ثبت شد",
  "/checkout-failure": "خطا در پرداخت",
  "/profile/*": "پروفایل کاربری",
  "/about-us": "درباره ما",
  "/contact-us": "تماس با ما",
  "/*": "صفحه مورد نظر یافت نشد",
};

export default function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const matchedRoute = Object.entries(routeTitles).find(([path]) =>
      matchPath(path, location.pathname)
    );

    let title = DEFAULT_TITLE;

    if (matchedRoute) {
      const [path, titleConfig] = matchedRoute;
      const match = matchPath(path, location.pathname);

      if (typeof titleConfig === "function") {
        title = titleConfig(match.params);
      } else {
        title = titleConfig;
      }
    }

    document.title = `${title}${TITLE_SEPARATOR}${DEFAULT_TITLE}`;

    return () => {
      document.title = DEFAULT_TITLE;
      document.documentElement.dir = "ltr"; // Reset if needed
    };
  }, [location.pathname]);

  return null;
}
