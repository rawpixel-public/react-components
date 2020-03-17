import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

import Heading from "../../atoms/Heading";
import Button from "../../atoms/Button";

import { StyledList, StyledListItem } from "./StyledFilterButtonGroup";

const FilterButtonGroup = ({
  filters = [],
  onFilterClick,
  title,
  itemsPerRow = 2
}) => (
  <div>
    {title && <Heading level={3}>{title}</Heading>}
    <StyledList>
      {filters
        .filter(filter => filter.published)
        .map((filter, index) => (
          <StyledListItem key={index} itemsPerRow={itemsPerRow}>
            <Button
              as={filter.to ? Link : filter.href ? "a" : "button"}
              active={filter.active}
              disabled={filter.disabled}
              onClick={e => onFilterClick && onFilterClick(e, filter)}
              to={filter.to}
            >
              {filter.name}
            </Button>
          </StyledListItem>
        ))}
    </StyledList>
  </div>
);

export const FilterShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  published: PropTypes.bool,
  tag: PropTypes.string
});

export const FilterButtonGroupProps = {
  filters: PropTypes.arrayOf(FilterShape),
  onFilterClick: PropTypes.func,
  title: PropTypes.string,
  itemsPerRow: PropTypes.number
};

FilterButtonGroup.propTypes = FilterButtonGroupProps;
export default FilterButtonGroup;
