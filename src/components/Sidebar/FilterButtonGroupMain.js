import React from "react";
import styled from "styled-components";
import { prop } from "styled-tools";
import Button from "../../atoms/Button";
import { palette } from "../../utils/cssVars";

import { FilterButtonGroupProps } from "./FilterButtonGroup";
import {
  StyledList,
  StyledListItem,
  StyledWrapper
} from "./StyledFilterButtonGroup";

import crownSvg from "../../icons/crown.svg";
import heartSvg from "../../icons/heart-o.svg";

const StyledIcon = styled.div`
  display: inline-block;
  height: 14px;
  width: 14px;
  vertical-align: top;
  mask: url(${prop("imgSrc")}) no-repeat center;
  background: ${prop("background")};
`;

const ExclusiveButton = props => (
  <Button {...props} style={{ padding: "5px 0" }}>
    <StyledIcon
      imgSrc={crownSvg}
      background={palette.gold}
      style={{ height: "20px", width: "20px" }}
    />
  </Button>
);

const LikesButton = props => (
  <Button {...props}>
    <StyledIcon imgSrc={heartSvg} background={palette.pink} /> Likes
  </Button>
);

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
}) => {
  const published = filters.filter(filter => filter.published);
  const rowSize = published.length > 1 ? itemsPerRow : 1;

  return (
    <StyledWrapper>
      <StyledList>
        {published.map((filter, index) => {
          const Component = ButtonComponents[filter.tag];
          return (
            <StyledListItem key={index} itemsPerRow={rowSize}>
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
};

FilterButtonGroupMain.propTypes = FilterButtonGroupProps;

export default FilterButtonGroupMain;
