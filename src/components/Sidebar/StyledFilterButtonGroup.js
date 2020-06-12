import styled from "styled-components";

const itemWidth = ({ itemsCount, itemsPerRow }) => {
  if (itemsCount > 1) {
    return itemsPerRow > 1 ? `calc(${100 / itemsPerRow}% - 5px)` : "100%";
  }
  return "100%";
};

export const StyledWrapper = styled.div``;

export const StyledList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
`;

export const StyledListItem = styled.li`
  display: flex;
  justify-content: center;
  width: ${itemWidth};
  margin-bottom: 10px;
`;
