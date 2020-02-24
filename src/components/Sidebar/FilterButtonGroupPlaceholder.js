import React from "react";
import PropTypes from "prop-types";
import LoadingPlaceholder from "../../atoms/LoadingPlaceholder";

import {
  StyledList,
  StyledListItem,
  StyledWrapper
} from "./StyledFilterButtonGroup";

const FilterButtonGroupPlaceholder = ({
  hasTitle = false,
  numberOfItems = 4,
  itemsPerRow = 2
}) => (
  <StyledWrapper>
    {hasTitle && (
      <LoadingPlaceholder width="125px" height="19px" borderRadius="none" />
    )}
    <StyledList>
      {[...Array(numberOfItems)].map((_, index) => (
        <StyledListItem key={index} itemsPerRow={itemsPerRow}>
          <LoadingPlaceholder width="100px" height="32px" />
        </StyledListItem>
      ))}
    </StyledList>
  </StyledWrapper>
);

FilterButtonGroupPlaceholder.propTypes = {
  hasTitle: PropTypes.bool,
  itemsPerRow: PropTypes.number,
  numberOfItems: PropTypes.number
};

export default FilterButtonGroupPlaceholder;
