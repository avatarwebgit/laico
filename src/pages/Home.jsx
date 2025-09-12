import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "../components/home/Carousel";
import CategoryGrid from "../components/home/CategoryGrid";
import Tabs from "../components/home/Tabs";
import HeroBanner from "../components/home/HeroBanner";
import Slider from "../components/common/Slider";
import ProductBox from "../components/common/ProductBox";
import Brands from "../components/home/Brands";
import Banner from "../components/home/Banner";
import HomeBlogs from "../components/home/HomeBlogs";
import * as cartActions from "../redux/cart/cartActions";
import { openCartDrawer } from "../redux/drawer/drawerActions";

import img from "../assets/images/photo_2025-04-13_11-44-04.jpg";
import { fetchHomeProductsRequest } from "../redux/products/productActions";

const mainBreakpoints = {
  320: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 5,
  },
  1023: {
    slidesPerView: 5,
  },
};

const Home = () => {
  const dispatch = useDispatch();
  const { latestProducts, popularProducts, specialOffersProducts } =
    useSelector((state) => state.products);

  const latestProductsItems = latestProducts.map((p) => (
    <ProductBox key={p.id} product={p}  />
  ));
  const popularProductsItems = popularProducts.map((p) => (
    <ProductBox key={p.id} product={p}  />
  ));
  const specialOffersItems = specialOffersProducts.map((p) => (
    <ProductBox key={p.id} product={p}  />
  ));

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
      finalPrice: +product.final_price || 0,
      originalPrice: +product.original_price || 0,
      discountPercent: product.discount_percent || 0,
      isLiked: false,
      rating: 4.5,
      totalViews: 1800,
      isOutOfStock: false,
    };
  };

  const tabItems = [
    {
      key: "1",
      label: "محبوب ترین ها",
      children: (
        <Slider
          items={popularProductsItems}
          slidesPerView={5}
          spaceBetween={30}
        />
      ),
    },
    {
      key: "2",
      label: "جدیدترین ها",
      children: (
        <Slider
          items={latestProductsItems}
          slidesPerView={5}
          spaceBetween={30}
        />
      ),
    },
    {
      key: "3",
      label: "پیشنهاد های ویژه",
      children: (
        <Slider
          items={specialOffersItems}
          slidesPerView={5}
          spaceBetween={30}
        />
      ),
    },
  ];

  return (
    <div>
      <Carousel />
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
      <Tabs items={tabItems} title="مشاهده همه" />
      <HeroBanner />
      <Brands />
      <Banner />
      <HomeBlogs />
    </div>
  );
};

export default Home;
