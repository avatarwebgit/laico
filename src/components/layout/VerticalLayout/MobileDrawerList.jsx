import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { fetchHeaderMenusRequest } from "../../../redux/general/generalActions";
import classes from "./MobileDrawerList.module.css";

const MobileDrawerList = () => {
  const lng = "fa";
  const dispatch = useDispatch();
  const { headerMenus: data, menusLoading } = useSelector(
    (state) => state.general
  );

  const [current, setCurrent] = useState("mail");
  const [items, setItems] = useState(null);

  const { t } = useTranslation();

  const handleLogOut = () => {
    //   dispatch(userActions.reset());
  };

  useEffect(() => {
    dispatch(fetchHeaderMenusRequest(lng));
  }, [dispatch, lng]);

  useEffect(() => {
    let updatedItems = [];
    if (data && data.length > 0) {
      data.map((el) => {
        if (el.children) {
          const children = [];
          el.children.map((child) => {
            if (child.url) {
              children.push({
                label: <Link to={child.url}>{child.label}</Link>,
                key: child.key,
              });
            } else if (child.alias) {
              children.push({
                label: (
                  <Link to={`/${lng}/page/${child.alias}`}>{child.label}</Link>
                ),
                key: child.key,
              });
            } else {
              children.push({
                label: child.label,
                key: child.key,
              });
            }
          });
          updatedItems.push({ label: el.label, key: el.key, children });
        } else {
          updatedItems.push({
            label: el.label,
            key: el.key,
          });
        }
      });
    }

    updatedItems.push({
      key: "logout",
      id: "logout",
      label: <div onClick={handleLogOut}>{t("logout")}</div>,
      icon: <Logout />,
    });

    setItems(updatedItems);
  }, [data, lng, t]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      {items && (
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          items={items}
          className={classes.main}
        />
      )}
    </>
  );
};

export default MobileDrawerList;
