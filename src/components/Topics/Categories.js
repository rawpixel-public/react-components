import React from "react";
import PropTypes from "prop-types";

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

// Number of categories required before previous/next controls are disabled.
const minimumNumberOfCarouselItems = 4;

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
  loading = false
}) => {
  const [carouselPosition, setCarouselPosition] = React.useState(0);
  const showControls = categories.length >= minimumNumberOfCarouselItems;

  const categoryClickHandler = (event, category) => {
    if (typeof onCategoryClick === "function") {
      onCategoryClick(event, category);
    }
  };

  return (
    <StyledCategoriesWrapper>
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
      {!!categories.length && (
        <StyledListWrapper>
          {showControls && (
            <StyledControlButton
              data-testid="previous"
              aria-label="Previous"
              onClick={() => setCarouselPosition(carouselPosition - 1)}
              disabled={carouselPosition === 0 && "disabled"}
            >
              <span aria-hidden>{"<"}</span>
            </StyledControlButton>
          )}
          <StyledCategoryList carouselPosition={carouselPosition}>
            {categories.map((category, index) => (
              <li key={index}>
                <Button
                  size="xsmall"
                  onClick={e => categoryClickHandler(e, category)}
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
                (categories.length < 4 ||
                  carouselPosition === categories.length - 3) &&
                "disabled"
              }
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
  loading: PropTypes.bool
};

export default Categories;
