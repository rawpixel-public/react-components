import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";

import { fontFamily, palette } from "../../utils/cssVars";

export const StyledClearButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  color: ${palette.grayLight};
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
  ${ifProp(
    "hasCategories",
    css`
      padding-bottom: 10px;
    `
  )}
`;

export const StyledListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;

  &.loading {
    margin-bottom: 10px;
  }
`;

export const StyledCategoryList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;

  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  li {
    margin: 0 2px;
    flex-basis: ${props => {
      return css`calc(100% / ${props.displayedItems || 3} - 4px);`;
    }};
    flex-grow: 1;
    flex-shrink: 0;

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
  h3 {
    min-height: 19px;
  }
`;

export const StyledControlButton = styled.button`
  background: ${palette.topicFilterBackground};
  border: none;
  border-radius: 0.25rem;
  fill: ${palette.topicActive};
  font-family: ${fontFamily.base};
  font-size: 10px;
  padding: 0;
  width: 10px;

  &[disabled] {
    color: ${palette.grayLighter};
  }

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      font-weight: bold;
    }

    &[disabled]:hover {
      background: none;
      cursor: auto;
      font-weight: normal;
    }
  }

  &.next-button {
    margin-left: 3px;
  }

  .next-icon {
    transform: rotate(-90deg);
  }

  &.previous-button {
    margin-right: 3px;
  }

  .previous-icon {
    transform: rotate(90deg);
  }
`;
