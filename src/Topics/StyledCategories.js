import styled from "styled-components";

import { fontFamily, palette } from "../utils/cssVars";

// todo: consolidate website and DAM palette.
const lighterGray = "#e9e9e9";
const lightGray = "#7d7c7c";
const darkGray = "#4b4b4c";
const categoryButtonWidth = 75;

export const StyledCategoryButton = styled.button`
  background: #e9e9e9;
  border: none;
  border-radius: 0.25rem;
  color: ${lightGray};
  font-family: ${fontFamily.base};
  font-size: 12px;
  padding: 5px 10px;
  transition: color linear 250ms, background-color linear 250ms;
  width: ${categoryButtonWidth}px;

  &:hover {
    cursor: pointer;
    background: ${darkGray};
    color: ${palette.white};
  }
`;

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
  top: 0;
  transition: background-color linear 250ms;

  &:hover {
    cursor: pointer;
    background: ${lighterGray};
  }
`;

export const StyledCategoriesWrapper = styled.div`
  max-width: 320px;
  overflow: hidden;
`;

export const StyledListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

export const StyledCategoryHeading = styled.h3`
  color: ${darkGray};
  display: inline;
  font-family: ${fontFamily.base};
  font-weight: normal;
  font-size: 16px;
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
    margin: 0 5px;
    transition: margin-left ease 200ms;
    &:first-child {
      margin-left: -${props => props.carouselPosition * (categoryButtonWidth + 10)}px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const StyledHeadingWrapper = styled.div`
  position: relative;
  padding: 5px 0 15px;
`;

export const StyledControlButton = styled.button`
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: ${palette.grayLight};
  font-family: ${fontFamily.base};
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
