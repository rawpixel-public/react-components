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
  width: 100px;
  margin-bottom: 5px;

  &:first-child {
    margin-top: 5px;
  }
`;

const StyledWrapper = styled.div`
  padding: 0 10px;
`;

export default ({ children, title }) => (
  <StyledWrapper>
    {title}
    <StyledList>
      {React.Children.toArray(children).map((item, index) => (
        <StyledListItem key={index}>{item}</StyledListItem>
      ))}
    </StyledList>
  </StyledWrapper>
);
