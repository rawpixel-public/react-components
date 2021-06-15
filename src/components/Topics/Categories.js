import React from "react";
import PropTypes from "prop-types";
import filterAllowedProps from "filter-react-props";
import classnames from "classnames";

import Heading from "../../atoms/Heading";
import Button from "../../atoms/Button";
import Chevron from "./Chevron";

import {
  StyledCategoriesWrapper,
  StyledCategoryList,
  StyledClearButton,
  StyledControlButton,
  StyledHeadingWrapper,
  StyledListWrapper
} from "./StyledCategories";

const getLeftMax = el => el.scrollLeftMax || el.scrollWidth - el.clientWidth;

const useCarouselPosition = (categories, ref) => {
  const [carouselPosition, setCarouselPosition] = React.useState({
    left: 0,
    max: 0
  });

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = 0;
      setCarouselPosition({ left: 0, max: getLeftMax(ref.current) });
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

const getElementTotalWidth = el => {
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  return Math.floor(rect.width + margin);
};

const calculateChildrenPositions = wrapperEl => {
  if (!wrapperEl) {
    return [];
  }

  const scrollLeft = wrapperEl.scrollLeft;
  const scrollLeftEnd = scrollLeft + wrapperEl.getBoundingClientRect().width;

  return Array.from(wrapperEl.children).map((el, index, arr) => {
    const slice = arr
      .slice(0, index + 1)
      .reduce((total, cur) => total + getElementTotalWidth(cur), 0);
    const totalWidth = getElementTotalWidth(el);
    const end = slice;
    const start = slice - totalWidth;
    const isFullyVisible = start >= scrollLeft && end <= scrollLeftEnd;
    const overlapEnd =
      start >= scrollLeft && start <= scrollLeftEnd && end > scrollLeftEnd;
    const overlapStart =
      start < scrollLeft && end >= scrollLeft && end < scrollLeftEnd;
    const isPartlyVisible = overlapEnd || overlapStart;
    const offsetEnd = end - scrollLeftEnd;
    const offsetStart = start - scrollLeft;
    const offset =
      (overlapEnd && offsetEnd) || (overlapStart && offsetStart) || 0;
    return {
      el,
      totalWidth,
      end,
      start,
      isFullyVisible,
      isPartlyVisible,
      offset
    };
  });
};

const Categories = ({
  className,
  activeCategory = null,
  categories = [],
  title,
  onCategoryClick,
  onClearClick,
  showClear = false,
  displayedItems = 3,
  iconStrokeWidth = 54,
  onPositionUpdate,
  ...props
}) => {
  const carouselRef = React.useRef();
  const categoryRef = React.useRef();
  const [carouselPosition, setCarouselPosition] = useCarouselPosition(
    categories,
    carouselRef
  );

  // Number of categories required before previous/next controls are disabled.
  const minimumNumberOfCarouselItems = displayedItems + 1;
  const showControls = categories.length >= minimumNumberOfCarouselItems;
  const hasCategories = !!categories.length;
  const showPrevious = showControls && carouselPosition.left > 0;
  const showNext = showControls && carouselPosition.left < carouselPosition.max;

  const categoryClickHandler = (event, category) => {
    if (typeof onCategoryClick === "function") {
      const res = onCategoryClick(event, category);
      if (res === false) {
        return;
      }
    }

    const listElement = event.currentTarget.parentElement;
    categoryRef.current = listElement;

    const items = calculateChildrenPositions(carouselRef.current);
    const item = items.find(i => i.el === listElement);
    if (item && item.isPartlyVisible && !item.isFullyVisible) {
      const isFirstOrLast =
        items.indexOf(item) === 0 || items.indexOf(item) === items.length - 1;
      carouselRef.current.scrollLeft = isFirstOrLast
        ? item.start
        : carouselRef.current.scrollLeft + item.offset;
      setCarouselPosition({
        ...carouselPosition,
        left: carouselRef.current.scrollLeft
      });
    }
  };

  const handlePreviousClick = () => {
    categoryRef.current = undefined;

    const items = calculateChildrenPositions(carouselRef.current);
    const itemElement =
      items.find(
        ({ isPartlyVisible, isFullyVisible }) =>
          isPartlyVisible && !isFullyVisible
      ) || items.find(({ isFullyVisible }) => isFullyVisible);

    if (itemElement.isPartlyVisible) {
      categoryRef.current = itemElement.el;
    }

    if (itemElement) {
      const newLeft = itemElement.isPartlyVisible
        ? itemElement.start
        : carouselRef.current.scrollLeft - itemElement.totalWidth;
      const leftMax = getLeftMax(carouselRef.current);
      if (newLeft > leftMax) {
        carouselRef.current.scrollLeft = leftMax;
      } else {
        carouselRef.current.scrollLeft = newLeft;
      }
      setCarouselPosition({
        left: carouselRef.current.scrollLeft,
        max: leftMax
      });
    }
  };

  const handleNextClick = () => {
    categoryRef.current = undefined;

    const margin = 2;
    const wrapperEnd =
      carouselRef.current.scrollLeft +
      carouselRef.current.getBoundingClientRect().width;
    const items = calculateChildrenPositions(carouselRef.current);
    const item =
      items.find(
        ({ start, end }) => start + margin >= wrapperEnd && end > wrapperEnd
      ) || items.find(({ end }) => end > wrapperEnd);
    if (item) {
      categoryRef.current = item.el;
      const newLeft = carouselRef.current.scrollLeft + item.totalWidth;
      const leftMax = getLeftMax(carouselRef.current);

      if (newLeft > leftMax) {
        carouselRef.current.scrollLeft = leftMax;
      } else {
        carouselRef.current.scrollLeft = newLeft;
      }

      setCarouselPosition({
        left: carouselRef.current.scrollLeft,
        max: leftMax
      });
    }
  };

  const handleScroll = e => {
    setCarouselPosition({
      ...carouselPosition,
      left: e.currentTarget.scrollLeft
    });
  };

  // Position scroll at the end when the 'next' control disappears.
  React.useEffect(() => {
    if (!showPrevious && !showNext) {
      return;
    }

    let updatedScrollLeft;
    const wrapperEl = carouselRef.current;
    const itemEl = categoryRef.current;

    const items = calculateChildrenPositions(wrapperEl);
    const item = items.find(i => i.el === itemEl);
    const isFirst = items.indexOf(item) === 0;
    const isLast = items.indexOf(item) === items.length - 1;
    const isFirstOrLast = isFirst || isLast;

    if (
      typeof onPositionUpdate === "function" &&
      !onPositionUpdate(wrapperEl, items, item, showPrevious, showNext)
    ) {
      return;
    }

    if (item && !showPrevious && showNext) {
      updatedScrollLeft = 0;
    } else if (item && showPrevious && !showNext) {
      updatedScrollLeft = item.start;
    }
    // If a previous/next control appeared, recalculate the item position.
    else if (item && showPrevious && showNext && !isFirstOrLast) {
      updatedScrollLeft = wrapperEl.scrollLeft + item.offset;
    }
    // Recalculate if we reached the start or end of list.
    else if (item && isFirstOrLast) {
      updatedScrollLeft = isFirst ? 0 : item.start;
    }

    if (updatedScrollLeft && updatedScrollLeft !== carouselPosition.left) {
      wrapperEl.scrollLeft = updatedScrollLeft;
      setCarouselPosition({ ...carouselPosition, left: updatedScrollLeft });
    }
  }, [
    showPrevious,
    showNext,
    setCarouselPosition,
    carouselPosition,
    onPositionUpdate
  ]);

  return (
    <StyledCategoriesWrapper
      classNames={classnames("categories", className)}
      $hasCategories={hasCategories}
      {...filterAllowedProps(props)}
    >
      {title && (
        <StyledHeadingWrapper>
          <Heading level={3}>{title}</Heading>
          {showClear && (
            <StyledClearButton onClick={onClearClick}>Clear</StyledClearButton>
          )}
        </StyledHeadingWrapper>
      )}
      {hasCategories && (
        <StyledListWrapper $showPrevious={showPrevious} $showNext={showNext}>
          {showPrevious && (
            <StyledControlButton
              className="previous-button"
              data-testid="previous"
              aria-label="Previous"
              onClick={handlePreviousClick}
              disabled={carouselPosition === 0 && "disabled"}
            >
              <Chevron
                className="previous-icon"
                strokeWidth={iconStrokeWidth}
              />
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
              <Chevron className="next-icon" strokeWidth={iconStrokeWidth} />
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
  className: PropTypes.string,
  categories: PropTypes.arrayOf(CategoryShape),
  title: PropTypes.node,
  onCategoryClick: PropTypes.func,
  onClearClick: PropTypes.func,
  showClear: PropTypes.bool,
  displayedItems: PropTypes.number,
  activeCategory: PropTypes.oneOfType([
    CategoryShape,
    PropTypes.arrayOf(CategoryShape)
  ]),
  iconStrokeWidth: PropTypes.number,
  onPositionUpdate: PropTypes.func
};

export default Categories;
