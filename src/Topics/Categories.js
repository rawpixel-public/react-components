import React from "react";
import PropTypes from "prop-types";

import {
  StyledCategoriesWrapper,
  StyledCategoryButton,
  StyledCategoryHeading,
  StyledCategoryList,
  StyledClearButton,
  StyledHeadingWrapper
} from "./StyledCategories";

const Categories = ({
  categories = [],
  title,
  onCategoryClick,
  onClearClick,
  showClear = false
}) => {
  const visible = categories.filter(category => category.visible);

  const categoryClickHandler = (event, category) => {
    if (typeof onCategoryClick === "function") {
      onCategoryClick(event, category);
    }
  };

  return (
    <StyledCategoriesWrapper>
      <StyledHeadingWrapper>
        <StyledCategoryHeading>{title}</StyledCategoryHeading>
        {showClear && (
          <StyledClearButton onClick={onClearClick}>Clear</StyledClearButton>
        )}
      </StyledHeadingWrapper>
      {!!visible.length && (
        <div>
          <button>Previous</button>
          <StyledCategoryList>
            {visible.map(category => (
              <li key={category.id}>
                <StyledCategoryButton
                  onClick={e => categoryClickHandler(e, category)}
                >
                  {category.title}
                </StyledCategoryButton>
              </li>
            ))}
          </StyledCategoryList>
          <button>Next</button>
        </div>
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
