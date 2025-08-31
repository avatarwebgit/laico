import { useTranslation } from "react-i18next";

import { Sort } from "@mui/icons-material";

import CategoryProductBox from "../components/category/CategoryProductBox";
import DesktopFilters from "../components/category/DesktopFilters";
import MobileFilters from "../components/category/MobileFilters";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Content from "../components/common/Content";

import classes from "./Category.module.css";
import { useState, useEffect } from "react";

const mockProducts = [
  {
    id: 1,
    name: "لپتاپ گیمینگ ROG",
    caption: "پردازنده قدرتمند و کارت گرافیک RTX",
    price: 56800000,
    imageUrl: "https://picsum.photos/id/1/500/500",
    colors: [
      { id: 10, color: "مشکی", hex: "#000000" },
      { id: 1, color: "قرمز", hex: "#FF0000" },
    ],
    category: "لپتاپ",
    rating: 4.8,
    dateAdded: "2023-10-26",
    sales: 150,
    deliveryTime: 2,
    isFeatured: true,
    views: 5000,
  },
  {
    id: 2,
    name: "گوشی هوشمند گلکسی",
    caption: "دوربین 108 مگاپیکسلی",
    price: 32500000,
    imageUrl: "https://picsum.photos/id/2/500/500",
    colors: [
      { id: 2, color: "آبی", hex: "#0000FF" },
      { id: 9, color: "سفید", hex: "#FFFFFF" },
    ],
    category: "تلفن همراه",
    rating: 4.5,
    dateAdded: "2023-09-15",
    sales: 250,
    deliveryTime: 1,
    isFeatured: false,
    views: 8000,
  },
  {
    id: 3,
    name: "هدفون بی‌سیم سونی",
    caption: "نویز کنسلینگ فعال",
    price: 8900000,
    imageUrl: "https://picsum.photos/id/3/500/500",
    colors: [{ id: 10, color: "مشکی", hex: "#000000" }],
    category: "هدفون",
    rating: 4.9,
    dateAdded: "2023-11-01",
    sales: 300,
    deliveryTime: 4,
    isFeatured: true,
    views: 7500,
  },
  {
    id: 4,
    name: "کیبورد مکانیکال",
    caption: "با نورپردازی RGB",
    price: 4200000,
    imageUrl: "https://picsum.photos/id/4/500/500",
    colors: [{ id: 9, color: "سفید", hex: "#FFFFFF" }],
    category: "صفحه کلید",
    rating: 4.7,
    dateAdded: "2023-08-20",
    sales: 120,
    deliveryTime: 1,
    isFeatured: false,
    views: 4000,
  },
  {
    id: 5,
    name: "مانیتور 4K سامسونگ",
    caption: "27 اینچ با پنل IPS",
    price: 15300000,
    imageUrl: "https://picsum.photos/id/5/500/500",
    colors: [{ id: 10, color: "مشکی", hex: "#000000" }],
    category: "مانیتور",
    rating: 4.6,
    dateAdded: "2023-10-10",
    sales: 80,
    deliveryTime: 3,
    isFeatured: false,
    views: 6000,
  },
  {
    id: 6,
    name: "ماوس گیمینگ لاجیتک",
    caption: "حسگر اپتیکال دقیق",
    price: 2100000,
    imageUrl: "https://picsum.photos/id/6/500/500",
    colors: [{ id: 10, color: "مشکی", hex: "#000000" }],
    category: "ماوس",
    rating: 4.8,
    dateAdded: "2023-11-05",
    sales: 200,
    deliveryTime: 1,
    isFeatured: true,
    views: 6500,
  },
  {
    id: 7,
    name: "تبلت اپل آیپد",
    caption: "صفحه نمایش رتینا",
    price: 28000000,
    imageUrl: "https://picsum.photos/id/7/500/500",
    colors: [{ id: 6, color: "خاکستری", hex: "#708090" }],
    category: "تبلت",
    rating: 4.9,
    dateAdded: "2023-07-01",
    sales: 180,
    deliveryTime: 5,
    isFeatured: false,
    views: 9000,
  },
  {
    id: 8,
    name: "ساعت هوشمند اپل",
    caption: "نسل جدید با سنسور اکسیژن خون",
    price: 19500000,
    imageUrl: "https://picsum.photos/id/8/500/500",
    colors: [
      { id: 10, color: "مشکی", hex: "#000000" },
      { id: 7, color: "صورتی", hex: "#FFC0CB" },
    ],
    category: "ساعت هوشمند",
    rating: 4.9,
    dateAdded: "2023-09-25",
    sales: 220,
    deliveryTime: 2,
    isFeatured: true,
    views: 10000,
  },
  {
    id: 9,
    name: "دوربین کانن EOS",
    caption: "فول فریم با لنز کیت",
    price: 85000000,
    imageUrl: "https://picsum.photos/id/9/500/500",
    colors: [{ id: 10, color: "مشکی", hex: "#000000" }],
    category: "دوربین",
    rating: 4.7,
    dateAdded: "2023-05-18",
    sales: 50,
    deliveryTime: 6,
    isFeatured: false,
    views: 3000,
  },
  {
    id: 10,
    name: "اسپیکر JBL",
    caption: "ضدآب و قابل حمل",
    price: 3500000,
    imageUrl: "https://picsum.photos/id/10/500/500",
    colors: [
      { id: 2, color: "آبی", hex: "#0000FF" },
      { id: 1, color: "قرمز", hex: "#FF0000" },
    ],
    category: "بلندگو",
    rating: 4.6,
    dateAdded: "2023-10-30",
    sales: 160,
    deliveryTime: 1,
    isFeatured: false,
    views: 5500,
  },
  {
    id: 11,
    name: "لپتاپ دانشجویی ایسوس",
    caption: "سبک و مناسب برای حمل",
    price: 25000000,
    imageUrl: "https://picsum.photos/id/11/500/500",
    colors: [{ id: 6, color: "خاکستری", hex: "#708090" }],
    category: "لپتاپ",
    rating: 4.4,
    dateAdded: "2023-11-10",
    sales: 180,
    deliveryTime: 3,
    isFeatured: false,
    views: 5200,
  },
  {
    id: 12,
    name: "گوشی شیائومی نوت 12",
    caption: "باتری قدرتمند 5000 میلی آمپر",
    price: 9800000,
    imageUrl: "https://picsum.photos/id/12/500/500",
    colors: [
      { id: 2, color: "آبی", hex: "#0000FF" },
      { id: 10, color: "مشکی", hex: "#000000" },
    ],
    category: "تلفن همراه",
    rating: 4.6,
    dateAdded: "2023-10-05",
    sales: 450,
    deliveryTime: 1,
    isFeatured: true,
    views: 12000,
  },
  {
    id: 13,
    name: "ماوس ارگونومیک مایکروسافت",
    caption: "طراحی راحت برای استفاده طولانی",
    price: 1800000,
    imageUrl: "https://picsum.photos/id/13/500/500",
    colors: [{ id: 6, color: "خاکستری", hex: "#708090" }],
    category: "ماوس",
    rating: 4.8,
    dateAdded: "2023-06-15",
    sales: 90,
    deliveryTime: 4,
    isFeatured: false,
    views: 3500,
  },
  {
    id: 14,
    name: "هدفون گیمینگ سبز",
    caption: "صدای فراگیر 7.1 کاناله",
    price: 6500000,
    imageUrl: "https://picsum.photos/id/14/500/500",
    colors: [{ id: 3, color: "سبز", hex: "#00FF00" }],
    category: "هدفون",
    rating: 4.7,
    dateAdded: "2023-11-12",
    sales: 110,
    deliveryTime: 2,
    isFeatured: false,
    views: 4800,
  },
  {
    id: 15,
    name: "قاب گوشی فانتزی",
    caption: "طرح کهکشانی بنفش",
    price: 350000,
    imageUrl: "https://picsum.photos/id/15/500/500",
    colors: [{ id: 5, color: "بنفش", hex: "#800080" }],
    category: "تلفن همراه",
    rating: 4.9,
    dateAdded: "2023-11-20",
    sales: 500,
    deliveryTime: 1,
    isFeatured: true,
    views: 9500,
  },
  {
    id: 16,
    name: "کیبورد گیمینگ زرد",
    caption: "سوییچ‌های مکانیکی Cherry MX",
    price: 5900000,
    imageUrl: "https://picsum.photos/id/16/500/500",
    colors: [{ id: 4, color: "زرد", hex: "#FFFF00" }],
    category: "صفحه کلید",
    rating: 4.8,
    dateAdded: "2023-09-01",
    sales: 70,
    deliveryTime: 5,
    isFeatured: false,
    views: 3200,
  },
  {
    id: 17,
    name: "تبلت حرفه‌ای Wacom",
    caption: "برای طراحان دیجیتال",
    price: 78000000,
    imageUrl: "https://picsum.photos/id/17/500/500",
    colors: [{ id: 10, color: "مشکی", hex: "#000000" }],
    category: "تبلت",
    rating: 4.9,
    dateAdded: "2023-04-10",
    sales: 30,
    deliveryTime: 7,
    isFeatured: false,
    views: 2500,
  },
  {
    id: 18,
    name: "ساعت هوشمند Amazfit",
    caption: "عمر باتری طولانی",
    price: 2800000,
    imageUrl: "https://picsum.photos/id/18/500/500",
    colors: [
      { id: 10, color: "مشکی", hex: "#000000" },
      { id: 7, color: "صورتی", hex: "#FFC0CB" },
    ],
    category: "ساعت هوشمند",
    rating: 4.5,
    dateAdded: "2023-11-15",
    sales: 350,
    deliveryTime: 2,
    isFeatured: true,
    views: 8800,
  },
  {
    id: 19,
    name: "دوربین سونی Alpha",
    caption: "سنسور APS-C با کیفیت بالا",
    price: 45000000,
    imageUrl: "https://picsum.photos/id/19/500/500",
    colors: [{ id: 10, color: "مشکی", hex: "#000000" }],
    category: "دوربین",
    rating: 4.8,
    dateAdded: "2023-08-01",
    sales: 60,
    deliveryTime: 4,
    isFeatured: true,
    views: 4500,
  },
  {
    id: 20,
    name: "اسپیکر Anker Soundcore",
    caption: "صدای 360 درجه",
    price: 2900000,
    imageUrl: "https://picsum.photos/id/20/500/500",
    colors: [
      { id: 2, color: "آبی", hex: "#0000FF" },
      { id: 1, color: "قرمز", hex: "#FF0000" },
      { id: 3, color: "سبز", hex: "#00FF00" },
    ],
    category: "بلندگو",
    rating: 4.7,
    dateAdded: "2023-11-18",
    sales: 280,
    deliveryTime: 1,
    isFeatured: true,
    views: 7000,
  },
];

const filtersConfig = {
  categories: {
    title: "دسته بندی",
    type: "checkbox",
    options: [
      { id: 1, name: "لپتاپ" },
      { id: 2, name: "تلفن همراه" },
      { id: 3, name: "هدفون" },
      { id: 4, name: "صفحه کلید" },
      { id: 5, name: "ماوس" },
      { id: 6, name: "مانیتور" },
      { id: 7, name: "تبلت" },
      { id: 8, name: "ساعت هوشمند" },
      { id: 9, name: "دوربین" },
      { id: 10, name: "بلندگو" },
    ],
  },
  colors: {
    title: "رنگ ها",
    type: "color",
    options: [
      { id: 1, color: "قرمز", hex: "#FF0000" },
      { id: 2, color: "آبی", hex: "#0000FF" },
      { id: 3, color: "سبز", hex: "#00FF00" },
      { id: 4, color: "زرد", hex: "#FFFF00" },
      { id: 5, color: "بنفش", hex: "#800080" },
      { id: 6, color: "خاکستری", hex: "#708090" },
      { id: 7, color: "صورتی", hex: "#FFC0CB" },
      { id: 9, color: "سفید", hex: "#FFFFFF" },
      { id: 10, color: "مشکی", hex: "#000000" },
    ],
  },
  price: { title: "قیمت", type: "price", priceOptions: [2000000, 90000000] },
  delivery: { title: "ارسال فوری", type: "switch" },
};

const Category = () => {
  const { t } = useTranslation();
  const lng = "fa";

  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    setAllProducts(mockProducts);
    setDisplayedProducts(mockProducts);
  }, []);

  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    colors: [],
    price: filtersConfig.price.priceOptions,
    fastestDelivery: false,
  });

  const [activeSort, setActiveSort] = useState("most-relevant");

  const handleFilterChange = (filterKey, value) => {
    setActiveFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  const resetFilters = () => {
    setActiveFilters({
      categories: [],
      colors: [],
      price: filtersConfig.price.priceOptions,
      fastestDelivery: false,
    });
  };

  const handleSortChange = (event) => {
    setActiveSort(event.target.value);
  };

  useEffect(() => {
    let tempProducts = [...allProducts];

    // Filtering logic
    if (activeFilters.categories.length > 0) {
      const selectedCategories = filtersConfig.categories.options
        .filter((opt) => activeFilters.categories.includes(opt.id))
        .map((opt) => opt.name);
      tempProducts = tempProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (activeFilters.colors.length > 0) {
      const selectedColorNames = filtersConfig.colors.options
        .filter((opt) => activeFilters.colors.includes(opt.id))
        .map((opt) => opt.color);
      tempProducts = tempProducts.filter((product) =>
        product.colors.some((color) => selectedColorNames.includes(color.color))
      );
    }

    if (activeFilters.price) {
      tempProducts = tempProducts.filter(
        (p) =>
          p.price >= activeFilters.price[0] && p.price <= activeFilters.price[1]
      );
    }

    if (activeFilters.fastestDelivery) {
      tempProducts = tempProducts.filter((p) => p.deliveryTime <= 2);
    }

    // Sorting logic
    switch (activeSort) {
      case "cheapest":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "most-expensive":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        tempProducts.sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
        break;
      case "best-selling":
        tempProducts.sort((a, b) => b.sales - a.sales);
        break;
      case "fastest-delivery":
        tempProducts.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case "buyers-choice":
        tempProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "most-viewed":
        tempProducts.sort((a, b) => b.views - a.views);
        break;
      case "featured":
        tempProducts.sort((a, b) => b.isFeatured - a.isFeatured);
        break;
      case "most-relevant":
      default:
        tempProducts.sort((a, b) => a.id - b.id);
        break;
    }

    setDisplayedProducts(tempProducts);
  }, [activeFilters, activeSort, allProducts]);

  return (
    <main
      className={`${classes.category} main`}
      dir={lng === "fa" ? "rtl" : "ltr"}
    >
      <Content contentClassname={classes.content}>
        <Breadcrumbs
          linkDataProp={[
            { pathname: t("home"), url: " " },
            { pathname: t("categories"), url: "category" },
          ]}
        />
        <div className={classes["wrapper"]} dir={lng === "fa" ? "rtl" : "ltr"}>
          <div className={classes["filter-list-wrapper"]}>
            <DesktopFilters
              filtersConfig={filtersConfig}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              resetFilters={resetFilters}
            />
          </div>

          <div className={classes["list-wrapper"]}>
            <div className={classes["sort-wrapper"]}>
              <ul dir="rtl">
                <li>
                  <Sort fontSize="10" />
                  <div>مرتب سازی:</div>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="sort-option"
                      value="most-relevant"
                      hidden
                      checked={activeSort === "most-relevant"}
                      onChange={handleSortChange}
                    />
                    <div>مرتبط‌ترین</div>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="sort-option"
                      value="most-viewed"
                      hidden
                      checked={activeSort === "most-viewed"}
                      onChange={handleSortChange}
                    />
                    <div>پربازدیدترین</div>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="sort-option"
                      value="newest"
                      hidden
                      checked={activeSort === "newest"}
                      onChange={handleSortChange}
                    />
                    <div>جدیدترین</div>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="sort-option"
                      value="best-selling"
                      hidden
                      checked={activeSort === "best-selling"}
                      onChange={handleSortChange}
                    />
                    <div>پرفروش‌ترین‌</div>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="sort-option"
                      value="cheapest"
                      hidden
                      checked={activeSort === "cheapest"}
                      onChange={handleSortChange}
                    />
                    <div>ارزان‌ترین</div>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="sort-option"
                      value="most-expensive"
                      hidden
                      checked={activeSort === "most-expensive"}
                      onChange={handleSortChange}
                    />
                    <div>گران‌ترین</div>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="sort-option"
                      value="fastest-delivery"
                      hidden
                      checked={activeSort === "fastest-delivery"}
                      onChange={handleSortChange}
                    />
                    <div>سریع‌ترین ارسال</div>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="sort-option"
                      value="buyers-choice"
                      hidden
                      checked={activeSort === "buyers-choice"}
                      onChange={handleSortChange}
                    />
                    <div>پیشنهاد خریداران</div>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="sort-option"
                      value="featured"
                      hidden
                      checked={activeSort === "featured"}
                      onChange={handleSortChange}
                    />
                    <div>منتخب</div>
                  </label>
                </li>
              </ul>
            </div>
            <div className={classes["mobile-filter-wrapper"]}>
              <MobileFilters
                filtersConfig={filtersConfig}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className={classes["product-list-wrapper"]}>
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => {
                  return (
                    <CategoryProductBox key={product.id} product={product} />
                  );
                })
              ) : (
                <p>محصولی مطابق با فیلترهای شما یافت نشد.</p>
              )}
            </div>
          </div>
        </div>
      </Content>
    </main>
  );
};

export default Category;
