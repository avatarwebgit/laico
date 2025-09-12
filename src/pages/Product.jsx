import {
  Button,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { GalleryHorizontal, Heart, Layers2, ShoppingCart } from "lucide-react";
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

import Arrowbutton from "../components/common/ArrowButton";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Content from "../components/common/Content";
import InstallmentGatewayModal from "../components/common/InstallmentGatewayModal";
import ProductBox from "../components/common/ProductBox";
import PurchaseMethodModal from "../components/common/PurchaseMethodModal";
import Slider from "../components/common/Slider";
import Spinner from "../components/common/Spinner";
import ColorSection from "../components/product/ColorSection";
import ProductGalleryModal from "../components/product/ProductGalleryModal";
import ProductQA from "../components/product/ProductQA";
import ProductReviews from "../components/product/ProductReviews";
import ProductTabs from "../components/product/ProductTabs";
import { addToCartRequest } from "../redux/cart/cartActions";
import { toggleCompare } from "../redux/compare/compareActions";
import {
  addFavoriteRequest,
  removeFromFavoritesRequest,
} from "../redux/favorites/favoritesActions";
import { addToInstallmentCartRequest } from "../redux/installmentCart/installmentCartActions";
import { fetchProductDetailsRequest } from "../redux/products/productActions";
import { formatNumber } from "../utils/helperFucntions.jsx";
import classes from "./Product.module.css";

const Product = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { loading: productDetailsLoading, error: productDetailsError } =
    useSelector((state) => state.products);

  const productDetails = useSelector(
    (state) => state.products.productDetails[slug]
  );

  const { items: favorites } = useSelector((state) => state.favorites);
  const { items: compareItems } = useSelector((state) => state.compare);
  const token = useSelector((state) => state.auth.token);

  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [gatewayModalVisible, setGatewayModalVisible] = useState(false);

  const nexElRef = useRef();
  const prevElRef = useRef();

  const hasInstallment = import.meta.env.VITE_APP_HAS_INSTALLMENT === "true";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      dispatch(fetchProductDetailsRequest(slug));
    }
  }, [dispatch, slug]);

  const isLiked = productDetails
    ? favorites.some((fav) => fav.id === productDetails.id)
    : false;
  const isInCompare = productDetails
    ? compareItems.some((item) => item.id === productDetails.id)
    : false;

  const allImages =
    productDetails?.images && productDetails.imageUrl
      ? [productDetails.imageUrl, ...productDetails.images]
      : productDetails?.imageUrl
      ? [productDetails.imageUrl]
      : [];

  const originalPrice = parseFloat(productDetails?.original_price);
  const salePrice = parseFloat(productDetails?.final_price);
  const discountAmount =
    originalPrice > salePrice ? originalPrice - salePrice : 0;

  const specs = productDetails
    ? [
        { name_fa: "کد محصول", value_fa: productDetails.legacy_id },
        {
          name_fa: "دسته بندی",
          value_fa: productDetails.category,
        },
        {
          name_fa: "موجودی",
          value_fa: productDetails.isOutOfStock ? "ناموجود" : "موجود",
        },
        { name_fa: "تعداد فروش", value_fa: productDetails.sales },
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
          content: <ProductReviews reviews={productDetails.comments || []} />,
        },
        {
          title: "پرسش و پاسخ",
          content: <ProductQA qas={productDetails.faqs || []} />,
        },
      ]
    : [];

  const handleIncrement = () => {
    if (productDetails && quantity < (productDetails.stock || 10)) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleToggleFavorite = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (isLiked) {
      dispatch(removeFromFavoritesRequest(productDetails.id));
    } else {
      dispatch(addFavoriteRequest(productDetails));
    }
  };

  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (hasInstallment) {
      setPurchaseModalVisible(true);
    } else {
      dispatch(
        addToCartRequest({
          product_id: productDetails.id,
          quantity: quantity,
        })
      );
    }
  };

  const handlePurchaseMethodSelect = (method) => {
    setPurchaseModalVisible(false);
    if (method === "cash") {
      dispatch(
        addToCartRequest({
          product_id: productDetails.id,
          quantity: quantity,
        })
      );
    } else if (method === "installment") {
      setGatewayModalVisible(true);
    }
  };

  const handleGatewaySelect = (gatewayId) => {
    setGatewayModalVisible(false);
    dispatch(
      addToInstallmentCartRequest({
        product_id: productDetails.id,
        quantity: quantity,
        gateway: gatewayId,
      })
    );
  };

  const handleOpenGallery = () => {
    if (mainSwiper) {
      setInitialSlide(mainSwiper.realIndex);
    }
    setIsGalleryOpen(true);
  };

  const handleToggleCompare = () => {
    if (productDetails) {
      dispatch(toggleCompare(productDetails));
    }
  };

  if (productDetailsLoading && !productDetails) {
    return <Spinner />;
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
              colors={productDetails?.colors || []}
              setColor={setSelectedColor}
              selectedColor={selectedColor}
            />

            <Typography
              className={classes.product_serial}
              color="inherit"
              variant="h3"
            >
              {t("serial_number")}: {productDetails?.legacy_id}
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
                  <del>{formatNumber(originalPrice, "toman")}</del>
                </span>
              )}
              <p className={classes.current_price}>
                {formatNumber(salePrice, "toman")}
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
            <div className={classes.actions_wrapper}>
              <IconButton
                className={classes.wish_list}
                onClick={handleToggleFavorite}
              >
                {isLiked ? (
                  <Heart size={15} fill="red" color="red" />
                ) : (
                  <Heart size={15} />
                )}
                <p>{t(isLiked ? "product.remove" : "add_to_favorite")}</p>
              </IconButton>
              <IconButton
                className={classes.compare_button}
                onClick={handleToggleCompare}
              >
                <Layers2 size={15} fill={isInCompare ? "black" : "none"} />
                <p>{isInCompare ? "حذف از مقایسه" : "مقایسه"}</p>
              </IconButton>
            </div>

            <Button
              variant="contained"
              size="large"
              className={classes.addtocart}
              onClick={handleAddToCart}
            >
              <ShoppingCart
                color="white"
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
                  {formatNumber(salePrice * quantity, "toman")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.tabsSection}>
          <ProductTabs tabs={tabsData} />
        </div>
        {productDetails?.relatedProducts &&
          productDetails.relatedProducts.length > 0 && (
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
                items={productDetails.relatedProducts.map((p) => (
                  <ProductBox key={p.id} product={p} />
                ))}
              />
            </Content>
          )}
      </Content>
      <ProductGalleryModal
        images={allImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialSlide={initialSlide}
      />
      {productDetails && hasInstallment && (
        <>
          <PurchaseMethodModal
            open={purchaseModalVisible}
            onCancel={() => setPurchaseModalVisible(false)}
            onSelect={handlePurchaseMethodSelect}
          />
          <InstallmentGatewayModal
            open={gatewayModalVisible}
            onCancel={() => setGatewayModalVisible(false)}
            onSelect={handleGatewaySelect}
            product={productDetails}
          />
        </>
      )}
    </div>
  );
};

export default Product;
