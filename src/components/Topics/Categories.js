import React from "react";
import PropTypes from "prop-types";
import filterAllowedProps from "filter-react-props";

import Heading from "../../atoms/Heading";
import Button from "../../atoms/Button";
import LoadingPlaceholder from "../../atoms/LoadingPlaceholder";
import Chevron from "./Chevron";

import {
  StyledCategoriesWrapper,
  StyledCategoryList,
  StyledClearButton,
  StyledControlButton,
  StyledHeadingWrapper,
  StyledListWrapper
} from "./StyledCategories";

const CategoryButtonsPlaceholder = props => (
  <StyledListWrapper className="loading" {...props}>
    <StyledCategoryList>
      <li>
        <LoadingPlaceholder width="60px" height="20px" />
      </li>
      <li>
        <LoadingPlaceholder width="60px" height="20px" />
      </li>
      <li>
        <LoadingPlaceholder width="60px" height="20px" />
      </li>
    </StyledCategoryList>
  </StyledListWrapper>
);

const useCarouselPosition = categories => {
  const [carouselPosition, setCarouselPosition] = React.useState(0);

  React.useEffect(() => {
    setCarouselPosition(0);
  }, [categories]);

  return [carouselPosition, setCarouselPosition];
};

const isActive = (category, active) => {
  if (Array.isArray(active)) {
    return active.includes(category);
  }
  return category === active;
};

const Categories = ({
  activeCategory = null,
  categories = [],
  title,
  onCategoryClick,
  onClearClick,
  showClear = false,
  loading = false,
  displayedItems = 3,
  ...props
}) => {
  const [carouselPosition, setCarouselPosition] = useCarouselPosition(
    categories
  );

  const categoryClickHandler = (event, category) => {
    if (typeof onCategoryClick === "function") {
      onCategoryClick(event, category);
    }
  };

  // Number of categories required before previous/next controls are disabled.
  const minimumNumberOfCarouselItems = displayedItems + 1;
  const showControls = categories.length >= minimumNumberOfCarouselItems;
  const hasCategories = !!categories.length;

  return (
    <StyledCategoriesWrapper
      hasCategories={hasCategories}
      {...filterAllowedProps(props)}
    >
      <StyledHeadingWrapper>
        <Heading level={3}>
          {loading ? (
            <LoadingPlaceholder
              width="100px"
              height="19px"
              borderRadius="none"
              data-testid="category-title-placeholder"
            />
          ) : (
            title
          )}
        </Heading>
        {showClear && (
          <StyledClearButton onClick={onClearClick}>Clear</StyledClearButton>
        )}
      </StyledHeadingWrapper>
      {loading && (
        <CategoryButtonsPlaceholder data-testid="category-buttons-placeholder" />
      )}
      {hasCategories && (
        <StyledListWrapper>
          {showControls && carouselPosition > 0 && (
            <StyledControlButton
              className="previous-button"
              data-testid="previous"
              aria-label="Previous"
              onClick={() => setCarouselPosition(carouselPosition - 1)}
              disabled={carouselPosition === 0 && "disabled"}
            >
              <Chevron className="previous-icon" />
            </StyledControlButton>
          )}
          <StyledCategoryList displayedItems={displayedItems}>
            {categories
              .slice(carouselPosition, carouselPosition + displayedItems)
              .map((category, index) => (
                <li key={index}>
                  <Button
                    size="xsmall"
                    onClick={e => categoryClickHandler(e, category)}
                    active={isActive(category, activeCategory)}
                    theme={
                      category.theme
                        ? { active: category.theme, hover: category.theme }
                        : null
                    }
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
          </StyledCategoryList>
          {showControls &&
            !(
              categories.length < minimumNumberOfCarouselItems ||
              carouselPosition === categories.length - displayedItems
            ) && (
              <StyledControlButton
                className="next-button"
                data-testid="next"
                aria-label="Next"
                onClick={() => setCarouselPosition(carouselPosition + 1)}
                disabled={
                  (categories.length < minimumNumberOfCarouselItems ||
                    carouselPosition === categories.length - displayedItems) &&
                  "disabled"
                }
              >
                <Chevron className="next-icon" />
              </StyledControlButton>
            )}
        </StyledListWrapper>
      )}
    </StyledCategoriesWrapper>
  );
};

const CategoryShape = PropTypes.shape({
  name: PropTypes.string,
  theme: PropTypes.shape({
    background: PropTypes.string,
    color: PropTypes.string
  })
});

Categories.propTypes = {
  categories: PropTypes.arrayOf(CategoryShape),
  title: PropTypes.node,
  onCategoryClick: PropTypes.func,
  onClearClick: PropTypes.func,
  showClear: PropTypes.bool,
  loading: PropTypes.bool,
  displayedItems: PropTypes.number,
  activeCategory: PropTypes.oneOfType([
    CategoryShape,
    PropTypes.arrayOf(CategoryShape)
  ])
};

export default Categories;
