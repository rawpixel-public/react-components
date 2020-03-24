import React from "react";
import PropTypes from "prop-types";
import filterAllowedProps from "filter-react-props";

import Heading from "../../atoms/Heading";
import Button from "../../atoms/Button";
import LoadingPlaceholder from "../../atoms/LoadingPlaceholder";

import {
  StyledCategoriesWrapper,
  StyledCategoryList,
  StyledClearButton,
  StyledControlButton,
  StyledHeadingWrapper,
  StyledListWrapper
} from "./StyledCategories";

const CategoryButtonsPlaceholder = props => (
  <StyledListWrapper {...props}>
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

const Categories = ({
  categories = [],
  title,
  onCategoryClick,
  onClearClick,
  showClear = false,
  loading = false,
  displayedItems = 3,
  ...props
}) => {
  const [carouselPosition, setCarouselPosition] = React.useState(0);

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
        <Heading level={3} style={{ minHeight: "19px" }}>
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
          {showControls && (
            <StyledControlButton
              data-testid="previous"
              aria-label="Previous"
              onClick={() => setCarouselPosition(carouselPosition - 1)}
              disabled={carouselPosition === 0 && "disabled"}
              style={{ marginRight: "5px" }}
            >
              <span aria-hidden>{"<"}</span>
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
                    active={category.active}
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
          </StyledCategoryList>
          {showControls && (
            <StyledControlButton
              data-testid="next"
              aria-label="Next"
              onClick={() => setCarouselPosition(carouselPosition + 1)}
              disabled={
                (categories.length < minimumNumberOfCarouselItems ||
                  carouselPosition === categories.length - displayedItems) &&
                "disabled"
              }
              style={{ marginLeft: "5px" }}
            >
              <span aria-hidden>{">"}</span>
            </StyledControlButton>
          )}
        </StyledListWrapper>
      )}
    </StyledCategoriesWrapper>
  );
};

Categories.propTypes = {
  categories: PropTypes.array,
  title: PropTypes.node,
  onCategoryClick: PropTypes.func,
  onClearClick: PropTypes.func,
  showClear: PropTypes.bool,
  loading: PropTypes.bool,
  displayedItems: PropTypes.number
};

export default Categories;
