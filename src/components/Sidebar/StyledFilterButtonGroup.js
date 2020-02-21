import styled from "styled-components";

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
  width: ${props => (210 - 5 * props.itemsPerRow) / props.itemsPerRow}px;
  margin-bottom: 5px;

  &:first-child {
    margin-top: 5px;
  }
`;

export const StyledWrapper = styled.div`
  padding: 0 10px;
`;
