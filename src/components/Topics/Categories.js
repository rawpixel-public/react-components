import React from "react";
import PropTypes from "prop-types";

import Heading from "../../atoms/Heading";
import Button from "../../atoms/Button";

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

const Categories = ({
  categories = [],
  title,
  onCategoryClick,
  onClearClick,
  showClear = false
}) => {
  const [carouselPosition, setCarouselPosition] = React.useState(0);

  const visible = categories.filter(category => category.visible);
  const showControls = visible.length >= minimumNumberOfCarouselItems;

  const categoryClickHandler = (event, category) => {
    if (typeof onCategoryClick === "function") {
      onCategoryClick(event, category);
    }
  };

  return (
    <StyledCategoriesWrapper>
      <StyledHeadingWrapper>
        <Heading level={3}>{title}</Heading>
        {showClear && (
          <StyledClearButton onClick={onClearClick}>Clear</StyledClearButton>
        )}
      </StyledHeadingWrapper>
      {!!visible.length && (
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
            {visible.map(category => (
              <li key={category.id}>
                <Button
                  size="xsmall"
                  onClick={e => categoryClickHandler(e, category)}
                >
                  {category.title}
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
                (visible.length < 4 ||
                  carouselPosition === visible.length - 3) &&
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
  title: PropTypes.string,
  onCategoryClick: PropTypes.func,
  onClearClick: PropTypes.func,
  showClear: PropTypes.bool
};

export default Categories;
