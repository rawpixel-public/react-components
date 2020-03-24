import styled from "styled-components";

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
  width: calc(${props => 100 / props.itemsPerRow}% - 5px);
  margin-bottom: 10px;
`;
