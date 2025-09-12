import { Badge, IconButton } from "@mui/material";
import {
  Heart,
  LayoutGrid,
  LogIn,
  LogOut,
  ShoppingCart,
  User,
  CreditCard,
} from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../../redux/auth/authActions";
import {
  openCartDrawer,
  openFavoritesDrawer,
  openInstallmentCartDrawer,
} from "../../../redux/drawer/drawerActions";
import classes from "./FixedNavigation.module.css";

const FixedNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { count: favoritesCount } = useSelector((state) => state.favorites);
  const { count: installmentCartCount } = useSelector(
    (state) => state.installmentCart
  );

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

      {isAuthenticated && (
        <>
          <IconButton onClick={() => dispatch(openFavoritesDrawer())}>
            <Badge
              badgeContent={favoritesCount || 0}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "rgba(255, 255, 255, 9)",
                  color: "black",
                },
              }}
            >
              <Heart className={classes.svg} />
            </Badge>
          </IconButton>
          <IconButton onClick={() => dispatch(openInstallmentCartDrawer())}>
            <Badge
              badgeContent={installmentCartCount || 0}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "rgba(255, 255, 255, 9)",
                  color: "black",
                },
              }}
            >
              <CreditCard className={classes.svg} />
            </Badge>
          </IconButton>
        </>
      )}
      <IconButton onClick={() => dispatch(openCartDrawer())}>
        <Badge
          badgeContent={cart?.count || 0}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "rgba(255, 255, 255, 9)",
              color: "black",
            },
          }}
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
