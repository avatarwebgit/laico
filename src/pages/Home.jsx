import Carusel from "../components/home/Carousel";

import Slider from "../components/common/Slider";
import Banner from "../components/home/Banner";
import Tabs from "../components/home/Tabs";

import ProductBox from "../components/common/ProductBox";
import Brands from "../components/home/Brands";
import CategoryGrid from "../components/home/CategoryGrid";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import HeroBanner from "../components/home/HeroBanner";
import HomeBlogs from "../components/home/HomeBlogs";
import { fetchHomeProductsRequest } from "../redux/products/productActions";
import classes from "./Home.module.css";

import img from "../assets/images/photo_2025-04-26_14-50-50.jpg";

const mainBreakpoints = {
  320: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 3,
  },
  1023: {
    slidesPerView: 5,
  },
};

const breakpoints = {
  320: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 4,
  },
  1024: {
    slidesPerView: 5,
  },
};

const items = [
  {
    key: "1",
    label: "تخت‌خواب", // Bed
    children: (
      <Slider
        items={[<ProductBox />, <ProductBox />]}
        slidesPerView={4}
        breakpoints={breakpoints}
        spaceBetween={30}
        autoplay={false}
      />
    ),
  },
  {
    key: "2",
    label: "کمد", // Wardrobe
    children: (
      <Slider
        items={[
          <ProductBox />,
          <ProductBox />,
          <ProductBox />,
          <ProductBox />,
          <ProductBox />,
        ]}
        slidesPerView={4}
        spaceBetween={30}
        breakpoints={breakpoints}
        autoplay={false}
      />
    ),
  },
  {
    key: "3",
    label: "پاتختی", // Nightstand
    children: (
      <Slider
        items={[<ProductBox />]}
        slidesPerView={4}
        breakpoints={breakpoints}
        spaceBetween={30}
        autoplay={false}
      />
    ),
  },
  {
    key: "4",
    label: "آینه", // Mirror
    children: (
      <Slider
        items={[<ProductBox />]}
        slidesPerView={4}
        breakpoints={breakpoints}
        spaceBetween={30}
        autoplay={false}
      />
    ),
  },
  {
    key: "5",
    label: "فرش", // Carpet/Rug
    children: (
      <Slider
        items={[<ProductBox />]}
        slidesPerView={4}
        breakpoints={breakpoints}
        spaceBetween={30}
        autoplay={false}
      />
    ),
  },
  {
    key: "6",
    label: "پرده", // Curtain
    children: (
      <Slider
        items={[<ProductBox />]}
        slidesPerView={4}
        breakpoints={breakpoints}
        spaceBetween={30}
        autoplay={false}
      />
    ),
  },
  {
    key: "7",
    label: "چراغ خواب", // Bedside lamp
    children: (
      <Slider
        items={[<ProductBox />]}
        slidesPerView={4}
        breakpoints={breakpoints}
        spaceBetween={30}
        autoplay={false}
      />
    ),
  },
  {
    key: "8",
    label: "میز آرایش", // Dressing table
    children: (
      <Slider
        items={[<ProductBox />]}
        slidesPerView={4}
        breakpoints={breakpoints}
        spaceBetween={30}
        autoplay={false}
      />
    ),
  },
];

const Home = () => {
  const { popularProducts, latestProducts, specialOffersProducts } =
    useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      popularProducts.length === 0 &&
      latestProducts.length === 0 &&
      specialOffersProducts.length === 0
    ) {
      dispatch(fetchHomeProductsRequest());
    }
  }, [popularProducts, latestProducts, specialOffersProducts]);

  const formatData = (product) => {
    return {
      id: product.id,
      variationId: "378",
      name: product.name,
      imageUrl: img,
      hasDiscount: product.has_discount || false,
      finalPrice: product.final_price || 0,
      originalPrice: product.original_price || 0,
      discountPercent: product.discount_percent || 0,
      isLiked: false,
      rating: 4.5,
      totalViews: 1800,
      isOutOfStock: false,
    };
  };

  useEffect(() => {
    localStorage.setItem(
      "authToken",
      JSON.stringify("1|5Dr7bPTgD5Vzg8uIYGbhHZTeqF1tJNVuBLO379S247dfe989")
    );
  }, []);

  return (
    <div className={classes.main}>
      <Carusel />
      <CategoryGrid />

      {specialOffersProducts.length > 0 && (
        <Slider
          title={"فروش ویژه"}
          items={specialOffersProducts.map((product) => {
            return <ProductBox product={formatData(product)} />;
          })}
          breakpoints={mainBreakpoints}
          autoplay={false}
          slidesPerView={4}
          spaceBetween={30}
        />
      )}

      {popularProducts.length > 0 && (
        <Slider
          title={"محبوب ترین ها"}
          items={popularProducts.map((product) => {
            return <ProductBox product={formatData(product)} />;
          })}
          breakpoints={mainBreakpoints}
          autoplay={false}
          slidesPerView={4}
          spaceBetween={30}
        />
      )}

      {latestProducts.length > 0 && (
        <Slider
          title={" جدید ترین محصولات"}
          items={latestProducts.map((product) => {
            return <ProductBox product={formatData(product)} />;
          })}
          breakpoints={mainBreakpoints}
          autoplay={false}
          slidesPerView={4}
          spaceBetween={30}
        />
      )}

      <Banner />
      <Tabs items={items} title={" همه محصولات"} />
      <Brands />
      <HeroBanner />
      <HomeBlogs />
    </div>
  );
};

export default Home;
