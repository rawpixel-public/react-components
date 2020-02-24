import React from "react";
import Button from "../../atoms/Button";

import { FilterButtonGroupProps } from "./FilterButtonGroup";
import {
  StyledList,
  StyledListItem,
  StyledWrapper
} from "./StyledFilterButtonGroup";

const ButtonComponents = {
  $free: Button,
  $premium: Button,
  $exclusive: Button,
  $likes: Button
};

const FilterButtonGroupMain = ({
  filters = [],
  onFilterClick,
  itemsPerRow = 2
}) => (
  <StyledWrapper>
    <StyledList>
      {filters
        .filter(filter => filter.published)
        .map((filter, index) => {
          const Component = ButtonComponents[filter.tag];
          return (
            <StyledListItem key={index} itemsPerRow={itemsPerRow}>
              <Component
                active={filter.active}
                disabled={filter.disabled}
                onClick={e => onFilterClick && onFilterClick(e, filter)}
              >
                {filter.name}
              </Component>
            </StyledListItem>
          );
        })}
    </StyledList>
  </StyledWrapper>
);

FilterButtonGroupMain.propTypes = FilterButtonGroupProps;

export default FilterButtonGroupMain;
