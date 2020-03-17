import React from "react";
import styled from "styled-components";
import { prop } from "styled-tools";
import { Link } from "react-router";
import Button from "../../atoms/Button";
import { palette } from "../../utils/cssVars";

import { FilterButtonGroupProps } from "./FilterButtonGroup";
import { StyledList, StyledListItem } from "./StyledFilterButtonGroup";

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
  <Button {...props} style={{ padding: "6px 0", minHeight: "34px" }}>
    <StyledIcon
      imgSrc={crownSvg}
      background={palette.gold}
      style={{ height: "20px", width: "20px" }}
    />
  </Button>
);

const LikesButton = props => (
  <Button {...props}>
    <StyledIcon
      imgSrc={heartSvg}
      background={`linear-gradient(to left, ${palette.pink}, ${palette.blue})`}
    />{" "}
    Likes
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
    <div>
      <StyledList>
        {published.map((filter, index) => {
          const Component = ButtonComponents[filter.tag];
          return (
            <StyledListItem key={index} itemsPerRow={rowSize}>
              <Component
                as={filter.to ? Link : filter.href ? "a" : "button"}
                active={filter.active}
                disabled={filter.disabled}
                onClick={e => onFilterClick && onFilterClick(e, filter)}
                to={filter.to}
              >
                {filter.name}
              </Component>
            </StyledListItem>
          );
        })}
      </StyledList>
    </div>
  );
};

FilterButtonGroupMain.propTypes = FilterButtonGroupProps;

export default FilterButtonGroupMain;
