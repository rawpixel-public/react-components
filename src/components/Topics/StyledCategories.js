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
      padding-bottom: 12px;
    `
  )}
`;

export const StyledListWrapper = styled.div`
  display: grid;
  grid-template-columns: ${ifProp("showPrevious", "10px", 0)} auto ${ifProp(
      "showNext",
      "10px",
      0
    )};
  grid-template-rows: auto;
  grid-template-areas: "previous categories next";
  grid-column-gap: 2px;

  &.loading {
    margin-bottom: 10px;
  }
`;

export const StyledCategoryList = styled.ul`
  grid-area: categories;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
  place-self: center;
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
      return css`calc(100% / ${props.displayedItems || 3} - 3px);`;
    }};
    flex-grow: 1;
    flex-shrink: 0;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    button {
      font-size: 11px;
    }
  }
`;

export const StyledHeadingWrapper = styled.div`
  position: relative;
  h3 {
    color: ${palette.grayDarkest};
    min-height: 19px;
  }
`;

export const StyledControlButton = styled.button`
  background: none;
  border: none;
  border-radius: 0.25rem;
  fill: ${palette.grayDarkest};
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
    grid-area: next;
  }

  .next-icon {
    transform: rotate(-90deg);
    height: 10px;
    position: relative;
    top: 1px;
  }

  &.previous-button {
    grid-area: previous;
  }

  .previous-icon {
    transform: rotate(90deg);
    height: 10px;
  }
`;
