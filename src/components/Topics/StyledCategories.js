import styled from "styled-components";

import { fontFamily, palette } from "../../utils/cssVars";

// todo: consolidate website and DAM palette.
const lightGray = "#7d7c7c";
const categoryButtonWidth = 60;

export const StyledClearButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  color: ${lightGray};
  display: block;
  font-family: ${fontFamily.base};
  font-size: 16px;
  font-weight: normal;
  padding: 5px 10px;
  position: absolute;
  right: 0;
  top: -4px;
  transition: background-color linear 250ms;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledCategoriesWrapper = styled.div`
  max-width: 220px;
  overflow: hidden;
  padding-left: 10px;
  padding-bottom: 10px;
`;

export const StyledListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

export const StyledCategoryList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0 5px;
  padding: 0;
  max-width: 245px;
  overflow: hidden;

  li {
    margin: 0 2px;
    transition: margin-left ease 200ms;
    min-width: ${categoryButtonWidth}px;
    &:first-child {
      margin-left: -${props => props.carouselPosition * (categoryButtonWidth + 4)}px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const StyledHeadingWrapper = styled.div`
  position: relative;
`;

export const StyledControlButton = styled.button`
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: ${palette.grayLight};
  font-family: ${fontFamily.base};
  font-size: 10px;
  padding: 0;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  &[disabled] {
    color: ${palette.grayLighter};
  }

  &[disabled]:hover {
    background: none;
    cursor: auto;
    font-weight: normal;
  }
`;
