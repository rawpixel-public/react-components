import React from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
`;

const StyledListItem = styled.li`
  display: flex;
  justify-content: center;
  width: ${props => (210 - 5 * props.itemsPerRow) / props.itemsPerRow}px;
  margin-bottom: 5px;

  &:first-child {
    margin-top: 5px;
  }
`;

const StyledWrapper = styled.div`
  padding: 0 10px;
`;

export default ({ children, title, itemsPerRow = 2 }) => (
  <StyledWrapper>
    {title}
    <StyledList>
      {React.Children.toArray(children).map((item, index) => (
        <StyledListItem key={index} itemsPerRow={itemsPerRow}>
          {item}
        </StyledListItem>
      ))}
    </StyledList>
  </StyledWrapper>
);
