import styled from "styled-components";

import { fontFamily, palette } from "../utils/cssVars";

// todo: consolidate website and DAM palette.
const lighterGray = "#e9e9e9";
const lightGray = "#7d7c7c";
const darkGray = "#4b4b4c";

export const StyledCategoryButton = styled.button`
  background: #e9e9e9;
  border: none;
  border-radius: 0.25rem;
  color: ${lightGray};
  font-family: ${fontFamily.base};
  font-size: 12px;
  padding: 5px 10px;
  transition: color linear 250ms, background-color linear 250ms;

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
  max-width: 240px;
  overflow: hidden;
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
  margin: 0;
  padding: 0;

  li {
    margin: 0 5px;
    &:first-child {
      margin-left: 0;
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
