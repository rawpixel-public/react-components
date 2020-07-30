import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";

const itemWidth = ({ itemsCount, itemsPerRow, flexGrow }) => {
  const margin = flexGrow ? "10px" : "5px";
  if (itemsCount > 1) {
    return itemsPerRow > 1
      ? `calc(${Math.floor(100 / itemsPerRow)}% - ${margin})`
      : "100%";
  }
  return "100%";
};

export const StyledList = styled.ul`
  list-style-type: none;
  margin: 10px 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  row-gap: 10px;
  ${ifProp(
    "flexGrow",
    css`
      column-gap: 10px;
    `
  )};
`;

export const StyledListItem = styled.li`
  width: ${itemWidth};
  ${ifProp(
    "flexGrow",
    css`
      flex-grow: 1;
    `
  )};
`;
