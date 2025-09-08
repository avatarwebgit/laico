import {
  Button,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Expand, GalleryHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  A11y,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import { ReactComponent as Shop } from "../assets/svgs/add_basket-white.svg";
import { ReactComponent as HeartRed } from "../assets/svgs/heart-red.svg";
import { ReactComponent as Heart } from "../assets/svgs/heart.svg";
import Arrowbutton from "../components/common/ArrowButton";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Content from "../components/common/Content";
import Loader from "../components/common/Loader";
import ProductBox from "../components/common/ProductBox";
import Slider from "../components/common/Slider";
import ColorSection from "../components/product/ColorSection";
import ProductGalleryModal from "../components/product/ProductGalleryModal";
import ProductQA from "../components/product/ProductQA";
import ProductReviews from "../components/product/ProductReviews";
import ProductTabs from "../components/product/ProductTabs";

import { fetchProductDetailsRequest } from "../redux/products/productActions";
import {
  addFavoriteRequest,
  removeFavoriteRequest,
} from "../redux/user/userActions";
import { updateCartItemRequest } from "../redux/cart/cartActions";

import { formatNumber, notify } from "../utils/helperFucntions";
import img from "./../assets/images/photo_2025-04-13_11-44-04.jpg";

import classes from "./Product.module.css";

const colors = [
  { id: "1", name: "crimson", color: "#DC143C" },
  { id: "2", name: "forest", color: "#228B22" },
  { id: "3", name: "midnight", color: "#191970" },
  { id: "4", name: "gold", color: "#FFD700" },
  { id: "5", name: "orchid", color: "#DA70D6" },
  { id: "6", name: "slate", color: "#708090" },
  { id: "7", name: "coral", color: "#FF7F50" },
  { id: "8", name: "teal", color: "#008080" },
  { id: "9", name: "indigo", color: "#4B0082" },
  { id: "10", name: "salmon", color: "#FA8072" },
];

const Product = () => {
  const { slug, variation } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    productDetails,
    loading: productDetailsLoading,
    error: productDetailsError,
  } = useSelector((state) => state.products);

  const { favorites } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  const euro = useSelector((state) => state.cart.euro) || 1;

  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const nexElRef = useRef();
  const prevElRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      dispatch(fetchProductDetailsRequest(slug));
    }
  }, [dispatch, slug]);

  const isFavorite = favorites.some((fav) => fav.variation_id === +variation);
  const allImages =
    productDetails?.images && productDetails.primary_image
      ? [productDetails.primary_image, ...productDetails.images]
      : productDetails?.primary_image
      ? [productDetails.primary_image]
      : [];

  const discountAmount = productDetails?.discount?.value
    ? parseFloat(productDetails.discount.value)
    : 0;
  const originalPrice = parseFloat(productDetails?.original_price);
  const salePrice = originalPrice - discountAmount;

  const specs = productDetails
    ? [
        { name_fa: "کد محصول", value_fa: productDetails.sku },
        {
          name_fa: "کد حسابداری",
          value_fa: productDetails.product_accounting_code,
        },
        { name_fa: "موجودی", value_fa: productDetails.stock },
        { name_fa: "برند", value_fa: productDetails.brand?.name },
        {
          name_fa: "دسته‌بندی",
          value_fa: productDetails.categories?.map((c) => c.name).join(", "),
        },
      ].filter((item) => item.value_fa)
    : [];

  const tabsData = productDetails
    ? [
        {
          title: "نقد و بررسی",
          content: (
            <div
              className={classes.tabContent}
              dangerouslySetInnerHTML={{
                __html: `${productDetails.description || ""}<br/><br/>${
                  productDetails.detailed_description || ""
                }`,
              }}
            />
          ),
        },
        {
          title: "مشخصات فنی",
          content: (
            <div className={`${classes.tabContent} ${classes.specsTable}`}>
              {specs.length > 0 ? (
                specs.map((attr) => (
                  <div key={attr.name_fa} className={classes.specRow}>
                    <span className={classes.specKey}>{attr.name_fa}</span>
                    <span className={classes.specValue}>{attr.value_fa}</span>
                  </div>
                ))
              ) : (
                <p>مشخصات فنی برای این محصول ثبت نشده است.</p>
              )}
            </div>
          ),
        },
        {
          title: "نظرات کاربران",
          content: <ProductReviews />,
        },
        {
          title: "پرسش و پاسخ",
          content: <ProductQA />,
        },
      ]
    : [];

  const handleIncrement = () => {
    if (productDetails && quantity < productDetails.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleToggleFavorite = () => {};

  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(
      updateCartItemRequest({
        product_id: productDetails.id,
        quantity: quantity,
      })
    );
  };

  const handleOpenGallery = () => {
    if (mainSwiper) {
      setInitialSlide(mainSwiper.realIndex);
    }
    setIsGalleryOpen(true);
  };

  if (productDetailsLoading && !productDetails) {
    return <Loader />;
  }

  if (productDetailsError) {
    return (
      <Content>
        <p>خطا در بارگذاری محصول: {productDetailsError}</p>
      </Content>
    );
  }

  return (
    <div className={classes.main}>
      <Content className={classes.main_card}>
        {productDetails && (
          <Breadcrumbs
            linkDataProp={[
              { pathname: t("home"), url: " " },
              { pathname: t("categories"), url: "category" },
              { pathname: productDetails.name, url: null },
            ]}
          />
        )}
        <div className={classes.content}>
          <div className={classes["desktop-gallery-wrapper"]}>
            {productDetailsLoading || !productDetails ? (
              <Skeleton
                className={`${classes.idle_image}`}
                variant="rectangular"
                animation="wave"
              />
            ) : (
              <div className={classes["swiper-container"]}>
                <div className={classes["navigation-wrapper"]}>
                  <Arrowbutton
                    className={classes.prevButton}
                    ref={prevElRef}
                    direction={"right"}
                  />
                  <Arrowbutton
                    className={classes.nextButton}
                    ref={nexElRef}
                    direction={"left"}
                  />
                </div>
                <Swiper
                  onSwiper={setMainSwiper}
                  modules={[
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                    Thumbs,
                    FreeMode,
                  ]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation={{
                    nextEl: nexElRef.current,
                    prevEl: prevElRef.current,
                  }}
                  onInit={(swiper) => {
                    swiper.params.navigation.nextEl = nexElRef.current;
                    swiper.params.navigation.prevEl = prevElRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  loop={true}
                  className={classes.swiper}
                >
                  {allImages.map((src, idx) => (
                    <SwiperSlide key={`main-${idx}`}>
                      <img
                        src={src}
                        alt={`slide-${idx}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Tooltip placement="top" arrow title="گالری تصاویر">
                  <button
                    className={classes.galleryButton}
                    onClick={handleOpenGallery}
                  >
                    <GalleryHorizontal />
                  </button>
                </Tooltip>

                <Swiper
                  spaceBetween={10}
                  slidesPerView={5}
                  onSwiper={(e) => {
                    setThumbsSwiper(e);
                  }}
                  watchSlidesProgress={true}
                  modules={[Thumbs]}
                  className={classes.thumbs_slider}
                >
                  {allImages.map((src, idx) => (
                    <SwiperSlide key={`thumb-${idx}`}>
                      <img
                        src={src}
                        alt={`thumb-${idx}`}
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>

          <div className={classes.info}>
            <Typography
              className={classes.product_title}
              color="inherit"
              variant="h3"
            >
              {productDetails?.name}
            </Typography>

            <ColorSection
              colors={colors}
              setColor={setSelectedColor}
              selectedColor={selectedColor}
            />

            <Typography
              className={classes.product_serial}
              color="inherit"
              variant="h3"
            >
              {t("serial_number")}: {productDetails?.sku} /{" "}
              {productDetails?.product_accounting_code}
            </Typography>

            <div className={classes.price_wrapper}>
              <Typography
                className={classes.product_price}
                color="inherit"
                variant="h3"
              >
                {t("price")}:
              </Typography>
              {discountAmount > 0 && (
                <span className={classes.prev_price}>
                  <del>{formatNumber(originalPrice * euro)}</del>
                </span>
              )}
              <p className={classes.current_price}>
                {formatNumber(salePrice * euro)}
              </p>
            </div>

            <div className={classes.quantity_wrapper}>
              <div className={classes.flex}>
                <div className={classes.quantity_total_wrapper}>
                  <div className={classes.input_wrapper}>
                    <button
                      className={classes["quantity-action-button"]}
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <div className={classes.quantity}>{quantity}</div>
                    <button
                      className={classes["quantity-action-button"]}
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <IconButton
              className={classes.wish_list}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? (
                <HeartRed width={15} height={15} />
              ) : (
                <Heart width={15} height={15} />
              )}
              <p>{t(isFavorite ? "product.remove" : "add_to_favorite")}</p>
            </IconButton>

            <Button
              variant="contained"
              size="large"
              className={classes.addtocart}
              onClick={handleAddToCart}
            >
              <Shop
                style={{ width: "25px", height: "25px", margin: "0 5px" }}
              />
              افزودن به سبد خرید
            </Button>

            <span className={classes.divider} />
            <div className={classes.payment_wrapper}>
              <div className={classes.payment_ct}>
                <p className={classes.payment_title}>{t("payment")}:</p>
                &nbsp;
                <p className={classes.payment_value}>
                  {formatNumber(salePrice * quantity * euro)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.tabsSection}>
          <ProductTabs tabs={tabsData} />
        </div>

        <Content
          sectionClassname={classes.section}
          contentClassname={classes["suggest-swiper"]}
        >
          <h2>محصولات مرتبط</h2>
          <Slider
            navigation={true}
            autoplay={false}
            slidesPerView={5}
            spaceBetween={50}
            items={[
              <ProductBox
                product={{
                  id: "1736236632",
                  variationId: "378",
                  name: "محصول فوتی ",
                  price: 12000000,
                  originalPrice: 15000000,
                  isLiked: false,
                  imageUrl: img,
                  rating: 4.5,
                  totalViews: 1800,
                  isOutOfStock: true,
                }}
              />,
              <ProductBox />,
              <ProductBox />,
              <ProductBox />,
              <ProductBox />,
              <ProductBox />,
            ]}
          />
        </Content>
      </Content>
      <ProductGalleryModal
        images={allImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialSlide={initialSlide}
      />
    </div>
  );
};

export default Product;
