import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "../../atoms/Button";
import crown from "../../icons/crown.svg";
import heart from "../../icons/heart-o.svg";
import { palette } from "../../utils/cssVars";

import { FilterButtonGroupProps } from "./FilterButtonGroup";
import {
  StyledList,
  StyledListItem,
  StyledWrapper
} from "./StyledFilterButtonGroup";

const ExclusiveCrown = styled.div`
  background-color: ${palette.gold};
  mask: url(${crown}) no-repeat center;
  text-indent: -9999px;
  min-height: 20px;
`;

const ExclusiveButton = props => (
  <Button {...props} style={{ padding: "5px 0.5rem" }}>
    <ExclusiveCrown>{props.name}</ExclusiveCrown>
  </Button>
);

ExclusiveButton.propTypes = {
  name: PropTypes.string
};

const LikesButton = styled(Button)`
  &:before {
    content: "";
    background-color: ${palette.pink};
    mask: url(${heart}) no-repeat center;
    min-height: 14px;
    min-width: 14px;
    display: inline-block;
    position: relative;
    top: 2px;
    left: -2px;
  }
`;

const ButtonComponents = {
  $free: Button,
  $premium: Button,
  $exclusive: ExclusiveButton,
  $likes: LikesButton
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
