import { Badge, IconButton } from "@mui/material";
import {
  Heart,
  LayoutGrid,
  LogIn,
  LogOut,
  ShoppingCart,
  User,
} from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../../redux/auth/authActions";
import {
  openCartDrawer,
  openFavoritesDrawer,
} from "../../../redux/drawer/drawerActions";
import classes from "./FixedNavigation.module.css";

const FixedNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.user);
  const favoritesCount = favorites.length;

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={classes.main}>
      {isAuthenticated ? (
        <>
          <IconButton onClick={() => handleNavigate("/profile/dashboard")}>
            <User className={classes.svg} />
          </IconButton>
          <IconButton onClick={handleLogout}>
            <LogOut className={classes.svg} />
          </IconButton>
        </>
      ) : (
        <IconButton onClick={() => handleNavigate("/login")}>
          <LogIn className={classes.svg} />
        </IconButton>
      )}

      <IconButton onClick={() => dispatch(openFavoritesDrawer())}>
        <Badge
          badgeContent={favoritesCount || 0}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Heart className={classes.svg} />
        </Badge>
      </IconButton>
      <IconButton onClick={() => dispatch(openCartDrawer())}>
        <Badge
          badgeContent={cart?.products.length || 0}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <ShoppingCart className={classes.svg} />
        </Badge>
      </IconButton>
      <IconButton onClick={() => handleNavigate("/category")}>
        <LayoutGrid className={classes.svg} />
      </IconButton>
    </div>
  );
};

export default FixedNavigation;
