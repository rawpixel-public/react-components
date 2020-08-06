import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";

const itemWidth = ({ itemsCount, itemsPerRow, itemSpan = 1 }) => {
  if (itemsCount > 1) {
    return itemsPerRow > 1
      ? `calc(${Math.round((100 / itemsPerRow) * itemSpan)}% - 5px)`
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
`;

export const StyledListItem = styled.li`
  width: ${itemWidth};
  margin-bottom: 10px;
  align-self: baseline;
  display: flex;
  justify-content: center;
  ${ifProp(
    "flexGrow",
    css`
      &:last-child {
        flex-grow: 1;
      }
    `
  )};
`;
