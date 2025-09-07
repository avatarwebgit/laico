import React from "react";
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

const Home = () => {
  const dispatch = useDispatch();
  const { latestProducts, popularProducts, specialOffersProducts } =
    useSelector((state) => state.products);

  const handleAddToCart = (product) => {
    dispatch(cartActions.addToCart(product));
    dispatch(openCartDrawer());
  };

  const latestProductsItems = latestProducts.map((p) => (
    <ProductBox key={p.id} product={p} onAddToCart={handleAddToCart} />
  ));
  const popularProductsItems = popularProducts.map((p) => (
    <ProductBox key={p.id} product={p} onAddToCart={handleAddToCart} />
  ));
  const specialOffersItems = specialOffersProducts.map((p) => (
    <ProductBox key={p.id} product={p} onAddToCart={handleAddToCart} />
  ));

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
      <Tabs items={tabItems} title="مشاهده همه" />
      <HeroBanner />
      <Brands />
      <Banner />
      <HomeBlogs />
    </div>
  );
};

export default Home;
