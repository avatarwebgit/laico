import { useTranslation } from "react-i18next";

import DropDown from "../common/DropDown";

import { useState } from "react";
import classes from "./DesktopFilters.module.css";

const DesktopFilters = ({ filtersConfig, onFilterChange, resetFilters }) => {
  const [removePointer, setRemovePointer] = useState(false);

  const { t } = useTranslation();

  const handleRemoveFilters = () => {
    resetFilters();
    setRemovePointer(!removePointer);
  };

  return (
    <div className={classes.filters}>
      <div className={classes["filters-header"]}>
        <h5>{t("filters")}</h5>
        <button onClick={handleRemoveFilters}>{t("remove filters")}</button>
      </div>
      <DropDown
        type={"checkbox"}
        checkBoxOptions={filtersConfig.categories.options}
        title={filtersConfig.categories.title}
        onChange={(value) => onFilterChange("categories", value)}
        removeFilters={removePointer}
      />
      <DropDown
        type={"color"}
        colorsOptions={filtersConfig.colors.options}
        title={filtersConfig.colors.title}
        onChange={(value) => onFilterChange("colors", value)}
        removeFilters={removePointer}
      />
      <DropDown
        type={"price"}
        title={filtersConfig.price.title}
        priceOptions={filtersConfig.price.priceOptions}
        onChange={(value) => onFilterChange("price", value)}
        removeFilters={removePointer}
      />
      <DropDown
        type={"switch"}
        title={filtersConfig.delivery.title}
        onChange={(value) => onFilterChange("fastestDelivery", value)}
        removeFilters={removePointer}
      />
    </div>
  );
};

export default DesktopFilters;
