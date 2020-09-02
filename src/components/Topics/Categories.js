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

const useCarouselPosition = (categories, ref) => {
  const [carouselPosition, setCarouselPosition] = React.useState({
    left: 0,
    max: 0
  });

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = 0;
      setCarouselPosition({ left: 0, max: ref.current.scrollLeftMax });
    }
  }, [categories, ref]);

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
  const carouselRef = React.useRef();
  const [carouselPosition, setCarouselPosition] = useCarouselPosition(
    categories,
    carouselRef
  );

  const categoryClickHandler = (event, category) => {
    if (typeof onCategoryClick === "function") {
      onCategoryClick(event, category);
    }
  };

  const handlePreviousClick = () => {
    const itemElement = carouselRef.current.children[0];
    if (itemElement) {
      const rect = itemElement.getBoundingClientRect();
      const newLeft = carouselRef.current.scrollLeft - rect.width - 6;
      if (newLeft > carouselRef.current.scrollLeftMax) {
        carouselRef.current.scrollLeft = carouselRef.current.scrollLeftMax;
      } else {
        carouselRef.current.scrollLeft = newLeft;
      }
      setCarouselPosition({
        left: carouselRef.current.scrollLeft,
        max: carouselRef.current.scrollLeftMax
      });
    }
  };

  const handleNextClick = () => {
    const itemElement = carouselRef.current.children[0];
    if (itemElement) {
      const rect = itemElement.getBoundingClientRect();
      const newLeft = carouselRef.current.scrollLeft + rect.width + 6;
      if (newLeft > carouselRef.current.scrollLeftMax) {
        carouselRef.current.scrollLeft = carouselRef.current.scrollLeftMax;
      } else {
        carouselRef.current.scrollLeft = newLeft;
      }

      setCarouselPosition({
        left: carouselRef.current.scrollLeft,
        max: carouselRef.current.scrollLeftMax
      });
    }
  };

  const handleScroll = e => {
    setCarouselPosition({
      ...carouselPosition,
      left: e.currentTarget.scrollLeft
    });
  };

  // Number of categories required before previous/next controls are disabled.
  const minimumNumberOfCarouselItems = displayedItems + 1;
  const showControls = categories.length >= minimumNumberOfCarouselItems;
  const hasCategories = !!categories.length;
  const showPrevious = showControls && carouselPosition.left > 0;
  const showNext = showControls && carouselPosition.left < carouselPosition.max;

  // Position scroll at the end when the 'next' control disappears.
  React.useEffect(() => {
    const el = carouselRef.current;
    if (el && showPrevious && !showNext && el.scrollLeft < el.scrollLeftMax) {
      el.scrollLeft = el.scrollLeftMax;
    }
  }, [showPrevious, showNext]);

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
          {showPrevious && (
            <StyledControlButton
              className="previous-button"
              data-testid="previous"
              aria-label="Previous"
              onClick={handlePreviousClick}
              disabled={carouselPosition === 0 && "disabled"}
            >
              <Chevron className="previous-icon" />
            </StyledControlButton>
          )}
          <StyledCategoryList
            displayedItems={displayedItems}
            ref={carouselRef}
            onScroll={handleScroll}
            showPrevious={showPrevious}
            showNext={showNext}
          >
            {categories.map((category, index) => (
              <li key={index}>
                <Button
                  size="xsmall"
                  onClick={e => categoryClickHandler(e, category)}
                  active={isActive(category, activeCategory)}
                  theme={
                    category.color_value
                      ? {
                          active: {
                            color: "#FFF",
                            background: category.color_value
                          },
                          hover: {
                            color: "#FFF",
                            background: category.color_value
                          }
                        }
                      : null
                  }
                >
                  {category.name}
                </Button>
              </li>
            ))}
          </StyledCategoryList>
          {showNext && (
            <StyledControlButton
              className="next-button"
              data-testid="next"
              aria-label="Next"
              onClick={handleNextClick}
              disabled={
                (categories.length < minimumNumberOfCarouselItems ||
                  carouselPosition.left === carouselPosition.max) &&
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
  color_id: PropTypes.string,
  color_value: PropTypes.string
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
