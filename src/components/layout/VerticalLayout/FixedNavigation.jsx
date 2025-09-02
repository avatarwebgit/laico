import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { drawerActions, accesModalActions } from '../store/store';

import { ReactComponent as Heart } from "../../../assets/svgs/heart-white.svg";
import { ReactComponent as Basket } from "../../../assets/svgs/add_basket-white.svg";
import { ReactComponent as Login } from "../../../assets/svgs/user.svg";

import classes from "./FixedNavigation.module.css";
import { Avatar, Badge, IconButton } from "@mui/material";
import {
  CircleUser,
  HeartIcon,
  Layers,
  LogIn,
  ShoppingBag,
} from "lucide-react";
const FixedNavigation = () => {
  const [ModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const cart = useSelector((state) => state.cart);
  //  const favorits = useSelector(state => state.favorites.products);

  const handleOpenCart = () => {
    //   dispatch(drawerActions.open());
  };

  const handleOpenLogin = () => {
    setModalOpen(true);
    //   dispatch(accesModalActions.login());
  };

  const handleCloseModal = () => {
    //   dispatch(accesModalActions.close());
  };

  return (
    <div className={classes.main}>
      <>
        {token ? (
          <IconButton>
            <CircleUser className={classes.avatar} />
          </IconButton>
        ) : (
          <IconButton onClick={handleOpenLogin}>
            <LogIn className={classes.svg} />
          </IconButton>
        )}
      </>

      <IconButton>
        <Badge
          //  badgeContent={favorits?.length || 0}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <HeartIcon className={classes.svg} />
        </Badge>
      </IconButton>
      <IconButton onClick={handleOpenCart}>
        <Badge
          badgeContent={cart?.products.length || 0}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <ShoppingBag className={classes.svg} />
        </Badge>
      </IconButton>
      <IconButton onClick={handleOpenCart}>
        <Badge
          badgeContent={cart?.products.length || 0}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Layers className={classes.svg} />
        </Badge>
      </IconButton>
    </div>
  );
};

export default FixedNavigation;
