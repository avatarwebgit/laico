import React, { useState, useEffect, memo } from "react";
import { Badge, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  ShoppingCart,
  Heart,
  User,
  LogIn,
  LogOut,
  CreditCard,
} from "lucide-react";

import Content from "../../common/Content";
import Search from "../../common/Search";
import { useNavigation } from "../../../utils/helperFucntions.jsx";
import {
  openCartDrawer,
  openFavoritesDrawer,
  openInstallmentCartDrawer,
} from "../../../redux/drawer/drawerActions";
import { logoutRequest } from "../../../redux/auth/authActions";

import logo from "../../../assets/images/Logo.png";
import classes from "./Header.module.css";
import "../../../styles/common.css";

import { headerMenuData } from "../../../assets/mockData";

const listVariants = {
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { ease: "easeOut" } },
};

const ImagePixelated = memo(({ src, alt }) => {
  const blocks = Array.from({ length: 100 }, (_, i) => i);
  const blockVariants = {
    hidden: { opacity: 1 },
    visible: (i) => ({
      opacity: 0,
      transition: {
        delay: Math.floor(i / 10) * 0.04,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className={classes.pixelatedImageWrapper}>
      <img src={src} alt={alt} className={classes.megaImage} loading="lazy" />
      <div className={classes.pixelatedOverlayGrid}>
        {blocks.map((blockIndex) => (
          <motion.div
            key={blockIndex}
            className={classes.pixelatedBlock}
            custom={blockIndex}
            initial="hidden"
            animate="visible"
            variants={blockVariants}
          />
        ))}
      </div>
    </div>
  );
});

const MegaMenu = ({ data, isFixedHeader = false }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = data[activeCategoryIndex];

  return (
    <div
      className={`${classes["mega-paper"]} ${
        isFixedHeader ? classes["fixed-mega-paper"] : ""
      }`}
    >
      <div className={classes.categoryColumn} dir="ltr">
        <ul className={classes.categoryList}>
          {data.map((item, index) => (
            <li
              key={item.category}
              className={classes.categoryItem}
              onMouseEnter={() => setActiveCategoryIndex(index)}
            >
              {item.category}
              {index === activeCategoryIndex && (
                <motion.div
                  className={classes.activeCategoryIndicator}
                  layoutId="activeCategoryIndicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.category}
          className={classes.megaContentGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className={classes.menuItemsFlow}>
            <motion.ul
              className={classes.menuList}
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {activeCategory.items.map((item) => (
                <motion.li
                  key={item}
                  className={classes.menuItem}
                  variants={itemVariants}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
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
  );
};

const DropdownMenu = ({ data }) => {
  return (
    <div className={classes["dropwdown-paper"]}>
      <motion.ul
        className={classes.menuList}
        style={{ columnCount: 1 }}
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {data.map((item) => (
          <motion.li
            key={item.name}
            className={classes.menuItem}
            variants={itemVariants}
          >
            <Link to={item.path} target="_blank">
              {item.name}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart);
  const { count: favoritesCount } = useSelector((state) => state.favorites);
  const { count: installmentCartCount } = useSelector(
    (state) => state.installmentCart
  );
  const hasInstallment = import.meta.env.VITE_APP_HAS_INSTALLMENT === "true";

  const dispatch = useDispatch();
  const { navigateTo } = useNavigation();

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigateTo("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("load", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("load", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderNavItems = (instance) => {
    return headerMenuData.map((item) => (
      <div
        key={`${instance}-${item.id}`}
        onMouseEnter={() =>
          item.type !== "normal" && setHoveredItem({ id: item.id, instance })
        }
        onMouseLeave={() => item.type !== "normal" && setHoveredItem(null)}
        className={item.type !== "normal" ? classes.shopContainer : ""}
      >
        <li>
          {item.type === "normal" ? (
            <Link to={item.path}>{item.name}</Link>
          ) : (
            item.name
          )}
        </li>

        {hoveredItem?.id === item.id && hoveredItem?.instance === instance && (
          <>
            {item.type === "mega" && (
              <MegaMenu
                data={item.children}
                isFixedHeader={instance === "fixed"}
              />
            )}
            {item.type === "dropdown" && <DropdownMenu data={item.children} />}
          </>
        )}
      </div>
    ));
  };

  return (
    <div>
      <header>
        <Content sectionClassname={classes["wrapper-top"]}>
          <div className={classes["top-wrapper"]}>
            <div className={classes.right}>
              <p>
                شماره تماس : 09127070700
                <Phone className={classes["top-icon"]} />
              </p>
              <p>
                ایمیل : test@gmail.com <Mail className={classes["top-icon"]} />
              </p>
            </div>
            <div className={classes.left}>
              <Badge
                badgeContent={cart?.count || 0}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <IconButton
                  disableRipple={true}
                  onClick={() => dispatch(openCartDrawer())}
                >
                  <ShoppingCart className={`${classes["icon-normal"]}`} />
                </IconButton>
              </Badge>
              {isAuthenticated && (
                <>
                  {hasInstallment && (
                    <Badge
                      badgeContent={installmentCartCount || 0}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <IconButton
                        disableRipple={true}
                        onClick={() => dispatch(openInstallmentCartDrawer())}
                      >
                        <CreditCard className={`${classes["icon-normal"]}`} />
                      </IconButton>
                    </Badge>
                  )}
                  <Badge
                    badgeContent={favoritesCount || 0}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <IconButton
                      disableRipple={true}
                      onClick={() => dispatch(openFavoritesDrawer())}
                    >
                      <Heart className={`${classes["icon-normal"]}`} />
                    </IconButton>
                  </Badge>
                </>
              )}
              {isAuthenticated ? (
                <>
                  <IconButton
                    disableRipple={true}
                    onClick={() => navigateTo("/profile/dashboard")}
                  >
                    <User className={`${classes["icon-normal"]}`} />
                  </IconButton>
                  <IconButton disableRipple={true} onClick={handleLogout}>
                    <LogOut className={`${classes["icon-normal"]}`} />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  disableRipple={true}
                  onClick={() => navigateTo("/login")}
                >
                  <LogIn className={`${classes["icon-normal"]}`} />
                </IconButton>
              )}
            </div>
          </div>
        </Content>
        <div className={classes["middle-wrapper"]}>
          <a href="/">
            <img src={logo} alt="" width={80} height={80} />
          </a>
        </div>
        <Content contentClassname={classes["bottom-wrapper"]}>
          <ul className={classes["buttom-wrapper"]}>
            {renderNavItems("main")}
          </ul>
          <Search />
        </Content>
      </header>
      <motion.div
        initial={{ top: -250 }}
        animate={{ top: scrollY < 100 ? -250 : 0 }}
        className={classes["fixed-header"]}
      >
        <Content contentClassname={`${classes["bottom-wrapper"]} `}>
          <ul className={classes["buttom-wrapper"]}>
            <li style={{ zIndex: "10" }}>
              <a href="/">
                <img src={logo} alt="" width={50} height={50} />
              </a>
            </li>
            {renderNavItems("fixed")}
          </ul>{" "}
          <Search />
          <div className={classes.left}>
            <Badge
              badgeContent={cart?.count || 0}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <IconButton
                disableRipple={true}
                onClick={() => dispatch(openCartDrawer())}
              >
                <ShoppingCart className={`${classes["icon-normal"]}`} />
              </IconButton>
            </Badge>
            {isAuthenticated && (
              <>
                {hasInstallment && (
                  <Badge
                    badgeContent={installmentCartCount || 0}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <IconButton
                      disableRipple={true}
                      onClick={() => dispatch(openInstallmentCartDrawer())}
                    >
                      <CreditCard className={`${classes["icon-normal"]}`} />
                    </IconButton>
                  </Badge>
                )}
                <Badge
                  badgeContent={favoritesCount || 0}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <IconButton
                    disableRipple={true}
                    onClick={() => dispatch(openFavoritesDrawer())}
                  >
                    <Heart className={`${classes["icon-normal"]}`} />
                  </IconButton>
                </Badge>
              </>
            )}
            {isAuthenticated ? (
              <>
                <IconButton
                  disableRipple={true}
                  onClick={() => navigateTo("/profile/dashboard")}
                >
                  <User className={`${classes["icon-normal"]}`} />
                </IconButton>
                <IconButton disableRipple={true} onClick={handleLogout}>
                  <LogOut className={`${classes["icon-normal"]}`} />
                </IconButton>
              </>
            ) : (
              <IconButton
                disableRipple={true}
                onClick={() => navigateTo("/login")}
              >
                <LogIn className={`${classes["icon-normal"]}`} />
              </IconButton>
            )}
          </div>
        </Content>
      </motion.div>
    </div>
  );
};

export default Header;
