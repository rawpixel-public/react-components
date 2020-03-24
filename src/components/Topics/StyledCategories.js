import styled from "styled-components";
import { prop } from "styled-tools";

import { fontFamily, palette } from "../../utils/cssVars";

// todo: consolidate website and DAM palette.
const lightGray = "#7d7c7c";

export const StyledClearButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  color: ${lightGray};
  display: block;
  font-family: ${fontFamily.base};
  font-size: 14px;
  font-weight: normal;
  padding: 5px 10px;
  position: absolute;
  right: 0;
  top: -2px;
  width: auto;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledCategoriesWrapper = styled.div`
  overflow: hidden;
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
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;

  li {
    margin: 0 3px;
    min-width: 60px;
    flex-basis: calc(100% / ${prop("displayedItems", 3)});
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
`;

export const StyledControlButton = styled.button`
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: ${palette.grayLight};
  font-family: ${fontFamily.base};
  font-size: 10px;
  padding: 0;
  width: 10px;

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
