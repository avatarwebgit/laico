import MobileDropDown from "../common/MobileDropDown";
import classes from "./MobileFilters.module.css";

const MobileFilters = ({ filtersConfig, onFilterChange }) => {
  return (
    <div className={classes["slider-main"]}>
      <div className={classes["slider-wrapper"]}>
        <div className={classes["slider-sheet"]}>
          <MobileDropDown
            key="categories-filter"
            type={"checkbox"}
            checkBoxOptions={filtersConfig.categories.options}
            title={filtersConfig.categories.title}
            onChange={(value) => onFilterChange("categories", value)}
            isStickyContent={true}
          />
          <MobileDropDown
            key="price-filter"
            type={"price"}
            priceOptions={filtersConfig.price.priceOptions}
            title={filtersConfig.price.title}
            onChange={(value) => onFilterChange("price", value)}
            isStickyContent={true}
          />
          <MobileDropDown
            key="colors-filter"
            type={"color"}
            colorsOptions={filtersConfig.colors.options}
            title={filtersConfig.colors.title}
            onChange={(value) => onFilterChange("colors", value)}
            isStickyContent={true}
          />
          <MobileDropDown
            key="delivery-filter"
            type={"switch"}
            title={filtersConfig.delivery.title}
            onChange={(value) => onFilterChange("fastestDelivery", value)}
            isStickyContent={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
